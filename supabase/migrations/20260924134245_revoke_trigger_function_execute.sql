-- Trigger functions live in the `public` schema, so PostgREST exposes them as
-- RPC endpoints and Postgres grants EXECUTE to PUBLIC by default. Neither is
-- meant to be called by a client: they only ever run from their triggers, and
-- Postgres does not check EXECUTE when firing a trigger.
--
-- Fixes the security advisor lints
--   0028_anon_security_definer_function_executable
--   0029_authenticated_security_definer_function_executable

revoke execute on function public.log_application_status_change() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
