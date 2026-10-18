import { useApplicationEvents } from "../hooks/useApplications";
import { formatDateTime } from "../lib/format";
import { STATUS_LABELS } from "../lib/status";
import Spinner from "./Spinner";
import StatusBadge from "./StatusBadge";

export default function ApplicationTimeline({
  applicationId,
}: {
  applicationId: string;
}) {
  const {
    data: events,
    isPending,
    error,
  } = useApplicationEvents(applicationId);

  if (isPending)
    return (
      <div className="flex justify-center py-4">
        <Spinner size={24} label="Loading history" />
      </div>
    );

  if (error)
    return (
      <p role="alert" className="text-sm text-red-400">
        Couldn't load the history: {error.message}
      </p>
    );

  if (events.length === 0)
    return <p className="text-sm text-slate-500">No history yet.</p>;

  return (
    <ol className="ml-1.5 space-y-4 border-l border-slate-700 pl-5">
      {events.map((event) => (
        <li key={event.id} className="relative">
          {/* the dot on the line */}
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[calc(1.25rem+5.5px)] h-2.5 w-2.5 rounded-full bg-cyan-500 ring-4 ring-slate-900"
          />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <StatusBadge status={event.toStatus} />
            <span className="text-sm text-slate-400">
              {event.fromStatus === null
                ? "Added"
                : `from ${STATUS_LABELS[event.fromStatus]}`}
            </span>
          </div>
          <time
            dateTime={event.changedAt}
            className="mt-1 block text-xs text-slate-500"
          >
            {formatDateTime(event.changedAt)}
          </time>
        </li>
      ))}
    </ol>
  );
}
