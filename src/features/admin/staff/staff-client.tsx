'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { can } from '@/lib/admin/permissions'
import { toast } from 'sonner'
import { Plus, Trash2, Pencil, Users2, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  department: z.string(),
  bio: z.string(),
  sort_order: z.coerce.number().int().min(0),
  is_active: z.boolean(),
})

type StaffValues = z.infer<typeof staffSchema>

export function StaffClient() {
  const { admin } = useAdminUser()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const role = admin?.profile.role ?? 'support_admin'
  const canDelete = can(role, 'staff', 'delete')
  const canCreate = can(role, 'staff', 'create')
  const canEdit = can(role, 'staff', 'update')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<StaffValues>({
    resolver: zodResolver(staffSchema) as any,
    defaultValues: { name: '', role: '', department: '', bio: '', sort_order: 0, is_active: true },
  })

  const { isSubmitting } = form.formState

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/staff')
    const json = await res.json()
    setStaff(Array.isArray(json) ? json : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() {
    setEditingId(null)
    form.reset({ name: '', role: '', department: '', bio: '', sort_order: 0, is_active: true })
    setDialogOpen(true)
  }

  function openEdit(s: StaffMember) {
    setEditingId(s.id)
    form.reset({
      name: s.name,
      role: s.role,
      department: s.department ?? '',
      bio: s.bio ?? '',
      sort_order: s.sort_order,
      is_active: s.is_active,
    })
    setDialogOpen(true)
  }

  async function onSubmit(values: StaffValues) {
    const payload = {
      name: values.name,
      role: values.role,
      department: values.department || null,
      bio: values.bio || null,
      sort_order: values.sort_order,
      is_active: values.is_active,
    }

    const url = editingId ? `/api/admin/staff?id=${editingId}` : '/api/admin/staff'
    const method = editingId ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await res.json()
    if (res.ok) {
      toast.success(editingId ? 'Staff member updated!' : 'Staff member added!')
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

  return (
    <>
      <AdminHeader title="Staff" />

      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Staff Directory</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Manage teachers and staff members displayed on the website.</p>
          </div>
          {canCreate && (
            <Button size="sm" onClick={openCreate}>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Staff Member
            </Button>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
        ) : staff.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Users2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No staff members yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {staff.map((member) => (
              <div key={member.id} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4 group">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {member.initials ?? member.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground">{member.name}</p>
                    {!member.is_active && (
                      <Badge variant="outline" className="text-[11px] text-muted-foreground">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{member.role}{member.department ? ` · ${member.department}` : ''}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  {canEdit && (
                    <button
                      onClick={() => openEdit(member)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
                      aria-label="Edit staff member"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {canDelete && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                          aria-label="Remove staff member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove {member.name}?</AlertDialogTitle>
                          <AlertDialogDescription>This will permanently remove them from the staff directory.</AlertDialogDescription>
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
            ))}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Staff Member' : 'Add Staff Member'}</DialogTitle>
            <DialogDescription>Fill in the staff member&apos;s details.</DialogDescription>
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
                        <Input {...field} placeholder="e.g. Mrs. Ama Asante" />
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
                      <Input {...field} placeholder="Preschool, Upper Primary…" />
                    </FormControl>
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
                      <Textarea {...field} rows={3} placeholder="Short biography…" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3 items-end">
                <FormField
                  control={form.control}
                  name="sort_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 pb-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} id="is-active" />
                      </FormControl>
                      <FormLabel htmlFor="is-active" className="cursor-pointer !mt-0">Active</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving…</>
                    : <><Save className="w-3.5 h-3.5 mr-2" />{editingId ? 'Update' : 'Add'}</>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
