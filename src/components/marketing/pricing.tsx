"use client";

import Link from "next/link";
import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { PlanPicker } from "@/components/billing/plan-picker";
import { ptBR } from "@/i18n/pt-BR";
import { Button } from "@/components/ui/button";

type PricingProps = {
  stripeEnabled?: boolean;
};

export function Pricing({ stripeEnabled = false }: PricingProps) {
  return (
    <section id="precos" className="relative py-32">
      <div className="container mx-auto px-4">
        <BlurReveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{ptBR.pricing.title}</h2>
          <p className="mt-4 text-muted-foreground">{ptBR.pricing.subtitle}</p>
          <p className="mt-2 text-sm text-primary">{ptBR.pricing.affiliateNote}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            14 dias grátis no trial · depois a partir de €19/mês
          </p>
        </BlurReveal>

        <div className="mt-16">
          <PlanPicker
            currentPlan="STARTER"
            stripeEnabled={stripeEnabled}
            mode="marketing"
          />
        </div>

        <BlurReveal className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">Já tem conta?</p>
          <Button variant="outline" asChild>
            <Link href="/login?callbackUrl=/dashboard/billing">Entrar e escolher plano</Link>
          </Button>
        </BlurReveal>
      </div>
    </section>
  );
}
