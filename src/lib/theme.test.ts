import { readStoredPreference, resolveTheme } from "./theme";

describe("resolveTheme", () => {
  it.each([
    ["light", true, "light"],
    ["dark", false, "dark"],
    ["system", true, "dark"],
    ["system", false, "light"],
  ] as const)(
    "resolveTheme(%s, %s) → %s",
    (preference, systemPrefersDark, expected) => {
      expect(resolveTheme(preference, systemPrefersDark)).toBe(expected);
    },
  );
});

describe("readStoredPreference", () => {
  beforeEach(() => localStorage.clear());
  it("should return dark mode when preference is dark", () => {
    localStorage.setItem("theme", "dark");
    expect(readStoredPreference()).toBe("dark");
  });
  it("should return system mode when preference is invalid", () => {
    localStorage.setItem("theme", "banana");
    expect(readStoredPreference()).toBe("system");
  });
  it("should return system mode nothing is saved", () => {
    expect(readStoredPreference()).toBe("system");
  });
});
