import type { ApplicationStatus } from "../types/applications";

const STATUS_STYLES: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  wishlist: {
    label: "Wishlist",
    className: "bg-violet-950/60 text-violet-300 ring-violet-800",
  },
  applied: {
    label: "Applied",
    className: "bg-sky-950/60 text-sky-300 ring-sky-800",
  },
  interviewing: {
    label: "Interviewing",
    className: "bg-amber-950/60 text-amber-300 ring-amber-800",
  },
  offer: {
    label: "Offer",
    className: "bg-emerald-950/60 text-emerald-300 ring-emerald-800",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-950/60 text-red-300 ring-red-800",
  },
  ghosted: {
    label: "Ghosted",
    className: "bg-zinc-800/60 text-zinc-400 ring-zinc-700",
  },
  withdrawn: {
    label: "Withdrawn",
    className: "bg-slate-800/60 text-slate-400 ring-slate-700",
  },
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  const { label, className } = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}
