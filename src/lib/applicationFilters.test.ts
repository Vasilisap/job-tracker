import type { Application } from "../types/applications";
import { filterAndSort, parseListParams } from "./applicationFilters";

function makeApp(overrides: Partial<Application>): Application {
  return {
    id: "app",
    company: "Company",
    role: "Role",
    status: "applied",
    appliedAt: null,
    jobUrl: null,
    location: null,
    salaryMin: null,
    salaryMax: null,
    notes: null,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

const january = makeApp({
  id: "jan",
  status: "applied",
  appliedAt: "2026-01-05",
});
const september = makeApp({
  id: "sep",
  status: "interviewing",
  appliedAt: "2026-09-24",
});
const noDate = makeApp({ id: "none", status: "wishlist", appliedAt: null });

const all = [noDate, january, september];

describe("parseListParams", () => {
  it("uses the defaults when the URL has no parameters", () => {
    const result = parseListParams(new URLSearchParams(""));
    expect(result).toEqual({ status: "all", sort: "newest" });
  });
  it("reads a valid status and sort", () => {
    const result = parseListParams(
      new URLSearchParams("status=offer&sort=oldest"),
    );
    expect(result).toEqual({ status: "offer", sort: "oldest" });
  });
  it("falls back to all for an unknown status", () => {
    const result = parseListParams(new URLSearchParams("status=banana"));
    expect(result).toEqual({ status: "all", sort: "newest" });
  });
});

describe("filterAndSort", () => {
  it("sorts newest first, with no date last", () => {
    const result = filterAndSort(all, { status: "all", sort: "newest" });
    expect(result.map((app) => app.id)).toEqual(["sep", "jan", "none"]);
  });

  it("sorts oldest first, with no date last", () => {
    const result = filterAndSort(all, { status: "all", sort: "oldest" });
    expect(result.map((app) => app.id)).toEqual(["jan", "sep", "none"]);
  });

  it("filters by status", () => {
    const result = filterAndSort(all, {
      status: "interviewing",
      sort: "newest",
    });

    expect(result.map((app) => app.id)).toEqual(["sep"]);
  });

  it("shouldnt change the original array", () => {
    const before = [...all];
    filterAndSort(all, { status: "all", sort: "newest" });
    expect(all).toEqual(before);
  });
});
