import { Product } from "@/modules/catalog/types";
import { EmiPlan } from "@/modules/emi/types";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Client-side API abstraction service.
 * Decouples React UI components from direct HTTP transports and endpoints.
 */
export const apiClient = {
  /**
   * Fetch all products matching optional brand filter and search query
   */
  async getProducts(params?: {
    brand?: string;
    search?: string;
  }): Promise<Product[]> {
    const url = new URL("/api/products", window.location.origin);
    if (params?.brand && params.brand !== "All") {
      url.searchParams.set("brand", params.brand);
    }
    if (params?.search && params.search.trim()) {
      url.searchParams.set("search", params.search.trim());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch products: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data.products || [];
  },

  /**
   * Fetch a single product by its URL slug
   */
  async getProductBySlug(slug: string): Promise<Product> {
    const response = await fetch(`/api/products/${encodeURIComponent(slug)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError(`Product "${slug}" was not found`, 404);
      }
      throw new ApiError(
        `Failed to load product: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data.product;
  },

  /**
   * Fetch calculated EMI plans for a specific principal amount
   */
  async getEmiPlans(amount: number): Promise<EmiPlan[]> {
    const response = await fetch(
      `/api/emi-plans?amount=${encodeURIComponent(amount)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new ApiError(
        `Failed to calculate EMI plans: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data.plans || [];
  },
};
