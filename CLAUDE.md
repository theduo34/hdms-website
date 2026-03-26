# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Heaven's Dew Montessori (HDM) school website — Koforidua, Ghana. Built with Next.js App Router + React 19 + TypeScript.

## Commands

**Package manager: Bun**

```bash
bun dev           # Start development server
bun build         # Production build
bun start         # Start production server
bun lint          # Run ESLint
bun add-component # Add shadcn/ui component (e.g. bun add-component button)
```

No tests are configured in this project.

---

## Architecture

### Folder conventions

| Folder | Purpose |
|--------|---------|
| `src/app/` | Route segments (App Router). Each folder = a page route. |
| `src/components/layout/` | Site-wide layout: NavBar, Footer, SmoothScroll, SchoolLogo |
| `src/components/pages/<page>/` | Page-level composition components that wire features together |
| `src/components/shared/` | Reusable presentational atoms (AnimateInView, CTAButton, HDMLetters, SectionLabel, CarouselButton, social icons) |
| `src/components/ui/` | shadcn/ui primitives — **do not edit manually**, use `bun add-component` |
| `src/features/<page>/` | Feature modules: data files (`.ts`) + section-level components |
| `src/lib/` | Utilities: `utils.ts` (cn helper), `jsonLd.ts`, `faqSchema.ts`, `api.ts` |
| `src/provider/` | React context providers (`MotionProvider` wraps the whole app) |
| `src/hooks/` | Custom hooks (`use-mobile.ts`) |
| `src/styles/` | Font helper (`font.ts` exports `headingStyle`) |

### Data pattern

All page content is **static data** defined in `src/features/<page>/<page>.ts` files (e.g. `src/features/about-us/about.ts`). Section components import directly from these files. `src/lib/api.ts` is a placeholder for future CMS integration via the school's API (`api.hdm.edu.gh`). Images are served from Cloudinary (`res.cloudinary.com/dmd0h8mzp`).

### Root layout

`src/app/layout.tsx` wraps everything in:

```
MotionProvider → NavBar → {children} → Footer
```

JSON-LD structured data (Organization + FAQ schemas) is injected in `<head>`. **There is no `<main>` in the layout** — each page component owns its own `<main>` tag (e.g. `about-us-page.tsx`, `home-page.tsx`). Never add a `<main>` back to the layout; it would create nested `<main>` elements which are invalid HTML.

---

## Design System

### Colour tokens

| Token | Usage |
|-------|-------|
| `bg-primary` / `text-primary` | Dark navy — main dark background, headings on light |
| `bg-secondary` / `text-secondary` | Golden yellow — accent, highlights, active indicators |
| `text-primary-foreground` | White text on dark navy |
| `text-secondary-foreground` | Dark text on yellow |
| `bg-muted` | Subtle grey card background |
| `text-foreground/60` | Muted body copy |

### Heading style (serif)

Always use `headingStyle` from `@/styles/font` for bold italic serif headings — **never** write inline `fontFamily` strings:

```tsx
import { headingStyle } from "@/styles/font";

<h2 style={headingStyle}>Our Story</h2>

// When combined with other inline styles:
<span style={{ color: house.bgColor, ...headingStyle }}>One Family.</span>
```

`headingStyle` = `{ fontFamily: "'Georgia', 'Times New Roman', serif" }`

### CSS utility classes (globals.css)

These classes exist for shared patterns — use them instead of repeating Tailwind:

| Class | Purpose |
|-------|---------|
| `.section` | Full section padding (py-16 md:py-24) |
| `.section-half` | Reduced section padding (py-10 md:py-14) |
| `.section-left` | Max-width, left-aligned section content |
| `.section-header` | Large section heading size |
| `.section-tag` | Small label row (icon + uppercase text) — flex items-center gap-3 mb-8 |
| `.about-heading` | Giant italic serif heading for About page sections |
| `.num-row` | Numbered list row with hover reveal (used for values/principles lists) |

### HDMLetters watermark

Use `<HDMLetters>` at `opacity-[0.04]` as a background watermark in dark sections. Pass `variant="centered"` for full-bleed display.

### AnimateInView

Scroll-triggered reveal wrapper — use `yOffset`, `xOffset`, `duration`, `delay` props. Prefer this over manual `useInView` + `motion.div` combinations.

### SectionLabel

Centred uppercase label with decorative lines. Use for section openers on the home page. The About page uses `.section-tag` (a left-aligned alternative) instead.

---

## Styling rules

- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **shadcn/ui** (New York style, neutral base, CSS variables) — config in `components.json`
- Use `cn()` from `@/lib/utils` to conditionally merge Tailwind classes — avoid template-string class concatenation
- Path alias `@/` maps to `src/`
- Use `clamp()` for fluid typography: `fontSize: 'clamp(2rem, 5vw, 4rem)'`

---

## Fonts

Three fonts loaded via `next/font/google` in root layout:

- `--font-geist-sans` — Geist Sans (primary sans-serif, body text)
- `--font-geist-mono` — Geist Mono
- `--font-crimson-pro` — Crimson Pro (editorial serif via CSS variable)

For bold italic display headings, use `headingStyle` (Georgia fallback stack) — not Crimson Pro.

---

## Animation

- `motion` library (Framer Motion v11 successor) via `MotionProvider` in `src/provider/motion-provider.tsx`
- Lenis (`lenis`) provides smooth scroll — it uses **window-based scrolling**, so `position: sticky` works correctly as long as no ancestor has `overflow: hidden`
- Standard easing: `[0.16, 1, 0.3, 1]` (spring-like ease-out)
- `AnimateInView` in `src/components/shared/animate-in-view.tsx` is the reusable scroll-reveal wrapper

**Important:** Never add `overflow: hidden` to a scroll container or any ancestor of a sticky element — it creates a new scroll context and breaks `position: sticky`.

---

## SEO & Accessibility

- Each route exports `const metadata: Metadata` for page-specific titles/descriptions
- Root layout sets site-wide defaults with `%s | Heaven's Dew Montessori` title template
- `src/app/sitemap.ts` and `src/app/robots.ts` are auto-generated — keep sitemap URLs in sync with actual `src/app/` route folders
- `src/app/opengraph-image.tsx` generates OG images
- `lang="en-GH"` on `<html>` for Ghana English locale
- Use one `<h1>` per page — never two sibling `<h1>` tags
- All interactive elements need `aria-label` or visible label text
- Use semantic HTML: `<section aria-labelledby>`, `<nav aria-label>`, `<button>` (not `<div onClick>`)
- External links must have `target="_blank" rel="noopener noreferrer"`

---

## Images

- Use `next/image` for all images
- Above-fold / LCP images: add `priority` prop
- All other images: use `loading="lazy"` (default) — **do not add `priority` to carousel or off-screen images**
- Always provide a `sizes` prop that matches the rendered layout size
- Cloudinary images: use transformation params (`c_limit,w_400`) in the URL to control delivery size

---

## Performance

- **React Compiler** is enabled (`reactCompiler: true` in `next.config.ts`) — avoid manual `useMemo`/`useCallback` unless profiling shows a real need
- Prefer server components by default; only add `"use client"` when the component uses hooks, browser APIs, or event handlers
- Don't import client-heavy libraries (e.g. `motion`) into server components

---

## Known route notes

- The school calendar page lives at `/calender` (typo in folder name — do not rename without updating all imports and the sitemap)
- The news page route is `/news-&-announcements` (ampersand in URL — this is intentional)
- Admissions sub-routes: `/admissions/apply`, `/admissions/tuition`, `/admissions/visit-campus`