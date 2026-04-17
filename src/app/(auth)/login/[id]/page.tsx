import { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/features/auth/login/login-form'

export const metadata: Metadata = {
  title: 'Sign In | Admin',
  description: 'Sign in to access your dashboard.',
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center animate-pulse"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  )
}
