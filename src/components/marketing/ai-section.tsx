"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { TiltCard } from "@/components/marketing/premium/tilt-card";
import { Button } from "@/components/ui/button";

export function AISection() {
  return (
    <section id="ia" className="relative py-32">
      <div className="container mx-auto grid items-center gap-16 px-4 lg:grid-cols-2">
        <BlurReveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
            <Sparkles className="h-4 w-4" />
            IA Nexly
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Inteligência que <span className="gradient-text">trabalha por você</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Automatize fluxos, gere relatórios e tome decisões com insights em tempo real — disponível a partir do plano Pro.
          </p>
          <Button variant="glow" className="mt-8" asChild>
            <Link href="#automatizar">
              Falar com IA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </BlurReveal>

        <BlurReveal delay={0.15}>
          <TiltCard>
            <p className="mb-3 text-sm font-medium text-muted-foreground">Prompt em execução</p>
            <p className="font-mono text-sm text-foreground/90">
              &quot;Resuma as métricas de vendas deste mês e sugira 3 ações.&quot;
            </p>
            <motion.div
              className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Processando...
              </div>
              <motion.p
                className="mt-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                ✓ Relatório gerado · 3 recomendações · Exportável em PDF
              </motion.p>
            </motion.div>
          </TiltCard>
        </BlurReveal>
      </div>
    </section>
  );
}
