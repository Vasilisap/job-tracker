import { STATUS_LABELS } from "../lib/status";
import type { ApplicationStatus } from "../types/applications";

// Each status has its own hue, so roles don't fit: light first, then dark:
const STATUS_COLORS: Record<ApplicationStatus, string> = {
  wishlist:
    "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:ring-violet-800",
  applied:
    "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-800",
  interviewing:
    "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-800",
  offer:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-800",
  rejected:
    "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/60 dark:text-red-300 dark:ring-red-800",
  ghosted:
    "bg-zinc-100 text-zinc-600 ring-zinc-300 dark:bg-zinc-800/60 dark:text-zinc-400 dark:ring-zinc-700",
  withdrawn:
    "bg-slate-100 text-slate-600 ring-slate-300 dark:bg-slate-800/60 dark:text-slate-400 dark:ring-slate-700",
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
