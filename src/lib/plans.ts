import type { Plan } from "@prisma/client";
import { PLANS, PLAN_ORDER } from "@/lib/constants";

export type PlanId = "starter" | "pro" | "business" | "enterprise";

const PLAN_ID_MAP: Record<PlanId, Plan> = {
  starter: "STARTER",
  pro: "PRO",
  business: "BUSINESS",
  enterprise: "ENTERPRISE",
};

const ENUM_TO_ID: Record<Plan, PlanId> = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
  ENTERPRISE: "enterprise",
};

export function planIdToEnum(id: string): Plan | null {
  return PLAN_ID_MAP[id as PlanId] ?? null;
}

export function planEnumToId(plan: Plan): PlanId {
  return ENUM_TO_ID[plan];
}

export function getPlanConfig(id: PlanId) {
  const key = planIdToEnum(id);
  if (!key) return null;
  return PLANS[key];
}

export function isStripeCheckoutReady(planId: PlanId): boolean {
  const config = getPlanConfig(planId);
  if (!config || "custom" in config) return false;
  return Boolean(process.env.STRIPE_SECRET_KEY && config.stripePriceId);
}

export function isAnyStripePlanConfigured(): boolean {
  return (["starter", "pro", "business"] as PlanId[]).some(isStripeCheckoutReady);
}

export const PLAN_LIMITS: Record<
  Plan,
  { maxMembers: number; affiliates: boolean; apiAccess: boolean; analytics: boolean }
> = {
  STARTER: { maxMembers: 3, affiliates: false, apiAccess: false, analytics: false },
  PRO: { maxMembers: 15, affiliates: true, apiAccess: false, analytics: true },
  BUSINESS: { maxMembers: 999, affiliates: true, apiAccess: true, analytics: true },
  ENTERPRISE: { maxMembers: 9999, affiliates: true, apiAccess: true, analytics: true },
};

export function canUseAffiliates(plan: Plan) {
  return PLAN_LIMITS[plan].affiliates;
}

export function getUpgradePlans(currentPlan: Plan) {
  const currentIdx = PLAN_ORDER.indexOf(currentPlan);
  return PLAN_ORDER.slice(currentIdx + 1)
    .map((p) => ({ enum: p, ...PLANS[p], id: ENUM_TO_ID[p] as PlanId }))
    .filter((p) => !("custom" in p) || p.id === "enterprise");
}

export const MARKETING_PLANS = PLAN_ORDER.map((p) => ({
  ...PLANS[p],
  enum: p,
}));
