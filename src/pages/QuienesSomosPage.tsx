import { Hero } from "../components/layout/Hero";

const values = ["Comunicación", "Servicio", "Responsabilidad", "Honestidad", "Respeto", "Compromiso"];

const pillars = [
  {
    title: "Misión",
    text: "Brindar soluciones de automatización y seguridad confiables, con garantía por escrito, para inmobiliarias, constructoras y condominios.",
  },
  {
    title: "Visión",
    text: "Ser la empresa de referencia en automatización de portones y seguridad perimetral en Costa Rica.",
  },
  {
    title: "Valores",
    text: values.join(" · "),
  },
];

export function QuienesSomosPage() {
  return (
    <>
      <Hero eyebrow="Nosotros" title="Quiénes Somos" />
      <section className="mx-auto max-w-4xl px-4 py-12 text-center lg:px-8">
        <p className="text-muted">
          Desde 2019 somos proveedores de soluciones de automatización y seguridad para inmobiliarias y
          constructoras, ofreciendo garantía por escrito en cada proyecto que realizamos.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-lg border border-border p-6">
              <h2 className="mb-2 text-lg font-bold text-ink">{p.title}</h2>
              <p className="text-sm text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
