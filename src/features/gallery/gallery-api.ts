/**
 * Gallery API layer.
 *
 * All functions match the shape of the real HDM API endpoints.
 * To switch to production data, replace each function body with
 * the commented fetch call — the hooks and components stay unchanged.
 *
 * Real API base: https://api.hdm.edu.gh
 */

import {
    dummyPhotos,
    dummyVideos,
    dummyEvents,
    PAGE_SIZE,
    type GalleryItem,
    type GalleryPhoto,
    type GalleryVideo,
    type GalleryEvent,
    type MainCategory,
    type SubCategory,
} from './gallery'

// ---------- types ----------

export interface GalleryPageResult {
    items: GalleryItem[]
    total: number
    hasMore: boolean
}

export interface EventAlbumResult {
    event: GalleryEvent
    photos: GalleryPhoto[]
    total: number
}

// ---------- helpers (internal) ----------

function sourceFor(main: MainCategory): GalleryItem[] {
    if (main === 'photos') return dummyPhotos
    if (main === 'videos') return dummyVideos
    return dummyEvents
}

function filtered(items: GalleryItem[], sub: SubCategory): GalleryItem[] {
    return sub === 'all' ? items : items.filter(i => i.subCategory === sub)
}

function sim(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms))
}

// ---------- public API ----------

/**
 * Fetch a single page of gallery items.
 *
 * Production swap:
 *   const res = await fetch(
 *     `https://api.hdm.edu.gh/gallery?type=${main}&sub=${sub}&page=${page}&limit=${PAGE_SIZE[main]}`
 *   )
 *   return res.json()
 */
export async function fetchGalleryPage(
    main: MainCategory,
    sub: SubCategory,
    page: number,
): Promise<GalleryPageResult> {
    await sim(page === 1 ? 550 : 400)

    const limit = PAGE_SIZE[main]
    const all = filtered(sourceFor(main), sub)
    return {
        items: all.slice(0, page * limit),
        total: all.length,
        hasMore: all.length > page * limit,
    }
}

/**
 * Search across all items in the given main category.
 * Runs synchronously on the client against already-loaded data.
 *
 * Production swap:
 *   const res = await fetch(`https://api.hdm.edu.gh/gallery/search?type=${main}&q=${query}`)
 *   return res.json()
 */
export function searchGallery(main: MainCategory, query: string): GalleryItem[] {
    const q = query.toLowerCase()
    if (main === 'photos') {
        return (dummyPhotos as GalleryPhoto[]).filter(
            p => p.title.toLowerCase().includes(q) || p.alt.toLowerCase().includes(q),
        )
    }
    if (main === 'videos') {
        return (dummyVideos as GalleryVideo[]).filter(
            v => v.title.toLowerCase().includes(q) || v.alt.toLowerCase().includes(q),
        )
    }
    return (dummyEvents as GalleryEvent[]).filter(
        e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
    )
}

/**
 * Fetch a single event and its photo album.
 *
 * Production swap:
 *   const res = await fetch(`https://api.hdm.edu.gh/gallery/events/${eventId}`)
 *   if (!res.ok) return null
 *   return res.json()
 */
export async function fetchEventAlbum(eventId: string): Promise<EventAlbumResult | null> {
    await sim(450)

    const event = dummyEvents.find(e => e.id === eventId)
    if (!event) return null

    // In production the API returns event-specific photos.
    // Dummy: show all photos tagged to the 'events' sub-category.
    const photos = dummyPhotos.filter(p => p.subCategory === 'events')
    return { event, photos, total: event.photoCount }
}
