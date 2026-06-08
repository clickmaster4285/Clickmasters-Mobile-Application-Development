---
name: migrate-tanstack-vite-to-nextjs
description: Procedure for migrating a TanStack Start (Vite) app to Next.js App Router, including route conversion, Link replacement, asset handling, and cleanup.
source: auto-skill
extracted_at: '2026-06-08T09:50:32.015Z'
---

# Migrate TanStack Start (Vite) → Next.js App Router

This is not a standard Vite SPA migration. TanStack Start adds SSR, file-based routing, server functions, and middleware — requiring additional conversion steps beyond the official Vite→Next.js guide.

## Phase 1: Dependencies

1. Install `next@latest`, `@tailwindcss/postcss` (for Tailwind v4)
2. Remove: `vite`, `@vitejs/plugin-react`, `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@lovable.dev/vite-tanstack-config` (if present), `vite-tsconfig-paths`, `@tailwindcss/vite`, `nitro`
3. Keep: `@tanstack/react-query` (works independently of TanStack Router)
4. Use `--legacy-peer-deps` if Lovable/Vite config packages cause peer dep conflicts
5. Update scripts: `dev → next dev`, `build → next build`, `start → next start`, `lint → next lint`

## Phase 2: Config Files

1. Create `next.config.mjs` — decide server mode (no `output: 'export'`) vs static export
2. Create `postcss.config.mjs` with `@tailwindcss/postcss` plugin (required for Tailwind v4 in Next.js)
3. Update `tsconfig.json`:
   - Remove `types: ["vite/client"]`
   - Add `plugins: [{ "name": "next" }]`
   - Set `esModuleInterop`, `allowJs`, `forceConsistentCasingInFileNames`, `incremental` to `true`
   - Add `.next/types/**/*.ts` and `next-env.d.ts` to `include`
   - Update `paths` alias: `@/*` → `./app/*` (or `./src/*` depending on structure)

## Phase 3: Directory Structure

- Next.js App Router pages go inside `app/` directly: `app/page.tsx`, `app/about/page.tsx`, etc.
- If existing code is already in `app/` (TanStack convention), pages coexist alongside `app/components/`, `app/data/`, etc.
- Do NOT create a separate `src/` directory unless user explicitly wants it

## Phase 4: Root Layout & Providers

Convert `__root.tsx` → `app/layout.tsx`:
- `RootShell` (HTML shell) → root layout return
- Google Fonts `<link>` tags → keep in `<head>`
- Metadata from `head()` → `export const metadata: Metadata`
- `QueryClientProvider` → wrap in a `"use client"` provider component (e.g., `app/providers.tsx`)

Create error boundary: `app/error.tsx` (with `"use client"`)
Create not-found: `app/not-found.tsx`

## Phase 5: Route Conversion

Map TanStack routes to Next.js App Router:

| TanStack | Next.js |
|---|---|
| `routes/index.tsx` → `createFileRoute("/")` | `app/page.tsx` |
| `routes/about.tsx` → `createFileRoute("/about")` | `app/about/page.tsx` |
| `routes/services.$slug.tsx` → `createFileRoute("/services/$slug")` | `app/services/[slug]/page.tsx` |
| `routes/api/public/contact.ts` | `app/api/public/contact/route.ts` (Next.js Route Handler) |

Key changes per route:
- Remove `createFileRoute()` wrapper and `Route.export`
- Replace `Route.useLoaderData()` → direct data imports (if static) or `use()` for dynamic params
- Add `"use client"` to pages using Framer Motion, useState, useEffect, browser APIs
- `head()` → `export const metadata` or `generateMetadata()`
- Dynamic route params: `params` is now a `Promise` — use `use(params)` to unwrap

## Phase 6: Link & Navigation Replacement

TanStack `Link` → Next.js `Link`:
- `import { Link } from "@tanstack/react-router"` → `import Link from "next/link"`
- `to="/path"` → `href="/path"`
- `to="/services/$slug" params={{ slug }}` → `href={`/services/${slug}`}`
- `hash="contact"` → append to href: `href="/#contact"`
- Remove `notFound` import — use conditional rendering or `notFound()` from `next/navigation`

Audit ALL components (not just route files) for TanStack Router imports. Common locations: Navbar, Footer, ServicesSection, etc.

## Phase 7: CSS & Styling

- Move `app/styles.css` → keep as `app/styles.css` (import in layout)
- Remove Vite-specific directives from CSS:
  - `@import "tailwindcss" source(none)` → `@import "tailwindcss"`
  - Remove `@source "../src"` directives
- Import in `app/layout.tsx`: `import "./styles.css"`

## Phase 8: Asset Handling (Common Build Errors)

**This is the most error-prone step.** Next.js handles static imports differently from Vite:

- **Images**: `import img from './x.webp'` returns `{src, width, height}` object, not a URL string. Use `img.src` with `<img>` tags, or move to `public/` and use URL strings.
- **Videos (.mp4)**: Next.js doesn't support video module imports. Move to `public/` and reference by URL path (`/assets/video.mp4`).
- **`.asset.json` sidecars**: Lovable-specific, not supported in Next.js. Replace with direct asset references.
- **File name mismatches**: Vite may have tolerated hyphen/underscore differences. Verify actual filenames match imports.

**Critical Lovable `.asset.json` discovery**: These sidecar files contain a `url` field pointing to `/__l5e/assets-v1/{uuid}/{filename}` — a Lovable dev-server path. The actual image files may **not exist on disk at all** — they were served from the Lovable platform. Before migrating:
  1. Check if the actual image file (e.g., `alex-morgan.jpeg`) exists alongside the `.asset.json` sidecar
  2. If only `.asset.json` exists without the actual file: you need to either create placeholder images or download the originals from the Lovable platform
  3. Replace all `import x from '@/assets/foo.jpeg.asset.json'` + `x.url` usage with direct URL strings: `"/assets/foo.jpeg"`
  4. Replace all `import x from '@/assets/foo.webp'` + `x.url` usage with `"/assets/foo.webp"` (drop both the import and the `.url` accessor)

**Recommended approach**: Move all media assets to `public/assets/`, replace `import x from '@/assets/...'` with plain URL strings (`/assets/...`). Delete the `app/assets/` directory after migration.

## Phase 9: API Routes (if keeping)

TanStack server functions → Next.js Route Handlers:
- `createFileRoute("/api/...")({ server: { handlers: { POST } } })` → `export async function POST(request: Request)` in `app/api/.../route.ts`
- Replace `request.json()` → same (standard Request API)
- Replace Supabase server client → create Next.js-compatible server client
- Use `NextResponse.json()` instead of `Response.json()`

## Phase 10: Environment Variables

- `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*` (client) or `process.env.*` (server)
- `import.meta.env.MODE` → `process.env.NODE_ENV`
- `import.meta.env.PROD` → `process.env.NODE_ENV === 'production'`
- Rename .env vars: `VITE_*` → `NEXT_PUBLIC_*`

## Phase 11: Cleanup

Delete:
- `vite.config.ts`, `app/router.tsx`, `app/routeTree.gen.ts`, `app/start.ts`, `app/server.ts`
- `app/routes/` directory (TanStack file-based routes)
- `bunfig.toml`, `bun.lock` (if switching to npm)
- Lovable-specific lib files: `lovable-error-reporting.ts`, `error-capture.ts`, `error-page.ts`, `config.server.ts`

## Phase 12: `'use client'` Audit

Next.js enforces the server/client component boundary. Any file using client-only APIs **must** have `"use client"` as its very first line. TanStack Start didn't have this boundary, so many components will be missing it.

**How to audit systematically:**

1. List all `.tsx` files in `app/components/` (and subfolders)
2. For each file, check if it uses any of:
   - React hooks: `useState`, `useEffect`, `useRef`, `useContext`, `useReducer`, `useMemo`, `useCallback`, `useLayoutEffect`, `use`, etc.
   - Framer Motion: `motion`, `AnimatePresence`, `useMotionValue`, `useScroll`, `useTransform`, `useReducedMotion`, etc.
   - Browser APIs: `window`, `document`, `navigator`, `localStorage`, `sessionStorage`
   - Client-only libraries: `lenis`, event handlers (`onClick`, `onChange`, `onSubmit`)
   - Imports from a module that is itself a client component (e.g., `useMagnetic`, `useLenisScroll`, `MouseParallax`)
3. If the file needs it and doesn't have it → add `"use client"` as line 1

**Important:** Shared utility modules (like `motion.tsx`, `decor.tsx`) that export components using hooks/motion are the **highest priority** — without `"use client"` on these root dependencies, all consumers break.

**Exceptions (do NOT add `"use client"`):**
- `app/layout.tsx` — must remain a server component (it exports `metadata`)
- Pure static JSX components with no hooks, motion, or browser APIs (e.g., a simple `Footer.tsx` with only JSX)

## Phase 13: Build & Fix Iteratively

1. Run `npx next build` — expect asset/component errors
2. Fix asset imports (most common: .mp4, .webp, .asset.json)
3. Add missing `"use client"` directives
4. Rebuild until clean
5. Run `npm run dev` and visually verify all pages

## Key Pitfalls

- **Don't use `src/` unless asked** — the user may expect everything in root `app/`
- **`--legacy-peer-deps`** may be needed during install due to Lovable package conflicts
- **Asset imports are the #1 build failure** — plan the asset migration early
- **Missing `"use client"` is the #2 build failure** — audit ALL components, especially shared motion/animation utility modules that many others import from
- **API routes don't work with `output: 'export'`** — use server mode if you need them
- **Lovable `.asset.json` sidecars may be orphans** — the actual image files they reference don't exist on disk; they were served from the Lovable platform. You must provide real images or placeholders.
- **Supabase `.server.ts` imports** may reference files not on disk (Lovable generated) — handle gracefully
- **When replacing asset imports with URL strings**, also remove `.url` property accesses — Vite `.asset.json` imports returned objects with a `.url` field, but plain URL strings don't have a `.url` property. Replace `x.url` → just `x`.
