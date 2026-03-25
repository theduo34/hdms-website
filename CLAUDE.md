# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Heaven's Dew Montessori (HDM) school website — Koforidua, Ghana. Built with Next.js App Router + React 19 + TypeScript.

## Commands

**Package manager: Bun**

```bash
bun dev          # Start development server
bun build        # Production build
bun start        # Start production server
bun lint         # Run ESLint
bun add-component # Add shadcn/ui component (e.g. bun add-component button)
```

No tests are configured in this project.

## Architecture

### Folder conventions

| Folder | Purpose |
|--------|---------|
| `src/app/` | Route segments (App Router). Each folder = a page route. |
| `src/components/layout/` | Site-wide layout: NavBar, Footer, SmoothScroll |
| `src/components/pages/<page>/` | Page-level composition components that wire features together |
| `src/components/shared/` | Reusable presentational atoms (buttons, labels, animations) |
| `src/components/ui/` | shadcn/ui primitives — do not edit manually, use `bun add-component` |
| `src/features/<page>/` | Feature modules: data files (`.ts`) + section-level components |
| `src/lib/` | Utilities: `utils.ts` (cn helper), `jsonLd.ts`, `faqSchema.ts`, `api.ts` |
| `src/provider/` | React context providers (MotionProvider wraps the whole app) |
| `src/hooks/` | Custom hooks (`use-mobile.ts`) |
| `src/styles/` | Font configuration |

### Data pattern

All page content is currently **static data** defined in `src/features/<page>/<page>.ts` files (e.g. `src/features/about-us/about.ts`). These export typed objects/arrays that section components import directly. `src/lib/api.ts` contains a commented-out fetch layer for future CMS integration via Strapi (`light-cat-97ad52f04d.media.strapiapp.com`) and the school's own API (`api.hdm.edu.gh`). Images are served from Cloudinary (`res.cloudinary.com/dmd0h8mzp`).

### Root layout

`src/app/layout.tsx` wraps everything in: `MotionProvider → <main> → NavBar → {children} → Footer`. JSON-LD structured data (Organization + FAQ schemas) is injected in `<head>`.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **shadcn/ui** (New York style, neutral base, CSS variables) — config in `components.json`
- Use the `cn()` utility from `@/lib/utils` to merge Tailwind classes
- Path alias `@/` maps to `src/`

### Fonts

Three fonts loaded via `next/font/google` in root layout:
- `--font-geist-sans` — Geist Sans (primary sans-serif)
- `--font-geist-mono` — Geist Mono
- `--font-crimson-pro` — Crimson Pro (serif, used for editorial headings)

### Animation

`motion` library (Framer Motion successor) via `MotionProvider` in `src/provider/motion-provider.tsx`. Lenis (`lenis`) provides smooth scroll. `src/components/shared/animate-in-view.tsx` is the reusable scroll-triggered wrapper.

### SEO

Each route defines `export const metadata` for page-specific meta. Root layout sets site-wide defaults with an `%s | Heaven's Dew Montessori` title template. `src/app/sitemap.ts` and `src/app/robots.ts` are auto-generated. `src/app/opengraph-image.tsx` generates OG images.

### React Compiler

`reactCompiler: true` is enabled in `next.config.ts` — avoid manual `useMemo`/`useCallback` optimisations unless profiling shows a real need.