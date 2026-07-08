#!/usr/bin/env node
/**
 * Verifica connessione Supabase e presenza tabelle ecommerce.
 * Uso: node scripts/check-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const path = resolve(process.cwd(), ".env.local");
  try {
    const raw = readFileSync(path, "utf8");
    const get = (key) =>
      raw.match(new RegExp(`^${key}=(.+)$`, "m"))?.[1]?.trim() ?? "";
    return {
      url: get("NEXT_PUBLIC_SUPABASE_URL"),
      anon: get("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      service: get("SUPABASE_SERVICE_ROLE_KEY"),
    };
  } catch {
    return { url: "", anon: "", service: "" };
  }
}

const { url, anon, service } = loadEnv();

const missing = [];
if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
if (!anon) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
if (!service) missing.push("SUPABASE_SERVICE_ROLE_KEY");

if (missing.length) {
  console.error("❌ Mancano in .env.local:", missing.join(", "));
  process.exit(1);
}

console.log("✓ Variabili Supabase presenti");
console.log("  URL:", url);

const admin = createClient(url, service);

const tables = ["products", "orders", "order_items", "contact_messages"];

for (const table of tables) {
  const { error } = await admin.from(table).select("*", { count: "exact", head: true });
  if (error) {
    console.error(`❌ Tabella "${table}":`, error.message);
    console.log("\n→ Esegui in Supabase SQL Editor:");
    console.log("  1. supabase/migrations/20260706120000_ecommerce_schema.sql");
    console.log("  2. supabase/seed.sql");
    console.log("  https://supabase.com/dashboard/project/tznvcumdnwsxqzdvypmc/sql/new");
    process.exit(1);
  }
  console.log(`✓ Tabella "${table}" OK`);
}

const { data: products, error: prodErr } = await admin
  .from("products")
  .select("slug, name, price_cents")
  .order("sort_order");

if (prodErr || !products?.length) {
  console.error("❌ Catalogo vuoto — esegui supabase/seed.sql");
  process.exit(1);
}

console.log(`\n✅ Catalogo: ${products.length} prodotti (Saracenum + Thalasi)`);
products.forEach((p) =>
  console.log(`  · ${p.slug} — ${p.name} (€${(p.price_cents / 100).toFixed(2)})`)
);

console.log("\n✅ Supabase pronto. Stripe non necessario per ora (checkout in modalità demo).");
