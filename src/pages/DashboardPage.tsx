import { lazy, Suspense, useState } from "react";

import ApplicationList from "../components/ApplicationList";
import Spinner from "../components/Spinner";
import {
  useApplications,
  useDeleteApplication,
} from "../hooks/useApplications";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../services/auth.service";
import type { Application } from "../types/applications";
import ConfirmDialog from "../components/ConfirmDialog";
import { Link, useSearchParams } from "react-router";
import Logo from "../components/Logo";
import {
  filterAndSort,
  parseListParams,
  type SortOrder,
  type StatusFilterValue,
} from "../lib/applicationFilters";
import StatusFilter from "../components/StatusFilter";
import SortSelect from "../components/SortSelect";
import { toast } from "sonner";
import ThemeToggle from "../components/ThemeToggle";

const ApplicationFormModal = lazy(
  () => import("../components/ApplicationFormModal"),
);

export default function DashboardPage() {
  const { session } = useAuth();
  const { data: applications, isPending, error: loadError } = useApplications();
  const {
    mutate: deleteApp,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteApplication();

  const [searchParams, setSearchParams] = useSearchParams();
  const { status, sort } = parseListParams(searchParams);

  const [error, setError] = useState<string | null>(null);
  const [formTarget, setFormTarget] = useState<Application | "new" | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const email = session?.user.email ?? "";

  async function handleSignOut() {
    setError(null);
    try {
      await signOut();
      toast.success("Signed out");
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
          className="rounded-lg bg-red-50 dark:bg-red-950/60 px-3 py-2 text-sm text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-900"
        >
          {loadError.message}
        </p>
      );
    if (applications && applications.length === 0)
      return (
        <div className="rounded-2xl border border-dashed border-line bg-surface/50 px-6 py-16 text-center">
          <p className="font-medium text-fg">No applications yet</p>
        </div>
      );

    if (applications)
      return (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <StatusFilter value={status} onChange={handleStatusChange} />
            <SortSelect value={sort} onChange={handleSortChange} />
          </div>
          {visibleApplications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-surface/50 px-6 py-16 text-center">
              <p className="font-medium text-fg">
                No applications match this filter
              </p>
              <button
                type="button"
                onClick={() => handleStatusChange("all")}
                className="mt-3 cursor-pointer rounded text-sm font-medium text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                Show all applications
              </button>
            </div>
          ) : (
            <ApplicationList
              onEdit={(app) => setFormTarget(app)}
              onDelete={(app) => setDeleteTarget(app)}
              applications={visibleApplications}
            />
          )}
        </>
      );
  }

  function handleStatusChange(next: StatusFilterValue) {
    setSearchParams((params) => {
      if (next === "all") params.delete("status");
      else params.set("status", next);
      return params;
    });
  }

  function handleSortChange(next: SortOrder) {
    setSearchParams((params) => {
      if (next === "newest") params.delete("sort");
      else params.set("sort", next);

      return params;
    });
  }

  const visibleApplications = applications
    ? filterAndSort(applications, { status, sort })
    : [];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-page/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/app"
            className="rounded-lg focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            <Logo />
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-700 text-sm font-semibold text-white uppercase"
            >
              {email.charAt(0)}
            </span>
            <span className="hidden text-sm text-fg-soft sm:inline">
              {email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-line-strong px-3 py-1.5 text-sm font-medium text-fg hover:bg-raised focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-page focus-visible:outline-none"
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
            className="mb-6 rounded-lg bg-red-50 dark:bg-red-950/60 px-3 py-2 text-sm text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-900"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-fg-strong">Applications</h1>
            <p className="mt-1 text-sm text-muted">
              Track every job from wishlist to offer.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormTarget("new")}
            className="cursor-pointer rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-page focus-visible:outline-none"
          >
            New application
          </button>
        </div>

        {formTarget !== null && (
          <Suspense fallback={null}>
            <ApplicationFormModal
              onClose={() => setFormTarget(null)}
              application={formTarget === "new" ? undefined : formTarget}
            />
          </Suspense>
        )}

        {deleteTarget !== null && (
          <ConfirmDialog
            title="Delete application?"
            message={`${deleteTarget.company} - ${deleteTarget.role} will be deleted. This can't be undone.`}
            confirmLabel="Delete"
            pendingLabel="Deleting..."
            isPending={isDeleting}
            error={deleteError?.message}
            onConfirm={() => {
              const deleteCompany = deleteTarget.company;
              deleteApp(deleteTarget.id, {
                onSuccess: () => {
                  setDeleteTarget(null);
                  toast.success(`${deleteCompany} deleted`);
                },
              });
            }}
            onCancel={() => setDeleteTarget(null)}
          />
        )}

        <section className="mt-8">{renderApplications()}</section>
      </main>
    </div>
  );
}
