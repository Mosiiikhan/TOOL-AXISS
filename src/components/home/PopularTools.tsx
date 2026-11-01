import Link from "next/link";
import ToolCard from "@/components/tools/ToolCard";
import { getSeoPage } from "@/lib/tools/seo-pages";
import { tools } from "@/lib/tools/tools";

const POPULAR = [
  "compress-image-to-100kb",
  "png-to-jpg",
  "resize-image-for-instagram",
  "compress-image-for-whatsapp",
  "webp-to-jpg",
  "compress-image-to-kb",
  "jpg-to-png",
  "resize-image-in-pixels",
];

export default function PopularTools() {
  const pages = POPULAR.map(getSeoPage).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="font-display text-3xl font-extrabold text-brand-900">
        Pick a tool
      </h2>
      <p className="mt-2 max-w-xl text-slate-600">
        Each tool works right in your browser. Add a picture and get your
        result in seconds.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {tools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>

      <h3 className="mt-14 font-display text-xl font-bold text-brand-900">
        Popular searches
      </h3>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/tools/${p.slug}`}
            className="rounded-full border border-brand-300 bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-600 hover:text-white"
          >
            {p.h1}
          </Link>
        ))}
      </div>
    </section>
  );
}