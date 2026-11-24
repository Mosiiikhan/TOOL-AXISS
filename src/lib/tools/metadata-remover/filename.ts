import type { FileKind } from "./types";

const EXT_BY_KIND: Record<FileKind, string> = {
  jpeg: ".jpg",
  png: ".png",
  webp: ".webp",
  mp4: ".mp4",
};

export function splitName(name: string) {
  const dot = name.lastIndexOf(".");
  if (dot > 0 && name.length - dot <= 8) {
    return { base: name.slice(0, dot), ext: name.slice(dot) };
  }
  return { base: name, ext: "" };
}

export const extFor = (name: string, kind: FileKind) =>
  splitName(name).ext || EXT_BY_KIND[kind];

export const suggestedBase = (name: string) => `${splitName(name).base}-cleaned`;

function sanitize(input: string): string {
  let out = "";
  for (const ch of input) {
    if (ch.charCodeAt(0) >= 32 && !'\\/:*?"<>|'.includes(ch)) out += ch;
  }
  return out.replace(/\s+/g, " ").replace(/^[\s.]+|[\s.]+$/g, "").slice(0, 120);
}

// Sirf naam badalta hai. Extension asli file wali hi rehti hai,
// aur naam kabhi asli file ke naam jaisa nahi banta.
export function finalFileName(original: string, base: string, kind: FileKind) {
  const ext = extFor(original, kind);
  let b = sanitize(base);
  if (b.toLowerCase().endsWith(ext.toLowerCase())) {
    b = sanitize(b.slice(0, b.length - ext.length));
  }
  let adjusted = false;
  if (!b) {
    b = suggestedBase(original);
    adjusted = true;
  }
  let name = `${b}${ext}`;
  if (name.toLowerCase() === original.toLowerCase()) {
    name = `${b}-cleaned${ext}`;
    adjusted = true;
  }
  return { name, adjusted };
}