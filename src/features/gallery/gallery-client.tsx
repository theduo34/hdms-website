'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { GalleryHeader } from './gallery-header'
import { GalleryFilterBar } from './gallery-filter-bar'
import { GalleryPhotos } from './gallery-photos'
import { GalleryVideos } from './gallery-videos'
import { GalleryEvents } from './gallery-events'
import { GalleryLightbox, type LightboxItem } from './gallery-lightbox'
import { useGallery } from '@/hooks/gallery/use-gallery'
import { searchGallery, fetchGalleryCounts, type GalleryCounts } from './gallery-api'
import {
    subFilters,
    type MainCategory, type SubCategory,
    type GalleryPhoto, type GalleryVideo, type GalleryEvent,
} from './gallery'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { headingStyle } from '@/styles/font'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const VALID_MAINS = new Set<MainCategory>(['photos', 'videos', 'events'])

function resolveMain(raw: string | null): MainCategory {
    return VALID_MAINS.has(raw as MainCategory) ? (raw as MainCategory) : 'photos'
}

function resolveSub(raw: string | null): SubCategory {
    if (!raw || raw === 'all') return 'all'
    return raw as SubCategory
}

export default function GalleryClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [activeMain, setActiveMain] = useState<MainCategory>(() => resolveMain(searchParams.get('tab')))
    const [activeSub, setActiveSub] = useState<SubCategory>(() => resolveSub(searchParams.get('filter')))
    const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null)
    const [isSearchMode, setIsSearchMode] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [counts, setCounts] = useState<GalleryCounts>({ photos: 0, videos: 0, events: 0 })

    useEffect(() => {
        fetchGalleryCounts().then(setCounts).catch(() => {})
    }, [])

    const { items, total, loading, loadingMore, hasMore, loadMore } = useGallery(activeMain, activeSub)

    const updateUrl = useCallback((tab: MainCategory, filter: SubCategory) => {
        const params = new URLSearchParams()
        params.set('tab', tab)
        if (filter !== 'all') params.set('filter', filter)
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, [router, pathname])

    const handleMainChange = useCallback((main: MainCategory) => {
        setActiveMain(main)
        setActiveSub('all')
        setLightboxItem(null)
        setIsSearchMode(false)
        setSearchTerm('')
        updateUrl(main, 'all')
    }, [updateUrl])

    const handleSubChange = useCallback((sub: SubCategory) => {
        setActiveSub(sub)
        setLightboxItem(null)
        updateUrl(activeMain, sub)
    }, [activeMain, updateUrl])

    const handleSearchToggle = useCallback(() => {
        setIsSearchMode(prev => !prev)
        if (isSearchMode) setSearchTerm('')
    }, [isSearchMode])

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term)
    }, [])

    const openLightbox = useCallback((item: LightboxItem) => setLightboxItem(item), [])
    const closeLightbox = useCallback(() => setLightboxItem(null), [])

    const goPrev = useCallback(() => {
        if (!lightboxItem) return
        const list = displayItems as LightboxItem[]
        const idx = list.findIndex(p => p.id === lightboxItem.id)
        if (idx > 0) setLightboxItem(list[idx - 1])
    }, [lightboxItem, items]) // eslint-disable-line react-hooks/exhaustive-deps

    const goNext = useCallback(() => {
        if (!lightboxItem) return
        const list = displayItems as LightboxItem[]
        const idx = list.findIndex(p => p.id === lightboxItem.id)
        if (idx < list.length - 1) setLightboxItem(list[idx + 1])
    }, [lightboxItem, items]) // eslint-disable-line react-hooks/exhaustive-deps

    const currentSubFilters = subFilters[activeMain].map((f: { id: SubCategory; label: string }) => ({
        ...f,
        count: f.id === 'all' ? total : undefined,
    }))

    const isSearchActive = isSearchMode && searchTerm.trim().length > 0
    const displayItems = isSearchActive ? searchGallery(items, searchTerm) : items

    return (
        <>
            <GalleryHeader activeMain={activeMain} onMainChange={handleMainChange} counts={counts} />

            <GalleryFilterBar
                active={activeSub}
                filters={currentSubFilters}
                onChange={handleSubChange}
                isSearchMode={isSearchMode}
                onSearchToggle={handleSearchToggle}
                searchTerm={searchTerm}
                onSearch={handleSearch}
            />

            <div className="w-full mx-auto px-16 max-lg:px-4 pt-12 pb-20">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                        <span className="text-[10px] tracking-[0.3em] font-bold uppercase">
                            {isSearchActive ? (
                                <>Results for &ldquo;{searchTerm}&rdquo;</>
                            ) : (
                                <>
                                    {activeMain === 'photos' && 'Photographs'}
                                    {activeMain === 'videos' && 'Video Library'}
                                    {activeMain === 'events' && 'Event Albums'}
                                    {activeSub !== 'all' && (
                                        <span className="text-muted-foreground font-normal">
                                            {' · '}{currentSubFilters.find(f => f.id === activeSub)?.label}
                                        </span>
                                    )}
                                </>
                            )}
                        </span>
                    </div>
                    {(!loading || isSearchActive) && (
                        <span className="text-[0.6rem] tracking-[0.12em] uppercase text-muted-foreground">
                            {displayItems.length}{!isSearchActive && ` of ${total}`}
                        </span>
                    )}
                </div>

                {activeMain === 'photos' && (
                    <GalleryPhotos
                        photos={displayItems as GalleryPhoto[]}
                        loading={loading && !isSearchActive}
                        loadingMore={loadingMore}
                        hasMore={hasMore && !isSearchActive}
                        total={isSearchActive ? displayItems.length : total}
                        onOpen={openLightbox}
                        onLoadMore={loadMore}
                    />
                )}

                {activeMain === 'videos' && (
                    <GalleryVideos
                        videos={displayItems as GalleryVideo[]}
                        loading={loading && !isSearchActive}
                        loadingMore={loadingMore}
                        hasMore={hasMore && !isSearchActive}
                        total={isSearchActive ? displayItems.length : total}
                        onOpen={openLightbox}
                        onLoadMore={loadMore}
                    />
                )}

                {activeMain === 'events' && (
                    <GalleryEvents
                        events={displayItems as GalleryEvent[]}
                        loading={loading && !isSearchActive}
                        loadingMore={loadingMore}
                        hasMore={hasMore && !isSearchActive}
                        total={isSearchActive ? displayItems.length : total}
                        onLoadMore={loadMore}
                    />
                )}
            </div>

            <section
                className="w-full bg-secondary py-20 px-16 max-lg:px-4 relative overflow-hidden"
                aria-label="Follow us on social media"
            >
                <span
                    className="absolute -right-4 bottom-0 font-black italic leading-none text-secondary-foreground/[0.05] pointer-events-none select-none"
                    style={{ ...headingStyle, fontSize: '20rem' }}
                    aria-hidden
                >
                    @
                </span>
                <div className="max-w-[var(--max-width,1400px)] mx-auto relative">
                    <AnimateInView yOffset={20} duration={0.8}>
                        <div className="flex items-center gap-3 mb-8">
                            <span className="block w-4 h-px bg-secondary-foreground/40 shrink-0" aria-hidden />
                            <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary-foreground/60">
                                Follow Along
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h2
                                    className="font-black italic text-secondary-foreground leading-[0.95] mb-4"
                                    style={{ ...headingStyle, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                                >
                                    More on
                                    <br />
                                    <span className="text-secondary-foreground/50">@hdm_school</span>
                                </h2>
                                <p className="text-[0.88rem] font-light leading-[1.8] max-w-[380px] text-secondary-foreground/70">
                                    Follow us on Instagram for stories, reels and behind-the-scenes
                                    moments from inside Heaven&apos;s Dew Montessori.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 bg-secondary-foreground text-secondary text-[0.68rem] font-bold tracking-[0.14em] uppercase px-6 py-3.5 hover:bg-secondary-foreground/90 transition-colors duration-200"
                                    aria-label="Follow HDM on Instagram"
                                >
                                    Follow on Instagram
                                </a>
                                <Link
                                    href="/news-&-announcements"
                                    className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.14em] uppercase text-secondary-foreground/50 hover:text-secondary-foreground transition-all duration-200 hover:gap-3"
                                >
                                    Read our news
                                    <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                                </Link>
                            </div>
                        </div>
                    </AnimateInView>
                </div>
            </section>

            {(activeMain === 'photos' || activeMain === 'videos') && (
                <GalleryLightbox
                    item={lightboxItem}
                    items={displayItems as LightboxItem[]}
                    onClose={closeLightbox}
                    onPrev={goPrev}
                    onNext={goNext}
                />
            )}
        </>
    )
}
