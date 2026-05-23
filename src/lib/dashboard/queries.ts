import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";
import { formatMonthLabel } from "@/lib/dashboard/metrics";
import type { Plan, SubscriptionStatus, TaskPriority, TaskStatus } from "@prisma/client";

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

export type OverviewMetrics = {
  taskCount: number;
  completedTasks: number;
  teamMembers: number;
  revenueCents: number;
  openTasks: number;
};

export type RevenueChartPoint = { name: string; value: number };

export type TeamMemberRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
};

export type CalendarEventRow = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "task";
};

export type ApiKeyRow = {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
};

export type ChatMessageRow = {
  id: string;
  content: string;
  userName: string;
  userInitials: string;
  time: string;
  self: boolean;
};

export type BillingData = {
  plan: Plan;
  status: SubscriptionStatus;
  payments: { id: string; amount: number; currency: string; status: string; createdAt: string }[];
};

export type AffiliateData = {
  code: string | null;
  status: string | null;
  totalEarnings: number;
  conversions: { id: string; referredEmail: string | null; amount: number; commission: number; createdAt: string }[];
};

export type OrganizationSettings = {
  name: string;
  slug: string;
  plan: Plan;
  status: SubscriptionStatus;
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
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function getDashboardTasks(): Promise<DashboardTask[]> {
  const { organizationId } = await requireTenant();

  const tasks = await prisma.task.findMany({
    where: { organizationId },
    include: { assignee: true },
    orderBy: { updatedAt: "desc" },
  });

  return tasks
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

export async function getOverviewMetrics(): Promise<OverviewMetrics> {
  const { organizationId } = await requireTenant();

  const [taskCount, completedTasks, teamMembers, payments] = await Promise.all([
    prisma.task.count({ where: { organizationId } }),
    prisma.task.count({ where: { organizationId, status: "DONE" } }),
    prisma.organizationMember.count({ where: { organizationId } }),
    prisma.payment.findMany({
      where: { subscription: { organizationId }, status: "succeeded" },
      select: { amount: true },
    }),
  ]);

  const revenueCents = payments.reduce((sum, p) => sum + p.amount, 0);

  return {
    taskCount,
    completedTasks,
    teamMembers,
    revenueCents,
    openTasks: taskCount - completedTasks,
  };
}

export async function getRevenueChart(): Promise<RevenueChartPoint[]> {
  const { organizationId } = await requireTenant();

  const payments = await prisma.payment.findMany({
    where: { subscription: { organizationId }, status: "succeeded" },
    select: { amount: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  if (payments.length === 0) return [];

  const byMonth = new Map<string, number>();
  for (const p of payments) {
    const key = `${p.createdAt.getFullYear()}-${p.createdAt.getMonth()}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + p.amount);
  }

  return Array.from(byMonth.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([key, cents]) => {
      const [year, month] = key.split("-").map(Number);
      return {
        name: formatMonthLabel(new Date(year, month, 1)),
        value: Math.round(cents / 100),
      };
    });
}

export async function getTeamMembers(): Promise<TeamMemberRow[]> {
  const { organizationId } = await requireTenant();

  const members = await prisma.organizationMember.findMany({
    where: { organizationId },
    include: { user: true },
    orderBy: { user: { name: "asc" } },
  });

  return members.map((m) => ({
    id: m.user.id,
    name: m.user.name ?? m.user.email,
    email: m.user.email,
    role: m.role,
    initials: initials(m.user.name ?? m.user.email),
  }));
}

export async function getCalendarEvents(): Promise<CalendarEventRow[]> {
  const { organizationId } = await requireTenant();

  const tasks = await prisma.task.findMany({
    where: { organizationId, dueDate: { not: null } },
    orderBy: { dueDate: "asc" },
    take: 50,
  });

  return tasks.map((t) => {
    const d = t.dueDate!;
    return {
      id: t.id,
      title: t.title,
      date: d.toISOString().split("T")[0],
      time: d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      type: "task" as const,
    };
  });
}

export async function getOrgApiKeys(): Promise<ApiKeyRow[]> {
  const { organizationId } = await requireTenant();

  const keys = await prisma.apiKey.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });

  return keys.map((k) => ({
    id: k.id,
    name: k.name,
    prefix: k.prefix,
    createdAt: k.createdAt.toISOString(),
    lastUsedAt: k.lastUsedAt?.toISOString() ?? null,
  }));
}

export async function getOrgChatMessages(userId: string): Promise<ChatMessageRow[]> {
  const { organizationId } = await requireTenant();

  const messages = await prisma.chatMessage.findMany({
    where: { organizationId },
    include: { user: true },
    orderBy: { createdAt: "asc" },
    take: 100,
  });

  return messages.map((m) => ({
    id: m.id,
    content: m.content,
    userName: m.user.name ?? m.user.email,
    userInitials: initials(m.user.name ?? m.user.email),
    time: m.createdAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    self: m.userId === userId,
  }));
}

export async function getBillingData(): Promise<BillingData | null> {
  const { organizationId } = await requireTenant();

  const sub = await prisma.subscription.findUnique({
    where: { organizationId },
    include: {
      payments: { orderBy: { createdAt: "desc" }, take: 12 },
    },
  });

  if (!sub) return null;

  return {
    plan: sub.plan,
    status: sub.status,
    payments: sub.payments.map((p) => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
    })),
  };
}

export async function getAffiliateData(userId: string): Promise<AffiliateData> {
  const affiliate = await prisma.affiliate.findUnique({
    where: { userId },
    include: {
      conversions: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

  if (!affiliate) {
    return { code: null, status: null, totalEarnings: 0, conversions: [] };
  }

  return {
    code: affiliate.code,
    status: affiliate.status,
    totalEarnings: affiliate.totalEarnings,
    conversions: affiliate.conversions.map((c) => ({
      id: c.id,
      referredEmail: c.referredEmail,
      amount: c.amount,
      commission: c.commission,
      createdAt: c.createdAt.toISOString(),
    })),
  };
}

export async function getOrganizationSettings(): Promise<OrganizationSettings | null> {
  const { organizationId } = await requireTenant();

  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: { subscription: true },
  });

  if (!org) return null;

  return {
    name: org.name,
    slug: org.slug,
    plan: org.subscription?.plan ?? "STARTER",
    status: org.subscription?.status ?? "TRIALING",
  };
}

/** Analytics derivados apenas dos dados reais da organização. */
export async function getAnalyticsData() {
  const metrics = await getOverviewMetrics();
  const revenueChart = await getRevenueChart();

  return {
    metrics,
    revenueChart,
    sources: [] as { name: string; value: number; color: string }[],
    funnel: [
      { stage: "Tarefas abertas", value: metrics.openTasks },
      { stage: "Tarefas concluídas", value: metrics.completedTasks },
      { stage: "Membros", value: metrics.teamMembers },
    ],
  };
}
