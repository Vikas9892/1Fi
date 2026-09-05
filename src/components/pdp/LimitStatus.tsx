import React from "react";
import { AffordabilityEvaluation } from "@/modules/affordability/types";
import { formatINR } from "@/modules/emi/calculator";
import { ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

interface LimitStatusProps {
  evaluation: AffordabilityEvaluation;
  className?: string;
}

export function LimitStatus({ evaluation, className = "" }: LimitStatusProps) {
  const {
    availableLimit,
    purchaseAmount,
    isEligible,
    remainingLimit,
    shortfall,
    utilizationPercentage,
  } = evaluation;

  return (
    <div
      className={`rounded-2xl border p-4 transition-colors ${
        isEligible
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-amber-200 bg-amber-50/50"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {isEligible ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle className="h-4 w-4" />
            </div>
          )}

          <div>
            <h4
              className={`text-xs font-bold ${
                isEligible ? "text-emerald-900" : "text-amber-900"
              }`}
            >
              {isEligible
                ? "Eligible for Instant 0% EMI Pledge"
                : "Insufficient Available Limit"}
            </h4>
            <p className="text-[11px] text-zinc-600 mt-0.5">
              Available 1Fi Limit:{" "}
              <span className="font-bold text-zinc-800">
                {formatINR(availableLimit)}
              </span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-zinc-400 font-medium block">
            Purchase Amount
          </span>
          <span className="text-xs font-bold text-zinc-900 block">
            {formatINR(purchaseAmount)}
          </span>
        </div>
      </div>

      {/* Utilization bar */}
      <div className="mt-3">
        <div className="h-2 w-full rounded-full bg-zinc-200/80 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isEligible ? "bg-[#712CDC]" : "bg-amber-500"
            }`}
            style={{ width: `${Math.min(100, utilizationPercentage)}%` }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10.5px]">
          <span className="text-zinc-500 font-medium">
            Limit used: {utilizationPercentage}%
          </span>
          <span
            className={`font-bold ${
              isEligible ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {isEligible
              ? `Remaining limit: ${formatINR(remainingLimit)}`
              : `${formatINR(shortfall)} additional limit required`}
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center gap-1 text-[10.5px] text-zinc-500">
        <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
        <span>Collateral backed by mutual funds via CAMS / KFintech</span>
      </div>
    </div>
  );
}
