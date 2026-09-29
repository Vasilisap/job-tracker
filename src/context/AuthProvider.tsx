import { useEffect, useState, type ReactNode } from "react";
import { subscribeToAuthChanges } from "../services/auth.service";
import { AuthContext } from "./AuthContext";
import type { Session } from "@supabase/supabase-js";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The listener fires immediately with INITIAL_SESSION, which is what
    // resolves `loading` — no separate getSession call is needed.
    return subscribeToAuthChanges((session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
