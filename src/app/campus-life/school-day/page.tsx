import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "School Day",
  description: "Discover what a typical day looks like at Heaven's Dew Montessori — from morning assembly and the three-hour work cycle to specialist lessons and afternoon dismissal.",
  openGraph: {
    title: "School Day",
    description: "A window into daily life at HDM. See how the Montessori work cycle, meals, and enrichment activities shape every day at our school in Koforidua, Ghana.",
    url: "https://www.hdm.edu.gh/campus-life/school-day",
  },
  twitter: {
    title: "School Day",
    description: "A window into daily life at HDM. See how the Montessori work cycle, meals, and enrichment activities shape every day at our school in Koforidua, Ghana.",
  },
}

import { SchoolDayPage } from "@/components/pages/campus-life/school-day-page"

export default function SchoolDay() {
  return <SchoolDayPage />
}
