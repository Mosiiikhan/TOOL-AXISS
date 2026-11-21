"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import {
  buildSections,
  countFields,
  toJsonReport,
  toTextReport,
} from "@/lib/metadata/report";
import type { ExtractResult, MetaRow } from "@/lib/metadata/types";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";

function Rows({ rows }: { rows: MetaRow[] }) {
  return (
    <dl className="divide-y divide-brand-200">
      {rows.map((r, i) => (
        <div
          key={`${r.label}-${i}`}
          className="grid gap-1 py-2.5 sm:grid-cols-[14rem_1fr] sm:gap-4"
        >
          <dt className="text-sm font-semibold text-brand-900">{r.label}</dt>
          <dd className="min-w-0 whitespace-pre-wrap break-words text-sm text-slate-700">
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Chevron() {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition group-open:rotate-180">
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

function LazyPre({ title, text }: { title: string; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group rounded-2xl border border-brand-300 bg-brand-100 px-5 py-4"
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-brand-900">
        {title}
        <Chevron />
      </summary>
      {open && (
        <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
          {text}
        </pre>
      )}
    </details>
  );
}

type ReportFormat = "json" | "txt";

export default function MetadataReport({ result }: { result: ExtractResult }) {
  const sections = useMemo(() => buildSections(result), [result]);
  const fieldCount = useMemo(() => countFields(result.raw), [result]);
  const rawText = useMemo(() => JSON.stringify(result.raw, null, 2), [result]);
  const [format, setFormat] = useState<ReportFormat>("json");

  const baseName = result.file.name.replace(/\.[^.]+$/, "") || "file";

  const download = (kind: ReportFormat) => {
    const generatedAt = new Date().toISOString();
    if (kind === "json") {
      downloadBlob(
        new Blob([toJsonReport(result, sections, generatedAt)], {
          type: "application/json",
        }),
        `${baseName}-metadata-report.json`,
      );
    } else {
      downloadBlob(
        new Blob([toTextReport(result, sections, generatedAt)], {
          type: "text/plain;charset=utf-8",
        }),
        `${baseName}-metadata-report.txt`,
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-bold text-brand-600">Metadata report</p>
            <h3 className="truncate font-display text-xl font-extrabold text-brand-900">
              {result.file.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-brand-800">
                {result.kind === "image" ? "Image" : "Video"} · {result.format}
              </span>
              <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-brand-800">
                {formatBytes(result.file.size)}
              </span>
              <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-brand-800">
                {fieldCount} fields found
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <p className="mb-2 text-sm font-semibold text-brand-900">Download Report</p>
            <div className="flex flex-col gap-2">
              <div
                role="radiogroup"
                aria-label="Report format"
                className="inline-flex w-full rounded-xl border border-brand-300 bg-brand-100 p-1"
              >
                {(["json", "txt"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={format === f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 rounded-lg px-4 py-1.5 text-sm font-bold uppercase transition ${
                      format === f
                        ? "bg-white text-brand-900 shadow-sm"
                        : "text-slate-500 hover:text-brand-900"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <Button
                type="button"
                size="md"
                onClick={() => download(format)}
                className="gap-2 bg-red-600! text-white! shadow-md shadow-red-600/30 hover:bg-red-700!"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4v12M12 16l-4-4M12 16l4-4" />
                  <path d="M4 18v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1" />
                </svg>
                Download {format.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {result.warnings.map((w) => (
        <p
          key={w}
          className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-800"
        >
          {w}
        </p>
      ))}

      {!result.hasEmbeddedMetadata && (
        <p className="rounded-2xl border border-brand-300 bg-brand-100 p-4 text-sm font-semibold text-brand-800">
          No embedded metadata was found in this file. Basic file properties may still be
          available.
        </p>
      )}

      {sections.map((s) => (
        <details
          key={s.id}
          open={!s.collapsed}
          className="group rounded-2xl border border-brand-300 bg-white px-5 py-4 shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-brand-900">
            <span>
              {s.title}
              <span className="ml-2 text-sm font-semibold text-slate-400">
                {s.rows.length + (s.moreRows?.length ?? 0) || (s.text ? 1 : 0)}
              </span>
            </span>
            <Chevron />
          </summary>
          <div className="mt-3">
            {s.note && <p className="mb-2 text-xs text-slate-500">{s.note}</p>}
            {s.rows.length > 0 && <Rows rows={s.rows} />}
            {s.text && (
              <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
                {s.text}
              </pre>
            )}
            {s.moreRows && s.moreRows.length > 0 && (
              <details className="mt-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
                <summary className="cursor-pointer text-sm font-bold text-brand-800">
                  All fields ({s.moreRows.length})
                </summary>
                <div className="mt-2">
                  <Rows rows={s.moreRows} />
                </div>
              </details>
            )}
          </div>
        </details>
      ))}

      <LazyPre title="Raw metadata (JSON)" text={rawText} />

      <p className="text-xs text-slate-500">
        A missing field does not prove that a file was edited or generated by AI. Many apps
        remove metadata when a file is shared.
      </p>
    </div>
  );
}