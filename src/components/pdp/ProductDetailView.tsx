"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/modules/catalog/types";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { VariantSelector } from "@/components/pdp/VariantSelector";
import { EmiPlanSelector } from "@/components/pdp/EmiPlanSelector";
import { LimitStatus } from "@/components/pdp/LimitStatus";
import { ProductSpecs } from "@/components/pdp/ProductSpecs";
import { TrustMessaging } from "@/components/pdp/TrustMessaging";
import { StickyCheckoutBar } from "@/components/pdp/StickyCheckoutBar";
import { LimitSimulatorBar } from "@/components/common/LimitSimulatorBar";
import { ErrorState } from "@/components/common/ErrorState";
import { useProductDetail } from "@/hooks/useProductDetail";
import { evaluateAffordability, DEFAULT_MOCK_LIMIT } from "@/modules/affordability/limit";
import { formatINR } from "@/modules/emi/calculator";
import { ChevronLeft, Share2, Tag } from "lucide-react";

interface ProductDetailViewProps {
  slug: string;
  initialProduct?: Product | null;
}

export function ProductDetailView({
  slug,
  initialProduct,
}: ProductDetailViewProps) {
  const router = useRouter();

  const {
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
    setSelectedEmiPlan,
    refetch,
  } = useProductDetail(slug, initialProduct);

  const [availableLimit, setAvailableLimit] = useState<number>(DEFAULT_MOCK_LIMIT);

  if (isLoading) {
    return (
      <MobileContainer>
        <div className="flex flex-col gap-4 p-4 animate-pulse">
          <div className="h-8 w-24 rounded-lg bg-zinc-200" />
          <div className="h-72 w-full rounded-2xl bg-zinc-100" />
          <div className="h-6 w-3/4 rounded bg-zinc-200" />
          <div className="h-8 w-1/3 rounded bg-zinc-200" />
          <div className="h-32 w-full rounded-2xl bg-zinc-100" />
        </div>
      </MobileContainer>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <MobileContainer>
        <div className="p-4 pt-10">
          <ErrorState
            title="Product Not Found"
            message={error || "We could not find the smartphone you requested."}
            onRetry={refetch}
          />
          <div className="mt-4 text-center">
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#712CDC] underline"
            >
              Return to 1Fi Marketplace
            </Link>
          </div>
        </div>
      </MobileContainer>
    );
  }

  const { mrp, sellingPrice, cashback } = selectedVariant;
  const discountAmount = mrp - sellingPrice;
  const discountPercent = Math.round((discountAmount / mrp) * 100);
  const priceAfterCashback = sellingPrice - cashback;

  // Real-time affordability evaluation for the currently selected variant
  const evaluation = evaluateAffordability(sellingPrice, availableLimit);

  const handleProceedToReview = () => {
    if (!selectedEmiPlan || !evaluation.isEligible) return;

    const searchParams = new URLSearchParams({
      variantId: selectedVariant.id,
      planId: selectedEmiPlan.id,
      limit: String(availableLimit),
    });

    router.push(`/shop/${slug}/review?${searchParams.toString()}`);
  };

  return (
    <MobileContainer>
      {/* Header bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-3 py-2.5 backdrop-blur-md">
        <Link
          href="/shop"
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors"
          aria-label="Back to Marketplace"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="max-w-[200px] truncate text-xs font-bold text-zinc-800">
          {product.name}
        </span>
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: product.name, url: window.location.href });
            }
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Share product"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </header>

      {/* Main scrollable body */}
      <main className="flex flex-col gap-4 px-4 py-3 pb-32">
        {/* Image gallery */}
        <ProductGallery
          images={product.images}
          productName={product.name}
          badge={product.badge}
        />

        {/* Title, Brand, Tagline */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#712CDC]">
            {product.brand}
          </span>
          <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight leading-snug">
            {product.name}
          </h1>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Pricing Card with 1Fi pattern */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-zinc-900">
              {formatINR(sellingPrice)}
            </span>
            {mrp > sellingPrice && (
              <span className="text-sm text-zinc-400 line-through font-medium">
                {formatINR(mrp)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Price after cashback highlight */}
          {cashback > 0 && (
            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-purple-50/70 border border-purple-100 px-3 py-2 text-xs">
              <div className="flex items-center gap-1.5 text-purple-900 font-semibold">
                <Tag className="h-3.5 w-3.5 text-[#712CDC]" />
                <span>Effective Price after Cashback:</span>
              </div>
              <span className="font-extrabold text-[#712CDC]">
                {formatINR(priceAfterCashback)}
              </span>
            </div>
          )}
        </div>

        {/* Variant Selectors (Functional Storage & Color switches) */}
        <VariantSelector
          availableStorages={availableStorages}
          selectedStorage={selectedStorage}
          onSelectStorage={setSelectedStorage}
          availableColors={availableColors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        {/* Mock Limit Simulator Bar */}
        <LimitSimulatorBar
          availableLimit={availableLimit}
          onLimitChange={setAvailableLimit}
        />

        {/* Dynamic Affordability & Limit Status */}
        <LimitStatus evaluation={evaluation} />

        {/* EMI Plan Selector (3, 6, 12, 24 months) */}
        <EmiPlanSelector
          plans={emiPlans}
          selectedPlan={selectedEmiPlan}
          onSelectPlan={setSelectedEmiPlan}
        />

        {/* Trust Messaging & Partner Distinction */}
        <TrustMessaging partnerLender={product.partnerLender} />

        {/* Specifications & Highlights */}
        <ProductSpecs specs={product.specs} keyFeatures={product.keyFeatures} />
      </main>

      {/* Sticky Mobile Checkout Bar */}
      <StickyCheckoutBar
        selectedPlan={selectedEmiPlan}
        isEligible={evaluation.isEligible}
        onProceed={handleProceedToReview}
      />
    </MobileContainer>
  );
}
