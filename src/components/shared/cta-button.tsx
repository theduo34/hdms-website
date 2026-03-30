import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type Variant = 'outline-white' | 'primary' | 'secondary'

type CTAButtonProps = {
    children: ReactNode
    href?: string
    onClick?: () => void
    className?: string
    variant?: Variant
    external?: boolean
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
}

const base = "text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"

const variants: Record<Variant, string> = {
    'outline-white': "border-2 border-white text-white hover:bg-white hover:text-primary",
    'primary':       "bg-primary text-primary-foreground hover:bg-primary/90",
    'secondary':     "bg-secondary text-secondary-foreground hover:bg-secondary/80",
}

export function CTAButton({
    children,
    href,
    onClick,
    className,
    variant = 'outline-white',
    external,
    type = 'button',
    disabled,
}: CTAButtonProps) {
    const styles = cn(base, variants[variant], disabled && 'opacity-50 pointer-events-none', className)

    if (href) {
        if (external) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
                    {children}
                </a>
            )
        }
        return (
            <Button asChild className={styles}>
                <Link href={href}>{children}</Link>
            </Button>
        )
    }

    return (
        <Button type={type} onClick={onClick} disabled={disabled} className={styles}>
            {children}
        </Button>
    )
}
