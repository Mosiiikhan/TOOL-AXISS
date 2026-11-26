
import {
  PdfToolError,
  type FileKind,
  type Rejection,
  type ValidationResult,
} from "./types";

export const LIMITS = {
  maxPdfBytes: 100 * 1024 * 1024,
  maxImageBytes: 30 * 1024 * 1024,
  maxImages: 100,
  maxPdfPages: 300,
} as const;

function ascii(b: Uint8Array, from: number, len: number): string {
  let s = "";
  for (let i = 0; i < len && from + i < b.length; i++) {
    s += String.fromCharCode(b[from + i]);
  }
  return s;
}

export async function detectKind(file: Blob): Promise<FileKind | null> {
  const head = new Uint8Array(await file.slice(0, 1024).arrayBuffer());

  if (ascii(head, 0, 1024).includes("%PDF-")) return "pdf";
  if (head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) {
    return "jpeg";
  }
  if (
    head[0] === 0x89 &&
    head[1] === 0x50 &&
    head[2] === 0x4e &&
    head[3] === 0x47
  ) {
    return "png";
  }
  if (ascii(head, 0, 4) === "RIFF" && ascii(head, 8, 4) === "WEBP") {
    return "webp";
  }
  return null;
}

const KIND_LABEL: Record<FileKind, string> = {
  pdf: "PDF",
  jpeg: "JPG",
  png: "PNG",
  webp: "WebP",
};

export async function validatePdfFile(file: File): Promise<FileKind> {
  if (file.size === 0) {
    throw new PdfToolError("empty", "This file is empty.");
  }

  if (file.size > LIMITS.maxPdfBytes) {
    throw new PdfToolError(
      "too-large",
      "This PDF exceeds the 100 MB browser processing limit.",
    );
  }

  const kind = await detectKind(file);

  if (kind !== "pdf") {
    throw new PdfToolError(
      "invalid-type",
      kind
        ? `This is a ${KIND_LABEL[kind]} file, not a PDF.`
        : "This file is not a valid PDF file.",
    );
  }

  return kind;
}

export async function validateImageFiles(
  files: File[],
  alreadyHave = 0,
): Promise<ValidationResult & { kinds: Map<File, FileKind> }> {
  const accepted: File[] = [];
  const rejected: Rejection[] = [];
  const kinds = new Map<File, FileKind>();

  for (const file of files) {
    if (alreadyHave + accepted.length >= LIMITS.maxImages) {
      rejected.push({
        name: file.name,
        reason: `You can add up to ${LIMITS.maxImages} images.`,
      });
      continue;
    }

    if (file.size === 0) {
      rejected.push({ name: file.name, reason: "The file is empty." });
      continue;
    }

    if (file.size > LIMITS.maxImageBytes) {
      rejected.push({
        name: file.name,
        reason: "The image exceeds the 30 MB limit.",
      });
      continue;
    }

    const kind = await detectKind(file);

    if (kind === "jpeg" || kind === "png" || kind === "webp") {
      accepted.push(file);
      kinds.set(file, kind);
    } else {
      rejected.push({
        name: file.name,
        reason: "Only JPG, PNG and WebP images are supported.",
      });
    }
  }

  return { accepted, rejected, kinds };
}
