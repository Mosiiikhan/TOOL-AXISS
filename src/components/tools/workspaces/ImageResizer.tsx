"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "@/components/tools/Dropzone";
import Button from "@/components/ui/Button";
import type { ToolPreset, WorkspaceProps } from "@/lib/tools/types";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";

type Mode = "pixels" | "percent";
type Fit = "cover" | "stretch";
type Format = "original" | "image/jpeg" | "image/png" | "image/webp";
type Dim = { w: number; h: number };

type Settings = {
  mode: Mode;
  w: string;
  h: string;
  lock: boolean;
  fit: Fit;
  percent: number;
  format: Format;
};

type Result = {
  id: string;
  name: string;
  originalSize: number;
  origW: number;
  origH: number;
  newW: number;
  newH: number;
  blob: Blob;
  url: string;
  type: string;
};

const MAX_SIDE = 10000;
const MAX_PIXELS = 100_000_000;

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const FORMATS: { value: Format; label: string }[] = [
  { value: "original", label: "Same" },
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
];

const QUICK = [
  { label: "Instagram", w: 1080, h: 1080 },
  { label: "Full HD", w: 1920, h: 1080 },
  { label: "HD", w: 1280, h: 720 },
  { label: "Profile", w: 400, h: 400 },
];

const PERCENTS = [25, 50, 75, 150];

const initial = (preset?: ToolPreset): Settings => ({
  mode: "pixels",
  w: "",
  h: "",
  lock: !(preset?.width && preset?.height),
  fit: "cover",
  percent: 50,
  format: "original",
});

function computeTarget(
  s: Settings,
  bw: number,
  bh: number,
): { w: number; h: number; error?: string } {
  let w: number;
  let h: number;

  if (s.mode === "percent") {
    w = Math.max(1, Math.round((bw * s.percent) / 100));
    h = Math.max(1, Math.round((bh * s.percent) / 100));
  } else {
    w = parseInt(s.w, 10);
    h = s.lock ? Math.round((w * bh) / bw) : parseInt(s.h, 10);
  }

  if (!(w >= 1) || !(h >= 1)) {
    return { w: 0, h: 0, error: "Type a width and a height." };
  }
  if (w > MAX_SIDE || h > MAX_SIDE) {
    return {
      w: 0,
      h: 0,
      error: `The biggest size allowed is ${MAX_SIDE} pixels on each side.`,
    };
  }
  if (w * h > MAX_PIXELS) {
    return {
      w: 0,
      h: 0,
      error:
        "That picture would be too big for your browser to handle. Try a smaller size.",
    };
  }
  return { w, h };
}

async function readSize(file: File): Promise<Dim> {
  const bmp = await createImageBitmap(file);
  const d = { w: bmp.width, h: bmp.height };
  bmp.close();
  return d;
}

async function resizeImage(file: File, s: Settings) {
  const bitmap = await createImageBitmap(file);
  try {
    const t = computeTarget(s, bitmap.width, bitmap.height);
    if (t.error) throw new Error(t.error);

    const type =
      s.format === "original"
        ? file.type in EXT
          ? file.type
          : "image/png"
        : s.format;

    const canvas = document.createElement("canvas");
    canvas.width = t.w;
    canvas.height = t.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    if (type === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, t.w, t.h);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    if (s.mode === "pixels" && !s.lock && s.fit === "cover") {
      const scale = Math.max(t.w / bitmap.width, t.h / bitmap.height);
      const sw = t.w / scale;
      const sh = t.h / scale;
      ctx.drawImage(
        bitmap,
        (bitmap.width - sw) / 2,
        (bitmap.height - sh) / 2,
        sw,
        sh,
        0,
        0,
        t.w,
        t.h,
      );
    } else {
      ctx.drawImage(bitmap, 0, 0, t.w, t.h);
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, type === "image/png" ? undefined : 0.92),
    );
    if (!blob || blob.type !== type) throw new Error("Resize failed");

    return {
      blob,
      type,
      origW: bitmap.width,
      origH: bitmap.height,
      newW: t.w,
      newH: t.h,
    };
  } finally {
    bitmap.close();
  }
}

const DownloadIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v12M12 16l-4-4M12 16l4-4" />
    <path d="M4 18v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1" />
  </svg>
);

export default function ImageResizer({ preset }: WorkspaceProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [orig, setOrig] = useState<Dim | null>(null);
  const [settings, setSettings] = useState<Settings>(() => initial(preset));
  const [results, setResults] = useState<Result[]>([]);
  const [failed, setFailed] = useState(0);
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const runId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const urls = useRef<string[]>([]);

  useEffect(() => {
    const store = urls;
    return () => store.current.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  async function run(list: File[], s: Settings, base: Dim) {
    if (computeTarget(s, base.w, base.h).error) return;
    const id = ++runId.current;
    setBusy(true);
    const out: Result[] = [];
    let bad = 0;

    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      try {
        const r = await resizeImage(file, s);
        out.push({
          id: `${i}-${file.name}-${file.size}`,
          name: file.name,
          originalSize: file.size,
          origW: r.origW,
          origH: r.origH,
          newW: r.newW,
          newH: r.newH,
          blob: r.blob,
          type: r.type,
          url: URL.createObjectURL(r.blob),
        });
      } catch {
        bad++;
      }
    }

    if (id !== runId.current) {
      out.forEach((r) => URL.revokeObjectURL(r.url));
      return;
    }
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = out.map((r) => r.url);
    setResults(out);
    setFailed(bad);
    setBusy(false);
  }

  const update = (patch: Partial<Settings>) => {
    if (!orig) return;
    const next = { ...settings, ...patch };
    setSettings(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => run(files, next, orig), 300);
  };

  const handleFiles = async (list: File[]) => {
    const dims = await readSize(list[0]).catch(() => null);
    if (!dims) {
      setLoadError("We could not open this image. Try a JPG, PNG or WebP file.");
      return;
    }

    let w = String(dims.w);
    let h = String(dims.h);
    if (preset?.width && preset?.height) {
      w = String(preset.width);
      h = String(preset.height);
    } else if (preset?.width) {
      w = String(preset.width);
      h = String(Math.round((preset.width * dims.h) / dims.w));
    } else if (preset?.height) {
      h = String(preset.height);
      w = String(Math.round((preset.height * dims.w) / dims.h));
    }

    const next: Settings = { ...initial(preset), w, h };
    setLoadError(null);
    setFiles(list);
    setOrig(dims);
    setSettings(next);
    run(list, next, dims);
  };

  const changeW = (v: string) => {
    if (!orig) return;
    const clean = v.replace(/\D/g, "").slice(0, 5);
    const n = parseInt(clean, 10);
    update({
      w: clean,
      h:
        settings.lock && n > 0
          ? String(Math.round((n * orig.h) / orig.w))
          : settings.h,
    });
  };

  const changeH = (v: string) => {
    if (!orig) return;
    const clean = v.replace(/\D/g, "").slice(0, 5);
    const n = parseInt(clean, 10);
    update({
      h: clean,
      w:
        settings.lock && n > 0
          ? String(Math.round((n * orig.w) / orig.h))
          : settings.w,
    });
  };

  const toggleLock = () => {
    if (!orig) return;
    const n = parseInt(settings.w, 10);
    if (!settings.lock && n > 0) {
      update({ lock: true, h: String(Math.round((n * orig.h) / orig.w)) });
    } else {
      update({ lock: !settings.lock });
    }
  };

  const reset = () => {
    runId.current++;
    clearTimeout(timer.current);
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setFiles([]);
    setOrig(null);
    setResults([]);
    setFailed(0);
    setBusy(false);
    setLoadError(null);
    setSettings(initial(preset));
  };

  const outName = (r: Result) =>
    `${r.name.replace(/\.[^.]+$/, "")}-resized.${EXT[r.type] ?? "png"}`;

  const downloadAll = () => {
    results.forEach((r, i) =>
      setTimeout(() => downloadBlob(r.blob, outName(r)), i * 300),
    );
  };

  if (files.length === 0 || !orig) {
    return (
      <div className="space-y-4">
        {loadError && (
          <p
            role="alert"
            className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-800"
          >
            {loadError}
          </p>
        )}
        <Dropzone
          onFiles={handleFiles}
          accept={preset?.accept ?? "image/*"}
          hint="JPG, PNG, WebP, GIF, BMP or AVIF"
        />
      </div>
    );
  }

  const single = results.length === 1 ? results[0] : null;
  const check = computeTarget(settings, orig.w, orig.h);
  const typing =
    settings.mode === "pixels" &&
    (settings.w === "" || (!settings.lock && settings.h === ""));
  const showError = check.error && !typing;

  const wN = parseInt(settings.w, 10);
  const hN = parseInt(settings.h, 10);
  const ratioDiffers =
    settings.mode === "pixels" &&
    !settings.lock &&
    wN > 0 &&
    hN > 0 &&
    Math.abs(wN / hN - orig.w / orig.h) / (orig.w / orig.h) > 0.01;

  const tab = (active: boolean) =>
    `flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-bold transition ${
      active
        ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
        : "text-brand-800 hover:bg-brand-200"
    }`;

  const optionBtn = (active: boolean) =>
    `rounded-xl px-2 py-2.5 text-sm font-semibold transition ${
      active
        ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
        : "border border-brand-300 bg-brand-100 text-brand-800 hover:bg-brand-200"
    }`;

  const inputCls =
    "mt-1 w-full rounded-xl border-2 border-brand-300 bg-white px-3 py-2.5 font-display text-lg font-bold text-brand-900 outline-none focus:border-brand-600";

  return (
    <div className="space-y-4">
      {/* 1. Natija: sab se upar */}
      <div
        className={`transition-opacity duration-300 ${
          busy ? "opacity-60" : "opacity-100"
        }`}
      >
        {results.length === 0 && (
          <div className="grid h-56 place-items-center rounded-2xl border border-brand-300 bg-brand-50 px-4 text-center text-sm font-semibold text-brand-700">
            {busy ? "Resizing..." : "Your resized image will show here."}
          </div>
        )}

        {single && (
          <article className="overflow-hidden rounded-2xl border border-brand-300 bg-white shadow-sm">
            <div className="bg-brand-50 p-3 sm:p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={single.url}
                alt={single.name}
                className="mx-auto max-h-72 w-full rounded-xl object-contain sm:max-h-96"
              />
            </div>

            <div className="p-4">
              <p className="truncate text-center text-sm font-semibold text-slate-500">
                {single.name}
              </p>
              <div className="mt-2 rounded-xl bg-brand-100 px-3 py-2 text-center">
                <span className="text-xs font-semibold text-brand-700">
                  {single.origW} × {single.origH}
                </span>
                <span className="mx-1.5 text-brand-500">to</span>
                <span className="font-display text-xl font-extrabold text-brand-700">
                  {single.newW} × {single.newH} px
                </span>
              </div>
              <p className="mt-2 text-center text-sm text-slate-600">
                File size:{" "}
                <span className="font-bold text-brand-700">
                  {formatBytes(single.blob.size)}
                </span>{" "}
                <span className="text-slate-400">
                  (was {formatBytes(single.originalSize)})
                </span>
              </p>
              {(single.newW > single.origW || single.newH > single.origH) && (
                <p className="mt-2 text-center text-sm text-amber-700">
                  Making a picture bigger than the original can make it look
                  blurry.
                </p>
              )}
              <Button
                type="button"
                size="lg"
                className="mt-3 w-full"
                onClick={() => downloadBlob(single.blob, outName(single))}
              >
                <DownloadIcon />
                Download image
              </Button>
            </div>
          </article>
        )}

        {results.length > 1 && (
          <ul className="space-y-2">
            {results.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-3 rounded-2xl border border-brand-300 bg-white p-3 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.url}
                  alt={r.name}
                  className="size-16 shrink-0 rounded-xl border border-brand-200 bg-brand-50 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-brand-900">
                    {r.name}
                  </p>
                  <p className="text-sm font-semibold text-brand-700">
                    {r.newW} × {r.newH} px
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatBytes(r.blob.size)}{" "}
                    <span className="text-slate-400">
                      (was {formatBytes(r.originalSize)})
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadBlob(r.blob, outName(r))}
                  aria-label={`Download ${r.name}`}
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30 transition hover:bg-brand-700"
                >
                  <DownloadIcon />
                </button>
              </li>
            ))}
          </ul>
        )}

        {failed > 0 && (
          <p className="mt-3 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
            {failed} {failed === 1 ? "file" : "files"} could not be resized.
            The size may be too big for your device, or the file type is not
            supported.
          </p>
        )}
      </div>

      {/* 2. Controls */}
      <div className="rounded-2xl border border-brand-300 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs text-slate-500">
          First image: {orig.w} × {orig.h} px
        </p>

        <div className="flex gap-1 rounded-2xl border border-brand-300 bg-brand-100 p-1">
          <button
            type="button"
            onClick={() => update({ mode: "pixels" })}
            className={tab(settings.mode === "pixels")}
          >
            Pixels
          </button>
          <button
            type="button"
            onClick={() => update({ mode: "percent" })}
            className={tab(settings.mode === "percent")}
          >
            Percent
          </button>
        </div>

        {settings.mode === "pixels" ? (
          <>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
              <label className="block text-xs font-semibold text-brand-900">
                Width (px)
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={settings.w}
                  onChange={(e) => changeW(e.target.value)}
                  className={inputCls}
                />
              </label>

              <button
                type="button"
                onClick={toggleLock}
                aria-pressed={settings.lock}
                aria-label="Keep proportions"
                title={
                  settings.lock ? "Proportions locked" : "Proportions unlocked"
                }
                className={`grid size-12 place-items-center rounded-xl transition ${
                  settings.lock
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                    : "border border-brand-300 bg-brand-100 text-brand-800 hover:bg-brand-200"
                }`}
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
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path
                    d={
                      settings.lock
                        ? "M8 11V8a4 4 0 0 1 8 0v3"
                        : "M8 11V8a4 4 0 0 1 7.5-2"
                    }
                  />
                </svg>
              </button>

              <label className="block text-xs font-semibold text-brand-900">
                Height (px)
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={settings.h}
                  onChange={(e) => changeH(e.target.value)}
                  className={inputCls}
                />
              </label>
            </div>

            <p className="mt-1.5 text-xs text-slate-500">
              {settings.lock
                ? "Lock on: change one side and the other follows."
                : "Lock off: both sides are free, the shape can change."}
            </p>

            <p className="mt-4 text-sm font-semibold text-brand-900">
              Quick sizes
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {QUICK.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() =>
                    update({
                      mode: "pixels",
                      w: String(p.w),
                      h: String(p.h),
                      lock: false,
                    })
                  }
                  className={`${optionBtn(
                    !settings.lock && wN === p.w && hN === p.h,
                  )} leading-tight`}
                >
                  <span className="block">{p.label}</span>
                  <span className="block text-xs font-medium opacity-70">
                    {p.w} × {p.h}
                  </span>
                </button>
              ))}
            </div>

            {ratioDiffers && (
              <div className="mt-4 rounded-xl border border-brand-300 bg-brand-100 p-4">
                <p className="text-sm font-semibold text-brand-900">
                  Your picture is a different shape from this size. What should
                  we do?
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      [
                        "cover",
                        "Crop to fit",
                        "Fills the whole size. The edges are cut off.",
                      ],
                      [
                        "stretch",
                        "Stretch",
                        "Keeps everything, but the picture looks squeezed.",
                      ],
                    ] as const
                  ).map(([f, title, text]) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => update({ fit: f })}
                      className={`rounded-xl p-3 text-left transition ${
                        settings.fit === f
                          ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                          : "border border-brand-300 bg-white text-brand-800 hover:bg-brand-50"
                      }`}
                    >
                      <span className="block font-display font-bold">
                        {title}
                      </span>
                      <span className="block text-xs opacity-80">{text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm font-semibold text-brand-900">
              <span>Size</span>
              <span className="rounded-lg bg-brand-600 px-2.5 py-0.5 text-white">
                {settings.percent}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={200}
              value={settings.percent}
              onChange={(e) => update({ percent: Number(e.target.value) })}
              className="mt-3 w-full accent-brand-600"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>Smaller</span>
              <span>Bigger</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {PERCENTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => update({ percent: p })}
                  className={optionBtn(settings.percent === p)}
                >
                  {p}%
                </button>
              ))}
            </div>
            {!check.error && (
              <p className="mt-3 text-sm text-slate-600">
                New size will be{" "}
                <span className="font-semibold text-brand-700">
                  {check.w} × {check.h} px
                </span>
                .
              </p>
            )}
          </div>
        )}

        {showError && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800"
          >
            {check.error}
          </p>
        )}

        <p className="mt-4 text-sm font-semibold text-brand-900">Save as</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => update({ format: f.value })}
              className={optionBtn(settings.format === f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Neeche ki bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand-600 p-4 text-white">
        <p className="text-sm font-semibold">
          {results.length} {results.length === 1 ? "image" : "images"}
          {busy && " · updating..."}
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