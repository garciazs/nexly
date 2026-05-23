"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, CreditCard, ListTodo, Users } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { HoverSurface } from "@/components/motion/hover-surface";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatEuro } from "@/lib/dashboard/metrics";
import { EASE_OUT, staggerContainer, staggerItem } from "@/lib/motion";
import type { getAnalyticsData } from "@/lib/dashboard/queries";

type AnalyticsViewProps = {
  data: Awaited<ReturnType<typeof getAnalyticsData>>;
};

export function AnalyticsView({ data }: AnalyticsViewProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { metrics, revenueChart, funnel } = data;
  const hasData = metrics.taskCount > 0 || metrics.revenueCents > 0;

  const kpis = [
    { label: "Receita", value: metrics.revenueCents, icon: CreditCard, format: "euro" as const },
    { label: "Membros", value: metrics.teamMembers, icon: Users },
    { label: "Tarefas", value: metrics.taskCount, icon: ListTodo },
    { label: "Abertas", value: metrics.openTasks, icon: Activity },
  ];

  return (
    <PageShell className="space-y-8">
      <PageHeader
        title="Analytics"
        description="Métricas reais do seu workspace"
      />

      {!hasData ? (
        <EmptyState
          icon={Activity}
          title="Sem dados para analisar"
          description="Crie tarefas, convide membros ou registre pagamentos para ver analytics aqui."
        />
      ) : (
        <>
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {kpis.map((k, i) => (
              <motion.div key={k.label} variants={staggerItem} transition={{ delay: i * 0.05, ease: EASE_OUT }}>
                <HoverSurface className="p-0">
                  <Card className="border-0 bg-transparent shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <k.icon className="h-4 w-4" />
                        {k.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold tabular-nums">
                        {k.format === "euro" ? (
                          formatEuro(k.value)
                        ) : (
                          <AnimatedCounter value={k.value} />
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </HoverSurface>
              </motion.div>
            ))}
          </motion.div>

          {revenueChart.length > 0 && (
            <Card className="surface-card">
              <CardHeader>
                <CardTitle>Receita</CardTitle>
              </CardHeader>
              <CardContent className="h-[280px]">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          )}

          {funnel.length > 0 && (
            <Card className="surface-card">
              <CardHeader>
                <CardTitle>Resumo operacional</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px]">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnel} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis dataKey="stage" type="category" width={120} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </PageShell>
  );
}
