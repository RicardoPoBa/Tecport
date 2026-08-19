export interface Brand {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  brandFacet: boolean;
  subtypeFacet?: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  categoryId: string;
  brandId?: string;
  subtype?: string;
  shortDescription?: string;
  description?: string;
  specs?: ProductSpec[];
  images: string[];
  status: "active" | "discontinued";
  featured?: boolean;
}

export interface ProductFilters {
  categorySlug: string;
  brandSlug?: string;
  subtype?: string;
}

export interface ServiceLandingFeature {
  icon: string;
  title: string;
  text: string;
}

export interface ServiceLanding {
  slug: string;
  navLabel: string;
  title: string;
  features: ServiceLandingFeature[];
  body: string[];
  images: string[];
  thumbnail?: string;
  relatedCategorySlug?: string;
}
