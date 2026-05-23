import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { PLANS } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const { plan } = await req.json();
    const planConfig = Object.values(PLANS).find((p) => p.id === plan);
    if (!planConfig || !("stripePriceId" in planConfig) || !planConfig.stripePriceId) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }
    const checkout = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer_email: session.user.email,
      line_items: [{ price: planConfig.stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=1`,
      metadata: { plan, userId: session.user.id ?? "" },
      currency: "eur",
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: checkout.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
  }
}
