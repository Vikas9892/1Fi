import React from "react";
import { Wallet, Info } from "lucide-react";
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
  return (
    <div
      className={`rounded-2xl border border-purple-100 bg-[#fbf9ff] p-3.5 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ede8ff] text-[#712CDC]">
            <Wallet className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-zinc-500">
                Mock Available 1Fi Limit
              </span>
              <span
                title="Simulated purchase limit based on pledged mutual fund valuation"
                className="cursor-help"
              >
                <Info className="h-3 w-3 text-zinc-400" />
              </span>
            </div>
            <p className="text-sm font-bold text-zinc-900 leading-tight">
              {formatINR(availableLimit)}
            </p>
          </div>
        </div>

        {/* Quick limit simulator toggles for assessment reviewers */}
        <div className="flex items-center gap-1">
          {PRESET_MOCK_LIMITS.map((preset) => {
            const isSelected = availableLimit === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => onLimitChange(preset.value)}
                className={`rounded-lg px-2 py-1 text-[10.5px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#712CDC] text-white shadow-xs"
                    : "bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-50"
                }`}
              >
                {preset.value === 50000 ? "₹50K" : preset.value === 100000 ? "₹1L" : "₹1.75L"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
