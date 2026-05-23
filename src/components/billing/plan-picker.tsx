"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Plan } from "@prisma/client";
import { MARKETING_PLANS, type PlanId } from "@/lib/plans";
import { ptBR } from "@/i18n/pt-BR";

type PlanPickerProps = {
  currentPlan?: Plan;
  stripeEnabled: boolean;
  mode?: "marketing" | "dashboard";
  highlightPlanId?: PlanId;
};

export function PlanPicker({
  currentPlan = "STARTER",
  stripeEnabled,
  mode = "dashboard",
  highlightPlanId = "pro",
}: PlanPickerProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function subscribe(planId: PlanId) {
    if ("custom" in (MARKETING_PLANS.find((p) => p.id === planId) ?? {})) {
      window.location.href = "mailto:suporte@nexly.app?subject=Enterprise";
      return;
    }

    if (!stripeEnabled) {
      setError("Pagamentos ainda não configurados. Adicione as chaves Stripe no servidor.");
      return;
    }

    setLoadingPlan(planId);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Não foi possível iniciar o pagamento.");
        setLoadingPlan(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div
        className={cn(
          "grid gap-6",
          mode === "marketing" ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-4"
        )}
      >
        {MARKETING_PLANS.map((plan) => {
          const isCurrent = plan.enum === currentPlan;
          const isPopular = plan.id === highlightPlanId;
          const isCustom = "custom" in plan;

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative flex h-full flex-col surface-card-interactive",
                isPopular && "border-primary/40 shadow-glow-lg",
                isCurrent && "ring-2 ring-primary/50"
              )}
            >
              {isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Sparkles className="h-3 w-3" />
                  Mais popular
                </Badge>
              )}
              {isCurrent && (
                <Badge variant="secondary" className="absolute -top-3 right-3">
                  Seu plano
                </Badge>
              )}

              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.priceLabel}</span>
                  {!isCustom && (
                    <span className="text-muted-foreground">{ptBR.pricing.perMonth}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {mode === "marketing" && !isCustom ? (
                  <Button
                    className="w-full"
                    variant={isPopular ? "glow" : "outline"}
                    asChild
                  >
                    <Link href={`/register?plan=${plan.id}`}>Começar agora</Link>
                  </Button>
                ) : isCustom ? (
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="mailto:suporte@nexly.app?subject=Enterprise">Falar com vendas</Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={isPopular ? "glow" : "outline"}
                    disabled={isCurrent || loadingPlan !== null}
                    onClick={() => subscribe(plan.id)}
                  >
                    {loadingPlan === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecionando…
                      </>
                    ) : isCurrent ? (
                      "Plano atual"
                    ) : (
                      `Assinar ${plan.name}`
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Pagamento seguro via Stripe · em euros (€) · cancele quando quiser
      </p>
    </div>
  );
}
