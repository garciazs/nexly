"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, ExternalLink } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HoverSurface } from "@/components/motion/hover-surface";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const INVOICES = [
  { id: "INV-2026-05", date: "01 Mai 2026", amount: "€49,00", status: "Pago" },
  { id: "INV-2026-04", date: "01 Abr 2026", amount: "€49,00", status: "Pago" },
  { id: "INV-2026-03", date: "01 Mar 2026", amount: "€49,00", status: "Pago" },
];

const USAGE = [
  { label: "Membros da equipe", used: 6, limit: 10 },
  { label: "Chaves API", used: 3, limit: 10 },
  { label: "Armazenamento", used: 42, limit: 100 },
];

export function BillingView() {
  return (
    <PageShell>
      <PageHeader
        title="Cobrança"
        description="Plano, uso e histórico de faturas"
        action={
          <Button variant="glow" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Gerenciar no Stripe
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HoverSurface className="p-0">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>Plano Pro</CardTitle>
                    <CardDescription>Cobrança mensal em euros</CardDescription>
                  </div>
                  <Badge variant="success">Ativo</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight">
                  €49<span className="text-lg font-normal text-muted-foreground">/mês</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Próxima cobrança em 12 Jun 2026 · inclui analytics, integrações e API ilimitada
                </p>
              </CardContent>
            </Card>
          </HoverSurface>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="surface-card border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-4 w-4" />
                Método de pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="font-medium">Visa ···· 4242</p>
                <p className="text-xs text-muted-foreground">Expira 08/2028</p>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Atualizar cartão
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="surface-card border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Uso do plano</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {USAGE.map((item) => {
            const pct = Math.round((item.used / item.limit) * 100);
            return (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    <AnimatedCounter value={item.used} />
                    {" / "}
                    {item.limit}
                  </span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="surface-card overflow-hidden border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Histórico de faturas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Fatura</th>
                  <th className="px-6 py-3 font-medium">Data</th>
                  <th className="px-6 py-3 font-medium">Valor</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr key={inv.id} className="border-b border-border/40 last:border-0">
                    <td className="px-6 py-4 font-medium">{inv.id}</td>
                    <td className="px-6 py-4 text-muted-foreground">{inv.date}</td>
                    <td className="px-6 py-4">{inv.amount}</td>
                    <td className="px-6 py-4">
                      <Badge variant="success" className="text-[10px]">
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
