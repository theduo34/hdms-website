import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import type { AdminUser } from './types'

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) return null

    // Service role bypasses RLS to read admin_profiles
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
