"use client";

import Link from "next/link";
import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { Button } from "@/components/ui/button";

export function Enterprise() {
  return (
    <section id="enterprise" className="relative py-32">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <BlurReveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Enterprise</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Infra dedicada, SSO, SLA personalizado e suporte 24/7 para organizações em escala global.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-10 border-white/10 bg-white/5 backdrop-blur-md hover:border-violet-500/40"
            asChild
          >
            <Link href="#automatizar">Falar com vendas</Link>
          </Button>
        </BlurReveal>
      </div>
    </section>
  );
}
