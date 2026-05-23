"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { DashboardMockup } from "@/components/marketing/dashboard-mockup";
import { CinematicHeadline } from "@/components/marketing/premium/cinematic-headline";
import { InfiniteMarquee } from "@/components/marketing/premium/infinite-marquee";
import { ptBR } from "@/i18n/pt-BR";
import { EASE_OUT_EXPO } from "@/lib/motion";

const activityItems = [
  "+€1.240 em receita",
  "Novo afiliado aprovado",
  "+12 usuários ativos",
  "Pagamento confirmado",
  "Conversão +23%",
  "Meta mensal atingida",
];

/** Após ~6 palavras × 0.065 + base */
const SUBTITLE_DELAY = 0.85;
const CTA_DELAY = 1.05;
const DASHBOARD_DELAY = 1.25;
const MARQUEE_DELAY = 1.55;

export function Hero() {
  return (
    <section className="relative flex min-h-0 flex-col items-center overflow-hidden pb-8 pt-[5.5rem] md:pb-12 md:pt-24">
      {/* Glow ambiente — escala com o dashboard */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(85vh,900px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
      >
        <motion.div
          className="absolute left-1/2 top-32 h-80 w-[min(100%,920px)] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] md:h-96 md:blur-[140px]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.05, ease: EASE_OUT_EXPO }}
        />
        <motion.div
          className="absolute left-1/2 top-[45%] h-64 w-[min(90%,800px)] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT_EXPO }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur-md sm:text-sm"
        >
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
          </span>
          Nexly · Infraestrutura inteligente em euros
        </motion.div>

        <CinematicHeadline />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: SUBTITLE_DELAY, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-2xl sm:text-lg md:text-[1.125rem]"
        >
          {ptBR.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: CTA_DELAY, ease: EASE_OUT_EXPO }}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4"
        >
          <MagneticButton>
            <Button
              variant="glow"
              size="lg"
              className="group h-11 px-7 text-sm shadow-glow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] sm:h-12 sm:px-8 sm:text-base"
              asChild
            >
              <Link href="/register">
                {ptBR.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              variant="outline"
              size="lg"
              className="h-11 border-border/60 bg-background/50 px-7 text-sm backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:bg-primary/5 hover:shadow-glow active:scale-[0.98] sm:h-12 sm:px-8 sm:text-base"
              asChild
            >
              <Link href="#automatizar">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                {ptBR.hero.ctaSecondary}
              </Link>
            </Button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Dashboard — largura total, fora do container */}
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6">
        <DashboardMockup entranceDelay={DASHBOARD_DELAY} />
      </div>

      <motion.div
        className="relative z-10 mt-10 w-full sm:mt-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: MARQUEE_DELAY, ease: EASE_OUT_EXPO }}
      >
        <InfiniteMarquee items={activityItems} speed={35} />
      </motion.div>
    </section>
  );
}
