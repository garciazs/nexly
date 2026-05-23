import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { planIdToEnum } from "@/lib/plans";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const organizationId = session.metadata?.organizationId;
      const planId = session.metadata?.plan;
      const plan = planId ? planIdToEnum(planId) : null;

      if (organizationId && plan) {
        const sub = await prisma.subscription.findUnique({
          where: { organizationId },
        });

        if (sub) {
          await prisma.subscription.update({
            where: { organizationId },
            data: {
              plan,
              status: "ACTIVE",
              stripeCustomerId:
                typeof session.customer === "string" ? session.customer : sub.stripeCustomerId,
              stripeSubscriptionId:
                typeof session.subscription === "string"
                  ? session.subscription
                  : sub.stripeSubscriptionId,
            },
          });

          if (session.amount_total && session.amount_total > 0) {
            await prisma.payment.create({
              data: {
                subscriptionId: sub.id,
                amount: session.amount_total,
                currency: session.currency ?? "eur",
                stripePaymentId: session.payment_intent as string | undefined,
                status: "succeeded",
              },
            });
          }
        }
      }
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId =
        typeof invoice.subscription === "string" ? invoice.subscription : null;

      if (subscriptionId && invoice.amount_paid > 0) {
        const sub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        });

        if (sub) {
          await prisma.subscription.update({
            where: { id: sub.id },
            data: { status: "ACTIVE" },
          });

          await prisma.payment.create({
            data: {
              subscriptionId: sub.id,
              amount: invoice.amount_paid,
              currency: invoice.currency ?? "eur",
              stripePaymentId: invoice.payment_intent as string | undefined,
              status: "succeeded",
            },
          });
        }
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: "CANCELED" },
      });
    }
  } catch (error) {
    console.error("[stripe webhook]", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
