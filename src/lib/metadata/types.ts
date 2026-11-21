export type FileKind = "image" | "video";

export type MetaValue =
  | string
  | number
  | boolean
  | null
  | MetaValue[]
  | { [key: string]: MetaValue };

export type MetaObject = { [key: string]: MetaValue };

export type MetaRow = { label: string; value: string };

export type MetaSection = {
  id: string;
  title: string;
  rows: MetaRow[];
  moreRows?: MetaRow[];
  text?: string;
  note?: string;
  collapsed?: boolean;
};

export type FileInfo = {
  name: string;
  extension: string;
  mime: string;
  size: number;
  lastModified: string | null;
};

export type ExtractResult = {
  kind: FileKind;
  file: FileInfo;
  format: string;
  width: number | null;
  height: number | null;
  raw: MetaObject;
  warnings: string[];
  hasEmbeddedMetadata: boolean;
  extraSections?: MetaSection[];
};

export class MetadataError extends Error {}

export const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "jfif",
  "png",
  "webp",
  "heic",
  "heif",
  "avif",
  "tif",
  "tiff",
  "gif",
  "bmp",
];

export const VIDEO_EXTENSIONS = ["mp4", "mov", "webm", "mkv", "avi", "m4v", "3gp"];

export const FILE_ACCEPT =
  "image/*,video/*,.jfif,.heic,.heif,.avif,.tif,.tiff,.mkv,.avi,.m4v,.3gp,.mov";