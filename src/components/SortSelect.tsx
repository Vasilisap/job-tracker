import type { SortOrder } from "../lib/applicationFilters";

export default function SortSelect({
  value,
  onChange,
}: {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-slate-400">
        Sort
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "oldest" ? "oldest" : "newest")
        }
        className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-100 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:outline-none"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}
