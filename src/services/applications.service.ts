import type { Tables, TablesInsert } from "../types/database.types";
import type {
  Application,
  ApplicationEvent,
  NewApplication,
} from "../types/applications";
import { supabase } from "../lib/supabase";

export type ApplicationRow = Tables<"applications">;
export type ApplicationEventRow = Tables<"application_events">;

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

export function toApplicationEvent(row: ApplicationEventRow): ApplicationEvent {
  return {
    id: row.id,
    applicationId: row.application_id,
    fromStatus: row.from_status,
    toStatus: row.to_status,
    changedAt: row.changed_at,
  };
}

export function toRow(input: NewApplication): TablesInsert<"applications"> {
  return {
    company: input.company,
    role: input.role,
    status: input.status,
    applied_at: input.appliedAt,
    job_url: input.jobUrl,
    location: input.location,
    salary_min: input.salaryMin,
    salary_max: input.salaryMax,
    notes: input.notes,
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

export async function getApplicationEvents(
  applicationId: string,
): Promise<ApplicationEvent[]> {
  const { data, error } = await supabase
    .from("application_events")
    .select("*")
    .eq("application_id", applicationId)
    .order("changed_at", { ascending: true });

  if (error) throw error;

  return data.map(toApplicationEvent);
}

export async function createApplication(
  input: NewApplication,
): Promise<Application> {
  const row = toRow(input);

  const { data, error } = await supabase
    .from("applications")
    .insert(row)
    .select()
    .single();

  if (error) throw error;

  return toApplication(data);
}

export async function updateApplication(
  id: string,
  input: NewApplication,
): Promise<Application> {
  const row = toRow(input);

  const { error, data } = await supabase
    .from("applications")
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return toApplication(data);
}

export async function deleteApplication(id: string): Promise<void> {
  const { error } = await supabase.from("applications").delete().eq("id", id);

  if (error) throw error;
}
