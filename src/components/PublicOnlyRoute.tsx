import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { FullPageSpinner } from "./Spinner";
import { Navigate } from "react-router";

export default function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();

  if (loading) return <FullPageSpinner />;
  if (session) return <Navigate to="/app" replace />;

  return children;
}
