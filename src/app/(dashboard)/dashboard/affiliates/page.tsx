"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Copy, TrendingUp, Users, Wallet } from "lucide-react";
import { AFFILIATE_COMMISSION } from "@/lib/constants";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";

const stats = [
  { label: "Cliques", value: 1247, icon: Users },
  { label: "Conversões", value: 38, icon: TrendingUp },
  { label: "Comissão pendente", value: 892, icon: Wallet, prefix: "€" },
];

export default function AffiliatesPage() {
  const link = "https://nexly.app/?ref=DEMO2026";

  return (
    <PageShell className="space-y-8">
      <PageHeader
        title="Programa de Afiliados"
        description={`Comissão fixa de ${(AFFILIATE_COMMISSION * 100).toFixed(0)}% — disponível no plano Pro ou superior`}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="flex items-center gap-4 pt-6">
              <s.icon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">
                  {s.prefix}
                  <AnimatedCounter value={s.value} />
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card max-w-2xl">
        <CardHeader>
          <CardTitle>Seu link de afiliado</CardTitle>
          <CardDescription>Compartilhe e ganhe em euros a cada assinatura qualificada</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <code className="flex-1 rounded-lg bg-muted px-4 py-3 text-sm font-mono">{link}</code>
          <Button variant="outline" size="icon" aria-label="Copiar link">
            <Copy className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Histórico de conversões</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { user: "maria@email.com", plan: "Pro", value: "€9,80", status: "Pago" },
            { user: "joao@startup.io", plan: "Business", value: "€19,80", status: "Pendente" },
          ].map((c) => (
            <div
              key={c.user}
              className="flex items-center justify-between rounded-lg border border-border/50 p-3"
            >
              <div>
                <p className="font-medium">{c.user}</p>
                <p className="text-sm text-muted-foreground">Plano {c.plan}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{c.value}</p>
                <Badge variant={c.status === "Pago" ? "default" : "secondary"}>{c.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
