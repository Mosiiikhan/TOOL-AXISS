"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "@/components/tools/Dropzone";
import Button from "@/components/ui/Button";
import type { WorkspaceProps } from "@/lib/tools/types";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";

type Mode = "size" | "percent";
type Fit = "cover" | "stretch";
type Fmt = "same" | "jpg" | "png" | "webp";

type Settings = {
  mode: Mode;
  w: string;
  h: string;
  lock: boolean;
  fit: Fit;
  pct: number;
  fmt: Fmt;
  quality: number;
};

type Item = { file: File; ow: number; oh: number; url: string };
type Result = { blob: Blob; url: string; w: number; h: number; mime: string };

const MAX_SIDE = 8000;

const MIME: Record<Exclude<Fmt, "same">, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const FMTS: { value: Fmt; label: string }[] = [
  { value: "same", label: "Same as original" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

const QUICK = [
  { w: 1080, h: 1080 },
  { w: 1920, h: 1080 },
  { w: 1280, h: 720 },
  { w: 800, h: 600 },
  { w: 500, h: 500 },
];

const DEFAULTS: Settings = {
  mode: "size",
  w: "",
  h: "",
  lock: true,
  fit: "cover",
  pct: 50,
  fmt: "same",
  quality: 90,
};

const effectiveMime = (file: File, fmt: Fmt) =>
  fmt !== "same" ? MIME[fmt] : file.type in EXT ? file.type : "image/png";

function check(w: number, h: number): { w: number; h: number; error?: string } {
  if (!Number.isFinite(w) || !Number.isFinite(h) || w < 1 || h < 1) {
    return { w: 0, h: 0, error: "Type a width and a height." };
  }
  if (w > MAX_SIDE || h > MAX_SIDE) {
    return {
      w: 0,
      h: 0,
      error: `The biggest size allowed is ${MAX_SIDE} pixels on each side.`,
    };
  }
  return { w, h };
}

function getTarget(s: Settings, ow: number, oh: number) {
  if (s.mode === "percent") {
    return check(Math.round((ow * s.pct) / 100), Math.round((oh * s.pct) / 100));
  }
  return check(parseInt(s.w, 10), parseInt(s.h, 10));
}

async function resizeImage(
  file: File,
  w: number,
  h: number,
  fit: Fit,
  mime: string,
  quality: number,
) {
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    if (mime === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    if (fit === "stretch") {
      ctx.drawImage(bitmap, 0, 0, w, h);
    } else {
      const scale = Math.max(w / bitmap.width, h / bitmap.height);
      const sw = w / scale;
      const sh = h / scale;
      ctx.drawImage(
        bitmap,
        (bitmap.width - sw) / 2,
        (bitmap.height - sh) / 2,
        sw,
        sh,
        0,
        0,
        w,
        h,
      );
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(
        resolve,
        mime,
        mime === "image/png" ? undefined : quality / 100,
      ),
    );
    if (!blob || blob.type !== mime) throw new Error("Could not create image");
    return blob;
  } finally {
    bitmap.close();
  }
}

export default function ImageResizer({ preset }: WorkspaceProps) {
  const [item, setItem] = useState<Item | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resultUrl = useRef<string | null>(null);
  const itemUrl = useRef<string | null>(null);

  useEffect(() => {
    const r = resultUrl;
    const i = itemUrl;
    return () => {
      if (r.current) URL.revokeObjectURL(r.current);
      if (i.current) URL.revokeObjectURL(i.current);
    };
  }, []);

  async function run(it: Item, s: Settings) {
    const t = getTarget(s, it.ow, it.oh);
    if (t.error) return;
    const id = ++runId.current;
    setBusy(true);
    try {
      const mime = effectiveMime(it.file, s.fmt);
      const blob = await resizeImage(it.file, t.w, t.h, s.fit, mime, s.quality);
      if (id !== runId.current) return;
      if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
      const url = URL.createObjectURL(blob);
      resultUrl.current = url;
      setResult({ blob, url, w: t.w, h: t.h, mime });
      setError(null);
    } catch {
      if (id === runId.current) {
        setError(
          "We could not resize this image. Your browser may not support the chosen format. Try JPG or PNG.",
        );
      }
    } finally {
      if (id === runId.current) setBusy(false);
    }
  }

  const update = (patch: Partial<Settings>) => {
    if (!item) return;
    const next = { ...settings, ...patch };
    setSettings(next);
    clearTimeout(timer.current);
    if (!getTarget(next, item.ow, item.oh).error) {
      timer.current = setTimeout(() => run(item, next), 300);
    }
  };

  const handleFiles = async (list: File[]) => {
    const file = list[0];
    if (!file) return;
    try {
      const bmp = await createImageBitmap(file);
      const ow = bmp.width;
      const oh = bmp.height;
      bmp.close();

      const pw = preset?.width;
      const ph = preset?.height;
      const init: Settings = { ...DEFAULTS, w: String(ow), h: String(oh) };
      if (pw && ph) {
        init.w = String(pw);
        init.h = String(ph);
        init.lock = false;
      } else if (pw) {
        init.w = String(pw);
        init.h = String(Math.round((pw * oh) / ow));
      } else if (ph) {
        init.h = String(ph);
        init.w = String(Math.round((ph * ow) / oh));
      }

      if (itemUrl.current) URL.revokeObjectURL(itemUrl.current);
      const url = URL.createObjectURL(file);
      itemUrl.current = url;
      const next: Item = { file, ow, oh, url };
      setItem(next);
      setSettings(init);
      setError(null);
      run(next, init);
    } catch {
      setError(
        "We could not open this image. Try a JPG, PNG or WebP file.",
      );
    }
  };

  const changeW = (v: string) => {
    if (!item) return;
    const n = parseInt(v, 10);
    update({
      w: v,
      h:
        settings.lock && n > 0
          ? String(Math.round((n * item.oh) / item.ow))
          : settings.h,
    });
  };

  const changeH = (v: string) => {
    if (!item) return;
    const n = parseInt(v, 10);
    update({
      h: v,
      w:
        settings.lock && n > 0
          ? String(Math.round((n * item.ow) / item.oh))
          : settings.w,
    });
  };

  const toggleLock = () => {
    if (!item) return;
    const on = !settings.lock;
    const n = parseInt(settings.w, 10);
    update({
      lock: on,
      h:
        on && n > 0
          ? String(Math.round((n * item.oh) / item.ow))
          : settings.h,
    });
  };

  const reset = () => {
    runId.current++;
    clearTimeout(timer.current);
    if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
    if (itemUrl.current) URL.revokeObjectURL(itemUrl.current);
    resultUrl.current = null;
    itemUrl.current = null;
    setItem(null);
    setResult(null);
    setBusy(false);
    setError(null);
    setSettings(DEFAULTS);
  };

  if (!item) {
    return (
      <div className="space-y-4">
        {error && (
          <p
            role="alert"
            className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-800"
          >
            {error}
          </p>
        )}
        <Dropzone
          onFiles={handleFiles}
          multiple={false}
          hint="JPG, PNG, WebP, GIF, BMP or AVIF. One image at a time."
        />
      </div>
    );
  }

  const target = getTarget(settings, item.ow, item.oh);
  const wNum = parseInt(settings.w, 10);
  const hNum = parseInt(settings.h, 10);
  const ratioDiffers =
    settings.mode === "size" &&
    !settings.lock &&
    wNum > 0 &&
    hNum > 0 &&
    Math.abs(wNum / hNum - item.ow / item.oh) / (item.ow / item.oh) > 0.01;
  const showQuality = effectiveMime(item.file, settings.fmt) !== "image/png";
  const bigger = result ? result.w > item.ow || result.h > item.oh : false;

  const outName = (r: Result) =>
    `${item.file.name.replace(/\.[^.]+$/, "")}-${r.w}x${r.h}.${EXT[r.mime] ?? "png"}`;

  const chip = (active: boolean) =>
    `rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
      active
        ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
        : "border border-brand-300 bg-brand-100 text-brand-800 hover:bg-brand-200"
    }`;

  const inputClass =
    "w-full rounded-xl border-2 border-brand-300 bg-white px-3 py-2.5 font-semibold text-brand-900 outline-none focus:border-brand-600";

  return (
    <div className="space-y-5">
      {/* 1. Natija */}
      <div
        className={`transition-opacity duration-300 ${
          busy ? "opacity-60" : "opacity-100"
        }`}
      >
        {!result && busy && (
          <p className="rounded-2xl border border-brand-300 bg-white p-6 text-center font-semibold text-brand-700">
            Resizing your image...
          </p>
        )}

        {result && (
          <article className="overflow-hidden rounded-2xl border border-brand-300 bg-white shadow-sm">
            <div className="flex items-center gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Resized preview"
                className="size-20 shrink-0 rounded-xl border border-brand-200 bg-[repeating-conic-gradient(var(--color-brand-100)_0%_25%,white_0%_50%)] bg-[length:16px_16px] object-contain sm:size-24"
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
                  Resized
                </p>
                <p className="mt-0.5 truncate font-display text-lg font-bold text-brand-900">
                  {item.file.name}
                </p>
              </div>
              <span className="shrink-0 rounded-2xl bg-brand-600 px-3 py-1.5 text-sm font-extrabold text-white shadow-md shadow-brand-600/30">
                {result.w} × {result.h} px
              </span>
            </div>

            <div className="px-4 pb-4">
              <div className="flex items-end justify-between gap-3">
                <p className="text-sm text-slate-600">
                  New picture
                  <span className="block font-display text-2xl font-extrabold text-brand-700">
                    {result.w} × {result.h} px
                  </span>
                  <span className="text-slate-500">
                    {formatBytes(result.blob.size)}
                  </span>
                </p>
                <p className="text-right text-sm text-slate-500">
                  Original
                  <span className="block font-semibold text-slate-700">
                    {item.ow} × {item.oh} px
                  </span>
                  <span>{formatBytes(item.file.size)}</span>
                </p>
              </div>

              {bigger && (
                <p className="mt-3 text-sm text-amber-700">
                  Making a picture bigger than the original can make it look
                  blurry.
                </p>
              )}

              <Button
                type="button"
                size="lg"
                className="mt-4 w-full"
                onClick={() => downloadBlob(result.blob, outName(result))}
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
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800"
          >
            {error}
          </p>
        )}
      </div>

      {/* 2. Controls */}
      <div className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.url}
            alt={item.file.name}
            className="size-12 shrink-0 rounded-lg border border-brand-200 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-brand-900">
              {item.file.name}
            </p>
            <p className="text-xs text-slate-500">
              Original: {item.ow} × {item.oh} px · {formatBytes(item.file.size)}
            </p>
          </div>
          {busy && (
            <span className="text-sm font-semibold text-brand-600">
              Working...
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-brand-100 p-1">
          {(
            [
              ["size", "By size (pixels)"],
              ["percent", "By percent"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => update({ mode: m })}
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

        {settings.mode === "size" ? (
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold text-brand-900">
                Width (px)
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_SIDE}
                  value={settings.w}
                  onChange={(e) => changeW(e.target.value)}
                  className={`mt-1.5 ${inputClass}`}
                />
              </label>
              <label className="text-sm font-semibold text-brand-900">
                Height (px)
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_SIDE}
                  value={settings.h}
                  onChange={(e) => changeH(e.target.value)}
                  className={`mt-1.5 ${inputClass}`}
                />
              </label>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.lock}
              onClick={toggleLock}
              className="mt-4 flex items-center gap-3 text-left"
            >
              <span
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  settings.lock ? "bg-brand-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${
                    settings.lock ? "left-6" : "left-1"
                  }`}
                />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-brand-900">
                  Keep proportions
                </span>
                <span className="text-slate-500">
                  {settings.lock
                    ? "Change one side and the other follows."
                    : "Both sides are free. The shape may change."}
                </span>
              </span>
            </button>

            <p className="mt-5 text-sm font-semibold text-brand-900">
              Popular sizes
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={`${q.w}x${q.h}`}
                  type="button"
                  onClick={() =>
                    update({
                      mode: "size",
                      w: String(q.w),
                      h: String(q.h),
                      lock: false,
                    })
                  }
                  className={chip(wNum === q.w && hNum === q.h)}
                >
                  {q.w} × {q.h}
                </button>
              ))}
            </div>

            {ratioDiffers && (
              <div className="mt-5 rounded-xl border border-brand-300 bg-brand-100 p-4">
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
          </div>
        ) : (
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm font-semibold text-brand-900">
              <span>Make it</span>
              <span className="rounded-lg bg-brand-600 px-2.5 py-0.5 text-white">
                {settings.pct}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={200}
              value={settings.pct}
              onChange={(e) => update({ pct: Number(e.target.value) })}
              className="mt-3 w-full accent-brand-600"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>Smaller</span>
              <span>Bigger</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[25, 50, 75, 150].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => update({ pct: p })}
                  className={chip(settings.pct === p)}
                >
                  {p}%
                </button>
              ))}
            </div>
            {!target.error && (
              <p className="mt-3 text-sm text-slate-600">
                New size will be{" "}
                <span className="font-semibold text-brand-700">
                  {target.w} × {target.h} px
                </span>
                .
              </p>
            )}
          </div>
        )}

        {target.error && (
          <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800">
            {target.error}
          </p>
        )}

        <div className="mt-5">
          <p className="text-sm font-semibold text-brand-900">Save as</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FMTS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => update({ fmt: f.value })}
                className={chip(settings.fmt === f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {showQuality && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm font-semibold text-brand-900">
              <span>Quality</span>
              <span className="rounded-lg bg-brand-600 px-2.5 py-0.5 text-white">
                {settings.quality}%
              </span>
            </div>
            <input
              type="range"
              min={40}
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
        )}
      </div>

      {/* 3. Nayi image */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-600 p-5 text-white">
        <p className="font-semibold">Need a different picture?</p>
        <Button type="button" variant="secondary" onClick={reset}>
          Choose another image
        </Button>
      </div>
    </div>
  );
}