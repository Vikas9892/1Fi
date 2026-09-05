"use client";

import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { getAllBrands } from "@/modules/catalog/repository";
import { SearchBar } from "./SearchBar";
import { BrandFilters } from "./BrandFilters";
import { ProductCard } from "./ProductCard";
import { ProductSkeletonGrid } from "./ProductSkeleton";
import { EmptyState } from "../common/EmptyState";
import { ErrorState } from "../common/ErrorState";
import { LimitSimulatorBar } from "../common/LimitSimulatorBar";
import { DEFAULT_MOCK_LIMIT } from "@/modules/affordability/limit";
import { Product } from "@/modules/catalog/types";
import { Smartphone } from "lucide-react";

interface MarketplaceHomeProps {
  initialProducts?: Product[];
}

export function MarketplaceHome({ initialProducts = [] }: MarketplaceHomeProps) {
  const brands = getAllBrands();
  const {
    products,
    isLoading,
    error,
    selectedBrand,
    searchQuery,
    setSelectedBrand,
    setSearchQuery,
    refetch,
  } = useProducts(initialProducts);

  const [simulatedLimit, setSimulatedLimit] = useState<number>(DEFAULT_MOCK_LIMIT);

  const handleClearFilters = () => {
    setSelectedBrand("All");
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Search Input */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search iPhone, Galaxy, Pixel, OnePlus..."
      />

      {/* Brand Filters */}
      <BrandFilters
        brands={brands}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
      />

      {/* Mock Available Limit Quick Bar */}
      <LimitSimulatorBar
        availableLimit={simulatedLimit}
        onLimitChange={setSimulatedLimit}
      />

      {/* Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <Smartphone className="h-4 w-4 text-[#712CDC]" />
          <h2 className="text-sm font-bold text-zinc-900">
            {selectedBrand === "All" ? "Featured Smartphones" : `${selectedBrand} Smartphones`}
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-medium">
          {isLoading ? "Loading..." : `${products.length} devices`}
        </span>
      </div>

      {/* Content States */}
      {isLoading ? (
        <ProductSkeletonGrid count={6} />
      ) : error ? (
        <ErrorState
          title="Catalog unavailable"
          message={error}
          onRetry={refetch}
        />
      ) : products.length === 0 ? (
        <EmptyState
          title="No devices found"
          message={`No smartphones found for "${searchQuery || selectedBrand}". Try clearing your filters.`}
          onAction={handleClearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
