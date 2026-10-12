import { STATUS_LABELS } from "../lib/status";
import type { ApplicationStatus } from "../types/applications";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  wishlist: "bg-violet-950/60 text-violet-300 ring-violet-800",
  applied: "bg-sky-950/60 text-sky-300 ring-sky-800",
  interviewing: "bg-amber-950/60 text-amber-300 ring-amber-800",
  offer: "bg-emerald-950/60 text-emerald-300 ring-emerald-800",
  rejected: "bg-red-950/60 text-red-300 ring-red-800",
  ghosted: "bg-zinc-800/60 text-zinc-400 ring-zinc-700",
  withdrawn: "bg-slate-800/60 text-slate-400 ring-slate-700",
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
