import React from "react";
import Link from "next/link";
import { Product } from "@/modules/catalog/types";
import { formatINR } from "@/modules/emi/calculator";
import { getStartingEmi } from "@/modules/emi/plans";
import { ProductImage } from "@/components/common/ProductImage";
import { Sparkles, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Base variant for price display
  const baseVariant = product.variants[0];
  const { sellingPrice, mrp } = baseVariant;
  const discountPercent = Math.round(((mrp - sellingPrice) / mrp) * 100);

  // Dynamically calculate starting EMI using pure EMI module
  const startingEmi = getStartingEmi(sellingPrice);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-xs hover:border-[#712CDC]/50 hover:shadow-lg transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#712CDC]"
    >
      {/* 1. Image container & 2. Badge */}
      <div className="relative mb-3 flex h-40 w-full items-center justify-center rounded-xl bg-[#fafafa] p-3 overflow-hidden border border-zinc-100">
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-[#712CDC] px-2.5 py-0.5 text-[10.5px] font-bold text-white shadow-xs">
            {product.badge === "0% EMI" && (
              <Sparkles className="h-2.5 w-2.5 fill-current" />
            )}
            {product.badge}
          </span>
        )}

        <div className="relative h-32 w-32 transition-transform duration-300 group-hover:scale-105">
          <ProductImage
            src={product.thumbnail}
            alt={product.name}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
            priority={product.isPopular}
          />
        </div>
      </div>

      {/* Content wrapper with flex layout for uniform card heights */}
      <div className="flex flex-col flex-1 justify-between">
        {/* 3. Brand & 4. Product Name */}
        <div>
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-400">
            {product.brand}
          </span>
          <h3 className="h-10 text-sm font-semibold text-zinc-900 group-hover:text-[#712CDC] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* 5. Price, 6. MRP, 7. Discount */}
        <div className="mt-2 pt-2 border-t border-zinc-100/80">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base font-extrabold text-zinc-900">
              {formatINR(sellingPrice)}
            </span>
            {mrp > sellingPrice && (
              <span className="text-[11.5px] text-zinc-400 line-through font-medium">
                {formatINR(mrp)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[11px] font-bold text-emerald-600">
                {discountPercent}% off
              </span>
            )}
          </div>

          {/* 8. Starting EMI Pill */}
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#f8f5ff] border border-[#ece5ff] p-2 transition-colors group-hover:bg-[#f0e8ff]">
            <div>
              <span className="block text-xs font-bold text-[#712CDC]">
                From {formatINR(startingEmi.monthlyEmi)}/mo
              </span>
              <span className="block text-[10px] text-zinc-500 font-medium">
                {startingEmi.isZeroCost ? "0% No-Cost EMI" : "Easy Monthly EMI"}
              </span>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#712CDC] shadow-2xs group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
