import Link from "next/link";
import { TERMS_UPDATED, termsSections } from "@/lib/legal/terms";

export default function TermsContent() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-semibold text-slate-500">
        Last updated: {TERMS_UPDATED}
      </p>

      <div className="mt-6 space-y-4">
        {termsSections.map((s, i) => (
          <article
            key={s.title}
            className="rounded-2xl border border-brand-300 bg-brand-100 p-6"
          >
            <h2 className="flex items-center gap-3 font-display text-xl font-bold text-brand-900">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-sm font-extrabold text-white">
                {i + 1}
              </span>
              {s.title}
            </h2>
            <div className="mt-3 space-y-3 leading-relaxed text-slate-700">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-slate-600">
        Questions about these terms?{" "}
        <Link
          href="/contact"
          className="font-semibold text-brand-700 underline underline-offset-4"
        >
          Contact us
        </Link>
        .
      </p>
    </section>
  );
}