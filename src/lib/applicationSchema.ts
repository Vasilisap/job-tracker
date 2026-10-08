import z from "zod";
import { Constants } from "../types/database.types";

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : value));

const optionalUrl = optionalText.pipe(z.url("Enter a valid URL").nullable());

const optionalSalary = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : Number(value)))
  .pipe(
    z
      .number("Enter a number")
      .int("Use whole euros")
      .nonnegative("Can't be negative")
      .nullable(),
  );

export const applicationSchema = z
  .object({
    company: z.string().trim().min(1, "Company name is required"),
    role: z.string().trim().min(1, "Role is required"),
    status: z.enum(Constants.public.Enums.application_status),
    appliedAt: optionalText,
    jobUrl: optionalUrl,
    location: optionalText,
    salaryMin: optionalSalary,
    salaryMax: optionalSalary,
    notes: optionalText,
  })
  .refine(
    (data) =>
      data.salaryMin === null ||
      data.salaryMax === null ||
      data.salaryMin <= data.salaryMax,
    {
      message: "Maximum must be at least the minimum",
      path: ["salaryMax"],
    },
  );

export type ApplicationFormInput = z.input<typeof applicationSchema>;
export type ApplicationFormOutput = z.output<typeof applicationSchema>;
