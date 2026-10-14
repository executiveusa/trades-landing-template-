# Ray, yeso y acabados: Puerto Vallarta

One-page lead site for a plastering trade in Puerto Vallarta. Spanish at `/`, English at `/en`.
One job: get a visitor to send Ray a WhatsApp message with the **zone** and the **work**.

Audit, design lock, evidence ledger and test results: [`docs/AUDIT.md`](docs/AUDIT.md).

## Run

```bash
npm ci
npm run dev        # http://localhost:3000
npm test           # unit tests + evidence lock
npm run typecheck
npm run build && npm start
```

## How a lead works

1. Visitor taps **Cotizar por WhatsApp** (direct) or fills the form (zone, job, optional details/name).
2. The form opens WhatsApp with a written message and tells the visitor, truthfully, that Ray receives it **when they press send**.
3. In parallel the form posts to `/api/lead`, which saves a backup record if a sink is configured:
   - Supabase (botanic-creations project): set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `LEAD_IP_SALT`. Migration `supabase/migrations/001_ray_pv_leads.sql` is applied: isolated schema `ray_pv_private`, RPC `ray_pv_create_lead` (idempotent, rate-limited per hashed IP, service role only), `ray_pv_admin_lead_list` for the operator view.
   - Email to Ray: set `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`.
   - Neither set: the lead is written to server logs only.

Each submit carries a client UUID (`key`). The API dedupes on it and returns a `receipt` only when a durable store confirmed the write; email or logs never produce one.

A backup record means "someone opened WhatsApp with this message", not "someone contacted Ray".

## Configuration

See `.env.example`. Nothing secret lives in this repo.
`NEXT_PUBLIC_SITE_URL` turns on canonical, hreflang, sitemap and the social image. Without a real domain they are omitted on purpose.
`NEXT_PUBLIC_GA_ID` turns on analytics events (`whatsapp_click`, `call_click`, `quote_submit`, `service_select`, `lang_switch`).

## Where things live

| Change | File |
| --- | --- |
| Phone, name, city | `lib/site.ts` |
| Every word on the page, ES + EN | `lib/content.ts` |
| Colors, type, spacing | `app/styles.css` (tokens at the top) |
| Photos | originals in `assets-src/`, then `npm run images` writes `public/img/` |

Add a claim (years, price, review, coverage area) only after Ray provides proof, record it in `docs/AUDIT.md`, then relax the matching pattern in `tests/content.test.ts`.

## Deploy

Vercel, framework preset Next.js, no extra build settings. `main` is the pre-rebuild rollback.
