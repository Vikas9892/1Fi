import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ReceiptIndianRupee, ArrowRight, ShieldCheck } from "lucide-react";

export default function EmiDuesPage() {
  return (
    <AppShell>
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ede8ff] text-[#712CDC] mb-4">
          <ReceiptIndianRupee className="h-8 w-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#712CDC]">
          EMI Management
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
          No Active EMI Dues
        </h1>
        <p className="max-w-md text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
          Once you complete a purchase on 1Fi Marketplace, your repayment schedule and auto-debit mandates will appear here.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl bg-[#712CDC] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5e24b7] transition-all"
          >
            <span>Explore 1Fi Marketplace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-1.5 text-xs text-zinc-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Automated zero-cost NACH auto-debit supported</span>
        </div>
      </main>
    </AppShell>
  );
}
