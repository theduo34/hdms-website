/**
 * Gallery API — reads from Supabase.
 *
 * All functions return the same shapes as before so hooks and components
 * stay unchanged. Images will show as placeholders until photos are uploaded
 * to Supabase Storage and storage_path is set on each media_assets row.
 */

import { createClient } from '@/lib/supabase/client'
import { getMediaUrl } from '@/lib/media'
import {
    PAGE_SIZE,
    type GalleryItem,
    type GalleryPhoto,
    type GalleryVideo,
    type GalleryEvent,
    type MainCategory,
    type SubCategory,
    type PhotoSub,
    type VideoSub,
    type EventSub,
} from './gallery'

// ---------- public result types ----------

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

// ---------- internal helpers ----------

/** Unpack Supabase embedded rows — can come back as object, array, or null. */
function pick<T>(v: T | T[] | null | undefined): T | undefined {
    if (!v) return undefined
    return Array.isArray(v) ? v[0] : v
}

type MediaCategoryDomain = 'gallery_photos' | 'gallery_videos' | 'gallery_events'

/** Resolve a sub-category slug to its UUID; null means "all". */
async function resolveCategoryId(domain: MediaCategoryDomain, slug: string): Promise<string | null> {
    if (slug === 'all') return null
    const db = createClient()
    const result = await db
        .from('media_categories')
        .select('id')
        .eq('domain', domain)
        .eq('slug', slug)
        .single()
    const row = result.data as { id: string } | null
    return row?.id ?? null
}

// ---------- photos ----------

async function fetchPhotos(sub: PhotoSub, page: number): Promise<GalleryPageResult> {
    const db = createClient()
    const limit = PAGE_SIZE.photos
    const from = (page - 1) * limit
    const to   = from + limit - 1

    const categoryId = await resolveCategoryId('gallery_photos', sub)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = db
        .from('gallery_photos')
        .select(
            'id, created_at,' +
            'asset:media_assets(storage_path, alt, title, width, height),' +
            'category:media_categories(slug)',
            { count: 'exact' },
        )
        .order('sort_order', { ascending: true })
        .range(from, to)

    if (categoryId) query = query.eq('category_id', categoryId)

    const { data, count, error } = await query
    if (error) throw error

    const items: GalleryPhoto[] = (data ?? []).map((row: Record<string, unknown>) => {
        const asset = pick(row.asset as { storage_path: string | null; alt: string; title: string | null; width: number | null; height: number | null } | null)
        const cat   = pick(row.category as { slug: string } | null)
        return {
            id: row.id as string,
            type: 'photos' as const,
            subCategory: (cat?.slug ?? 'events') as PhotoSub,
            src:       getMediaUrl(asset?.storage_path),
            alt:       asset?.alt ?? '',
            title:     asset?.title ?? asset?.alt ?? '',
            createdAt: (row.created_at as string).slice(0, 10),
            width:     asset?.width  ?? 1200,
            height:    asset?.height ?? 800,
        }
    })

    const total = count ?? 0
    return { items, total, hasMore: total > page * limit }
}

// ---------- videos ----------

async function fetchVideos(sub: VideoSub, page: number): Promise<GalleryPageResult> {
    const db = createClient()
    const limit = PAGE_SIZE.videos
    const from = (page - 1) * limit
    const to   = from + limit - 1

    const categoryId = await resolveCategoryId('gallery_videos', sub)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = db
        .from('gallery_videos')
        .select(
            'id, title, alt, video_url, duration, width, height, created_at,' +
            'thumbnail:media_assets(storage_path),' +
            'category:media_categories(slug)',
            { count: 'exact' },
        )
        .order('created_at', { ascending: false })
        .range(from, to)

    if (categoryId) query = query.eq('category_id', categoryId)

    const { data, count, error } = await query
    if (error) throw error

    const items: GalleryVideo[] = (data ?? []).map((row: Record<string, unknown>) => {
        const thumb = pick(row.thumbnail as { storage_path: string | null } | null)
        const cat   = pick(row.category  as { slug: string } | null)
        return {
            id:          row.id as string,
            type:        'videos' as const,
            subCategory: (cat?.slug ?? 'events') as VideoSub,
            thumbnail:   getMediaUrl(thumb?.storage_path),
            alt:         row.alt as string,
            title:       row.title as string,
            createdAt:   (row.created_at as string).slice(0, 10),
            duration:    (row.duration as string | null) ?? '',
            videoUrl:    row.video_url as string,
            width:       (row.width  as number | null) ?? 1200,
            height:      (row.height as number | null) ?? 675,
        }
    })

    const total = count ?? 0
    return { items, total, hasMore: total > page * limit }
}

// ---------- events ----------

async function fetchEvents(sub: EventSub, page: number): Promise<GalleryPageResult> {
    const db = createClient()
    const limit = PAGE_SIZE.events
    const from = (page - 1) * limit
    const to   = from + limit - 1

    const categoryId = await resolveCategoryId('gallery_events', sub)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = db
        .from('gallery_events')
        .select(
            'id, title, description, event_date, photo_count, video_count,' +
            'cover:media_assets(storage_path, alt, width, height),' +
            'category:media_categories(slug)',
            { count: 'exact' },
        )
        .order('event_date', { ascending: false })
        .range(from, to)

    if (categoryId) query = query.eq('category_id', categoryId)

    const { data, count, error } = await query
    if (error) throw error

    const items: GalleryEvent[] = (data ?? []).map((row: Record<string, unknown>) => {
        const cover = pick(row.cover as { storage_path: string | null; alt: string; width: number | null; height: number | null } | null)
        const cat   = pick(row.category as { slug: string } | null)
        return {
            id:          row.id as string,
            type:        'events' as const,
            subCategory: (cat?.slug ?? 'special') as EventSub,
            coverImage:  getMediaUrl(cover?.storage_path),
            alt:         cover?.alt ?? (row.title as string),
            title:       row.title as string,
            eventDate:   row.event_date as string,
            description: (row.description as string | null) ?? '',
            photoCount:  row.photo_count as number,
            videoCount:  row.video_count as number,
            width:       cover?.width  ?? 1200,
            height:      cover?.height ?? 800,
        }
    })

    const total = count ?? 0
    return { items, total, hasMore: total > page * limit }
}

// ---------- public functions ----------

/**
 * Fetch a single page of gallery items from Supabase.
 * Signature identical to the old static version — hooks stay unchanged.
 */
export async function fetchGalleryPage(
    main: MainCategory,
    sub: SubCategory,
    page: number,
): Promise<GalleryPageResult> {
    if (main === 'photos') return fetchPhotos(sub as PhotoSub, page)
    if (main === 'videos') return fetchVideos(sub as VideoSub, page)
    return fetchEvents(sub as EventSub, page)
}

/**
 * Filter already-loaded gallery items by a search query.
 *
 * Accepts the `items` array from `useGallery` and filters in-place —
 * no extra DB round-trip needed.  For a school dataset this is fast enough.
 *
 * Signature change from the old version: first arg is now `items`, not `main`.
 * Update the call-site in gallery-client.tsx accordingly.
 */
export function searchGallery(items: GalleryItem[], query: string): GalleryItem[] {
    const q = query.toLowerCase()
    return items.filter(item => {
        if (item.type === 'photos') return `${item.title} ${item.alt}`.toLowerCase().includes(q)
        if (item.type === 'videos') return `${item.title} ${item.alt}`.toLowerCase().includes(q)
        if (item.type === 'events') return `${item.title} ${item.description}`.toLowerCase().includes(q)
        return false
    })
}

/**
 * Fetch a single event album and its linked photos.
 */
export async function fetchEventAlbum(eventId: string): Promise<EventAlbumResult | null> {
    const db = createClient()

    type EvRow = { id: string; title: string; description: string | null; event_date: string; photo_count: number; video_count: number; cover: unknown; category: unknown }
    type LinkRow = { photo_id: string }

    // Fetch the event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const evResult: any = await db
        .from('gallery_events')
        .select(
            'id, title, description, event_date, photo_count, video_count,' +
            'cover:media_assets(storage_path, alt, width, height),' +
            'category:media_categories(slug)',
        )
        .eq('id', eventId)
        .single()

    if (evResult.error || !evResult.data) return null
    const evRow = evResult.data as unknown as EvRow

    const cover = pick(evRow.cover as { storage_path: string | null; alt: string; width: number | null; height: number | null } | null)
    const cat   = pick(evRow.category as { slug: string } | null)

    const event: GalleryEvent = {
        id:          evRow.id,
        type:        'events' as const,
        subCategory: (cat?.slug ?? 'special') as EventSub,
        coverImage:  getMediaUrl(cover?.storage_path),
        alt:         cover?.alt ?? evRow.title,
        title:       evRow.title,
        eventDate:   evRow.event_date,
        description: evRow.description ?? '',
        photoCount:  evRow.photo_count,
        videoCount:  evRow.video_count,
        width:       cover?.width  ?? 1200,
        height:      cover?.height ?? 800,
    }

    // Fetch photo IDs linked to this event (ordered)
    const linksResult = await db
        .from('gallery_event_photos')
        .select('photo_id')
        .eq('event_id', eventId)
        .order('sort_order', { ascending: true })

    const photoIds = ((linksResult.data ?? []) as unknown as LinkRow[]).map(l => l.photo_id)
    if (photoIds.length === 0) return { event, photos: [], total: event.photoCount }

    // Fetch the photos with their assets
    const photoResult = await db
        .from('gallery_photos')
        .select(
            'id, created_at,' +
            'asset:media_assets(storage_path, alt, title, width, height),' +
            'category:media_categories(slug)',
        )
        .in('id', photoIds)

    // Re-sort to match gallery_event_photos.sort_order
    const photoMap = new Map(
        ((photoResult.data ?? []) as unknown as Record<string, unknown>[]).map(p => [p.id as string, p]),
    )
    const photos: GalleryPhoto[] = photoIds
        .map(id => {
            const row = photoMap.get(id)
            if (!row) return null
            const asset = pick(row.asset as { storage_path: string | null; alt: string; title: string | null; width: number | null; height: number | null } | null)
            const pCat  = pick(row.category as { slug: string } | null)
            return {
                id:          row.id as string,
                type:        'photos' as const,
                subCategory: (pCat?.slug ?? 'events') as PhotoSub,
                src:         getMediaUrl(asset?.storage_path),
                alt:         asset?.alt ?? '',
                title:       asset?.title ?? asset?.alt ?? '',
                createdAt:   (row.created_at as string).slice(0, 10),
                width:       asset?.width  ?? 1200,
                height:      asset?.height ?? 800,
            }
        })
        .filter(Boolean) as GalleryPhoto[]

    return { event, photos, total: event.photoCount }
}
