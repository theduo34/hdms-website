import type { Metadata } from 'next'
import { dummyEvents } from '@/features/gallery/gallery'
import { GalleryEventAlbum } from '@/features/gallery/gallery-event-album'
import { SmoothScroll } from '@/components/layout/smooth-scroll'

export function generateStaticParams() {
    return dummyEvents.map(e => ({ id: e.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const event = dummyEvents.find(e => e.id === id)
    if (!event) return { title: 'Event Not Found' }
    return {
        title: event.title,
        description: event.description,
        openGraph: {
            title: event.title,
            description: event.description,
            images: [{ url: event.coverImage }],
            url: `https://www.hdm.edu.gh/gallery/events/${id}`,
        },
        twitter: {
            title: event.title,
            description: event.description,
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
