export type NavItem = {
  title: string
  href?: string
  children?: {
    title: string
    href: string
  }[]
}

export const topNavItems: NavItem[] = [
  { title: "News", href: "news" },
  { title: "Gallery", href: "gallery" },
  { title: "Events", href: "events" },
  { title: "Calender", href: "calender"}
]

export const navItems: NavItem[] = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: "Admission",
    children: [
      { title: "Apply", href: "/apply" },
      { title: "Tuition", href: "/tuition" },
      { title: "Visit Campus", href: "/visit" },
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