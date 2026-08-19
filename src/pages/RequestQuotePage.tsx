import { useState } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/layout/Hero";
import { useQuoteCart } from "../context/QuoteCartContext";
import { withBase } from "../lib/assetUrl";

export function RequestQuotePage() {
  const { items, removeItem, updateQuantity, clear } = useQuoteCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar a un servicio de envío de email real cuando se defina el backend.
    setSubmitted(true);
  };

  return (
    <>
      <Hero eyebrow="Carrito de cotización" title="Mis Cotizaciones" />
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        {items.length === 0 ? (
          <p className="text-center text-muted">
            Todavía no agregaste productos.{" "}
            <Link to="/productos/motores-para-portones" className="text-brand-action hover:underline">
              Ver catálogo
            </Link>
          </p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted">
                  <th className="py-2">Producto</th>
                  <th className="py-2">Cantidad</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {items.map(({ product, quantity }) => (
                  <tr key={product.id} className="border-b border-border">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-subtle">
                          {product.images[0] ? (
                            <img
                              src={withBase(product.images[0])}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-muted">Sin imagen</span>
                          )}
                        </div>
                        <span className="font-medium text-ink">
                          {product.name} <span className="text-muted">({product.sku})</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                        className="w-16 rounded-md border border-border px-2 py-1"
                      />
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-muted hover:text-brand-action"
                        aria-label="Eliminar"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={clear} className="mt-4 text-sm text-muted hover:text-brand-action">
              Vaciar cotización
            </button>

            <form onSubmit={handleSubmit} className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">Nombre</label>
                <input required type="text" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">Apellidos</label>
                <input required type="text" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">Teléfono</label>
                <input required type="tel" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">Correo electrónico</label>
                <input required type="email" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-ink">Dirección</label>
                <input type="text" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-ink">Mensaje</label>
                <textarea rows={4} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
              </div>
              <button
                type="submit"
                className="w-fit rounded-md bg-brand-action px-6 py-3 text-sm font-semibold text-white hover:bg-brand-action-hover sm:col-span-2"
              >
                Enviar la solicitud
              </button>
              {submitted && (
                <p className="text-sm text-muted sm:col-span-2">
                  Formulario listo a nivel de interfaz — falta conectar el envío real (pendiente de backend).
                </p>
              )}
            </form>
          </>
        )}
      </section>
    </>
  );
}
