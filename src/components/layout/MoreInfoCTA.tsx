export function MoreInfoCTA() {
  return (
    <section className="bg-brand-action text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center lg:px-8">
        <h2 className="text-2xl font-bold lg:text-3xl">¿Necesita más información?</h2>
        <p className="mt-2 text-white/90">
          Escríbanos y un asesor le ayudará a encontrar la solución adecuada.
        </p>
        <a
          href="mailto:info@tecportcr.com"
          className="mt-6 inline-block rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Solicitar información
        </a>
      </div>
    </section>
  );
}
