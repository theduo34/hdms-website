// src/lib/admin/auth.ts
// Server-side admin auth utilities.
// Always run on the server (API routes / Server Components).

import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import type { AdminUser } from './types'

/**
 * Returns the currently authenticated admin, or null.
 * Checks:
 *  1. Valid Supabase session
 *  2. Exists in admin_profiles table
 *  3. verified = true
 *
 * Uses service role to read admin_profiles to avoid RLS bootstrap issues.
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) return null

    const service = createServiceClient()
    const { data: profile, error: profileError } = await service
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) return null
    if (!profile.verified) return null

    return {
      user: { id: user.id, email: user.email },
      profile,
    }
  } catch {
    return null
  }
}

/**
 * Like getCurrentAdmin() but throws a Response (suitable for API route guards).
 * Usage in API routes:
 *   const admin = await requireAdmin()
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin()
  if (!admin) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return admin
}
