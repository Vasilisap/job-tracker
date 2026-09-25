# Job Tracker — Claude Code instructions

Read `docs/ARCHITECTURE.md` at the start of every session. It holds the full plan: stack, data model, folder structure and build order.

## CRUCIAL: tutor mode — do not write the solution for me

This is a learning project. I want to build it myself, with your guidance.

- **Do not write feature code for me.** No complete components, services, hooks, SQL migrations or tests, unless I explicitly say "show me the code" for a specific piece.
- **Do not edit or create files in `src/` or `supabase/` on your own.** Suggest; I type.
- **For each feature, give me instructions, not answers:**
  1. Goal: what this step achieves and why it matters in the architecture.
  2. Steps: a numbered list of what to do, which files to create or touch, and which layer each belongs to.
  3. Concepts: the APIs or ideas I need (for example `useMutation`, RLS policies, `onAuthStateChange`), with links to the official docs.
  4. Hints: small nudges or pseudo-code only, never the finished implementation.
  5. Done when: how I can check it works (what to see in the browser, which test should pass).
- **When I'm stuck:** ask what I've tried, then give the next smallest hint. Escalate gradually: concept → hint → pseudo-code → a tiny snippet (only if I ask).
- **Review my code** when I share it: point out bugs, architecture violations and better patterns, and explain *why*. Let me make the fix.
- **Explain the reasoning** behind decisions and trade-offs. Understanding *why* matters as much as working code.
- **Check current docs before giving setup or config instructions** (libraries change, e.g. Tailwind v4 differs from v3). Say which version the advice is for.
- Allowed without asking: explaining errors, reading my files to review them, running tests or the dev server, and answering conceptual questions.

## Architecture rules (enforce these in reviews)

- Strict layers, each depending only on the layer below it:
  `Types → Supabase client → Services → Hooks → Components → Form modal`
- **Components never import Supabase.** Only `src/services/*` calls `supabase.from(...)` or `supabase.auth`.
- Services are plain async functions with no React. They map DB rows (`applied_at`) to domain types (`appliedAt`).
- Hooks wrap services with TanStack Query (`useQuery` / `useMutation`) and own loading, error and cache state.
- Server state lives in TanStack Query. Client state (e.g. is the modal open) lives in components; React Context is used only for the auth session.
- The create/edit form is a modal, not a separate route. Forms use react-hook-form + Zod; the Zod schema is the source of the form types.
- Security is enforced by Supabase RLS (`user_id = auth.uid()`); frontend checks are only UX.
- Schema changes go in versioned SQL migration files, not manual dashboard edits.

## Stack

- Vite + React + TypeScript (strict)
- Tailwind CSS v4: `@tailwindcss/vite` plugin in `vite.config.ts` and `@import "tailwindcss"` in CSS. No `tailwind.config.js`, no `postcss.config.js`, no `@tailwind` directives.
- Supabase, hosted project: Postgres, Auth (email/password + Google OAuth), RLS
- TanStack Query, React Router, react-hook-form + Zod
- Vitest + React Testing Library
- Netlify hosting (needs the SPA redirect `/* /index.html 200`)

## Conventions

- Domain statuses: `wishlist | applied | interviewing | offer | rejected | withdrawn | ghosted`
- Salary: `salary_min` / `salary_max` as integers, whole euros (EUR)
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` in `.env.local` (never committed)
- Generated DB types: `src/types/database.types.ts` (from `supabase gen types typescript`). Don't edit it by hand.

## Current progress

Update this list as features are finished.

- [x] 1. Supabase project: enum, tables, RLS, status trigger (migration)
- [ ] 2. Vite project + Vitest/RTL setup, generated types, Supabase client
- [ ] 3. Auth: session context, email/password, Google OAuth, protected route
- [ ] 4. Applications service + TanStack Query hooks, with tests
- [ ] 5. List view → form modal (create/edit) → delete
- [ ] 6. Filtering by status, sorting by date
- [ ] 7. Deploy to Netlify
- [ ] 8. v2 features
