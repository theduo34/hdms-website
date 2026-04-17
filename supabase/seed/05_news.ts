// supabase/seed/05_news.ts
// Seeds news_posts and announcements.
// Imports data directly from the feature files to stay in sync.

import type { SupabaseClient } from '@supabase/supabase-js'
import { ASSET } from './constants'

// Maps news post slug → cover asset ID
const coverAssetBySlug: Record<string, string> = {
  'speech-prize-giving-day-2025':            ASSET.NEWS_FEATURED,
  'robotics-team-eastern-region-stem-2025':  ASSET.NEWS_ROBOTICS,
  'career-day-2025':                         ASSET.NEWS_CAREERDAY,
  'hdm-ghana-education-service-report-2025': ASSET.NEWS_PRESS1,
  'january-open-day-2025':                   ASSET.NEWS_OPENDAY,
  'christmas-carols-2025':                   ASSET.NEWS_CAROLS,
  'koforidua-fm-spotlight':                  ASSET.NEWS_PRESS2,
  'term-1-2026-begins':                      ASSET.NEWS_ANNOUNCE1,
  'end-of-term-exams-2025':                  ASSET.NEWS_EXAMS,
  'inter-house-sports-2025':                 ASSET.NEWS_SPORTSDAY,
}

function parseDate(display: string): string {
  // Converts "28 November 2025" → "2025-11-28T00:00:00Z"
  return new Date(display).toISOString()
}

export async function seedNews(db: SupabaseClient) {
  console.log('  → seeding news_posts...')

  const posts = [
    {
      slug:           'speech-prize-giving-day-2025',
      category:       'news',
      category_label: 'School News',
      headline:       'HDM Celebrates Outstanding Achievements at 2025 Speech & Prize Giving Day',
      excerpt:        "Heaven's Dew Montessori brought together students, parents, staff, and distinguished guests for the most celebrated event in our school calendar.",
      author:         'HDM Communications',
      cover_asset_id: coverAssetBySlug['speech-prize-giving-day-2025'],
      content:        [
        { type: 'paragraph', text: "Heaven's Dew Montessori brought together students, parents, staff, and distinguished guests on Friday 28th November for the most celebrated event in our school calendar - the Annual Speech and Prize Giving Day." },
        { type: 'pullquote', text: '"Every child at HDM is a winner. Today we simply give them the stage to show the world what they are made of." - Mrs. Charlotte Owusu, Principal' },
        { type: 'paragraph', text: 'Over 60 individual awards were presented across academic excellence, sporting achievement, character development, creative arts, and community service.' },
        { type: 'paragraph', text: 'The keynote address was delivered by a distinguished alumnus now practising medicine in Accra, who spoke movingly about how his years at HDM shaped the values and work ethic that have defined his career.' },
        { type: 'paragraph', text: 'The event concluded with a cultural performance by our Upper Primary students, followed by a reception for families on the school grounds.' },
      ],
      featured:     true,
      published_at: parseDate('28 November 2025'),
    },
    {
      slug:           'robotics-team-eastern-region-stem-2025',
      category:       'news',
      category_label: 'News',
      headline:       'HDM Robotics Team Places Second at Eastern Region STEM Championship',
      excerpt:        "Our Upper Primary robotics team represented HDM with distinction at this year's Eastern Region STEM Championship, earning second place in the engineering challenge.",
      author:         'HDM STEM Department',
      cover_asset_id: coverAssetBySlug['robotics-team-eastern-region-stem-2025'],
      content:        [
        { type: 'paragraph', text: 'We are immensely proud to announce that our Upper Primary robotics team finished in second place at the 2025 Eastern Region STEM Championship.' },
        { type: 'paragraph', text: 'The team earned maximum marks in the innovation category for their autonomous waste-sorting robot, which drew significant praise from the judging panel.' },
        { type: 'pullquote', text: '"These students didn\'t just build a robot. They identified a real problem in their community and built a solution." - Competition Lead Judge' },
        { type: 'paragraph', text: 'The team will now focus their efforts on preparing for the national competition, scheduled for February 2026.' },
      ],
      featured:     false,
      published_at: parseDate('14 October 2025'),
    },
    {
      slug:           'career-day-2025',
      category:       'event',
      category_label: 'Event',
      headline:       'Career Day 2025 – Inspiring the Next Generation',
      excerpt:        'Students across all year groups were treated to an inspiring lineup of guest speakers including doctors, engineers, lawyers, and creative professionals from across Ghana.',
      author:         'HDM Student Development',
      cover_asset_id: coverAssetBySlug['career-day-2025'],
      content:        [
        { type: 'paragraph', text: 'HDM\'s annual Career Day took place on Tuesday 14th October, bringing together an inspiring group of professionals from across Ghana.' },
        { type: 'paragraph', text: 'Guest speakers included a medical doctor, a software engineer, a lawyer, an architect, a journalist, and a professional athlete.' },
        { type: 'paragraph', text: 'We are deeply grateful to all our guest speakers for giving their time so generously.' },
      ],
      featured:     false,
      published_at: parseDate('14 October 2025'),
    },
    {
      slug:           'hdm-ghana-education-service-report-2025',
      category:       'press',
      category_label: 'Press',
      headline:       "HDM Featured in Ghana Education Service's Annual Schools Report",
      excerpt:        "Heaven's Dew Montessori has been highlighted in the Ghana Education Service's 2025 annual report as one of the Eastern Region's leading private primary schools.",
      author:         'Ghana Education Service Report',
      cover_asset_id: coverAssetBySlug['hdm-ghana-education-service-report-2025'],
      content:        [
        { type: 'paragraph', text: "Heaven's Dew Montessori has been recognised in the Ghana Education Service's 2025 Annual Schools Report as one of the Eastern Region's leading private primary schools." },
        { type: 'pullquote', text: '"Heaven\'s Dew Montessori stands as a model for how child-centred education can deliver both strong academic outcomes and well-rounded personal development." - Ghana Education Service, 2025 Annual Report' },
        { type: 'paragraph', text: 'Director Dr. Felix Owusu acknowledged the recognition: "This is a reflection of the dedication of every member of our staff and the trust our families place in us each day."' },
      ],
      featured:     false,
      published_at: parseDate('2 September 2025'),
    },
    {
      slug:           'january-open-day-2025',
      category:       'news',
      category_label: 'News',
      headline:       "A Wonderful Turnout at HDM's January Open Day",
      excerpt:        'Over 40 prospective families attended our January Open Day, touring the campus, meeting staff, and experiencing our Montessori classrooms in action.',
      author:         'HDM Admissions',
      cover_asset_id: coverAssetBySlug['january-open-day-2025'],
      content:        [
        { type: 'paragraph', text: "Over 40 prospective families attended HDM's January Open Day on Saturday 11th January, making it one of our most well-attended open events to date." },
        { type: 'paragraph', text: 'The morning began with a welcome address from our Principal, Mrs. Charlotte Owusu, followed by guided tours led by senior teachers and Year 7 student ambassadors.' },
        { type: 'paragraph', text: 'Our next Open Day is scheduled for Saturday 15th March 2026, from 9 AM to 12 PM.' },
      ],
      featured:     false,
      published_at: parseDate('11 January 2025'),
    },
    {
      slug:           'christmas-carols-2025',
      category:       'event',
      category_label: 'Event',
      headline:       'Christmas Carols Service 2025 – A Joyful End to the Year',
      excerpt:        'Students, staff, and parents gathered for our beloved annual Christmas Carols Service – a heartwarming tradition that brings the whole HDM community together.',
      author:         'HDM Communications',
      cover_asset_id: coverAssetBySlug['christmas-carols-2025'],
      content:        [
        { type: 'paragraph', text: "On Thursday 19th December, Heaven's Dew Montessori held its beloved Annual Christmas Carols Service." },
        { type: 'paragraph', text: "This year's service featured performances from every year group, from our youngest Little Angels singing their first carols to our Year 7 students delivering a four-part harmony arrangement." },
        { type: 'paragraph', text: 'Wishing all our families a peaceful and joyful holiday season. We look forward to welcoming everyone back for Term 1 on Monday 6th January 2026.' },
      ],
      featured:     false,
      published_at: parseDate('19 December 2025'),
    },
    {
      slug:           'koforidua-fm-spotlight',
      category:       'press',
      category_label: 'Press',
      headline:       'Koforidua FM Spotlight: "How HDM is Redefining Primary Education in the East"',
      excerpt:        "Our Principal, Mrs. Charlotte Owusu, sat down with Koforidua FM to discuss the Montessori philosophy and HDM's growth over the past eight years.",
      author:         'Koforidua FM',
      cover_asset_id: coverAssetBySlug['koforidua-fm-spotlight'],
      content:        [
        { type: 'paragraph', text: "In an extended interview with Koforidua FM, HDM Principal Mrs. Charlotte Owusu spoke at length about the school's journey since its founding in 2017." },
        { type: 'pullquote', text: '"Education that does not see the whole child is not education at all." - Mrs. Charlotte Owusu' },
        { type: 'paragraph', text: "Mrs. Owusu also spoke candidly about HDM's long-term vision to become a centre of excellence for Montessori education across West Africa." },
      ],
      featured:     false,
      published_at: parseDate('5 August 2025'),
    },
    {
      slug:           'term-1-2026-begins',
      category:       'announcement',
      category_label: 'Announcement',
      headline:       'Term 1 2026 Begins – Welcome Back to All HDM Families',
      excerpt:        "We are delighted to welcome all students and families back for the start of the 2025/2026 academic year. Term 1 officially began on Monday 6th January.",
      author:         'HDM Administration',
      cover_asset_id: coverAssetBySlug['term-1-2026-begins'],
      content:        [
        { type: 'paragraph', text: "We are delighted to welcome all students and families back to Heaven's Dew Montessori for the start of the 2025/2026 academic year." },
        { type: 'paragraph', text: 'The updated school calendar for the full academic year is available on this page and has been emailed to all families.' },
        { type: 'paragraph', text: 'We look forward to a productive, inspiring, and joyful term ahead.' },
      ],
      featured:     false,
      published_at: parseDate('3 January 2026'),
    },
    {
      slug:           'end-of-term-exams-2025',
      category:       'news',
      category_label: 'News',
      headline:       'End-of-Term Examinations Concluded Successfully Across All Year Groups',
      excerpt:        'Students across all year groups have successfully completed their end-of-term examinations. Report cards will be distributed on Friday 20th December 2025.',
      author:         'HDM Academic Office',
      cover_asset_id: coverAssetBySlug['end-of-term-exams-2025'],
      content:        [
        { type: 'paragraph', text: 'We are pleased to confirm that end-of-term examinations for all year groups have been completed successfully.' },
        { type: 'paragraph', text: 'Report cards will be printed and ready for collection on the final day of term, Friday 20th December 2025.' },
      ],
      featured:     false,
      published_at: parseDate('12 December 2025'),
    },
    {
      slug:           'inter-house-sports-2025',
      category:       'event',
      category_label: 'Event',
      headline:       'Inter-House Sports Competition 2025 – Green House Takes the Trophy',
      excerpt:        'Green House were crowned Inter-House champions at this year\'s Sports Competition, edging out Blue House in a thrilling final day of athletics and relay races.',
      author:         'HDM Sports Department',
      cover_asset_id: coverAssetBySlug['inter-house-sports-2025'],
      content:        [
        { type: 'paragraph', text: 'Green House have been crowned Inter-House Sports Champions for the 2025 competition, edging out Blue House by a narrow margin.' },
        { type: 'pullquote', text: '"This is what school sport is all about – every child competing, every child cheering." - Mr. Henry Obodai Ayeh, Sports Coordinator' },
        { type: 'paragraph', text: 'Full results and a photo gallery are available in the Gallery section.' },
      ],
      featured:     false,
      published_at: parseDate('22 February 2025'),
    },
  ]

  const { error: postErr } = await db
    .from('news_posts')
    .upsert(posts, { onConflict: 'slug' })
  if (postErr) throw new Error(`news_posts seed failed: ${postErr.message}`)
  console.log(`     ✓ ${posts.length} news posts`)

  // ── Announcements ────────────────────────────────────────────────────────────
  console.log('  → seeding announcements...')

  const announcementRows = [
    { title: 'Open Day – Saturday 15 March 2026',             urgency: 'new',      urgency_label: 'New',      description: 'We are hosting our next Open Day on Saturday 15 March 2026, 9 AM – 12 PM. All prospective families are warmly invited. RSVP via the Admissions page.',                                                posted_at: '2026-03-01T00:00:00Z' },
    { title: 'Term 1 Report Cards – Collection Notice',       urgency: 'reminder', urgency_label: 'Reminder', description: 'Term 1 report cards are available for collection from the school office from Monday 30 March. Please bring your ID. Uncollected reports will be sent home on the first day of Term 2.',          posted_at: '2026-03-25T00:00:00Z' },
    { title: 'Revised School Fees – 2026/2027 Academic Year', urgency: 'info',     urgency_label: 'Info',     description: 'The revised fee structure for the 2026/2027 academic year has been approved by the Board. A detailed breakdown has been emailed to all current families. Contact the office with any questions.',   posted_at: '2026-02-10T00:00:00Z' },
    { title: 'Mandatory Health Screening – All Pupils',       urgency: 'urgent',   urgency_label: 'Urgent',   description: 'In line with Ghana Health Service guidelines, all pupils must complete a health screening before the start of Term 2. Forms are available from the office and must be returned by 15 April.',         posted_at: '2026-01-05T00:00:00Z' },
    { title: 'New Computer Lab Now Open',                     urgency: 'info',     urgency_label: 'Info',     description: 'We are thrilled to announce that our newly upgraded Computer Laboratory is now open. The lab features 30 new workstations and supports ICT lessons for all year groups.',                            posted_at: '2026-01-08T00:00:00Z' },
  ]

  const { error: annErr } = await db
    .from('announcements')
    .upsert(announcementRows, { onConflict: 'id' })
  if (annErr) throw new Error(`announcements seed failed: ${annErr.message}`)
  console.log(`     ✓ ${announcementRows.length} announcements`)
}
