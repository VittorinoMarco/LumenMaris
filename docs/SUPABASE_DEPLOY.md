# Deploy database Supabase da Git

Modifica il database **versionando SQL nel repo** e applicandolo con un deploy automatico (GitHub Actions) o da locale.

## Come funziona

```
supabase/migrations/   ← ogni modifica schema = nuovo file .sql
supabase/seed.sql      ← dati iniziali (prodotti), idempotente
        ↓
   git push main
        ↓
   GitHub Actions → supabase db push
        ↓
   Database remoto aggiornato
```

## Cosa mi serve da te (una tantum)

### 1. Access Token Supabase

1. Vai su [Account → Access Tokens](https://supabase.com/dashboard/account/tokens)
2. **Generate new token** (es. nome: `lumenmaris-github`)
3. Copia il token `sbp_...`

### 2. Password database

1. [Project Settings → Database](https://supabase.com/dashboard/project/tznvcumdnwsxqzdvypmc/settings/database)
2. Se non la ricordi: **Reset database password** e salvala in un password manager

### 3. Secrets su GitHub

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Valore |
|--------|--------|
| `SUPABASE_ACCESS_TOKEN` | `sbp_...` |
| `SUPABASE_DB_PASSWORD` | password Postgres del progetto |
| `SUPABASE_PROJECT_REF` | `tznvcumdnwsxqzdvypmc` |

Dopo il primo push su `main` che tocca `supabase/`, il workflow `.github/workflows/supabase-deploy.yml` applica le migration.

---

## Deploy da locale (prima del CI o per test)

Aggiungi a `.env.local` (già gitignored):

```env
SUPABASE_ACCESS_TOKEN=sbp_...
SUPABASE_DB_PASSWORD=la_tua_password
```

Poi:

```bash
npm run db:push    # link + migration + seed
npm run db:check   # verifica tabelle e catalogo
```

---

## Aggiungere una modifica al database

1. Crea un **nuovo** file in `supabase/migrations/` (non modificare migration già deployate):

```bash
# esempio nome file
supabase/migrations/20260707120000_add_newsletter.sql
```

2. Scrivi SQL (ALTER TABLE, nuove tabelle, indici…)

3. Commit + push su `main` → deploy automatico

Oppure in locale: `npm run db:push`

### Generare migration da diff (opzionale, con CLI)

```bash
supabase migration new nome_modifica
# edita il file generato in supabase/migrations/
```

---

## Seed (prodotti)

`supabase/seed.sql` usa `ON CONFLICT DO UPDATE` — puoi rieseguirlo per aggiornare prezzi/testi senza duplicati.

Il CI lo applica quando cambia `seed.sql`.

---

## Stripe

Non serve per il deploy database. Si configura in un secondo momento.

---

## Troubleshooting

| Problema | Soluzione |
|----------|-----------|
| `Your account does not have privileges` | Token sbagliato o senza accesso al progetto |
| `password authentication failed` | Reset password in Dashboard → Database |
| Migration già applicata | Non editare file vecchi; crea una nuova migration |
| Tabelle mancanti in locale dev | `npm run db:push` |

---

## MCP Cursor (opzionale)

Già in `.cursor/mcp.json` per interrogare il progetto da IDE.

```bash
npx skills add supabase/agent-skills
```
