import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { registerSchema } from "../src/lib/validations";

async function main() {
  const email = `regtest${Date.now()}@mail.com`;
  const body = {
    name: "Reg Test",
    email,
    password: "senha12345",
    confirmPassword: "senha12345",
  };

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    console.error("validation failed", parsed.error.issues);
    return;
  }

  const password = await bcrypt.hash(parsed.data.password, 12);
  const slugBase = parsed.data.email.split("@")[0].replace(/[^a-z0-9-]/gi, "-").toLowerCase();

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password,
        emailVerified: new Date(),
      },
    });

    await tx.organization.create({
      data: {
        name: "Reg Org",
        slug: `${slugBase}-${Date.now().toString(36)}`,
        ownerId: user.id,
        members: { create: { userId: user.id, role: "owner" } },
        subscription: { create: { plan: "STARTER", status: "TRIALING" } },
      },
    });

    console.log("ok", user.email);
  });
}

main()
  .catch((e) => console.error("fail", e.message))
  .finally(() => prisma.$disconnect());
