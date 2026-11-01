import Link from "next/link";
import ToolCard from "@/components/tools/ToolCard";
import { publishedSeoPages } from "@/lib/tools/seo-pages";
import { tools } from "@/lib/tools/tools";
import type { ToolId } from "@/lib/tools/types";

const GROUPS: { id: ToolId; title: string }[] = [
  { id: "image-compressor", title: "Compress images" },
  { id: "image-converter", title: "Convert images" },
  { id: "image-resizer", title: "Resize images" },
];

export default function ToolsIndex() {
  const pages = publishedSeoPages();

  return (
    <main>
      <section className="bg-brand-600 bg-[radial-gradient(circle_at_85%_0%,var(--color-brand-400),transparent_55%)]">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-14 sm:pt-20">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            All free tools
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            Pick what you want to do with your pictures. Everything runs in your
            browser and nothing is uploaded.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>

        <div className="mt-16 space-y-12">
          {GROUPS.map((g) => {
            const list = pages.filter((p) => p.tool === g.id);
            if (list.length === 0) return null;
            return (
              <section key={g.id}>
                <h2 className="font-display text-2xl font-bold text-brand-900">
                  {g.title}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {list.map((p) => (
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
          })}
        </div>
      </div>
    </main>
  );
}