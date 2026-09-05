"use client";

import React, { useState } from "react";
import { ProductImage } from "@/components/common/ProductImage";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
}

export function ProductGallery({
  images,
  productName,
  badge,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image viewer */}
      <div className="relative flex h-80 sm:h-96 w-full items-center justify-center rounded-2xl bg-[#fafafa] p-6 border border-zinc-100 overflow-hidden">
        {badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#712CDC] px-3 py-1 text-xs font-bold text-white shadow-xs">
            {badge}
          </span>
        )}

        <div className="relative h-64 w-64 sm:h-80 sm:w-80 transition-all duration-300">
          <ProductImage
            src={activeImage}
            alt={`${productName} view ${selectedIndex + 1}`}
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 450px"
            priority={true}
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar py-1"
          role="tablist"
          aria-label="Product thumbnail images"
        >
          {images.map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedIndex(idx)}
                className={`relative h-16 w-16 rounded-xl border p-1.5 transition-all bg-white cursor-pointer ${
                  isSelected
                    ? "border-[#712CDC] ring-2 ring-[#712CDC]/25 shadow-xs"
                    : "border-zinc-200 opacity-70 hover:opacity-100"
                }`}
              >
                <ProductImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  sizes="64px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
