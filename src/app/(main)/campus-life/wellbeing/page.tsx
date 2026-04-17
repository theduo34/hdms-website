import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wellbeing",
  description: "Learn how Heaven's Dew Montessori supports the physical, emotional, and social wellbeing of every child - through pastoral care, health services, and school nutrition.",
  openGraph: {
    title: "Wellbeing",
    description: "At HDM, wellbeing is not a policy - it is a promise. Discover our pastoral system, school health services, and nutrition programme in Koforidua, Ghana.",
    url: "https://www.hdm.edu.gh/campus-life/wellbeing",
  },
  twitter: {
    title: "Wellbeing",
    description: "At HDM, wellbeing is not a policy - it is a promise. Discover our pastoral system, school health services, and nutrition programme in Koforidua, Ghana.",
  },
}

import { WellbeingPage } from "@/components/pages/campus-life/wellbeing-page"

export default function Wellbeing() {
  return <WellbeingPage />
}
