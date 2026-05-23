import { DashboardStats } from "@/components/dashboard/stats";
import { DashboardCharts } from "@/components/dashboard/charts";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";

export default function Page() {
  return (
    <PageShell className="space-y-8">
      <PageHeader
        title="Visão geral"
        description="Métricas e desempenho da sua operação em tempo real."
      />
      <DashboardStats />
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCharts />
      </div>
    </PageShell>
  );
}
