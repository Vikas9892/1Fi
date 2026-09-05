import { PRODUCTS } from "./products.data";
import { Product, ProductFilterParams } from "./types";

export function getAllProducts(params?: ProductFilterParams): Product[] {
  let filtered = [...PRODUCTS];

  if (params?.brand && params.brand !== "All") {
    filtered = filtered.filter(
      (p) => p.brand.toLowerCase() === params.brand?.toLowerCase()
    );
  }

  if (params?.search && params.search.trim() !== "") {
    const query = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.variants.some((v) => v.color.toLowerCase().includes(query))
    );
  }

  if (params?.maxPrice) {
    filtered = filtered.filter((p) =>
      p.variants.some((v) => v.sellingPrice <= params.maxPrice!)
    );
  }

  return filtered;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getAllBrands(): string[] {
  const brands = new Set(PRODUCTS.map((p) => p.brand));
  return ["All", ...Array.from(brands)];
}
