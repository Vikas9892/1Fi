import React from "react";

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col rounded-2xl border border-zinc-100 bg-white p-3 shadow-xs animate-pulse"
        >
          {/* Image skeleton */}
          <div className="h-32 w-full rounded-xl bg-zinc-100 mb-3" />

          {/* Brand & title */}
          <div className="h-3 w-12 rounded bg-zinc-100 mb-1.5" />
          <div className="h-4 w-3/4 rounded bg-zinc-200 mb-2" />

          {/* Pricing */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="h-4 w-14 rounded bg-zinc-200" />
            <div className="h-3 w-10 rounded bg-zinc-100" />
          </div>

          {/* EMI pill */}
          <div className="h-6 w-full rounded-lg bg-[#f5f0ff] mt-auto" />
        </div>
      ))}
    </div>
  );
}
