"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { TrendingUp, Users, CreditCard, Activity } from "lucide-react";
import { staggerContainer, staggerItem, EASE_OUT } from "@/lib/motion";
import { HoverSurface } from "@/components/motion/hover-surface";
import { DASHBOARD_METRICS } from "@/lib/dashboard/metrics";

const stats = [
  { title: DASHBOARD_METRICS.revenue.label, value: DASHBOARD_METRICS.revenue.value, icon: CreditCard, change: `+${DASHBOARD_METRICS.revenue.change}%`, positive: true },
  { title: DASHBOARD_METRICS.activeUsers.label, value: DASHBOARD_METRICS.activeUsers.value, icon: Users, change: `+${DASHBOARD_METRICS.activeUsers.change}%`, positive: true },
  { title: DASHBOARD_METRICS.conversions.label, value: DASHBOARD_METRICS.conversions.value, icon: TrendingUp, change: `+${DASHBOARD_METRICS.conversions.change}%`, positive: true },
  { title: DASHBOARD_METRICS.uptime.label, value: DASHBOARD_METRICS.uptime.value, icon: Activity, change: `${DASHBOARD_METRICS.uptime.value}%`, suffix: "%", positive: true },
];

export function DashboardStats() {
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
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {s.change}
                </p>
              </CardContent>
            </Card>
          </HoverSurface>
        </motion.div>
      ))}
    </motion.div>
  );
}
