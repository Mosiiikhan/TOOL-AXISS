import Button from "@/components/ui/Button";

const TRUST = [
  { title: "100% free", text: "No hidden charges" },
  { title: "No sign-up", text: "Open and use" },
  { title: "Private", text: "Files stay on your device" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-50">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,var(--color-brand-200),transparent)]" />
      <div className="pointer-events-none absolute -left-24 top-40 size-72 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-brand-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-4 py-1.5 text-sm font-semibold text-brand-800 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500" />
            Free tools. Works in your browser.
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-900 sm:text-6xl">
            Free online tools that{" "}
            <span className="bg-linear-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              just work
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
            Compress, convert and resize your images in seconds. No sign-up,
            no software to install, and your files never leave your device.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="/tools/image-compressor" size="lg">
              Compress an image
            </Button>
            <Button href="/tools" variant="secondary" size="lg">
              See all tools
            </Button>
          </div>
        </div>

        {/* demo card (sirf dekhne ke liye) */}
        <div
          aria-hidden
          className="mx-auto mt-12 max-w-md rounded-3xl border-2 border-brand-300 bg-white p-4 shadow-xl shadow-brand-600/10 sm:mt-16"
        >
          <div className="flex items-center gap-4">
            <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-300 to-brand-500 text-white">
              <svg
                viewBox="0 0 24 24"
                className="size-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <circle cx="9" cy="10" r="1.8" />
                <path d="M21 16l-5-5-8 8" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-emerald-600">
                Ready to download
              </p>
              <p className="truncate font-display text-lg font-bold text-brand-900">
                holiday-photo.jpg
              </p>
            </div>
            <span className="shrink-0 rounded-2xl bg-emerald-100 px-3 py-1.5 font-display text-xl font-extrabold text-emerald-700">
              -84%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-sm text-slate-600">
              New size
              <span className="block font-display text-2xl font-extrabold text-brand-700">
                380 KB
              </span>
            </p>
            <p className="text-right text-sm text-slate-500">
              Original size
              <span className="block font-semibold text-slate-700">2.4 MB</span>
            </p>
          </div>
          <div className="mt-2 h-4 overflow-hidden rounded-full bg-brand-100">
            <div className="h-full w-[16%] rounded-full bg-linear-to-r from-brand-400 to-brand-600" />
          </div>
        </div>

        {/* trust points */}
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {TRUST.map((t) => (
            <li
              key={t.title}
              className="rounded-2xl border border-brand-300 bg-brand-100 px-4 py-3 text-center"
            >
              <p className="font-display text-base font-bold text-brand-900">
                {t.title}
              </p>
              <p className="text-sm text-brand-800">{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}