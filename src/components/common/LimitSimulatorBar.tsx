"use client";

import React, { useState } from "react";
import { Wallet, SlidersHorizontal, Check, Info } from "lucide-react";
import { formatINR } from "@/modules/emi/calculator";
import { PRESET_MOCK_LIMITS } from "@/modules/affordability/limit";

interface LimitSimulatorBarProps {
  availableLimit: number;
  onLimitChange: (limit: number) => void;
  className?: string;
}

export function LimitSimulatorBar({
  availableLimit,
  onLimitChange,
  className = "",
}: LimitSimulatorBarProps) {
  const [showTester, setShowTester] = useState(false);

  return (
    <div
      className={`rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-2xs transition-all ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Real 1Fi Fintech Presentation */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f0ff] text-[#712CDC] shrink-0 border border-[#ece5ff]">
            <Wallet className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11.5px] font-medium text-zinc-500">
                Available Purchase Limit
              </span>
              <span
                className="inline-flex items-center text-[10px] text-[#712CDC] bg-purple-50 px-1.5 py-0.2 rounded-md font-semibold cursor-help"
                title="Limit calculated from mutual funds pledged via CAMS/KFintech"
              >
                Instant 0% EMI
              </span>
            </div>
            <p className="text-base font-extrabold text-zinc-900 leading-tight">
              {formatINR(availableLimit)}
            </p>
          </div>
        </div>

        {/* Right: Subtle Assessment Evaluator Testing Affordance */}
        <button
          type="button"
          onClick={() => setShowTester(!showTester)}
          aria-expanded={showTester}
          className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            showTester
              ? "bg-[#712CDC] text-white shadow-xs"
              : "bg-zinc-50 text-zinc-600 border border-zinc-200/80 hover:bg-zinc-100/80 hover:text-zinc-900"
          }`}
        >
          <SlidersHorizontal className="h-3 w-3" />
          <span className="text-[11px]">{showTester ? "Close" : "Test Limit"}</span>
        </button>
      </div>

      {/* Expanded Assessment Controls (Secondary & Non-Intrusive) */}
      {showTester && (
        <div className="mt-3 pt-3 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <Info className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span>Assessor Test Mode: Toggle limit to test eligible vs shortfall states</span>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {PRESET_MOCK_LIMITS.map((preset) => {
              const isSelected = availableLimit === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => onLimitChange(preset.value)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-purple-100 text-[#712CDC] ring-1 ring-[#712CDC]/30 font-bold"
                      : "bg-zinc-100/70 text-zinc-600 hover:bg-zinc-200/70"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 text-[#712CDC]" />}
                  <span>
                    {preset.value === 50000
                      ? "₹50K (Shortfall)"
                      : preset.value === 100000
                      ? "₹1L (Default)"
                      : "₹1.75L (High)"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
