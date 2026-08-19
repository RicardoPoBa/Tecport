import { useState } from "react";
import { Hero } from "../components/layout/Hero";

export function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar a un servicio de envío de email real cuando se defina el backend.
    setSubmitted(true);
  };

  return (
    <>
      <Hero eyebrow="Hablemos" title="Contacto" />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8">
        <div className="space-y-2 text-sm text-muted">
          <p className="font-semibold text-ink">TECPORT</p>
          <p>info@tecportcr.com</p>
          <a
            href="https://api.whatsapp.com/send?phone=50685842773&text=Info%20WEB"
            className="inline-block font-medium text-brand-action hover:underline"
          >
            WhatsApp: +506 8584-2773
          </a>
          <p className="pt-4 text-xs text-muted">
            Nota: la dirección/teléfono fijo publicados en el sitio original eran inconsistentes entre
            páginas — pendiente de confirmación por el cliente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">Nombre</label>
            <input required type="text" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">Email</label>
            <input required type="email" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">Teléfono</label>
            <input required type="tel" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">Comentarios</label>
            <textarea required rows={4} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
          <button
            type="submit"
            className="rounded-md bg-brand-action px-6 py-3 text-sm font-semibold text-white hover:bg-brand-action-hover"
          >
            Enviar
          </button>
          {submitted && (
            <p className="text-sm text-muted">
              Formulario listo a nivel de interfaz — falta conectar el envío real (pendiente de backend).
            </p>
          )}
        </form>
      </section>
    </>
  );
}
