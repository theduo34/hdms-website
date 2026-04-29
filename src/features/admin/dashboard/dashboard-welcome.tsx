interface DashboardWelcomeProps {
  firstName: string
  totalItems: number
}

export function DashboardWelcome({ firstName, totalItems }: DashboardWelcomeProps) {
  const today = new Date().toLocaleDateString('en-GH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="rounded-2xl bg-primary px-8 py-6 flex items-center justify-between overflow-hidden relative">
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary/10 pointer-events-none" />
      <div className="absolute -right-4 -bottom-20 w-48 h-48 rounded-full bg-primary-foreground/5 pointer-events-none" />

      <div className="relative z-10">
        <p className="text-primary-foreground/40 text-xs mb-2">{today}</p>
        <h2 className="text-2xl font-bold text-primary-foreground">
          Welcome back, {firstName}
        </h2>
        <p className="text-primary-foreground/50 text-sm mt-1">
          Here&apos;s what&apos;s happening on the HDM website today.
        </p>
      </div>

      <div className="relative z-10 hidden sm:flex flex-col items-end gap-1">
        <p className="text-secondary font-bold text-4xl tabular-nums">{totalItems}</p>
        <p className="text-primary-foreground/40 text-xs">total content items</p>
      </div>
    </div>
  )
}
