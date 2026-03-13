export type NavItem = {
  title: string
  href?: string
  children?: {
    title: string
    href: string
  }[]
}

export const navItems: NavItem[] = [
  {
    title: "Admission",
    children: [
      { title: "Apply", href: "/apply" },
      { title: "Tuition", href: "/tuition" },
      { title: "Visit Campus", href: "/visit" },
    ],
  },
  {
    title: "Arts",
    href: "/arts",
  },
  {
    title: "Academics",
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