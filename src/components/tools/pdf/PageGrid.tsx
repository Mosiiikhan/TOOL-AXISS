"use client";

export type GridPage = { number: number; url: string | null };

type Props = {
  pages: GridPage[];
  selected: ReadonlySet<number>;
  onToggle: (pageNumber: number) => void;
  onSelectAll: () => void;
  onClear: () => void;
  disabled?: boolean;
};

export default function PageGrid({
  pages,
  selected,
  onToggle,
  onSelectAll,
  onClear,
  disabled,
}: Props) {
  return (
    <div className="rounded-2xl border border-brand-300 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-base font-bold text-brand-900">
          {selected.size} of {pages.length} pages selected
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={onSelectAll}
            className="rounded-lg border border-brand-300 bg-brand-100 px-3 py-1.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-200 disabled:opacity-50"
          >
            Select all
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={onClear}
            className="rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50 disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {pages.map((p) => {
          const on = selected.has(p.number);
          return (
            <li key={p.number}>
              <button
                type="button"
                disabled={disabled}
                aria-pressed={on}
                aria-label={`Page ${p.number}${on ? ", selected" : ""}`}
                onClick={() => onToggle(p.number)}
                className={`group relative block w-full overflow-hidden rounded-xl border-2 bg-brand-50 text-left transition disabled:opacity-60 ${
                  on
                    ? "border-brand-600 shadow-md shadow-brand-600/20"
                    : "border-brand-200 hover:border-brand-400"
                }`}
              >
                <div className="grid aspect-[3/4] place-items-center">
                  {p.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.url}
                      alt=""
                      className="size-full object-contain"
                      draggable={false}
                    />
                  ) : (
                    <span className="size-8 animate-pulse rounded-full bg-brand-200 motion-reduce:animate-none" />
                  )}
                </div>

                <span
                  className={`absolute right-2 top-2 grid size-6 place-items-center rounded-full border-2 text-white ${
                    on ? "border-brand-600 bg-brand-600" : "border-slate-300 bg-white/90"
                  }`}
                  aria-hidden="true"
                >
                  {on && (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>

                <span className="block bg-white px-2 py-1.5 text-center text-xs font-bold text-brand-800">
                  Page {p.number}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}