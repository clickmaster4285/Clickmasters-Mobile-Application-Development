# ClickMaster Mobile — Migration Guide & Progress

## Migration: TanStack Start (Vite/Bun) → Next.js 16 App Router

Reference: https://nextjs.org/docs/app/guides/migrating/from-vite

---

## Tech Stack

| Layer | Before | After |
|---|---|---|
| Framework | TanStack Start (SSR) | Next.js 16 (App Router) |
| Build | Vite 7 + Nitro (Cloudflare) | Next.js + Turbopack |
| Routing | TanStack Router (file-based `app/routes/`) | Next.js App Router (`app/` pages) |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` | Tailwind CSS v4 + `@tailwindcss/postcss` |
| UI | shadcn/ui (45) + 21 landing components | Same (unchanged) |
| Animations | Framer Motion + Lenis | Same (unchanged) |
| Data | React Query | React Query (unchanged) |
| Backend | Supabase + Resend API route | **Removed** (user request) |
| Package manager | Bun | npm |

---

## Completed Steps

### 1. Dependencies
- ✅ Installed: `next@16.2.7`, `@tanstack/react-query`, `@tailwindcss/postcss`
- ✅ Removed: `vite`, `@vitejs/plugin-react`, `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@lovable.dev/vite-tanstack-config`, `vite-tsconfig-paths`, `@tailwindcss/vite`, `nitro`, `@supabase/supabase-js`

### 2. Config Files
- ✅ `next.config.mjs` — server mode (no `output: 'export'`), `images: { unoptimized: true }`
- ✅ `postcss.config.mjs` — `@tailwindcss/postcss` plugin
- ✅ `tsconfig.json` — Next.js compat: `paths: @/* → ./app/*`, `plugins: [next]`, `jsx: react-jsx`, `esModuleInterop`, `allowJs`, `incremental`
- ✅ `package.json` scripts — `next dev/build/start/lint`
- ✅ `.gitignore` — added `.next`, `next-env.d.ts`

### 3. Root Layout (`app/layout.tsx`)
- ✅ Converted from `__root.tsx` → Next.js root layout
- ✅ Google Fonts via `<link>` (Montserrat, Inter, Caveat)
- ✅ Metadata API (title, description, OG, Twitter)
- ✅ `QueryClientProvider` via `app/providers.tsx` (client component)
- ✅ `app/error.tsx` — global error boundary
- ✅ `app/not-found.tsx` — 404 page

### 4. Route Conversion
| TanStack Route | Next.js Page | Status |
|---|---|---|
| `routes/index.tsx` → `/` | `app/page.tsx` | ✅ |
| `routes/about.tsx` → `/about` | `app/about/page.tsx` | ✅ |
| `routes/contact.tsx` → `/contact` | `app/contact/page.tsx` | ✅ |
| `routes/services.tsx` → `/services` | `app/services/page.tsx` | ✅ |
| `routes/services.$slug.tsx` → `/services/[slug]` | `app/services/[slug]/page.tsx` | ✅ |
| `routes/solutions.tsx` → `/solutions` | `app/solutions/page.tsx` | ✅ |
| `routes/api/public/contact.ts` | **Removed** | ✅ |

### 5. Link Migration
- ✅ Replaced TanStack `Link` (`to=`, `hash=`, `params=`) → Next.js `Link` (`href=`)
- ✅ Updated: `Navbar.tsx`, `ServicesSection.tsx`, all page files

### 6. Cleanup
- ✅ Deleted: `vite.config.ts`, `app/router.tsx`, `app/routeTree.gen.ts`, `app/start.ts`, `app/server.ts`, `app/routes/`, `bunfig.toml`, `bun.lock`
- ✅ Deleted: `app/lib/config.server.ts`, `app/lib/error-capture.ts`, `app/lib/error-page.ts`, `app/lib/lovable-error-reporting.ts`

### 7. Asset Migration
- ✅ Moved all assets from `app/assets/` → `public/assets/` (logo, videos, images, team photos, marketing images, service images)
- ✅ Replaced all `import x from "@/assets/..."` with URL string constants (`"/assets/..."`)
- ✅ Replaced all `.asset.json` sidecar imports (Lovable-specific) with direct URL strings
- ✅ Replaced all `*.mp4` module imports with URL strings
- ✅ Removed `.url` property accesses (Vite returns strings, Next.js returns objects — URL strings need no `.url`)
- ✅ Deleted `app/assets/` directory

### 8. `'use client'` Audit
- ✅ Added `'use client'` to all 17 landing components that use Framer Motion, hooks, or browser APIs
- ✅ `motion.tsx`, `decor.tsx`, `Hero.tsx`, `FinalCTA.tsx`, `Testimonials.tsx`, `Process.tsx`, `Portfolio.tsx`, `Team.tsx`, `TrustedPartners.tsx`, `TechStack.tsx`, `MeetPartner.tsx`, `Industries.tsx`, `FloatingContact.tsx`, `FAQ.tsx`, `CinematicEntry.tsx`, `Awesoop.tsx`, `Awards.tsx`

### 9. Build Verification
- ✅ `npm run build` passes — all 7 routes compile successfully
- ✅ Static pages: `/`, `/about`, `/contact`, `/services`, `/solutions`, `/_not-found`
- ✅ Dynamic page: `/services/[slug]`

---

## Remaining

### ⚠️ 1. CSS/Tailwind Verification
- Removed `source(none)` and `@source "../src"` from `styles.css`
- Need to visually verify Tailwind v4 content scanning works correctly with Next.js (`npm run dev`)

---

## Vite → Next.js Quick Reference

| Vite | Next.js |
|---|---|
| `import.meta.env.MODE` | `process.env.NODE_ENV` |
| `import.meta.env.PROD` | `process.env.NODE_ENV === 'production'` |
| `import.meta.env.DEV` | `process.env.NODE_ENV !== 'production'` |
| `VITE_*` env prefix | `NEXT_PUBLIC_*` |
| `import img from './x.png'` → string | `import img from './x.png'` → `{src, width, height}` |
| `<img src={img} />` | `<img src={img.src} />` or `<Image src={img} />` |
| `index.html` | `app/layout.tsx` |
| `main.tsx` | `app/page.tsx` |

---

## Next Steps After Migration Works
- Optimize images with Next.js `<Image>` component
- Optimize fonts with `next/font`
- Add Next.js ESLint config
- Adopt SSR/SSG per page (move data fetching to server components)
- Add loading states with `loading.tsx` files
