// lib/data/news.ts

export type PostCategory = 'news' | 'announcement' | 'event' | 'press'
export type UrgencyLevel = 'new' | 'urgent' | 'info' | 'reminder'

export interface ArticleContent {
    type: 'paragraph' | 'pullquote'
    text: string
}

export interface Post {
    id: string
    slug: string
    category: PostCategory
    categoryLabel: string
    date: string
    image: string
    imageAlt: string
    headline: string
    excerpt: string
    author: string
    content: ArticleContent[]
}

export interface Announcement {
    id: string
    title: string
    desc: string
    urgency: UrgencyLevel
    urgencyLabel: string
    posted: string
}

export interface TermRow {
    name: string
    start: string
    end: string
    duration: string
    isCurrent?: boolean
    isBreak?: boolean
}

// ── Featured post ──────────────────────────
export const featuredPost: Post = {
    id: 'featured',
    slug: 'speech-prize-giving-day-2025',
    category: 'news',
    categoryLabel: 'School News',
    date: '28 November 2025',
    image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/speech_and_prize_giving_dg4atw',
    imageAlt: 'Speech and Prize Giving Day 2025',
    headline: "HDM Celebrates Outstanding Achievements at 2025 Speech & Prize Giving Day",
    excerpt: "Heaven's Dew Montessori brought together students, parents, staff, and distinguished guests for the most celebrated event in our school calendar — an afternoon of recognition, inspiration, and community. Over 60 awards were presented across academic, sporting, and character categories, with this year's theme centred on the power of perseverance.",
    author: 'HDM Communications',
    content: [
        { type: 'paragraph', text: "Heaven's Dew Montessori brought together students, parents, staff, and distinguished guests on Friday 28th November for the most celebrated event in our school calendar — the Annual Speech and Prize Giving Day. This year's event was held on our main campus grounds, with over 300 attendees present to celebrate the extraordinary achievements of our pupils across every area of school life." },
        { type: 'pullquote', text: '"Every child at HDM is a winner. Today we simply give them the stage to show the world what they are made of." — Mrs. Charlotte Owusu, Principal' },
        { type: 'paragraph', text: "Over 60 individual awards were presented across academic excellence, sporting achievement, character development, creative arts, and community service. This year's overall Best Student award was one of the most closely contested in the school's history, with the final decision reflecting not only academic performance but holistic contribution to school life." },
        { type: 'paragraph', text: "The keynote address was delivered by a distinguished alumnus now practising medicine in Accra, who spoke movingly about how his years at HDM shaped the values and work ethic that have defined his career. His words visibly moved many parents in the audience and drew a long standing ovation." },
        { type: 'paragraph', text: "The event concluded with a cultural performance by our Upper Primary students, followed by a reception for families on the school grounds. We extend our heartfelt congratulations to every pupil recognised today — and to every member of the HDM family who made this year's ceremony so special." },
    ],
}

// ── Posts grid ─────────────────────────────
export const posts: Post[] = [
    {
        id: 'robotics',
        slug: 'robotics-team-eastern-region-stem-2025',
        category: 'news', categoryLabel: 'News',
        date: '14 October 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/home6_nogd8s', imageAlt: 'Robotics',
        headline: 'HDM Robotics Team Places Second at Eastern Region STEM Championship',
        excerpt: "Our Upper Primary robotics team represented HDM with distinction at this year's Eastern Region STEM Championship, earning second place in the engineering challenge and top marks for innovation.",
        author: 'HDM STEM Department',
        content: [
            { type: 'paragraph', text: "We are immensely proud to announce that our Upper Primary robotics team finished in second place at the 2025 Eastern Region STEM Championship, held at the University of Energy and Natural Resources in Sunyani. The team — comprising six Year 6 and Year 7 students — competed against 18 schools from across the region over a two-day competition." },
            { type: 'paragraph', text: "The team earned maximum marks in the innovation category for their autonomous waste-sorting robot, which drew significant praise from the judging panel." },
            { type: 'pullquote', text: '"These students didn\'t just build a robot. They identified a real problem in their community and built a solution." — Competition Lead Judge' },
            { type: 'paragraph', text: "HDM has participated in the Eastern Region STEM Championship for the past four years, with this year's second-place finish representing our highest achievement to date. The team will now focus their efforts on preparing for the national competition, scheduled for February 2026." },
        ],
    },
    {
        id: 'careerday',
        slug: 'career-day-2025',
        category: 'event', categoryLabel: 'Event',
        date: '14 October 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/Career_Day_bdnpcu', imageAlt: 'Career Day',
        headline: 'Career Day 2025 — Inspiring the Next Generation',
        excerpt: "Students across all year groups were treated to an inspiring lineup of guest speakers at this year's Career Day, including doctors, engineers, lawyers, and creative professionals from across Ghana.",
        author: 'HDM Student Development',
        content: [
            { type: 'paragraph', text: "HDM's annual Career Day took place on Tuesday 14th October, bringing together an inspiring group of professionals from across Ghana to share their career journeys with our students. This year's theme — \"Dream It. Build It. Live It.\" — set the tone for a day of energy, ambition, and possibility." },
            { type: 'paragraph', text: "Guest speakers included a medical doctor, a software engineer, a lawyer, an architect, a journalist, and a professional athlete — each of whom spoke candidly about their path from school to career, the obstacles they overcame, and the advice they wish they had received as young students." },
            { type: 'paragraph', text: "Students from Year 4 through Year 7 participated in small group sessions with each speaker, giving them the chance to ask questions and engage in meaningful conversations. We are deeply grateful to all our guest speakers for giving their time so generously." },
        ],
    },
    {
        id: 'press1',
        slug: 'hdm-ghana-education-service-report-2025',
        category: 'press', categoryLabel: 'Press',
        date: '2 September 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/home1_dw0ei5', imageAlt: 'Press',
        headline: "HDM Featured in Ghana Education Service's Annual Schools Report",
        excerpt: "Heaven's Dew Montessori has been highlighted in the Ghana Education Service's 2025 annual report as one of the Eastern Region's leading private primary schools for academic outcomes and innovation.",
        author: 'Ghana Education Service Report',
        content: [
            { type: 'paragraph', text: "Heaven's Dew Montessori has been recognised in the Ghana Education Service's 2025 Annual Schools Report as one of the Eastern Region's leading private primary schools, cited specifically for academic outcomes, innovative teaching methodology, and community engagement." },
            { type: 'pullquote', text: '"Heaven\'s Dew Montessori stands as a model for how child-centred education can deliver both strong academic outcomes and well-rounded personal development." — Ghana Education Service, 2025 Annual Report' },
            { type: 'paragraph', text: "Director Dr. Felix Owusu acknowledged the recognition with characteristic humility: \"This is a reflection of the dedication of every member of our staff and the trust our families place in us each day. We do not rest on recognition — we use it as motivation to go further.\"" },
        ],
    },
    {
        id: 'openday',
        slug: 'january-open-day-2025',
        category: 'news', categoryLabel: 'News',
        date: '11 January 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/IMG-20250502-WA0106_svmbvh', imageAlt: 'Open Day',
        headline: "A Wonderful Turnout at HDM's January Open Day",
        excerpt: "Over 40 prospective families attended our January Open Day, touring the campus, meeting staff, and experiencing our Montessori classrooms in action. Our next Open Day is scheduled for March 2026.",
        author: 'HDM Admissions',
        content: [
            { type: 'paragraph', text: "Over 40 prospective families attended HDM's January Open Day on Saturday 11th January, making it one of our most well-attended open events to date. Families came from across Koforidua and beyond." },
            { type: 'paragraph', text: "The morning began with a welcome address from our Principal, Mrs. Charlotte Owusu, followed by guided tours led by our senior teachers and Year 7 student ambassadors. Visitors observed live lessons and explored our campus facilities." },
            { type: 'paragraph', text: "Our next Open Day is scheduled for Saturday 15th March 2026, from 9 AM to 12 PM. If you would like to attend, please RSVP via our Admissions page." },
        ],
    },
    {
        id: 'carols',
        slug: 'christmas-carols-2025',
        category: 'event', categoryLabel: 'Event',
        date: '19 December 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/IMG_8049_wz9imc', imageAlt: 'Christmas Carols',
        headline: 'Christmas Carols Service 2025 — A Joyful End to the Year',
        excerpt: "Students, staff, and parents gathered for our beloved annual Christmas Carols Service — a heartwarming tradition that brings the whole HDM community together to close the academic year with music and gratitude.",
        author: 'HDM Communications',
        content: [
            { type: 'paragraph', text: "On Thursday 19th December, Heaven's Dew Montessori held its beloved Annual Christmas Carols Service — a tradition that has become one of the most anticipated events in the HDM calendar." },
            { type: 'paragraph', text: "This year's service featured performances from every year group, from our youngest Little Angels singing their first carols to our Year 7 students delivering a four-part harmony arrangement that drew spontaneous applause." },
            { type: 'paragraph', text: "Wishing all our families a peaceful and joyful holiday season. We look forward to welcoming everyone back for Term 1 on Monday 6th January 2026." },
        ],
    },
    {
        id: 'press2',
        slug: 'koforidua-fm-spotlight',
        category: 'press', categoryLabel: 'Press',
        date: '5 August 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/school_building_ftvs0v', imageAlt: 'Press',
        headline: 'Koforidua FM Spotlight: "How HDM is Redefining Primary Education in the East"',
        excerpt: "Our Principal, Mrs. Charlotte Owusu, sat down with Koforidua FM to discuss the Montessori philosophy, HDM's growth over the past eight years, and our vision for the next decade.",
        author: 'Koforidua FM',
        content: [
            { type: 'paragraph', text: "In an extended interview with Koforidua FM, HDM Principal Mrs. Charlotte Owusu spoke at length about the school's journey since its founding in 2017 and the Montessori philosophy's growing relevance in the Ghanaian context." },
            { type: 'pullquote', text: '"Education that does not see the whole child is not education at all. At HDM, we are committed to nurturing every dimension of who a child is and can become." — Mrs. Charlotte Owusu' },
            { type: 'paragraph', text: "Mrs. Owusu also spoke candidly about HDM's long-term vision to become a centre of excellence for Montessori education across West Africa. The full interview is available on the Koforidua FM website and on the HDM YouTube channel." },
        ],
    },
    {
        id: 'announce1',
        slug: 'term-1-2026-begins',
        category: 'announcement', categoryLabel: 'Announcement',
        date: '3 January 2026',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/home5_iaxp6n', imageAlt: 'Announcement',
        headline: 'Term 1 2026 Begins — Welcome Back to All HDM Families',
        excerpt: "We are delighted to welcome all students and families back for the start of the 2025/2026 academic year. Term 1 officially began on Monday 6th January.",
        author: 'HDM Administration',
        content: [
            { type: 'paragraph', text: "We are delighted to welcome all students and families back to Heaven's Dew Montessori for the start of the 2025/2026 academic year. Term 1 officially began on Monday 6th January 2026." },
            { type: 'paragraph', text: "The updated school calendar for the full academic year is available on this page and has been emailed to all families. A printed copy is also available from the front office." },
            { type: 'paragraph', text: "We look forward to a productive, inspiring, and joyful term ahead. As always, we are grateful for the partnership and support of every HDM family." },
        ],
    },
    {
        id: 'exams',
        slug: 'end-of-term-exams-2025',
        category: 'news', categoryLabel: 'News',
        date: '12 December 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/home1_dw0ei5', imageAlt: 'Exams',
        headline: 'End-of-Term Examinations Concluded Successfully Across All Year Groups',
        excerpt: "Students across all year groups have successfully completed their end-of-term examinations. Report cards will be distributed on the final day of term, Friday 20th December 2025.",
        author: 'HDM Academic Office',
        content: [
            { type: 'paragraph', text: "We are pleased to confirm that end-of-term examinations for all year groups have been completed successfully. Students across all programmes sat their assessments during the week of 8th–12th December, with the process running smoothly." },
            { type: 'paragraph', text: "Report cards will be printed and ready for collection on the final day of term, Friday 20th December 2025. Parents are kindly asked to collect report cards in person from the school office between 8 AM and 2 PM on that date." },
        ],
    },
    {
        id: 'sportsday',
        slug: 'inter-house-sports-2025',
        category: 'event', categoryLabel: 'Event',
        date: '22 February 2025',
        image: 'https://res.cloudinary.com/dmd0h8mzp/image/upload/v1/home6_nogd8s', imageAlt: 'Sports Day',
        headline: 'Inter-House Sports Competition 2025 — Green House Takes the Trophy',
        excerpt: "Green House were crowned Inter-House champions at this year's Sports Competition, edging out Blue House in a thrilling final day of athletics, football, and relay races.",
        author: 'HDM Sports Department',
        content: [
            { type: 'paragraph', text: "Green House have been crowned Inter-House Sports Champions for the 2025 competition, edging out Blue House by a narrow margin in what proved to be one of the most competitive sporting days in recent HDM history." },
            { type: 'pullquote', text: '"This is what school sport is all about — every child competing, every child cheering, every house giving everything they have." — Mr. Henry Obodai Ayeh, Sports Coordinator' },
            { type: 'paragraph', text: "Congratulations to Green House on a thoroughly deserved victory, and to every student who competed with such spirit and sportsmanship. Full results and a photo gallery are available in the Gallery section." },
        ],
    },
]

// ── Category badge helper ──────────────────
export function categoryBadgeClass(cat: PostCategory): string {
    const map: Record<PostCategory, string> = {
        news:         'bg-accent text-accent-foreground',
        announcement: 'bg-destructive text-destructive-foreground',
        event:        'bg-primary text-primary-foreground',
        press:        'bg-muted text-foreground',
    }
    return map[cat]
}

// ── Filter config ──────────────────────────
export const postFilters: { id: PostCategory | 'all'; label: string; count: number }[] = [
    { id: 'all',          label: 'All',           count: posts.length },
    { id: 'news',         label: 'News',          count: posts.filter(p => p.category === 'news').length },
    { id: 'announcement', label: 'Announcements', count: posts.filter(p => p.category === 'announcement').length },
    { id: 'event',        label: 'Events',        count: posts.filter(p => p.category === 'event').length },
    { id: 'press',        label: 'Press',         count: posts.filter(p => p.category === 'press').length },
]

// ── Announcements ──────────────────────────
export const announcements: Announcement[] = [
    { id: 'a1', title: 'Open Day — Saturday 15 March 2026',          urgency: 'new',      urgencyLabel: 'New',      desc: 'We are hosting our next Open Day on Saturday 15 March 2026, 9 AM – 12 PM. All prospective families are warmly invited. RSVP via the Admissions page.',                                                                                                              posted: 'Posted 1 March 2026' },
    { id: 'a2', title: 'Term 1 Report Cards — Collection Notice',     urgency: 'reminder', urgencyLabel: 'Reminder', desc: 'Term 1 report cards are available for collection from the school office from Monday 30 March. Please bring your ID. Any uncollected reports will be sent home with students on the first day of Term 2.',                                                       posted: 'Posted 25 March 2026' },
    { id: 'a3', title: 'Revised School Fees — 2026/2027 Academic Year', urgency: 'info',   urgencyLabel: 'Info',     desc: 'The revised fee structure for the 2026/2027 academic year has been approved by the Board. A detailed breakdown has been emailed to all current families. Please contact the office with any questions.',                                                         posted: 'Posted 10 February 2026' },
    { id: 'a4', title: 'Mandatory Health Screening — All Pupils',     urgency: 'urgent',   urgencyLabel: 'Urgent',   desc: 'In line with the Ghana Health Service guidelines, all pupils are required to complete a health screening before the start of Term 2. Forms are available from the school office and must be returned by 15 April.',                                              posted: 'Posted 5 January 2026' },
    { id: 'a5', title: 'New Computer Lab Now Open',                   urgency: 'info',     urgencyLabel: 'Info',     desc: 'We are thrilled to announce that our newly upgraded Computer Laboratory is now open and in full use. The lab features 30 new workstations and supports ICT lessons for all year groups.',                                                                      posted: 'Posted 8 January 2026' },
]

// ── Term dates ─────────────────────────────
export const termDates: TermRow[] = [
    { name: 'Term 1',          start: '6 Jan 2026',  end: '28 Mar 2026',            duration: '12 weeks', isCurrent: true },
    { name: 'Easter Break',    start: '',            end: '29 Mar – 19 Apr 2026',   duration: '3 weeks',  isBreak: true },
    { name: 'Term 2',          start: '20 Apr 2026', end: '11 Jul 2026',            duration: '12 weeks' },
    { name: 'Summer Break',    start: '',            end: '12 Jul – 2 Aug 2026',    duration: '3 weeks',  isBreak: true },
    { name: 'Summer Programme',start: '13 Jul 2026', end: '9 Aug 2026',             duration: '4 weeks' },
    { name: 'Term 3',          start: '3 Aug 2026',  end: '25 Oct 2026',            duration: '12 weeks' },
]
