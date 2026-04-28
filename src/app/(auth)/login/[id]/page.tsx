import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/features/auth/login/login-form'

export const metadata: Metadata = {
  title: 'Sign In | Admin',
  description: 'Sign in to access the Heaven\'s Dew Montessori admin dashboard.',
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginForm token={id} />
    </Suspense>
  )
}
