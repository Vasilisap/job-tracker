import { createContext } from "react";
import type { ResolvedTheme, ThemePreference } from "../lib/theme";

export interface ThemeContextValue {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (next: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
