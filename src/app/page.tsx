import { HomePage } from "@/components/pages/home/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Where every child's potential is discovered, not assigned. HDM Heaven's Dew Montessori in Koforidua, Ghana, blends timeless Montessori wisdom with modern excellence - raising confident, curious, and capable leaders grounded in Faith, Diligence, and Excellence.",
  openGraph: {
    title: "Home",
    description:
      "At HDM Heaven's Dew Montessori, we don't just educate children - we shape futures. From Little Angels to Year 7, every child is nurtured in an environment built on Faith, Diligence, and Excellence. Koforidua's most trusted Montessori experience awaits your child.",
    url: "https://www.hdm.edu.gh",
  },
  twitter: {
    title: "Home",
    description:
      "Your child deserves more than a classroom - they deserve a calling. Enrol at HDM Heaven's Dew Montessori, Koforidua, and watch them thrive in Faith, Diligence, and Excellence.",
  },
};

export default function Home() {
  return (
    <HomePage/>
  );
}
