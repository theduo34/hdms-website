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
- Experience cards on the home page link to about-us section anchors: `mission` → `#vision`, `community` → `#houses`, `boarding` → `#story`, `academics` → `#montessori`, `arts` → `#philosophy`

---

## Database & Storage (Supabase)

**Storage bucket:** `media` (single bucket for everything).

**Storage path conventions:**
```
gallery/events/{year}/filename
gallery/student-activities/{year}/filename
gallery/campus/{year}/filename
gallery/staff/{year}/filename
gallery/events/covers/filename   ← event cover photos only
news/filename
programmes/filename
staff/filename
```

**Three Supabase clients:**

| Client | File | When to use |
|--------|------|-------------|
| Browser (anon) | `src/lib/supabase/client.ts` | Client components needing auth state |
| Server (SSR cookie) | `src/lib/supabase/server.ts` | Server components, RSC auth checks |
| Service role | `src/lib/supabase/service.ts` | Admin API routes only — bypasses RLS |

**URL helpers (`src/lib/media.ts`):**
```ts
getMediaUrl(storagePath)            // always use for public image display
getTransformedMediaUrl(path, opts)  // Supabase Pro image transforms — DO NOT use on free plan
buildStoragePath(folder, year, filename)
```

If `NEXT_PUBLIC_SUPABASE_URL` is not set in Vercel env vars, all `getMediaUrl()` calls return relative paths — images break in production. `SUPABASE_SERVICE_ROLE_KEY` must also be set (server-only, never `NEXT_PUBLIC_`).

**Key tables (`src/lib/supabase/types.ts`):**

| Table | Purpose |
|-------|---------|
| `media_assets` | Every uploaded file — `storage_path`, `alt`, `title`, `width`, `height`, `mime_type`, `file_size`, `metadata` |
| `media_categories` | Category slugs + domain (`gallery_photos`, `gallery_videos`, `gallery_events`) |
| `gallery_photos` | Links asset → gallery + category |
| `gallery_videos` | Video entries (YouTube/Vimeo URLs or direct) |
| `gallery_events` | Event albums with cover photo, `photo_count`, `video_count` |
| `gallery_event_photos` | Join table: event → photos (photos here must NOT appear in the public Photos tab) |
| `news_posts` | Articles — `content: Array<{type: 'paragraph'|'pullquote', text}>` |
| `announcements` | Urgent/info notices with expiry |
| `academic_terms` | School term dates (`is_current` flag) |
| `calendar_events` | School calendar entries |
| `staff_members` | Staff profiles linked to a media asset |
| `admin_profiles` | Admin users with role (`super_admin`, `school_admin`, `support_admin`) |
| `admissions_faqs` | FAQ entries managed via admin |
| `school_settings` | Key-value store for site-wide settings |

**Gallery public API rule:** Photos that belong to a `gallery_event_photos` row must NOT appear in the public Photos tab (`/api/gallery?main=photos`). The route excludes them by fetching all linked `photo_id`s and calling `.not('id', 'in', '(...)')`.

---

## Admin Dashboard

**Route group:** `src/app/(admin)/admin/` — all routes protected by the admin layout which calls `getCurrentAdmin()` and redirects on failure.

**Three roles:**

| Role | Capabilities |
|------|-------------|
| `super_admin` | Full CRUD on all resources + manage all users |
| `school_admin` | Full CRUD on gallery/news/calendar/staff/faqs, read-only settings/users |
| `support_admin` | Create/read/update gallery/news/calendar, read-only everything else |

**Resources:** `gallery`, `news`, `calendar`, `staff`, `faqs`, `settings`, `users`

**Every admin API route starts with:**
```ts
const { admin, db, err, json } = await apiGuard(req, 'gallery', 'create')
if (err) return err
// db = service-role client (bypasses RLS)
// admin.profile.role = verified role
// json = typed NextResponse.json helper
```

See `src/lib/admin/api-guard.ts`, `src/lib/admin/permissions.ts`, `src/lib/admin/types.ts`.

---

## Upload Flow (Signed URL Pattern)

**Never send files through Next.js API routes** — Vercel has a ~4.5MB serverless body limit.

4-step flow (all wired in `src/features/admin/gallery/upload-helpers.ts`):
1. **Compress** — browser Canvas API resizes to max 2048px, converts to JPEG 85% (GIFs skip)
2. **Sign** — `POST /api/admin/gallery/upload/sign` → server checks auth + RBAC, generates signed Supabase upload URL
3. **Upload** — browser PUTs file directly to Supabase via signed URL (XHR for progress)
4. **Record** — `POST /api/admin/gallery/upload/record` → server inserts `media_assets` + `gallery_photos`, handles event linking

```ts
import { signAndUpload } from '@/features/admin/gallery/upload-helpers'

await signAndUpload({
  file,
  folder: 'gallery/events/2026',
  alt: 'Description',
  title: 'Title',
  categorySlug: 'events',
  categoryDomain: 'gallery_photos',
  eventId: 'uuid-here',       // optional — links photo to event album
  skipGalleryEntry: false,    // true = asset only, no gallery_photos row (for cover photos)
  onProgress: (p) => ...,
})
```

The old `/api/admin/gallery/upload` route is **retired — returns 410**. Do not use.

---

## Email (Resend)

Forms that send emails use the Resend API directly from API routes. Required env vars:
- `RESEND_API_KEY`
- `ADMISSIONS_EMAIL` — recipient for admissions applications
- `CONTACT_EMAIL` — recipient for general contact form submissions

Pattern: `POST https://api.resend.com/emails` from the API route, `from: "HDM <noreply@hdm.edu.gh>"`.

---

## All Images Use `unoptimized`

Gallery `<Image>` components use `unoptimized` — this bypasses the Next.js image optimizer so images load directly from the Supabase CDN. This avoids timeouts on large files. Always use `getMediaUrl(storagePath)` to build the URL.

`next.config.ts` remotePatterns uses a broad Supabase pattern: `pathname: "/storage/v1/**"` (covers both `object` and `render` paths).