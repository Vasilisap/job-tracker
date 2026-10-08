import type { Application } from "../types/applications";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <ul className="space-y-3">
      {applications.map((app) => (
        <li key={app.id}>
          <ApplicationCard application={app} />
        </li>
      ))}
    </ul>
  );
}
