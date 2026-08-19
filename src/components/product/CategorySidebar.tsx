import { Link } from "react-router-dom";
import categories from "../../data/categories.json";

export function CategorySidebar({ activeCategorySlug }: { activeCategorySlug: string }) {
  return (
    <aside className="w-full shrink-0 lg:w-64">
      <p className="mb-2 text-sm font-semibold text-ink">Tipo de producto</p>
      <nav className="space-y-1">
        {categories.map((c) => {
          const isActive = c.slug === activeCategorySlug;
          return (
            <Link
              key={c.id}
              to={`/productos/${c.slug}`}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-surface-subtle font-semibold text-brand-action"
                  : "text-muted hover:bg-surface-subtle hover:text-ink"
              }`}
            >
              {c.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
