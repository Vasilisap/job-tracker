import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../services/applications.service";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });
}
