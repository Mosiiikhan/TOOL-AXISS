
export type FileKind = "pdf" | "jpeg" | "png" | "webp";

export type PdfToolErrorCode =
  | "empty"
  | "too-large"
  | "invalid-type"
  | "too-many-files"
  | "invalid-pdf"
  | "too-many-pages"
  | "unsupported"
  | "conversion-failed";

export class PdfToolError extends Error {
  constructor(
    public readonly code: PdfToolErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "PdfToolError";
  }
}

export interface Rejection {
  name: string;
  reason: string;
}

export interface ValidationResult {
  accepted: File[];
  rejected: Rejection[];
}
