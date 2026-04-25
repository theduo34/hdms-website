'use client'

import { useReducer, useEffect, useCallback, useRef } from 'react'
import { fetchGalleryPage, type GalleryPageResult } from '@/features/gallery/gallery-api'
import {
    type GalleryItem,
    type GalleryPhoto,
    type GalleryVideo,
    type GalleryEvent,
    type MainCategory,
    type SubCategory,
} from '@/features/gallery/gallery'

type State = {
    items: GalleryItem[]
    total: number
    page: number
    hasMore: boolean
    loading: boolean
    loadingMore: boolean
}

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_DONE'; result: GalleryPageResult }
    | { type: 'MORE_START' }
    | { type: 'MORE_DONE'; page: number; result: GalleryPageResult }

const initial: State = {
    items: [],
    total: 0,
    page: 1,
    hasMore: false,
    loading: true,
    loadingMore: false,
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { ...initial, loading: true }
        case 'FETCH_DONE':
            return {
                ...state,
                loading: false,
                items: action.result.items,
                total: action.result.total,
                hasMore: action.result.hasMore,
            }
        case 'MORE_START':
            return { ...state, loadingMore: true }
        case 'MORE_DONE':
            return {
                ...state,
                loadingMore: false,
                page: action.page,
                items: action.result.items,
                hasMore: action.result.hasMore,
            }
    }
}

export function useGallery(main: MainCategory, sub: SubCategory) {
    const [state, dispatch] = useReducer(reducer, initial)
    const requestId = useRef(0)

    useEffect(() => {
        const id = ++requestId.current
        dispatch({ type: 'FETCH_START' })

        let cancelled = false
        fetchGalleryPage(main, sub, 1).then(result => {
            if (cancelled || id !== requestId.current) return
            dispatch({ type: 'FETCH_DONE', result })
        })

        return () => { cancelled = true }
    }, [main, sub])

    const loadMore = useCallback(() => {
        if (state.loadingMore || !state.hasMore) return
        const id = ++requestId.current
        dispatch({ type: 'MORE_START' })
        const nextPage = state.page + 1
        let cancelled = false

        fetchGalleryPage(main, sub, nextPage).then(result => {
            if (cancelled || id !== requestId.current) return
            dispatch({ type: 'MORE_DONE', page: nextPage, result })
        })

        return () => { cancelled = true }
    }, [main, sub, state.page, state.hasMore, state.loadingMore])

    const stableItems = state.items.filter(item => item.type === main)

    return {
        items: stableItems as GalleryPhoto[] | GalleryVideo[] | GalleryEvent[],
        total: state.total,
        loading: state.loading,
        loadingMore: state.loadingMore,
        hasMore: state.hasMore,
        loadMore,
    }
}
