"use client";

import { motion } from "framer-motion";
import { CreditCard, Receipt } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverSurface } from "@/components/motion/hover-surface";
import { EmptyState } from "@/components/dashboard/empty-state";
import type { BillingData } from "@/lib/dashboard/queries";
import { formatEuro } from "@/lib/dashboard/metrics";
import { PLANS } from "@/lib/constants";

const PLAN_LABELS: Record<string, string> = {
  STARTER: PLANS.STARTER.name,
  PRO: PLANS.PRO.name,
  BUSINESS: PLANS.BUSINESS.name,
  ENTERPRISE: PLANS.ENTERPRISE.name,
};

const STATUS_LABELS: Record<string, string> = {
  TRIALING: "Trial",
  ACTIVE: "Ativo",
  CANCELED: "Cancelado",
  PAST_DUE: "Em atraso",
  INCOMPLETE: "Incompleto",
};

export function BillingView({ billing }: { billing: BillingData | null }) {
  if (!billing) {
    return (
      <PageShell>
        <PageHeader title="Cobrança" description="Plano e faturas do workspace" />
        <EmptyState
          icon={CreditCard}
          title="Sem assinatura configurada"
          description="Seu workspace ainda não tem um plano vinculado."
        />
      </PageShell>
    );
  }

  const planName = PLAN_LABELS[billing.plan] ?? billing.plan;

  return (
    <PageShell className="space-y-6">
      <PageHeader title="Cobrança" description="Plano e histórico do seu workspace" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HoverSurface className="p-0">
          <Card className="border-0 bg-transparent shadow-none max-w-xl">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Plano {planName}</CardTitle>
                <CardDescription>Assinatura deste workspace</CardDescription>
              </div>
              <Badge variant={billing.status === "ACTIVE" ? "default" : "secondary"}>
                {STATUS_LABELS[billing.status] ?? billing.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {billing.payments.length === 0
                  ? "Nenhum pagamento registrado ainda."
                  : `${billing.payments.length} pagamento(s) no histórico`}
              </p>
            </CardContent>
          </Card>
        </HoverSurface>
      </motion.div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Receipt className="h-4 w-4" />
            Histórico de pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {billing.payments.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Sem faturas ainda. Os pagamentos via Stripe aparecerão aqui.
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
