'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { can } from '@/lib/admin/permissions'
import { toast } from 'sonner'
import { Plus, Trash2, Pencil, HelpCircle, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
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

interface FAQ {
  id: string
  question: string
  answer: string
  sort_order: number
}

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  sort_order: z.coerce.number().int().min(0),
})

type FAQValues = z.infer<typeof faqSchema>

export function FAQsClient() {
  const { admin } = useAdminUser()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const role = admin?.profile.role ?? 'support_admin'
  const canDelete = can(role, 'faqs', 'delete')
  const canCreate = can(role, 'faqs', 'create')
  const canEdit = can(role, 'faqs', 'update')

  const form = useForm<FAQValues>({
    resolver: zodResolver(faqSchema) as any,
    defaultValues: { question: '', answer: '', sort_order: 0 },
  })

  const { isSubmitting } = form.formState

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/faqs')
    const json = await res.json()
    setFaqs(Array.isArray(json) ? json : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() {
    setEditingId(null)
    form.reset({ question: '', answer: '', sort_order: faqs.length })
    setDialogOpen(true)
  }

  function openEdit(faq: FAQ) {
    setEditingId(faq.id)
    form.reset({ question: faq.question, answer: faq.answer, sort_order: faq.sort_order })
    setDialogOpen(true)
  }

  async function onSubmit(values: FAQValues) {
    const url = editingId ? `/api/admin/faqs?id=${editingId}` : '/api/admin/faqs'
    const method = editingId ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    const json = await res.json()
    if (res.ok) {
      toast.success(editingId ? 'FAQ updated!' : 'FAQ added!')
      setDialogOpen(false)
      load()
    } else {
      toast.error(json.error ?? 'Save failed')
    }
  }

  async function deleteFaq(id: string) {
    const res = await fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('FAQ removed'); load() }
    else { const j = await res.json(); toast.error(j.error) }
  }

  return (
    <>
      <AdminHeader
        title="Admissions FAQs"
      />

      <main className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Admissions FAQs</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Manage frequently asked questions shown on the admissions page.</p>
          </div>
          {canCreate && (
            <Button size="sm" onClick={openCreate}>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add FAQ
            </Button>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No FAQs yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={faq.id} className="rounded-xl border border-border bg-card p-4 flex items-start gap-3 group">
                <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs text-muted-foreground/50 font-mono w-5 text-center">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground mb-1">{faq.question}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
                  {canEdit && (
                    <button
                      onClick={() => openEdit(faq)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
                      aria-label="Edit FAQ"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {canDelete && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                          aria-label="Remove FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove this FAQ?</AlertDialogTitle>
                          <AlertDialogDescription>This FAQ will be permanently removed from the admissions page.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => deleteFaq(faq.id)}>Remove</AlertDialogAction>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
            <DialogDescription>This FAQ will appear on the admissions page.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. What age groups do you accept?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer *</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Detailed answer…" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
