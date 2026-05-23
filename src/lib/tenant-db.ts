import { prisma } from "@/lib/prisma";
import { Plan } from "@prisma/client";

export async function resolveOrganizationForUser(userId: string): Promise<string | null> {
  const membership = await prisma.organizationMember.findFirst({
    where: { userId },
    orderBy: { organization: { createdAt: "asc" } },
    select: { organizationId: true },
  });
  if (membership) return membership.organizationId;

  const owned = await prisma.organization.findFirst({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  return owned?.id ?? null;
}

export async function ensureUserOrganization(userId: string, name?: string | null): Promise<string> {
  const existing = await resolveOrganizationForUser(userId);
  if (existing) return existing;

  const slugBase = `org-${userId.slice(-8)}`;
  const org = await prisma.organization.create({
    data: {
      name: name ? `${name.split(" ")[0]} Organização` : "Minha Organização",
      slug: `${slugBase}-${Date.now().toString(36)}`,
      ownerId: userId,
      members: { create: { userId, role: "owner" } },
      subscription: { create: { plan: Plan.STARTER, status: "TRIALING" } },
    },
  });
  return org.id;
}
