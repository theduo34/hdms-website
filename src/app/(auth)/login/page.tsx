import type { Metadata } from 'next'
import { SchoolLogo } from '@/components/layout/school-logo'
import { headingStyle } from '@/styles/font'

export const metadata: Metadata = {
  title: 'Heaven\'s Dew Montessori',
  description: 'Heaven\'s Dew Montessori — Koforidua, Ghana.',
}

export default function LoginFallbackPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background watermark crest */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/logo/school-crest.png')" }}
        aria-hidden
      />

      {/* Decorative rings */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] bg-secondary -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.06] bg-secondary translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md gap-8">

        {/* Logo */}
        <SchoolLogo size="lg" showName />

        {/* Divider */}
        <div className="flex items-center gap-3 w-40">
          <div className="flex-1 h-px bg-secondary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
          <div className="flex-1 h-px bg-secondary/30" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1
            className="text-primary-foreground"
            style={{ ...headingStyle, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}
          >
            Welcome.
          </h1>
          <p className="text-primary-foreground/45 text-sm leading-relaxed max-w-xs">
            To access this area, please use the link provided by your administrator.
          </p>
        </div>

        {/* Mottos */}
        <div className="flex items-center gap-3">
          {['Faith', 'Diligence', 'Excellence'].map((word, i) => (
            <span key={word} className="flex items-center gap-3">
              <span className="text-secondary/70 text-xs font-bold uppercase tracking-[0.2em]">
                {word}
              </span>
              {i < 2 && <span className="text-primary-foreground/15 text-xs">·</span>}
            </span>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-primary-foreground/20 text-xs">
          Heaven&apos;s Dew Montessori · Koforidua, Ghana
        </p>
      </footer>
    </div>
  )
}
