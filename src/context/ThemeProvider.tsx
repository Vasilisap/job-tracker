import { useEffect, useState, type ReactNode } from "react";
import {
  readStoredPreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "../lib/theme";
import { ThemeContext } from "./ThemeContext";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState(readStoredPreference);
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => window.matchMedia(DARK_QUERY).matches,
  );

  const resolvedTheme = resolveTheme(preference, systemPrefersDark);

  function setPreference(next: ThemePreference) {
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage blocked: the choice still applies, it just won't be remembered
    }

    setPreferenceState(next);
  }

  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const onChange = (event: MediaQueryListEvent) =>
      setSystemPrefersDark(event.matches);

    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        preference,
        resolvedTheme,
        setPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
