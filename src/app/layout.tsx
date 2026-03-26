import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/provider/motion-provider";
import { jsonLd } from "@/lib/jsonLd";
import { faqSchema } from "@/lib/faqSchema";
import { NavBar } from "@/components/layout/nav-bar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Heaven's Dew Montessori | Faith, Diligence & Excellence",
    template: "%s | Heaven's Dew Montessori",
  },
  description:
    "Where every child's potential is discovered, not assigned. Heaven's Dew Montessori in Koforidua, Ghana, blends timeless Montessori wisdom with modern excellence — raising confident, curious, and capable leaders grounded in Faith, Diligence, and Excellence.",
  keywords: [
    "Heaven's Dew Montessori",
    "HDM",
    "best Montessori school Ghana",
    "top primary school Koforidua",
    "child-centered learning Ghana",
    "Montessori education Eastern Region",
    "Faith Diligence Excellence",
    "preschool Koforidua",
    "holistic education Ghana",
    "Little Angels to Year 7 Ghana",
  ],
  authors: [{ name: "Heaven's Dew Montessori", url: "https://www.hdm.edu.gh" }],
  creator: "Heaven's Dew Montessori",
  metadataBase: new URL("https://www.hdm.edu.gh"),
  openGraph: {
    title: "Heaven's Dew Montessori | Where Potential Meets Purpose",
    description:
      "At Heaven's Dew Montessori, we don't just educate children — we shape futures. From Little Angels to Year 7, every child is nurtured in an environment built on Faith, Diligence, and Excellence. Koforidua's most trusted Montessori experience awaits your child.",
    url: "https://www.hdm.edu.gh",
    siteName: "Heaven's Dew Montessori",
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heaven's Dew Montessori | Where Potential Meets Purpose",
    description:
      "Your child deserves more than a classroom — they deserve a calling. Enrol at Heaven's Dew Montessori, Koforidua, and watch them thrive in Faith, Diligence, and Excellence.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GH">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${crimsonPro.variable} antialiased`}>
        <MotionProvider>
          <NavBar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}