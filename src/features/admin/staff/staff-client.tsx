'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { can } from '@/lib/admin/permissions'
import { toast } from 'sonner'
import {
  Plus, Trash2, Pencil, Users2, Save, Loader2,
  ChevronUp, ChevronDown, Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription,
} from '@/components/ui/form'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

interface StaffMember {
  id: string
  name: string
  role: string
  department: string | null
  bio: string | null
  initials: string | null
  sort_order: number
  is_active: boolean
}

const staffSchema = z.object({
  name:       z.string().min(1, 'Name is required'),
  role:       z.string().min(1, 'Role / title is required'),
  department: z.string(),
  bio:        z.string(),
  is_active:  z.boolean(),
})

type StaffValues = z.infer<typeof staffSchema>

type FilterTab = 'all' | 'active' | 'inactive'

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export function StaffClient() {
  const { admin } = useAdminUser()
  const [staff, setStaff]         = useState<StaffMember[]>([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId]   = useState<string | null>(null)

  const role      = admin?.profile.role ?? 'support_admin'
  const canDelete = can(role, 'staff', 'delete')
  const canCreate = can(role, 'staff', 'create')
  const canEdit   = can(role, 'staff', 'update')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<StaffValues>({
    resolver: zodResolver(staffSchema) as any,
    defaultValues: { name: '', role: '', department: '', bio: '', is_active: true },
  })

  const { isSubmitting } = form.formState

  const load = useCallback(async () => {
    setLoading(true)
    const res  = await fetch('/api/admin/staff')
    const json = await res.json()
    setStaff(Array.isArray(json) ? json : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() {
    setEditingId(null)
    form.reset({ name: '', role: '', department: '', bio: '', is_active: true })
    setDialogOpen(true)
  }

  function openEdit(s: StaffMember) {
    setEditingId(s.id)
    form.reset({
      name:       s.name,
      role:       s.role,
      department: s.department ?? '',
      bio:        s.bio ?? '',
      is_active:  s.is_active,
    })
    setDialogOpen(true)
  }

  async function onSubmit(values: StaffValues) {
    const payload = {
      name:       values.name,
      role:       values.role,
      department: values.department || null,
      bio:        values.bio || null,
      is_active:  values.is_active,
      // auto-place new members at end
      ...(editingId ? {} : { sort_order: staff.length }),
    }

    const url    = editingId ? `/api/admin/staff?id=${editingId}` : '/api/admin/staff'
    const method = editingId ? 'PATCH' : 'POST'

    const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const json = await res.json()

    if (res.ok) {
      toast.success(editingId ? 'Staff member updated' : 'Staff member added')
      setDialogOpen(false)
      load()
    } else {
      toast.error(json.error ?? 'Save failed')
    }
  }

  async function deleteStaff(id: string) {
    const res = await fetch(`/api/admin/staff?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Staff member removed'); load() }
    else { const j = await res.json(); toast.error(j.error) }
  }

  async function toggleActive(member: StaffMember) {
    const res = await fetch(`/api/admin/staff?id=${member.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !member.is_active }),
    })
    if (res.ok) {
      toast.success(member.is_active ? `${member.name} set to inactive` : `${member.name} set to active`)
      load()
    } else {
      const j = await res.json()
      toast.error(j.error)
    }
  }

  async function moveStaff(index: number, direction: 'up' | 'down') {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= staff.length) return

    const a = staff[index]
    const b = staff[targetIndex]

    // Optimistic swap
    const next = [...staff]
    next[index] = b
    next[targetIndex] = a
    setStaff(next)

    const [resA, resB] = await Promise.all([
      fetch(`/api/admin/staff?id=${a.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: b.sort_order }),
      }),
      fetch(`/api/admin/staff?id=${b.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: a.sort_order }),
      }),
    ])

    if (!resA.ok || !resB.ok) {
      toast.error('Failed to reorder')
      load()
    }
  }

  const activeCount   = staff.filter((s) => s.is_active).length
  const inactiveCount = staff.filter((s) => !s.is_active).length

  const filtered = staff.filter((s) => {
    if (activeTab === 'active'   && !s.is_active)  return false
    if (activeTab === 'inactive' &&  s.is_active)  return false
    if (search) {
      const q = search.toLowerCase()
      return (
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        (s.department ?? '').toLowerCase().includes(q)
      )
    }
    return true
  })

  const TABS: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all',      label: 'All',      count: staff.length },
    { key: 'active',   label: 'Active',   count: activeCount },
    { key: 'inactive', label: 'Inactive', count: inactiveCount },
  ]

  return (
    <>
      <AdminHeader title="Staff" />

      <main className="admin-page space-y-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Staff Directory</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage teachers and staff displayed on the public website. Drag items to reorder.
            </p>
          </div>
          {canCreate && (
            <Button size="sm" onClick={openCreate} className="shrink-0">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Staff Member
            </Button>
          )}
        </div>

        {/* Search + filter tabs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by name, role, or department…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <div className="flex gap-1">
            {TABS.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-full border transition-colors',
                  activeTab === key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/30 hover:text-foreground',
                )}
              >
                {label}
                {count > 0 && (
                  <span className={cn(
                    'ml-1.5 text-[10px] font-semibold tabular-nums',
                    activeTab === key ? 'text-primary-foreground/70' : 'text-muted-foreground',
                  )}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Users2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">
              {search ? 'No staff match your search.' : 'No staff members yet.'}
            </p>
            {!search && canCreate && (
              <p className="text-xs mt-1">Add your first staff member to get started.</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((member, index) => (
              <div
                key={member.id}
                className={cn(
                  'rounded-xl border border-border bg-card p-4 flex items-center gap-3 group transition-opacity',
                  !member.is_active && 'opacity-60',
                )}
              >
                {/* Reorder buttons — only visible when no search active */}
                {canEdit && !search && (
                  <div className="flex flex-col gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveStaff(index, 'up')}
                      disabled={index === 0}
                      className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition disabled:opacity-20 disabled:cursor-not-allowed"
                      aria-label="Move up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveStaff(index, 'down')}
                      disabled={index === filtered.length - 1}
                      className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition disabled:opacity-20 disabled:cursor-not-allowed"
                      aria-label="Move down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Avatar */}
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {member.initials ?? getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm text-foreground">{member.name}</p>
                    {member.department && (
                      <Badge variant="outline" className="text-[11px] px-1.5 py-0 text-muted-foreground">
                        {member.department}
                      </Badge>
                    )}
                    {!member.is_active && (
                      <Badge variant="outline" className="text-[11px] px-1.5 py-0 text-muted-foreground/60">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Active toggle — always visible */}
                  {canEdit && (
                    <Switch
                      checked={member.is_active}
                      onCheckedChange={() => toggleActive(member)}
                      aria-label={member.is_active ? 'Set inactive' : 'Set active'}
                      className="scale-75"
                    />
                  )}

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    {canEdit && (
                      <button
                        onClick={() => openEdit(member)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
                        aria-label={`Edit ${member.name}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {canDelete && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                            aria-label={`Remove ${member.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove {member.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove them from the staff directory.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => deleteStaff(member.id)}
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Staff Member' : 'Add Staff Member'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update this staff member\'s details.' : 'Add a new teacher or staff member to the directory.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Mrs. Ama Asante" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role / Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Class Teacher" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Preschool, Upper Primary, Administration" />
                    </FormControl>
                    <FormDescription className="text-[11px]">
                      Used for grouping and filtering on the website.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} placeholder="Short biography shown on the About page…" />
                    </FormControl>
                    <FormDescription className="text-right text-[11px]">
                      {field.value.length} characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} id="staff-active" />
                    </FormControl>
                    <div>
                      <FormLabel htmlFor="staff-active" className="cursor-pointer !mt-0 font-medium">
                        Active
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">Visible on the public website</p>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving…</>
                    : <><Save className="w-3.5 h-3.5 mr-2" />{editingId ? 'Update' : 'Add Member'}</>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
