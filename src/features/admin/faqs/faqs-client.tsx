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
  Plus, Trash2, Pencil, HelpCircle, Save, Loader2,
  ChevronUp, ChevronDown, Search, ChevronDown as Expand,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
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

interface FAQ {
  id: string
  question: string
  answer: string
  sort_order: number
}

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer:   z.string().min(1, 'Answer is required'),
})

type FAQValues = z.infer<typeof faqSchema>

export function FAQsClient() {
  const { admin } = useAdminUser()
  const [faqs, setFaqs]           = useState<FAQ[]>([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [expanded, setExpanded]   = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId]   = useState<string | null>(null)

  const role      = admin?.profile.role ?? 'support_admin'
  const canDelete = can(role, 'faqs', 'delete')
  const canCreate = can(role, 'faqs', 'create')
  const canEdit   = can(role, 'faqs', 'update')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<FAQValues>({
    resolver: zodResolver(faqSchema) as any,
    defaultValues: { question: '', answer: '' },
  })

  const { isSubmitting } = form.formState

  const load = useCallback(async () => {
    setLoading(true)
    const res  = await fetch('/api/admin/faqs')
    const json = await res.json()
    setFaqs(Array.isArray(json) ? json : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() {
    setEditingId(null)
    form.reset({ question: '', answer: '' })
    setDialogOpen(true)
  }

  function openEdit(faq: FAQ) {
    setEditingId(faq.id)
    form.reset({ question: faq.question, answer: faq.answer })
    setDialogOpen(true)
  }

  async function onSubmit(values: FAQValues) {
    const payload = {
      question:   values.question,
      answer:     values.answer,
      // new FAQs go to end; preserve existing sort_order on edit
      ...(editingId ? {} : { sort_order: faqs.length }),
    }

    const url    = editingId ? `/api/admin/faqs?id=${editingId}` : '/api/admin/faqs'
    const method = editingId ? 'PATCH' : 'POST'

    const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const json = await res.json()

    if (res.ok) {
      toast.success(editingId ? 'FAQ updated' : 'FAQ added')
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

  async function moveFaq(index: number, direction: 'up' | 'down') {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= faqs.length) return

    const a = faqs[index]
    const b = faqs[targetIndex]

    // Optimistic swap
    const next = [...faqs]
    next[index] = b
    next[targetIndex] = a
    setFaqs(next)

    const [resA, resB] = await Promise.all([
      fetch(`/api/admin/faqs?id=${a.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: b.sort_order }),
      }),
      fetch(`/api/admin/faqs?id=${b.id}`, {
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

  const filtered = faqs.filter((faq) => {
    if (!search) return true
    const q = search.toLowerCase()
    return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
  })

  return (
    <>
      <AdminHeader title="Admissions FAQs" />

      <main className="admin-page space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Admissions FAQs</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage the frequently asked questions shown on the admissions page.
              {faqs.length > 0 && ` ${faqs.length} question${faqs.length !== 1 ? 's' : ''} published.`}
            </p>
          </div>
          {canCreate && (
            <Button size="sm" onClick={openCreate} className="shrink-0">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add FAQ
            </Button>
          )}
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search questions or answers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">
              {search ? 'No FAQs match your search.' : 'No FAQs yet.'}
            </p>
            {!search && canCreate && (
              <p className="text-xs mt-1">Add your first FAQ to help prospective families.</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((faq, i) => {
              const isExpanded = expanded === faq.id
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-border bg-card group"
                >
                  <div className="p-4 flex items-start gap-3">
                    {canEdit && !search && (
                      <div className="flex flex-col gap-0.5 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button
                          onClick={() => moveFaq(i, 'up')}
                          disabled={i === 0}
                          className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveFaq(i, 'down')}
                          disabled={i === filtered.length - 1}
                          className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <span className="text-xs text-muted-foreground/50 font-mono mt-0.5 w-5 text-center shrink-0 tabular-nums">
                      {i + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => setExpanded(isExpanded ? null : faq.id)}
                        className="text-left w-full"
                        aria-expanded={isExpanded}
                      >
                        <p className="font-semibold text-sm text-foreground">{faq.question}</p>
                      </button>

                      {isExpanded ? (
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{faq.answer}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{faq.answer}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setExpanded(isExpanded ? null : faq.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
                        aria-label={isExpanded ? 'Collapse' : 'Expand answer'}
                      >
                        <Expand className={cn('w-3.5 h-3.5 transition-transform', isExpanded && 'rotate-180')} />
                      </button>

                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
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
                                <AlertDialogDescription>
                                  &ldquo;{faq.question}&rdquo; will be permanently removed from the admissions page.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => deleteFaq(faq.id)}
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
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update this question and answer.'
                : 'This FAQ will appear on the admissions page.'}
            </DialogDescription>
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
                      <Textarea {...field} rows={5} placeholder="Write a clear, helpful answer for parents and prospective families…" />
                    </FormControl>
                    <FormDescription className="text-right text-[11px]">
                      {field.value.length} characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving…</>
                    : <><Save className="w-3.5 h-3.5 mr-2" />{editingId ? 'Update FAQ' : 'Add FAQ'}</>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
