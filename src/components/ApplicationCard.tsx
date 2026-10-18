import { useState } from "react";
import { formatDate, formatSalary } from "../lib/format";
import type { Application } from "../types/applications";
import StatusBadge from "./StatusBadge";
import ApplicationTimeline from "./ApplicationTimeline";

export default function ApplicationCard({
  application,
  onEdit,
  onDelete,
}: {
  application: Application;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [showHistory, setShowHistory] = useState(false);

  const appliedOn = formatDate(application.appliedAt);
  const salary = formatSalary(application.salaryMin, application.salaryMax);
  const location = application.location;
  const hasDetails = Boolean(appliedOn || location || salary);

  return (
    <article className="rounded-2xl bg-slate-900 p-5 ring-1 ring-slate-800 transition hover:ring-slate-700">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0 flex-1 basis-48">
          <h2 className="truncate font-semibold text-white">
            {application.company}
          </h2>
          <p className="mt-0.5 truncate text-sm text-slate-400">
            {application.role}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <StatusBadge status={application.status} />
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${application.company} application`}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setShowHistory((open) => !open)}
            aria-expanded={showHistory}
            aria-label={`${showHistory ? "Hide" : "Show"} ${application.company} history`}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            {showHistory ? "Hide history" : "History"}
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${application.company} application`}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-sm font-medium text-slate-400 hover:bg-red-950/60 hover:text-red-300 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
          >
            Delete
          </button>
        </div>
      </div>

      {hasDetails && (
        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {appliedOn && (
            <div>
              <dt className="text-xs text-slate-500">Applied</dt>
              <dd className="mt-0.5 text-slate-300">{appliedOn}</dd>
            </div>
          )}
          {location && (
            <div>
              <dt className="text-xs text-slate-500">Location</dt>
              <dd className="mt-0.5 text-slate-300">{location}</dd>
            </div>
          )}
          {salary && (
            <div>
              <dt className="text-xs text-slate-500">Salary</dt>
              <dd className="mt-0.5 text-slate-300">{salary}</dd>
            </div>
          )}
        </dl>
      )}

      {showHistory && (
        <section
          aria-label={`${application.company} history`}
          className="mt-5 border-t border-slate-800 pt-5"
        >
          <ApplicationTimeline applicationId={application.id} />
        </section>
      )}
    </article>
  );
}
