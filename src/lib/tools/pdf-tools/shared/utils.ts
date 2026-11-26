export { downloadBlob, formatBytes } from "@/lib/tools/utils";

// Browsers (khaas kar iPhone Safari) bohat bare canvas nahi banane dete
export const MAX_CANVAS_PIXELS = 16_000_000;
export const MAX_CANVAS_SIDE = 8192;

export function clampScale(
  width: number,
  height: number,
  scale: number,
): number {
  let s = scale;
  if (width * s > MAX_CANVAS_SIDE) s = MAX_CANVAS_SIDE / width;
  if (height * s > MAX_CANVAS_SIDE) s = MAX_CANVAS_SIDE / height;
  const area = width * s * (height * s);
  if (area > MAX_CANVAS_PIXELS) s *= Math.sqrt(MAX_CANVAS_PIXELS / area);
  return s;
}

// Object URLs ko ek jagah se banana aur saaf karna
export function createUrlTracker() {
  const urls = new Set<string>();
  return {
    create(blob: Blob): string {
      const url = URL.createObjectURL(blob);
      urls.add(url);
      return url;
    },
    revoke(url: string) {
      if (urls.delete(url)) URL.revokeObjectURL(url);
    },
    revokeAll() {
      urls.forEach((u) => URL.revokeObjectURL(u));
      urls.clear();
    },
  };
}

export function baseName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  let clean = "";
  for (const ch of base) {
    if (ch.charCodeAt(0) >= 32 && !'\\/:*?"<>|'.includes(ch)) clean += ch;
  }
  return clean.trim().slice(0, 100) || "file";
}

export function pageFileName(
  base: string,
  page: number,
  totalPages: number,
  ext: string,
): string {
  const width = String(totalPages).length;
  return `${base}-page-${String(page).padStart(width, "0")}.${ext}`;
}

// Lambay loop ke beech UI ko saans lene dena
export const yieldToBrowser = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

export function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    const e = new Error("Cancelled");
    e.name = "AbortError";
    throw e;
  }
}

export const isAbortError = (e: unknown) =>
  e instanceof Error && e.name === "AbortError";