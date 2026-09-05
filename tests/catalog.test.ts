import { describe, it, expect } from "vitest";
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  getAllBrands,
} from "../src/modules/catalog/repository";
import { PRODUCTS } from "../src/modules/catalog/products.data";

describe("Catalog Repository & Variant Engine", () => {
  it("contains 7 high-quality smartphone models across 4 recognizable brands", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(6);
    expect(PRODUCTS.length).toBeLessThanOrEqual(8);

    const brands = getAllBrands();
    expect(brands).toContain("Apple");
    expect(brands).toContain("Samsung");
    expect(brands).toContain("Google");
    expect(brands).toContain("OnePlus");
  });

  it("ensures every product has valid variants, storage, colors, and prices", () => {
    PRODUCTS.forEach((product) => {
      expect(product.slug).toBeTruthy();
      expect(product.variants.length).toBeGreaterThan(0);
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.partnerLender).toBeTruthy();

      product.variants.forEach((v) => {
        expect(v.mrp).toBeGreaterThan(0);
        expect(v.sellingPrice).toBeGreaterThan(0);
        expect(v.mrp).toBeGreaterThanOrEqual(v.sellingPrice);
        expect(v.storage).toBeTruthy();
        expect(v.color).toBeTruthy();
        expect(v.colorHex.startsWith("#")).toBe(true);
      });
    });
  });

  it("filters products accurately by brand", () => {
    const applePhones = getAllProducts({ brand: "Apple" });
    expect(applePhones.length).toBeGreaterThan(0);
    applePhones.forEach((p) => expect(p.brand).toBe("Apple"));

    const samsungPhones = getAllProducts({ brand: "Samsung" });
    expect(samsungPhones.length).toBeGreaterThan(0);
    samsungPhones.forEach((p) => expect(p.brand).toBe("Samsung"));
  });

  it("filters products accurately by search keyword", () => {
    const searchResults = getAllProducts({ search: "Pixel" });
    expect(searchResults.length).toBe(2); // Pixel 9 Pro and Pixel 9
    searchResults.forEach((p) => expect(p.name).toContain("Pixel"));

    const titanSearchResults = getAllProducts({ search: "Titanium" });
    expect(titanSearchResults.length).toBeGreaterThan(0);
  });

  it("returns all products when brand is 'All' and search is empty", () => {
    const all = getAllProducts({ brand: "All", search: "" });
    expect(all.length).toBe(PRODUCTS.length);
  });

  it("retrieves product by slug correctly", () => {
    const phone = getProductBySlug("iphone-16-pro");
    expect(phone).toBeDefined();
    expect(phone?.name).toBe("Apple iPhone 16 Pro");
    expect(phone?.brand).toBe("Apple");
  });

  it("returns undefined for non-existent product slug", () => {
    const phone = getProductBySlug("non-existent-device-slug");
    expect(phone).toBeUndefined();
  });

  it("demonstrates variant price scaling (higher storage costs more)", () => {
    const phone = getProductBySlug("iphone-16-pro");
    expect(phone).toBeDefined();

    const v128 = phone?.variants.find((v) => v.storage === "128 GB");
    const v256 = phone?.variants.find((v) => v.storage === "256 GB");
    const v512 = phone?.variants.find((v) => v.storage === "512 GB");

    expect(v128).toBeDefined();
    expect(v256).toBeDefined();
    expect(v512).toBeDefined();

    expect(v256!.sellingPrice).toBeGreaterThan(v128!.sellingPrice);
    expect(v512!.sellingPrice).toBeGreaterThan(v256!.sellingPrice);
  });
});
