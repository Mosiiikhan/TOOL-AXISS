import Link from "next/link";
import type { Tool } from "@/lib/tools/types";

const ICONS: Record<string, React.ReactNode> = {
  "image-compressor": (
    <>
      <path d="M4 14h6v6" />
      <path d="M20 10h-6V4" />
      <path d="M14 10l7-7" />
      <path d="M3 21l7-7" />
    </>
  ),
  "image-converter": (
    <>
      <path d="M17 3l4 4-4 4" />
      <path d="M21 7H8a4 4 0 0 0-4 4" />
      <path d="M7 21l-4-4 4-4" />
      <path d="M3 17h13a4 4 0 0 0 4-4" />
    </>
  ),
  "image-resizer": (
    <>
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </>
  ),
};

const FALLBACK_ICON = (
  <>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="M21 16l-5-5-8 8" />
  </>
);

export default function ToolCard({ tool }: { tool: Tool }) {
  const [name, subtitle] = tool.title.split(" - ");

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-brand-300 bg-brand-100 p-5 transition duration-200 hover:-translate-y-1 hover:border-brand-500 hover:bg-white hover:shadow-xl hover:shadow-brand-600/15"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="size-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[tool.slug] ?? FALLBACK_ICON}
        </svg>
      </span>

      <h3 className="mt-4 font-display text-xl font-bold text-brand-900">
        {name}
      </h3>
      {subtitle && (
        <p className="mt-0.5 text-sm font-semibold text-brand-700">
          {subtitle}
        </p>
      )}
      <p className="mt-2 line-clamp-3 text-sm text-slate-600">
        {tool.description}
      </p>

      <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-bold text-brand-700">
        Use this tool
        <svg
          viewBox="0 0 24 24"
          className="size-4 transition group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}