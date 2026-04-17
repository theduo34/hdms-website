import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { GalleryEventAlbum } from '@/features/gallery/gallery-event-album'
import { SmoothScroll } from '@/components/layout/smooth-scroll'

// Anon client — safe for public read, no cookies needed at build time
function getDb() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
}

export async function generateStaticParams() {
    const { data } = await getDb().from('gallery_events').select('id')
    return (data ?? []).map(e => ({ id: e.id as string }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const { data } = await getDb()
        .from('gallery_events')
        .select('title, description')
        .eq('id', id)
        .single()

    if (!data) return { title: 'Event Not Found' }
    const row = data as { title: string; description: string | null }
    return {
        title: row.title,
        description: row.description ?? undefined,
        openGraph: {
            title:       row.title,
            description: row.description ?? undefined,
            url:         `https://www.hdm.edu.gh/gallery/events/${id}`,
        },
        twitter: {
            title:       row.title,
            description: row.description ?? undefined,
        },
    }
}

export default async function EventAlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <main className="flex flex-col w-full min-h-screen">
            <SmoothScroll>
                <GalleryEventAlbum eventId={id} />
            </SmoothScroll>
        </main>
    )
}
