import React from "react";
import { EmiPlan } from "@/modules/emi/types";
import { formatINR } from "@/modules/emi/calculator";
import { ArrowRight, Lock } from "lucide-react";

interface StickyCheckoutBarProps {
  selectedPlan: EmiPlan | null;
  isEligible: boolean;
  onProceed: () => void;
}

export function StickyCheckoutBar({
  selectedPlan,
  isEligible,
  onProceed,
}: StickyCheckoutBarProps) {
  if (!selectedPlan) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]"
      aria-label="Checkout action bar"
    >
      <div className="mx-auto flex max-w-[480px] items-center justify-between gap-3 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-3 shadow-[0_8px_30px_rgba(20,14,50,0.14)]">
        {/* Left: Selected EMI summary */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-[#712CDC]">
              {formatINR(selectedPlan.monthlyEmi)}
            </span>
            <span className="text-[11px] text-zinc-500 font-medium">
              /mo × {selectedPlan.tenureMonths}m
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-medium">
            Total: {formatINR(selectedPlan.totalPayable)}{" "}
            {selectedPlan.isZeroCost && "• 0% Interest"}
          </span>
        </div>

        {/* Right: Proceed CTA */}
        <button
          type="button"
          disabled={!isEligible}
          onClick={onProceed}
          className={`flex items-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all duration-200 cursor-pointer ${
            isEligible
              ? "bg-[#712CDC] text-white shadow-md shadow-[#712CDC]/25 hover:bg-[#5e24b7] active:scale-95"
              : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
          }`}
        >
          {isEligible ? (
            <>
              <span>Review EMI Plan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" />
              <span>Limit Exceeded</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
