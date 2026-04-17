// GET /api/admin/me — returns the current admin's profile using the service client.
// Used by useAdminUser() so the browser never needs direct RLS access to admin_profiles.

import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export async function GET(req: NextRequest) {
  // 'settings' + 'read' is the lowest permission every role has — safe to use as the auth gate
  const { admin, err, json } = await apiGuard(req, 'settings', 'read')
  if (err) return err

  return json!(admin)
}
