import { Suspense } from 'react'
import { SmoothScroll } from "@/components/layout/smooth-scroll"
import GalleryClient from "@/features/gallery/gallery-client"

function GalleryFallback() {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="bg-muted h-[520px] animate-pulse" />
        </div>
    )
}

export function GalleryPage() {
    return (
        <main className="flex flex-col w-full min-h-screen">
            <SmoothScroll>
                <Suspense fallback={<GalleryFallback />}>
                    <GalleryClient />
                </Suspense>
            </SmoothScroll>
        </main>
    )
}
