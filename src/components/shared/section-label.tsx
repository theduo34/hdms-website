type Props = {
  label: string
  textColor?: string
  lineColor?: string
  className?: string
}

export function SectionLabel({ label, textColor, lineColor, className }: Props) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className ?? ""}`}>
      <p
        className="text-[10px] tracking-[0.3em] font-bold"
        style={{ color: textColor ?? "var(--color-primary-foreground)" }}
      >
        {label}
      </p>
      <div
        className="w-14 h-[3px] rounded-full"
        style={{ background: lineColor ?? "var(--color-secondary)" }}
      />
    </div>
  )
}