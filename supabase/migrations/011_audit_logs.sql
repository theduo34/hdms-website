create table if not exists audit_logs (
  id          uuid        primary key default gen_random_uuid(),
  admin_id    uuid        not null,
  admin_email text        not null,
  action      text        not null check (action in ('invite','create','update','delete','verify')),
  resource    text        not null,
  resource_id text,
  details     jsonb       not null default '{}',
  created_at  timestamptz not null default now()
);

create index if not exists audit_logs_admin_idx    on audit_logs(admin_id);
create index if not exists audit_logs_resource_idx on audit_logs(resource, resource_id);
create index if not exists audit_logs_time_idx     on audit_logs(created_at desc);

alter table audit_logs enable row level security;

-- Only verified super_admins can read audit logs
create policy "audit_logs_super_admin_read"
  on audit_logs for select
  using (
    exists (
      select 1 from admin_profiles ap
      where ap.id = auth.uid()
        and ap.role = 'super_admin'
        and ap.verified = true
    )
  );
