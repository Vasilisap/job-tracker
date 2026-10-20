import { MemoryRouter } from "react-router";
import { useTheme } from "../hooks/useTheme";
import LandingPage from "./LandingPage";
import { render, screen } from "@testing-library/react";

vi.mock("../hooks/useTheme");

function renderLandingPage() {
  vi.mocked(useTheme).mockReturnValue({
    preference: "system",
    resolvedTheme: "dark",
    setPreference: vi.fn(),
  });

  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  );
}

describe("LandingPage", () => {
  it("shows the tagline as the main heading", () => {
    renderLandingPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /catch every opportunity/i,
      }),
    ).toBeInTheDocument();
  });

  it("points every Get started link to sign-up", () => {
    renderLandingPage();

    const links = screen.getAllByRole("link", { name: /get started/i });

    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/login?mode=signup");
    }
  });

  it("points the sign-in links to /login", () => {
    renderLandingPage();

    const signIn = screen.getByRole("link", { name: /sign in/i });
    const haveAccount = screen.getByRole("link", {
      name: /i have an account/i,
    });

    expect(signIn).toHaveAttribute("href", "/login");
    expect(haveAccount).toHaveAttribute("href", "/login");
  });

  it("points the skip link to main", () => {
    renderLandingPage();
    expect(
      screen.getByRole("link", { name: /skip to content/i }),
    ).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
  });

  it("should check if screenshots have alt text", () => {
    renderLandingPage();

    const images = screen.getAllByRole("img", {
      name: /job trapper dashboard/i,
    });

    expect(images).toHaveLength(2);
  });

  it("should have 4 feature cards with a heading", () => {
    renderLandingPage();

    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards).toHaveLength(4);
  });

  it("checks the github link", () => {
    renderLandingPage();

    const githubLink = screen.getByRole("link", {
      name: /source code on github/i,
    });
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");
  });
});
