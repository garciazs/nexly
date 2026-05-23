"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverSurface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "surface-card group relative overflow-hidden rounded-xl transition-colors",
        className
      )}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
