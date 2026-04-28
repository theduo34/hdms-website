'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, GraduationCap, Shield, AlertCircle } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm({ token }: { token: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(
    errorParam === 'not_admin'
      ? 'This account does not have admin access.'
      : errorParam === 'not_verified'
        ? 'Your account is pending verification by a super admin.'
        : null,
  )

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: LoginValues) {
    setServerError(null)
    const supabase = createClient()

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email.trim().toLowerCase(),
      password: values.password,
    })

    if (signInError) {
      setServerError(
        signInError.message === 'Invalid login credentials'
          ? 'Incorrect email or password.'
          : signInError.message,
      )
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setServerError('Authentication failed. Please try again.')
      return
    }

    // Mark this tab as having an active session — SessionGuard checks this on mount
    sessionStorage.setItem('hdm_admin_session', '1')
    router.push(`/admin/${token}`)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-12 relative overflow-hidden bg-primary text-primary-foreground"
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-secondary -translate-y-1/2 translate-x-1/2"
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-secondary translate-y-1/2 -translate-x-1/2"
        />
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-5 bg-secondary -translate-x-1/2 -translate-y-1/2"
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-secondary"
          >
            <GraduationCap className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-primary-foreground font-semibold text-sm leading-none">Heaven&apos;s Dew</p>
            <p className="text-sm leading-none mt-0.5 text-secondary">
              Montessori
            </p>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1
              className="text-4xl xl:text-5xl font-bold italic leading-tight text-secondary"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              Admin
              <br />
              Dashboard
            </h1>
            <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-xs">
              Manage content, media, and school operations from one secure place.
            </p>
          </div>
          <div className="space-y-3">
            {[
              'Gallery & media management',
              'News & announcements',
              'Academic calendar',
              'Staff directory',
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-secondary" />
                <p className="text-primary-foreground/70 text-sm">{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security note */}
        <div className="relative z-10 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary-foreground/50" />
          <p className="text-primary-foreground/50 text-xs">Secured with role-based access control</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-background">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary"
          >
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm leading-none text-primary">
              Heaven&apos;s Dew Montessori
            </p>
            <p className="text-xs text-gray-500 leading-none mt-0.5">Admin Dashboard</p>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-1 text-gray-500 text-sm">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {serverError && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{serverError}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        placeholder="you@hdm.edu.gh"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          tabIndex={-1}
                        >
                          {showPassword
                            ? <EyeOff className="w-4 h-4" />
                            : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs text-gray-400">
            Admin access only. Contact the super admin if you need an account.
          </p>
        </div>
      </div>
    </div>
  )
}
