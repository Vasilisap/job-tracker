import type { NewApplication } from "../types/applications";
import {
  toApplication,
  type ApplicationRow,
  toRow,
  type ApplicationEventRow,
  toApplicationEvent,
} from "./applications.service";

vi.mock("../lib/supabase");

describe("toApplication", () => {
  it("maps a database row to an Application", () => {
    const row: ApplicationRow = {
      id: "app-1",
      user_id: "user-1",
      company: "Revolut",
      role: "Frontend Engineer",
      status: "interviewing",
      applied_at: "2026-09-24",
      job_url: "https://revolut.com/careers/123",
      location: null,
      salary_min: 45000,
      salary_max: null,
      notes: null,
      created_at: "2026-09-24T13:36:45Z",
      updated_at: "2026-09-24T13:46:04Z",
    };

    expect(toApplication(row)).toEqual({
      id: "app-1",
      company: "Revolut",
      role: "Frontend Engineer",
      status: "interviewing",
      appliedAt: "2026-09-24",
      jobUrl: "https://revolut.com/careers/123",
      location: null,
      salaryMin: 45000,
      salaryMax: null,
      notes: null,
      createdAt: "2026-09-24T13:36:45Z",
      updatedAt: "2026-09-24T13:46:04Z",
    });
  });
});

describe("toRow", () => {
  it("maps a NewApplication to a database row", () => {
    const input: NewApplication = {
      company: "Revolut",
      role: "Frontend Engineer",
      status: "applied",
      appliedAt: "2026-09-24",
      jobUrl: null,
      location: "Limassol",
      salaryMin: 45000,
      salaryMax: 60000,
      notes: null,
    };

    expect(toRow(input)).toEqual({
      company: "Revolut",
      role: "Frontend Engineer",
      status: "applied",
      applied_at: "2026-09-24",
      job_url: null,
      location: "Limassol",
      salary_min: 45000,
      salary_max: 60000,
      notes: null,
    });
  });
});

describe("toApplicationEvent", () => {
  it("maps a database row event to application event", () => {
    const row: ApplicationEventRow = {
      id: "app-event-1",
      application_id: "app-1",
      from_status: null,
      to_status: "interviewing",
      changed_at: "2026-10-09 13:10:08.858212+00",
    };

    expect(toApplicationEvent(row)).toEqual({
      id: "app-event-1",
      applicationId: "app-1",
      fromStatus: null,
      toStatus: "interviewing",
      changedAt: "2026-10-09 13:10:08.858212+00",
    });
  });
});
