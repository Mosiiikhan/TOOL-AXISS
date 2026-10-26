import Link from "next/link";
import type { ReactNode } from "react";
import type { SeoPage, Tool } from "@/lib/tools/types";

export default function ToolPageShell({
  tool,
  related,
  seo,
  children,
}: {
  tool: Tool;
  related: Tool[];
  seo?: SeoPage;
  children: ReactNode;
}) {
  const heading = seo ? seo.h1 : tool.title.split(" - ")[0];

  return (
    <main>
      <section className="bg-brand-600 bg-[radial-gradient(circle_at_85%_0%,var(--color-brand-400),transparent_55%)]">
        <div className="mx-auto max-w-5xl px-4 pb-24 pt-14 sm:pt-20">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            {tool.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        <section className="relative -mt-12 rounded-3xl border-2 border-brand-300 bg-brand-50 p-6 shadow-xl shadow-brand-600/20 sm:p-8">
          {children}
        </section>

        {seo && (
          <>
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold text-brand-900">
                How to use it
              </h2>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {seo.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-2xl border border-brand-300 bg-brand-100 p-4"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-600 font-display text-lg font-extrabold text-white shadow-md shadow-brand-600/30">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-16 rounded-r-2xl border-l-4 border-brand-600 bg-brand-50 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-brand-900">
                About this tool
              </h2>
              <p className="mt-3 leading-relaxed text-slate-700">{seo.intro}</p>
            </section>
          </>
        )}

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-brand-900">
            Questions people ask
          </h2>
          <div className="mt-5 space-y-3">
            {tool.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-brand-300 bg-brand-100 px-5 py-4 open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-800 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mb-20 mt-16">
            <h2 className="font-display text-2xl font-bold text-brand-900">
              More free tools
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="rounded-2xl border border-brand-300 bg-brand-100 p-5 font-semibold text-brand-800 transition hover:bg-brand-600 hover:text-white"
                >
                  {t.title.split(" - ")[0]}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}