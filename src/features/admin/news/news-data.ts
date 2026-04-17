export const CATEGORIES = [
  { value: 'news', label: 'News' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'event', label: 'Event' },
  { value: 'press', label: 'Press' },
] as const

export type CategoryValue = (typeof CATEGORIES)[number]['value']

export const CATEGORY_STYLES: Record<string, string> = {
  news: 'bg-primary/8 text-primary',
  announcement: 'bg-secondary/20 text-primary',
  event: 'bg-primary/12 text-primary',
  press: 'bg-muted text-muted-foreground',
}

export const DEPARTMENT_TAGS = [
  { value: 'ict-directorate', label: 'ICT Directorate' },
  { value: 'school-heads', label: 'School Heads' },
  { value: 'hdm-administration', label: 'HDM Administration' },
  { value: 'admissions-office', label: 'Admissions Office' },
] as const

export type DepartmentTagValue = (typeof DEPARTMENT_TAGS)[number]['value']

export function getDepartmentLabel(tag: string): string {
  return DEPARTMENT_TAGS.find((d) => d.value === tag)?.label ?? tag
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}
