import { IMAGE_EXTENSIONS, MetadataError, VIDEO_EXTENSIONS } from "./types";
import { scanImageExtras } from "./deep";
import type {
  ExtractResult,
  FileInfo,
  FileKind,
  MetaObject,
  MetaValue,
} from "./types";

export function getExtension(name: string) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i + 1).toLowerCase() : "";
}

export function detectKind(file: File): FileKind | null {
  const ext = getExtension(file.name);
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  return null;
}

const ascii = (b: Uint8Array, start: number, len: number) =>
  String.fromCharCode(...Array.from(b.slice(start, start + len)));

// File ke shuruati bytes dekh kar asli format pehchanta hai
async function sniffFormat(file: File): Promise<string> {
  try {
    const b = new Uint8Array(await file.slice(0, 32).arrayBuffer());
    if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "JPEG";
    if (b[0] === 0x89 && ascii(b, 1, 3) === "PNG") return "PNG";
    if (ascii(b, 0, 3) === "GIF") return "GIF";
    if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") return "WebP";
    if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "AVI ") return "AVI";
    if (b[0] === 0x42 && b[1] === 0x4d) return "BMP";
    if (
      (ascii(b, 0, 2) === "II" && b[2] === 0x2a && b[3] === 0) ||
      (ascii(b, 0, 2) === "MM" && b[2] === 0 && b[3] === 0x2a)
    ) {
      return "TIFF";
    }
    if (b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) {
      return "Matroska / WebM";
    }
    if (ascii(b, 4, 4) === "ftyp") {
      const brand = ascii(b, 8, 4);
      if (["heic", "heix", "hevc", "hevx", "mif1", "msf1"].includes(brand)) {
        return "HEIC / HEIF";
      }
      if (["avif", "avis"].includes(brand)) return "AVIF";
      if (brand === "qt  ") return "QuickTime (MOV)";
      if (brand.startsWith("3gp")) return "3GP";
      return `MP4 family (${brand.trim()})`;
    }
  } catch {
    // neeche "Unknown" wapas hoga
  }
  return "Unknown";
}

function fileInfo(file: File): FileInfo {
  let lastModified: string | null = null;
  try {
    if (file.lastModified) lastModified = new Date(file.lastModified).toISOString();
  } catch {
    lastModified = null;
  }
  return {
    name: file.name,
    extension: getExtension(file.name),
    mime: file.type || "unknown",
    size: file.size,
    lastModified,
  };
}

// Parser ka output JSON ke liye saaf karta hai (dates, binary data waghera)
function normalize(value: unknown, depth = 0): MetaValue {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : String(value);
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "Invalid date" : value.toISOString();
  }
  if (value instanceof ArrayBuffer) return `[binary data, ${value.byteLength} bytes]`;
  if (ArrayBuffer.isView(value)) return `[binary data, ${value.byteLength} bytes]`;
  if (depth > 6) return "[nested data]";
  if (Array.isArray(value)) {
    if (value.length > 200) return `[list of ${value.length} items]`;
    return value.map((v) => normalize(v, depth + 1));
  }
  if (typeof value === "object") {
    const out: MetaObject = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (typeof v === "function") continue;
      out[k] = normalize(v, depth + 1);
    }
    return out;
  }
  return String(value);
}

const isObj = (v: unknown): v is MetaObject =>
  typeof v === "object" && v !== null && !Array.isArray(v);

async function readDimensions(file: File) {
  try {
    const bmp = await createImageBitmap(file);
    const d = { w: bmp.width, h: bmp.height };
    bmp.close();
    return d;
  } catch {
    return null;
  }
}

const EXIFR_OPTIONS = {
  tiff: true,
  xmp: true,
  icc: true,
  iptc: true,
  jfif: true,
  ihdr: true,
  ifd0: true,
  exif: true,
  gps: true,
  interop: true,
  ifd1: true,
  makerNote: true,
  userComment: true,
  mergeOutput: false,
  translateKeys: true,
  translateValues: true,
  reviveValues: false, // dates jaise file mein likhi hain waise hi dikhengi
  sanitize: true,
  multiSegment: true,
};

async function extractImage(
  file: File,
  format: string,
  info: FileInfo,
): Promise<ExtractResult> {
  const warnings: string[] = [];
  let raw: MetaObject = {};
  let parserFailed = false;

  try {
    const mod = await import("exifr");
    const api = (mod as unknown as { default?: typeof mod }).default ?? mod;
    const parsed = await api.parse(file, EXIFR_OPTIONS as never);
    if (parsed && typeof parsed === "object") {
      const n = normalize(parsed);
      if (isObj(n)) raw = n;
    }
  } catch {
    parserFailed = true;
    warnings.push(
      "The metadata parser could not read this file type, so only basic file properties are shown.",
    );
  }

  const dims = await readDimensions(file);
  let width = dims?.w ?? null;
  let height = dims?.h ?? null;
  if (!width || !height) {
    const ihdr = isObj(raw.ihdr) ? raw.ihdr : null;
    const exif = isObj(raw.exif) ? raw.exif : null;
    const w = ihdr?.ImageWidth ?? exif?.ExifImageWidth;
    const h = ihdr?.ImageHeight ?? exif?.ExifImageHeight;
    if (typeof w === "number" && typeof h === "number") {
      width = w;
      height = h;
    }
  }

  if (!dims && parserFailed && format === "Unknown") {
    throw new MetadataError(
      "This file could not be read as an image or video. It may be damaged, or in a format that is not supported.",
    );
  }

  if (!parserFailed && Object.keys(raw).length === 0 && format === "WebP") {
    warnings.push(
      "The image metadata reader may not read embedded metadata from WebP files, so only basic properties are shown.",
    );
  }

  const extras = await scanImageExtras(file, format);

  return {
    kind: "image",
    file: info,
    format,
    width,
    height,
    raw,
    warnings,
    hasEmbeddedMetadata: Object.keys(raw).length > 0 || extras.foundHidden,
    extraSections: extras.sections,
  };
}

async function extractVideo(
  file: File,
  format: string,
  info: FileInfo,
): Promise<ExtractResult> {
  let mediainfo;
  try {
    // Runtime par browser se load hota hai; bundler is URL ko nahi dekhta
    const src = new URL("/wasm/mediainfo.js", window.location.href).href;
    const mod = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ src);
    const factory = mod.default ?? mod.mediaInfoFactory;
    mediainfo = await factory({
      format: "object",
      full: true,
      locateFile: (path: string) => `/wasm/${path}`,
    });
  } catch {
    throw new MetadataError(
      "The video analyzer could not be loaded. Please refresh the page and try again.",
    );
  }

  let result: unknown;
  try {
    result = await mediainfo.analyzeData(
      file.size,
      async (chunkSize: number, offset: number) =>
        new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer()),
    );
  } catch {
    throw new MetadataError(
      "This video could not be analyzed. It may be damaged, or this format is not supported.",
    );
  } finally {
    mediainfo.close();
  }

  const n = normalize(result);
  const raw: MetaObject = isObj(n) ? n : {};
  const media = isObj(raw.media) ? raw.media : null;
  const hasTracks = media !== null && Array.isArray(media.track) && media.track.length > 0;

  return {
    kind: "video",
    file: info,
    format,
    width: null,
    height: null,
    raw,
    warnings: [],
    hasEmbeddedMetadata: hasTracks,
  };
}

export async function extractMetadata(file: File): Promise<ExtractResult> {
  if (file.size === 0) throw new MetadataError("This file is empty.");
  const kind = detectKind(file);
  if (!kind) throw new MetadataError("This file type is not supported.");
  const [format, info] = [await sniffFormat(file), fileInfo(file)];
  return kind === "image"
    ? extractImage(file, format, info)
    : extractVideo(file, format, info);
}