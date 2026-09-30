import type { Tables } from "../types/database.types";
import type { Application } from "../types/applications";
import { supabase } from "../lib/supabase";

export type ApplicationRow = Tables<"applications">;

export function toApplication(row: ApplicationRow): Application {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    status: row.status,
    appliedAt: row.applied_at,
    jobUrl: row.job_url,
    location: row.location,
    salaryMin: row.salary_min,
    salaryMax: row.salary_max,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(toApplication);
}
