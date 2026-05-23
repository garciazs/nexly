import type { NextAuthConfig } from "next-auth";
import { resolveOrganizationForUser } from "@/lib/tenant-db";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role?: string }).role ?? "USER";
        token.organizationId =
          (await resolveOrganizationForUser(user.id!)) ?? undefined;
      } else if (token.id && (trigger === "update" || !token.organizationId)) {
        token.organizationId =
          (await resolveOrganizationForUser(token.id as string)) ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        session.user.organizationId = token.organizationId as string | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
