import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

it("renders correctly with the provided status", () => {
  render(<StatusBadge status="interviewing" />);

  expect(screen.getByText("Interviewing")).toBeInTheDocument();
});
