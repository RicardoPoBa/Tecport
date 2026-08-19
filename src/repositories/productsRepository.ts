import categoriesData from "../data/categories.json";
import brandsData from "../data/brands.json";
import productsData from "../data/products.json";
import type { Brand, Category, Product, ProductFilters } from "../types";

const categories = categoriesData as Category[];
const brands = brandsData as Brand[];
const products = productsData as Product[];

/**
 * Capa de acceso a datos del catálogo. Hoy lee JSON estático; el día que exista
 * un backend/CRUD real, solo esta implementación cambia (por fetch a una API) —
 * los componentes de la SPA siguen llamando a las mismas funciones.
 */
export const productsRepository = {
  getCategories(): Category[] {
    return categories;
  },

  getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((c) => c.slug === slug);
  },

  getBrands(): Brand[] {
    return brands;
  },

  getBrandBySlug(slug: string): Brand | undefined {
    return brands.find((b) => b.slug === slug);
  },

  getProducts(filters: ProductFilters): Product[] {
    const category = this.getCategoryBySlug(filters.categorySlug);
    if (!category) return [];

    return products.filter((p) => {
      if (p.categoryId !== category.id) return false;
      if (filters.brandSlug) {
        const brand = this.getBrandBySlug(filters.brandSlug);
        if (!brand || p.brandId !== brand.id) return false;
      }
      if (filters.subtype && p.subtype !== filters.subtype) return false;
      return true;
    });
  },

  getProductBySlug(categorySlug: string, productSlug: string): Product | undefined {
    const category = this.getCategoryBySlug(categorySlug);
    if (!category) return undefined;
    return products.find((p) => p.categoryId === category.id && p.slug === productSlug);
  },

  getRelatedProducts(product: Product, limit = 4): Product[] {
    return products
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, limit);
  },
};
