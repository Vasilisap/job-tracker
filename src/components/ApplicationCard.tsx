import { formatDate, formatSalary } from "../lib/format";
import type { Application } from "../types/applications";
import StatusBadge from "./StatusBadge";

export default function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  const appliedOn = formatDate(application.appliedAt);
  const salary = formatSalary(application.salaryMin, application.salaryMax);
  const location = application.location;
  const hasDetails = Boolean(appliedOn || location || salary);

  return (
    <article className="rounded-2xl bg-slate-900 p-5 ring-1 ring-slate-800 transition hover:ring-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-white">
            {application.company}
          </h2>
          <p className="mt-0.5 truncate text-sm text-slate-400">
            {application.role}
          </p>
        </div>
        <div className="shrink-0">
          <StatusBadge status={application.status} />
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
    </article>
  );
}
