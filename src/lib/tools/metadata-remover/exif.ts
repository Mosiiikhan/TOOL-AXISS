export type Exif = {
  gps: boolean;
  camera: boolean;
  datetime: boolean;
  software: boolean;
  other: boolean;
  orientation: number;
};

const CAMERA = new Set([
  0x010f, 0x0110, 0x829a, 0x829d, 0x8827, 0x920a, 0xa430, 0xa431, 0xa433,
  0xa434, 0xa435,
]);
const DATES = new Set([
  0x0132, 0x9003, 0x9004, 0x9010, 0x9011, 0x9012, 0x9290, 0x9291, 0x9292,
]);
const OTHER = new Set([
  0x010e, 0x013b, 0x013c, 0x8298, 0x927c, 0x9286, 0xa420, 0x02bc,
]);

// `t` = bytes jo TIFF header se shuru hon ("II*\0" ya "MM\0*")
export function readTiff(t: Uint8Array): Exif {
  const r: Exif = {
    gps: false,
    camera: false,
    datetime: false,
    software: false,
    other: false,
    orientation: 1,
  };
  if (t.length < 8) {
    r.other = true;
    return r;
  }
  const little = t[0] === 0x49 && t[1] === 0x49;
  if (!little && !(t[0] === 0x4d && t[1] === 0x4d)) {
    r.other = true;
    return r;
  }
  const dv = new DataView(t.buffer, t.byteOffset, t.byteLength);
  const u16 = (o: number) => dv.getUint16(o, little);
  const u32 = (o: number) => dv.getUint32(o, little);

  const gpsHasPosition = (off: number) => {
    if (off < 8 || off + 2 > t.length) return false;
    const n = u16(off);
    for (let i = 0; i < n; i++) {
      const e = off + 2 + i * 12;
      if (e + 12 > t.length) return false;
      const tag = u16(e);
      if (tag === 2 || tag === 4) return true;
    }
    return false;
  };

  const readIfd = (off: number, level: number) => {
    if (level > 2 || off < 8 || off + 2 > t.length) return;
    const n = u16(off);
    for (let i = 0; i < n; i++) {
      const e = off + 2 + i * 12;
      if (e + 12 > t.length) return;
      const tag = u16(e);
      if (tag === 0x0112) {
        const v = u16(e + 8);
        if (v >= 1 && v <= 8) r.orientation = v;
      } else if (tag === 0x0131) r.software = true;
      else if (tag === 0x8769) readIfd(u32(e + 8), level + 1);
      else if (tag === 0x8825) {
        if (gpsHasPosition(u32(e + 8))) r.gps = true;
      } else if (CAMERA.has(tag)) r.camera = true;
      else if (DATES.has(tag)) r.datetime = true;
      else if (OTHER.has(tag)) r.other = true;
    }
    if (level === 0) {
      const next = off + 2 + n * 12;
      if (next + 4 <= t.length && u32(next) !== 0) r.other = true; // thumbnail
    }
  };

  readIfd(u32(4), 0);
  return r;
}

// Sirf rotation wala tag: is se koi pehchanta nahi, magar photo seedhi rehti hai
export function orientationOnlyExif(o: number): Uint8Array {
  const tiff = [
    0x4d, 0x4d, 0x00, 0x2a, 0, 0, 0, 8, 0, 1, 0x01, 0x12, 0, 3, 0, 0, 0, 1, 0,
    o, 0, 0, 0, 0, 0, 0,
  ];
  const payload = [0x45, 0x78, 0x69, 0x66, 0, 0, ...tiff];
  const len = payload.length + 2;
  return new Uint8Array([0xff, 0xe1, (len >> 8) & 255, len & 255, ...payload]);
}