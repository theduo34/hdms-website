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
  Plus, Trash2, Pencil, CalendarDays, Save, Loader2,
  MapPin, Clock, Star, CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { EVENT_CATEGORIES, getCategoryStyle, type EventCategory } from './calendar-data'

interface CalEvent {
  id: string
  title: string
  date: string
  end_date: string | null
  time: string | null
  location: string | null
  category: string
  category_label: string
  description: string | null
  is_all_day: boolean
  is_highlight: boolean
}

interface AcademicTerm {
  id: string
  name: string
  start_date: string
  end_date: string
  is_current: boolean
  is_break: boolean
}


const eventSchema = z.object({
  title:        z.string().min(1, 'Title is required'),
  date:         z.string().min(1, 'Date is required'),
  end_date:     z.string(),
  time:         z.string(),
  location:     z.string(),
  category:     z.enum(['academic', 'event', 'holiday', 'exam', 'sports', 'cultural']),
  description:  z.string(),
  is_all_day:   z.boolean(),
  is_highlight: z.boolean(),
})

type EventValues = z.infer<typeof eventSchema>


function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GH', { day: 'numeric', month: 'short', year: 'numeric' })
}

function groupByMonth(events: CalEvent[]): { label: string; events: CalEvent[] }[] {
  const map = new Map<string, CalEvent[]>()
  for (const ev of events) {
    const key = ev.date.slice(0, 7) // "YYYY-MM"
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(ev)
  }
  return Array.from(map.entries()).map(([key, evs]) => ({
    label: new Date(`${key}-01`).toLocaleDateString('en-GH', { month: 'long', year: 'numeric' }),
    events: evs,
  }))
}

function computeWeeks(start: string, end: string) {
  const diff = new Date(end).getTime() - new Date(start).getTime()
  const weeks = Math.round(diff / (7 * 24 * 60 * 60 * 1000))
  return `${weeks} week${weeks !== 1 ? 's' : ''}`
}


function EventForm({
  defaultValues,
  onSave,
  onCancel,
}: {
  defaultValues: Partial<CalEvent>
  onSave: (data: EventValues) => Promise<void>
  onCancel: () => void
}) {
  const form = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title:        defaultValues.title ?? '',
      date:         defaultValues.date ?? '',
      end_date:     defaultValues.end_date ?? '',
      time:         defaultValues.time ?? '',
      location:     defaultValues.location ?? '',
      category:     (defaultValues.category as EventCategory) ?? 'event',
      description:  defaultValues.description ?? '',
      is_all_day:   defaultValues.is_all_day ?? false,
      is_highlight: defaultValues.is_highlight ?? false,
    },
  })

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 py-1">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. End of Term Examinations" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="9:00 AM" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Assembly Hall" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EVENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} placeholder="Optional details..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-6 pt-1">
          <FormField
            control={form.control}
            name="is_all_day"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} id="all-day" />
                </FormControl>
                <FormLabel htmlFor="all-day" className="cursor-pointer !mt-0 text-sm">All day</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_highlight"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} id="highlight" />
                </FormControl>
                <FormLabel htmlFor="highlight" className="cursor-pointer !mt-0 text-sm">Highlight</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving...</>
              : <><Save className="w-3.5 h-3.5 mr-2" /> Save Event</>}
          </Button>
        </div>
      </form>
    </Form>
  )
}


export function CalendarClient() {
  const { admin } = useAdminUser()
  const [events, setEvents] = useState<CalEvent[]>([])
  const [terms, setTerms] = useState<AcademicTerm[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalEvent | null>(null)

  const role = admin?.profile.role ?? 'support_admin'
  const canDelete = can(role, 'calendar', 'delete')
  const canCreate = can(role, 'calendar', 'create')
  const canEdit = can(role, 'calendar', 'update')

  const load = useCallback(async () => {
    setLoading(true)
    const [evRes, termRes] = await Promise.all([
      fetch('/api/admin/calendar/events?upcoming=true'),
      fetch('/api/admin/calendar/terms'),
    ])
    const evJson = await evRes.json()
    const termJson = await termRes.json()
    setEvents(Array.isArray(evJson) ? evJson : [])
    setTerms(Array.isArray(termJson) ? termJson : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function saveEvent(values: EventValues) {
    const payload = {
      ...values,
      end_date:     values.end_date || null,
      time:         values.time || null,
      location:     values.location || null,
      description:  values.description || null,
      category_label: EVENT_CATEGORIES.find((c) => c.value === values.category)?.label ?? '',
    }

    const url = editingEvent
      ? `/api/admin/calendar/events?id=${editingEvent.id}`
      : '/api/admin/calendar/events'

    const res = await fetch(url, {
      method: editingEvent ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await res.json()
    if (res.ok) {
      toast.success(editingEvent ? 'Event updated!' : 'Event created!')
      setDialogOpen(false)
      setEditingEvent(null)
      load()
    } else {
      toast.error(json.error ?? 'Save failed')
    }
  }

  async function deleteEvent(id: string) {
    const res = await fetch(`/api/admin/calendar/events?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Event deleted'); load() }
    else { const j = await res.json(); toast.error(j.error) }
  }

  async function setCurrentTerm(id: string) {
    const res = await fetch(`/api/admin/calendar/terms?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_current: true }),
    })
    if (res.ok) { toast.success('Current term updated'); load() }
    else { const j = await res.json(); toast.error(j.error) }
  }

  const grouped = groupByMonth(events)

  return (
    <>
      <AdminHeader title="Calendar" />

      <main className="admin-page space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Academic Calendar</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Manage upcoming events and academic terms.</p>
          </div>
          {canCreate && (
            <Button size="sm" onClick={() => { setEditingEvent(null); setDialogOpen(true) }}>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Event
            </Button>
          )}
        </div>

        <Tabs defaultValue="events">
          <TabsList>
            <TabsTrigger value="events">
              Upcoming Events
              {!loading && <span className="ml-1.5 text-[11px] tabular-nums opacity-60">({events.length})</span>}
            </TabsTrigger>
            <TabsTrigger value="terms">Academic Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-5">
            {loading ? (
              <div className="space-y-6">
                {[0, 1, 2].map((g) => (
                  <div key={g} className="space-y-2">
                    <Skeleton className="h-5 w-28 rounded" />
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 rounded-xl" />
                    ))}
                  </div>
                ))}
              </div>
            ) : events.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                  <CalendarDays className="w-7 h-7 text-primary/30" />
                </div>
                <p className="text-sm font-semibold text-foreground">No upcoming events</p>
                <p className="text-xs text-muted-foreground mt-1 mb-5">Add events to populate the calendar.</p>
                {canCreate && (
                  <Button size="sm" onClick={() => { setEditingEvent(null); setDialogOpen(true) }}>
                    <Plus className="w-3.5 h-3.5 mr-2" /> Add First Event
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {grouped.map(({ label, events: monthEvents }) => (
                  <div key={label}>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground">{label}</p>
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[11px] text-muted-foreground tabular-nums">{monthEvents.length}</span>
                    </div>

                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      {monthEvents.map((event, i) => (
                          <div
                            key={event.id}
                            className={cn(
                              'flex items-center gap-3 px-4 py-3 group transition-colors hover:bg-accent/30',
                              i > 0 && 'border-t border-border',
                              event.is_highlight && 'border-l-2 border-l-secondary',
                            )}
                          >
                            <div className="w-10 text-center flex-shrink-0 rounded-lg py-1.5 bg-primary/5">
                              <p className="text-base font-bold text-foreground leading-none tabular-nums">
                                {new Date(event.date).getDate()}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">
                                {new Date(event.date).toLocaleDateString('en-GH', { month: 'short' })}
                              </p>
                            </div>

                            <span className={cn(
                              'hidden sm:inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border flex-shrink-0',
                              getCategoryStyle(event.category),
                            )}>
                              {event.category_label}
                            </span>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                {event.is_highlight && (
                                  <Star className="w-3 h-3 text-secondary flex-shrink-0" fill="currentColor" />
                                )}
                                <p className="text-sm font-medium truncate text-foreground">
                                  {event.title}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 mt-0.5">
                                {event.location && (
                                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                    <MapPin className="w-3 h-3" />{event.location}
                                  </span>
                                )}
                                {event.time && !event.is_all_day && (
                                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                    <Clock className="w-3 h-3" />{event.time}
                                  </span>
                                )}
                                {event.end_date && event.end_date !== event.date && (
                                  <span className="text-[11px] text-muted-foreground">
                                    to {new Date(event.end_date).toLocaleDateString('en-GH', { day: 'numeric', month: 'short' })}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              {canEdit && (
                                <button
                                  onClick={() => { setEditingEvent(event); setDialogOpen(true) }}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
                                  aria-label="Edit event"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {canDelete && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button
                                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                                      aria-label="Delete event"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete event?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        &quot;{event.title}&quot; will be permanently removed from the calendar.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        onClick={() => deleteEvent(event.id)}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="terms" className="mt-5">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
              </div>
            ) : terms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CalendarDays className="w-10 h-10 mb-3 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No academic terms defined.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {terms.map((term) => {
                  const weeks = !term.is_break
                    ? computeWeeks(term.start_date, term.end_date)
                    : null
                  return (
                    <div
                      key={term.id}
                      className={cn(
                        'rounded-xl border bg-card p-4 flex items-center gap-4 transition-colors',
                        term.is_current
                          ? 'border-secondary/40 bg-secondary/5'
                          : 'border-border hover:bg-accent/20',
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        term.is_current ? 'bg-secondary/20' : term.is_break ? 'bg-muted' : 'bg-primary/5',
                      )}>
                        {term.is_current
                          ? <CheckCircle2 className="w-4 h-4 text-secondary" />
                          : <CalendarDays className={cn('w-4 h-4', term.is_break ? 'text-muted-foreground/50' : 'text-primary/40')} />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm text-foreground">{term.name}</p>
                          {term.is_current && (
                            <span className="text-[10px] font-bold tracking-[0.12em] uppercase bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                          {term.is_break && (
                            <span className="text-[10px] font-medium text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                              Break
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {fmtDate(term.start_date)} to {fmtDate(term.end_date)}
                          {weeks && <span className="ml-2 text-border">·</span>}
                          {weeks && <span className="ml-2">{weeks}</span>}
                        </p>
                      </div>

                      {canEdit && !term.is_current && !term.is_break && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-3 flex-shrink-0"
                          onClick={() => setCurrentTerm(term.id)}
                        >
                          Set Current
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditingEvent(null) }}>
        <DialogContent className="max-w-lg flex flex-col max-h-[90vh]">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{editingEvent ? 'Edit Event' : 'New Calendar Event'}</DialogTitle>
            <DialogDescription>
              {editingEvent ? 'Update the details for this event.' : 'Add a new event to the academic calendar.'}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 pr-1 -mr-1">
            <EventForm
              key={editingEvent?.id ?? 'new'}
              defaultValues={editingEvent ?? {}}
              onSave={saveEvent}
              onCancel={() => { setDialogOpen(false); setEditingEvent(null) }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
