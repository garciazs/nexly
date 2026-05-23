"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { CreditCard, Receipt, Sparkles } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanPicker } from "@/components/billing/plan-picker";
import type { BillingData } from "@/lib/dashboard/queries";
import { formatEuro } from "@/lib/dashboard/metrics";
import { PLANS } from "@/lib/constants";
import type { Plan } from "@prisma/client";

const PLAN_LABELS: Record<Plan, string> = {
  STARTER: PLANS.STARTER.name,
  PRO: PLANS.PRO.name,
  BUSINESS: PLANS.BUSINESS.name,
  ENTERPRISE: PLANS.ENTERPRISE.name,
};

const STATUS_LABELS: Record<string, string> = {
  TRIALING: "Trial gratuito",
  ACTIVE: "Ativo",
  CANCELED: "Cancelado",
  PAST_DUE: "Pagamento pendente",
  INCOMPLETE: "Incompleto",
};

function BillingContent({
  billing,
  stripeEnabled,
}: {
  billing: BillingData;
  stripeEnabled: boolean;
}) {
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "1";
  const success = searchParams.get("success") === "1";
  const canceled = searchParams.get("canceled") === "1";

  const planName = PLAN_LABELS[billing.plan] ?? billing.plan;
  const planConfig = PLANS[billing.plan];
  const priceLabel = "priceLabel" in planConfig ? planConfig.priceLabel : "—";

  return (
    <PageShell className="space-y-10">
      <PageHeader
        title="Planos e cobrança"
        description="Escolha o plano ideal para o seu workspace e comece a faturar com a Nexly"
      />

      {welcome && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm"
        >
          <p className="font-medium text-primary">Bem-vindo à Nexly!</p>
          <p className="mt-1 text-muted-foreground">
            Seu workspace está no trial. Escolha um plano abaixo para desbloquear todos os recursos.
          </p>
        </motion.div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          Pagamento confirmado! Seu plano foi atualizado.
        </div>
      )}

      {canceled && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          Checkout cancelado. Você pode escolher um plano quando quiser.
        </div>
      )}

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Plano atual: {planName}
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {priceLabel}/mês · {STATUS_LABELS[billing.status] ?? billing.status}
            </p>
          </div>
          <Badge variant={billing.status === "ACTIVE" ? "default" : "secondary"}>
            {STATUS_LABELS[billing.status] ?? billing.status}
          </Badge>
        </CardHeader>
        {billing.status === "TRIALING" && (
          <CardContent>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              14 dias de trial · depois escolha um plano pago para continuar
            </p>
          </CardContent>
        )}
      </Card>

      <div>
        <h2 className="mb-2 text-xl font-semibold">Planos Nexly</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Starter para começar · Pro para crescer com afiliados · Business para escalar · Enterprise sob medida
        </p>
        <PlanPicker
          currentPlan={billing.plan}
          stripeEnabled={stripeEnabled}
          mode="dashboard"
        />
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Receipt className="h-4 w-4" />
            Histórico de pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {billing.payments.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Nenhuma fatura ainda. Após o primeiro pagamento, aparece aqui.
            </p>
          ) : (
            <div className="space-y-3">
              {billing.payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                >
                  <div>
                    <p className="font-medium">{formatEuro(p.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <Badge variant="outline">{p.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}

export function BillingView({
  billing,
  stripeEnabled,
}: {
  billing: BillingData | null;
  stripeEnabled: boolean;
}) {
  if (!billing) {
    return (
      <PageShell>
        <PageHeader title="Planos e cobrança" description="Assinatura do workspace" />
        <PlanPicker currentPlan="STARTER" stripeEnabled={stripeEnabled} mode="dashboard" />
      </PageShell>
    );
  }

  return (
    <Suspense fallback={null}>
      <BillingContent billing={billing} stripeEnabled={stripeEnabled} />
    </Suspense>
  );
}
