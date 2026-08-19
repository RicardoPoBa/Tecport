import { Link } from "react-router-dom";
import serviceLandings from "../../data/serviceLandings.json";
import categories from "../../data/categories.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <p className="text-lg font-heading font-bold">TECPORT</p>
          <p className="text-sm text-white/70">Tecnología y Portones</p>
          <p className="text-sm text-white/70">info@tecportcr.com</p>
          <a
            href="https://api.whatsapp.com/send?phone=50685842773&text=Info%20WEB"
            className="inline-block text-sm font-medium text-brand-action hover:underline"
          >
            WhatsApp: +506 8584-2773
          </a>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
            Áreas de servicio
          </p>
          <ul className="space-y-2">
            {serviceLandings.map((s) => (
              <li key={s.slug}>
                <Link to={`/${s.slug}`} className="text-sm text-white/80 hover:text-brand-action">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
            Productos
          </p>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/productos/${c.slug}`} className="text-sm text-white/80 hover:text-brand-action">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
            Contacto
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/contacto" className="hover:text-brand-action">
                Formulario de contacto
              </Link>
            </li>
            <li>
              <Link to="/request-quote" className="hover:text-brand-action">
                Mis Cotizaciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} TECPORT. Todos los derechos reservados.
      </div>
    </footer>
  );
}
