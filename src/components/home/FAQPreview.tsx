const FAQS = [
  {
    q: "Are these tools really free?",
    a: "Yes. You can use every tool as many times as you like, with no sign-up and no watermark.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. Your images are processed inside your own browser, so they never leave your device.",
  },
  {
    q: "Which image formats can I use?",
    a: "You can use common formats like JPG, PNG and WebP. Each tool page lists what it supports.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes. The tools work on phones, tablets and computers with any modern browser.",
  },
  {
    q: "Can I change many images at once?",
    a: "Yes. Choose several images together and download them one by one or all at once.",
  },
];

export default function FAQPreview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            FAQ
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Questions? We have answers
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-brand-300 bg-brand-100 p-4"
            >
              <summary className="cursor-pointer font-display text-base font-bold text-brand-900 sm:text-lg">
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}