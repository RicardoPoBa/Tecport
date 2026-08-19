import type { Product } from "../../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  categorySlug: string;
}

export function ProductGrid({ products, categorySlug }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted">
        No hay productos que coincidan con los filtros seleccionados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} categorySlug={categorySlug} />
      ))}
    </div>
  );
}
