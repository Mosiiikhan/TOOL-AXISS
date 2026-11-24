export type MetaKind = "gps" | "camera" | "datetime" | "software" | "other";
export type FileKind = "jpeg" | "png" | "webp" | "mp4";
export type Stage = "reading" | "removing" | "verifying";

export const META_ORDER: MetaKind[] = [
  "gps",
  "camera",
  "datetime",
  "software",
  "other",
];

export const META_LABELS: Record<MetaKind, string> = {
  gps: "GPS location",
  camera: "Camera and settings",
  datetime: "Date and time",
  software: "Software",
  other: "Other hidden data",
};

export type Inspection = { kind: FileKind; found: MetaKind[]; notes: string[] };

export type CleanResult = {
  blob: Blob;
  removed: MetaKind[];
  notes: string[];
  verified: boolean;
  problems: string[];
};