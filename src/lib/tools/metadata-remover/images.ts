import { ascii, be32, concat, latin1, le32 } from "./bytes";
import { orientationOnlyExif, readTiff, type Exif } from "./exif";
import type { MetaKind } from "./types";

export type Cleaned = {
  out: Uint8Array;
  found: Set<MetaKind>;
  notes: string[];
};

function addExif(found: Set<MetaKind>, e: Exif) {
  if (e.gps) found.add("gps");
  if (e.camera) found.add("camera");
  if (e.datetime) found.add("datetime");
  if (e.software) found.add("software");
  if (e.other) found.add("other");
}

function addXmp(found: Set<MetaKind>, payload: Uint8Array) {
  found.add("other");
  if (/GPSLatitude|GPSLongitude/.test(latin1(payload))) found.add("gps");
}

/* ---------- JPEG ---------- */
export function cleanJpeg(b: Uint8Array): Cleaned {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) {
    throw new Error("This is not a valid JPEG file.");
  }
  const found = new Set<MetaKind>();
  const notes: string[] = [];
  const parts: Uint8Array[] = [b.subarray(0, 2)];
  let orientation = 1;
  let pos = 2;
  let finished = false;
  let trailing = 0;

  while (pos < b.length) {
    if (b[pos] !== 0xff) throw new Error("The JPEG structure is damaged.");
    let m = pos + 1;
    while (m < b.length && b[m] === 0xff) m++;
    if (m >= b.length) break;
    const marker = b[m];

    if (marker === 0xd9) {
      parts.push(b.subarray(m - 1, m + 1));
      trailing = b.length - (m + 1);
      finished = true;
      break;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
      parts.push(b.subarray(m - 1, m + 1));
      pos = m + 1;
      continue;
    }
    if (m + 2 >= b.length) throw new Error("The JPEG file is cut off.");
    const len = (b[m + 1] << 8) | b[m + 2];
    const segEnd = m + 1 + len;
    if (len < 2 || segEnd > b.length) {
      throw new Error("The JPEG file is cut off.");
    }
    const payload = b.subarray(m + 3, segEnd);
    const seg = b.subarray(m - 1, segEnd);
    let keep = true;

    if (marker === 0xe1) {
      keep = false;
      if (ascii(payload, 0, 6) === "Exif\0\0") {
        const e = readTiff(payload.subarray(6));
        addExif(found, e);
        if (e.orientation > 1) orientation = e.orientation;
      } else if (ascii(payload, 0, 28) === "http://ns.adobe.com/xap/1.0/") {
        addXmp(found, payload);
      } else {
        found.add("other");
      }
    } else if (marker === 0xe2) {
      if (ascii(payload, 0, 12) === "ICC_PROFILE\0") keep = true;
      else {
        keep = false;
        if (ascii(payload, 0, 4) !== "MPF\0") found.add("other");
      }
    } else if (marker === 0xee) {
      keep = ascii(payload, 0, 5) === "Adobe";
      if (!keep) found.add("other");
    } else if (marker === 0xe0) {
      keep = true;
    } else if (marker === 0xed || (marker >= 0xe3 && marker <= 0xef) || marker === 0xfe) {
      keep = false;
      found.add("other");
    }

    if (keep) parts.push(seg);
    pos = segEnd;

    if (marker === 0xda) {
      let j = pos;
      while (j < b.length - 1) {
        if (b[j] === 0xff && b[j + 1] !== 0x00 && !(b[j + 1] >= 0xd0 && b[j + 1] <= 0xd7)) break;
        j++;
      }
      parts.push(b.subarray(pos, j));
      pos = j;
    }
  }
  if (!finished) throw new Error("The JPEG file is cut off or damaged.");

  if (orientation > 1) {
    const at =
      parts.length > 1 && parts[1][0] === 0xff && parts[1][1] === 0xe0 ? 2 : 1;
    parts.splice(at, 0, orientationOnlyExif(orientation));
    notes.push(
      "A small rotation tag was kept so your photo does not turn sideways. It does not identify you.",
    );
  }
  if (trailing > 64) {
    found.add("other");
    notes.push(
      `Extra data after the picture (${Math.max(1, Math.round(trailing / 1024))} KB) was removed. Some phones store a gain map or a short video there.`,
    );
  }
  return { out: concat(parts), found, notes };
}

/* ---------- PNG ---------- */
const PNG_KEEP = new Set([
  "IHDR", "PLTE", "IDAT", "IEND", "tRNS", "gAMA", "cHRM", "sRGB", "iCCP",
  "sBIT", "bKGD", "hIST", "pHYs", "acTL", "fcTL", "fdAT", "cICP", "mDCV", "cLLI",
]);

export function cleanPng(b: Uint8Array): Cleaned {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (b.length < 20 || sig.some((v, i) => b[i] !== v)) {
    throw new Error("This is not a valid PNG file.");
  }
  const found = new Set<MetaKind>();
  const notes: string[] = [];
  const parts: Uint8Array[] = [b.subarray(0, 8)];
  let p = 8;
  let ended = false;
  let trailing = 0;

  while (p + 12 <= b.length) {
    const len = be32(b, p);
    const type = ascii(b, p + 4, 4);
    const end = p + 12 + len;
    if (end > b.length) throw new Error("The PNG file is cut off.");
    const data = b.subarray(p + 8, p + 8 + len);

    if (PNG_KEEP.has(type)) {
      parts.push(b.subarray(p, end));
    } else if (type === "eXIf") {
      const e = readTiff(data);
      addExif(found, e);
      if (e.orientation > 1) {
        notes.push("The picture had a rotation tag, which was removed with the rest.");
      }
    } else if (type === "tIME") {
      found.add("datetime");
    } else if (type === "tEXt" || type === "zTXt" || type === "iTXt") {
      const z = data.indexOf(0);
      const key = z > 0 ? ascii(data, 0, z) : "";
      if (key === "Software") found.add("software");
      else if (key === "Creation Time") found.add("datetime");
      else found.add("other");
    } else {
      found.add("other");
    }

    p = end;
    if (type === "IEND") {
      ended = true;
      trailing = b.length - p;
      break;
    }
  }
  if (!ended) throw new Error("The PNG file is damaged.");
  if (trailing > 16) {
    found.add("other");
    notes.push("Extra data after the picture was removed.");
  }
  return { out: concat(parts), found, notes };
}

/* ---------- WebP ---------- */
const WEBP_KEEP = ["ICCP", "ALPH", "ANIM", "ANMF", "VP8 ", "VP8L"];

export function cleanWebp(b: Uint8Array): Cleaned {
  if (b.length < 20 || ascii(b, 0, 4) !== "RIFF" || ascii(b, 8, 4) !== "WEBP") {
    throw new Error("This is not a valid WebP file.");
  }
  const found = new Set<MetaKind>();
  const notes: string[] = [];
  const chunks: Uint8Array[] = [];
  const even = (c: Uint8Array) =>
    c.length % 2 ? concat([c, new Uint8Array(1)]) : c;
  let p = 12;

  while (p + 8 <= b.length) {
    const type = ascii(b, p, 4);
    const size = le32(b, p + 4);
    const dataEnd = p + 8 + size;
    if (dataEnd > b.length) throw new Error("The WebP file is cut off.");
    const padEnd = Math.min(dataEnd + (size & 1), b.length);
    const data = b.subarray(p + 8, dataEnd);

    if (type === "EXIF") {
      const at = ascii(data, 0, 6) === "Exif\0\0" ? 6 : 0;
      const e = readTiff(data.subarray(at));
      addExif(found, e);
      if (e.orientation > 1) {
        notes.push("The picture had a rotation tag, which was removed with the rest.");
      }
    } else if (type === "XMP ") {
      addXmp(found, data);
    } else if (type === "VP8X") {
      const c = b.slice(p, padEnd);
      c[8] = c[8] & ~0x0c; // EXIF aur XMP ke flags band
      chunks.push(even(c));
    } else if (WEBP_KEEP.includes(type)) {
      chunks.push(even(b.subarray(p, padEnd)));
    } else {
      found.add("other");
    }
    p = padEnd;
  }

  const body = concat(chunks);
  const header = new Uint8Array(12);
  header.set([0x52, 0x49, 0x46, 0x46], 0);
  new DataView(header.buffer).setUint32(4, 4 + body.length, true);
  header.set([0x57, 0x45, 0x42, 0x50], 8);
  return { out: concat([header, body]), found, notes };
}