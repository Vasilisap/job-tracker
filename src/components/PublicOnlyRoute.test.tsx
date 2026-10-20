import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import PublicOnlyRoute from "./PublicOnlyRoute";
import type { Session } from "@supabase/supabase-js";

// Replace the real hook with a fake, so no Supabase code runs.
vi.mock("../hooks/useAuth");

// Renders the guard at "/" with a stand-in dashboard to redirect to.
function renderAtRoot() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <p>Landing Page</p>
            </PublicOnlyRoute>
          }
        />
        <Route path="/app" element={<p>Dashboard Page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("PublicOnlyRoute", () => {
  it("renders children when logged out", () => {
    vi.mocked(useAuth).mockReturnValue({
      session: null,
      loading: false,
    });

    renderAtRoot();

    expect(screen.getByText("Landing Page")).toBeInTheDocument();
  });

  it("redirects to /app when there is a session", () => {
    vi.mocked(useAuth).mockReturnValue({
      session: {} as Session,
      loading: false,
    });

    renderAtRoot();

    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    expect(screen.queryByText("Landing Page")).not.toBeInTheDocument();
  });

  it("show a spinner while session is loading", () => {
    vi.mocked(useAuth).mockReturnValue({ session: null, loading: true });

    renderAtRoot();

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard Page")).not.toBeInTheDocument();
    expect(screen.queryByText("Landing Page")).not.toBeInTheDocument();
  });
});
