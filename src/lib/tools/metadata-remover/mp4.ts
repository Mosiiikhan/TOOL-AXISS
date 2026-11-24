import { asPart, be32, latin1 } from "./bytes";
import type { MetaKind } from "./types";

const fourcc = (b: Uint8Array, o: number) =>
  String.fromCharCode(b[o], b[o + 1], b[o + 2], b[o + 3]);

const XMP_UUID = [
  0xbe, 0x7a, 0xcf, 0xcb, 0x97, 0xa9, 0x42, 0xe8, 0x9c, 0x71, 0x99, 0x94,
  0x91, 0xe3, 0xaf, 0xac,
];

type Ctx = { found: Set<MetaKind>; notes: Set<string> };
type Patch = { start: number; bytes: Uint8Array };
type Box = { start: number; size: number; type: string; header: number };

const MAX_BOX = 64 * 1024 * 1024;

function classify(payload: Uint8Array, ctx: Ctx) {
  const s = latin1(payload).toLowerCase();
  let hit = false;
  if (s.includes("\u00a9xyz") || s.includes("iso6709") || s.includes("location")) {
    ctx.found.add("gps");
    hit = true;
  }
  if (
    s.includes("\u00a9mak") || s.includes("\u00a9mod") ||
    s.includes("quicktime.make") || s.includes("quicktime.model") ||
    s.includes("manufacturer")
  ) {
    ctx.found.add("camera");
    hit = true;
  }
  if (s.includes("\u00a9day") || s.includes("creationdate")) {
    ctx.found.add("datetime");
    hit = true;
  }
  if (
    s.includes("\u00a9swr") || s.includes("\u00a9too") ||
    s.includes("software") || s.includes("encoder")
  ) {
    ctx.found.add("software");
    hit = true;
  }
  if (!hit && payload.some((v) => v !== 0)) ctx.found.add("other");
}

// Box ko usi jagah "free" bana kar zero kar dete hain: size wahi, is liye offsets nahi hilte
function blank(buf: Uint8Array, p: number, size: number, header: number) {
  buf[p + 4] = 0x66;
  buf[p + 5] = 0x72;
  buf[p + 6] = 0x65;
  buf[p + 7] = 0x65;
  buf.fill(0, p + header, p + size);
}

function zeroTimes(buf: Uint8Array, p: number, size: number, header: number, ctx: Ctx) {
  const o = p + header;
  const len = buf[o] === 1 ? 16 : 8;
  if (o + 4 + len > p + size) return;
  let nonzero = false;
  for (let i = 0; i < len; i++) if (buf[o + 4 + i] !== 0) nonzero = true;
  if (nonzero) ctx.found.add("datetime");
  buf.fill(0, o + 4, o + 4 + len);
}

function walk(buf: Uint8Array, start: number, end: number, path: string, ctx: Ctx) {
  let p = start;
  while (p + 8 <= end) {
    let size = be32(buf, p);
    const type = fourcc(buf, p + 4);
    let header = 8;
    if (size === 1) {
      if (p + 16 > end) return;
      size = be32(buf, p + 8) * 4294967296 + be32(buf, p + 12);
      header = 16;
    } else if (size === 0) {
      size = end - p;
    }
    if (size < header || p + size > end) return;

    if (type === "udta" || type === "meta") {
      classify(buf.subarray(p + header, p + size), ctx);
      blank(buf, p, size, header);
    } else if (type === "mvhd" || type === "tkhd" || type === "mdhd") {
      zeroTimes(buf, p, size, header, ctx);
    } else if (type === "hdlr" && path.endsWith("/mdia")) {
      const h = fourcc(buf, p + header + 8);
      if (h === "meta" || h === "camm" || h === "gpmd") {
        ctx.notes.add(
          "This video has extra data tracks (for example motion or GPS tracks). They are not removed yet.",
        );
      }
    } else if (type === "trak" || type === "mdia") {
      walk(buf, p + header, p + size, `${path}/${type}`, ctx);
    }
    p += size;
  }
}

async function readHeader(file: Blob, pos: number): Promise<Box | null> {
  if (pos + 8 > file.size) return null;
  const h = new Uint8Array(await file.slice(pos, pos + 16).arrayBuffer());
  let size = be32(h, 0);
  const type = fourcc(h, 4);
  let header = 8;
  if (size === 1) {
    if (h.length < 16) return null;
    size = be32(h, 8) * 4294967296 + be32(h, 12);
    header = 16;
  } else if (size === 0) {
    size = file.size - pos;
  }
  if (size < header || pos + size > file.size) return null;
  return { start: pos, size, type, header };
}

export async function analyzeMp4(file: Blob) {
  const ctx: Ctx = { found: new Set(), notes: new Set() };
  const patches: Patch[] = [];
  let pos = 0;
  let sawMoov = false;
  let guard = 0;

  while (pos < file.size) {
    if (++guard > 200000) throw new Error("This video has too many parts to scan.");
    const box = await readHeader(file, pos);
    if (!box) throw new Error("This video file looks damaged or cut off.");

    if (box.type === "moov") {
      sawMoov = true;
      if (box.size > 512 * 1024 * 1024) {
        throw new Error("The video index is too large to process in the browser.");
      }
      const buf = new Uint8Array(
        await file.slice(box.start, box.start + box.size).arrayBuffer(),
      );
      walk(buf, box.header, buf.length, "/moov", ctx);
      patches.push({ start: box.start, bytes: buf });
    } else if (
      (box.type === "udta" || box.type === "meta" || box.type === "XMP_" || box.type === "uuid") &&
      box.size <= MAX_BOX
    ) {
      const buf = new Uint8Array(
        await file.slice(box.start, box.start + box.size).arrayBuffer(),
      );
      let isTarget = box.type !== "uuid";
      if (box.type === "uuid") {
        isTarget =
          buf.length >= box.header + 16 &&
          XMP_UUID.every((v, i) => buf[box.header + i] === v);
      }
      if (isTarget) {
        classify(buf.subarray(box.header), ctx);
        ctx.found.add("other");
        blank(buf, 0, buf.length, box.header);
        patches.push({ start: box.start, bytes: buf });
      }
    }
    pos = box.start + box.size;
  }
  if (!sawMoov) {
    throw new Error("No movie data found. Only MP4, MOV and M4V videos are supported.");
  }
  return { found: ctx.found, notes: Array.from(ctx.notes), patches };
}

export async function cleanMp4(file: File) {
  const { found, notes, patches } = await analyzeMp4(file);
  patches.sort((a, b) => a.start - b.start);
  const parts: BlobPart[] = [];
  let cursor = 0;
  for (const pt of patches) {
    parts.push(file.slice(cursor, pt.start));
    parts.push(asPart(pt.bytes));
    cursor = pt.start + pt.bytes.length;
  }
  parts.push(file.slice(cursor));
  const blob = new Blob(parts, { type: file.type || "video/mp4" });
  if (blob.size !== file.size) {
    throw new Error("An internal size check failed, so nothing was changed.");
  }
  return { blob, found, notes };
}