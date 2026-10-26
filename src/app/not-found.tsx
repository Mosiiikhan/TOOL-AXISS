import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-brand-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,var(--color-brand-200),transparent)]" />
      <div className="relative mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-4 pb-16 pt-32 text-center">
        <p className="bg-linear-to-r from-brand-500 to-brand-700 bg-clip-text font-display text-8xl font-extrabold text-transparent sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          Sorry, we could not find the page you are looking for. It may have
          moved, or the link may be wrong.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Go to home page
          </Button>
          <Button href="/tools" variant="secondary" size="lg">
            Browse all tools
          </Button>
        </div>
      </div>
    </section>
  );
}