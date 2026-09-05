export type BrandName = "Apple" | "Samsung" | "Google" | "OnePlus";

export interface ProductVariant {
  id: string;
  storage: string; // e.g., "128 GB", "256 GB", "512 GB"
  color: string; // e.g., "Natural Titanium", "Desert Titanium"
  colorHex: string; // e.g., "#9A958D"
  mrp: number; // Maximum Retail Price
  sellingPrice: number; // Discounted selling price
  cashback: number; // Price after cashback deduction
  inStock: boolean;
}

export interface ProductSpecs {
  display: string;
  processor: string;
  camera: string;
  battery: string;
  os: string;
  warranty: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: BrandName;
  tagline: string;
  description: string;
  badge?: "0% EMI" | "Bestseller" | "New Launch" | "Trending";
  isNew?: boolean;
  isPopular?: boolean;
  images: string[];
  thumbnail: string;
  variants: ProductVariant[];
  specs: ProductSpecs;
  keyFeatures: string[];
  partnerLender: string; // e.g. "Tata Capital", "DSP Finance", "Bajaj Finserv"
}

export interface ProductFilterParams {
  brand?: string;
  search?: string;
  maxPrice?: number;
}
