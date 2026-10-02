import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  createApplication,
  getApplications,
} from "../services/applications.service";
import type { Application, NewApplication } from "../types/applications";
import { useApplications, useCreateApplication } from "./useApplications";

vi.mock("../services/applications.service");

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
}

function createWrapper(queryClient = createTestQueryClient()) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const app: Application = {
  id: "app-1",
  company: "Revolut",
  role: "Frontend Engineer",
  status: "interviewing",
  appliedAt: "2026-09-24",
  jobUrl: null,
  location: null,
  salaryMin: null,
  salaryMax: null,
  notes: null,
  createdAt: "2026-09-24T13:36:45Z",
  updatedAt: "2026-09-24T13:46:04Z",
};

describe("useApplications", () => {
  it("returns the applications from the service", async () => {
    vi.mocked(getApplications).mockResolvedValue([app]);
    // mockResolvedValue([app]), not mockReturnValue. getApplications is async, so it returns a promise

    const { result } = renderHook(() => useApplications(), {
      wrapper: createWrapper(),
    });
    // renderHook(() => useApplications(), { wrapper }) runs the hook inside the wrapper. result.current is whatever the hook returned on its latest render.

    // await waitFor(...) is needed because the query doesn't finish straight away. On the first render isPending is true. waitFor keeps re-checking until the expectation passes, or times out after a second.

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([app]);
  });

  it("returns the error from the service", async () => {
    vi.mocked(getApplications).mockRejectedValue(new Error("Network down"));

    const { result } = renderHook(() => useApplications(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe("Network down");
  });
});

describe("useCreateApplication", () => {
  it("creates the application and refreshes the list", async () => {
    const input: NewApplication = {
      company: "Revolut",
      role: "Frontend Engineer",
      status: "applied",
      appliedAt: null,
      jobUrl: null,
      location: null,
      salaryMin: null,
      salaryMax: null,
      notes: null,
    };

    vi.mocked(createApplication).mockResolvedValue(app);

    const queryClient = createTestQueryClient();
    const invalidate = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateApplication(), {
      wrapper: createWrapper(queryClient),
    });

    act(() => result.current.mutate(input));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(vi.mocked(createApplication).mock.calls[0][0]).toEqual(input);

    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["applications"] });
  });
});
