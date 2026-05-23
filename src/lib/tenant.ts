import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ensureUserOrganization, resolveOrganizationForUser } from "@/lib/tenant-db";

export { ensureUserOrganization, resolveOrganizationForUser } from "@/lib/tenant-db";

export type TenantContext = {
  userId: string;
  organizationId: string;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    organizationId?: string;
  };
};

export async function getTenant(): Promise<TenantContext | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  let organizationId = session.user.organizationId;
  if (!organizationId) {
    organizationId = (await resolveOrganizationForUser(session.user.id)) ?? undefined;
  }
  if (!organizationId) {
    organizationId = await ensureUserOrganization(session.user.id, session.user.name);
  }

  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId: session.user.id,
      },
    },
  });
  if (!member) return null;

  return {
    userId: session.user.id,
    organizationId,
    user: session.user,
  };
}

export async function requireTenant(): Promise<TenantContext> {
  const tenant = await getTenant();
  if (!tenant) {
    throw new Error("UNAUTHORIZED");
  }
  return tenant;
}
