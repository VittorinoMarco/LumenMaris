import { NextRequest, NextResponse } from "next/server";
import { validateCartItems } from "@/lib/commerce/catalog";
import { calculateShippingCents } from "@/lib/commerce/shipping";
import {
  attachStripeSessionToOrder,
  createPendingOrder,
} from "@/lib/commerce/orders";
import {
  getSiteUrl,
  getStripe,
  getStripePriceIdForSlug,
  isStripeConfigured,
} from "@/lib/stripe";
import type Stripe from "stripe";

interface CheckoutBody {
  items: { id: string; quantity: number }[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const validated = await validateCartItems(body.items ?? []);

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const subtotalCents = validated.lines.reduce(
      (sum, l) => sum + l.unitPriceCents * l.quantity,
      0
    );
    const shippingCents = calculateShippingCents(subtotalCents);
    const totalCents = subtotalCents + shippingCents;

    const origin = request.nextUrl.origin;
    const siteUrl = getSiteUrl(origin);

    const pending = await createPendingOrder({
      lines: validated.lines,
      subtotalCents,
      shippingCents,
      totalCents,
    });

    const orderId = pending?.orderId ?? "local";

    const stripe = getStripe();

    if (!stripe || !isStripeConfigured()) {
      const mockUrl = `${siteUrl}/checkout/success?mock=1&order_id=${orderId}`;
      return NextResponse.json({
        url: mockUrl,
        mode: "mock",
        orderId,
        message:
          "Stripe non configurato — checkout demo. Aggiungi STRIPE_SECRET_KEY in .env.local",
      });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      validated.lines.map((line) => {
        const priceId = getStripePriceIdForSlug(line.slug);
        if (priceId) {
          return { price: priceId, quantity: line.quantity };
        }
        return {
          price_data: {
            currency: "eur",
            unit_amount: line.unitPriceCents,
            product_data: {
              name: line.name,
              description: line.size,
              images: line.imageUrl.startsWith("http")
                ? [line.imageUrl]
                : [`${siteUrl}${line.imageUrl}`],
              metadata: { slug: line.slug },
            },
          },
          quantity: line.quantity,
        };
      });

    if (shippingCents > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          unit_amount: shippingCents,
          product_data: { name: "Spedizione" },
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      customer_creation: "always",
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["IT", "CH", "SM", "VA"] },
      phone_number_collection: { enabled: true },
      metadata: {
        order_id: orderId,
      },
      locale: "it",
    });

    if (pending?.orderId && session.id) {
      await attachStripeSessionToOrder(pending.orderId, session.id);
    }

    return NextResponse.json({
      url: session.url,
      mode: "stripe",
      orderId: pending?.orderId,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { error: "Errore durante il checkout. Riprova." },
      { status: 500 }
    );
  }
}
