import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Parents & Families",
  description: "Learn how Heaven's Dew Montessori partners with parents and families - through the PTA, open mornings, parent evenings, and countless ways to get involved in Koforidua, Ghana.",
  openGraph: {
    title: "Parents & Families",
    description: "At HDM, parents are partners. Discover how we work together with families to give every child the best possible start in Koforidua, Ghana.",
    url: "https://www.hdm.edu.gh/community/parents",
  },
  twitter: {
    title: "Parents & Families",
    description: "At HDM, parents are partners. Discover how we work together with families to give every child the best possible start in Koforidua, Ghana.",
  },
}

import { ParentsPage } from "@/components/pages/community/parents-page"

export default function Parents() {
  return <ParentsPage />
}
