'use client'

import { useReducer, useEffect } from 'react'
import { fetchEventAlbum, type EventAlbumResult } from '@/features/gallery/gallery-api'

type State = {
    data: EventAlbumResult | null
    loading: boolean
    notFound: boolean
}

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_DONE'; data: EventAlbumResult }
    | { type: 'NOT_FOUND' }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { data: null, loading: true, notFound: false }
        case 'FETCH_DONE':
            return { data: action.data, loading: false, notFound: false }
        case 'NOT_FOUND':
            return { data: null, loading: false, notFound: true }
    }
}

export function useGalleryEvent(eventId: string) {
    const [state, dispatch] = useReducer(reducer, {
        data: null,
        loading: true,
        notFound: false,
    })

    useEffect(() => {
        let cancelled = false
        dispatch({ type: 'FETCH_START' })

        fetchEventAlbum(eventId).then(result => {
            if (cancelled) return
            if (!result) dispatch({ type: 'NOT_FOUND' })
            else dispatch({ type: 'FETCH_DONE', data: result })
        })

        return () => { cancelled = true }
    }, [eventId])

    return state
}
