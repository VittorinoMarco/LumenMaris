import { NextRequest, NextResponse } from "next/server";

// Mock Stripe Checkout API - in production, this would create a Stripe session
export async function POST(request: NextRequest) {
  // In production: create Stripe session, return session.url
  const baseUrl = request.nextUrl.origin;
  const mockCheckoutUrl = `${baseUrl}/checkout/success`;

  return NextResponse.json({
    url: mockCheckoutUrl,
    message: "Mock checkout - redirecting to success page",
  });
}
