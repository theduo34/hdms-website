import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sports & Clubs",
  description: "Explore the sports programme and after-school clubs at Heaven's Dew Montessori - from football and athletics to robotics, drama, and Taekwondo in Koforidua, Ghana.",
  openGraph: {
    title: "Sports & Clubs",
    description: "From the football pitch to the art room, discover how HDM nurtures well-rounded, active, and confident children through sports and enrichment clubs.",
    url: "https://www.hdm.edu.gh/campus-life/sports-and-clubs",
  },
  twitter: {
    title: "Sports & Clubs",
    description: "From the football pitch to the art room, discover how HDM nurtures well-rounded, active, and confident children through sports and enrichment clubs.",
  },
}

import { SportsPage } from "@/components/pages/campus-life/sports-page"

export default function SportsAndClubs() {
  return <SportsPage />
}
