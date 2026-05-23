"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function PremiumBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.12), transparent 65%)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 noise-overlay opacity-[0.25] dark:opacity-[0.35]" />

      <motion.div
        className="absolute -left-1/4 top-0 h-[560px] w-[560px] rounded-full bg-violet-500/20 blur-[120px] dark:bg-violet-600/25"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/4 h-[480px] w-[480px] rounded-full bg-indigo-400/15 blur-[100px] dark:bg-indigo-500/20"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[90px] dark:bg-cyan-500/15"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <div className="absolute inset-0 animated-grid opacity-40 dark:opacity-30" />
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
    </div>
  );
}
