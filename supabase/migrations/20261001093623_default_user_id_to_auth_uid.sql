alter table public.applications alter column user_id set default auth.uid();

-- Inserts may omit user_id; the database fills it with the caller's id.
-- RLS (with check) still verifies it matches the logged-in user.
