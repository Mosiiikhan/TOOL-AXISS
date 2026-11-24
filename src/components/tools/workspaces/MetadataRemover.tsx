"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "@/components/tools/Dropzone";
import Button from "@/components/ui/Button";
import { cleanFile, inspectFile } from "@/lib/tools/metadata-remover";
import {
  extFor,
  finalFileName,
  suggestedBase,
} from "@/lib/tools/metadata-remover/filename";
import {
  META_LABELS,
  type CleanResult,
  type Inspection,
  type Stage,
} from "@/lib/tools/metadata-remover/types";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";

type Phase = "idle" | "inspecting" | "ready" | "working" | "done" | "failed";

const ACCEPT =
  "image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/x-m4v,.jfif,.jpg,.jpeg,.png,.webp,.mp4,.mov,.m4v";

const STAGES: { id: Stage; text: string }[] = [
  { id: "reading", text: "Reading your file" },
  { id: "removing", text: "Removing the metadata" },
  { id: "verifying", text: "Checking the result" },
];

const KIND_LABEL = { jpeg: "JPG", png: "PNG", webp: "WebP", mp4: "Video" };

const msg = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong. Please try again.";

export default function MetadataRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<Inspection | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState<Stage>("reading");
  const [result, setResult] = useState<CleanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [problems, setProblems] = useState<string[]>([]);
  const [base, setBase] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const runId = useRef(0);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  function swapPreview(f: File | null) {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = f ? URL.createObjectURL(f) : null;
    setPreviewUrl(urlRef.current);
  }

  function reset() {
    runId.current++;
    swapPreview(null);
    setFile(null);
    setInfo(null);
    setResult(null);
    setError(null);
    setProblems([]);
    setPhase("idle");
  }

  async function handleFiles(list: File[]) {
    const f = list[0];
    if (!f) return;
    const id = ++runId.current;
    setFile(f);
    setInfo(null);
    setResult(null);
    setError(null);
    setProblems([]);
    setBase(suggestedBase(f.name));
    setPhase("inspecting");
    try {
      const r = await inspectFile(f);
      if (id !== runId.current) return;
      swapPreview(f);
      setInfo(r);
      setPhase("ready");
    } catch (e) {
      if (id !== runId.current) return;
      setError(msg(e));
      setPhase("failed");
    }
  }

  async function remove() {
    if (!file) return;
    const id = ++runId.current;
    setError(null);
    setProblems([]);
    setStage("reading");
    setPhase("working");
    try {
      const r = await cleanFile(file, (s) => {
        if (id === runId.current) setStage(s);
      });
      if (id !== runId.current) return;
      setResult(r);
      if (r.verified) {
        setPhase("done");
      } else {
        setProblems(r.problems);
        setError("We could not confirm that all metadata was removed, so no file is offered.");
        setPhase("failed");
      }
    } catch (e) {
      if (id !== runId.current) return;
      setError(msg(e));
      setPhase("failed");
    }
  }

  if (phase === "idle") {
    return (
      <Dropzone
        onFiles={handleFiles}
        accept={ACCEPT}
        multiple={false}
        hint="JPG, PNG, WebP, MP4 or MOV. One file at a time."
      />
    );
  }

  const final = file && info ? finalFileName(file.name, base, info.kind) : null;
  const ext = file && info ? extFor(file.name, info.kind) : "";
  const stageIndex = STAGES.findIndex((s) => s.id === stage);

  return (
    <div className="space-y-5">
      {/* File ka card */}
      <div className="flex items-center gap-4 rounded-2xl border border-brand-300 bg-white p-4 shadow-sm">
        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-brand-200 bg-brand-100 text-xs font-extrabold text-brand-700">
          {info && previewUrl && info.kind !== "mp4" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="" className="size-full object-cover" />
          ) : info && previewUrl ? (
            <video
              src={previewUrl}
              muted
              playsInline
              preload="metadata"
              className="size-full object-cover"
            />
          ) : (
            "FILE"
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-bold text-brand-900">
            {file?.name}
          </p>
          <p className="text-sm text-slate-600">
            {file ? formatBytes(file.size) : ""}
            {info && (
              <span className="ml-2 rounded-lg bg-brand-600 px-2 py-0.5 text-xs font-extrabold text-white">
                {KIND_LABEL[info.kind]}
              </span>
            )}
          </p>
        </div>
      </div>

      {phase === "inspecting" && (
        <p className="rounded-2xl border border-brand-300 bg-white p-5 text-center font-semibold text-brand-700">
          Scanning your file...
        </p>
      )}

      {phase === "ready" && info && (
        <div className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm">
          {info.found.length > 0 ? (
            <>
              <h3 className="font-display text-lg font-bold text-brand-900">
                We found hidden data
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {info.found.map((k) => (
                  <li
                    key={k}
                    className="rounded-full border border-brand-300 bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800"
                  >
                    {META_LABELS[k]}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="font-semibold text-brand-900">
              We found no location, camera, date or software data in this file.
              There is nothing to remove.
            </p>
          )}
          {info.notes.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-800">
              {info.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {info.found.length > 0 && (
              <Button type="button" size="lg" onClick={remove}>
                Remove metadata
              </Button>
            )}
            <Button type="button" size="lg" variant="secondary" onClick={reset}>
              Choose another file
            </Button>
          </div>
        </div>
      )}

      {phase === "working" && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-brand-300 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <span className="size-10 shrink-0 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 motion-reduce:animate-none" />
            <p className="font-display text-lg font-bold text-brand-900">
              {STAGES[stageIndex]?.text}...
            </p>
          </div>
          <ol className="mt-4 space-y-2 text-sm">
            {STAGES.map((s, i) => (
              <li
                key={s.id}
                className={`flex items-center gap-2 font-semibold ${
                  i < stageIndex
                    ? "text-emerald-600"
                    : i === stageIndex
                      ? "text-brand-700"
                      : "text-slate-400"
                }`}
              >
                <span>{i < stageIndex ? "Done:" : i === stageIndex ? "Now:" : "Next:"}</span>
                {s.text}
              </li>
            ))}
          </ol>
        </div>
      )}

      {phase === "done" && result && info && final && (
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-5 shadow-sm">
          <p className="flex items-center gap-2 font-display text-xl font-extrabold text-emerald-700">
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Metadata removed successfully
          </p>
          {result.removed.length > 0 && (
            <p className="mt-2 text-sm text-emerald-900">
              Removed: {result.removed.map((k) => META_LABELS[k]).join(", ")}
            </p>
          )}
          {result.notes.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
              {result.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}

          <label
            htmlFor="mr-name"
            className="mt-5 block text-sm font-semibold text-brand-900"
          >
            File name
          </label>
          <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border-2 border-brand-300 bg-white focus-within:border-brand-600">
            <input
              id="mr-name"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              maxLength={120}
              spellCheck={false}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-semibold text-brand-900 outline-none"
            />
            <span className="grid place-items-center bg-brand-100 px-3 text-sm font-bold text-brand-700">
              {ext}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-600">
            Will be saved as{" "}
            <span className="font-semibold text-brand-900">{final.name}</span>
            {final.adjusted &&
              ". We added -cleaned so the name never matches your original file."}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              size="lg"
              onClick={() => downloadBlob(result.blob, final.name)}
            >
              Download cleaned file
            </Button>
            <Button type="button" size="lg" variant="secondary" onClick={reset}>
              Clean another file
            </Button>
          </div>
        </div>
      )}

      {phase === "failed" && (
        <div
          role="alert"
          className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 text-amber-900"
        >
          <p className="font-display text-lg font-bold">Something went wrong</p>
          <p className="mt-1 text-sm">{error}</p>
          {problems.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-sm">
              {problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={reset}
          >
            Try another file
          </Button>
        </div>
      )}
    </div>
  );
}