-- ════════════════════════════════════════════════════════════════════════════
-- Heaven's Dew Montessori — Admin Portal Token
-- Migration: 010_admin_portal_token.sql
-- ════════════════════════════════════════════════════════════════════════════
--
-- Seeds a secure UUID that becomes the secret path segment for the admin portal.
-- Admin URL: /admin/<token>/gallery, etc.
-- Login URL: /login/<token>
--
-- The token row is hidden from all public/authenticated reads via RLS.
-- Only the service-role client (bypasses RLS) can read it.
-- ════════════════════════════════════════════════════════════════════════════

insert into school_settings (key, value)
values ('admin_portal_token', gen_random_uuid()::text)
on conflict (key) do nothing;

-- ─── Restrict public read to hide the portal token ───────────────────────────
-- The existing "public_read" policy on school_settings allows all rows.
-- Drop and recreate it to exclude the portal token row.

drop policy if exists "public_read" on school_settings;

create policy "school_settings_public_read"
  on school_settings for select
  using (key != 'admin_portal_token');
