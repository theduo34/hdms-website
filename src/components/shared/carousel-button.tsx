export function CarouselButton({
                                 onClick,
                                 disabled,
                                 label,
                                 children,
                                 className,
                               }: {
  onClick: () => void
  disabled: boolean
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed
        border-primary-foreground text-primary-foreground hover:opacity-70
        ${className ?? ""}`}
    >
      {children}
    </button>
  )
}