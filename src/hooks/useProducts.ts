"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/modules/catalog/types";
import { apiClient } from "@/services/api";

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  selectedBrand: string;
  searchQuery: string;
  setSelectedBrand: (brand: string) => void;
  setSearchQuery: (query: string) => void;
  refetch: () => Promise<void>;
}

export function useProducts(initialBrand = "All"): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.getProducts({
        brand: selectedBrand,
        search: searchQuery,
      });
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load products. Please retry."
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedBrand, searchQuery]);

  useEffect(() => {
    // Debounce search slightly for optimal UX
    const timer = setTimeout(() => {
      loadProducts();
    }, 150);

    return () => clearTimeout(timer);
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    selectedBrand,
    searchQuery,
    setSelectedBrand,
    setSearchQuery,
    refetch: loadProducts,
  };
}
