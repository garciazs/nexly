"use client";

import { BlurReveal } from "@/components/marketing/premium/blur-reveal";

export function Individuals() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <BlurReveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Para quem constrói <span className="gradient-text">sozinho ou em time</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comece com o Starter por €19/mês. Sem compromisso — evolua quando precisar.
          </p>
        </BlurReveal>
      </div>
    </section>
  );
}
