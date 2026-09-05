import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/modules/catalog/types";
import { formatINR } from "@/modules/emi/calculator";
import { getStartingEmi } from "@/modules/emi/plans";
import { Sparkles } from "lucide-react";

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
      className="group flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-xs hover:border-[#712CDC]/40 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
    >
      {/* Image container & badge */}
      <div className="relative mb-2.5 flex h-36 w-full items-center justify-center rounded-xl bg-[#fafafa] p-2 overflow-hidden">
        {product.badge && (
          <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-[#712CDC] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
            {product.badge === "0% EMI" && (
              <Sparkles className="h-2.5 w-2.5 fill-current" />
            )}
            {product.badge}
          </span>
        )}

        <div className="relative h-28 w-28 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 500px) 150px, 200px"
            className="object-contain"
            priority={product.isPopular}
          />
        </div>
      </div>

      {/* Brand & title */}
      <div className="flex flex-col flex-1">
        <span className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
          {product.brand}
        </span>
        <h3 className="line-clamp-1 text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-[#712CDC] transition-colors">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-zinc-900">
            {formatINR(sellingPrice)}
          </span>
          {mrp > sellingPrice && (
            <span className="text-[11px] text-zinc-400 line-through">
              {formatINR(mrp)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] font-bold text-emerald-600">
              {discountPercent}% off
            </span>
          )}
        </div>

        {/* EMI Starting badge */}
        <div className="mt-2.5 rounded-lg bg-[#f5f0ff] border border-[#ece5ff] px-2 py-1.5 text-center">
          <span className="block text-[11px] font-bold text-[#712CDC]">
            From {formatINR(startingEmi.monthlyEmi)}/mo
          </span>
          <span className="block text-[9.5px] text-zinc-500 font-medium">
            {startingEmi.isZeroCost ? "0% No-Cost EMI" : "Easy Monthly EMI"}
          </span>
        </div>
      </div>
    </Link>
  );
}
