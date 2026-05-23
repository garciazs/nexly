import type { Plan } from "@prisma/client";

export const APP_NAME = "Nexly";
export const CURRENCY = "EUR";
export const LOCALE = "pt-BR";

export const PLANS = {
  STARTER: {
    id: "starter" as const,
    name: "Starter",
    price: 1900,
    priceLabel: "€19",
    interval: "mês",
    description: "Ideal para freelancers e pequenos projetos.",
    features: ["Até 3 usuários", "5 GB de armazenamento", "Suporte por e-mail", "Dashboard básico"],
    stripePriceId: process.env.STRIPE_PRICE_STARTER,
  },
  PRO: {
    id: "pro" as const,
    name: "Pro",
    price: 4900,
    priceLabel: "€49",
    interval: "mês",
    description: "Para equipes em crescimento com programa de afiliados.",
    features: ["Até 15 usuários", "50 GB", "Afiliados 20%", "Analytics avançado", "Integrações"],
    stripePriceId: process.env.STRIPE_PRICE_PRO,
    affiliate: true,
  },
  BUSINESS: {
    id: "business" as const,
    name: "Business",
    price: 9900,
    priceLabel: "€99",
    interval: "mês",
    description: "Escala com API, SSO e prioridade no suporte.",
    features: ["Usuários ilimitados", "500 GB", "API completa", "SSO", "SLA 99.9%"],
    stripePriceId: process.env.STRIPE_PRICE_BUSINESS,
  },
  ENTERPRISE: {
    id: "enterprise" as const,
    name: "Enterprise",
    price: 0,
    priceLabel: "Sob consulta",
    interval: "",
    description: "Solução customizada para grandes organizações.",
    features: ["Infra dedicada", "Contrato personalizado", "CSM dedicado", "Auditoria"],
    custom: true,
  },
} as const;

export const PLAN_ORDER: Plan[] = ["STARTER", "PRO", "BUSINESS", "ENTERPRISE"];

export const AFFILIATE_COMMISSION = 0.2;
