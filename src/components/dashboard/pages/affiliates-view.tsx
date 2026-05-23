"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Copy, TrendingUp, Users, Wallet } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import type { AffiliateData } from "@/lib/dashboard/queries";
import { formatEuro } from "@/lib/dashboard/metrics";

type AffiliatesViewProps = {
  affiliate: AffiliateData;
  commissionPercent: string;
  appUrl: string;
};

export function AffiliatesView({ affiliate, commissionPercent, appUrl }: AffiliatesViewProps) {
  const link = affiliate.code ? `${appUrl}/?ref=${affiliate.code}` : null;
  const clicks = affiliate.conversions.length;
  const conversions = affiliate.conversions.length;
  const pendingCents = affiliate.totalEarnings;

  if (!affiliate.code) {
    return (
      <PageShell className="space-y-8">
        <PageHeader
          title="Programa de Afiliados"
          description={`Comissão de ${commissionPercent}% — ative no plano Pro`}
        />
        <EmptyState
          icon={Users}
          title="Programa não ativado"
          description="Seu usuário ainda não participa do programa de afiliados. Ative quando estiver disponível no seu plano."
        />
      </PageShell>
    );
  }

  return (
    <PageShell className="space-y-8">
      <PageHeader
        title="Programa de Afiliados"
        description={`Comissão de ${commissionPercent}% — dados da sua conta`}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardContent className="flex items-center gap-4 pt-6">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Conversões</p>
              <p className="text-2xl font-bold">
                <AnimatedCounter value={clicks} />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="flex items-center gap-4 pt-6">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Registros via link</p>
              <p className="text-2xl font-bold">
                <AnimatedCounter value={conversions} />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="flex items-center gap-4 pt-6">
            <Wallet className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Ganhos totais</p>
              <p className="text-2xl font-bold">{formatEuro(pendingCents)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {link && (
        <Card className="glass-card max-w-2xl">
          <CardHeader>
            <CardTitle>Seu link de afiliado</CardTitle>
            <CardDescription>Compartilhe para indicar novos clientes</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <code className="flex-1 rounded-lg bg-muted px-4 py-3 text-sm font-mono">{link}</code>
            <Button variant="outline" size="icon" aria-label="Copiar link" onClick={() => navigator.clipboard.writeText(link)}>
              <Copy className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Histórico de conversões</CardTitle>
        </CardHeader>
        <CardContent>
          {affiliate.conversions.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nenhuma conversão registrada ainda.
            </p>
          ) : (
            <div className="space-y-3">
              {affiliate.conversions.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                >
                  <div>
                    <p className="font-medium">{c.referredEmail ?? "Indicação"}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatEuro(c.commission)}</p>
                    <Badge variant="secondary">Comissão</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}
