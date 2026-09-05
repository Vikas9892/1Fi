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

  const isHomeActive = pathname === "/";
  const isShopActive = pathname.startsWith("/shop");
  const isDuesActive = pathname.startsWith("/emi-dues");
  const isLimitActive = pathname.startsWith("/limit");
  const isProfileActive = pathname.startsWith("/profile");

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: House,
      isActive: isHomeActive,
    },
    {
      label: "Shop",
      href: "/shop",
      icon: Store,
      isActive: isShopActive,
    },
    {
      label: "EMI Dues",
      href: "/emi-dues",
      icon: ReceiptIndianRupee,
      isActive: isDuesActive,
    },
    {
      label: "Limit",
      href: "/limit",
      icon: ChartNoAxesCombined,
      isActive: isLimitActive,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      isActive: isProfileActive,
    },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pointer-events-none md:hidden"
      aria-label="Bottom Navigation"
    >
      <div className="pointer-events-auto mx-auto flex max-w-[480px] items-stretch rounded-[26px] bg-white/95 backdrop-blur-md border border-zinc-200/80 px-1.5 py-1 shadow-[0_8px_28px_rgba(20,14,50,0.12)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-1.5 text-center transition-all ${
                item.isActive
                  ? "text-[#712CDC] font-bold"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.isActive && (
                <span
                  className="absolute left-1/2 -top-[2px] h-[3px] w-7 -translate-x-1/2 rounded-full bg-[#712CDC]"
                  aria-hidden="true"
                />
              )}
              <Icon
                className={`h-[20px] w-[20px] transition-transform group-active:scale-90 ${
                  item.isActive ? "drop-shadow-[0_0_8px_rgba(113,44,220,0.25)]" : ""
                }`}
              />
              <span className="truncate text-[10px] tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
