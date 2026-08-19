import { Link, useParams } from "react-router-dom";
import { productsRepository } from "../repositories/productsRepository";
import { useQuoteCart } from "../context/QuoteCartContext";
import { ProductGrid } from "../components/product/ProductGrid";
import { NotFoundPage } from "./NotFoundPage";
import { withBase } from "../lib/assetUrl";

export function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams<{ categorySlug: string; productSlug: string }>();
  const { addItem } = useQuoteCart();

  const category = categorySlug ? productsRepository.getCategoryBySlug(categorySlug) : undefined;
  const product =
    categorySlug && productSlug
      ? productsRepository.getProductBySlug(categorySlug, productSlug)
      : undefined;

  if (!category || !product) return <NotFoundPage />;

  const brand = product.brandId
    ? productsRepository.getBrands().find((b) => b.id === product.brandId)
    : undefined;
  const related = productsRepository.getRelatedProducts(product);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <nav className="mb-6 text-sm text-muted">
        <Link to={`/productos/${category.slug}`} className="hover:text-brand-action">
          {category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-surface-subtle text-sm text-muted">
          {product.images[0] ? (
            <img src={withBase(product.images[0])} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            "Imagen pendiente"
          )}
        </div>

        <div>
          {brand && (
            <span className="mb-2 inline-block rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-muted">
              {brand.name}
            </span>
          )}
          <h1 className="text-3xl font-bold text-ink">{product.name}</h1>
          <p className="mt-1 text-sm text-muted">SKU: {product.sku}</p>

          {product.description && <p className="mt-4 text-muted">{product.description}</p>}

          {product.specs && product.specs.length > 0 && (
            <table className="mt-6 w-full text-sm">
              <tbody>
                {product.specs.map((s) => (
                  <tr key={s.label} className="border-b border-border">
                    <td className="py-2 font-semibold text-ink">{s.label}</td>
                    <td className="py-2 text-muted">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button
            onClick={() => addItem(product)}
            className="mt-6 rounded-md bg-brand-action px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-action-hover"
          >
            Añadir a la cotización
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-ink">Productos relacionados</h2>
          <ProductGrid products={related} categorySlug={category.slug} />
        </div>
      )}
    </section>
  );
}
