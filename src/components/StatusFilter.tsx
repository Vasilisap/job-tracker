import type { StatusFilterValue } from "../lib/applicationFilters";
import { STATUS_LABELS } from "../lib/status";
import { Constants } from "../types/database.types";

// aria-pressed drives the selected look, so the style always matches the state
const pillClass =
  "cursor-pointer rounded-full px-3 py-1 text-sm font-medium text-slate-300 ring-1 ring-slate-700 hover:bg-slate-800 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none aria-pressed:bg-cyan-700 aria-pressed:text-white aria-pressed:ring-cyan-600 aria-pressed:hover:bg-cyan-600";

export default function StatusFilter({
  value,
  onChange,
}: {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter by status"
      className="flex flex-wrap gap-2"
    >
      <button
        aria-pressed={value === "all"}
        type="button"
        onClick={() => onChange("all")}
        className={pillClass}
      >
        All
      </button>
      {Constants.public.Enums.application_status.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange(status)}
          aria-pressed={value === status}
          className={pillClass}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
