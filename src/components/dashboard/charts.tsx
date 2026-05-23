"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FadeUp } from "@/components/motion/fade-up";
import { EASE_OUT } from "@/lib/motion";
import { EmptyState } from "@/components/dashboard/empty-state";
import { BarChart3 } from "lucide-react";
import type { RevenueChartPoint } from "@/lib/dashboard/queries";

type DashboardChartsProps = {
  data: RevenueChartPoint[];
};

export function DashboardCharts({ data }: DashboardChartsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (data.length === 0) {
    return (
      <FadeUp className="col-span-full lg:col-span-2">
        <EmptyState
          icon={BarChart3}
          title="Sem receita registrada"
          description="Quando houver pagamentos no seu workspace, o gráfico aparecerá aqui."
        />
      </FadeUp>
    );
  }

  return (
    <FadeUp className="col-span-full lg:col-span-2">
      <Card className="surface-card-interactive overflow-hidden">
        <CardHeader>
          <CardTitle>Receita mensal (€)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {mounted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#chartGradient)"
                    animationDuration={1200}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <div className="h-full w-full shimmer rounded-lg" />
          )}
        </CardContent>
      </Card>
    </FadeUp>
  );
}
