import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { productsRepository } from "../repositories/productsRepository";
import { Hero } from "../components/layout/Hero";
import { CategorySidebar } from "../components/product/CategorySidebar";
import { ProductFilterBar } from "../components/product/ProductFilterBar";
import { ProductGrid } from "../components/product/ProductGrid";
import type { ProductFilters as Filters } from "../types";
import { NotFoundPage } from "./NotFoundPage";

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? productsRepository.getCategoryBySlug(categorySlug) : undefined;

  const [filters, setFilters] = useState<Filters>({ categorySlug: categorySlug ?? "" });

  // Reset brand/subtype filters whenever the user switches category from the sidebar.
  useEffect(() => {
    setFilters({ categorySlug: categorySlug ?? "" });
  }, [categorySlug]);

  const products = useMemo(
    () => (category ? productsRepository.getProducts(filters) : []),
    [category, filters],
  );

  if (!category) return <NotFoundPage />;

  return (
    <>
      <Hero eyebrow="Catálogo" title={category.name} />
      <section className="mx-auto max-w-7xl gap-8 px-4 py-12 lg:flex lg:px-8">
        <CategorySidebar activeCategorySlug={category.slug} />
        <div className="flex-1">
          <ProductFilterBar category={category} filters={filters} onChange={setFilters} />
          <p className="mb-4 text-sm text-muted">
            {products.length} producto{products.length !== 1 ? "s" : ""}
          </p>
          <ProductGrid products={products} categorySlug={category.slug} />
        </div>
      </section>
    </>
  );
}
