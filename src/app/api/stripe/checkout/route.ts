import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PLANS } from "@/lib/constants";
import { isStripeCheckoutReady, planIdToEnum, type PlanId } from "@/lib/plans";
import { requireTenant } from "@/lib/tenant";

export async function POST(req: Request) {
  try {
    const tenant = await requireTenant().catch(() => null);
    if (!tenant?.user.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { plan } = (await req.json()) as { plan?: string };
    const planId = plan as PlanId;

    if (!planId || !planIdToEnum(planId)) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    if (!isStripeCheckoutReady(planId)) {
      return NextResponse.json(
        {
          error:
            "Pagamentos não configurados. Configure STRIPE_SECRET_KEY e STRIPE_PRICE_* no servidor.",
        },
        { status: 503 }
      );
    }

    const planEnum = planIdToEnum(planId)!;
    const planConfig = PLANS[planEnum];
    const stripePriceId = "stripePriceId" in planConfig ? planConfig.stripePriceId : null;

    if (!stripePriceId) {
      return NextResponse.json({ error: "Preço Stripe não encontrado para este plano" }, { status: 400 });
    }

    const checkout = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer_email: tenant.user.email,
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=1`,
      metadata: {
        plan: planId,
        userId: tenant.userId,
        organizationId: tenant.organizationId,
      },
      subscription_data: {
        metadata: {
          organizationId: tenant.organizationId,
          plan: planId,
        },
      },
      currency: "eur",
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (e) {
    console.error("[stripe checkout]", e);
    return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
  }
}
