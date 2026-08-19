const columns = [
  {
    title: "Reparaciones de emergencia",
    text: "4419-3915",
    href: "tel:+50644193915",
  },
  {
    title: "Obtenga su cotización",
    text: "Ver nuestros productos",
    href: "/productos/motores-para-portones",
  },
  {
    title: "Hablemos por WhatsApp",
    text: "+506 8584-2773",
    href: "https://api.whatsapp.com/send?phone=50685842773&text=Info%20WEB",
  },
];

export function ThreeColumnStrip() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-2 sm:grid-cols-3 lg:px-8">
        {columns.map((col) => (
          <a
            key={col.title}
            href={col.href}
            className="rounded-md px-3 py-2 text-center transition-colors hover:bg-white/5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-action">
              {col.title}
            </p>
            <p className="mt-0.5 text-sm font-medium">{col.text}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
