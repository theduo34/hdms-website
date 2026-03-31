import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Campus Facilities",
  description: "Tour the campus facilities at Heaven's Dew Montessori — Montessori classrooms, library, ICT lab, playground, sports field, dining hall, and medical room in Koforidua.",
  openGraph: {
    title: "Campus Facilities",
    description: "Explore the spaces that make HDM special — from our prepared Montessori environments to outdoor play areas and support facilities in Koforidua, Ghana.",
    url: "https://www.hdm.edu.gh/campus-life/facilities",
  },
  twitter: {
    title: "Campus Facilities",
    description: "Explore the spaces that make HDM special — from our prepared Montessori environments to outdoor play areas and support facilities in Koforidua, Ghana.",
  },
}

import { FacilitiesPage } from "@/components/pages/campus-life/facilities-page"

export default function Facilities() {
  return <FacilitiesPage />
}
