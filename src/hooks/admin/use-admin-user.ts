'use client'

// Hook that returns the current admin's profile via /api/admin/me.
// Using the API route instead of a direct Supabase query means the service
// client is used server-side, so RLS on admin_profiles never blocks the read.

import { useState, useEffect } from 'react'
import type { AdminUser } from '@/lib/admin/types'

interface AdminUserState {
  admin: AdminUser | null
  loading: boolean
}

export function useAdminUser(): AdminUserState {
  const [state, setState] = useState<AdminUserState>({ admin: null, loading: true })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/admin/me')
        if (!res.ok) {
          if (!cancelled) setState({ admin: null, loading: false })
          return
        }
        const data = await res.json()
        if (!cancelled) {
          setState({
            admin: data as AdminUser,
            loading: false,
          })
        }
      } catch {
        if (!cancelled) setState({ admin: null, loading: false })
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return state
}
