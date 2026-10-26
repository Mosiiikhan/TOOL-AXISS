type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-600">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,var(--color-brand-400),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-32 text-center sm:pb-20 sm:pt-40">
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-wider text-brand-200">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-base text-brand-100 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}