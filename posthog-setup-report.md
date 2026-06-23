# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the FashionHero shop. The following changes were made:

- **`instrumentation-client.ts`** — PostHog client-side initialization using Next.js 16 instrumentation API (no Provider needed). Captures exceptions, enables debug mode in development.
- **`next.config.ts`** — Added `/ingest/*` reverse-proxy rewrites routing through EU PostHog endpoints, plus `skipTrailingSlashRedirect: true`.
- **`src/lib/posthog-server.ts`** — Server-side PostHog singleton (posthog-node) for future API routes or Server Actions.
- **`src/components/auth-provider.tsx`** — `posthog.identify()` on login and registration; `posthog.capture()` for `user_signed_in`, `user_registered`, `user_signed_out`; `posthog.reset()` on logout.
- **`src/components/product-info.tsx`** — `add_to_cart` event in the add-to-cart handler.
- **`src/components/quick-view-modal.tsx`** — `add_to_cart` event (with `source: "quick_view"`) in the quick-view add-to-cart handler.
- **`src/components/product-card.tsx`** — `product_quick_viewed` event when the Quick View button is clicked.
- **`src/components/wishlist-button.tsx`** — `wishlist_item_toggled` event with `action: "added" | "removed"`.
- **`src/components/search-modal.tsx`** — `search_performed` event when a search result is clicked (captures query and result count).
- **`src/components/cart-drawer.tsx`** — `checkout_started` event when the Checkout link is clicked.
- **`src/app/checkout/page.tsx`** — `order_placed` event on Place Order button click (captures totals and product IDs).
- **`src/components/filter-bar.tsx`** — `product_filter_applied` for gender, price range, shoe type, and material filters; `product_sort_changed` for sort changes.
- **`src/app/products/[slug]/product-view-tracker.tsx`** — New client component that fires `product_viewed` on mount (conversion funnel entry point).
- **`src/app/products/[slug]/page.tsx`** — Renders `<ProductViewTracker>` with product metadata.
- **`src/app/seller/dashboard/page.tsx`** — `seller_dashboard_viewed` on mount.
- **`src/components/seller/QualityScoreWidget.tsx`** — `quality_score_cta_clicked` on CTA button click.
- **`src/components/seller/CohortToggle.tsx`** — `feature_flag_toggled` with flag name and new value.

## Event inventory

| Event name | Description | File |
|---|---|---|
| `product_viewed` | User viewed a product detail page — top of purchase funnel | `src/app/products/[slug]/product-view-tracker.tsx` |
| `add_to_cart` | User added a product from the product detail page | `src/components/product-info.tsx` |
| `add_to_cart` | User added a product from the quick view modal (`source: "quick_view"`) | `src/components/quick-view-modal.tsx` |
| `product_quick_viewed` | User opened the quick view modal | `src/components/product-card.tsx` |
| `wishlist_item_toggled` | User added or removed a product from their wishlist | `src/components/wishlist-button.tsx` |
| `search_performed` | User clicked a search result | `src/components/search-modal.tsx` |
| `checkout_started` | User clicked the Checkout button in the cart drawer | `src/components/cart-drawer.tsx` |
| `order_placed` | User clicked the Place Order button on the checkout page | `src/app/checkout/page.tsx` |
| `user_signed_in` | User successfully logged in | `src/components/auth-provider.tsx` |
| `user_registered` | User successfully created a new account | `src/components/auth-provider.tsx` |
| `user_signed_out` | User logged out | `src/components/auth-provider.tsx` |
| `product_filter_applied` | User applied a gender / price / type / material filter | `src/components/filter-bar.tsx` |
| `product_sort_changed` | User changed sort order on collection page | `src/components/filter-bar.tsx` |
| `seller_dashboard_viewed` | Seller landed on the seller dashboard — top of Quality Score funnel | `src/app/seller/dashboard/page.tsx` |
| `quality_score_cta_clicked` | Seller clicked the Quality Score unlock CTA | `src/components/seller/QualityScoreWidget.tsx` |
| `feature_flag_toggled` | Seller toggled the quality_score_cohort demo flag | `src/components/seller/CohortToggle.tsx` |

## Next steps

We've built a dashboard and insights to monitor user behavior from day one:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/207452/dashboard/765815)
- [Purchase Conversion Funnel](https://eu.posthog.com/project/207452/insights/gPZThtBH) — product_viewed → add_to_cart → checkout_started → order_placed
- [Add to Cart — Daily Trend](https://eu.posthog.com/project/207452/insights/belIj1da) — volume of cart add events over time
- [New Registrations & Logins](https://eu.posthog.com/project/207452/insights/0KMJTL5L) — user_registered vs user_signed_in daily trend
- [Wishlist & Search Engagement](https://eu.posthog.com/project/207452/insights/Ax7zcaRl) — wishlist_item_toggled and search_performed over time
- [Seller Quality Score CTA Funnel](https://eu.posthog.com/project/207452/insights/AuA8G9hn) — seller_dashboard_viewed → quality_score_cta_clicked

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — the current implementation only identifies on fresh login/register; returning users loaded from localStorage are not re-identified. Consider calling `posthog.identify()` in the `useEffect` that restores the user from localStorage.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
