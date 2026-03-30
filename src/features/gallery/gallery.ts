export type MainCategory = 'photos' | 'videos' | 'events'

export type PhotoSub = 'all' | 'school-life' | 'events' | 'sports' | 'staff' | 'campus'
export type VideoSub = 'all' | 'highlights' | 'events' | 'assemblies' | 'sports'
export type EventSub = 'all' | 'term-1' | 'term-2' | 'term-3' | 'special'

export type SubCategory = PhotoSub | VideoSub | EventSub

export interface GalleryPhoto {
    id: string
    type: 'photos'
    subCategory: PhotoSub
    src: string
    alt: string
    title: string
    createdAt: string   // ISO 8601 - from DB
    width: number
    height: number
}

export interface GalleryVideo {
    id: string
    type: 'videos'
    subCategory: VideoSub
    thumbnail: string
    alt: string
    title: string
    createdAt: string   // ISO 8601 - from DB
    duration: string
    videoUrl: string
    width: number
    height: number
}

export interface GalleryEvent {
    id: string
    type: 'events'
    subCategory: EventSub
    coverImage: string
    alt: string
    title: string
    eventDate: string   // ISO 8601 - from DB
    description: string
    photoCount: number
    videoCount: number
    width: number
    height: number
}

export type GalleryItem = GalleryPhoto | GalleryVideo | GalleryEvent

const CDN = 'https://res.cloudinary.com/dmd0h8mzp/image/upload'
const cl = (t: string, id: string) => `${CDN}/${t}/v1/${id}`

export const dummyPhotos: GalleryPhoto[] = [
    { id: 'p1',  type: 'photos', subCategory: 'events',      src: cl('c_fill,ar_3:2,w_1200', 'speech_and_prize_giving_dg4atw'), alt: 'Speech and Prize Giving Day 2025',          title: 'Speech & Prize Giving Day 2025',        createdAt: '2025-11-28', width: 1200, height: 800  },
    { id: 'p2',  type: 'photos', subCategory: 'events',      src: cl('c_fill,ar_2:3,w_800',  'speech_and_prize_giving_dg4atw'), alt: 'Prize winner receiving award at HDM',        title: 'The Best Student Award',                createdAt: '2025-11-28', width: 800,  height: 1200 },
    { id: 'p3',  type: 'photos', subCategory: 'events',      src: cl('c_fill,ar_4:3,w_1000', 'Career_Day_bdnpcu'),             alt: 'Career Day 2025 at HDM',                    title: 'Career Day - Dream It. Build It.',      createdAt: '2025-10-14', width: 1000, height: 750  },
    { id: 'p4',  type: 'photos', subCategory: 'events',      src: cl('c_fill,ar_1:1,w_900',  'Career_Day_bdnpcu'),             alt: 'Students with professionals at Career Day', title: 'Students Meet the Professionals',       createdAt: '2025-10-14', width: 900,  height: 900  },
    { id: 'p5',  type: 'photos', subCategory: 'events',      src: cl('c_fill,ar_3:2,w_1200', 'IMG_8049_wz9imc'),              alt: 'Christmas Carols Service 2025',             title: 'Christmas Carols Service 2025',         createdAt: '2025-12-19', width: 1200, height: 800  },
    { id: 'p6',  type: 'photos', subCategory: 'events',      src: cl('c_fill,ar_9:16,w_720', 'IMG_8049_wz9imc'),              alt: 'Young students singing at Christmas',       title: 'Little Angels First Carols',            createdAt: '2025-12-19', width: 720,  height: 1280 },
    { id: 'p7',  type: 'photos', subCategory: 'school-life', src: cl('c_fill,ar_4:3,w_1000', 'home1_dw0ei5'),                 alt: 'Students in hands-on Montessori activity',  title: 'Hands-On Learning in Action',           createdAt: '2025-01-06', width: 1000, height: 750  },
    { id: 'p8',  type: 'photos', subCategory: 'school-life', src: cl('c_fill,ar_2:3,w_700',  'home1_dw0ei5'),                 alt: 'Child focused on Montessori materials',     title: 'The Power of Focus',                    createdAt: '2025-01-06', width: 700,  height: 1050 },
    { id: 'p9',  type: 'photos', subCategory: 'school-life', src: cl('c_fill,ar_16:9,w_1200','home5_iaxp6n'),                 alt: 'Year 6 group lesson with teacher',          title: 'Guided Discovery - Year 6',             createdAt: '2025-04-22', width: 1200, height: 675  },
    { id: 'p10', type: 'photos', subCategory: 'school-life', src: cl('c_fill,ar_3:4,w_800',  'home5_iaxp6n'),                 alt: 'Student reading independently',             title: 'Independent Reading Hour',              createdAt: '2025-04-22', width: 800,  height: 1067 },
    { id: 'p11', type: 'photos', subCategory: 'sports',      src: cl('c_fill,ar_3:2,w_1200', 'home6_nogd8s'),                 alt: 'Inter-House Sports Day 2025',               title: 'Inter-House Sports Day 2025',           createdAt: '2025-02-22', width: 1200, height: 800  },
    { id: 'p12', type: 'photos', subCategory: 'sports',      src: cl('c_fill,ar_2:3,w_700',  'home6_nogd8s'),                 alt: 'Athlete racing at HDM Sports Day',          title: 'Green House Takes the Lead',            createdAt: '2025-02-22', width: 700,  height: 1050 },
    { id: 'p13', type: 'photos', subCategory: 'sports',      src: cl('c_fill,ar_16:9,w_1200','home6_nogd8s'),                 alt: 'Relay race at HDM Sports Competition',      title: 'The Relay',                             createdAt: '2025-02-22', width: 1200, height: 675  },
    { id: 'p14', type: 'photos', subCategory: 'campus',      src: cl('c_fill,ar_3:2,w_1200', 'school_building_ftvs0v'),       alt: "Heaven's Dew Montessori school building",  title: 'Our School - Main Campus',              createdAt: '2025-01-01', width: 1200, height: 800  },
    { id: 'p15', type: 'photos', subCategory: 'campus',      src: cl('c_fill,ar_4:5,w_900',  'school_building_ftvs0v'),       alt: 'School entrance and gardens',              title: 'Welcome to HDM',                        createdAt: '2025-01-01', width: 900,  height: 1125 },
    { id: 'p16', type: 'photos', subCategory: 'campus',      src: cl('c_fill,ar_3:2,w_1200', 'IMG-20250502-WA0106_svmbvh'),  alt: 'Families touring campus at Open Day',       title: 'January Open Day 2025',                 createdAt: '2025-01-11', width: 1200, height: 800  },
    { id: 'p17', type: 'photos', subCategory: 'campus',      src: cl('c_fill,ar_1:1,w_900',  'IMG-20250502-WA0106_svmbvh'),  alt: 'Families exploring classrooms on Open Day', title: 'Open Day - Family Tours',               createdAt: '2025-01-11', width: 900,  height: 900  },
    { id: 'p18', type: 'photos', subCategory: 'staff',       src: cl('c_fill,ar_3:2,w_1200', 'home1_dw0ei5'),                 alt: 'HDM teaching staff at a professional day',  title: 'Our Teaching Team',                     createdAt: '2026-01-06', width: 1200, height: 800  },
    { id: 'p19', type: 'photos', subCategory: 'staff',       src: cl('c_fill,ar_4:3,w_1000', 'home5_iaxp6n'),                 alt: 'Teachers collaborating at HDM workshop',    title: 'Professional Development Day',          createdAt: '2026-01-06', width: 1000, height: 750  },
    { id: 'p20', type: 'photos', subCategory: 'school-life', src: cl('c_fill,ar_1:1,w_900',  'home1_dw0ei5'),                 alt: 'Montessori prepared classroom environment',  title: 'The Prepared Environment',              createdAt: '2026-01-06', width: 900,  height: 900  },
]

export const dummyVideos: GalleryVideo[] = [
    { id: 'v1', type: 'videos', subCategory: 'highlights',  thumbnail: cl('c_fill,ar_16:9,w_1200', 'speech_and_prize_giving_dg4atw'), alt: 'Speech Day highlights reel',     title: 'Speech & Prize Giving Day - Full Highlights',        createdAt: '2025-11-28', duration: '4:32',  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
    { id: 'v2', type: 'videos', subCategory: 'events',      thumbnail: cl('c_fill,ar_16:9,w_1200', 'IMG_8049_wz9imc'),              alt: 'Christmas Carols performance',    title: 'Christmas Carols Service 2025 - Full Recording',     createdAt: '2025-12-19', duration: '22:10', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
    { id: 'v3', type: 'videos', subCategory: 'sports',      thumbnail: cl('c_fill,ar_16:9,w_1200', 'home6_nogd8s'),                 alt: 'Sports Day highlights video',     title: 'Inter-House Sports Day 2025 - Highlights',           createdAt: '2025-02-22', duration: '3:18',  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
    { id: 'v4', type: 'videos', subCategory: 'assemblies',  thumbnail: cl('c_fill,ar_16:9,w_1200', 'home5_iaxp6n'),                 alt: 'Morning assembly at HDM',         title: "A Morning at Heaven's Dew - Assembly Walk-through",  createdAt: '2025-01-06', duration: '6:45',  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
    { id: 'v5', type: 'videos', subCategory: 'highlights',  thumbnail: cl('c_fill,ar_16:9,w_1200', 'Career_Day_bdnpcu'),             alt: 'Career Day video recap',          title: 'Career Day 2025 - Student Reactions',                createdAt: '2025-10-14', duration: '2:55',  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
    { id: 'v6', type: 'videos', subCategory: 'events',      thumbnail: cl('c_fill,ar_16:9,w_1200', 'IMG-20250502-WA0106_svmbvh'),  alt: 'Open Day tour video',             title: 'HDM Open Day - Campus Virtual Tour',                 createdAt: '2025-01-11', duration: '8:20',  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
    { id: 'v7', type: 'videos', subCategory: 'assemblies',  thumbnail: cl('c_fill,ar_16:9,w_1200', 'home1_dw0ei5'),                 alt: 'Classroom learning video',        title: 'Inside the Montessori Classroom - Year 4',           createdAt: '2025-04-22', duration: '5:00',  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
    { id: 'v8', type: 'videos', subCategory: 'highlights',  thumbnail: cl('c_fill,ar_16:9,w_1200', 'school_building_ftvs0v'),       alt: 'HDM year in review video',        title: 'HDM Year in Review - 2025',                          createdAt: '2025-12-31', duration: '12:05', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: 1200, height: 675 },
]

export const dummyEvents: GalleryEvent[] = [
    { id: 'ev1', type: 'events', subCategory: 'special',  coverImage: cl('c_fill,ar_3:2,w_1200', 'speech_and_prize_giving_dg4atw'), alt: 'Speech and Prize Giving Day',  title: 'Speech & Prize Giving Day 2025',        eventDate: '2025-11-28', description: 'Our most celebrated annual event - over 60 awards presented across academic, sporting, and character categories.', photoCount: 84, videoCount: 2, width: 1200, height: 800 },
    { id: 'ev2', type: 'events', subCategory: 'term-1',   coverImage: cl('c_fill,ar_3:2,w_1200', 'Career_Day_bdnpcu'),             alt: 'Career Day 2025',               title: 'Career Day 2025',                       eventDate: '2025-10-14', description: 'Students explored careers with doctors, engineers, lawyers, and creative professionals from across Ghana.', photoCount: 47, videoCount: 1, width: 1200, height: 800 },
    { id: 'ev3', type: 'events', subCategory: 'term-2',   coverImage: cl('c_fill,ar_3:2,w_1200', 'IMG_8049_wz9imc'),              alt: 'Christmas Carols 2025',         title: 'Christmas Carols Service 2025',         eventDate: '2025-12-19', description: 'A joyful close to the year - every year group performed, from our youngest Little Angels to the Year 7 choir.', photoCount: 63, videoCount: 3, width: 1200, height: 800 },
    { id: 'ev4', type: 'events', subCategory: 'term-3',   coverImage: cl('c_fill,ar_3:2,w_1200', 'home6_nogd8s'),                 alt: 'Inter-House Sports Day 2025',   title: 'Inter-House Sports Day 2025',           eventDate: '2025-02-22', description: 'Green House crowned champions in one of the most competitive sporting days in recent HDM history.', photoCount: 112, videoCount: 1, width: 1200, height: 800 },
    { id: 'ev5', type: 'events', subCategory: 'special',  coverImage: cl('c_fill,ar_3:2,w_1200', 'IMG-20250502-WA0106_svmbvh'),  alt: 'January Open Day 2025',         title: 'Open Day - January 2025',               eventDate: '2025-01-11', description: 'Over 40 prospective families toured our campus, observed live lessons, and met our teaching team.', photoCount: 38, videoCount: 1, width: 1200, height: 800 },
    { id: 'ev6', type: 'events', subCategory: 'term-1',   coverImage: cl('c_fill,ar_3:2,w_1200', 'home5_iaxp6n'),                 alt: 'Term 1 2026 First Day',         title: 'Welcome Back - Term 1, 2026',           eventDate: '2026-01-06', description: 'New faces, returning families, and the familiar excitement of day one in the 2025/2026 academic year.', photoCount: 29, videoCount: 0, width: 1200, height: 800 },
    { id: 'ev7', type: 'events', subCategory: 'term-2',   coverImage: cl('c_fill,ar_3:2,w_1200', 'home1_dw0ei5'),                 alt: 'STEM Championship 2025',        title: 'Eastern Region STEM Championship',      eventDate: '2025-10-01', description: 'Our robotics team earned second place and maximum marks in the innovation category at the regional STEM championship.', photoCount: 55, videoCount: 2, width: 1200, height: 800 },
    { id: 'ev8', type: 'events', subCategory: 'special',  coverImage: cl('c_fill,ar_3:2,w_1200', 'school_building_ftvs0v'),       alt: 'New Computer Lab Opening',      title: 'New Computer Laboratory Opens',         eventDate: '2026-01-08', description: '30 new workstations, fully equipped - our upgraded Computer Lab is now open for all year groups.', photoCount: 22, videoCount: 1, width: 1200, height: 800 },
]

export const subFilters: Record<MainCategory, { id: SubCategory; label: string }[]> = {
    photos: [
        { id: 'all',         label: 'All Photos'  },
        { id: 'school-life', label: 'School Life' },
        { id: 'events',      label: 'Events'      },
        { id: 'sports',      label: 'Sports'      },
        { id: 'staff',       label: 'Staff'       },
        { id: 'campus',      label: 'Campus'      },
    ],
    videos: [
        { id: 'all',        label: 'All Videos'  },
        { id: 'highlights', label: 'Highlights'  },
        { id: 'events',     label: 'Events'      },
        { id: 'assemblies', label: 'Assemblies'  },
        { id: 'sports',     label: 'Sports'      },
    ],
    events: [
        { id: 'all',     label: 'All Events' },
        { id: 'term-1',  label: 'Term 1'     },
        { id: 'term-2',  label: 'Term 2'     },
        { id: 'term-3',  label: 'Term 3'     },
        { id: 'special', label: 'Special'    },
    ],
}

export const PAGE_SIZE: Record<MainCategory, number> = {
    photos: 12,
    videos: 8,
    events: 6,
}
