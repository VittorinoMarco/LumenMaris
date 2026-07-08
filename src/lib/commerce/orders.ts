import { createAdminClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/database.types";
import type { ValidatedLineItem } from "./catalog";

export interface CreatePendingOrderInput {
  lines: ValidatedLineItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  stripeCheckoutSessionId?: string;
}

export async function createPendingOrder(
  input: CreatePendingOrderInput
): Promise<{ orderId: string } | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      status: "pending",
      subtotal_cents: input.subtotalCents,
      shipping_cents: input.shippingCents,
      total_cents: input.totalCents,
      currency: "eur",
      stripe_checkout_session_id: input.stripeCheckoutSessionId ?? null,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("createPendingOrder:", orderError);
    return null;
  }

  const itemRows = input.lines.map((line) => ({
    order_id: order.id,
    product_id: line.productId,
    product_slug: line.slug,
    product_name: line.name,
    unit_price_cents: line.unitPriceCents,
    quantity: line.quantity,
    image_url: line.imageUrl,
    size: line.size,
  }));

  const { error: itemsError } = await admin.from("order_items").insert(itemRows);
  if (itemsError) {
    console.error("createPendingOrder items:", itemsError);
    await admin.from("orders").delete().eq("id", order.id);
    return null;
  }

  return { orderId: order.id };
}

export async function attachStripeSessionToOrder(
  orderId: string,
  sessionId: string
): Promise<void> {
  const admin = createAdminClient();
  if (!admin) return;
  await admin
    .from("orders")
    .update({ stripe_checkout_session_id: sessionId })
    .eq("id", orderId);
}

export async function markOrderPaid(params: {
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string | null;
  customerEmail?: string | null;
  customerName?: string | null;
}): Promise<boolean> {
  const admin = createAdminClient();
  if (!admin) return false;

  const { data: order } = await admin
    .from("orders")
    .select("id, status")
    .eq("stripe_checkout_session_id", params.stripeCheckoutSessionId)
    .maybeSingle();

  if (!order) return false;
  if (order.status === "paid") return true;

  const { error } = await admin
    .from("orders")
    .update({
      status: "paid" satisfies OrderStatus,
      stripe_payment_intent_id: params.stripePaymentIntentId ?? null,
      customer_email: params.customerEmail ?? null,
      customer_name: params.customerName ?? null,
    })
    .eq("id", order.id);

  return !error;
}

export async function getOrderByStripeSession(sessionId: string) {
  const admin = createAdminClient();
  if (!admin) return null;

  const { data: order } = await admin
    .from("orders")
    .select("*")
    .eq("stripe_checkout_session_id", sessionId)
    .maybeSingle();

  if (!order) return null;

  const { data: items } = await admin
    .from("order_items")
    .select("*")
    .eq("order_id", order.id);

  return { order, items: items ?? [] };
}

export async function getOrderById(orderId: string) {
  const admin = createAdminClient();
  if (!admin) return null;

  const { data: order } = await admin
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle();

  if (!order) return null;

  const { data: items } = await admin
    .from("order_items")
    .select("*")
    .eq("order_id", order.id);

  return { order, items: items ?? [] };
}
