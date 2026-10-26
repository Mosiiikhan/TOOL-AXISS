"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";

type Props = {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  hint?: string;
};

export default function Dropzone({
  onFiles,
  accept = "image/*",
  multiple = true,
  hint = "JPG, PNG or WebP",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAllowed = (f: File) =>
    accept.split(",").some((raw) => {
      const t = raw.trim();
      if (t.endsWith("/*")) return f.type.startsWith(t.slice(0, -1));
      if (t.startsWith(".")) return f.name.toLowerCase().endsWith(t);
      return f.type === t;
    });

  const handle = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const all = Array.from(list);
    const files = all.filter(isAllowed);
    const skipped = all.length - files.length;

    if (files.length === 0) {
      setError(`That file is not supported here. Allowed: ${hint}`);
      return;
    }
    setError(
      skipped > 0
        ? `${skipped} ${skipped > 1 ? "files were" : "file was"} skipped because the type is not supported. Allowed: ${hint}`
        : null,
    );
    onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handle(e.dataTransfer.files);
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
        Drop your images here
      </p>
      <p className="mt-1 text-sm text-slate-600">
        or pick them from your device
      </p>

      <Button
        type="button"
        size="lg"
        className="mt-6"
        onClick={() => inputRef.current?.click()}
      >
        Choose images
      </Button>

      <p className="mt-4 text-xs text-slate-500">{hint}</p>

      {error && (
        <p
          role="alert"
          className="mt-4 max-w-md rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800"
        >
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}