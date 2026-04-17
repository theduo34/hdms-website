import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Service-role client — bypasses RLS.
// NEVER expose this to the browser. Use only in server-side API routes.
//
// Note: typed as `any` for the generic because supabase-js v2.103+ has very strict
// type inference for insert/update operations that conflicts with how we construct
// objects from zod schemas. All inputs are validated with zod before hitting the DB,
// so `any` here is safe. We still get read-path types where we need them via explicit casts.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServiceClient(): ReturnType<typeof createClient<any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// Typed read-only client for use when you need DB types on queries.
export function createTypedServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
