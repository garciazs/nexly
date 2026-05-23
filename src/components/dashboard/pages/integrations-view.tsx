"use client";

import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Plug } from "lucide-react";

export function IntegrationsView() {
  return (
    <PageShell>
      <PageHeader
        title="Integrações"
        description="Conecte ferramentas ao seu workspace"
      />
      <EmptyState
        icon={Plug}
        title="Nenhuma integração configurada"
        description="Quando você conectar Stripe, Slack ou outras ferramentas, elas aparecerão aqui — isoladas por workspace."
      />
    </PageShell>
  );
}
