import type { Session } from "@supabase/supabase-js";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";

// Replace the real hook with a fake, so no Supabase code runs.
vi.mock("../hooks/useAuth");

// Renders the guard at "/" with a stand-in login page to redirect to.
function renderAtRoot() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <p>secret</p>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<p>login page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  it("renders children when there is a session", () => {
    vi.mocked(useAuth).mockReturnValue({
      session: {} as Session,
      loading: false,
    });

    renderAtRoot();

    expect(screen.getByText("secret")).toBeInTheDocument();
  });

  it("redirects to /login when there is no session", () => {
    vi.mocked(useAuth).mockReturnValue({ session: null, loading: false });

    renderAtRoot();

    expect(screen.getByText("login page")).toBeInTheDocument();
    expect(screen.queryByText("secret")).not.toBeInTheDocument();
  });

  it("renders nothing while the session is loading", () => {
    vi.mocked(useAuth).mockReturnValue({ session: null, loading: true });

    renderAtRoot();

    expect(screen.queryByText("secret")).not.toBeInTheDocument();
    expect(screen.queryByText("login page")).not.toBeInTheDocument();
  });
});
