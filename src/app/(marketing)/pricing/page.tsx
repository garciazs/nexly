import Link from "next/link";
import { PlanPicker } from "@/components/billing/plan-picker";
import { isAnyStripePlanConfigured } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { ptBR } from "@/i18n/pt-BR";

export default function PricingPage() {
  const stripeEnabled = isAnyStripePlanConfigured();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{ptBR.pricing.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{ptBR.pricing.subtitle}</p>
        <p className="mt-2 text-sm text-primary">{ptBR.pricing.affiliateNote}</p>
      </div>

      <div className="mt-16">
        <PlanPicker currentPlan="STARTER" stripeEnabled={stripeEnabled} mode="marketing" />
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button variant="glow" asChild>
          <Link href="/register">Criar conta grátis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Voltar ao site</Link>
        </Button>
      </div>
    </div>
  );
}
