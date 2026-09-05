import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Smartphone, ArrowRight, Store } from "lucide-react";

export default function NotFound() {
  return (
    <AppShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-12">
        <div className="h-16 w-16 rounded-2xl bg-purple-50 text-[#712CDC] flex items-center justify-center mb-4 shadow-sm border border-purple-100">
          <Smartphone className="h-8 w-8 text-[#712CDC]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#712CDC]">
          404 Not Found
        </span>
        <h1 className="text-2xl font-extrabold text-zinc-900 mt-1">
          Product Not Found
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-md leading-relaxed">
          The smartphone you are looking for does not exist or may have been removed from the 1Fi Marketplace catalog.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl bg-[#712CDC] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5e24b7] transition-all"
          >
            <Store className="h-4 w-4" />
            <span>Return to Marketplace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-zinc-200 px-5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-all"
          >
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
