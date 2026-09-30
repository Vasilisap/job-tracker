import { toApplication, type ApplicationRow } from "./applications.service";

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
