import type { AdminRole, AdminResource, AdminAction } from './types'

const PERMISSIONS: Record<AdminRole, Record<AdminResource, AdminAction[]>> = {
  super_admin: {
    gallery:  ['create', 'read', 'update', 'delete'],
    news:     ['create', 'read', 'update', 'delete'],
    calendar: ['create', 'read', 'update', 'delete'],
    staff:    ['create', 'read', 'update', 'delete'],
    faqs:     ['create', 'read', 'update', 'delete'],
    settings: ['create', 'read', 'update', 'delete'],
    users:    ['create', 'read', 'update', 'delete', 'verify'],
    campus:   ['create', 'read', 'update', 'delete'],
  },
  school_admin: {
    gallery:  ['create', 'read', 'update', 'delete'],
    news:     ['create', 'read', 'update', 'delete'],
    calendar: ['create', 'read', 'update', 'delete'],
    staff:    ['create', 'read', 'update', 'delete'],
    faqs:     ['create', 'read', 'update', 'delete'],
    settings: ['read'],
    users:    ['read'],
    campus:   ['create', 'read', 'update', 'delete'],
  },
  support_admin: {
    gallery:  ['create', 'read', 'update'],
    news:     ['create', 'read', 'update'],
    calendar: ['create', 'read', 'update'],
    staff:    ['read'],
    faqs:     ['read'],
    settings: ['read'],
    users:    [],
    campus:   ['create', 'read', 'update'],
  },
}

export function can(role: AdminRole, resource: AdminResource, action: AdminAction): boolean {
  return PERMISSIONS[role][resource].includes(action)
}

export function requirePermission(
  role: AdminRole,
  resource: AdminResource,
  action: AdminAction,
): void {
  if (!can(role, resource, action)) {
    throw new PermissionError(role, resource, action)
  }
}

export class PermissionError extends Error {
  constructor(role: AdminRole, resource: AdminResource, action: AdminAction) {
    super(`Role "${role}" cannot perform "${action}" on "${resource}"`)
    this.name = 'PermissionError'
  }
}

export function creatableRoles(role: AdminRole): AdminRole[] {
  if (role === 'super_admin') return ['super_admin', 'school_admin', 'support_admin']
  if (role === 'school_admin') return ['support_admin']
  return []
}
