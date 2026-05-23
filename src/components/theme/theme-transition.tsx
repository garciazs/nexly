"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/** Enables smooth CSS transitions when theme changes */
export function ThemeTransition() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    const t = setTimeout(() => root.classList.remove("theme-transition"), 400);
    return () => clearTimeout(t);
  }, [resolvedTheme]);

  return null;
}
