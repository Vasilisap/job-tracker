import { applicationSchema } from "./applicationSchema";

const validInput = {
  company: "Revolut",
  role: "Frontend Engineer",
  status: "applied",
  appliedAt: "2026-09-24",
  jobUrl: "",
  location: " Limassol ",
  salaryMin: "45000",
  salaryMax: "",
  notes: "",
};

describe("applicationSchema", () => {
  it("should turn valid form values into a NewApplication", () => {
    const result = applicationSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      company: "Revolut",
      role: "Frontend Engineer",
      status: "applied",
      appliedAt: "2026-09-24",
      jobUrl: null,
      location: "Limassol",
      salaryMin: 45000,
      salaryMax: null,
      notes: null,
    });
  });

  it("rejects an empty company", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      company: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a salary that isn't a number", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      salaryMin: "abc",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a minimum salary above the maximum salary", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      salaryMin: "60000",
      salaryMax: "45000",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["salaryMax"]);
  });
});
