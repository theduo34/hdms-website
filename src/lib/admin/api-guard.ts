// src/lib/admin/api-guard.ts
// Reusable guard for API route handlers.
// Usage:
//   const { admin, db, json, err } = await apiGuard(req, 'gallery', 'delete')

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { can, PermissionError } from './permissions'
import type { AdminResource, AdminAction } from './types'

export async function apiGuard(
  _req: NextRequest,
  resource: AdminResource,
  action: AdminAction,
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      admin: null,
      db: null,
      json: null,
      err: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  const db = createServiceClient()
  const { data: profile } = await db
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.verified) {
    return {
      admin: null,
      db: null,
      json: null,
      err: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }

  if (!can(profile.role, resource, action)) {
    return {
      admin: null,
      db: null,
      json: null,
      err: NextResponse.json(
        { error: `Role "${profile.role}" cannot "${action}" on "${resource}"` },
        { status: 403 },
      ),
    }
  }

  return {
    admin: { user, profile },
    db,
    json: <T>(data: T, status = 200) =>
      NextResponse.json(data, { status }),
    err: null,
  }
}
