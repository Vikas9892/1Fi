import React from "react";
import { Sparkles, ShieldCheck, TrendingUp } from "lucide-react";

export function ShopBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#712CDC] via-[#8534f5] to-[#5017a8] text-white p-4 sm:p-6 shadow-md shadow-[#712CDC]/15">
      {/* Background ambient lighting */}
      <div className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-purple-300/20 blur-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md border border-white/25">
            <Sparkles className="h-3 w-3 text-amber-300 fill-amber-300" />
            <span>0% No-Cost EMIs backed by Mutual Funds</span>
          </div>

          <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight leading-tight">
            Shop smartphones with your Mutual Funds
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            Pledge mutual funds seamlessly via CAMS / KFintech. Keep your wealth compounding while paying in easy EMIs.
          </p>
        </div>

        {/* Quick trust metrics */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold text-white/95 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/15">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span>0% Interest</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
            <TrendingUp className="h-4 w-4 text-purple-200" />
            <span>Zero Downpayment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
