import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface FieldProps {
    label: string
    error?: boolean
}

export const FormInput = forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'> & FieldProps
>(({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[0.65rem] tracking-[0.15em] uppercase font-medium">
            {label}
        </label>
        <Input
            ref={ref}
            className={cn(error && 'border-destructive focus-visible:ring-destructive/30', className)}
            {...props}
        />
    </div>
))
FormInput.displayName = 'FormInput'

export function FormSelect({
    label,
    error,
    className,
    children,
    ...props
}: React.ComponentProps<'select'> & FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase font-medium">
                {label}
            </label>
            <select
                className={cn(
                    'flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50',
                    error && 'border-destructive',
                    className
                )}
                {...props}
            >
                {children}
            </select>
        </div>
    )
}

export function FormTextarea({
    label,
    className,
    ...props
}: React.ComponentProps<'textarea'> & { label: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase font-medium">
                {label}
            </label>
            <textarea
                className={cn(
                    'flex w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[100px] disabled:opacity-50',
                    className
                )}
                {...props}
            />
        </div>
    )
}
