"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  Plus,
  Search,
  User,
} from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { DashboardTask } from "@/lib/dashboard/queries";
import type { TaskPriority, TaskStatus } from "@prisma/client";
import { HoverSurface } from "@/components/motion/hover-surface";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ListTodo } from "lucide-react";

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; icon: typeof Circle; className: string }
> = {
  TODO: { label: "Pendente", icon: Circle, className: "text-muted-foreground" },
  IN_PROGRESS: { label: "Em progresso", icon: Clock, className: "text-amber-500" },
  DONE: { label: "Concluída", icon: CheckCircle2, className: "text-emerald-500" },
  CANCELED: { label: "Cancelada", icon: Circle, className: "text-muted-foreground/50" },
};

const PRIORITY_CONFIG: Record<TaskPriority, { label: string; className: string }> = {
  LOW: { label: "Baixa", className: "bg-slate-500/15 text-slate-400 border-slate-500/25" },
  MEDIUM: { label: "Média", className: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
  HIGH: { label: "Alta", className: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  URGENT: { label: "Urgente", className: "bg-red-500/15 text-red-400 border-red-500/25" },
};

type FilterStatus = TaskStatus | "ALL";

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: "ALL", label: "Todas" },
  { value: "TODO", label: "Pendentes" },
  { value: "IN_PROGRESS", label: "Em progresso" },
  { value: "DONE", label: "Concluídas" },
];

function formatDueDate(iso: string | null) {
  if (!iso) return "Sem prazo";
  const d = new Date(iso);
  const diff = Math.ceil((d.getTime() - Date.now()) / 86400000);
  const formatted = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  if (diff < 0) return `${formatted} · atrasada`;
  if (diff === 0) return `${formatted} · hoje`;
  if (diff === 1) return `${formatted} · amanhã`;
  return formatted;
}

export function TasksView({ initialTasks }: { initialTasks: DashboardTask[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<FilterStatus>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchFilter = filter === "ALL" || t.status === filter;
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [tasks, filter, search]);

  const counts = useMemo(
    () => ({
      todo: tasks.filter((t) => t.status === "TODO").length,
      progress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
      done: tasks.filter((t) => t.status === "DONE").length,
    }),
    [tasks]
  );

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" }
          : t
      )
    );
  }

  return (
    <PageShell className="space-y-6">
      <PageHeader
        title="Tarefas"
        description={`${counts.progress} em progresso · ${counts.done} concluídas · ${counts.todo} pendentes`}
        action={
          <Button variant="glow" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nova tarefa
          </Button>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 border-border/60 bg-muted/40 pl-9"
          />
        </div>
        <motion.div className="flex flex-wrap items-center gap-2">
          <Filter className="hidden h-4 w-4 text-muted-foreground sm:block" />
          {FILTERS.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              className={cn("h-8 text-xs", filter === f.value && "shadow-glow")}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </motion.div>
      </div>

      <motion.div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((task, i) => {
            const statusCfg = STATUS_CONFIG[task.status];
            const StatusIcon = statusCfg.icon;
            const isDone = task.status === "DONE";

            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
              >
                <HoverSurface className="group p-0">
                  <motion.div
                    className={cn(
                      "flex items-start gap-4 p-4 transition-opacity",
                      isDone && "opacity-60"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleDone(task.id)}
                      className={cn(
                        "mt-0.5 shrink-0 rounded-full transition-transform hover:scale-110 active:scale-95",
                        statusCfg.className
                      )}
                      aria-label={isDone ? "Marcar pendente" : "Marcar concluída"}
                    >
                      <StatusIcon className="h-5 w-5" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className={cn("font-medium", isDone && "line-through text-muted-foreground")}>
                          {task.title}
                        </p>
                        <Badge
                          variant="outline"
                          className={cn("border text-[10px]", PRIORITY_CONFIG[task.priority].className)}
                        >
                          {PRIORITY_CONFIG[task.priority].label}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {statusCfg.label}
                        </Badge>
                      </div>
                      {task.description && (
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDueDate(task.dueDate)}
                        </span>
                        {task.assignee && (
                          <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" />
                            {task.assignee}
                          </span>
                        )}
                      </div>
                    </div>

                    {task.assigneeInitials && (
                      <Avatar className="h-8 w-8 shrink-0 border border-border/60">
                        <AvatarFallback className="bg-primary/10 text-xs text-primary">
                          {task.assigneeInitials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                </HoverSurface>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {tasks.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="Nenhuma tarefa ainda"
            description="Seu workspace está vazio. Crie a primeira tarefa para começar a organizar o trabalho."
          />
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/60 py-12 text-center text-muted-foreground">
            Nenhuma tarefa encontrada com esse filtro.
          </div>
        ) : null}
      </motion.div>
    </PageShell>
  );
}
