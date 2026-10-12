import { useState } from "react";
import Spinner from "../components/Spinner";
import { useApplications } from "../hooks/useApplications";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../services/auth.service";
import ApplicationList from "../components/ApplicationList";
import ApplicationFormModal from "../components/ApplicationFormModal";
import type { Application } from "../types/applications";

export default function DashboardPage() {
  const { session } = useAuth();
  const { data: applications, isPending, error: loadError } = useApplications();

  const [error, setError] = useState<string | null>(null);
  const [formTarget, setFormTarget] = useState<Application | "new" | null>(
    null,
  );

  const email = session?.user.email ?? "";

  async function handleSignOut() {
    setError(null);
    try {
      await signOut();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong with signing out.",
      );
    }
  }

  function renderApplications() {
    if (isPending)
      return (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      );

    if (loadError)
      return (
        <p
          role="alert"
          className="rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 ring-1 ring-red-900"
        >
          {loadError.message}
        </p>
      );
    if (applications && applications.length === 0)
      return (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
          <p className="font-medium text-slate-200">No applications yet</p>
        </div>
      );

    if (applications)
      return (
        <ApplicationList
          onEdit={(app) => setFormTarget(app)}
          applications={applications}
        />
      );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <span className="text-lg font-bold text-white">Job Tracker</span>

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-700 text-sm font-semibold text-white uppercase"
            >
              {email.charAt(0)}
            </span>
            <span className="hidden text-sm text-slate-300 sm:inline">
              {email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {error && (
          <p
            role="alert"
            className="mb-6 rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 ring-1 ring-red-900"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Applications</h1>
            <p className="mt-1 text-sm text-slate-400">
              Track every job from wishlist to offer.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormTarget("new")}
            className="cursor-pointer rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
          >
            New application
          </button>
        </div>

        {formTarget !== null && (
          <ApplicationFormModal
            onClose={() => setFormTarget(null)}
            application={formTarget === "new" ? undefined : formTarget}
          />
        )}
        <section className="mt-8">{renderApplications()}</section>
      </main>
    </div>
  );
}
