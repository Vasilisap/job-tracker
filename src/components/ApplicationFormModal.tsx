import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  applicationSchema,
  toFormValues,
  type ApplicationFormInput,
  type ApplicationFormOutput,
} from "../lib/applicationSchema";
import { STATUS_LABELS } from "../lib/status";
import { Constants } from "../types/database.types";
import {
  useCreateApplication,
  useUpdateApplication,
} from "../hooks/useApplications";
import type { Application } from "../types/applications";
import { toast } from "sonner";

const inputClass =
  "block w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-sm text-fg placeholder-hint focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:outline-none aria-invalid:border-red-500";

/** A label, its control, and the control's error message, stacked. */
function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-fg-soft">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplicationFormModal({
  onClose,
  application,
}: {
  onClose: () => void;
  application?: Application;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormInput, unknown, ApplicationFormOutput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: toFormValues(application),
  });
  const {
    mutate: createApp,
    isPending: createIsPending,
    error: createError,
  } = useCreateApplication();
  const {
    mutate: updateApp,
    isPending: updateIsPending,
    error: updateError,
  } = useUpdateApplication();

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const isEditing = application !== undefined;
  const isSaving = createIsPending || updateIsPending;
  const saveError = createError ?? updateError;

  function onSubmit(values: ApplicationFormOutput) {
    if (application) {
      updateApp(
        { id: application.id, input: values },
        {
          onSuccess: () => {
            onClose();
            toast.success("Changes saved");
          },
        },
      );
    } else {
      createApp(values, {
        onSuccess: () => {
          onClose();
          toast.success("Application added");
        },
      });
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="application-form-title"
      className="m-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-6 text-fg shadow-xl ring-1 ring-line backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
    >
      <h2
        id="application-form-title"
        className="text-lg font-semibold text-fg-strong"
      >
        {isEditing ? "Edit application" : "New application"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2"
      >
        <Field id="company" label="Company" error={errors.company?.message}>
          <input
            id="company"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            className={inputClass}
            {...register("company")}
          />
        </Field>

        <Field id="role" label="Role" error={errors.role?.message}>
          <input
            id="role"
            aria-invalid={!!errors.role}
            className={inputClass}
            {...register("role")}
          />
        </Field>

        <Field id="status" label="Status" error={errors.status?.message}>
          <select
            id="status"
            aria-invalid={!!errors.status}
            className={inputClass}
            {...register("status")}
          >
            {Constants.public.Enums.application_status.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="appliedAt"
          label="Applied on"
          error={errors.appliedAt?.message}
        >
          <input
            id="appliedAt"
            type="date"
            aria-invalid={!!errors.appliedAt}
            className={inputClass}
            {...register("appliedAt")}
          />
        </Field>

        <Field id="location" label="Location" error={errors.location?.message}>
          <input
            id="location"
            placeholder="e.g. Limassol or Remote"
            aria-invalid={!!errors.location}
            className={inputClass}
            {...register("location")}
          />
        </Field>

        <Field
          id="jobUrl"
          label="Job posting URL"
          error={errors.jobUrl?.message}
        >
          <input
            id="jobUrl"
            type="url"
            placeholder="https://"
            aria-invalid={!!errors.jobUrl}
            className={inputClass}
            {...register("jobUrl")}
          />
        </Field>

        <Field
          id="salaryMin"
          label="Min salary (€)"
          error={errors.salaryMin?.message}
        >
          <input
            id="salaryMin"
            type="number"
            min={0}
            step={1000}
            inputMode="numeric"
            aria-invalid={!!errors.salaryMin}
            className={inputClass}
            {...register("salaryMin")}
          />
        </Field>

        <Field
          id="salaryMax"
          label="Max salary (€)"
          error={errors.salaryMax?.message}
        >
          <input
            id="salaryMax"
            type="number"
            min={0}
            step={1000}
            inputMode="numeric"
            aria-invalid={!!errors.salaryMax}
            className={inputClass}
            {...register("salaryMax")}
          />
        </Field>

        <Field
          id="notes"
          label="Notes"
          error={errors.notes?.message}
          className="sm:col-span-2"
        >
          <textarea
            id="notes"
            rows={4}
            aria-invalid={!!errors.notes}
            className={inputClass}
            {...register("notes")}
          />
        </Field>

        {saveError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 dark:bg-red-950/60 px-3 py-2 text-sm text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-900 sm:col-span-2"
          >
            {saveError.message ??
              "An error occurred while saving the application."}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2 sm:col-span-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-fg hover:bg-raised focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : isEditing ? "Save changes" : "Save"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
