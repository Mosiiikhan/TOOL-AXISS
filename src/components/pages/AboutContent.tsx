import Button from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/tools/constants";

const VALUES = [
  {
    title: "Free for everyone",
    text: "Every tool is free to use, with no sign-up, no watermark and no hidden limits.",
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
    title: "Your files stay with you",
    text: "Images are processed inside your own browser. We never upload or store them.",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    title: "Simple to use",
    text: "Clear steps, big buttons and no confusing settings. If you can pick a file, you can use it.",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
];

export default function AboutContent() {
  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900">
            Why we built {SITE_NAME}
          </h2>
          <div className="mt-4 space-y-4 text-base text-slate-600 sm:text-lg">
            <p>
              Many online tools ask you to sign up, upload your files to a
              server, or pay to remove a watermark. We wanted something
              simpler.
            </p>
            <p>
              {SITE_NAME} is a growing collection of free online tools that
              run right in your browser. You choose a file, get the result and
              download it. That is all.
            </p>
            <p>
              We are starting with image tools: compress, convert and resize.
              More tools are on the way.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-brand-900">
            What we care about
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
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
                    {v.icon}
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-900">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900">
            Ready to try it?
          </h2>
          <p className="mt-3 text-slate-600">
            Pick a tool and see how quick it is.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/tools" size="lg">
              Browse all tools
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}