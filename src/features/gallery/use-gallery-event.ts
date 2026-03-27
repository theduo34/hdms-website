'use client'

import { useState, useEffect } from 'react'
import { fetchEventAlbum, type EventAlbumResult } from './gallery-api'

export function useGalleryEvent(eventId: string) {
    const [data, setData] = useState<EventAlbumResult | null>(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setData(null)
        setNotFound(false)

        fetchEventAlbum(eventId).then(result => {
            if (cancelled) return
            if (!result) setNotFound(true)
            else setData(result)
            setLoading(false)
        })

        return () => { cancelled = true }
    }, [eventId])

    return { data, loading, notFound }
}
