import { NextRequest, NextResponse } from "next/server";
import { getOrderByStripeSession, getOrderById } from "@/lib/commerce/orders";
import { formatEur } from "@/lib/commerce/shipping";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  const orderId = request.nextUrl.searchParams.get("order_id");
  const mock = request.nextUrl.searchParams.get("mock") === "1";

  if (mock && orderId) {
    const data = await getOrderById(orderId);
    if (data) {
      return NextResponse.json({
        mode: "mock",
        order: {
          id: data.order.id,
          status: data.order.status,
          total: formatEur(data.order.total_cents),
          email: data.order.customer_email,
          items: data.items.map((i) => ({
            name: i.product_name,
            quantity: i.quantity,
            total: formatEur(i.unit_price_cents * i.quantity),
          })),
        },
      });
    }
    return NextResponse.json({
      mode: "mock",
      order: { id: orderId, status: "paid", total: null, items: [] },
    });
  }

  if (!sessionId) {
    return NextResponse.json({ error: "session_id richiesto" }, { status: 400 });
  }

  const data = await getOrderByStripeSession(sessionId);
  if (!data) {
    return NextResponse.json({ error: "Ordine non trovato" }, { status: 404 });
  }

  return NextResponse.json({
    mode: "stripe",
    order: {
      id: data.order.id,
      status: data.order.status,
      total: formatEur(data.order.total_cents),
      email: data.order.customer_email,
      items: data.items.map((i) => ({
        name: i.product_name,
        quantity: i.quantity,
        total: formatEur(i.unit_price_cents * i.quantity),
      })),
    },
  });
}
