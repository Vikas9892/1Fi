import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

interface BlankTabProps {
  onGoToMarketplace?: () => void;
}

export function NearbyStoresTab({ onGoToMarketplace }: BlankTabProps) {
  return (
    <div
      role="tabpanel"
      id="tab-panel-nearby-stores"
      aria-labelledby="tab-nearby-stores"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center my-4"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
        <MapPin className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-zinc-900">
        Nearby Stores
      </h3>
      <p className="mt-1 max-w-[32ch] text-xs text-zinc-500 leading-relaxed">
        Offline retail store locator and point-of-sale QR pledge checkout is currently in rollout.
      </p>

      {onGoToMarketplace && (
        <button
          type="button"
          onClick={onGoToMarketplace}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#712CDC] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#5e24b7] transition-colors cursor-pointer"
        >
          Explore 1Fi Marketplace
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
