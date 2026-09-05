"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Store,
  ReceiptIndianRupee,
  ChartNoAxesCombined,
  User,
} from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const isShopActive = pathname.startsWith("/shop");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pointer-events-none"
      aria-label="Bottom Navigation"
    >
      <div className="pointer-events-auto mx-auto flex max-w-[480px] items-stretch rounded-[26px] bg-white/95 backdrop-blur-md border border-zinc-200/80 px-1.5 py-1 shadow-[0_8px_28px_rgba(20,14,50,0.12)]">
        {/* Home */}
        <Link
          href="/"
          className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-1.5 text-center transition-all ${
            pathname === "/" && !isShopActive
              ? "text-[#712CDC]"
              : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          <House className="h-[20px] w-[20px] transition-transform group-active:scale-90" />
          <span className="truncate text-[10px] font-medium tracking-wide">
            Home
          </span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-1.5 text-center transition-all ${
            isShopActive
              ? "text-[#712CDC] font-semibold"
              : "text-zinc-400 hover:text-zinc-600"
          }`}
          aria-current={isShopActive ? "page" : undefined}
        >
          {isShopActive && (
            <span
              className="absolute left-1/2 -top-[2px] h-[3px] w-7 -translate-x-1/2 rounded-full bg-[#712CDC]"
              aria-hidden="true"
            />
          )}
          <Store className="h-[20px] w-[20px] transition-transform group-active:scale-90 drop-shadow-[0_0_8px_rgba(113,44,220,0.25)]" />
          <span className="truncate text-[10px] tracking-wide">Shop</span>
        </Link>

        {/* EMI Dues */}
        <div
          role="button"
          tabIndex={0}
          title="EMI Dues (Coming Soon)"
          className="group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-1.5 text-center text-zinc-400 opacity-60 cursor-not-allowed"
        >
          <ReceiptIndianRupee className="h-[20px] w-[20px]" />
          <span className="truncate text-[10px] font-medium tracking-wide">
            EMI Dues
          </span>
        </div>

        {/* Limit */}
        <div
          role="button"
          tabIndex={0}
          title="Limit / Pledged Funds (Coming Soon)"
          className="group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-1.5 text-center text-zinc-400 opacity-60 cursor-not-allowed"
        >
          <ChartNoAxesCombined className="h-[20px] w-[20px]" />
          <span className="truncate text-[10px] font-medium tracking-wide">
            Limit
          </span>
        </div>

        {/* Profile */}
        <div
          role="button"
          tabIndex={0}
          title="Profile (Coming Soon)"
          className="group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-1.5 text-center text-zinc-400 opacity-60 cursor-not-allowed"
        >
          <User className="h-[20px] w-[20px]" />
          <span className="truncate text-[10px] font-medium tracking-wide">
            Profile
          </span>
        </div>
      </div>
    </nav>
  );
}
