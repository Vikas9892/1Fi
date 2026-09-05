"use client";

import React from "react";
import { EmiPlan } from "@/modules/emi/types";
import { EmiPlanCard } from "./EmiPlanCard";
import { Calculator } from "lucide-react";

interface EmiPlanSelectorProps {
  plans: EmiPlan[];
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
}

export function EmiPlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
}: EmiPlanSelectorProps) {
  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Calculator className="h-4 w-4 text-[#712CDC]" />
          <h3 className="text-sm font-bold text-zinc-900">
            Select EMI Tenure
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-[#712CDC] bg-purple-50 px-2 py-0.5 rounded-full">
          Backed by Mutual Funds
        </span>
      </div>

      <div
        className="flex flex-col gap-2.5"
        role="radiogroup"
        aria-label="Available EMI plans"
      >
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </div>
  );
}
