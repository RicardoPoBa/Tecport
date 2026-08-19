import { Link } from "react-router-dom";
import serviceLandings from "../data/serviceLandings.json";
import { withBase } from "../lib/assetUrl";

export function HomePage() {
  return (
    <>
      <section className="bg-surface-subtle">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center lg:px-8 lg:py-28">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-action">
            Automatización · Seguridad · Control de acceso
          </p>
          <h1 className="text-4xl font-bold text-ink lg:text-5xl">
            Portones y sistemas de seguridad para cada proyecto
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Automatización residencial y condominal, control de acceso, CCTV, cercas eléctricas y más —
            con las mejores marcas del mercado.
          </p>
          <Link
            to="/productos/motores-para-portones"
            className="mt-8 inline-block rounded-md bg-brand-action px-6 py-3 text-sm font-semibold text-white hover:bg-brand-action-hover"
          >
            Ver nuestros productos
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-ink">Áreas de servicio</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {serviceLandings.map((s) => (
            <Link
              key={s.slug}
              to={`/${s.slug}`}
              className="group overflow-hidden rounded-lg border border-border transition-colors hover:border-brand-action"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface-subtle">
                {s.thumbnail ? (
                  <img
                    src={withBase(s.thumbnail)}
                    alt={s.navLabel}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted">
                    {s.navLabel}
                  </div>
                )}
              </div>
              <p className="p-3 text-center text-sm font-medium text-ink group-hover:text-brand-action">
                {s.navLabel}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8">
        <h2 className="text-2xl font-bold text-ink">Sobre TECPORT</h2>
        <p className="mt-4 text-muted">
          Desde 2019 brindamos soluciones de automatización y seguridad a inmobiliarias, constructoras
          y condominios en Costa Rica, con garantía por escrito en todos nuestros trabajos.
        </p>
        <Link to="/quienes_somos" className="mt-4 inline-block text-sm font-semibold text-brand-action hover:underline">
          Leer más
        </Link>
      </section>
    </>
  );
}
