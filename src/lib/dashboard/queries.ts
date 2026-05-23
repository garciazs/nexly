import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { TaskPriority, TaskStatus } from "@prisma/client";

export type DashboardTask = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  assignee: string | null;
  assigneeInitials: string | null;
};

const STATUS_ORDER: Record<TaskStatus, number> = {
  IN_PROGRESS: 0,
  TODO: 1,
  DONE: 2,
  CANCELED: 3,
};

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

function initials(name: string | null | undefined) {
  if (!name) return null;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function getDashboardTasks(): Promise<DashboardTask[]> {
  const session = await auth();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      ownedOrgs: { include: { tasks: { include: { assignee: true } } } },
      memberships: {
        include: { organization: { include: { tasks: { include: { assignee: true } } } } },
      },
    },
  });

  if (!user) return [];

  const org =
    user.ownedOrgs[0] ??
    user.memberships[0]?.organization;

  if (!org) return [];

  return org.tasks
    .map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status,
      priority: t.priority,
      dueDate: t.dueDate?.toISOString() ?? null,
      assignee: t.assignee?.name ?? null,
      assigneeInitials: initials(t.assignee?.name),
    }))
    .sort((a, b) => {
      const s = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      if (s !== 0) return s;
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    });
}

/** Tarefas extras para demo rica quando o seed tem poucos registros */
export const DEMO_TASKS: DashboardTask[] = [
  {
    id: "demo-1",
    title: "Configurar domínio customizado",
    description: "Apontar DNS para app.nexly.app",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    assignee: "Rafael Mendes",
    assigneeInitials: "RM",
  },
  {
    id: "demo-2",
    title: "Revisar métricas de churn",
    description: "Analisar cohort de abril e maio",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: new Date(Date.now() + 1 * 86400000).toISOString(),
    assignee: "Lucas Ferreira",
    assigneeInitials: "LF",
  },
  {
    id: "demo-3",
    title: "Onboarding ACME Corp",
    description: "Setup workspace Enterprise",
    status: "IN_PROGRESS",
    priority: "URGENT",
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    assignee: "Sofia Almeida",
    assigneeInitials: "SA",
  },
  {
    id: "demo-4",
    title: "Atualizar documentação API",
    description: "Endpoints v2 e exemplos curl",
    status: "TODO",
    priority: "LOW",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    assignee: "Rafael Mendes",
    assigneeInitials: "RM",
  },
  {
    id: "demo-5",
    title: "Campanha e-mail afiliados",
    description: "Segmento Pro+ com 20% comissão",
    status: "DONE",
    priority: "MEDIUM",
    dueDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    assignee: "Mariana Silva",
    assigneeInitials: "MS",
  },
  {
    id: "demo-6",
    title: "Auditoria de segurança",
    description: "Revisão OWASP e rotação de keys",
    status: "TODO",
    priority: "HIGH",
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    assignee: "Ana Costa",
    assigneeInitials: "AC",
  },
];

export function mergeTasks(dbTasks: DashboardTask[]): DashboardTask[] {
  const ids = new Set(dbTasks.map((t) => t.title.toLowerCase()));
  const extras = DEMO_TASKS.filter((t) => !ids.has(t.title.toLowerCase()));
  return [...dbTasks, ...extras];
}
