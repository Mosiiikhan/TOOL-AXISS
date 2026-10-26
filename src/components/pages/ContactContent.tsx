import Button from "@/components/ui/Button";

// TODO: apna asli email yahan likhein
const CONTACT_EMAIL = "mohsinishfaq230@gmail.com";

const TOPICS = [
  {
    title: "Question or problem",
    text: "A tool is not working as you expect? Tell us what happened and which browser you use.",
  },
  {
    title: "Idea for a new tool",
    text: "Is there a tool you wish existed? We would love to hear about it.",
  },
  {
    title: "Feedback",
    text: "Tell us what we can make simpler, faster or clearer.",
  },
];

export default function ContactContent() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Hello from the website",
  )}`;

  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-3xl border-2 border-brand-300 bg-brand-50 p-6 text-center shadow-xl shadow-brand-600/10 sm:p-10">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
              <svg
                viewBox="0 0 24 24"
                className="size-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="M3 8l9 6 9-6" />
              </svg>
            </span>

            <h2 className="mt-5 font-display text-2xl font-extrabold text-brand-900 sm:text-3xl">
              Send us an email
            </h2>
            <p className="mt-2 text-slate-600">
              We read every message and reply as soon as we can.
            </p>

            <p className="mt-5 break-all rounded-2xl border border-brand-300 bg-white px-4 py-3 font-display text-lg font-bold text-brand-800 sm:text-xl">
              {CONTACT_EMAIL}
            </p>

            <div className="mt-5">
              <Button href={mailto} size="lg" className="w-full sm:w-auto">
                Open my email app
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-brand-900">
            What can you write about?
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TOPICS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-brand-300 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-brand-900">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
            Please do not send private photos or files by email. Our tools work
            on your device, so we never need them.
          </p>
        </div>
      </section>
    </>
  );
}