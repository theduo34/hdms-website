// src/lib/admin/types.ts
// Shared types for the admin dashboard

export type AdminRole = 'super_admin' | 'support_admin' | 'school_admin'

export type AdminResource =
  | 'gallery'
  | 'news'
  | 'calendar'
  | 'staff'
  | 'faqs'
  | 'settings'
  | 'users'
  | 'campus'

export type AdminAction = 'create' | 'read' | 'update' | 'delete' | 'verify'

export interface AdminProfile {
  id: string
  role: AdminRole
  display_name: string
  email: string
  verified: boolean
  department_tag: string
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface AdminUser {
  user: {
    id: string
    email: string | undefined
  }
  profile: AdminProfile
}

// Labels and colors for display
export const ROLE_CONFIG: Record<AdminRole, { label: string; color: string; description: string }> = {
  super_admin: {
    label: 'Super Admin',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
    description: 'Full access — can manage all admins, verify accounts, and configure settings.',
  },
  school_admin: {
    label: 'School Admin',
    color: 'bg-primary/10 text-primary border-primary/20',
    description: 'Full content access including deletes. Can create support accounts.',
  },
  support_admin: {
    label: 'Support Admin',
    color: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    description: 'Can upload media and edit content, but cannot delete or manage settings.',
  },
}
