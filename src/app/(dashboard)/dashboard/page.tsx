import { DashboardStats } from "@/components/dashboard/stats";
import { DashboardCharts } from "@/components/dashboard/charts";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { getOverviewMetrics, getRevenueChart } from "@/lib/dashboard/queries";

export default async function Page() {
  const [metrics, revenueChart] = await Promise.all([
    getOverviewMetrics(),
    getRevenueChart(),
  ]);

  return (
    <PageShell className="space-y-8">
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
