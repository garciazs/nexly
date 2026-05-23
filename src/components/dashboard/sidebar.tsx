"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { useUIStore } from "@/stores/ui-store";
import {
  LayoutDashboard,
  BarChart3,
  CheckSquare,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  CreditCard,
  Plug,
  Key,
  Share2,
} from "lucide-react";
import { springSnappy } from "@/lib/motion";

const links = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Visão geral" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "Tarefas" },
  { href: "/dashboard/calendar", icon: Calendar, label: "Calendário" },
  { href: "/dashboard/team", icon: Users, label: "Equipe" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Planos" },
  { href: "/dashboard/chat", icon: MessageSquare, label: "Chat" },
  { href: "/dashboard/integrations", icon: Plug, label: "Integrações" },
  { href: "/dashboard/api-keys", icon: Key, label: "API Keys" },
  { href: "/dashboard/affiliates", icon: Share2, label: "Afiliados" },
  { href: "/dashboard/settings", icon: Settings, label: "Configurações" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();
  if (!sidebarOpen) return null;

  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] flex-col border-r border-border/60 bg-card/50 backdrop-blur-xl lg:flex">
      <div className="border-b border-border/60 p-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {links.map((l) => {
          const active =
            pathname === l.href ||
            (l.href !== "/dashboard" && pathname.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg border border-primary/20 bg-primary/10"
                  transition={springSnappy}
                />
              )}
              <l.icon className={cn("relative h-4 w-4 shrink-0", active && "text-primary")} />
              <span className="relative">{l.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border/60 p-4">
        <p className="text-xs text-muted-foreground">Nexly · Painel</p>
      </div>
    </aside>
  );
}
