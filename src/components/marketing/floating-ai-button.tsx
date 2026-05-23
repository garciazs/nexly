"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function FloatingAIButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="#automatizar" className="group relative block">
        <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-pulse-glow" />
        <motion.span
          className="relative flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow-lg backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          animate={{ boxShadow: ["0 0 20px hsl(var(--primary) / 0.35)", "0 0 40px hsl(var(--primary) / 0.55)", "0 0 20px hsl(var(--primary) / 0.35)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4" />
          Falar com IA
        </motion.span>
      </Link>
    </motion.div>
  );
}
