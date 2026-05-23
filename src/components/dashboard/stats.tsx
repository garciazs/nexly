"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { TrendingUp, Users, CreditCard, ListTodo } from "lucide-react";
import { staggerContainer, staggerItem, EASE_OUT } from "@/lib/motion";
import { HoverSurface } from "@/components/motion/hover-surface";
import type { OverviewMetrics } from "@/lib/dashboard/queries";
import { formatEuro } from "@/lib/dashboard/metrics";

type DashboardStatsProps = {
  metrics: OverviewMetrics;
};

export function DashboardStats({ metrics }: DashboardStatsProps) {
  const stats = [
    {
      title: "Receita",
      value: Math.round(metrics.revenueCents / 100),
      icon: CreditCard,
      change: metrics.revenueCents > 0 ? "Dados reais" : "Sem pagamentos",
      prefix: "€",
      positive: metrics.revenueCents > 0,
    },
    {
      title: "Membros",
      value: metrics.teamMembers,
      icon: Users,
      change: metrics.teamMembers === 1 ? "Só você" : `${metrics.teamMembers} na equipe`,
      positive: true,
    },
    {
      title: "Tarefas abertas",
      value: metrics.openTasks,
      icon: ListTodo,
      change: `${metrics.completedTasks} concluídas`,
      positive: metrics.openTasks === 0,
    },
    {
      title: "Total de tarefas",
      value: metrics.taskCount,
      icon: TrendingUp,
      change: metrics.taskCount === 0 ? "Crie a primeira" : "No workspace",
      positive: metrics.taskCount > 0,
    },
  ];

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {stats.map((s, i) => (
        <motion.div key={s.title} variants={staggerItem} transition={{ delay: i * 0.05, ease: EASE_OUT }}>
          <HoverSurface className="h-full p-0">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tabular-nums tracking-tight">
                  {s.title === "Receita" ? (
                    formatEuro(metrics.revenueCents)
                  ) : (
                    <AnimatedCounter value={s.value} />
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.change}</p>
              </CardContent>
            </Card>
          </HoverSurface>
        </motion.div>
      ))}
    </motion.div>
  );
}
