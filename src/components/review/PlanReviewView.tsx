"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/modules/catalog/types";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { ProductImage } from "@/components/common/ProductImage";
import { PledgeNextStepModal } from "@/components/review/PledgeNextStepModal";
import { ErrorState } from "@/components/common/ErrorState";
import { useProductDetail } from "@/hooks/useProductDetail";
import { evaluateAffordability, DEFAULT_MOCK_LIMIT } from "@/modules/affordability/limit";
import { generateEmiPlans } from "@/modules/emi/plans";
import { formatINR } from "@/modules/emi/calculator";
import {
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Wallet,
  ArrowRight,
  Sparkles,
  Building2,
  Lock,
  Edit2,
} from "lucide-react";

interface PlanReviewViewProps {
  slug: string;
  initialProduct?: Product | null;
}

export function PlanReviewView({ slug, initialProduct }: PlanReviewViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const variantId = searchParams.get("variantId");
  const planId = searchParams.get("planId");
  const limitParam = searchParams.get("limit");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { product, isLoading, error } = useProductDetail(slug, initialProduct);

  const availableLimit = limitParam ? parseFloat(limitParam) : DEFAULT_MOCK_LIMIT;

  // Selected variant from query param or first variant
  const selectedVariant = useMemo(() => {
    if (!product) return null;
    if (variantId) {
      const found = product.variants.find((v) => v.id === variantId);
      if (found) return found;
    }
    return product.variants[0];
  }, [product, variantId]);

  // Selected plan from query param
  const { selectedPlan, evaluation } = useMemo(() => {
    if (!selectedVariant) {
      return { selectedPlan: null, evaluation: null };
    }

    const plans = generateEmiPlans(selectedVariant.sellingPrice);
    const plan = planId ? plans.find((p) => p.id === planId) || plans[0] : plans[0];
    const evalResult = evaluateAffordability(selectedVariant.sellingPrice, availableLimit);

    return { selectedPlan: plan, evaluation: evalResult };
  }, [selectedVariant, planId, availableLimit]);

  if (isLoading) {
    return (
      <MobileContainer>
        <div className="flex flex-col gap-4 p-4 animate-pulse">
          <div className="h-8 w-24 rounded-lg bg-zinc-200" />
          <div className="h-40 w-full rounded-2xl bg-zinc-100" />
          <div className="h-48 w-full rounded-2xl bg-zinc-100" />
        </div>
      </MobileContainer>
    );
  }

  if (error || !product || !selectedVariant || !selectedPlan || !evaluation) {
    return (
      <MobileContainer>
        <div className="p-4 pt-10">
          <ErrorState
            title="Plan Review Unavailable"
            message={error || "Could not retrieve order details."}
          />
          <div className="mt-4 text-center">
            <Link
              href={`/shop/${slug}`}
              className="text-xs font-semibold text-[#712CDC] underline"
            >
              Back to Product
            </Link>
          </div>
        </div>
      </MobileContainer>
    );
  }

  const { mrp, sellingPrice, cashback, storage, color } = selectedVariant;
  const savings = mrp - sellingPrice;

  return (
    <MobileContainer>
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-3 py-2.5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-xs font-bold text-zinc-800">Plan Review & Confirmation</span>
        <Link
          href={`/shop/${slug}`}
          className="text-xs font-semibold text-[#712CDC] hover:underline flex items-center gap-1"
          title="Edit Selection"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Edit</span>
        </Link>
      </header>

      {/* Main Review Body */}
      <main className="py-4 pb-32 lg:pb-12">
        {/* Step progress indicator */}
        <div className="flex items-center justify-center gap-3 px-2 pb-5 text-[11.5px] font-semibold text-zinc-400">
          <span className="text-[#712CDC]">1. Product & Variant</span>
          <span className="h-0.5 w-6 sm:w-10 bg-[#712CDC]" />
          <span className="text-[#712CDC] font-bold">2. Plan Review</span>
          <span className="h-0.5 w-6 sm:w-10 bg-zinc-200" />
          <span>3. MF Pledge</span>
        </div>

        {/* Responsive Two-Column Grid on Desktop */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left Column: Product Info, Price Summary, & Partner Disclosure */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* 1. Device & Variant Card */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
                <span className="text-xs font-bold text-zinc-900">Selected Device</span>
                <Link
                  href={`/shop/${slug}`}
                  className="text-xs font-semibold text-[#712CDC] hover:underline flex items-center gap-1"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Change Variant</span>
                </Link>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="relative h-20 w-20 rounded-xl bg-zinc-50 border border-zinc-100 p-2 shrink-0">
                  <ProductImage
                    src={product.thumbnail}
                    alt={product.name}
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#712CDC]">
                    {product.brand}
                  </span>
                  <h2 className="text-sm font-bold text-zinc-900 truncate">
                    {product.name}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">
                      {storage}
                    </span>
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 flex items-center gap-1">
                      <span
                        className="h-2 w-2 rounded-full border border-black/10"
                        style={{ backgroundColor: selectedVariant.colorHex }}
                      />
                      {color}
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs font-bold text-zinc-900">
                    {formatINR(sellingPrice)}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Financial & Price Summary */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-1.5 pb-3 border-b border-zinc-100 text-xs font-bold text-zinc-900">
                <Receipt className="h-4 w-4 text-[#712CDC]" />
                <span>Price Summary</span>
              </div>

              <div className="mt-3 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Maximum Retail Price (MRP)</span>
                  <span className="line-through text-zinc-400">{formatINR(mrp)}</span>
                </div>

                <div className="flex items-center justify-between text-emerald-600 font-medium">
                  <span>Upfront Discount</span>
                  <span>- {formatINR(savings)}</span>
                </div>

                <div className="flex items-center justify-between font-bold text-zinc-900 pt-1">
                  <span>Purchase Amount (Principal)</span>
                  <span>{formatINR(sellingPrice)}</span>
                </div>

                {cashback > 0 && (
                  <div className="flex items-center justify-between text-purple-700 font-medium bg-purple-50/60 p-2.5 rounded-xl">
                    <span>Promotional Cashback</span>
                    <span className="font-bold">+ {formatINR(cashback)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 5. Regulated Partner Disclosure */}
            <div className="flex items-start gap-2 rounded-xl bg-zinc-50 p-3.5 text-[11px] text-zinc-500 border border-zinc-200/60">
              <Building2 className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
              <p>
                Credit facility facilitated by RBI-registered NBFC partner:{" "}
                <strong className="text-zinc-700">{product.partnerLender}</strong>. 1Fi provides
                point-of-sale integration and mutual fund pledge lien management.
              </p>
            </div>
          </div>

          {/* Right Column: Selected EMI Schedule, Affordability, & Desktop Action */}
          <div className="lg:col-span-6 flex flex-col gap-4 mt-4 lg:mt-0">
            {/* 3. Selected EMI Plan Details */}
            <div className="rounded-2xl border border-purple-100 bg-[#fbf9ff] p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
                  <Sparkles className="h-4 w-4 text-[#712CDC]" />
                  <span>Selected EMI Schedule</span>
                </div>
                {selectedPlan.isZeroCost && (
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10.5px] font-bold">
                    0% No-Cost EMI
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600">Selected Tenure</span>
                  <span className="font-bold text-zinc-900">
                    {selectedPlan.tenureMonths} Months
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-600">Monthly EMI Installment</span>
                  <span className="text-base font-extrabold text-[#712CDC]">
                    {formatINR(selectedPlan.monthlyEmi)} / mo
                  </span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Annual Interest Rate</span>
                  <span className="font-semibold text-zinc-800">
                    {selectedPlan.annualInterestRate === 0
                      ? "0% p.a. (No Cost)"
                      : `${selectedPlan.annualInterestRate}% p.a.`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Total Interest Over Tenure</span>
                  <span className="font-semibold text-zinc-800">
                    {selectedPlan.totalInterest === 0
                      ? "₹0"
                      : formatINR(selectedPlan.totalInterest)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Processing Fee</span>
                  <span className="font-semibold text-zinc-800">
                    {selectedPlan.processingFee === 0
                      ? "₹0 (Waived)"
                      : formatINR(selectedPlan.processingFee)}
                  </span>
                </div>

                <div className="mt-1 pt-2 border-t border-purple-100 flex items-center justify-between text-xs font-bold text-purple-950">
                  <span>Total Payable Amount</span>
                  <span className="text-sm font-extrabold text-zinc-900">
                    {formatINR(selectedPlan.totalPayable)}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Mutual Fund Collateral & Limit Deduction */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-1.5 pb-3 border-b border-zinc-100 text-xs font-bold text-zinc-900">
                <Wallet className="h-4 w-4 text-[#712CDC]" />
                <span>Affordability & Limit Status</span>
              </div>

              <div className="mt-3 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Available 1Fi Limit</span>
                  <span className="font-bold text-zinc-900">
                    {formatINR(evaluation.availableLimit)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Purchase Amount</span>
                  <span className="font-bold text-[#712CDC]">
                    {formatINR(evaluation.purchaseAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between font-bold pt-1 border-t border-zinc-100">
                  <span>Remaining Limit After Purchase</span>
                  <span
                    className={
                      evaluation.isEligible ? "text-emerald-700" : "text-amber-700"
                    }
                  >
                    {formatINR(evaluation.remainingLimit)}
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-zinc-50 p-2.5 flex items-center gap-2 text-[11px] text-zinc-600">
                {evaluation.isEligible ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                )}
                <span>{evaluation.statusMessage}</span>
              </div>
            </div>

            {/* Desktop Direct Confirmation Box (Visible on lg+) */}
            <div className="hidden lg:flex flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[11px] text-zinc-500 font-medium">
                    Monthly Installment
                  </span>
                  <span className="text-xl font-extrabold text-[#712CDC]">
                    {formatINR(selectedPlan.monthlyEmi)} / month
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!evaluation.isEligible}
                  onClick={() => setIsModalOpen(true)}
                  className={`flex items-center gap-2 rounded-xl py-3 px-6 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    evaluation.isEligible
                      ? "bg-[#712CDC] text-white shadow-md shadow-[#712CDC]/25 hover:bg-[#5e24b7] active:scale-95"
                      : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  {evaluation.isEligible ? (
                    <>
                      <span>Continue to Pledge</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Limit Exceeded</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[10.5px] text-zinc-400 text-center">
                🔒 Stage 3: Digital lien marking of mutual fund units via CAMS/KFintech
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar (Hidden on lg+) */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-[480px] items-center justify-between gap-3 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-3 shadow-[0_8px_30px_rgba(20,14,50,0.14)]">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 font-medium">
              Monthly Installment
            </span>
            <span className="text-base font-extrabold text-[#712CDC]">
              {formatINR(selectedPlan.monthlyEmi)} / mo
            </span>
          </div>

          <button
            type="button"
            disabled={!evaluation.isEligible}
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 rounded-xl py-3 px-5 text-xs font-bold transition-all duration-200 cursor-pointer ${
              evaluation.isEligible
                ? "bg-[#712CDC] text-white shadow-md shadow-[#712CDC]/25 hover:bg-[#5e24b7] active:scale-95"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            <span>Continue to Pledge</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Mock Pledge Modal */}
      <PledgeNextStepModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        monthlyEmi={selectedPlan.monthlyEmi}
        tenureMonths={selectedPlan.tenureMonths}
        partnerLender={product.partnerLender}
      />
    </MobileContainer>
  );
}
