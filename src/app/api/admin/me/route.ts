import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export async function GET(req: NextRequest) {
  const { admin, err, json } = await apiGuard(req, 'settings', 'read')
  if (err) return err

  return json!(admin)
}
