"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("h-9 w-[4.25rem] rounded-full bg-muted", className)} />;
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      aria-label="Alternar tema"
      onClick={() => {
        document.documentElement.classList.add("theme-transition");
        setTheme(isDark ? "light" : "dark");
      }}
      className={cn(
        "relative h-9 w-[4.25rem] rounded-full border border-border/60 bg-muted/60 p-1 backdrop-blur-sm transition-colors hover:border-primary/30",
        className
      )}
    >
      <motion.div
        className="flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-sm"
        animate={{ x: isDark ? 30 : 0 }}
        transition={springSnappy}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
