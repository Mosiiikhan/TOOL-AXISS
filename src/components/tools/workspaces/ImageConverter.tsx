"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "@/components/tools/Dropzone";
import Button from "@/components/ui/Button";
import type { WorkspaceProps } from "@/lib/tools/types";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";

type OutFormat = "jpg" | "png" | "webp";

type Item = {
  id: string;
  file: File;
  from: string;
  isJpeg: boolean;
  isHeic: boolean;
  url: string;
};

type Failure = { name: string; heic: boolean };

type Result = {
  id: string;
  name: string;
  from: string;
  to: OutFormat;
  originalSize: number;
  blob: Blob;
  url: string;
  passthrough: boolean;
};

const OUTPUTS: {
  value: OutFormat;
  label: string;
  mime: string;
  hint: string;
}[] = [
  { value: "jpg", label: "JPG", mime: "image/jpeg", hint: "Works everywhere" },
  { value: "png", label: "PNG", mime: "image/png", hint: "Keeps transparency" },
  { value: "webp", label: "WebP", mime: "image/webp", hint: "Smallest file" },
];

const TYPE_LABEL: Record<string, string> = {
  "image/jpeg": "JPG",
  "image/pjpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
  "image/gif": "GIF",
  "image/bmp": "BMP",
  "image/avif": "AVIF",
  "image/heic": "HEIC",
  "image/heif": "HEIC",
  ".jfif": "JFIF",
  ".heic": "HEIC",
  ".heif": "HEIC",
};

const LABEL_TO_KEY: Record<string, OutFormat> = {
  JPG: "jpg",
  PNG: "png",
  WebP: "webp",
};

const HEIC_BRANDS = [
  "heic",
  "heix",
  "heim",
  "heis",
  "hevc",
  "hevx",
  "mif1",
  "msf1",
];

const outLabel = (f: OutFormat) => OUTPUTS.find((o) => o.value === f)!.label;

function acceptHint(accept?: string) {
  if (!accept) return "JPG, PNG, WebP, GIF, BMP, AVIF, JFIF or HEIC";
  const names = Array.from(
    new Set(
      accept
        .split(",")
        .map((t) => TYPE_LABEL[t.trim()])
        .filter(Boolean),
    ),
  );
  return names.length ? `${names.join(" or ")} images only` : "Images";
}

// File ke andar ke shuruati bytes dekh kar asli format pehchanta hai
async function sniff(file: File): Promise<string> {
  try {
    const b = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const ascii = (from: number, len: number) =>
      String.fromCharCode(...Array.from(b.slice(from, from + len)));

    if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "JPG";
    if (b[0] === 0x89 && ascii(1, 3) === "PNG") return "PNG";
    if (ascii(0, 3) === "GIF") return "GIF";
    if (ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP") return "WebP";
    if (b[0] === 0x42 && b[1] === 0x4d) return "BMP";
    if (ascii(4, 4) === "ftyp") {
      const brand = ascii(8, 4);
      if (["avif", "avis"].includes(brand)) return "AVIF";
      if (HEIC_BRANDS.includes(brand)) return "HEIC";
    }
  } catch {
    // neeche wala andaza kaam aayega
  }
  return (
    TYPE_LABEL[file.type] ?? (file.name.split(".").pop()?.toUpperCase() || "Image")
  );
}

// HEIC ko library se kholte hain. Library sirf tab load hoti hai jab HEIC file aaye,
// is liye baqi pages par koi bojh nahi parta.
async function decodeHeic(file: File): Promise<ImageBitmap> {
  const { heicTo } = await import("heic-to");
  const bitmap = (await heicTo({
    blob: file,
    type: "bitmap",
  })) as unknown as ImageBitmap;
  if (!bitmap || typeof bitmap.width !== "number") {
    throw new Error("HEIC decode failed");
  }
  return bitmap;
}

async function convertFile(item: Item, fmt: OutFormat, quality: number) {
  // JPEG (JFIF bhi) ko JPG banana ho to dobara compress nahi karte, sirf naam badalta hai
  if (fmt === "jpg" && item.isJpeg) {
    return {
      blob: item.file.slice(0, item.file.size, "image/jpeg") as Blob,
      passthrough: true,
    };
  }

  const mime = OUTPUTS.find((o) => o.value === fmt)!.mime;
  const bitmap = item.isHeic
    ? await decodeHeic(item.file)
    : await createImageBitmap(item.file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    if (fmt === "jpg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mime, fmt === "png" ? undefined : quality / 100),
    );
    // Kuch browsers WebP nahi bana pate aur chup chap PNG de dete hain
    if (!blob || blob.type !== mime) throw new Error("Format not supported");
    return { blob, passthrough: false };
  } finally {
    bitmap.close();
  }
}

export default function ImageConverter({ preset }: WorkspaceProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [out, setOut] = useState<OutFormat | null>(preset?.outputFormat ?? null);
  const [quality, setQuality] = useState(90);
  const [results, setResults] = useState<Result[]>([]);
  const [failed, setFailed] = useState<Failure[]>([]);
  const [busy, setBusy] = useState(false);

  const runId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resultUrls = useRef<string[]>([]);
  const itemUrls = useRef<string[]>([]);

  useEffect(() => {
    const rid = runId;
    const t = timer;
    const r = resultUrls;
    const i = itemUrls;
    return () => {
      rid.current++; // chalti conversion ko cancel karo
      clearTimeout(t.current);
      r.current.forEach((u) => URL.revokeObjectURL(u));
      i.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  async function run(list: Item[], fmt: OutFormat, q: number) {
    const id = ++runId.current;
    setBusy(true);
    const done: Result[] = [];
    const bad: Failure[] = [];

    for (const item of list) {
      // Naya kaam shuru ho gaya ho to purana yahin band
      if (id !== runId.current) break;
      try {
        const r = await convertFile(item, fmt, q);
        done.push({
          id: item.id,
          name: item.file.name,
          from: item.from,
          to: fmt,
          originalSize: item.file.size,
          blob: r.blob,
          passthrough: r.passthrough,
          url: URL.createObjectURL(r.blob),
        });
      } catch {
        bad.push({ name: item.file.name, heic: item.isHeic });
      }
    }

    if (id !== runId.current) {
      done.forEach((r) => URL.revokeObjectURL(r.url));
      return;
    }
    resultUrls.current.forEach((u) => URL.revokeObjectURL(u));
    resultUrls.current = done.map((r) => r.url);
    setResults(done);
    setFailed(bad);
    setBusy(false);
  }

  const schedule = (list: Item[], fmt: OutFormat, q: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => run(list, fmt, q), 300);
  };

  const handleFiles = async (list: File[]) => {
    const next: Item[] = await Promise.all(
      list.map(async (file, i) => {
        const real = await sniff(file);
        const jfifName = /\.jfif$/i.test(file.name);
        const heic = real === "HEIC";
        return {
          id: `${i}-${file.name}-${file.size}`,
          file,
          from: real === "JPG" && jfifName ? "JFIF" : real,
          isJpeg: real === "JPG",
          isHeic: heic,
          // HEIC ka preview browser nahi dikha sakta, isliye URL nahi banate
          url: heic ? "" : URL.createObjectURL(file),
        };
      }),
    );
    itemUrls.current.forEach((u) => URL.revokeObjectURL(u));
    itemUrls.current = next.map((n) => n.url).filter(Boolean);
    setItems(next);
    if (out) run(next, out, quality);
  };

  const chooseOut = (f: OutFormat) => {
    setOut(f);
    schedule(items, f, quality);
  };

  const changeQuality = (q: number) => {
    setQuality(q);
    if (out) schedule(items, out, q);
  };

  const reset = () => {
    runId.current++;
    clearTimeout(timer.current);
    resultUrls.current.forEach((u) => URL.revokeObjectURL(u));
    itemUrls.current.forEach((u) => URL.revokeObjectURL(u));
    resultUrls.current = [];
    itemUrls.current = [];
    setItems([]);
    setResults([]);
    setFailed([]);
    setBusy(false);
    setOut(preset?.outputFormat ?? null);
  };

  const outName = (r: Result) => {
    const dot = r.name.lastIndexOf(".");
    const base = dot > 0 ? r.name.slice(0, dot) : r.name;
    const ext = dot > 0 ? r.name.slice(dot + 1).toLowerCase() : "";
    return `${base}${ext === r.to ? "-converted" : ""}.${r.to}`;
  };

  const downloadAll = () => {
    results.forEach((r, i) =>
      setTimeout(() => downloadBlob(r.blob, outName(r)), i * 300),
    );
  };

  const alreadyIn = (f: OutFormat) =>
    items.length > 0 && items.every((i) => LABEL_TO_KEY[i.from] === f);

  if (items.length === 0) {
    return (
      <Dropzone
        onFiles={handleFiles}
        accept={preset?.accept ?? "image/*"}
        hint={acceptHint(preset?.accept)}
      />
    );
  }

  const allJpegToJpg = out === "jpg" && items.every((i) => i.isJpeg);
  const hasHeic = items.some((i) => i.isHeic);

  return (
    <div className="space-y-5">
      {/* 1. Natija (jab conversion ho jaye) */}
      {(results.length > 0 || failed.length > 0 || (busy && out)) && (
        <div
          aria-live="polite"
          className={`space-y-4 transition-opacity duration-300 ${
            busy ? "opacity-60" : "opacity-100"
          }`}
        >
          {results.length === 0 && busy && (
            <p className="rounded-2xl border border-brand-300 bg-white p-6 text-center font-semibold text-brand-700">
              {hasHeic
                ? "Opening your HEIC photo and converting it..."
                : "Converting your image..."}
            </p>
          )}

          {results.map((r) => {
            const change = Math.round((1 - r.blob.size / r.originalSize) * 100);
            return (
              <article
                key={r.id}
                className="overflow-hidden rounded-2xl border border-brand-300 bg-white shadow-sm"
              >
                <div className="flex items-center gap-4 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.url}
                    alt={r.name}
                    className="size-20 shrink-0 rounded-xl border border-brand-200 bg-[repeating-conic-gradient(var(--color-brand-100)_0%_25%,white_0%_50%)] bg-[length:16px_16px] object-cover sm:size-24"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Converted
                    </p>
                    <p className="mt-0.5 truncate font-display text-lg font-bold text-brand-900">
                      {r.name}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-2xl bg-brand-600 px-3 py-1.5 text-sm font-extrabold text-white shadow-md shadow-brand-600/30">
                    {r.from} to {outLabel(r.to)}
                  </span>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-sm text-slate-600">
                      New size
                      <span className="block font-display text-2xl font-extrabold text-brand-700">
                        {formatBytes(r.blob.size)}
                      </span>
                    </p>
                    <div className="text-right text-sm text-slate-500">
                      Original size
                      <span className="block font-semibold text-slate-700">
                        {formatBytes(r.originalSize)}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-bold ${
                      change > 0
                        ? "bg-emerald-100 text-emerald-700"
                        : change < 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {change > 0
                      ? `${change}% smaller`
                      : change < 0
                        ? `${Math.abs(change)}% bigger`
                        : "Same size"}
                  </p>

                  {r.passthrough && (
                    <p className="mt-3 rounded-xl bg-brand-100 px-3 py-2 text-sm text-brand-800">
                      This file is already a JPEG, so it was not compressed
                      again. Only the file name changed, so there is no quality
                      loss.
                    </p>
                  )}

                  <Button
                    type="button"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={() => downloadBlob(r.blob, outName(r))}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 4v12M12 16l-4-4M12 16l4-4" />
                      <path d="M4 18v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1" />
                    </svg>
                    Download {outLabel(r.to)}
                  </Button>
                </div>
              </article>
            );
          })}

          {failed.length > 0 && (
            <div
              role="alert"
              className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800"
            >
              <p className="font-semibold">
                We could not convert: {failed.map((f) => f.name).join(", ")}
              </p>
              <p className="mt-1">
                {failed.some((f) => f.heic) &&
                  "A HEIC photo could not be opened. Please try again, or try another browser. "}
                Your browser may not support this file or the chosen format.
                Very large pictures can also fail, so try a smaller one or
                another format.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. Aap ki files aur "Convert to" */}
      <div className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm">
        <h3 className="font-display text-lg font-bold text-brand-900">
          Your {items.length === 1 ? "file" : "files"}
        </h3>
        <ul className="mt-3 space-y-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 p-2.5"
            >
              {it.isHeic ? (
                <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-brand-200 bg-brand-100 text-xs font-extrabold text-brand-700">
                  HEIC
                </span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.url}
                  alt={it.file.name}
                  className="size-12 shrink-0 rounded-lg border border-brand-200 object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-brand-900">
                  {it.file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatBytes(it.file.size)}
                </p>
              </div>
              <span className="shrink-0 rounded-xl bg-brand-600 px-3 py-1 text-sm font-extrabold text-white">
                {it.from}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-slate-500">
          We looked inside the {items.length === 1 ? "file" : "files"} to find
          the real format.
          {hasHeic &&
            " HEIC photos are opened on your device first, which can take a few seconds."}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-brand-900">
            Convert to
          </h3>
          {busy && (
            <span className="text-sm font-semibold text-brand-600">
              Working...
            </span>
          )}
        </div>

        {out === null && (
          <p className="mt-2 rounded-xl bg-brand-100 px-3 py-2 text-sm font-semibold text-brand-800">
            Now choose the format you want.
          </p>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2">
          {OUTPUTS.map((o) => {
            const same = alreadyIn(o.value);
            return (
              <button
                key={o.value}
                type="button"
                disabled={same}
                onClick={() => chooseOut(o.value)}
                className={`rounded-xl px-2 py-3 text-center transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  out === o.value
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                    : "border border-brand-300 bg-brand-100 text-brand-800 hover:bg-brand-200"
                }`}
              >
                <span className="block font-display text-lg font-extrabold">
                  {o.label}
                </span>
                <span className="block text-xs opacity-80">
                  {same ? `Already ${o.label}` : o.hint}
                </span>
              </button>
            );
          })}
        </div>

        {out && out !== "png" && !allJpegToJpg && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm font-semibold text-brand-900">
              <span>Quality</span>
              <span className="rounded-lg bg-brand-600 px-2.5 py-0.5 text-white">
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={100}
              value={quality}
              onChange={(e) => changeQuality(Number(e.target.value))}
              className="mt-3 w-full accent-brand-600"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>Smaller file</span>
              <span>Better picture</span>
            </div>
          </div>
        )}

        {out && (
          <p className="mt-4 text-xs text-slate-500">
            {allJpegToJpg &&
              "These files are already JPEG. Only the file name changes, so the picture stays exactly the same."}
            {!allJpegToJpg &&
              out === "jpg" &&
              "JPG cannot be transparent, so transparent areas turn white."}
            {out === "png" &&
              "PNG keeps every detail, so the file is often bigger than a JPG."}
            {out === "webp" &&
              "WebP gives small files and works in all modern browsers."}
          </p>
        )}
      </div>

      {/* 3. Total aur nayi image */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-600 p-5 text-white">
        <p className="font-semibold">
          {results.length > 0
            ? `${results.length} ${results.length === 1 ? "image" : "images"} converted`
            : `${items.length} ${items.length === 1 ? "image" : "images"} added`}
        </p>
        <div className="flex flex-wrap gap-2">
          {results.length > 1 && (
            <Button type="button" variant="secondary" onClick={downloadAll}>
              Download all
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={reset}>
            Choose other images
          </Button>
        </div>
      </div>
    </div>
  );
}