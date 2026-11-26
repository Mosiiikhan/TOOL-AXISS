
"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";

type Props = {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
};

export default function PdfDropzone({
  onFiles,
  multiple = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = (list: FileList | null) => {
    if (!list || list.length === 0) return;

    const all = Array.from(list);
    const valid = all.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"),
    );

    if (valid.length === 0) {
      setError("Please choose a valid PDF file.");
      return;
    }

    setError(
      valid.length < all.length
        ? `${all.length - valid.length} unsupported file(s) skipped.`
        : null,
    );

    onFiles(multiple ? valid : valid.slice(0, 1));
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
          <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v6h5M9 14h6M9 18h6" />
        </svg>
      </span>

      <p className="mt-5 font-display text-xl font-bold text-brand-900">
        Drop your PDF {multiple ? "files" : "file"} here
      </p>
      <p className="mt-1 text-sm text-slate-600">
        or choose from your device
      </p>

      <Button
        type="button"
        size="lg"
        className="mt-6"
        onClick={() => inputRef.current?.click()}
      >
        Choose PDF {multiple ? "files" : "file"}
      </Button>

      <p className="mt-4 text-xs text-slate-500">
        PDF files only · Maximum file size 100 MB
      </p>

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
        accept="application/pdf,.pdf"
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
