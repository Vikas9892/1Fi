"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Product, ProductVariant } from "@/modules/catalog/types";
import { EmiPlan } from "@/modules/emi/types";
import { generateEmiPlans } from "@/modules/emi/plans";
import { apiClient } from "@/services/api";

interface UseProductDetailResult {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  selectedVariant: ProductVariant | null;
  selectedStorage: string;
  selectedColor: string;
  emiPlans: EmiPlan[];
  selectedEmiPlan: EmiPlan | null;
  availableStorages: string[];
  availableColors: { name: string; hex: string }[];
  setSelectedStorage: (storage: string) => void;
  setSelectedColor: (color: string) => void;
  setSelectedEmiPlan: (plan: EmiPlan) => void;
  refetch: () => Promise<void>;
}

export function useProductDetail(
  slug: string,
  initialProduct?: Product | null
): UseProductDetailResult {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialProduct);
  const [error, setError] = useState<string | null>(null);

  const [selectedStorage, setSelectedStorage] = useState<string>(
    initialProduct?.variants[0]?.storage || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    initialProduct?.variants[0]?.color || ""
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  const loadProduct = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.getProductBySlug(slug);
      setProduct(data);
      if (data.variants.length > 0) {
        const initialVariant = data.variants[0];
        setSelectedStorage(initialVariant.storage);
        setSelectedColor(initialVariant.color);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load product details."
      );
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (initialProduct) return;

    let isMounted = true;
    apiClient
      .getProductBySlug(slug)
      .then((data) => {
        if (!isMounted) return;
        setProduct(data);
        if (data.variants.length > 0) {
          setSelectedStorage(data.variants[0].storage);
          setSelectedColor(data.variants[0].color);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Unable to load product details."
        );
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug, initialProduct]);

  // Extract distinct storages
  const availableStorages = useMemo(() => {
    if (!product) return [];
    const storages = new Set(product.variants.map((v) => v.storage));
    return Array.from(storages);
  }, [product]);

  // Extract distinct colors with hex codes
  const availableColors = useMemo(() => {
    if (!product) return [];
    const colorMap = new Map<string, string>();
    product.variants.forEach((v) => {
      if (!colorMap.has(v.color)) {
        colorMap.set(v.color, v.colorHex);
      }
    });
    return Array.from(colorMap.entries()).map(([name, hex]) => ({
      name,
      hex,
    }));
  }, [product]);

  // Find exact matching variant, or fallback to first available with matching storage
  const selectedVariant: ProductVariant | null = useMemo(() => {
    if (!product || product.variants.length === 0) return null;

    const exactMatch = product.variants.find(
      (v) => v.storage === selectedStorage && v.color === selectedColor
    );
    if (exactMatch) return exactMatch;

    const storageMatch = product.variants.find(
      (v) => v.storage === selectedStorage
    );
    if (storageMatch) return storageMatch;

    return product.variants[0];
  }, [product, selectedStorage, selectedColor]);

  // Dynamically compute EMI plans based on active selling price
  const emiPlans: EmiPlan[] = useMemo(() => {
    if (!selectedVariant) return [];
    return generateEmiPlans(selectedVariant.sellingPrice);
  }, [selectedVariant]);

  // Set default selected EMI plan to recommended plan if none selected or on price change
  const selectedEmiPlan: EmiPlan | null = useMemo(() => {
    if (emiPlans.length === 0) return null;
    const current = emiPlans.find((p) => p.id === selectedPlanId);
    if (current) return current;

    const recommended = emiPlans.find((p) => p.isRecommended);
    return recommended || emiPlans[0];
  }, [emiPlans, selectedPlanId]);

  const handleSelectEmiPlan = useCallback((plan: EmiPlan) => {
    setSelectedPlanId(plan.id);
  }, []);

  return {
    product,
    isLoading,
    error,
    selectedVariant,
    selectedStorage,
    selectedColor,
    emiPlans,
    selectedEmiPlan,
    availableStorages,
    availableColors,
    setSelectedStorage,
    setSelectedColor,
    setSelectedEmiPlan: handleSelectEmiPlan,
    refetch: loadProduct,
  };
}
