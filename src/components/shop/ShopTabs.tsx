"use client";

import React from "react";

export type ShopTabKey = "top-brands" | "nearby-stores" | "marketplace";

interface ShopTabsProps {
  activeTab: ShopTabKey;
  onTabChange: (tab: ShopTabKey) => void;
}

export function ShopTabs({ activeTab, onTabChange }: ShopTabsProps) {
  const tabs: { key: ShopTabKey; label: string; badge?: string }[] = [
    { key: "top-brands", label: "Top Brands" },
    { key: "nearby-stores", label: "Nearby Stores" },
    { key: "marketplace", label: "1Fi Marketplace", badge: "Active" },
  ];

  return (
    <div
      className="flex gap-1 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
      role="tablist"
      aria-label="Shop categories"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${tab.key}`}
            id={`tab-${tab.key}`}
            onClick={() => onTabChange(tab.key)}
            className={`relative flex-1 rounded-full py-2 text-center text-[12.5px] font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-1">
              {tab.label}
              {tab.badge && !isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#712CDC]" />
              )}
            </span>
            {isActive && (
              <span
                className="absolute bottom-1 left-1/2 h-[2.5px] w-[20px] -translate-x-1/2 rounded-full bg-[#712CDC]"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
