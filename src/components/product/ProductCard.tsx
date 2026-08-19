import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { productsRepository } from "../../repositories/productsRepository";
import { useQuoteCart } from "../../context/QuoteCartContext";

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const { addItem } = useQuoteCart();
  const brand = product.brandId
    ? productsRepository.getBrands().find((b) => b.id === product.brandId)
    : undefined;

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/productos/${categorySlug}/${product.slug}`} className="block">
        <div className="flex aspect-square items-center justify-center bg-surface-subtle text-sm text-muted">
          {product.images[0] ? (
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            "Imagen pendiente"
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {brand && (
          <span className="w-fit rounded-full bg-surface-subtle px-2 py-0.5 text-xs font-semibold text-muted">
            {brand.name}
          </span>
        )}
        <Link
          to={`/productos/${categorySlug}/${product.slug}`}
          className="text-sm font-semibold text-ink hover:text-brand-action"
        >
          {product.name}
        </Link>
        <button
          onClick={() => addItem(product)}
          className="mt-auto rounded-md bg-brand-action px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-action-hover"
        >
          Cotizar
        </button>
      </div>
    </div>
  );
}
