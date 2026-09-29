import type { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export interface AuthContextValue {
  /** The current session, or null when logged out. */
  session: Session | null;
  /** True until the first auth state has been determined. */
  loading: boolean;
}

// Undefined by default, so useAuth can tell "no provider above me" apart
// from "logged out".
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
