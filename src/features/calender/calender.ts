// src/features/calender/calender.ts
// Academic calendar data for Heaven's Dew Montessori
// Static dummy data - replace array values with API fetch from api.hdm.edu.gh/calendar when ready.
// The interfaces are designed to match a future REST response shape.

export type EventCategory = 'academic' | 'event' | 'holiday' | 'exam' | 'sports' | 'cultural'
export type ViewMode = 'list' | 'grid'

export interface CalendarEvent {
    id: string
    title: string
    /** ISO date string "YYYY-MM-DD" */
    date: string
    /** ISO end date for multi-day events "YYYY-MM-DD" */
    endDate?: string
    /** Display time, e.g. "9:00 AM" */
    time?: string
    /** Display end time, e.g. "12:00 PM" */
    endTime?: string
    location?: string
    category: EventCategory
    categoryLabel: string
    description?: string
    isAllDay: boolean
    /** Visually emphasised on the calendar - term starts, major events */
    isHighlight?: boolean
}

export interface AcademicTerm {
    id: string
    name: string
    /** ISO date "YYYY-MM-DD" */
    startDate: string
    /** ISO date "YYYY-MM-DD" */
    endDate: string
    isCurrent: boolean
    isBreak: boolean
}

export interface CalendarFilter {
    id: EventCategory | 'all'
    label: string
}

// ── Academic Terms ──────────────────────────────────────────────────────────
export const academicTerms: AcademicTerm[] = [
    {
        id: 'term-1-2026',
        name: 'Term 1',
        startDate: '2026-01-06',
        endDate: '2026-03-28',
        isCurrent: true,
        isBreak: false,
    },
    {
        id: 'easter-break-2026',
        name: 'Easter Break',
        startDate: '2026-03-29',
        endDate: '2026-04-19',
        isCurrent: false,
        isBreak: true,
    },
    {
        id: 'term-2-2026',
        name: 'Term 2',
        startDate: '2026-04-20',
        endDate: '2026-07-11',
        isCurrent: false,
        isBreak: false,
    },
    {
        id: 'summer-break-2026',
        name: 'Summer Break',
        startDate: '2026-07-12',
        endDate: '2026-08-02',
        isCurrent: false,
        isBreak: true,
    },
    {
        id: 'term-3-2026',
        name: 'Term 3',
        startDate: '2026-08-03',
        endDate: '2026-10-25',
        isCurrent: false,
        isBreak: false,
    },
]

// ── Calendar Events ─────────────────────────────────────────────────────────
export const calendarEvents: CalendarEvent[] = [
    // ── Term 1 2026 ──────────────────────────────────────────
    {
        id: 'ev-001',
        title: 'Term 1 Begins',
        date: '2026-01-06',
        location: 'Main Campus',
        category: 'academic',
        categoryLabel: 'Academic',
        description: 'First day of Term 1 for all year groups. Students are expected to arrive by 7:30 AM in full uniform.',
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-002',
        title: 'New Parent Orientation',
        date: '2026-01-07',
        time: '9:00 AM',
        endTime: '11:00 AM',
        location: 'Assembly Hall',
        category: 'event',
        categoryLabel: 'Event',
        description: 'Welcome orientation for parents of all new students joining HDM this term. Light refreshments will be served.',
        isAllDay: false,
    },
    {
        id: 'ev-003',
        title: 'Independence Day – Ghana',
        date: '2026-03-06',
        location: 'School Closed',
        category: 'holiday',
        categoryLabel: 'Holiday',
        description: "Ghana's Independence Day. School will be closed for all students and staff.",
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-004',
        title: 'Open Day',
        date: '2026-03-15',
        time: '9:00 AM',
        endTime: '12:00 PM',
        location: 'Main Campus',
        category: 'event',
        categoryLabel: 'Event',
        description: 'HDM Open Day for prospective families. Tour our campus, observe live Montessori lessons, and meet our teaching team. All welcome - RSVP via the Admissions page.',
        isAllDay: false,
        isHighlight: true,
    },
    {
        id: 'ev-005',
        title: 'Term 1 Examinations',
        date: '2026-03-16',
        endDate: '2026-03-20',
        location: 'All Classrooms',
        category: 'exam',
        categoryLabel: 'Exam',
        description: 'End-of-term examinations for all year groups. Students should report to their examination rooms by 7:45 AM each day.',
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-006',
        title: 'Speech & Prize Giving Day',
        date: '2026-03-27',
        time: '10:00 AM',
        endTime: '2:00 PM',
        location: 'School Grounds',
        category: 'cultural',
        categoryLabel: 'Cultural',
        description: 'Annual Speech and Prize Giving Day - celebrating the academic, sporting, and character achievements of our students. All families warmly invited.',
        isAllDay: false,
        isHighlight: true,
    },
    {
        id: 'ev-007',
        title: 'Term 1 Ends',
        date: '2026-03-28',
        location: 'Main Campus',
        category: 'academic',
        categoryLabel: 'Academic',
        description: 'Last day of Term 1. Report cards will be distributed to all students before dismissal.',
        isAllDay: true,
        isHighlight: true,
    },
    // ── Easter Break ────────────────────────────────────────
    {
        id: 'ev-008',
        title: 'Easter Break Begins',
        date: '2026-03-29',
        category: 'holiday',
        categoryLabel: 'Holiday',
        description: 'Easter Break begins. School resumes for all students on Monday 20 April 2026.',
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-009',
        title: 'Good Friday',
        date: '2026-04-03',
        category: 'holiday',
        categoryLabel: 'Holiday',
        description: 'Good Friday - Public Holiday.',
        isAllDay: true,
    },
    {
        id: 'ev-010',
        title: 'Easter Monday',
        date: '2026-04-06',
        category: 'holiday',
        categoryLabel: 'Holiday',
        description: 'Easter Monday - Public Holiday.',
        isAllDay: true,
    },
    // ── Term 2 2026 ──────────────────────────────────────────
    {
        id: 'ev-011',
        title: 'Term 2 Begins',
        date: '2026-04-20',
        location: 'Main Campus',
        category: 'academic',
        categoryLabel: 'Academic',
        description: 'First day of Term 2 for all year groups. Students are expected in full uniform by 7:30 AM.',
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-012',
        title: 'Inter-House Sports Day',
        date: '2026-05-22',
        time: '8:00 AM',
        endTime: '4:00 PM',
        location: 'Sports Field',
        category: 'sports',
        categoryLabel: 'Sports',
        description: 'Annual Inter-House Sports Competition. All four houses compete in athletics, football, relay, and team games. Families are strongly encouraged to come and cheer.',
        isAllDay: false,
        isHighlight: true,
    },
    {
        id: 'ev-013',
        title: 'Africa Day Celebration',
        date: '2026-05-25',
        time: '9:00 AM',
        endTime: '12:00 PM',
        location: 'Assembly Hall',
        category: 'cultural',
        categoryLabel: 'Cultural',
        description: 'HDM celebrates Africa Day with cultural performances, traditional food from across the continent, and student art exhibitions.',
        isAllDay: false,
    },
    {
        id: 'ev-014',
        title: 'Parent–Teacher Conferences',
        date: '2026-06-05',
        time: '8:00 AM',
        endTime: '3:00 PM',
        location: 'Main Campus',
        category: 'event',
        categoryLabel: 'Event',
        description: 'Mid-term parent–teacher conferences for all year groups. Book your appointment slot through the school office ahead of time.',
        isAllDay: false,
    },
    {
        id: 'ev-015',
        title: 'Term 2 Examinations',
        date: '2026-06-29',
        endDate: '2026-07-03',
        location: 'All Classrooms',
        category: 'exam',
        categoryLabel: 'Exam',
        description: 'End-of-term examinations for all year groups.',
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-016',
        title: 'Term 2 Ends',
        date: '2026-07-11',
        location: 'Main Campus',
        category: 'academic',
        categoryLabel: 'Academic',
        description: 'Last day of Term 2. Report cards distributed to all students.',
        isAllDay: true,
        isHighlight: true,
    },
    // ── Term 3 2026 ──────────────────────────────────────────
    {
        id: 'ev-017',
        title: 'Term 3 Begins',
        date: '2026-08-03',
        location: 'Main Campus',
        category: 'academic',
        categoryLabel: 'Academic',
        description: 'First day of Term 3 for all year groups.',
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-018',
        title: "HDM Founders' Day",
        date: '2026-09-04',
        time: '10:00 AM',
        endTime: '12:00 PM',
        location: 'Assembly Hall',
        category: 'cultural',
        categoryLabel: 'Cultural',
        description: "Annual Founders' Day celebration marking the anniversary of Heaven's Dew Montessori. A special assembly and programme for students, staff, and invited guests.",
        isAllDay: false,
        isHighlight: true,
    },
    {
        id: 'ev-019',
        title: 'Career Day',
        date: '2026-09-18',
        time: '9:00 AM',
        endTime: '3:00 PM',
        location: 'Main Campus',
        category: 'event',
        categoryLabel: 'Event',
        description: 'Annual Career Day with inspiring guest speakers from medicine, engineering, law, business, and the creative arts sharing their journeys with HDM students.',
        isAllDay: false,
    },
    {
        id: 'ev-020',
        title: "Kwame Nkrumah Founder's Day",
        date: '2026-09-21',
        category: 'holiday',
        categoryLabel: 'Holiday',
        description: "National Kwame Nkrumah Founder's Day - Public Holiday.",
        isAllDay: true,
    },
    {
        id: 'ev-021',
        title: 'Term 3 Examinations',
        date: '2026-10-12',
        endDate: '2026-10-16',
        location: 'All Classrooms',
        category: 'exam',
        categoryLabel: 'Exam',
        description: 'End-of-year examinations for all year groups.',
        isAllDay: true,
        isHighlight: true,
    },
    {
        id: 'ev-022',
        title: 'Graduation & Closing Ceremony',
        date: '2026-10-23',
        time: '10:00 AM',
        endTime: '2:00 PM',
        location: 'School Grounds',
        category: 'cultural',
        categoryLabel: 'Cultural',
        description: "Year 7 Graduation and end-of-year Closing Ceremony for the whole school. All families are warmly invited to celebrate this milestone with our Year 7 graduates.",
        isAllDay: false,
        isHighlight: true,
    },
    {
        id: 'ev-023',
        title: 'Term 3 Ends',
        date: '2026-10-25',
        location: 'Main Campus',
        category: 'academic',
        categoryLabel: 'Academic',
        description: "Last day of Term 3 and close of the 2025/2026 academic year.",
        isAllDay: true,
        isHighlight: true,
    },
]

// ── Filter config ────────────────────────────────────────────────────────────
export const calendarFilters: CalendarFilter[] = [
    { id: 'all',      label: 'All Events' },
    { id: 'academic', label: 'Academic'   },
    { id: 'event',    label: 'Events'     },
    { id: 'exam',     label: 'Exams'      },
    { id: 'holiday',  label: 'Holidays'   },
    { id: 'sports',   label: 'Sports'     },
    { id: 'cultural', label: 'Cultural'   },
]

// ── Category styling helpers ─────────────────────────────────────────────────
export interface CategoryStyle {
    /** Tailwind classes for the badge pill */
    badge: string
    /** Tailwind bg class for the dot indicator */
    dot: string
}

export function getCategoryStyle(cat: EventCategory): CategoryStyle {
    const map: Record<EventCategory, CategoryStyle> = {
        academic: { badge: 'bg-primary/10 text-primary',                dot: 'bg-primary'     },
        event:    { badge: 'bg-secondary/30 text-secondary-foreground', dot: 'bg-secondary'   },
        holiday:  { badge: 'bg-primary/10 text-primary',                  dot: 'bg-primary'     },
        exam:     { badge: 'bg-destructive/10 text-destructive',         dot: 'bg-destructive' },
        sports:   { badge: 'bg-accent/15 text-accent-foreground',        dot: 'bg-accent'      },
        cultural: { badge: 'bg-secondary/20 text-secondary-foreground',  dot: 'bg-secondary'   },
    }
    return map[cat]
}