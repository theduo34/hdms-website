import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ReactNode} from "react"

type CTAButtonProps = {
    children: ReactNode
    href?: string
    onClick?: () => void
    className?: string
}

export function CTAButton(
    {
        children,
        href,
        onClick,
        className,
    }: CTAButtonProps) {
    const styles =
        "border-2 border-white text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white hover:text-primary transition"

    if (href) {
        return (
            <Button asChild className={`${styles} ${className || ""}`}>
                <Link href={href}>{children}</Link>
            </Button>
        )
    }

    return (
        <Button onClick={onClick} className={`${styles} ${className || ""}`}>
            {children}
        </Button>
    )
}