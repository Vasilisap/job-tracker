/**
 * The Job Trapper mark: the favicon's briefcase on a cyan tile, plus the
 * name. The tile reads the same in both themes; the name uses the text role.
 */
export default function Logo({ withName = true }: { withName?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-700 text-white shadow-sm"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
        >
          <path d="M12 12h.01" />
          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M22 13a18.15 18.15 0 0 1-20 0" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
      </span>
      {withName ? (
        <span className="text-lg font-bold tracking-tight text-fg-strong">
          Job Trapper
        </span>
      ) : (
        <span className="sr-only">Job Trapper</span>
      )}
    </span>
  );
}
