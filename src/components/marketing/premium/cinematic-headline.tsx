"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LINES = [
  ["A", "infraestrutura", "moderna"],
  ["para", "negócios", "digitais."],
] as const;

const WORD_BASE_DELAY = 0.38;
const WORD_STAGGER = 0.065;

function Word({
  children,
  index,
  className,
}: {
  children: string;
  index: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden pb-0.5">
      <motion.span
        className={cn("inline-block", className)}
        initial={{ opacity: 0, y: 32, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.58,
          delay: WORD_BASE_DELAY + index * WORD_STAGGER,
          ease: EASE_OUT_EXPO,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function CinematicHeadline() {
  let wordIndex = 0;

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Glow revelado antes das palavras */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-12 -inset-y-8 -z-10"
        initial={{ opacity: 0, scale: 0.75, filter: "blur(40px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.12, ease: EASE_OUT_EXPO }}
      >
        <div className="absolute left-1/2 top-1/2 h-40 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[72px] dark:bg-primary/30" />
        <div className="absolute left-1/3 top-1/2 h-28 w-48 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-[56px]" />
        <div className="absolute right-1/4 top-1/3 h-24 w-40 rounded-full bg-violet-400/10 blur-[48px]" />
      </motion.div>

      <h1 className="hero-headline text-center">
        {LINES.map((line, lineIdx) => (
          <span
            key={lineIdx}
            className={cn(
              "block",
              lineIdx === 0 ? "hero-headline-line1" : "hero-headline-line2 mt-1 sm:mt-2"
            )}
          >
            {line.map((word, i) => {
              const idx = wordIndex++;
              const isLast = i === line.length - 1;
              return (
                <span key={`${lineIdx}-${word}`}>
                  <Word index={idx} className={lineIdx === 1 ? "hero-headline-accent" : "hero-headline-line1"}>
                    {word}
                  </Word>
                  {!isLast && <span className="inline-block w-[0.28em]" />}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </div>
  );
}
