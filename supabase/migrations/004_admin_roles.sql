-- ════════════════════════════════════════════════════════════════════════════
-- Heaven's Dew Montessori — Admin Roles
-- Migration: 004_admin_roles.sql
-- Run AFTER 002_rls.sql
-- ════════════════════════════════════════════════════════════════════════════

-- ─── ADMIN PROFILES ──────────────────────────────────────────────────────────
-- Extends auth.users with admin role information.
-- Each row corresponds to one authenticated Supabase user.
-- verified = false: account created but not yet approved by super_admin.
-- verified = true:  admin can log in and access the dashboard.
--
-- Roles:
--   super_admin   — full access, can verify/create all admin accounts
--   school_admin  — full content access + delete, can create support accounts
--   support_admin — create/edit content only (no deletes, no settings)

create table if not exists admin_profiles (
  id           uuid        primary key references auth.users(id) on delete cascade,
  role         text        not null check (role in ('super_admin', 'support_admin', 'school_admin')),
  display_name text        not null,
  email        text        not null,
  verified     boolean     not null default false,
  created_by   uuid        references admin_profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger admin_profiles_updated_at
  before update on admin_profiles
  for each row execute function set_updated_at();

-- ─── RLS ────────────────────────────────────────────────────────────────────
alter table admin_profiles enable row level security;

-- Any authenticated admin can read their own profile
create policy "admin_read_own_profile" on admin_profiles
  for select using (auth.uid() = id);

-- super_admin and school_admin can read all profiles
create policy "admin_read_all_profiles" on admin_profiles
  for select using (
    exists (
      select 1 from admin_profiles ap
      where ap.id = auth.uid()
        and ap.role in ('super_admin', 'school_admin')
        and ap.verified = true
    )
  );

-- Only super_admin can update any profile (including verify)
create policy "super_admin_update_profiles" on admin_profiles
  for update using (
    exists (
      select 1 from admin_profiles ap
      where ap.id = auth.uid()
        and ap.role = 'super_admin'
        and ap.verified = true
    )
  );

-- Only super_admin can delete profiles
create policy "super_admin_delete_profiles" on admin_profiles
  for delete using (
    exists (
      select 1 from admin_profiles ap
      where ap.id = auth.uid()
        and ap.role = 'super_admin'
        and ap.verified = true
    )
  );

-- ─── SETUP NOTES ────────────────────────────────────────────────────────────
-- To bootstrap the first super_admin:
-- 1. Create a user in Supabase Auth (Dashboard > Authentication > Users > Add User)
-- 2. Run this SQL in the dashboard SQL editor, replacing the UUID and email:
--
--    INSERT INTO admin_profiles (id, role, display_name, email, verified)
--    VALUES (
--      '<auth-user-uuid>',
--      'super_admin',
--      'Your Name',
--      'your@email.com',
--      true
--    );
--
-- After the first super_admin exists, all subsequent admins can be invited
-- and verified through the admin dashboard itself.
