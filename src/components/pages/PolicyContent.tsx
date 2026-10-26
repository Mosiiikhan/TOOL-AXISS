import Button from "@/components/ui/Button";

type Section = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

type Props = {
  updated: string;
  intro: string;
  highlights?: readonly string[];
  sections: readonly Section[];
};

export default function PolicyContent({
  updated,
  intro,
  highlights,
  sections,
}: Props) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-sm font-semibold text-slate-500">
          Last updated: {updated}
        </p>
        <p className="mt-3 text-base text-slate-600 sm:text-lg">{intro}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {highlights.map((h) => (
              <li
                key={h}
                className="rounded-2xl border border-brand-300 bg-brand-100 px-4 py-3 text-center text-sm font-bold text-brand-900"
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 space-y-8">
          {sections.map((s, i) => (
            <article key={s.title} className="flex gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-600 font-display text-base font-bold text-white shadow-md shadow-brand-600/30">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-bold text-brand-900 sm:text-2xl">
                  {s.title}
                </h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-2 text-slate-600">
                    {p}
                  </p>
                ))}
                {s.items && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 marker:text-brand-500">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-brand-300 bg-brand-100 p-5 text-center">
          <p className="font-display text-lg font-bold text-brand-900">
            Still have a question?
          </p>
          <p className="mt-1 text-sm text-brand-800">
            We are happy to help.
          </p>
          <div className="mt-4">
            <Button href="/contact">Contact us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}