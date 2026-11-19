import Stripe from "stripe";

let stripe: Stripe | undefined;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Stripe is not configured");

  stripe ??= new Stripe(secretKey, { apiVersion: "2023-10-16" });
  return stripe;
}
