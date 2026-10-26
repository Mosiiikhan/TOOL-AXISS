"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "@/components/tools/Dropzone";
import Button from "@/components/ui/Button";
import type { WorkspaceProps } from "@/lib/tools/types";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";

type Mode = "quality" | "target";
type Format = "image/webp" | "image/jpeg" | "original";

type Settings = {
  mode: Mode;
  quality: number;
  format: Format;
  targetKB: number;
};

type Result = {
  id: string;
  name: string;
  originalSize: number;
  blob: Blob;
  url: string;
  type: string;
  met: boolean;
  scaled: boolean;
  target: number | null;
};

const FORMATS: { value: Format; label: string }[] = [
  { value: "image/webp", label: "WebP (smallest)" },
  { value: "image/jpeg", label: "JPG (works everywhere)" },
  { value: "original", label: "Same as original" },
];

const PRESETS = [
  { label: "Smallest file", value: 40 },
  { label: "Balanced", value: 70 },
  { label: "Best quality", value: 90 },
];

const TARGETS = [
  { label: "20 KB", kb: 20 },
  { label: "50 KB", kb: 50 },
  { label: "100 KB", kb: 100 },
  { label: "200 KB", kb: 200 },
  { label: "500 KB", kb: 500 },
  { label: "1 MB", kb: 1000 },
];

const EXT: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};

function render(bitmap: ImageBitmap, scale: number, type: string) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  if (type === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas;
}

const toBlob = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      type,
      quality,
    ),
  );

async function compressByQuality(file: File, quality: number, format: Format) {
  const bitmap = await createImageBitmap(file);
  try {
    const type =
      format === "original"
        ? file.type in EXT
          ? file.type
          : "image/jpeg"
        : format;
    const blob = await toBlob(render(bitmap, 1, type), type, quality);
    // Agar compress ke baad file bari ho jaye to original hi rakho
    if (type === file.type && blob.size >= file.size) {
      return { blob: file as Blob, type };
    }
    return { blob, type };
  } finally {
    bitmap.close();
  }
}

// Target size tak pohanchne ke liye: pehle quality kam karo,
// phir bhi bari rahe to picture ka size 15% chhota karke dobara try karo.
async function compressToTarget(file: File, targetBytes: number, type: string) {
  const bitmap = await createImageBitmap(file);
  try {
    let scale = 1;
    let last: Blob | null = null;

    for (let attempt = 0; attempt < 12; attempt++) {
      const canvas = render(bitmap, scale, type);

      const high = await toBlob(canvas, type, 0.92);
      if (high.size <= targetBytes) {
        return { blob: high, scaled: scale < 1, met: true };
      }

      const low = await toBlob(canvas, type, 0.3);
      last = low;
      if (low.size <= targetBytes) {
        let lo = 0.3;
        let hi = 0.92;
        let best = low;
        for (let i = 0; i < 7; i++) {
          const mid = (lo + hi) / 2;
          const b = await toBlob(canvas, type, mid);
          if (b.size <= targetBytes) {
            best = b;
            lo = mid;
          } else {
            hi = mid;
          }
        }
        return { blob: best, scaled: scale < 1, met: true };
      }

      scale *= 0.85;
    }

    return { blob: last as Blob, scaled: true, met: false };
  } finally {
    bitmap.close();
  }
}

async function processFile(file: File, s: Settings) {
  if (s.mode === "target") {
    const type = s.format === "image/webp" ? "image/webp" : "image/jpeg";
    // 1 KB = 1000 bytes lete hain, taake har form ki ginti par pura utre
    const targetBytes = s.targetKB * 1000;
    if (file.size <= targetBytes && file.type === type) {
      return { blob: file as Blob, type, met: true, scaled: false };
    }
    const r = await compressToTarget(file, targetBytes, type);
    return { blob: r.blob, type, met: r.met, scaled: r.scaled };
  }
  const r = await compressByQuality(file, s.quality / 100, s.format);
  return { blob: r.blob, type: r.type, met: true, scaled: false };
}

export default function ImageCompressor({ preset }: WorkspaceProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [busy, setBusy] = useState(false);
  const [settings, setSettings] = useState<Settings>(() => ({
    mode: preset?.targetKB ? "target" : "quality",
    quality: 75,
    format: preset?.targetKB ? "image/jpeg" : "image/webp",
    targetKB: preset?.targetKB ?? 100,
  }));
  const [kbText, setKbText] = useState(String(preset?.targetKB ?? 100));

  const runId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const urls = useRef<string[]>([]);

  useEffect(() => {
    const store = urls;
    return () => store.current.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  async function run(list: File[], s: Settings) {
    const id = ++runId.current;
    setBusy(true);
    const out: Result[] = [];

    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      try {
        const r = await processFile(file, s);
        out.push({
          id: `${i}-${file.name}-${file.size}`,
          name: file.name,
          originalSize: file.size,
          blob: r.blob,
          type: r.type,
          met: r.met,
          scaled: r.scaled,
          target: s.mode === "target" ? s.targetKB : null,
          url: URL.createObjectURL(r.blob),
        });
      } catch {
        // jo file read na ho sake usay chhor do
      }
    }

    if (id !== runId.current) {
      out.forEach((r) => URL.revokeObjectURL(r.url));
      return;
    }
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = out.map((r) => r.url);
    setResults(out);
    setBusy(false);
  }

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => run(files, next), 300);
  };

  const handleFiles = (list: File[]) => {
    setFiles(list);
    run(list, settings);
  };

  const changeMode = (mode: Mode) => {
    update({
      mode,
      format:
        mode === "target" && settings.format === "original"
          ? "image/jpeg"
          : settings.format,
    });
  };

  const changeTarget = (kb: number) => {
    setKbText(String(kb));
    update({ targetKB: kb });
  };

  const reset = () => {
    runId.current++;
    clearTimeout(timer.current);
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setFiles([]);
    setResults([]);
    setBusy(false);
  };

  const outName = (r: Result) =>
    `${r.name.replace(/\.[^.]+$/, "")}-compressed.${EXT[r.type] ?? "jpg"}`;

  const downloadAll = () => {
    results.forEach((r, i) =>
      setTimeout(() => downloadBlob(r.blob, outName(r)), i * 300),
    );
  };

  const totalOld = results.reduce((s, r) => s + r.originalSize, 0);
  const totalNew = results.reduce((s, r) => s + r.blob.size, 0);
  const saved = totalOld > 0 ? Math.round((1 - totalNew / totalOld) * 100) : 0;

  const formats =
    settings.mode === "target"
      ? FORMATS.filter((f) => f.value !== "original")
      : FORMATS;

  if (files.length === 0) {
        return (
      <Dropzone
        onFiles={handleFiles}
        accept={preset?.accept ?? "image/*"}
        hint={
          preset?.accept === "image/png"
            ? "PNG images only"
            : "JPG, PNG or WebP"
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* 1. Natija: image, size bar, download */}
      <div
        className={`space-y-4 transition-opacity duration-300 ${
          busy ? "opacity-60" : "opacity-100"
        }`}
      >
        {results.length === 0 && busy && (
          <p className="rounded-2xl border border-brand-300 bg-white p-6 text-center font-semibold text-brand-700">
            Compressing your image...
          </p>
        )}

        {results.map((r) => {
          const pct = Math.round((1 - r.blob.size / r.originalSize) * 100);
          const ratio = Math.min(
            100,
            Math.max(4, Math.round((r.blob.size / r.originalSize) * 100)),
          );
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
                  className="size-20 shrink-0 rounded-xl border border-brand-200 object-cover sm:size-24"
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
                    Ready to download
                  </p>
                  <p className="mt-0.5 truncate font-display text-lg font-bold text-brand-900">
                    {r.name}
                  </p>
                </div>
                {pct > 0 ? (
                  <span className="shrink-0 rounded-2xl bg-emerald-100 px-3 py-1.5 font-display text-xl font-extrabold text-emerald-700">
                    -{pct}%
                  </span>
                ) : r.target !== null && r.met ? (
                  <span className="shrink-0 rounded-2xl bg-emerald-100 px-3 py-1.5 text-sm font-bold text-emerald-700">
                    Within limit
                  </span>
                ) : (
                  <span className="shrink-0 rounded-2xl bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-700">
                    No saving
                  </span>
                )}
              </div>

              <div className="px-4 pb-4">
                <div className="flex items-end justify-between gap-3">
                  <p className="text-sm text-slate-600">
                    New size
                    <span className="block font-display text-2xl font-extrabold text-brand-700">
                      {formatBytes(r.blob.size)}
                    </span>
                  </p>
                  <p className="text-right text-sm text-slate-500">
                    Original size
                    <span className="block font-semibold text-slate-700">
                      {formatBytes(r.originalSize)}
                    </span>
                  </p>
                </div>

                <div className="mt-2 h-4 overflow-hidden rounded-full bg-brand-100">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-brand-400 to-brand-600 transition-all duration-500 ease-out"
                    style={{ width: `${ratio}%` }}
                  />
                </div>

                {r.target !== null ? (
                  r.met ? (
                    <p className="mt-3 text-sm font-semibold text-emerald-700">
                      Under {r.target} KB.
                      {r.scaled &&
                        " The picture was made a little smaller to fit."}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-amber-700">
                      We could not get this image under {r.target} KB. This is
                      the smallest we could make it. Try a bigger size.
                    </p>
                  )
                ) : (
                  pct <= 0 && (
                    <p className="mt-3 text-sm text-amber-700">
                      This image is already small. Try &quot;Smallest
                      file&quot; or choose WebP below.
                    </p>
                  )
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
                  Download image
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      {/* 2. Controls */}
      <div className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-brand-900">
            Want it smaller or sharper?
          </h3>
          {busy && (
            <span className="text-sm font-semibold text-brand-600">
              Updating...
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-brand-100 p-1">
          {(
            [
              ["quality", "By quality"],
              ["target", "By file size"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => changeMode(m)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                settings.mode === m
                  ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                  : "text-brand-800 hover:bg-brand-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {settings.mode === "quality" ? (
          <>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => update({ quality: p.value })}
                  className={`rounded-xl px-2 py-2.5 text-sm font-semibold transition ${
                    settings.quality === p.value
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                      : "border border-brand-300 bg-brand-100 text-brand-800 hover:bg-brand-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm font-semibold text-brand-900">
                <span>Quality</span>
                <span className="rounded-lg bg-brand-600 px-2.5 py-0.5 text-white">
                  {settings.quality}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={settings.quality}
                onChange={(e) => update({ quality: Number(e.target.value) })}
                className="mt-3 w-full accent-brand-600"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>Smaller file</span>
                <span>Better picture</span>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-5">
            <p className="text-sm font-semibold text-brand-900">
              I need the file under
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {TARGETS.map((t) => (
                <button
                  key={t.kb}
                  type="button"
                  onClick={() => changeTarget(t.kb)}
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                    settings.targetKB === t.kb
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                      : "border border-brand-300 bg-brand-100 text-brand-800 hover:bg-brand-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={5}
                max={5000}
                value={kbText}
                onChange={(e) => {
                  setKbText(e.target.value);
                  const n = Number(e.target.value);
                  if (n >= 5 && n <= 5000) update({ targetKB: n });
                }}
                className="w-28 rounded-xl border-2 border-brand-300 bg-white px-3 py-2 font-semibold text-brand-900 outline-none focus:border-brand-600"
              />
              <span className="font-semibold text-brand-900">KB</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              We keep the picture as sharp as possible while getting under
              this size. You can type any number from 5 to 5000.
            </p>
          </div>
        )}

        <div className="mt-5">
          <p className="text-sm font-semibold text-brand-900">Save as</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {formats.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => update({ format: f.value })}
                className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                  settings.format === f.value
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                    : "border border-brand-300 bg-brand-100 text-brand-800 hover:bg-brand-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Total aur nayi image */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-600 p-5 text-white">
        <p className="font-semibold">
          {results.length} {results.length === 1 ? "image" : "images"}:{" "}
          {formatBytes(totalOld)} to {formatBytes(totalNew)}
          {saved > 0 && ` (saved ${saved}%)`}
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