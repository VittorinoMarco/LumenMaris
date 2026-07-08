export const FREE_SHIPPING_THRESHOLD_EUR = 100;
export const SHIPPING_COST_EUR = 9.9;

export function calculateShippingCents(subtotalCents: number): number {
  const threshold = FREE_SHIPPING_THRESHOLD_EUR * 100;
  return subtotalCents >= threshold ? 0 : Math.round(SHIPPING_COST_EUR * 100);
}

export function formatEur(cents: number): string {
  return (cents / 100).toFixed(2);
}
