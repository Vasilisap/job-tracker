import { formatDate, formatSalary } from "./format";

describe("formatSalary", () => {
  it.each([
    [45000, null, "From €45,000"],
    [null, 60000, "Up to €60,000"],
    [45000, 60000, "€45,000 – €60,000"],
    [null, null, null],
  ])("formatSalary(%s, %s) → %s", (min, max, expected) => {
    expect(formatSalary(min, max)).toBe(expected);
  });
});

describe("formatDate", () => {
  it("should format date correctly", () => {
    expect(formatDate("2023-01-01")).toBe("1 Jan 2023");
    expect(formatDate(null)).toBeNull();
  });
});
