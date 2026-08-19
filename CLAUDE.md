# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A from-scratch React SPA rebuild of tecportcr.com (TECPORT), a Costa Rican B2B seller/installer of automatic gates, motors, CCTV, electric fences, etc. The original site was WordPress + WooCommerce + Elementor; the owner lost that repo and only kept a static HTML export (39 pages, wget-style, with per-page `<Page>_files/` asset folders). That export lives one directory up, at `../VUKZ` relative to this project — it is the source of truth for real product data, copy, and images, and is read by `scripts/migrate-catalog.mjs` (see below). It is not part of this project's own source tree.

There is no backend. The catalog, page copy, and taxonomy are static JSON checked into `src/data/`.

## Commands

```
npm run dev       # start Vite dev server
npm run build      # tsc -b && vite build — type-checks before bundling
npm run preview    # preview a production build
npm run lint       # oxlint
node scripts/migrate-catalog.mjs   # regenerate src/data/products.json + public/images/* from ../VUKZ
```

There is no test runner configured. Single-component/manual verification is normally done by running `npm run dev` and checking the relevant route in a browser.

## Architecture

### Styling / design tokens
Tailwind v4, configured CSS-first (no `tailwind.config.js`) — the plugin is registered in `vite.config.ts` (`@tailwindcss/vite`) and all design tokens live in the `@theme` block at the top of `src/index.css`: brand colors (`brand-action` = `#BB2828`, `ink`, `muted`, `surface`, `surface-subtle`, `border`) and fonts (`heading` = Arvo, `sans` = Barlow — loaded via `<link>` tags in `index.html`, not a CSS `@import`, because a Google Fonts `@import` placed after Tailwind's own `@import "tailwindcss"` breaks the CSS build's import-ordering rule). Utility classes like `bg-brand-action` / `text-brand-action` / `font-heading` come from these theme tokens.

### Data layer (`src/data/` + `src/repositories/productsRepository.ts`)
`categories.json`, `brands.json`, `products.json`, `serviceLandings.json` are the only source of truth. **Never import these JSON files directly from a component** — always go through `productsRepository` (`getCategories`, `getCategoryBySlug`, `getBrands`, `getBrandBySlug`, `getProducts(filters)`, `getProductBySlug`, `getRelatedProducts`). This indirection exists so that swapping static JSON for a real backend/CRUD later only means rewriting that one file.

Catalog taxonomy is **category + facets**, not nested category paths (the original WordPress site had a broken category tree like `Pistones > Abatibles > Beninca`, forcing a page per brand). Each `Category` in `categories.json` declares `brandFacet: boolean` and an optional `subtypeFacet: string[]`; products carry `categoryId`, optional `brandId`, and optional `subtype`. Filtering is done in-memory via `ProductFilters` (`{ categorySlug, brandSlug?, subtype? }`), not via routing.

### Routing (`src/App.tsx`)
Everything renders inside `Layout` (`src/components/layout/Layout.tsx`), which always wraps the page with `Header` → `ThreeColumnStrip` → `<page content>` → `MoreInfoCTA` → `Footer`. Page components only render what's unique to that page.

Routes:
- Static institutional pages (`/`, `/quienes_somos`, `/servicios`, `/contacto`, `/request-quote`)
- `/productos/:categorySlug` and `/productos/:categorySlug/:productSlug` → catalog (`CategoryPage`, `ProductDetailPage`)
- `/:slug` → `ServiceLandingPage`, which looks `slug` up in `serviceLandings.json` and 404s if not found

The `/:slug` catch-all must stay the **lowest-priority** route — it matches any single path segment, so it has to sit after all the more specific routes or it will swallow them.

### Catalog page layout (`src/pages/CategoryPage.tsx`)
Split into two pieces on purpose:
- `CategorySidebar` — always renders **all** categories (not just the current one), for cross-category navigation, with the active one highlighted.
- `ProductFilterBar` — renders the Brand/Subtype pills (only the facets the active category declares) as a horizontal bar above the product grid, not in the sidebar.

`CategoryPage` resets `filters` in a `useEffect` keyed on `categorySlug` — without it, switching categories via the sidebar (same route component, different param) would carry over the previous category's brand/subtype selection.

### Quote cart (`src/context/QuoteCartContext.tsx`)
Client-only cart (`QuoteCartProvider`, `useQuoteCart`) persisted to `localStorage` under `tecport-quote-cart`. This replaces the original site's YITH Request a Quote WooCommerce plugin — there is no server-side quote/cart API.

### Forms (`ContactoPage`, `RequestQuotePage`)
Both forms are UI-only. `handleSubmit` just flips a `submitted` flag and shows a message that says the backend isn't wired up yet — there is no email service or API call. Don't assume submission does anything real without checking for a `TODO` comment update first.

### Image/catalog migration script (`scripts/migrate-catalog.mjs`)
Re-parses the 24 category-listing HTML files in `../VUKZ` (regex-based, matching WooCommerce's `<li class="product ...">` markup), extracts product name/slug/image per file using a hardcoded `categoryManifest` (maps each source HTML file to a target `categoryId`/`brandId`/`subtype`), copies the referenced images into `public/images/products/`, and **overwrites `src/data/products.json` entirely**. It also copies the logo, the home page's "Áreas de servicio" carousel thumbnails, and each landing page's content images into `public/images/landings/`, writing the resulting path mapping to `scripts/landing-images.json` (informational only — `src/data/serviceLandings.json`'s `images`/`thumbnail` fields were wired up by hand from that output, the script does not touch `serviceLandings.json`).

Because the script fully regenerates `products.json`, any manual edits to that file (e.g. hand-written `description`/`specs`) will be lost if it's re-run — re-apply them after, or move that kind of content to a separate file the script doesn't own.

`Referencias/` at the project root holds ad-hoc screenshots the project owner uses to point at specific UI changes (e.g. `cambio.png`) — it's reference material, not part of the app.
