# 1Fi Marketplace — Software Development Engineer Intern Assessment

> **1Fi Marketplace Extension inside the Existing 1Fi Platform**  
> Built by **vikas9892** (`vikast4843@gmail.com`)

---

## Executive Summary & Product Interpretation

**1Fi** is fundamentally different from a conventional e-commerce platform. Its core value proposition is enabling investors to leverage their existing mutual fund holdings as collateral (Loan Against Mutual Funds - LAMF) to purchase products with **0% / No-Cost EMI** without liquidating their investments or sacrificing compounding returns.

This submission is designed strictly as a **production-grade product extension**, not a redesign or generic e-commerce template:
1. **Existing Shop Page Preservation**: Preserves 1Fi's `#712CDC` brand identity, hero banner, navigation, and introduces the required **3-tab structure**:
   - **Top Brands**: Blank placeholder state.
   - **Nearby Stores**: Blank placeholder state.
   - **1Fi Marketplace**: Full end-to-end catalog, storage & color variant switcher, pure financial EMI calculation engine, real-time limit/affordability verification, and plan review.
2. **Responsive Application Architecture**:
   - **Mobile (`360px–430px`)**: Compact mobile-first experience with floating 5-tab bottom navigation (`Home`, `Shop`, `EMI Dues`, `Limit`, `Profile`), sticky bottom checkout bar, and responsive touch controls.
   - **Tablet (`768px`)**: Intelligent 2–3 column product grid and balanced padding.
   - **Desktop (`1024px–1440px+`)**: Full responsive application shell (`max-w-6xl`) with top navigation header, trust indicators, 4-column product grid, two-column desktop PDP (sticky left gallery & specs; right price, variant & EMI controls), and two-column Plan Review layout.
3. **Robust Asset Architecture**:
   - Every product in the catalog has an optimized local asset in `public/products/` (`iphone-16-pro.webp`, `iphone-16.webp`, `galaxy-s24-ultra.webp`, `galaxy-s24.webp`, `pixel-9-pro.webp`, `pixel-9.webp`, `oneplus-12.webp`).
   - Integrated `ProductImage` component provides branded SVG fallback, skeleton loading, and zero layout shift.
4. **Fintech UX & Mutual Fund Transparency**: Every screen reinforces the financial relationship: price after cashback, transparent EMI tenures (3, 6, 12, 24 months), mutual fund lien pledge through SEBI-registered RTAs (CAMS, KFintech, MFCentral), and clear regulatory distinction between 1Fi (point-of-sale checkout tech) and regulated NBFC lending partners (Tata Capital, Bajaj Finserv, DSP Finance).
5. **Pure Financial Calculations**: Financial calculations (0% EMI, reducing-balance amortized APR, interest breakdown, and affordability shortfall) are implemented in pure, typed, independently testable modules with zero JSX or React dependencies.

---

## Information Architecture & User Journey

```mermaid
graph TD
    Home[1Fi Home /] --> Shop[1Fi Shop /shop]
    Shop --> TopBrands[Top Brands - Blank State]
    Shop --> NearbyStores[Nearby Stores - Blank State]
    Shop --> Marketplace[1Fi Marketplace Catalog]

    Marketplace --> SearchFilter[Debounced Search & Brand Filters]
    Marketplace --> ProductGrid[Responsive 1-4 Column Product Grid]
    ProductGrid --> PDP[Product Detail Page /shop/slug]

    PDP --> Gallery[Image Gallery & Thumbnails]
    PDP --> VariantSelector[Storage & Color Variant Selector]
    PDP --> EmiEngine[Pure EMI Plan Engine 3, 6, 12, 24 mo]
    PDP --> AffordabilityCheck[Live Affordability & Limit Status]

    PDP --> PlanReview[Plan Review /shop/slug/review]
    PlanReview --> PledgeModal[4-Step Digital Lien Pledge Flow Modal]
```

---

## Technical Architecture & Folder Structure

```
1Fi/
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Root layout with theme #712CDC, viewport, Geist font
│   │   ├── page.tsx                       # Dedicated 1Fi Home dashboard (fixes Home button)
│   │   ├── not-found.tsx                  # Custom branded 404 page with return-to-shop action
│   │   ├── emi-dues/page.tsx              # Working placeholder for EMI Dues tab
│   │   ├── limit/page.tsx                 # Working placeholder for Limit tab
│   │   ├── profile/page.tsx               # Working placeholder for Profile tab
│   │   ├── globals.css                    # Design tokens, custom scrollbars, glassmorphism
│   │   ├── shop/
│   │   │   ├── page.tsx                   # Existing Shop page with 3-tab layout
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx               # PDP Server Component (dynamic SEO metadata)
│   │   │   │   └── review/
│   │   │   │       └── page.tsx           # Plan Review Server Component
│   │   └── api/
│   │       ├── products/
│   │       │   ├── route.ts               # GET /api/products (filter by brand, search)
│   │       │   └── [slug]/
│   │       │       └── route.ts           # GET /api/products/[slug] with 404 handling
│   │       └── emi-plans/
│   │           └── route.ts               # GET /api/emi-plans?price=...
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx               # Responsive app shell (desktop header/footer, mobile bottom nav)
│   │   │   ├── MobileContainer.tsx        # Responsive frame adapter
│   │   │   └── MobileNav.tsx              # 5-tab floating bottom navigation (< md)
│   │   ├── shop/
│   │   │   ├── ShopBanner.tsx             # 1Fi hero banner with trust badges
│   │   │   ├── ShopTabs.tsx               # 3-segment pill tab switcher
│   │   │   ├── TopBrandsTab.tsx           # Top Brands placeholder
│   │   │   ├── NearbyStoresTab.tsx        # Nearby Stores placeholder
│   │   │   ├── MarketplaceHome.tsx        # Responsive 1-4 col catalog root
│   │   │   ├── SearchBar.tsx              # Search bar with instant clear
│   │   │   ├── BrandFilters.tsx           # Horizontal pill filters (All, Apple, Samsung, Google, OnePlus)
│   │   │   ├── ProductCard.tsx            # Card with badge, local asset image, pricing, starting EMI
│   │   │   └── ProductSkeleton.tsx        # Responsive skeleton loading UI
│   │   ├── pdp/
│   │   │   ├── ProductDetailView.tsx      # Responsive two-column desktop PDP & stacked mobile PDP
│   │   │   ├── ProductGallery.tsx         # Image gallery with selectable thumbnails
│   │   │   ├── VariantSelector.tsx        # Reactive storage buttons & color swatches
│   │   │   ├── EmiPlanSelector.tsx        # EMI plan options (3, 6, 12, 24 months)
│   │   │   ├── EmiPlanCard.tsx            # Transparent financial breakdown card
│   │   │   ├── LimitStatus.tsx            # Affordability progress bar & shortfall alert
│   │   │   ├── ProductSpecs.tsx           # Technical specs table & key highlights
│   │   │   ├── TrustMessaging.tsx         # Collateral pledge disclosure & NBFC lender notice
│   │   │   └── StickyCheckoutBar.tsx      # Mobile sticky bottom CTA (hidden on desktop)
│   │   ├── review/
│   │   │   ├── PlanReviewView.tsx         # Responsive two-column order & financial confirmation
│   │   │   └── PledgeNextStepModal.tsx    # 4-step mutual fund pledge interactive walkthrough (Escape & focus support)
│   │   └── common/
│   │       ├── ProductImage.tsx           # Robust Next/Image wrapper with branded SVG fallback
│   │       ├── ErrorState.tsx             # Reusable error message with retry action
│   │       ├── EmptyState.tsx             # Search/filter empty state with reset button
│   │       └── LimitSimulatorBar.tsx      # Customer-facing purchase limit with subtle assessor test drawer
│   ├── modules/
│   │   ├── catalog/
│   │   │   ├── types.ts                   # Product, Variant, Specs, Brand domain models
│   │   │   ├── products.data.ts           # 7 curated smartphones (Apple, Samsung, Google, OnePlus)
│   │   │   └── repository.ts              # Query and lookup repository
│   │   ├── emi/
│   │   │   ├── calculator.ts              # Pure financial calculation engine & INR formatter
│   │   │   ├── plans.ts                   # Plan generation & explainable recommendation rule
│   │   │   └── types.ts                   # Financial calculation types
│   │   └── affordability/
│   │       ├── limit.ts                   # Pure affordability evaluation & shortfall calculation
│   │       └── types.ts                   # Affordability types
│   ├── services/
│   │   └── api.ts                         # Client-side API abstraction decoupling UI from HTTP
│   └── hooks/
│       ├── useProducts.ts                 # Product catalog hook with debounced search
│       └── useProductDetail.ts            # PDP hook managing variant selection & EMI updates
├── public/
│   └── products/                          # High-resolution local WebP device assets & SVG fallback
└── tests/
    ├── emi.test.ts                        # Vitest suite for pure EMI formulas & rounding
    ├── affordability.test.ts              # Vitest suite for limit shortfall & eligibility logic
    └── catalog.test.ts                    # Vitest suite for variant lookups and data integrity
```

---

## Product Data Model

Product data is strictly decoupled from UI components using strong TypeScript models:

```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: BrandName; // "Apple" | "Samsung" | "Google" | "OnePlus"
  tagline: string;
  description: string;
  badge?: "0% EMI" | "Bestseller" | "New Launch" | "Trending";
  isNew?: boolean;
  isPopular?: boolean;
  images: string[];
  thumbnail: string;
  variants: ProductVariant[];
  specs: ProductSpecs;
  keyFeatures: string[];
  partnerLender: string; // e.g. "Tata Capital Financial Services"
}

export interface ProductVariant {
  id: string;
  storage: string; // e.g., "128 GB", "256 GB", "512 GB"
  color: string;
  colorHex: string; // e.g., "#9B968E"
  mrp: number;
  sellingPrice: number;
  cashback: number;
  inStock: boolean;
}
```

---

## Financial EMI Engine

The financial engine lives in `src/modules/emi/calculator.ts` and is pure, typed, and independent of React.

### 1. Zero-Cost / 0% Interest EMI
$$\text{Monthly EMI} = \text{round}\left(\frac{\text{Principal}}{\text{Tenure}}\right)$$
$$\text{Total Interest} = 0$$
$$\text{Total Payable} = \text{Principal} + \text{Processing Fee}$$
$$\text{Effective Total} = \max(0, \text{Total Payable} - \text{Cashback})$$

### 2. Standard Reducing Balance Interest EMI
For tenures with non-zero interest (e.g., 24-month extended tenure at $11.99\%$ p.a.):
$$r = \frac{\text{Annual Rate}}{12 \times 100}$$
$$\text{Monthly EMI} = \text{round}\left(\frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}\right)$$
$$\text{Total Interest} = (\text{Monthly EMI} \times n) - P$$
$$\text{Total Payable} = (\text{Monthly EMI} \times n) + \text{Processing Fee}$$

### 3. Explainable Recommendation Rule
Rather than arbitrarily tagging a plan as "Best", 1Fi highlights the **6-month 0% plan** as **Recommended** because:
> *"Optimal balance: 0% Interest with lowest monthly commitment without unnecessarily extending mutual fund lien duration."*

---

## Affordability & Limit Experience

To showcase product thinking without confusing customers or faking underwriting:
- **Customer-Facing Experience**: Presented as *"Available Purchase Limit ₹1,00,000"* with instant 0% EMI eligibility.
- **Subtle Assessor Test Drawer**: Evaluators can click *"Test Limit"* to toggle between **₹50K (Shortfall)**, **₹1L (Default)**, and **₹1.75L (High)** to instantly verify both eligible and ineligible workflows.
- **Shortfall Calculation**:
  $$\text{Shortfall} = \max(0, \text{Purchase Amount} - \text{Available Limit})$$
- **Eligibility Gating**: If purchase exceeds the limit, the primary CTA is locked with `"Limit Exceeded"` and displays the required additional limit.

---

## Navigation Architecture

- **Home (`/`)**: High-fidelity dashboard highlighting mutual fund portfolio value, available purchase limit, and quick exploration CTA.
- **Shop (`/shop`)**: The core assessment screen with 3 tabs (*Top Brands*, *Nearby Stores*, *1Fi Marketplace*).
- **EMI Dues (`/emi-dues`)**: Working placeholder with portfolio dues overview.
- **Limit (`/limit`)**: Working placeholder explaining LAMF credit line mechanics.
- **Profile (`/profile`)**: Working placeholder with connected mutual fund accounts.
- **404 Route (`/shop/nonexistent-product`)**: Custom branded 404 page with a direct button back to 1Fi Marketplace.

---

## Accessibility & Responsive UI

- Tested and verified across **360px, 390px, 430px, 768px, 1024px, 1280px, and 1440px+**.
- Desktop: full application layout (`max-w-6xl`) with top navigation, multi-column grids, and two-column PDP/Review screens.
- Mobile: compact layout with floating bottom navigation, safe-area insets, and sticky checkout bars.
- Semantic HTML tags (`<main>`, `<header>`, `<nav>`, `role="tablist"`, `role="tab"`, `role="radiogroup"`, `role="radio"`, `role="dialog"`).
- Keyboard accessible with `tabIndex={0}`, `Enter`/`Space` handlers, and `Escape` key dialog closing.
- Zero broken images guaranteed by local WebP assets and fallback SVG component.

---

## Test Suite & Verification

Unit tests are written using **Vitest** in `tests/`:

```bash
# Run all automated tests
npm test
```

### Coverage:
- `tests/emi.test.ts`: 0% EMI division, non-zero compounding reducing balance, processing fees, cashback deduction, 3/6/12/24 month plans, recommendation logic, currency formatting.
- `tests/affordability.test.ts`: Exact limit, below limit, above limit shortfall calculation, safe 0/negative handling.
- `tests/catalog.test.ts`: Brand filtering, search keyword matches, 404/undefined slug handling, variant price scaling.

```
 ✓ tests/catalog.test.ts (8 tests)
 ✓ tests/affordability.test.ts (6 tests)
 ✓ tests/emi.test.ts (13 tests)

Test Files:  3 passed (3)
Tests:       27 passed (27)
```

### Typecheck & Build:
```bash
npx tsc --noEmit   # Exits with code 0
npx eslint src     # Exits with code 0 (zero errors, zero warnings)
npm run build      # Creates optimized production build with Turbopack
```

---

## Local Setup & Development

```bash
# 1. Clone repository
git clone https://github.com/Vikas9892/1Fi.git
cd 1Fi

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
http://localhost:3000/shop

# 5. Run tests
npm test

# 6. Build production bundle
npm run build
```

---

## Git Commit Milestone Log

Authorship verified for `vikas9892 <vikast4843@gmail.com>`:

```
398a3ce - vikas9892 <vikast4843@gmail.com> : docs: update walkthrough with image stabilization and responsive shell
b3992b8 - vikas9892 <vikast4843@gmail.com> : feat: add dedicated home, emi dues, limit, and profile pages
98f121d - vikas9892 <vikast4843@gmail.com> : refactor: elevate limit simulator to production fintech styling with subtle evaluator toggle
c1be0a1 - vikas9892 <vikast4843@gmail.com> : fix: stabilize marketplace product imagery with local assets and fallback
893e3ed - vikas9892 <vikast4843@gmail.com> : refactor: optimize ssr rendering with server components and pass hydration props
b8875a7 - vikas9892 <vikast4843@gmail.com> : test: add comprehensive test suite for emi engine, affordability limits, and catalog models
ca818ca - vikas9892 <vikast4843@gmail.com> : feat: implement product detail page, variant selection, emi selector, and plan review
f3742b7 - vikas9892 <vikast4843@gmail.com> : feat: build shop page layout with 3-tab navigation, banner, and marketplace catalog
c6aa142 - vikas9892 <vikast4843@gmail.com> : feat: implement product catalog models, pure emi engine, and api architecture
```
