export const EVENT_CATEGORIES = [
  { value: 'academic',  label: 'Academic',  color: 'bg-primary/10 text-primary border-primary/20' },
  { value: 'event',     label: 'Event',     color: 'bg-secondary/20 text-primary border-secondary/30' },
  { value: 'holiday',   label: 'Holiday',   color: 'bg-primary/6 text-primary border-primary/15' },
  { value: 'exam',      label: 'Exam',      color: 'bg-destructive/10 text-destructive border-destructive/20' },
  { value: 'sports',    label: 'Sports',    color: 'bg-secondary/30 text-primary border-secondary/40' },
  { value: 'cultural',  label: 'Cultural',  color: 'bg-muted text-muted-foreground border-border' },
] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]['value']

export function getCategoryStyle(category: string): string {
  return EVENT_CATEGORIES.find((c) => c.value === category)?.color
    ?? 'bg-muted text-muted-foreground border-border'
}
