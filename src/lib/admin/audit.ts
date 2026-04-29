import { createServiceClient } from '@/lib/supabase/service'

export type AuditAction = 'invite' | 'create' | 'update' | 'delete' | 'verify'

interface AuditActor {
  profile: { id: string; email: string }
}

export async function writeAuditLog(
  admin: AuditActor,
  action: AuditAction,
  resource: string,
  resourceId?: string,
  details?: Record<string, unknown>,
): Promise<void> {
  try {
    const db = createServiceClient()
    await db.from('audit_logs').insert({
      admin_id:    admin.profile.id,
      admin_email: admin.profile.email,
      action,
      resource,
      resource_id: resourceId ?? null,
      details:     details ?? {},
    })
  } catch {
    // Audit log failures must never break the main operation
  }
}
