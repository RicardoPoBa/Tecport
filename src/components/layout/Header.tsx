import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import serviceLandings from "../../data/serviceLandings.json";
import categories from "../../data/categories.json";
import { useQuoteCart } from "../../context/QuoteCartContext";
import { withBase } from "../../lib/assetUrl";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium transition-colors hover:text-brand-action ${
    isActive ? "text-brand-action" : "text-ink"
  }`;

export function Header() {
  const [openMenu, setOpenMenu] = useState<"servicios" | "productos" | null>(null);
  const { count } = useQuoteCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        <Link to="/" className="shrink-0">
          <img src={withBase("/images/logo.png")} alt="TECPORT — Tecnología y Portones" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center lg:flex">
          <NavLink to="/" end className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/quienes_somos" className={navLinkClass}>
            Quiénes Somos
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("servicios")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="px-3 py-2 text-sm font-medium text-ink hover:text-brand-action">
              Áreas de servicio
            </button>
            {openMenu === "servicios" && (
              <div className="absolute left-0 top-full grid w-72 grid-cols-1 gap-1 rounded-lg border border-border bg-surface p-2 shadow-lg">
                {serviceLandings.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/${s.slug}`}
                    className="rounded-md px-3 py-2 text-sm text-ink hover:bg-surface-subtle hover:text-brand-action"
                  >
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("productos")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="px-3 py-2 text-sm font-medium text-ink hover:text-brand-action">
              Productos
            </button>
            {openMenu === "productos" && (
              <div className="absolute left-0 top-full grid w-80 grid-cols-1 gap-1 rounded-lg border border-border bg-surface p-2 shadow-lg">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/productos/${c.slug}`}
                    className="rounded-md px-3 py-2 text-sm text-ink hover:bg-surface-subtle hover:text-brand-action"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/servicios" className={navLinkClass}>
            Servicios
          </NavLink>
          <NavLink to="/contacto" className={navLinkClass}>
            Contacto
          </NavLink>
        </nav>

        <Link
          to="/request-quote"
          className="relative rounded-md bg-brand-action px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-action-hover"
        >
          Mis Cotizaciones
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-xs text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
