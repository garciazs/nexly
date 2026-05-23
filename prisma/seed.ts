import { PrismaClient, Plan, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("senha123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@nexly.app" },
    update: { password, emailVerified: new Date() },
    create: {
      email: "admin@nexly.app",
      name: "Admin Nexly",
      password,
      role: Role.SUPER_ADMIN,
      emailVerified: new Date(),
    },
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@nexly.app" },
    update: { password, emailVerified: new Date() },
    create: {
      email: "demo@nexly.app",
      name: "Usuário Demo",
      password,
      role: Role.USER,
      emailVerified: new Date(),
    },
  });

  const org = await prisma.organization.upsert({
    where: { slug: "nexly-demo" },
    update: {},
    create: {
      name: "Nexly Demo",
      slug: "nexly-demo",
      ownerId: demo.id,
      members: { create: { userId: demo.id, role: "owner" } },
      subscription: {
        create: {
          plan: Plan.PRO,
          status: "ACTIVE",
          stripeCustomerId: "cus_demo",
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
  });

  const featureFlags = [
    { key: "affiliates", name: "Programa de Afiliados", enabled: true, planMin: Plan.PRO },
    { key: "api_access", name: "Acesso à API", enabled: true, planMin: Plan.BUSINESS },
    { key: "ai_assistant", name: "Assistente IA", enabled: true, planMin: Plan.PRO },
  ] as const;
  for (const flag of featureFlags) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: { name: flag.name, enabled: flag.enabled, planMin: flag.planMin },
      create: flag,
    });
  }

  const taskCount = await prisma.task.count({ where: { organizationId: org.id } });
  if (taskCount === 0) {
    await prisma.task.createMany({
      data: [
        { title: "Configurar integração Stripe", organizationId: org.id, assigneeId: demo.id, status: "IN_PROGRESS", priority: "HIGH", dueDate: new Date(Date.now() + 2 * 86400000) },
        { title: "Convidar equipe", organizationId: org.id, assigneeId: demo.id, status: "TODO", priority: "MEDIUM", dueDate: new Date(Date.now() + 5 * 86400000) },
        { title: "Revisar analytics", organizationId: org.id, status: "TODO", priority: "LOW", dueDate: new Date(Date.now() + 7 * 86400000) },
        { title: "Onboarding ACME Corp", organizationId: org.id, assigneeId: demo.id, status: "IN_PROGRESS", priority: "URGENT", dueDate: new Date(Date.now() + 1 * 86400000) },
        { title: "Campanha e-mail afiliados", organizationId: org.id, status: "DONE", priority: "MEDIUM", dueDate: new Date(Date.now() - 2 * 86400000) },
      ],
    });
  }

  const chatCount = await prisma.chatMessage.count({ where: { userId: demo.id } });
  if (chatCount === 0) {
    await prisma.chatMessage.createMany({
      data: [
        { userId: demo.id, content: "MRR bateu €48k este mês!", roomId: "general" },
      ],
    });
  }

  await prisma.affiliate.upsert({
    where: { userId: demo.id },
    update: {},
    create: { userId: demo.id, code: "NEXLY20", status: "ACTIVE", commission: 0.2 },
  });

  console.log("Seed concluído:", { admin: admin.email, demo: demo.email });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
