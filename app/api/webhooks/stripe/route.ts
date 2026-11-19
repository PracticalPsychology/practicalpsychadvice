import { NextResponse, NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe-server";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new NextResponse("Missing signature", { status: 400 });

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe webhook credentials are unavailable");
    return new NextResponse("Webhook unavailable", { status: 503 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      await req.text(),
      signature,
      secret,
    );
  } catch {
    return new NextResponse("Invalid webhook", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== "paid") break;
      // Delivery happens on /checkout/success (verified paid session + download link).
      // This log is the order record; search Cloud Run logs for "ORDER_COMPLETED".
      console.log(
        "ORDER_COMPLETED",
        JSON.stringify({
          session: session.id,
          slug: session.metadata?.slug,
          email: session.customer_details?.email,
          amount: session.amount_total,
        }),
      );
      break;
    }

    case "charge.refunded":
      const charge = event.data.object as Stripe.Charge;

      // TODO: Handle refunds
      // - Update database to mark order as refunded
      // - Send refund confirmation email

      console.log(`Refund processed for charge ${charge.id}`);
      break;

    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription;

      // TODO: Handle subscription updates
      console.log(`Subscription updated for customer ${subscription.customer}`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
