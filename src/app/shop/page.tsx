"use client";

import React, { useState } from "react";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ShopBanner } from "@/components/shop/ShopBanner";
import { ShopTabs, ShopTabKey } from "@/components/shop/ShopTabs";
import { TopBrandsTab } from "@/components/shop/TopBrandsTab";
import { NearbyStoresTab } from "@/components/shop/NearbyStoresTab";
import { MarketplaceHome } from "@/components/shop/MarketplaceHome";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTabKey>("marketplace");

  return (
    <MobileContainer>
      <main className="flex flex-1 flex-col gap-4 px-4 py-4 pb-28">
        {/* 1Fi Shop Hero Banner */}
        <ShopBanner />

        {/* Existing Shop Tabs (Top Brands, Nearby Stores, 1Fi Marketplace) */}
        <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Panels */}
        {activeTab === "top-brands" && (
          <TopBrandsTab onGoToMarketplace={() => setActiveTab("marketplace")} />
        )}

        {activeTab === "nearby-stores" && (
          <NearbyStoresTab onGoToMarketplace={() => setActiveTab("marketplace")} />
        )}

        {activeTab === "marketplace" && <MarketplaceHome />}
      </main>

      {/* Floating 1Fi Bottom Navigation */}
      <MobileNav />
    </MobileContainer>
  );
}
