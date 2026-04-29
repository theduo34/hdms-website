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
