"use client";

import Button from "@/components/ui/Button";

type Props = {
  label: string;
  current?: number;
  total?: number;
  onCancel?: () => void;
};

export default function PdfProgress({ label, current, total, onCancel }: Props) {
  const known = typeof current === "number" && typeof total === "number" && total > 0;
  const percent = known ? Math.min(100, Math.round((current / total) * 100)) : null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-base font-bold text-brand-900">{label}</p>
        {known && (
          <span className="shrink-0 rounded-lg bg-brand-600 px-2.5 py-0.5 text-sm font-bold text-white">
            {current} / {total}
          </span>
        )}
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent ?? undefined}
        className="mt-3 h-3 overflow-hidden rounded-full bg-brand-100"
      >
        <div
          className={`h-full rounded-full bg-linear-to-r from-brand-400 to-brand-600 transition-all duration-300 ${
            percent === null ? "w-1/3 animate-pulse motion-reduce:animate-none" : ""
          }`}
          style={percent === null ? undefined : { width: `${percent}%` }}
        />
      </div>

      {onCancel && (
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}