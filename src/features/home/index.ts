export const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=85",
    caption: "Early Learners · Discovery Room",
  },
  {
    src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=700&q=85",
    caption: "Hands-On Materials · Primary Class",
  },
  {
    src: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=700&q=85",
    caption: "Nature Study · Garden Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&q=85",
    caption: "Quiet Reading · Library Corner",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&q=85",
    caption: "Creative Work · Art Atelier",
  },
  {
    src: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=700&q=85",
    caption: "Science Wonder · Lab Day",
  },
];

export interface NewsInterface {
  id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
}
export const news: NewsInterface[] = [
  {
    id: "1",
    title: "Heaven's Dew Wins Regional Science Fair",
    excerpt: "Our Year 6 students took first place at the Eastern Region Science & Innovation Fair held in Koforidua.",
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-03-01T00:00:00Z",
  },
  {
    id: "2",
    title: "New Montessori Reading Corner Opens",
    excerpt: "We are thrilled to unveil our brand-new reading corner - a calm, child-led space stocked with over 300 curated books.",
    createdAt: "2026-02-20T00:00:00Z",
    updatedAt: "2026-02-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Admission Open for 2026/2027 Academic Year",
    excerpt: "Applications are now open for Little Angels through Year 7. Early enrolment spots are limited - apply today.",
    createdAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-02-10T00:00:00Z",
  },
  {
    id: "4",
    title: "HDMs Celebrates 25 Years of Excellence",
    excerpt: "Heaven's Dew Montessori marks a quarter century of nurturing children grounded in Faith, Diligence, and Excellence.",
    createdAt: "2026-01-28T00:00:00Z",
    updatedAt: "2026-01-28T00:00:00Z",
  },
];

export interface ExperienceInterface {
  id: string;
  title: string;
  slug: string;
  href: string;
  imageUrl: string;
}

export const experiences: ExperienceInterface[] = [
  { id: "1", title: "The Mission",            slug: "mission",   href: "/about-us#vision",      imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=85" },
  { id: "2", title: "The Community",          slug: "community", href: "/about-us#houses",      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=85" },
  { id: "3", title: "The Boarding Experience",slug: "boarding",  href: "/about-us#story",       imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=85" },
  { id: "4", title: "The Academics",          slug: "academics", href: "/about-us#montessori",  imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=85" },
  { id: "5", title: "The Arts Program",       slug: "arts",      href: "/about-us#philosophy",  imageUrl: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&q=85" },
];

export interface StudentsInterface {
  name: string;
  role: string;
  image: string
}
export interface ParentVoice {
  name: string
  role: string
  quote: string
  image: string
}

export const parentVoices: ParentVoice[] = [
  {
    name: "ABENA\nMENSAH",
    role: "Parent · Year 3",
    quote: "HDM gave our daughter a love of learning we never thought possible at this age.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=85",
  },
  {
    name: "KWAME\nASANTE",
    role: "Parent · Year 5",
    quote: "The confidence my son has gained here is something no other school could have given him.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85",
  },
  {
    name: "EFUA\nOWUSU",
    role: "Parent · Little Angels",
    quote: "From the very first visit, we knew this was where our child belonged.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85",
  },
  {
    name: "KOFI\nBOATENG",
    role: "Parent · Year 1 & Year 4",
    quote: "Both our children have flourished here. HDM feels like a second home.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85",
  },
  {
    name: "AKOSUA\nTEKYI",
    role: "Parent · Year 6",
    quote: "Watching her grow into such a curious, kind, and driven young person - that's HDM.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=85",
  },
]

export const students: StudentsInterface[] = [
  {
    name: "ELSIE\nAMBROSE",
    role: "Alumni",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=85",
  },
  {
    name: "GAEL\nRODRIGUEZ",
    role: "Alumni",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85",
  },
  {
    name: "SHAYLA\nLOPEZ",
    role: "Alumni",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=85",
  },
  {
    name: "BEAU\nAHLUWAHLIA",
    role: "Alumni",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85",
  },
  {
    name: "KEILA\nWAKAO",
    role: "Alumni",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=85",
  },
]

export interface EventsInterface {
  id: string;
  eventDate: string;
  title: string;
  time: string;
  location: string | null;

}
export const events: EventsInterface[] = [
  {
    id: "1",
    eventDate: "2025-03-12",
    title: "Annual Science Fair",
    time: "9:00 AM – 12:00 PM",
    location: "Main Hall",
  },
  {
    id: "2",
    eventDate: "2025-03-12",
    title: "Spring Break Travel Days",
    time: "All Day",
    location: null,
  },
  {
    id: "3",
    eventDate: "2025-03-12",
    title: "Spring Break Travel Days",
    time: "All Day",
    location: null,
  },
  {
    id: "4",
    eventDate: "2025-03-12",
    title: "Parent & Teacher Forum",
    time: "3:00 PM – 5:00 PM",
    location: "Conference Room B",
  },
  {
    id: "5",
    eventDate: "2025-03-12",
    title: "Arts Showcase Evening",
    time: "6:00 PM – 9:00 PM",
    location: "Auditorium",
  },
  {
    id: "6",
    eventDate: "2025-03-12",
    title: "End of Term Assembly",
    time: "10:00 AM – 11:30 AM",
    location: "Assembly Hall",
  },
]
