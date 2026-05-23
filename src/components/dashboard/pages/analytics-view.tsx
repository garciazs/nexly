"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, CreditCard, TrendingDown, TrendingUp, Users } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { HoverSurface } from "@/components/motion/hover-surface";
import {
  ANALYTICS_FUNNEL,
  ANALYTICS_SOURCES,
  DASHBOARD_METRICS,
  REVENUE_CHART,
} from "@/lib/dashboard/metrics";
import { EASE_OUT, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

const KPI_ITEMS = [
  { key: "revenue" as const, icon: CreditCard },
  { key: "activeUsers" as const, icon: Users },
  { key: "conversions" as const, icon: TrendingUp },
  { key: "uptime" as const, icon: Activity },
];

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export function AnalyticsView() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <PageShell>
      <PageHeader
        title="Analytics"
        description="Métricas de receita, funil e origens de tráfego"
      />

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {KPI_ITEMS.map((item, i) => {
          const metric = DASHBOARD_METRICS[item.key];
          const positive = metric.change >= 0;
          const Icon = item.icon;
          const suffix = item.key === "uptime" ? "%" : "";

          return (
            <motion.div
              key={item.key}
              variants={staggerItem}
              transition={{ delay: i * 0.05, ease: EASE_OUT }}
            >
              <HoverSurface className="h-full p-0">
                <Card className="border-0 bg-transparent shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </CardTitle>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold tabular-nums tracking-tight">
                      <AnimatedCounter value={metric.value} suffix={suffix} />
                    </div>
                    <p
                      className={cn(
                        "mt-1 flex items-center gap-1 text-xs",
                        positive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                      )}
                    >
                      {positive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {positive ? "+" : ""}
                      {metric.change}%
                    </p>
                  </CardContent>
                </Card>
              </HoverSurface>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="surface-card col-span-full border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle>Receita mensal (€)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {mounted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_CHART}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--chart-grid))"
                      vertical={false}
                    />
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
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            ) : (
              <div className="h-full w-full shimmer rounded-lg" />
            )}
          </CardContent>
        </Card>

        <Card className="surface-card border-border/60">
          <CardHeader>
            <CardTitle>Funil de conversão</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ANALYTICS_FUNNEL} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--chart-grid))"
                    horizontal={false}
                  />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="stage"
                    axisLine={false}
                    tickLine={false}
                    width={80}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full shimmer rounded-lg" />
            )}
          </CardContent>
        </Card>

        <Card className="surface-card border-border/60">
          <CardHeader>
            <CardTitle>Origens de tráfego</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            {mounted ? (
              <div className="flex h-full items-center gap-4">
                <ResponsiveContainer width="55%" height="100%">
                  <PieChart>
                    <Pie
                      data={ANALYTICS_SOURCES}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      animationDuration={800}
                    >
                      {ANALYTICS_SOURCES.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-1 flex-col gap-2">
                  {ANALYTICS_SOURCES.map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: s.color }}
                        />
                        {s.name}
                      </span>
                      <span className="font-medium tabular-nums">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full w-full shimmer rounded-lg" />
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
