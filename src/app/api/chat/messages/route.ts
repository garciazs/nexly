import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function POST(req: Request) {
  try {
    const tenant = await requireTenant();
    const { content } = await req.json();

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Mensagem vazia" }, { status: 400 });
    }

    const message = await prisma.chatMessage.create({
      data: {
        content: content.trim(),
        userId: tenant.userId,
        organizationId: tenant.organizationId,
        roomId: "general",
      },
      include: { user: true },
    });

    return NextResponse.json({
      id: message.id,
      content: message.content,
      userName: message.user.name ?? message.user.email,
      time: message.createdAt.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      self: true,
    });
  } catch {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
}
