import Link from "next/link";
import type { ReactNode } from "react";
import type { Tool } from "@/lib/tools/types";

const ICONS: Record<string, ReactNode> = {
  "image-compressor": (
    <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
  ),
  "image-converter": (
    <path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" />
  ),
  "image-resizer": <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-3xl border border-brand-300 bg-brand-100 p-6 transition duration-200 hover:-translate-y-1 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-600/25"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-600/30 transition group-hover:bg-white group-hover:text-brand-600">
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[tool.slug] ?? <circle cx="12" cy="12" r="8" />}
        </svg>
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-brand-900 transition group-hover:text-white">
        {tool.title.split(" - ")[0]}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 transition group-hover:text-brand-100">
        {tool.description}
      </p>
      <span className="mt-5 text-sm font-bold text-brand-700 transition group-hover:text-white">
        Open tool
      </span>
    </Link>
  );
}