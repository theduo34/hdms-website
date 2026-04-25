'use client'

import { useReducer, useEffect } from 'react'
import { fetchEventAlbum, type EventAlbumResult } from '@/features/gallery/gallery-api'
import type { GalleryEvent, GalleryPhoto } from '@/features/gallery/gallery'

const PAGE_LIMIT = 10

type State = {
    event:       GalleryEvent | null
    photos:      GalleryPhoto[]
    total:       number
    hasMore:     boolean
    page:        number
    loading:     boolean
    loadingMore: boolean
    notFound:    boolean
}

type Action =
    | { type: 'INIT_START' }
    | { type: 'INIT_DONE'; data: EventAlbumResult }
    | { type: 'MORE_START' }
    | { type: 'MORE_DONE'; photos: GalleryPhoto[]; hasMore: boolean }
    | { type: 'NOT_FOUND' }

const initialState: State = {
    event:       null,
    photos:      [],
    total:       0,
    hasMore:     false,
    page:        1,
    loading:     true,
    loadingMore: false,
    notFound:    false,
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'INIT_START':
            return { ...initialState, loading: true }
        case 'INIT_DONE':
            return {
                ...state,
                event:    action.data.event,
                photos:   action.data.photos,
                total:    action.data.total,
                hasMore:  action.data.hasMore,
                page:     1,
                loading:  false,
                notFound: false,
            }
        case 'MORE_START':
            return { ...state, loadingMore: true }
        case 'MORE_DONE':
            return {
                ...state,
                photos:      [...state.photos, ...action.photos],
                hasMore:     action.hasMore,
                page:        state.page + 1,
                loadingMore: false,
            }
        case 'NOT_FOUND':
            return { ...state, loading: false, loadingMore: false, notFound: true }
    }
}

export function useGalleryEvent(eventId: string) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        let cancelled = false
        dispatch({ type: 'INIT_START' })

        fetchEventAlbum(eventId, 1, PAGE_LIMIT).then(result => {
            if (cancelled) return
            if (!result) dispatch({ type: 'NOT_FOUND' })
            else dispatch({ type: 'INIT_DONE', data: result })
        })

        return () => { cancelled = true }
    }, [eventId])

    function loadMore() {
        if (state.loadingMore || !state.hasMore) return
        const nextPage = state.page + 1
        dispatch({ type: 'MORE_START' })

        fetchEventAlbum(eventId, nextPage, PAGE_LIMIT).then(result => {
            if (!result) return
            dispatch({ type: 'MORE_DONE', photos: result.photos, hasMore: result.hasMore })
        })
    }

    return { ...state, loadMore }
}
