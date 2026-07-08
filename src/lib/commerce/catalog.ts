import { createAdminClient } from "@/lib/supabase/server";
import type { DbProduct } from "@/lib/database.types";
import { products as staticProducts, type Product } from "@/lib/products";

export interface ValidatedLineItem {
  productId: string | null;
  slug: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  imageUrl: string;
  size: string;
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  );
}

export interface CheckoutCartInput {
  id: string;
  quantity: number;
}

function staticToDbShape(p: Product): DbProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    price_cents: Math.round(p.price * 100),
    size: p.size,
    image_url: p.image,
    gender: p.gender,
    family: p.family,
    badge: p.badge ?? null,
    top_notes: p.topNotes,
    heart_notes: p.heartNotes,
    base_notes: p.baseNotes,
    stripe_price_id: null,
    active: true,
    inventory: null,
    sort_order: 0,
    created_at: "",
    updated_at: "",
  };
}

/** Carica prodotti attivi da Supabase, fallback al catalogo statico */
export async function fetchActiveProducts(): Promise<DbProduct[]> {
  const admin = createAdminClient();
  if (admin) {
    const { data, error } = await admin
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  return staticProducts.map(staticToDbShape);
}

export async function fetchProductBySlug(
  slug: string
): Promise<DbProduct | null> {
  const admin = createAdminClient();
  if (admin) {
    const { data } = await admin
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();
    if (data) return data;
  }
  const found = staticProducts.find((p) => p.slug === slug);
  return found ? staticToDbShape(found) : null;
}

/** Valida carrello lato server — prezzi sempre dal catalogo */
export async function validateCartItems(
  items: CheckoutCartInput[]
): Promise<{ ok: true; lines: ValidatedLineItem[] } | { ok: false; error: string }> {
  if (!items?.length) {
    return { ok: false, error: "Carrello vuoto" };
  }

  const catalog = await fetchActiveProducts();
  const bySlug = new Map(catalog.map((p) => [p.slug, p]));
  const byId = new Map(catalog.map((p) => [p.id, p]));

  const lines: ValidatedLineItem[] = [];

  for (const item of items) {
    const qty = Math.floor(Number(item.quantity));
    if (!item.id || qty < 1 || qty > 20) {
      return { ok: false, error: "Quantità non valida" };
    }

    const product = bySlug.get(item.id) ?? byId.get(item.id);
    if (!product) {
      return { ok: false, error: `Prodotto non trovato: ${item.id}` };
    }

    if (product.inventory != null && product.inventory < qty) {
      return { ok: false, error: `${product.name} non disponibile in quantità richiesta` };
    }

    lines.push({
      productId: isUuid(product.id) ? product.id : null,
      slug: product.slug,
      name: product.name,
      unitPriceCents: product.price_cents,
      quantity: qty,
      imageUrl: product.image_url ?? "",
      size: product.size,
    });
  }

  return { ok: true, lines };
}

export function dbProductToProduct(row: DbProduct): Product {
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    price: row.price_cents / 100,
    size: row.size,
    image: row.image_url ?? "",
    gender: row.gender ?? "unisex",
    family: row.family ?? "",
    topNotes: row.top_notes ?? [],
    heartNotes: row.heart_notes ?? [],
    baseNotes: row.base_notes ?? [],
    badge: row.badge ?? undefined,
  };
}
