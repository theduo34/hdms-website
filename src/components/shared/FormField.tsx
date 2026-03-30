import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FieldProps {
    label: string
    error?: boolean
}

export const FormInput = forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'> & FieldProps
>(({ label, error, className, type, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[0.65rem] tracking-[0.15em] uppercase font-medium">
            {label}
        </label>
        <Input
            ref={ref}
            type={type}
            className={cn(
                type === 'date' && '[&::-webkit-calendar-picker-indicator]:ml-auto [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60',
                error && 'border-destructive focus-visible:ring-destructive/30',
                className
            )}
            {...props}
        />
    </div>
))
FormInput.displayName = 'FormInput'

interface FormSelectProps extends FieldProps {
    value?: string
    onValueChange?: (value: string) => void
    placeholder?: string
    options: string[]
    disabled?: boolean
    className?: string
}

export function FormSelect({
    label,
    error,
    value,
    onValueChange,
    placeholder = 'Select an option',
    options,
    disabled,
    className,
}: FormSelectProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase font-medium">
                {label}
            </label>
            <Select value={value} onValueChange={onValueChange} disabled={disabled}>
                <SelectTrigger className={cn(error && 'border-destructive focus:ring-destructive/30', className)}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export function FormTextarea({
    label,
    error,
    className,
    ...props
}: React.ComponentProps<'textarea'> & { label: string; error?: boolean }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase font-medium">
                {label}
            </label>
            <Textarea
                className={cn(
                    'min-h-[100px] resize-y',
                    error && 'border-destructive focus-visible:ring-destructive/30',
                    className
                )}
                {...props}
            />
        </div>
    )
}
