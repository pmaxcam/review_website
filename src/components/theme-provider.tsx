"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  attribute?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  attribute = "class",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous attribute value
    root.removeAttribute(attribute);

    // Set attribute for current theme
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.setAttribute(attribute, systemTheme);
      return;
    }

    root.setAttribute(attribute, theme);
  }, [theme, attribute, enableSystem]);

  // Watch for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Update theme when system preference changes
    const onSystemThemeChange = () => {
      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        const root = window.document.documentElement;
        root.setAttribute(attribute, systemTheme);
      }
    };

    mediaQuery.addEventListener("change", onSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener("change", onSystemThemeChange);
    };
  }, [theme, attribute, enableSystem]);

  // Disable transitions when changing theme
  useEffect(() => {
    if (!disableTransitionOnChange) return;

    const root = window.document.documentElement;
    root.classList.add("!transition-none");

    // Cleanup after transitions have been disabled
    const timeout = setTimeout(() => {
      root.classList.remove("!transition-none");
    }, 0);

    return () => clearTimeout(timeout);
  }, [theme, disableTransitionOnChange]);

  const value = {
    theme,
    setTheme: (theme: Theme) => setTheme(theme),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}; 