import type { Database } from "./database.types";

/** The seven pipeline statuses, derived from the Postgres enum. */
export type ApplicationStatus =
  Database["public"]["Enums"]["application_status"];

/**
 * One job application, in domain shape: camelCase names, no `user_id`
 * (RLS guarantees every row we receive is ours, so no component needs it).
 * Nullability mirrors the database exactly.
 */
export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedAt: string | null;
  jobUrl: string | null;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
