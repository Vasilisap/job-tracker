import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import { FullPageSpinner } from "./Spinner";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();

  if (loading) return <FullPageSpinner />;
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
