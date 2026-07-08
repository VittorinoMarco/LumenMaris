# E-commerce — Lumen Maris

Setup **Supabase** (database) + **Stripe** (pagamenti).

## 1. Supabase

Progetto: `tznvcumdnwsxqzdvypmc`

1. Vai su [Supabase Dashboard](https://supabase.com/dashboard/project/tznvcumdnwsxqzdvypmc)
2. **SQL Editor** → esegui in ordine:
   - `supabase/migrations/20260706120000_ecommerce_schema.sql`
   - `supabase/seed.sql`
3. **Settings → API** → copia URL, `anon` key e `service_role` key

### MCP Cursor (opzionale)

Già configurato in `.cursor/mcp.json`. Riavvia Cursor per usare Supabase MCP.

```bash
npx skills add supabase/agent-skills
```

## 2. Variabili d'ambiente

Copia `.env.example` → `.env.local` e compila:

```bash
cp .env.example .env.local
```

| Variabile | Dove trovarla |
|-----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | idem |
| `SUPABASE_SERVICE_ROLE_KEY` | idem (⚠️ solo server, mai esporre al client) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | idem |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks (dopo creazione endpoint) |

## 3. Stripe

### Prodotti (opzionale)

Puoi creare Products/Prices in Stripe Dashboard e impostare:

```
STRIPE_PRICE_SARACENUM=price_...
STRIPE_PRICE_THALASI=price_...
```

Se vuoti, il checkout usa `price_data` dinamico dal database.

### Webhook (locale)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copia il `whsec_...` in `STRIPE_WEBHOOK_SECRET`.

Eventi da abilitare in produzione:
- `checkout.session.completed`
- `checkout.session.expired`

### Webhook (produzione)

URL: `https://lumenmaris.it/api/webhooks/stripe`

## 4. Flusso ordine

```
Carrello → POST /api/checkout
  → valida prezzi (Supabase o fallback statico)
  → crea ordine `pending` + righe in DB
  → Stripe Checkout Session
  → redirect Stripe

Pagamento OK → webhook → ordine `paid`
  → /checkout/success?session_id=...

Annullato → /checkout/cancel
```

Senza Stripe/Supabase configurati, il checkout resta in **modalità demo** (redirect a success).

## 5. Tabelle

| Tabella | Scopo |
|---------|--------|
| `products` | Catalogo, prezzi, stripe_price_id |
| `orders` | Ordini e stato pagamento |
| `order_items` | Righe ordine |
| `contact_messages` | Form contatti |

## 6. API routes

| Route | Metodo |
|-------|--------|
| `/api/checkout` | POST — crea sessione Stripe |
| `/api/webhooks/stripe` | POST — conferma pagamento |
| `/api/orders?session_id=` | GET — dettaglio ordine (success page) |
| `/api/contact` | POST — form contatti |
