# Spirito Alchemico — E-commerce Profumi di Nicchia

Sito e-commerce multi-pagina per **Spirito Alchemico**, brand di profumi di nicchia dalla Calabria. I profumi Arcomagno (uomo) e Thalasi (donna) sono affinati sott’acqua a 35 metri di profondità per 6 mesi — un processo unico al mondo.

## Tech Stack

- **Next.js 14** (App Router) con TypeScript
- **Tailwind CSS** + componenti in stile shadcn/ui
- **Framer Motion** per animazioni
- **Zustand** per lo stato del carrello
- **Stripe** (mock) per i pagamenti
- **next/image** per immagini ottimizzate

## Struttura Pagine

| Route | Descrizione |
|-------|-------------|
| `/` | Homepage con hero video, progetto, profumi, territorio, contatori |
| `/progetto` | Il processo di affinamento sottomarino |
| `/territorio` | Calabria, bergamotto, Magna Grecia |
| `/shop` | Griglia prodotti con filtri e ordinamento |
| `/shop/arcomagno` | Scheda Arcomagno Uomo |
| `/shop/thalasi` | Scheda Thalasi Donna |
| `/cart` | Carrello con checkout mock |
| `/chi-siamo` | Storia e valori del brand |
| `/contatti` | Form contatti e social |
| `/privacy` | Privacy policy |

## Avvio

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Palette Colori

- **Primary**: `#356175` (blu profondo)
- **Secondary**: `#ae6036` (terracotta)
- **Accent**: `#68a48d` (verde salvia)
- **Muted**: `#5e191b` (bordeaux)
- **Background**: `#F9F6F1` (off-white)

## Asset

Le immagini dei profumi (`ProfumoUomo-Arcomagno.webp`, `ProfumoDonna-Thalasi.webp`) e il video hero sono in `/public`. Le immagini esterne usano Unsplash.

## Checkout

Il checkout è mock: il pulsante "Procedi al Pagamento" reindirizza alla pagina di successo. Per integrare Stripe in produzione, sostituire `/api/checkout/route.ts` con la creazione di una sessione Stripe.
