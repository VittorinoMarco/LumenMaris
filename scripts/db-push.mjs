#!/usr/bin/env node
/**
 * Applica migration + seed su Supabase remoto (stesso flusso del CI).
 *
 * Richiede in .env.local (non committare):
 *   SUPABASE_ACCESS_TOKEN=sbp_...
 *   SUPABASE_DB_PASSWORD=...
 *
 * Uso: npm run db:push
 */
import { spawnSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const PROJECT_REF = "tznvcumdnwsxqzdvypmc";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, "utf8");
  const get = (key) =>
    raw.match(new RegExp(`^${key}=(.+)$`, "m"))?.[1]?.trim() ?? "";
  return {
    SUPABASE_ACCESS_TOKEN: get("SUPABASE_ACCESS_TOKEN"),
    SUPABASE_DB_PASSWORD: get("SUPABASE_DB_PASSWORD"),
  };
}

const extra = loadEnvLocal();
const env = {
  ...process.env,
  SUPABASE_ACCESS_TOKEN:
    process.env.SUPABASE_ACCESS_TOKEN || extra.SUPABASE_ACCESS_TOKEN,
  SUPABASE_DB_PASSWORD:
    process.env.SUPABASE_DB_PASSWORD || extra.SUPABASE_DB_PASSWORD,
};

function run(cmd, args) {
  console.log(`\n→ ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, {
    stdio: "inherit",
    env,
    shell: false,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

if (!env.SUPABASE_ACCESS_TOKEN) {
  console.error(
    "❌ Manca SUPABASE_ACCESS_TOKEN in .env.local\n" +
      "   Crealo su: https://supabase.com/dashboard/account/tokens"
  );
  process.exit(1);
}

if (!env.SUPABASE_DB_PASSWORD) {
  console.error(
    "❌ Manca SUPABASE_DB_PASSWORD in .env.local\n" +
      "   Lo trovi in: Project Settings → Database → Database password"
  );
  process.exit(1);
}

run("npx", [
  "supabase",
  "link",
  "--project-ref",
  PROJECT_REF,
  "-p",
  env.SUPABASE_DB_PASSWORD,
]);
run("npx", [
  "supabase",
  "db",
  "push",
  "--include-all",
  "--yes",
]);
run("npx", ["supabase", "db", "push", "--include-seed", "--yes"]);

console.log("\n✅ Database aggiornato su Supabase.");
