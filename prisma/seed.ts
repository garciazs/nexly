import { PrismaClient, Plan } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

  console.log("Seed concluído: apenas feature flags globais (sem dados de tenant).");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
