import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  deleteApplication,
  getApplicationEvents,
  getApplications,
  updateApplication,
} from "../services/applications.service";
import type { NewApplication } from "../types/applications";

const applicationsKey = ["applications"] as const; // as const makes the type exactly readonly ["applications"] instead of string[]

export function useApplications() {
  return useQuery({
    queryKey: applicationsKey,
    queryFn: getApplications,
  });
}

export function useApplicationEvents(applicationId: string) {
  return useQuery({
    queryKey: [...applicationsKey, applicationId, "events"],
    queryFn: () => getApplicationEvents(applicationId),
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: applicationsKey }),
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: applicationsKey }),
  });
}

export function useUpdateApplication() {
  // Implementation for updating an application
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: NewApplication }) =>
      updateApplication(id, input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: applicationsKey }),
  });
}
