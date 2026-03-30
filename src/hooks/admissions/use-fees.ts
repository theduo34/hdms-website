'use client'

import { useState, useEffect } from 'react'
import { feesData } from '../../features/admissions/admissions'

export type FeeRow = {
    programme: string
    range: string
    registration: string
    termly: string
    annual: string
}

export function useFees() {
    const [fees, setFees] = useState<FeeRow[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function load() {
            try {
                await Promise.resolve()
                setFees(feesData)
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    setError('Could not load fee data.')
                }
            } finally {
                setLoading(false)
            }
        }

        load()
        return () => controller.abort()
    }, [])

    return { fees, loading, error }
}
