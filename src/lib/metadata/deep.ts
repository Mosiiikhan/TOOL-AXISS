import { formatBytes } from "@/lib/tools/utils";
import type { MetaRow, MetaSection } from "./types";

// Is se bari files ka poora scan nahi hota (memory bachane ke liye)
const MAX_SCAN_BYTES = 64 * 1024 * 1024;
const MAX_TEXT = 4000;
const MAX_INFLATED = 1024 * 1024;

const latin1 = new TextDecoder("windows-1252");
const utf8 = new TextDecoder("utf-8");

const ascii = (b: Uint8Array, start: number, len: number) =>
  String.fromCharCode(...Array.from(b.subarray(start, start + len)));

function clean(text: string): string {
  const t = text.replace(/\u0000/g, "").trim();
  return t.length > MAX_TEXT
    ? `${t.slice(0, MAX_TEXT)}... (shortened, ${t.length.toLocaleString("en-US")} characters in total)`
    : t;
}

async function inflate(bytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const stream = new Blob([bytes as unknown as BlobPart])
      .stream()
      .pipeThrough(new DecompressionStream("deflate"));
    const reader = stream.getReader();
    const parts: Uint8Array[] = [];
    let total = 0;
    while (total <= MAX_INFLATED) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
      total += value.length;
    }
    await reader.cancel().catch(() => undefined);
    const out = new Uint8Array(Math.min(total, MAX_INFLATED));
    let off = 0;
    for (const p of parts) {
      if (off >= out.length) break;
      const piece = p.subarray(0, out.length - off);
      out.set(piece, off);
      off += piece.length;
    }
    return out;
  } catch {
    return null;
  }
}

async function scanPng(b: Uint8Array, rows: MetaRow[]): Promise<number> {
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  let pos = 8;
  let end = -1;
  let found = 0;
  while (pos + 12 <= b.length && found < 200) {
    const len = dv.getUint32(pos);
    const type = ascii(b, pos + 4, 4);
    const start = pos + 8;
    const dataEnd = start + len;
    if (dataEnd + 4 > b.length) break;
    const data = b.subarray(start, dataEnd);

    if (type === "tEXt") {
      const nul = data.indexOf(0);
      if (nul > 0) {
        rows.push({
          label: `PNG text: ${latin1.decode(data.subarray(0, nul))}`,
          value: clean(latin1.decode(data.subarray(nul + 1))),
        });
        found++;
      }
    } else if (type === "zTXt") {
      const nul = data.indexOf(0);
      if (nul > 0) {
        const inflated = await inflate(data.subarray(nul + 2));
        rows.push({
          label: `PNG text: ${latin1.decode(data.subarray(0, nul))}`,
          value: inflated ? clean(latin1.decode(inflated)) : "(compressed text could not be read)",
        });
        found++;
      }
    } else if (type === "iTXt") {
      const nul = data.indexOf(0);
      if (nul > 0 && nul + 3 < data.length) {
        const compressed = data[nul + 1] === 1;
        const n2 = data.indexOf(0, nul + 3);
        const n3 = n2 >= 0 ? data.indexOf(0, n2 + 1) : -1;
        if (n3 >= 0) {
          let body: Uint8Array | null = data.subarray(n3 + 1);
          if (compressed) body = await inflate(body);
          rows.push({
            label: `PNG text: ${utf8.decode(data.subarray(0, nul))}`,
            value: body ? clean(utf8.decode(body)) : "(compressed text could not be read)",
          });
          found++;
        }
      }
    }

    pos = dataEnd + 4;
    if (type === "IEND") {
      end = pos;
      break;
    }
  }
  return end >= 0 ? b.length - end : 0;
}

function scanJpeg(b: Uint8Array, rows: MetaRow[]): number {
  const segments: string[] = [];
  let pos = 2;
  while (pos + 4 <= b.length) {
    if (b[pos] !== 0xff) {
      pos++;
      continue;
    }
    const marker = b[pos + 1];
    if (marker === 0xff) {
      pos++;
      continue;
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2;
      continue;
    }
    if (marker === 0xd9) return b.length - (pos + 2);
    const len = (b[pos + 2] << 8) | b[pos + 3];
    if (len < 2) break;
    const start = pos + 4;
    const end = pos + 2 + len;
    if (end > b.length) break;

    if (marker === 0xfe) {
      const text = clean(latin1.decode(b.subarray(start, end)));
      if (text) rows.push({ label: "JPEG comment", value: text });
    } else if (marker >= 0xe0 && marker <= 0xef) {
      const seg = b.subarray(start, Math.min(end, start + 30));
      const nul = seg.indexOf(0);
      const id = latin1.decode(nul >= 0 ? seg.subarray(0, nul) : seg).replace(/[^\x20-\x7e]/g, "");
      segments.push(`APP${marker - 0xe0}${id ? ` (${id.slice(0, 24)})` : ""}`);
    }

    if (marker === 0xda) {
      // Scan data mein FF D9 sirf asli image ke end par aata hai
      if (segments.length > 0) {
        rows.unshift({ label: "Metadata segments in file", value: segments.join(", ") });
      }
      for (let i = end; i + 1 < b.length; i++) {
        if (b[i] === 0xff && b[i + 1] === 0xd9) return b.length - (i + 2);
      }
      return 0;
    }
    pos = end;
  }
  if (segments.length > 0) {
    rows.unshift({ label: "Metadata segments in file", value: segments.join(", ") });
  }
  return 0;
}

function describeTail(b: Uint8Array, from: number): string {
  const s4 = ascii(b, from, 4);
  if (s4.startsWith("PK")) return "ZIP archive (or a ZIP-based file)";
  if (s4 === "Rar!") return "RAR archive";
  if (s4 === "%PDF") return "PDF document";
  if (b[from] === 0x89 && ascii(b, from + 1, 3) === "PNG") return "Another PNG image";
  if (b[from] === 0xff && b[from + 1] === 0xd8) return "Another JPEG image";
  if (s4.startsWith("ID3")) return "Audio data";
  if (s4.startsWith("7z")) return "7-Zip archive";
  return "Unknown data";
}

function hexDump(b: Uint8Array): string {
  const lines: string[] = [];
  for (let i = 0; i < b.length; i += 16) {
    const chunk = b.subarray(i, i + 16);
    const hex = Array.from(chunk)
      .map((x) => x.toString(16).padStart(2, "0"))
      .join(" ")
      .padEnd(47, " ");
    const text = Array.from(chunk)
      .map((x) => (x >= 32 && x < 127 ? String.fromCharCode(x) : "."))
      .join("");
    lines.push(`${i.toString(16).padStart(6, "0")}  ${hex}  ${text}`);
  }
  return lines.join("\n");
}

export async function scanImageExtras(
  file: File,
  format: string,
): Promise<{ sections: MetaSection[]; foundHidden: boolean }> {
  const sections: MetaSection[] = [];
  let foundHidden = false;

  try {
    const head = new Uint8Array(await file.slice(0, 128).arrayBuffer());
    const canScan = file.size <= MAX_SCAN_BYTES;
    const rows: MetaRow[] = [];
    const fingerprint: MetaRow[] = [];
    let note: string | undefined;

    if (!canScan) {
      note = `This file is larger than ${formatBytes(MAX_SCAN_BYTES)}, so the hidden data scan and fingerprint were skipped to keep your browser fast.`;
    } else {
      const ab = await file.arrayBuffer();
      const b = new Uint8Array(ab);

      let trailing = 0;
      if (format === "PNG") {
        trailing = await scanPng(b, rows);
      } else if (format === "JPEG") {
        trailing = scanJpeg(b, rows);
      } else {
        note = "The hidden text scan covers PNG and JPEG files.";
      }

      if (trailing > 0) {
        const from = b.length - trailing;
        rows.push(
          {
            label: "Extra data after end of image",
            value: `${formatBytes(trailing)} (${trailing.toLocaleString("en-US")} bytes)`,
          },
          { label: "Extra data looks like", value: describeTail(b, from) },
        );
        note =
          "Some phones and cameras add extra data on purpose, for example motion photos or depth maps. It can also be a file hidden inside the image.";
      }

      foundHidden =
        rows.some((r) => r.label.startsWith("PNG text") || r.label === "JPEG comment") ||
        trailing > 0;

      if (rows.length === 0 && (format === "PNG" || format === "JPEG")) {
        rows.push({ label: "Result", value: "No text comments or extra data were found." });
      }

      try {
        const digest = await crypto.subtle.digest("SHA-256", ab);
        fingerprint.push({
          label: "SHA-256",
          value: Array.from(new Uint8Array(digest))
            .map((x) => x.toString(16).padStart(2, "0"))
            .join(""),
        });
      } catch {
        // crypto.subtle sirf secure context (https / localhost) mein milta hai
      }
    }

    if (rows.length > 0 || note) {
      sections.push({ id: "hidden", title: "Hidden text and extra data", rows, note });
    }
    if (fingerprint.length > 0) {
      sections.push({
        id: "fingerprint",
        title: "File fingerprint",
        rows: fingerprint,
        note: "The same file always gives the same SHA-256. Any change to the file changes it.",
      });
    }
    sections.push({
      id: "hex",
      title: "File header (hex)",
      rows: [],
      text: hexDump(head),
      note: "The first 128 bytes of the file.",
      collapsed: true,
    });
  } catch {
    // Scan fail ho jaye to baaki report phir bhi chalti rahe
  }

  return { sections, foundHidden };
}