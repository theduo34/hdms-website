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
  { title: "Events", href: "/calender?filter=event" },
  { title: "Calender", href: "/calender"}
]

export const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about-us',
  },
  {
    title: "Admission",
    children: [
      { title: "Apply", href: "/admissions/apply" },
      { title: "Tuition", href: "/admissions/tuition" },
      { title: "Visit Campus", href: "/admissions/visit-campus" },
    ],
  },
  {
    title: "Programmes",
    href: '/programmes',
    // children: [
    //   { title: "Curriculum", href: "/curriculum" },
    //   { title: "Departments", href: "/departments" },
    // ],
  },
  {
    title: "Campus Life",
    children: [
      { title: "School Day", href: "/campus-life/school-day" },
      { title: "Sports & Clubs", href: "/campus-life/sports-and-clubs" },
      { title: "Facilities", href: "/campus-life/facilities" },
      { title: "Wellbeing", href: "/campus-life/wellbeing" },
    ],
  },
  {
    title: "Community",
    children: [
      { title: "House System", href: "/community/house-system" },
      { title: "Parents & Families", href: "/community/parents" },
      { title: "Service & Outreach", href: "/community/service" },
    ],
  },
]