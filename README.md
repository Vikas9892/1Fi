# 1Fi Marketplace

### Live Demo
[https://1fi-marketplace-mu.vercel.app/](https://1fi-marketplace-mu.vercel.app/)

### GitHub
[https://github.com/Vikas9892/1Fi](https://github.com/Vikas9892/1Fi)

1Fi Marketplace is a responsive smartphone shopping and EMI checkout experience built for the **1Fi Software Development Engineer Intern assessment**. It adds a full Marketplace experience inside 1Fi's existing Shop page, allowing users to browse smartphones, switch storage and color variants, compare real-time EMI plans (3, 6, 12, 24 months), check affordability against an approved purchase limit, and review their plan before pledging mutual funds.

---

## What I Built

The assignment asked to explore the existing 1Fi product, understand how the Shop page works, and build a "1Fi Marketplace" section directly inside it.

In 1Fi, users don't have to sell their mutual funds to buy gadgets. Instead, they can take a loan against their mutual fund investments (LAMF) and pay through easy or 0% No-Cost EMIs while their mutual funds continue to grow.

To match the assignment specifications:
- Kept the original 1Fi look, purple theme (`#712CDC`), navigation, and header.
- Implemented the required **3-tab structure** on the Shop page:
  - **Top Brands** (blank placeholder as specified in the assignment).
  - **Nearby Stores** (blank placeholder as specified in the assignment).
  - **1Fi Marketplace** (the complete functional product experience).
- Built a realistic smartphone catalog with 7 popular devices across Apple, Samsung, Google, and OnePlus.
- Built instant search, brand filter chips, and sorting.
- Built a detailed Product Detail Page (PDP) with an image gallery, variant selector, specs table, and lending partner details.
- Created a dynamic EMI calculation engine that updates whenever the user changes a variant or tenure.
- Added live affordability checking against an approved purchase limit (default ₹1,00,000).
- Created a Plan Review page (`/shop/[slug]/review`) with a breakdown of price, cashback, interest, monthly EMI, and a 4-step digital lien pledge walkthrough.
- Added supplementary pages (`/`, `/emi-dues`, `/limit`, `/profile`) so every navigation link in the app works smoothly.

---

## User Flow

Here is the exact journey a user takes through the application:

1. **Visit Shop (`/shop`)**: The user opens the Shop page and sees three tabs: Top Brands, Nearby Stores, and 1Fi Marketplace.
2. **Browse Marketplace**: Clicking "1Fi Marketplace" loads the phone catalog. The user can type in the search bar or tap brand chips (Apple, Samsung, Google, OnePlus) to quickly find a phone.
3. **Open Product Detail Page (`/shop/[slug]`)**: Clicking on any product card opens its dedicated page with device photos, specs, and prices.
4. **Choose Variant**: The user taps different storage options (e.g., 128 GB, 256 GB, 512 GB) or colors (e.g., Natural Titanium, Desert Titanium). The selling price, MRP, discount percentage, and starting EMI update immediately.
5. **Compare & Select EMI**: The user reviews four EMI tenure cards (3, 6, 12, and 24 months). 3 and 6-month plans show 0% No-Cost EMI, while 12 and 24-month plans show transparent interest rates and monthly breakdowns.
6. **Check Affordability**: The app compares the current variant's price with the user's available purchase limit (₹1,00,000). If it is within the limit, a green checkmark appears. If the price exceeds the limit, an alert explains the shortfall and suggests pledging more funds.
7. **Proceed to Review (`/shop/[slug]/review`)**: Clicking "Proceed to Review" opens the summary page showing the chosen phone, storage, color, lending partner, cashback, and complete EMI payment schedule.
8. **Digital Lien Pledge Walkthrough**: Clicking "Confirm & Pledge Mutual Funds" opens a 4-step modal that walks through how 1Fi works in real life: verifying mutual funds with the RTA (CAMS/KFintech), OTP authorization, instant credit approval, and order confirmation.

---

## How It Works

The app is built as a full-stack Next.js application where the UI, API layer, and calculation logic are cleanly separated:

```
User Action (Select Variant / Pick EMI / Search)
                     │
                     ▼
         Custom React Hooks (State Management)
          ├── useProducts (search & filter)
          ├── useProductDetail (variant & active EMI)
          └── useAffordability (limit verification)
                     │
                     ▼
         Service Layer (src/services/api.ts)
                     │
                     ▼
             Next.js API Routes
          ├── GET /api/products
          ├── GET /api/products/[slug]
          └── GET /api/emi-plans?price=...
                     │
                     ▼
             Pure Domain Modules
          ├── Catalog Repository (products & variants)
          ├── Pure EMI Engine (0% and amortized math)
          └── Affordability Engine (limit vs price)
```

### Application Routes

- `/` — Dedicated 1Fi dashboard with portfolio overview, active loans, and quick navigation.
- `/shop` — The main Shop page with the Top Brands, Nearby Stores, and 1Fi Marketplace tabs.
- `/shop/[slug]` — Dynamic Product Detail Page (PDP) for any device (e.g., `/shop/iphone-16-pro`).
- `/shop/[slug]/review` — Final purchase and EMI plan review screen before pledging.
- `/emi-dues` — EMI dues tracking page showing upcoming repayments.
- `/limit` — Credit limit management page showing total, used, and available limit.
- `/profile` — User profile, mutual fund portfolio status, and KYC verification info.

### API Routes

- `GET /api/products` — Returns all catalog products with optional `?search=` and `?brand=` filters.
- `GET /api/products/[slug]` — Returns a single product by slug with its full variant list and specs.
- `GET /api/emi-plans?price=...` — Returns calculated 3, 6, 12, and 24-month EMI plans for any given price.

*Note: The frontend service layer calls these API routes, but also falls back directly to the local repository modules during static rendering or SSR so the application is resilient and never fails.*

---

## Tech Stack

| Technology | Why I Used It |
| :--- | :--- |
| **Next.js 16 (App Router)** | Modern React framework with file-based routing, server and client components, fast Turbopack builds, and automatic static page optimization. |
| **React 19** | Powers the interactive UI with modern hooks (`useState`, `useMemo`, `useCallback`) for instant variant switching and calculation updates. |
| **TypeScript 5** | Provides strict types for products, variants, EMI plans, and API responses. It prevented bugs during development and made refactoring safe. |
| **Tailwind CSS 4** | Clean, utility-first styling that allowed exact matching of 1Fi's `#712CDC` brand color and building fully responsive mobile and desktop layouts. |
| **Lucide React** | Lightweight icons for navigation tabs, trust badges, phone specs, and search controls. |
| **Vitest 5** | Fast unit testing framework that runs native TypeScript tests for EMI formulas, limit calculations, and catalog filtering. |

---

## Project Structure

```text
1Fi/
├── src/
│   ├── app/                               # Next.js App Router routes
│   │   ├── layout.tsx                     # Root layout, fonts, and global metadata
│   │   ├── page.tsx                       # Home dashboard (/)
│   │   ├── icon.svg                       # Custom 1Fi branded browser favicon
│   │   ├── apple-icon.png                 # Apple touch icon
│   │   ├── shop/
│   │   │   ├── page.tsx                   # Shop page with 3 tabs (/shop)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx               # Product Detail Page (/shop/[slug])
│   │   │       └── review/
│   │   │           └── page.tsx           # Plan Review Page (/shop/[slug]/review)
│   │   ├── emi-dues/                      # Dues page (/emi-dues)
│   │   ├── limit/                         # Limit manager page (/limit)
│   │   ├── profile/                       # User profile page (/profile)
│   │   └── api/                           # Backend API route handlers
│   │       ├── products/
│   │       │   ├── route.ts               # GET /api/products
│   │       │   └── [slug]/route.ts        # GET /api/products/[slug]
│   │       └── emi-plans/route.ts         # GET /api/emi-plans
│   │
│   ├── components/                        # Modular React UI components
│   │   ├── common/                        # Shared UI (ProductImage with fallback & skeleton)
│   │   ├── layout/                        # AppShell, DesktopNav, MobileNav, BrandTabs
│   │   ├── shop/                          # ProductCard, ProductGrid, SearchBar, BrandFilters
│   │   ├── pdp/                           # ProductGallery, VariantSelector, EmiPlanSelector, Specs
│   │   └── review/                        # PlanSummaryCard, PledgeModal, OrderSuccessModal
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── useProducts.ts                 # Catalog loading, search debouncing, brand filtering
│   │   ├── useProductDetail.ts            # Selected storage/color variant, price & EMI state
│   │   └── useAffordability.ts            # Available limit comparison & shortfall calculation
│   │
│   ├── modules/                           # Pure business logic (Zero UI dependencies)
│   │   ├── catalog/                       # products.data.ts (catalog), repository.ts, types.ts
│   │   ├── emi/                           # calculator.ts (amortization), plans.ts, types.ts
│   │   └── affordability/                 # limit.ts (affordability engine), types.ts
│   │
│   └── services/                          # API client with direct-module fallback
│       └── api.ts
│
├── tests/                                 # Unit & integration test suites
│   ├── catalog.test.ts                    # Catalog filtering, search, and variant tests
│   ├── emi.test.ts                        # 0% EMI and amortized reducing-balance interest tests
│   └── affordability.test.ts              # Limit verification and shortfall math tests
│
├── public/                                # Static assets
│   └── products/                          # Clean, high-res full-device product images
│
└── package.json
```

---

## Deep Dive: How EMI Calculations Work

One of the most important parts of this project is financial accuracy. The EMI engine is written in pure TypeScript in `src/modules/emi/calculator.ts` with no React dependencies, which makes it easy to test and guaranteed deterministic.

### 1. No-Cost EMI (3 and 6 Months)
- Interest Rate: **0% APR**
- Processing Fee: **₹0**
- Formula:
  $$\text{Monthly EMI} = \text{Math.round}\left(\frac{\text{Principal}}{\text{Months}}\right)$$
- Total Interest: **₹0**
- Total Amount Payable = Selling Price.

### 2. Standard Low-Cost EMI (12 and 24 Months)
- 12 Months: **14% p.a.** reducing balance
- 24 Months: **16% p.a.** reducing balance
- Formula: Uses the standard financial reducing-balance amortization formula:
  $$\text{Monthly Interest Rate } (r) = \frac{\text{Annual Rate}}{12 \times 100}$$
  $$\text{Monthly EMI} = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$
- Total Amount Paid: $\text{Monthly EMI} \times n$
- Total Interest: $\text{Total Amount Paid} - P$

### 3. Price After Cashback
1Fi provides cashback on purchases. The effective price is shown alongside the selling price so the user knows their real net cost:
$$\text{Effective Price} = \text{Selling Price} - \text{Cashback}$$

All figures format cleanly in Indian Rupees (`₹1,14,900`) using `Intl.NumberFormat('en-IN')`.

---

## Deep Dive: Affordability & Limit Checking

The user has an approved mutual fund credit limit:
- **Total Limit**: ₹1,00,000
- **Used Limit**: ₹0
- **Available Limit**: ₹1,00,000

When a user selects a phone variant, `src/modules/affordability/limit.ts` checks:
1. If $\text{Selling Price} \le \text{Available Limit}$:
   - Status: `Within Approved Limit`
   - Shortfall: `₹0`
   - User can proceed directly to checkout.
2. If $\text{Selling Price} > \text{Available Limit}$ (e.g., iPhone 16 Pro 512 GB at ₹1,44,900):
   - Status: `Exceeds Approved Limit`
   - Shortfall: $\text{Price} - \text{Limit} = ₹44,900$
   - An amber warning banner appears showing the exact shortfall.
   - It also calculates how much additional mutual fund portfolio needs to be pledged (assuming a standard 50% Loan-to-Value ratio).

---

## Handling Key UX Details

- **Changing Product Variants**: When a user taps a different storage tier (e.g. 128 GB to 256 GB) or color, the state updates instantly. The price updates, all four EMI tenure cards recalculate their monthly numbers, the limit bar updates, and the URL search params (`?storage=256+GB&color=Natural+Titanium`) update so the selection is shareable and stays intact on page reload.
- **Product Image Framing**: Initially, product images had tight camera-bump crops. I audited and fixed the entire asset pipeline. Now every product has a verified, full-device primary shot and an alternate full-device shot in `public/products/`. They are framed using centered flex containers and `object-fit: contain` so they fill 60–80% of the container height with natural proportions and zero awkward crops.
- **Loading Skeletons**: While products load or search terms debounce, skeleton cards with `animate-pulse` prevent layout shifts (CLS = 0).
- **Image Fallback**: If an image fails to load or the network drops, `ProductImage.tsx` catches the error and smoothly displays an inline SVG phone placeholder with 1Fi branding.
- **Empty States**: If a search query matches no phones (e.g., "Nokia"), a helpful empty state is shown with an explanation and a one-click "Clear Search" button.
- **Responsive Layout**:
  - **Mobile (`<640px`)**: Single-column product cards, horizontal scrolling filter chips, sticky bottom checkout bar, and floating bottom navigation tab bar.
  - **Tablet (`768px`)**: Two to three-column card grid with balanced padding.
  - **Desktop (`>1024px`)**: Professional max-width container (`max-w-[1440px]`), top navigation bar with search and profile links, 4-column product grid, and a two-column PDP layout (sticky gallery on the left, purchase controls on the right).

---

## Testing & Quality Assurance

The codebase includes 28 automated tests written in Vitest across 3 test files:

```bash
npm test
```

```text
 ✓ tests/affordability.test.ts (6 tests)
 ✓ tests/catalog.test.ts (9 tests)
 ✓ tests/emi.test.ts (13 tests)

 Test Files  3 passed (3)
      Tests  28 passed (28)
```

- **`tests/emi.test.ts`**: Verifies exact zero-cost EMI division, 12 and 24-month reducing-balance amortization formulas, cashback deduction, and starting EMI helper.
- **`tests/affordability.test.ts`**: Verifies limit comparison math, shortfall calculations, edge cases at the exact limit boundary, and additional pledge estimations.
- **`tests/catalog.test.ts`**: Verifies all 7 devices have valid variants, storage values, hex colors, positive prices, brand filters, keyword search, slug lookups, and ID lookups.

In addition, the project passes:
- **`npx tsc --noEmit`**: 0 TypeScript compilation errors.
- **`npm run lint`**: 0 ESLint errors and 0 warnings.
- **`npm run build`**: Production build generates all 12 static and dynamic routes cleanly with Next.js Turbopack.

---

## Technical Tradeoffs & What I Would Improve

### Tradeoffs I Made

1. **In-Memory Catalog vs. External Database**:
   - *Decision*: Used typed, static catalog data in `src/modules/catalog/products.data.ts` exposed via API routes rather than setting up an external PostgreSQL or MongoDB instance.
   - *Why*: For an intern assignment, this makes the project 100% reproducible for reviewers with zero setup steps or database connection strings, while maintaining the exact same API and hook patterns used with real databases.
2. **Simulated Mutual Fund Lien Pledge**:
   - *Decision*: Built a realistic 4-step modal simulation for the pledge step instead of real RTA OAuth integration.
   - *Why*: Connecting to live SEBI-registered RTAs (CAMS/KFintech) requires production NBFC licensing and DigiLocker credentials. The simulated flow clearly demonstrates the exact user journey and fintech compliance steps.
3. **Local High-Resolution Assets**:
   - *Decision*: Stored curated full-device assets in `public/products/` instead of fetching from external image CDNs.
   - *Why*: Eliminates broken image links, third-party CORS issues, and rate limits, ensuring the app always renders instantly.

### What I Would Add in Production

1. **Real RTA & CAS Integration**: Connect to MFCentral or DigiLocker APIs to fetch the user's actual mutual fund holdings and calculate live portfolio loan limits.
2. **User Authentication**: Add NextAuth or Supabase Auth to support login via mobile OTP and store active orders per user.
3. **eNACH / Autopay Setup**: Integrate UPI Autopay or eNACH mandate generation for recurring EMI debits.
4. **Order History**: Allow users to track active EMIs, upcoming due dates, and foreclosure options on the `/emi-dues` screen.

---

## Running Locally

### Prerequisites
- Node.js 18.18 or higher
- npm 9 or higher

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Vikas9892/1Fi.git
   cd 1Fi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Run test suite:
   ```bash
   npm test
   ```

6. Run production build:
   ```bash
   npm run build
   ```

---

## Author

**Vikas Tiwari**  
- GitHub: [@Vikas9892](https://github.com/Vikas9892)  
- Email: vikast4843@gmail.com  
- Project Submission: 1Fi Software Development Engineer Intern Assessment
