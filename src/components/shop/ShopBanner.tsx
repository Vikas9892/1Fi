import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck } from "lucide-react";

export function ShopBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#712CDC] via-[#8534f5] to-[#5017a8] text-white p-5 shadow-lg shadow-[#712CDC]/15">
      {/* Background ambient lighting */}
      <div className="absolute -right-8 -bottom-10 h-44 w-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-purple-300/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md border border-white/25">
          <Sparkles className="h-3 w-3 text-amber-300 fill-amber-300" />
          <span>Mutual Fund Backed EMIs</span>
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight leading-snug">
            Shop today, Pay later <br />
            <span className="text-purple-200 font-medium">
              using Mutual Funds.
            </span>
          </h1>
          <p className="mt-1 text-xs text-purple-100/90 leading-relaxed">
            Keep your investments growing while enjoying 0% No-Cost EMI on top smartphones.
          </p>
        </div>

        <div className="mt-1 flex items-center gap-4 text-[11px] text-white/90 font-medium pt-1 border-t border-white/15">
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span>0% Interest</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span>Zero Downpayment</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span>CAMS / KFintech</span>
          </div>
        </div>
      </div>
    </div>
  );
}
