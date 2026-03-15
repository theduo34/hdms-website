export type NavItem = {
  title: string
  href?: string
  children?: {
    title: string
    href: string
  }[]
}

export const topNavItems: NavItem[] = [
  { title: "News & Announcements", href: "/news-&-announcements" },
  { title: "Gallery", href: "/gallery" },
  { title: "Events", href: "/events" },
  { title: "Calender", href: "/calender"}
]

export const navItems: NavItem[] = [
  {
    title: 'About',
    href: '/about-us',
  },
  {
    title: "Admission",
    children: [
      { title: "Apply", href: "/admission/apply" },
      { title: "Tuition", href: "/admission/tuition" },
      { title: "Visit Campus", href: "/admission/visit-campus" },
    ],
  },
  {
    title: "Programmes",
    children: [
      { title: "Curriculum", href: "/curriculum" },
      { title: "Departments", href: "/departments" },
    ],
  },
  {
    title: "Campus Life",
    href: "/campus-life",
  },
  {
    title: "Community & Belonging",
    href: "/community",
  },
]