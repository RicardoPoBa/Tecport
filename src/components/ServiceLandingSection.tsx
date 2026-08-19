import { Link } from "react-router-dom";
import type { ServiceLanding } from "../types";
import { Hero } from "./layout/Hero";

const iconPlaceholder = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export function ServiceLandingSection({ landing }: { landing: ServiceLanding }) {
  return (
    <>
      <Hero eyebrow="Área de servicio" title={landing.title} />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {landing.features.map((f) => (
            <div key={f.title} className="rounded-lg border border-border p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-action text-white">
                {iconPlaceholder}
              </div>
              <p className="font-semibold text-ink">{f.title}</p>
              <p className="mt-1 text-sm text-muted">{f.text}</p>
            </div>
          ))}
        </div>

        {landing.body.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl space-y-4 text-center text-muted">
            {landing.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {landing.images.length > 0 && (
          <div
            className={`mx-auto mt-12 grid max-w-5xl gap-4 ${
              landing.images.length === 1 ? "sm:max-w-2xl" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {landing.images.map((src) => (
              <img
                key={src}
                src={src}
                alt={landing.title}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        {landing.relatedCategorySlug && (
          <div className="mt-10 text-center">
            <Link
              to={`/productos/${landing.relatedCategorySlug}`}
              className="inline-block rounded-md bg-brand-action px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-action-hover"
            >
              Ver productos relacionados
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
