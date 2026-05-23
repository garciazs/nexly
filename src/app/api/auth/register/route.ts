import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Dados inválidos";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (exists) return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });

    const password = await bcrypt.hash(parsed.data.password, 12);
    const slugBase = parsed.data.email.split("@")[0].replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const orgName = `${parsed.data.name.split(" ")[0] ?? "Minha"} Organização`;

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
          name: orgName,
          slug: `${slugBase}-${Date.now().toString(36)}`,
          ownerId: user.id,
          members: { create: { userId: user.id, role: "owner" } },
          subscription: { create: { plan: "STARTER", status: "TRIALING" } },
        },
      });
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[register]", error);
    return NextResponse.json(
      { error: "Não foi possível criar a conta. Tente novamente em instantes." },
      { status: 500 }
    );
  }
}
