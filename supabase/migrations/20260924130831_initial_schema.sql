create type public.application_status as enum
  ('wishlist', 'applied', 'interviewing', 'offer', 'rejected', 'withdrawn', 'ghosted');

create table public.applications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  company     text not null,
  role        text not null,
  status      application_status not null default 'applied',
  applied_at  date,
  job_url     text,
  location    text,
  salary_min  int,  -- whole euros (EUR)
  salary_max  int,
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.application_events (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid not null references applications on delete cascade,
  from_status     application_status,
  to_status       application_status not null,
  changed_at      timestamptz not null default now()
);

create index applications_user_id_status_idx
  on public.applications (user_id, status);

create index applications_user_id_applied_at_idx
  on public.applications (user_id, applied_at desc);

create index application_events_application_id_idx
  on public.application_events (application_id, changed_at);

alter table public.applications        enable row level security;
alter table public.application_events  enable row level security;

create policy "Users can view their own applications"
on public.applications for select
to authenticated
using ( (select auth.uid()) = user_id );

create policy "Users can create their own applications"
on public.applications for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can update their own applications"
on public.applications for update
to authenticated
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );

create policy "Users can delete their own applications"
on public.applications for delete
to authenticated
using ( (select auth.uid()) = user_id );

create policy "Users can view events for their own applications"
on public.application_events for select
to authenticated
using (
  exists (
    select 1
    from public.applications a
    where a.id = application_events.application_id
      and a.user_id = (select auth.uid())
  )
);


create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger applications_set_updated_at
  before update on public.applications
  for each row
  execute function public.set_updated_at();

  create function public.log_application_status_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.application_events (application_id, from_status, to_status)
    values (new.id, null, new.status);
  elsif new.status is distinct from old.status then
    insert into public.application_events (application_id, from_status, to_status)
    values (new.id, old.status, new.status);
  end if;
  return null;
end;
$$;

create trigger applications_log_status_change
  after insert or update of status on public.applications
  for each row
  execute function public.log_application_status_change();




