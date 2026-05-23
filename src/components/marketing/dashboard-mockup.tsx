"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { cn } from "@/lib/utils";

const bars = [42, 68, 48, 82, 58, 92, 74, 98, 86, 72];
const sparkline = [28, 42, 38, 55, 48, 62, 58, 71, 68, 82, 78, 94];
const insights = [
  "Conversão +23% na última semana",
  "3 tarefas críticas para hoje",
  "Afiliado top: +€1.240",
];
const notifications = [
  "Pagamento confirmado · €49",
  "Novo afiliado aprovado",
  "+12 usuários ativos",
];

function MockupCard({
  children,
  className,
  glow = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, delay, ease: "easeInOut" }}
      whileHover={{ y: -2, scale: 1.005 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-500",
        "hover:border-white/[0.14] hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.35),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        glow && "border-violet-500/25 bg-violet-500/[0.06]",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.08), transparent 40%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.2), transparent 40%, rgba(34,211,238,0.1))",
        }}
      />
      <motion.div className="relative">{children}</motion.div>
    </motion.div>
  );
}

function LiveBars() {
  const [heights, setHeights] = useState(bars);

  useEffect(() => {
    const id = setInterval(() => {
      setHeights((prev) =>
        prev.map((h) => Math.min(100, Math.max(28, h + (Math.random() - 0.5) * 14)))
      );
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="flex h-36 items-end gap-2 sm:h-40 md:h-44 lg:h-48"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
      }}
    >
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="relative flex-1 overflow-hidden rounded-t-md bg-gradient-to-t from-violet-700 via-violet-500 to-violet-300/80 shadow-[0_0_20px_-4px_rgba(139,92,246,0.5)]"
          variants={{
            hidden: { height: 0, opacity: 0 },
            visible: { height: `${h}%`, opacity: 1 },
          }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
        </motion.div>
      ))}
    </motion.div>
  );
}

function SparklineChart() {
  const w = 280;
  const h = 64;
  const max = Math.max(...sparkline);
  const min = Math.min(...sparkline);
  const range = max - min || 1;

  const points = sparkline
    .map((v, i) => {
      const x = (i / (sparkline.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M0,${h} L${points.replace(/ /g, " L")} L${w},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full sm:h-[4.5rem]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#spark-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="rgb(34,211,238)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function ActivityDot({ color = "emerald" }: { color?: "emerald" | "violet" }) {
  const bg = color === "emerald" ? "bg-emerald-400" : "bg-violet-400";
  return (
    <span className="relative flex h-2 w-2">
      <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", bg)} />
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", bg)} />
    </span>
  );
}

function MetricPill({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <motion.div
      className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
      whileHover={{ borderColor: "rgba(255,255,255,0.12)" }}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <motion.div
        className="flex items-center gap-1.5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-sm font-semibold tabular-nums">{value}</span>
        <span className="text-[10px] font-medium text-emerald-400">{trend}</span>
      </motion.div>
    </motion.div>
  );
}

export function DashboardMockup({ entranceDelay = 0.5 }: { entranceDelay?: number }) {
  const [notifIndex, setNotifIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const n = setInterval(() => setNotifIndex((i) => (i + 1) % notifications.length), 3500);
    const ins = setInterval(() => setInsightIndex((i) => (i + 1) % insights.length), 4000);
    return () => {
      clearInterval(n);
      clearInterval(ins);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 90, rotateX: 10, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 1.05, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto mt-10 w-[min(92vw,1400px)] perspective-1000 sm:mt-12 md:mt-14 lg:mt-16"
    >
      {/* Ambient glow layers */}
      <motion.div
        className="absolute -inset-8 rounded-[2rem] bg-gradient-to-r from-violet-600/35 via-indigo-500/25 to-cyan-500/25 blur-[80px] sm:-inset-12 sm:blur-[100px]"
        animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-violet-500/10 to-transparent blur-2xl"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Main frame */}
      <div className="relative overflow-hidden rounded-[1.25rem] border border-white/[0.12] bg-zinc-950/85 p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_80px_-20px_rgba(139,92,246,0.45),0_40px_80px_-40px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:rounded-[1.5rem] sm:p-2">
        <motion.div
          className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.04]"
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="pointer-events-none absolute inset-0 animated-grid opacity-20" />

        {/* Title bar */}
        <motion.div
          className="relative flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3.5 sm:px-6 sm:py-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: entranceDelay + 0.2, duration: 0.5 }}
        >
          <motion.div className="flex gap-2" animate={{ y: [0, -1, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <span className="h-3 w-3 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
            <span className="h-3 w-3 rounded-full bg-green-500/90 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          </motion.div>
          <motion.div className="mx-auto flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5">
            <ActivityDot />
            <span className="text-xs font-medium text-muted-foreground sm:text-sm">
              app.nexly.app · ao vivo
            </span>
          </motion.div>
          <motion.div
            className="hidden items-center gap-1.5 text-xs text-emerald-400 sm:flex"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-3.5 w-3.5" />
            <span className="font-medium">Sync</span>
          </motion.div>
        </motion.div>

        {/* Dashboard grid */}
        <motion.div
          className="relative grid min-h-[420px] gap-4 p-4 sm:min-h-[460px] sm:gap-5 sm:p-6 md:min-h-[500px] md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-5 lg:min-h-[540px] lg:gap-6 lg:p-7"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: entranceDelay + 0.25 } },
          }}
        >
          {/* Main revenue chart */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-7 md:row-span-2">
            <MockupCard delay={0} className="flex h-full flex-col">
              <motion.div
                className="mb-4 flex items-center justify-between sm:mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: entranceDelay + 0.4 }}
              >
                <motion.div>
                  <p className="text-sm font-medium text-foreground sm:text-base">Receita (EUR)</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Últimos 30 dias</p>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5"
                  animate={{ boxShadow: ["0 0 0 rgba(52,211,153,0)", "0 0 20px rgba(52,211,153,0.2)", "0 0 0 rgba(52,211,153,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">+18%</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400/70" />
                </motion.div>
              </motion.div>
              <div className="flex flex-1 flex-col justify-end">
                <LiveBars />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.05] pt-4">
                <MetricPill label="MRR" value="€48,2k" trend="+12%" />
                <MetricPill label="Churn" value="1,2%" trend="-0,3%" />
                <MetricPill label="LTV" value="€890" trend="+8%" />
              </div>
            </MockupCard>
          </motion.div>

          {/* Users stat */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-2">
            <MockupCard delay={0.3} className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <Users className="h-6 w-6 text-violet-400 sm:h-7 sm:w-7" />
                <ActivityDot color="violet" />
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                  <AnimatedCounter value={2847} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Usuários ativos</p>
              </div>
              <motion.div
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </MockupCard>
          </motion.div>

          {/* Revenue stat */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-3">
            <MockupCard delay={0.5} className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <BarChart3 className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" />
                <motion.span
                  className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Live
                </motion.span>
              </div>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <p className="text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                  €<AnimatedCounter value={48} />
                  <span className="text-xl text-muted-foreground sm:text-2xl">,2k</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Receita este mês</p>
              </motion.div>
              <SparklineChart />
            </MockupCard>
          </motion.div>

          {/* Insights */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-5">
            <MockupCard delay={0.7} glow className="h-full">
              <div className="mb-4 flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <span className="text-sm font-semibold sm:text-base">Insights IA</span>
                <ActivityDot />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={insightIndex}
                  initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 12, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3.5"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-sm text-muted-foreground sm:text-base">{insights[insightIndex]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex gap-2">
                {insights.map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      i === insightIndex ? "bg-violet-500" : "bg-white/[0.08]"
                    )}
                    animate={i === insightIndex ? { opacity: [0.6, 1, 0.6] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ))}
              </div>
            </MockupCard>
          </motion.div>

          {/* Notifications */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-3">
            <MockupCard delay={0.9} className="flex h-full flex-col items-center justify-center text-center">
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bell className="mb-3 h-7 w-7 text-violet-400 sm:h-8 sm:w-8" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={notifIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm font-medium text-muted-foreground sm:text-base"
                >
                  {notifications[notifIndex]}
                </motion.p>
              </AnimatePresence>
              <motion.div
                className="mt-4 flex gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {notifications.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      i === notifIndex ? "bg-violet-400" : "bg-white/20"
                    )}
                  />
                ))}
              </motion.div>
            </MockupCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Floor reflection */}
      <motion.div
        className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[80%] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], scaleX: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
}
