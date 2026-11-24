export function ascii(b: Uint8Array, o: number, n: number): string {
  let s = "";
  for (let i = 0; i < n && o + i < b.length; i++) {
    s += String.fromCharCode(b[o + i]);
  }
  return s;
}

export const be32 = (b: Uint8Array, o: number) =>
  ((b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0;

export const le32 = (b: Uint8Array, o: number) =>
  (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0;

export function concat(parts: Uint8Array[]): Uint8Array {
  let total = 0;
  for (const p of parts) total += p.length;
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export function latin1(b: Uint8Array): string {
  let s = "";
  const CH = 8192;
  for (let i = 0; i < b.length; i += CH) {
    s += String.fromCharCode(...b.subarray(i, i + CH));
  }
  return s;
}

export const asPart = (u: Uint8Array) => u as unknown as BlobPart;