import type { Metadata } from 'next'
import { GraduationCap, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Access | HDM',
  description: 'Admin portal access for Heaven\'s Dew Montessori.',
}

export default function LoginFallbackPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
        <GraduationCap className="w-7 h-7 text-primary" />
      </div>

      <div className="space-y-2 max-w-sm">
        <h1 className="text-primary-foreground font-bold text-xl">
          Heaven&apos;s Dew Montessori
        </h1>
        <p className="text-primary-foreground/50 text-sm">
          Use your admin portal link to sign in. If you do not have it,
          contact your super admin.
        </p>
      </div>

      <div className="flex items-center gap-2 text-primary-foreground/30 text-xs">
        <Lock className="w-3.5 h-3.5" />
        <span>Secured admin portal</span>
      </div>
    </div>
  )
}
