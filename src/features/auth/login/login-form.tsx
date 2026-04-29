'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SchoolLogo } from '@/components/layout/school-logo'
import { headingStyle } from '@/styles/font'

declare global {
  interface Window {
    turnstile?: {
      render:  (container: HTMLElement, options: Record<string, unknown>) => string
      reset:   (widgetId: string) => void
      remove:  (widgetId: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
const CAPTCHA_ENABLED    = TURNSTILE_SITE_KEY !== '' && TURNSTILE_SITE_KEY !== 'replace-with-your-cloudflare-turnstile-site-key'

const loginSchema = z.object({
  email:    z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm({ token }: { token: string }) {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const errorParam   = searchParams.get('error')

  const [showPassword, setShowPassword]   = useState(false)
  const [captchaToken, setCaptchaToken]   = useState('')
  const [captchaError, setCaptchaError]   = useState(false)
  const [serverError, setServerError]     = useState<string | null>(
    errorParam === 'not_admin'    ? 'This account does not have access.' :
    errorParam === 'not_verified' ? 'Your account is pending verification.' :
    null,
  )

  const captchaContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef         = useRef<string | undefined>(undefined)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const { isSubmitting } = form.formState

  // Mount Cloudflare Turnstile widget
  useEffect(() => {
    if (!CAPTCHA_ENABLED) return

    function renderWidget() {
      if (!captchaContainerRef.current || !window.turnstile) return
      widgetIdRef.current = window.turnstile.render(captchaContainerRef.current, {
        sitekey:            TURNSTILE_SITE_KEY,
        appearance:         'always',
        theme:              'light',
        callback:           (t: string) => setCaptchaToken(t),
        'expired-callback': () => setCaptchaToken(''),
        'error-callback':   () => { setCaptchaToken(''); setCaptchaError(true) },
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      window.onTurnstileLoad = renderWidget
      const script = document.createElement('script')
      script.src   = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [])

  async function onSubmit(values: LoginValues) {
    setServerError(null)

    if (CAPTCHA_ENABLED && !captchaToken && !captchaError) {
      setServerError('Please wait for the security check to complete.')
      return
    }

    const supabase = createClient()

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email:    values.email.trim().toLowerCase(),
      password: values.password,
      options:  (CAPTCHA_ENABLED && captchaToken) ? { captchaToken } : undefined,
    })

    if (signInError) {
      // Reset the widget so the user can get a fresh token on retry
      if (CAPTCHA_ENABLED && widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
        setCaptchaToken('')
      }
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

    localStorage.setItem('hdm_login_url', `/login/${token}`)
    sessionStorage.setItem('hdm_admin_session', '1')
    router.push(`/admin/${token}`)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-12 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.07] bg-secondary -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.07] bg-secondary translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10">
          <SchoolLogo size="lg" showName />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="w-10 h-px bg-secondary" />
          <blockquote
            className="text-3xl xl:text-4xl font-black italic leading-tight text-primary-foreground"
            style={headingStyle}
          >
            Nurturing minds,<br />shaping futures.
          </blockquote>
          <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
            Heaven&apos;s Dew Montessori — Koforidua, Ghana.
            A community grounded in Faith, Diligence and Excellence.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {['Faith', 'Diligence', 'Excellence'].map((word, i) => (
            <span key={word} className="flex items-center gap-3">
              <span className="text-secondary text-xs font-bold uppercase tracking-widest">{word}</span>
              {i < 2 && <span className="text-primary-foreground/20 text-sm">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <SchoolLogo size="md" />
          <div>
            <p className="font-bold text-sm text-foreground leading-none">Heaven&apos;s Dew Montessori</p>
            <p className="text-xs text-muted-foreground mt-0.5">Koforidua, Ghana</p>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1 text-muted-foreground text-sm">Sign in to continue.</p>
          </div>

          {serverError && (
            <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              <p className="text-sm text-destructive">{serverError}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cloudflare Turnstile */}
              {CAPTCHA_ENABLED && (
                <div className="space-y-1.5">
                  {!captchaError && <div ref={captchaContainerRef} />}
                  {!captchaToken && !captchaError && (
                    <p className="text-xs text-muted-foreground">
                      Waiting for security verification…
                    </p>
                  )}
                  {captchaError && (
                    <p className="text-xs text-amber-600">
                      Security check unavailable. You can still sign in - disable CAPTCHA in Supabase if this persists.
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || (CAPTCHA_ENABLED && !captchaToken && !captchaError)}
                className="w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : 'Sign in'}
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs text-muted-foreground/40">
            Heaven&apos;s Dew Montessori · Koforidua, Ghana
          </p>
        </div>
      </div>
    </div>
  )
}
