interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function Hero({ eyebrow, title, subtitle }: HeroProps) {
  return (
    <section className="border-b border-border bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8 lg:py-24">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-action">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-bold text-ink lg:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>}
      </div>
    </section>
  );
}
