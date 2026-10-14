import type { Application, ApplicationStatus } from "../types/applications";
import { Constants } from "../types/database.types";

export type StatusFilterValue = ApplicationStatus | "all";
export type SortOrder = "newest" | "oldest";
export type ListParams = { status: StatusFilterValue; sort: SortOrder };

const STATUSES: readonly string[] = Constants.public.Enums.application_status;

function isApplicationStatus(value: string): value is ApplicationStatus {
  return STATUSES.includes(value);
}

export function parseListParams(params: URLSearchParams): ListParams {
  const rawStatus = params.get("status");
  const status: StatusFilterValue =
    rawStatus !== null && isApplicationStatus(rawStatus) ? rawStatus : "all";
  const sort: SortOrder = params.get("sort") === "oldest" ? "oldest" : "newest";

  return { status, sort };
}

export function filterAndSort(
  applications: Application[],
  { status, sort }: ListParams,
): Application[] {
  const filtered =
    status === "all"
      ? applications
      : applications.filter((app) => app.status === status);

  return filtered.toSorted((a, b) => {
    // 1. both have the same date, or both have none -> 0
    if (a.appliedAt === b.appliedAt) return 0;

    // 2. no date goes last, whichever sort order
    if (a.appliedAt === null) return 1;
    if (b.appliedAt === null) return -1;

    // 3. both have a date

    return sort === "oldest"
      ? a.appliedAt.localeCompare(b.appliedAt)
      : b.appliedAt.localeCompare(a.appliedAt);
  });
}
