import type { Category, ProductFilters as Filters } from "../../types";
import { productsRepository } from "../../repositories/productsRepository";

interface ProductFilterBarProps {
  category: Category;
  filters: Filters;
  onChange: (filters: Filters) => void;
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-brand-action bg-brand-action text-white"
          : "border-border text-muted hover:border-brand-action hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function ProductFilterBar({ category, filters, onChange }: ProductFilterBarProps) {
  const brands = productsRepository.getBrands();
  const hasFilters = category.brandFacet || (category.subtypeFacet && category.subtypeFacet.length > 0);

  if (!hasFilters) return null;

  return (
    <div className="mb-6 space-y-3 border-b border-border pb-6">
      {category.brandFacet && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-ink">Marca:</span>
          <FilterPill active={!filters.brandSlug} onClick={() => onChange({ ...filters, brandSlug: undefined })}>
            Todas
          </FilterPill>
          {brands.map((b) => (
            <FilterPill
              key={b.id}
              active={filters.brandSlug === b.slug}
              onClick={() => onChange({ ...filters, brandSlug: b.slug })}
            >
              {b.name}
            </FilterPill>
          ))}
        </div>
      )}

      {category.subtypeFacet && category.subtypeFacet.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-ink">Subtipo:</span>
          <FilterPill active={!filters.subtype} onClick={() => onChange({ ...filters, subtype: undefined })}>
            Todos
          </FilterPill>
          {category.subtypeFacet.map((s) => (
            <FilterPill key={s} active={filters.subtype === s} onClick={() => onChange({ ...filters, subtype: s })}>
              {s}
            </FilterPill>
          ))}
        </div>
      )}
    </div>
  );
}
