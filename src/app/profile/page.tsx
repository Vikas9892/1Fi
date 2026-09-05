import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { User, ShieldCheck, ArrowRight, Phone, Mail } from "lucide-react";

export default function ProfilePage() {
  return (
    <AppShell>
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ede8ff] text-[#712CDC] mb-4">
          <User className="h-8 w-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#712CDC]">
          User Profile
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
          1Fi Verified Investor
        </h1>
        <p className="max-w-md text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
          KYC & PAN Status: <strong className="text-emerald-700 font-semibold">Verified via DigiLocker</strong>
        </p>

        <div className="mt-4 flex flex-col gap-2 w-full max-w-sm text-left bg-white p-4 rounded-2xl border border-zinc-200/80 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-zinc-100">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> Mobile
            </span>
            <span className="font-semibold text-zinc-800">+91 98920 •••••</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email
            </span>
            <span className="font-semibold text-zinc-800">vikas••••@gmail.com</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl bg-[#712CDC] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5e24b7] transition-all"
          >
            <span>Return to 1Fi Marketplace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-1.5 text-xs text-zinc-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Secured with 256-bit bank grade encryption</span>
        </div>
      </main>
    </AppShell>
  );
}
