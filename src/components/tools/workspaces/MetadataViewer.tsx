"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import MetadataReport from "@/components/tools/metadata/MetadataReport";
import { detectKind, extractMetadata } from "@/lib/metadata/extract";
import { FILE_ACCEPT, MetadataError } from "@/lib/metadata/types";
import type { ExtractResult, FileKind } from "@/lib/metadata/types";
import { formatBytes } from "@/lib/tools/utils";

type Status = "idle" | "analyzing" | "done" | "error";

const UNSUPPORTED =
  "This file type is not supported. Please choose an image (JPG, PNG, WebP, HEIC, AVIF, TIFF) or a video (MP4, MOV, WebM, MKV, AVI, M4V, 3GP).";

function clock(sec: number) {
  const s = Math.round(sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = String(m).padStart(2, "0");
  const rr = String(r).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${rr}` : `${m}:${rr}`;
}

export default function MetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<FileKind | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [dims, setDims] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef<string | null>(null);
  const runId = useRef(0);

  useEffect(() => {
    const u = urlRef;
    return () => {
      if (u.current) URL.revokeObjectURL(u.current);
    };
  }, []);

  const clear = () => {
    runId.current++;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setFile(null);
    setKind(null);
    setUrl(null);
    setStatus("idle");
    setResult(null);
    setError(null);
    setShowReport(false);
    setPreviewFailed(false);
    setDims(null);
  };

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    const k = detectKind(f);
    if (!k) {
      setError(UNSUPPORTED);
      return;
    }
    clear();
    const objectUrl = URL.createObjectURL(f);
    urlRef.current = objectUrl;
    setFile(f);
    setKind(k);
    setUrl(objectUrl);
    setStatus("analyzing");

    const id = ++runId.current;
    extractMetadata(f)
      .then((r) => {
        if (id !== runId.current) return;
        setResult(r);
        setStatus("done");
      })
      .catch((e: unknown) => {
        if (id !== runId.current) return;
        setStatus("error");
        setError(
          e instanceof MetadataError
            ? e.message
            : "Something went wrong while reading this file.",
        );
      });
  };

  const openReport = () => {
    setShowReport(true);
    setTimeout(
      () => reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
  };

  // ---------- Upload area ----------
  if (!file || !url || !kind) {
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
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition ${
            dragging
              ? "scale-[1.01] border-brand-600 bg-brand-200"
              : "border-brand-400 bg-brand-100"
          }`}
        >
          <span className="grid size-16 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
            <svg
              viewBox="0 0 24 24"
              className="size-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
              <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
          </span>
          <p className="mt-5 font-display text-xl font-bold text-brand-900">
            Drop an image or video here
          </p>
          <p className="mt-1 text-sm text-slate-600">or</p>
          <Button
            type="button"
            size="lg"
            className="mt-3"
            onClick={() => inputRef.current?.click()}
          >
            Choose File
          </Button>
          <p className="mt-4 max-w-md text-xs text-slate-500">
            Images: JPG, PNG, WebP, HEIC / HEIF, AVIF, TIFF. Videos: MP4, MOV, WebM, MKV, AVI,
            M4V, 3GP. What can be previewed or read depends on your browser and the file.
          </p>
          <p className="mt-3 max-w-md text-xs font-semibold text-brand-700">
            Your files never leave your device. Metadata extraction happens directly in your
            browser.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={FILE_ACCEPT}
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    );
  }

  // ---------- Preview aur report ----------
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-brand-300 bg-white shadow-sm">
        <div className="flex min-h-48 items-center justify-center bg-brand-50 p-2 sm:p-3">
          {previewFailed ? (
            <p className="max-w-sm px-4 py-10 text-center text-sm font-semibold text-slate-600">
              Your browser cannot show a preview of this {kind === "image" ? "image" : "video"}{" "}
              format. The metadata can still be read below.
            </p>
          ) : kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt={file.name}
              onLoad={(e) =>
                setDims(`${e.currentTarget.naturalWidth} × ${e.currentTarget.naturalHeight} px`)
              }
              onError={() => setPreviewFailed(true)}
              className="h-auto max-h-[28rem] w-full rounded-xl object-contain"
            />
          ) : (
            <video
              src={url}
              controls
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                setDims(
                  `${v.videoWidth} × ${v.videoHeight} px · ${clock(v.duration)}`,
                );
              }}
              onError={() => setPreviewFailed(true)}
              className="max-h-[28rem] w-full rounded-xl bg-black object-contain"
            />
          )}
        </div>

        <div className="p-4">
          <p className="truncate text-center font-display text-lg font-bold text-brand-900">
            {file.name}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs font-semibold">
            <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-brand-800">
              {formatBytes(file.size)}
            </span>
            {dims && (
              <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-brand-800">{dims}</span>
            )}
          </div>

          {status === "analyzing" && (
            <p className="mt-4 text-center text-sm font-semibold text-brand-700">
              Analyzing your file...
            </p>
          )}

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800"
            >
              {error}
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="w-full sm:flex-1"
              disabled={status !== "done"}
              onClick={openReport}
            >
              View Metadata Report
            </Button>
            <Button type="button" size="lg" variant="secondary" onClick={clear}>
              Choose another file
            </Button>
          </div>
        </div>
      </div>

      <div ref={reportRef}>
        {showReport && result && <MetadataReport result={result} />}
      </div>
    </div>
  );
}