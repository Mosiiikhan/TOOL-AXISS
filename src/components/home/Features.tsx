import { SITE_NAME } from "@/lib/tools/constants";
const FEATURES = [
  {
    title: "Fast",
    text: "Your image is ready in a moment. No waiting in a queue.",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    title: "Private",
    text: "Everything happens on your device. Your files are never uploaded.",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    title: "Free forever",
    text: "No sign-up, no watermark and no limits on how often you use it.",
    icon: (
      <>
        <path d="M20 12v8H4v-8" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H8a2.5 2.5 0 1 1 0-5c3 0 4 5 4 5z" />
        <path d="M12 7h4a2.5 2.5 0 1 0 0-5c-3 0-4 5-4 5z" />
      </>
    ),
  },
  {
    title: "Works everywhere",
    text: "Use it on your phone, tablet or computer. Nothing to install.",
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-brand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Why {SITE_NAME}
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Simple, safe and free
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-900">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}