import { ascii, asPart } from "./bytes";
import { cleanJpeg, cleanPng, cleanWebp, type Cleaned } from "./images";
import { analyzeMp4, cleanMp4 } from "./mp4";
import {
  META_LABELS,
  META_ORDER,
  type CleanResult,
  type FileKind,
  type Inspection,
  type MetaKind,
  type Stage,
} from "./types";

const MAX_IMAGE = 100 * 1024 * 1024;
const NOT_YET = ["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1", "avif", "avis"];
const OLD_MOV = ["moov", "mdat", "wide", "free", "skip"];

export async function detectKind(file: File): Promise<FileKind> {
  const b = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (b[0] === 0xff && b[1] === 0xd8) return "jpeg";
  if (b[0] === 0x89 && ascii(b, 1, 3) === "PNG") return "png";
  if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") return "webp";
  const t = ascii(b, 4, 4);
  if (t === "ftyp") {
    if (NOT_YET.includes(ascii(b, 8, 4))) {
      throw new Error(
        "HEIC, HEIF and AVIF photos are not supported yet. JPG, PNG, WebP, MP4 and MOV files are.",
      );
    }
    return "mp4";
  }
  if (OLD_MOV.includes(t)) return "mp4";
  throw new Error("This file type is not supported yet. Use JPG, PNG, WebP, MP4 or MOV.");
}

const order = (s: Set<MetaKind>) => META_ORDER.filter((k) => s.has(k));

function runImage(kind: Exclude<FileKind, "mp4">, bytes: Uint8Array): Cleaned {
  if (kind === "jpeg") return cleanJpeg(bytes);
  if (kind === "png") return cleanPng(bytes);
  return cleanWebp(bytes);
}

const mimeOf = (kind: Exclude<FileKind, "mp4">) =>
  kind === "jpeg" ? "image/jpeg" : kind === "png" ? "image/png" : "image/webp";

function checkSize(file: File, kind: FileKind) {
  if (kind !== "mp4" && file.size > MAX_IMAGE) {
    throw new Error("This picture is larger than 100 MB, which is too big for the browser.");
  }
}

export async function inspectFile(file: File): Promise<Inspection> {
  const kind = await detectKind(file);
  checkSize(file, kind);
  if (kind === "mp4") {
    const r = await analyzeMp4(file);
    return { kind, found: order(r.found), notes: r.notes };
  }
  const r = runImage(kind, new Uint8Array(await file.arrayBuffer()));
  return { kind, found: order(r.found), notes: [] };
}

export async function cleanFile(
  file: File,
  onStage?: (s: Stage) => void,
): Promise<CleanResult> {
  onStage?.("reading");
  const kind = await detectKind(file);
  checkSize(file, kind);
  const problems: string[] = [];
  let blob: Blob;
  let found: Set<MetaKind>;
  let notes: string[];

  if (kind === "mp4") {
    onStage?.("removing");
    const r = await cleanMp4(file);
    blob = r.blob;
    found = r.found;
    notes = r.notes;
    onStage?.("verifying");
    try {
      const check = await analyzeMp4(blob);
      if (check.found.size > 0) {
        problems.push(
          `Still found: ${order(check.found).map((k) => META_LABELS[k]).join(", ")}.`,
        );
      }
    } catch {
      problems.push("The cleaned video could not be read back to check it.");
    }
  } else {
    const bytes = new Uint8Array(await file.arrayBuffer());
    onStage?.("removing");
    const r = runImage(kind, bytes);
    blob = new Blob([asPart(r.out)], { type: mimeOf(kind) });
    found = r.found;
    notes = r.notes;
    onStage?.("verifying");
    try {
      const check = runImage(kind, new Uint8Array(await blob.arrayBuffer()));
      if (check.found.size > 0) {
        problems.push(
          `Still found: ${order(check.found).map((k) => META_LABELS[k]).join(", ")}.`,
        );
      }
    } catch {
      problems.push("The cleaned file could not be read back to check it.");
    }
  }

  return {
    blob,
    removed: order(found),
    notes,
    verified: problems.length === 0,
    problems,
  };
}