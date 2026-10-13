import { render, screen } from "@testing-library/react";
import type { Application } from "../types/applications";
import ApplicationCard from "./ApplicationCard";
import userEvent from "@testing-library/user-event";

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

describe("ApplicationCard", () => {
  it("calls onDelete when Delete is clicked", async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(
      <ApplicationCard application={app} onEdit={onEdit} onDelete={onDelete} />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /delete revolut/i }));

    expect(onDelete).toHaveBeenCalledOnce();
    expect(onEdit).not.toHaveBeenCalled();
  });

  it("calls onEdit when Edit is clicked", async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ApplicationCard application={app} onEdit={onEdit} onDelete={onDelete} />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /edit revolut/i }));

    expect(onEdit).toHaveBeenCalledOnce();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("shows the application's details, and hides empty ones", () => {
    render(
      <ApplicationCard application={app} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(
      screen.getByRole("heading", { name: "Revolut" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Frontend Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/interviewing/i)).toBeInTheDocument();
    expect(screen.getByText(/24 Sept 2026/i)).toBeInTheDocument();
    expect(screen.queryByText(/Salary/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Location/i)).not.toBeInTheDocument();
  });
});
