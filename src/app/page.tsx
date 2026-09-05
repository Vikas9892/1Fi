import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import {
  Sparkles,
  TrendingUp,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Building2,
  Store,
} from "lucide-react";
import { formatINR } from "@/modules/emi/calculator";
import { DEFAULT_MOCK_LIMIT } from "@/modules/affordability/limit";

export default function HomePage() {
  return (
    <AppShell>
      <main className="flex flex-col gap-6 pb-24 md:pb-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#712CDC] via-[#8534f5] to-[#5017a8] text-white p-6 sm:p-10 shadow-xl shadow-[#712CDC]/15">
          <div className="relative z-10 max-w-2xl flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/25">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              <span>India&apos;s 1st LAMF Affordability Platform</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Shop today, Pay later <br />
              <span className="text-purple-200">using your Mutual Funds.</span>
            </h1>

            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-xl">
              Buy what you love without selling your investments. Your mutual funds remain invested and continue earning compounding market returns.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#712CDC] shadow-md hover:bg-purple-50 transition-all active:scale-95"
              >
                <Store className="h-4 w-4" />
                <span>Explore 1Fi Marketplace</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio & Limit Summary Card */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mutual Fund Portfolio Value */}
          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Mutual Fund Portfolio
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-zinc-900">
                {formatINR(450000)}
              </span>
              <p className="text-xs text-zinc-500 mt-1">
                Connected via CAMS & KFintech • Compounding at ~12% p.a.
              </p>
            </div>
          </div>

          {/* Available Purchase Limit */}
          <div className="rounded-2xl border border-purple-100 bg-[#fbf9ff] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
                Available Purchase Limit
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ede8ff] text-[#712CDC]">
                <Wallet className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-[#712CDC]">
                {formatINR(DEFAULT_MOCK_LIMIT)}
              </span>
              <p className="text-xs text-zinc-500 mt-1">
                Instant 0% No-Cost EMI eligibility on Marketplace purchases
              </p>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-[#712CDC] flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">0% No-Cost EMI</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Convert smartphones and electronics into zero-cost monthly installments with no hidden charges.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-[#712CDC] flex items-center justify-center mb-3">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Keep Your Returns</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Pledged units continue compounding and generating dividend returns throughout the loan tenure.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-[#712CDC] flex items-center justify-center mb-3">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Regulated NBFC Partners</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Financed by leading institutional lending partners including Tata Capital and Bajaj Finserv.
            </p>
          </div>
        </section>

        {/* Call to action card */}
        <section className="rounded-2xl border border-zinc-200/90 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              Ready to shop with your mutual funds?
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Explore Apple, Samsung, Google, and OnePlus devices on 1Fi Marketplace.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl bg-[#712CDC] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5e24b7] transition-all shrink-0"
          >
            <span>Open Shop Page</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </main>
    </AppShell>
  );
}
