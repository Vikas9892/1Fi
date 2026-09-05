import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ChartNoAxesCombined, Wallet, ArrowRight, ShieldCheck } from "lucide-react";
import { formatINR } from "@/modules/emi/calculator";
import { DEFAULT_MOCK_LIMIT } from "@/modules/affordability/limit";

export default function LimitPage() {
  return (
    <AppShell>
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ede8ff] text-[#712CDC] mb-4">
          <ChartNoAxesCombined className="h-8 w-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#712CDC]">
          Credit & Purchase Limit
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
          Available 1Fi Limit: {formatINR(DEFAULT_MOCK_LIMIT)}
        </h1>
        <p className="max-w-md text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
          Your purchase limit is calculated from your verified mutual fund holdings across CAMS and KFintech.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl bg-[#712CDC] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5e24b7] transition-all"
          >
            <Wallet className="h-4 w-4" />
            <span>Shop on 1Fi Marketplace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-1.5 text-xs text-zinc-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Lien marking without fund liquidation</span>
        </div>
      </main>
    </AppShell>
  );
}
