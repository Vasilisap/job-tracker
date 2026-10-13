import type { Application } from "../types/applications";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList({
  applications,
  onEdit,
  onDelete,
}: {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}) {
  return (
    <ul className="space-y-3">
      {applications.map((app) => (
        <li key={app.id}>
          <ApplicationCard
            onEdit={() => onEdit(app)}
            onDelete={() => onDelete(app)}
            application={app}
          />
        </li>
      ))}
    </ul>
  );
}
