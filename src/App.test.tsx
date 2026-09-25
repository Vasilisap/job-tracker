import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the app heading", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /job tracker/i });
  expect(heading).toBeInTheDocument();
});
