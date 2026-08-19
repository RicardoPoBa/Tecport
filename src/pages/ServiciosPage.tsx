import { Hero } from "../components/layout/Hero";

export function ServiciosPage() {
  return (
    <>
      <Hero eyebrow="Post-venta" title="Servicios" />
      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <h2 className="text-xl font-bold text-ink">Mantenimiento y reparación</h2>
        <p className="mt-2 text-muted">
          El mantenimiento preventivo es clave para prolongar la vida útil de su equipo. Ofrecemos
          planes de revisión cada 6 y 12 meses.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-ink">Ventajas del mantenimiento preventivo</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Mayor confiabilidad del sistema.</li>
              <li>Disminución de tiempo muerto por fallas.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Reparaciones</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Atendemos portones de otras marcas.</li>
              <li>Contamos con stock de repuestos.</li>
              <li>Podés solicitar una cotización sin costo.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
