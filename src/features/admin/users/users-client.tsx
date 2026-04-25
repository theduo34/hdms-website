'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { can, creatableRoles } from '@/lib/admin/permissions'
import { ROLE_CONFIG, type AdminRole } from '@/lib/admin/types'
import { DEPARTMENT_TAGS, getDepartmentLabel } from '@/features/admin/news/news-data'
import { toast } from 'sonner'
import {
  Plus, Trash2, UsersRound, CheckCircle, XCircle, ShieldAlert, Loader2, Mail, Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface AdminProfileData {
  id: string
  role: AdminRole
  display_name: string
  email: string
  verified: boolean
  department_tag: string
  created_at: string
}

const VALID_TAGS = ['ict-directorate', 'school-heads', 'hdm-administration', 'admissions-office'] as const

const inviteSchema = z.object({
  display_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  role: z.enum(['super_admin', 'school_admin', 'support_admin']),
  department_tag: z.enum(VALID_TAGS),
})

type InviteValues = z.infer<typeof inviteSchema>

export function UsersClient() {
  const { admin } = useAdminUser()
  const [users, setUsers] = useState<AdminProfileData[]>([])
  const [loading, setLoading] = useState(true)
  const [inviteOpen, setInviteOpen] = useState(false)

  const currentRole = admin?.profile.role ?? 'support_admin'
  const canCreate = can(currentRole, 'users', 'create')
  const canDelete = can(currentRole, 'users', 'delete')
  const canVerify = can(currentRole, 'users', 'verify')
  const allowedRoles = creatableRoles(currentRole)

  const form = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { display_name: '', email: '', role: 'support_admin', department_tag: 'ict-directorate' },
  })

  const watchedRole = form.watch('role')
  const { isSubmitting } = form.formState

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/users')
    if (res.ok) {
      const json = await res.json()
      setUsers(Array.isArray(json) ? json : [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function onInvite(values: InviteValues) {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const json = await res.json()
    if (res.ok) {
      toast.success(json.message ?? 'Invitation sent!')
      setInviteOpen(false)
      form.reset()
      load()
    } else {
      toast.error(json.error ?? 'Failed to invite user')
    }
  }

  async function toggleVerify(user: AdminProfileData) {
    const newVal = !user.verified
    const res = await fetch(`/api/admin/users?id=${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verified: newVal }),
    })
    if (res.ok) {
      toast.success(newVal ? `${user.display_name} verified` : `${user.display_name} revoked`)
      load()
    } else {
      const j = await res.json()
      toast.error(j.error)
    }
  }

  async function deleteUser(user: AdminProfileData) {
    const res = await fetch(`/api/admin/users?id=${user.id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success(`${user.display_name} removed`)
      load()
    } else {
      const j = await res.json()
      toast.error(j.error)
    }
  }

  if (!can(currentRole, 'users', 'read')) {
    return (
      <>
        <AdminHeader title="Users" />
        <main className="admin-page">
          <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
            <ShieldAlert className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">This section is restricted. Contact your administrator for access.</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Admin Users" />

      <main className="admin-page space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Admin Users</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Manage admin accounts and access levels.</p>
          </div>
          {canCreate && allowedRoles.length > 0 && (
            <Button size="sm" onClick={() => { form.reset(); setInviteOpen(true) }}>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Invite Admin
            </Button>
          )}
        </div>

        {/* Role legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(ROLE_CONFIG).map(([key, cfg]) => (
            <div key={key} className="rounded-xl border border-border bg-card p-3">
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cfg.color}`}>
                {cfg.label}
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5">{cfg.description}</p>
            </div>
          ))}
        </div>

        {/* User list */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <UsersRound className="w-10 h-10 mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No admin users found.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {users.map((user, i) => {
              const roleConfig = ROLE_CONFIG[user.role]
              const isSelf = user.id === admin?.profile.id
              return (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-border' : ''} ${isSelf ? 'bg-secondary/5' : 'hover:bg-accent/30'} transition-colors`}
                >
                  <Avatar className="w-9 h-9 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                      {user.display_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-foreground">{user.display_name}</p>
                      {isSelf && (
                        <span className="text-[10px] text-secondary-foreground bg-secondary/20 px-1.5 py-0.5 rounded-full font-medium">
                          you
                        </span>
                      )}
                      <span className={`inline-flex items-center rounded-full border px-1.5 py-0 text-[10px] font-medium ${roleConfig.color}`}>
                        {roleConfig.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      {user.department_tag && (
                        <>
                          <span className="text-border hidden sm:inline">·</span>
                          <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Building2 className="w-3 h-3" />
                            {getDepartmentLabel(user.department_tag)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Verified badge */}
                  <div className="flex-shrink-0 hidden sm:block">
                    {user.verified ? (
                      <span className="flex items-center gap-1 text-xs text-primary">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <XCircle className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  {!isSelf && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {canVerify && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => toggleVerify(user)}
                        >
                          {user.verified ? 'Revoke' : 'Verify'}
                        </Button>
                      )}
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                              aria-label={`Remove ${user.display_name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove {user.display_name}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This permanently deletes their admin account and revokes all access.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => deleteUser(user)}
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Invite dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Admin</DialogTitle>
            <DialogDescription>
              An email invitation will be sent. The account starts unverified — verify it after they accept.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onInvite)} className="space-y-4 py-1">
              <FormField
                control={form.control}
                name="display_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Mrs. Ama Asante" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="user@hdm.edu.gh" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allowedRoles.map((r) => (
                            <SelectItem key={r} value={r}>{ROLE_CONFIG[r].label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department_tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DEPARTMENT_TAGS.map((d) => (
                            <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormDescription className="text-[11px]">
                {ROLE_CONFIG[watchedRole as AdminRole]?.description}
              </FormDescription>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setInviteOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Sending...</>
                    : <><Mail className="w-3.5 h-3.5 mr-2" /> Send Invitation</>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
