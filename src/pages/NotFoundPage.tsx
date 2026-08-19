import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="text-3xl font-bold text-ink">Página no encontrada</h1>
      <p className="mt-2 text-muted">El contenido que buscás no existe o fue movido.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-brand-action px-6 py-3 text-sm font-semibold text-white hover:bg-brand-action-hover"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
