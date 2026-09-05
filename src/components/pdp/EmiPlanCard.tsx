import React from "react";
import { EmiPlan } from "@/modules/emi/types";
import { formatINR } from "@/modules/emi/calculator";
import { CheckCircle2, Sparkles } from "lucide-react";

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

export function EmiPlanCard({ plan, isSelected, onSelect }: EmiPlanCardProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(plan)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect(plan);
        }
      }}
      className={`relative flex flex-col rounded-2xl border p-3.5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-[#712CDC] bg-[#fbf9ff] shadow-sm ring-2 ring-[#712CDC]/20"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      }`}
    >
      {/* Top row: Tenure & Recommended badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
              isSelected
                ? "border-[#712CDC] bg-[#712CDC] text-white"
                : "border-zinc-300 bg-white"
            }`}
          >
            {isSelected && <CheckCircle2 className="h-3.5 w-3.5 fill-current" />}
          </div>
          <span className="text-sm font-bold text-zinc-900">
            {plan.tenureMonths} Months
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {plan.isZeroCost && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
              0% Interest
            </span>
          )}
          {plan.isRecommended && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#712CDC] text-white px-2 py-0.5 text-[10px] font-bold shadow-xs">
              <Sparkles className="h-2.5 w-2.5 fill-current" />
              Recommended
            </span>
          )}
        </div>
      </div>

      {/* Monthly Installment */}
      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="text-lg font-extrabold text-[#712CDC]">
            {formatINR(plan.monthlyEmi)}
          </span>
          <span className="text-xs text-zinc-500 font-medium"> / month</span>
        </div>

        {plan.cashback > 0 && (
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            +{formatINR(plan.cashback)} Cashback
          </span>
        )}
      </div>

      {/* Financial breakdown pills */}
      <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-zinc-50 p-2 text-center text-[10.5px]">
        <div>
          <span className="block text-zinc-400 font-medium">Rate p.a.</span>
          <span className="block font-bold text-zinc-800">
            {plan.annualInterestRate === 0 ? "0%" : `${plan.annualInterestRate}%`}
          </span>
        </div>
        <div>
          <span className="block text-zinc-400 font-medium">Interest</span>
          <span className="block font-bold text-zinc-800">
            {plan.totalInterest === 0 ? "₹0" : formatINR(plan.totalInterest)}
          </span>
        </div>
        <div>
          <span className="block text-zinc-400 font-medium">Total Cost</span>
          <span className="block font-bold text-zinc-800">
            {formatINR(plan.totalPayable)}
          </span>
        </div>
      </div>

      {/* Recommendation explanation note */}
      {plan.isRecommended && plan.recommendationReason && (
        <p className="mt-2 text-[10.5px] text-purple-700/90 font-medium">
          💡 {plan.recommendationReason}
        </p>
      )}
    </div>
  );
}
