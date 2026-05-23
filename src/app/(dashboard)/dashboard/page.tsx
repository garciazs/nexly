import Link from "next/link";
import { DashboardStats } from "@/components/dashboard/stats";
import { DashboardCharts } from "@/components/dashboard/charts";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { getOverviewMetrics, getRevenueChart, getOrganizationSettings } from "@/lib/dashboard/queries";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default async function Page() {
  const [metrics, revenueChart, org] = await Promise.all([
    getOverviewMetrics(),
    getRevenueChart(),
    getOrganizationSettings(),
  ]);

  const showTrialBanner = org?.status === "TRIALING";

  return (
    <PageShell className="space-y-8">
      {showTrialBanner && (
        <div className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">Trial gratuito — escolha um plano</p>
              <p className="text-sm text-muted-foreground">
                Starter €19 · Pro €49 · Business €99 — comece a monetizar com a Nexly
              </p>
            </div>
          </div>
          <Button variant="glow" asChild className="shrink-0">
            <Link href="/dashboard/billing">Ver planos</Link>
          </Button>
        </div>
      )}

      <PageHeader
        title="Visão geral"
        description="Métricas do seu workspace — apenas os seus dados."
      />
      <DashboardStats metrics={metrics} />
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCharts data={revenueChart} />
      </div>
    </PageShell>
  );
}
