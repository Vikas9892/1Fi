"use client";

import React, { useState } from "react";
import Image from "next/image";

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
      <div className="relative flex h-72 w-full items-center justify-center rounded-2xl bg-[#fafafa] p-4 border border-zinc-100 overflow-hidden">
        {badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#712CDC] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
            {badge}
          </span>
        )}

        <div className="relative h-56 w-56 transition-all duration-300">
          <Image
            src={activeImage}
            alt={`${productName} view ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 500px) 300px, 400px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1"
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
                className={`relative h-14 w-14 rounded-xl border p-1 transition-all bg-white cursor-pointer ${
                  isSelected
                    ? "border-[#712CDC] ring-2 ring-[#712CDC]/20 shadow-xs"
                    : "border-zinc-200 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
