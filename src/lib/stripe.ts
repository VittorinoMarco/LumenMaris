import Stripe from "stripe";

let stripe: Stripe | null = null;

function isRealSecret(value: string | undefined): boolean {
  if (!value) return false;
  if (value.includes("...") || value.includes("your_") || value.includes("whsec_..."))
    return false;
  return value.length > 20;
}

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!isRealSecret(key)) return null;
  if (!stripe) {
    stripe = new Stripe(key!);
  }
  return stripe;
}

export function isStripeConfigured(): boolean {
  return isRealSecret(process.env.STRIPE_SECRET_KEY);
}

export function getSiteUrl(fallbackOrigin: string): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? fallbackOrigin;
}

/** Price ID Stripe da env, opzionale per prodotto */
export function getStripePriceIdForSlug(slug: string): string | null {
  const map: Record<string, string | undefined> = {
    saracenum: process.env.STRIPE_PRICE_SARACENUM,
    thalasi: process.env.STRIPE_PRICE_THALASI,
  };
  const id = map[slug];
  return id && id.length > 0 ? id : null;
}
