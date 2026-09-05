"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import {
  ShieldCheck,
  Building2,
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  showDesktopNav?: boolean;
}

export function AppShell({
  children,
  className = "",
  showDesktopNav = true,
}: AppShellProps) {
  const pathname = usePathname();
  const isShopActive = pathname.startsWith("/shop");

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col selection:bg-[#712CDC]/15 selection:text-[#712CDC]">
      {/* Desktop Responsive Top Navigation (Hidden on Mobile, Visible on md+) */}
      {showDesktopNav && (
        <header className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-2xs">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#712CDC] to-[#5017a8] flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-[#712CDC]/25 group-hover:scale-105 transition-transform">
                  1Fi
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight text-zinc-900 leading-none">
                    1Fi
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">
                    Mutual Fund Backed EMIs
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="flex items-center gap-1 ml-4" aria-label="Main Desktop Navigation">
                <Link
                  href="/"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    pathname === "/" && !isShopActive
                      ? "bg-purple-50 text-[#712CDC]"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/shop"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    isShopActive
                      ? "bg-[#712CDC] text-white shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                  }`}
                >
                  <span>Shop</span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
                      isShopActive
                        ? "bg-white/20 text-white"
                        : "bg-purple-100 text-[#712CDC]"
                    }`}
                  >
                    Marketplace
                  </span>
                </Link>

                <Link
                  href="/emi-dues"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    pathname.startsWith("/emi-dues")
                      ? "bg-purple-50 text-[#712CDC]"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                  }`}
                >
                  EMI Dues
                </Link>

                <Link
                  href="/limit"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    pathname.startsWith("/limit")
                      ? "bg-purple-50 text-[#712CDC]"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                  }`}
                >
                  Limit
                </Link>

                <Link
                  href="/profile"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    pathname.startsWith("/profile")
                      ? "bg-purple-50 text-[#712CDC]"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                  }`}
                >
                  Profile
                </Link>
              </nav>
            </div>

            {/* Right trust indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-medium bg-zinc-50 border border-zinc-200/80 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="h-4 w-4 text-[#712CDC]" />
                <span>0% No-Cost EMI via CAMS / KFintech</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Responsive Content Container */}
      <div className={`flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ${className}`}>
        {children}
      </div>

      {/* Desktop Footer (Hidden on Mobile) */}
      <footer className="hidden md:block border-t border-zinc-200/80 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#712CDC]" />
            <span>
              1Fi Checkout Platform • Credit facilitated by RBI-registered NBFC partners
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Zero Foreclosure Charges</span>
            <span>•</span>
            <span>No Downpayment</span>
            <span>•</span>
            <span>SEBI-registered RTAs</span>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Bottom Navigation (Only visible on mobile screens < md) */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
