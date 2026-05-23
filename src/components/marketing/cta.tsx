"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { ptBR } from "@/i18n/pt-BR";
import { EASE_OUT_EXPO } from "@/lib/motion";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 5.2) % 84}%`,
  top: `${12 + (i * 7.3) % 76}%`,
  size: i % 3 === 0 ? 3 : 2,
  delay: (i % 6) * 0.4,
  duration: 4 + (i % 5),
}));

export function CTA() {
  return (
    <section id="automatizar" className="relative overflow-hidden py-28 md:py-36">
      {/* Section ambient */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[min(80vw,700px)] w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[120px]"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]"
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="absolute inset-0 animated-grid opacity-25" />
        <div className="absolute inset-0 noise-overlay opacity-[0.2] dark:opacity-[0.3]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <BlurReveal>
          <motion.div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-background/40 p-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_100px_-30px_rgba(139,92,246,0.4)] backdrop-blur-2xl md:p-16 lg:p-20"
            whileInView={{ scale: [0.98, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            {/* Animated gradient border glow */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.4), transparent 35%, rgba(34,211,238,0.25), transparent 65%, rgba(139,92,246,0.3))",
              }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.75rem-1px)] bg-background/80 backdrop-blur-xl" />

            <motion.div
              className="pointer-events-none absolute -top-32 left-1/2 h-56 w-[min(100%,480px)] -translate-x-1/2 rounded-full bg-violet-500/30 blur-3xl"
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Floating particles */}
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="pointer-events-none absolute rounded-full bg-violet-400/40"
                style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
                animate={{ y: [0, -12, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-md sm:text-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Comece grátis hoje
              </motion.div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {ptBR.cta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
                {ptBR.cta.subtitle}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-5">
                <MagneticButton>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 min-w-[180px] border-border/60 bg-background/60 px-8 text-base backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98] sm:h-14"
                    asChild
                  >
                    <Link href="/register">
                      {ptBR.cta.primary}
                    </Link>
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 opacity-70 blur-md"
                      animate={{ opacity: [0.5, 0.85, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <Button
                      variant="glow"
                      size="lg"
                      className="group relative h-14 min-w-[220px] overflow-hidden border-0 px-8 text-base shadow-glow-lg sm:min-w-[240px] sm:px-10 sm:text-lg"
                      asChild
                    >
                      <Link href="/#precos">
                        {ptBR.cta.secondary}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </MagneticButton>
              </div>

              <motion.p
                className="mt-8 text-sm tracking-wide text-muted-foreground/80 sm:mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {ptBR.cta.footnote}
              </motion.p>
            </motion.div>
          </motion.div>
        </BlurReveal>
      </div>
    </section>
  );
}
