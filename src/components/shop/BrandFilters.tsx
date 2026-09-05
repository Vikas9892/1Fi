"use client";

import React from "react";

interface BrandFiltersProps {
  brands: string[];
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  className?: string;
}

export function BrandFilters({
  brands,
  selectedBrand,
  onSelectBrand,
  className = "",
}: BrandFiltersProps) {
  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 ${className}`}
      role="group"
      aria-label="Filter by brand"
    >
      {brands.map((brand) => {
        const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
        return (
          <button
            key={brand}
            type="button"
            onClick={() => onSelectBrand(brand)}
            aria-pressed={isSelected}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              isSelected
                ? "bg-[#712CDC] text-white shadow-xs"
                : "bg-white text-zinc-600 border border-zinc-200/90 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            {brand}
          </button>
        );
      })}
    </div>
  );
}
