# Handoff: Ray plaster lead site (Puerto Vallarta)

For the agent that has GitHub and Vercel access. The author could not push: the repo was not in the authoring session's authorized sources. Everything is committed locally on `rebuild/ray-lead-site`.

Report back to Bambu (executiveusa@gmail.com) using the template at the bottom.

## 1. What this is

A bilingual (ES `/`, EN `/en`) one-page lead site for Ray's plastering trade in Puerto Vallarta. One job: get a visitor to send Ray a WhatsApp message with the zone and the work. Next.js 16 App Router, React 19, plain CSS, no Tailwind.

- Repo: `executiveusa/trades-landing-template-`
- Rollback: `main` @ `b61c740` (untouched)
- Branch to push: `rebuild/ray-lead-site`
  - `05d54b4` Rebuild: evidence-locked copy, honest WhatsApp lead flow, bilingual routes
  - `7296aea` Lead API: durable store via `ray_pv_create_lead` RPC, honest failure states
  - plus one handoff commit that adds this file
- Status label: **TESTED (local)**. Not PREVIEW VERIFIED, not PRODUCTION VERIFIED. Nothing is deployed. No independent reviewer has run.

## 2. Do this, in order

1. Get the code. Either unzip `ray-pv-site.zip`, or in a clone of the repo: `git fetch <path>/ray-pv-site.bundle rebuild/ray-lead-site:rebuild/ray-lead-site`.
2. **Photos.** They are already committed. Confirm these exist and open correctly before pushing, and do not regenerate or replace them:
   - `public/img/ray-hero.jpg`, `stage-1-bloque.jpg`, `stage-2-aplanado.jpg`, `stage-3-acabado.jpg`, `detalle-muro.jpg`, `detalle-plafon.jpg`, and `public/og.jpg`
   - originals in `assets-src/` (`ray-working.jpg`, `photo1/2/3/4/6/10.jpg`); `npm run images` rebuilds `public/img` from them with sharp. `assets-src` is excluded from Vercel by `.vercelignore`.
   - If the zip was used and any photo is missing or 0 bytes, stop and tell Bambu rather than substituting stock images.
3. `npm ci && npm run typecheck && npm test && npm run build`. Expect typecheck clean, 14/14 tests pass, build lists routes `/`, `/en`, `/api/lead`, `/icon.svg`, `/robots.txt`, `/sitemap.xml`.
4. `git push -u origin rebuild/ray-lead-site`. Do **not** push to or merge into `main` yet.
5. Open a PR `rebuild/ray-lead-site` → `main`. Watch the `Verify` workflow (`.github/workflows/gauntlet.yml`: install, typecheck, test, build, Node 22).
6. Vercel: create a project from the repo (preset Next.js, no custom build settings). Team: `the-pauli-effect` (`team_2MkWeFBaSCv7DOvEy0OlX4s3`); no Ray project exists yet. Deploy the branch as a **Preview**. Set env vars (section 4) for the Preview environment.
7. Verify the preview (section 6). Merge to `main` only after Bambu approves. Production deploy needs Bambu's explicit OK.

## 3. Supabase: already applied, do not re-apply

Project: `botanic-creations`, ref `cyxdevcjycmffhmwxojh`, us-west-1, Postgres 17. This is one shared project used by many sites; each site gets its own `<name>_private` schema and locked RPCs. Ray's follows the `thp_private` / `dosa` pattern.

Migration applied as `ray_pv_lead_intake_v1`. Source: `supabase/migrations/001_ray_pv_leads.sql`.

**Objects created (nothing else was touched):**
- Schema `ray_pv_private`, no access for `public`, `anon`, `authenticated`.
- Table `ray_pv_private.leads`: `id uuid pk`, `request_key uuid unique`, `request_hash text`, `ip_token text (64 chars)`, `created_at`, `zona`, `trabajo` (1–80 chars), `detalle` (≤600), `nombre` (≤60), `lang` ('es'|'en'), `source` (≤120), `status` ('new'|'seen'|'contacted'|'closed'|'spam'). RLS enabled and forced, no policies on purpose.
- `public.ray_pv_create_lead(p_payload jsonb, p_request_key uuid, p_ip_token text) returns uuid`: SECURITY DEFINER, `search_path=''`. Idempotent on `request_key` (same key and same payload returns the same id; same key with a different payload raises `23505 idempotency_conflict`). Per-IP-token limit of 8 per hour raises `P0001 rate_limited`. Invalid payload raises `22023`.
- `public.ray_pv_admin_lead_list(p_limit int default 40) returns jsonb`: newest-first list, max 50. **No UI or operator auth is built for it yet.**
- EXECUTE on both functions granted to `service_role` only; revoked from `public`, `anon`, `authenticated`.

**Tested in SQL (author):** duplicate key returns same id · changed payload raises 23505 · empty zone fails the check constraint · 9th call from one IP raises P0001 · `anon`/`authenticated` cannot execute either function, cannot read the table or use the schema · `service_role` can execute. Security advisor shows only INFO `rls_enabled_no_policy` for the new table (intended, same as `thp_private`).

**Not tested:** the live site-to-database path. The route was tested against a stub REST server (stored → receipt, 409, 429, 502), never against the real project, because the service key was never given to the author.

**Leftover test row:** `ray_pv_private.leads` id `2497e158-70c3-4415-9a9b-7874af143617`, `status='spam'`, `source='rpc-test-row-safe-to-delete'`. Delete it once deletes are allowed (the author's DELETE hung twice).

**Rollback:** `drop schema ray_pv_private cascade; drop function public.ray_pv_create_lead(jsonb, uuid, text); drop function public.ray_pv_admin_lead_list(integer);` Only do this with Bambu's OK; it deletes lead data.

## 4. Environment variables (server-side, never in the repo)

| Variable | Needed | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | yes | `https://cyxdevcjycmffhmwxojh.supabase.co` (confirm in the Supabase dashboard) |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Vault / Vercel sensitive var. **Server only.** Never `NEXT_PUBLIC_*`, never committed, never logged. The author never saw it. |
| `LEAD_IP_SALT` | yes | Any long random string; hashes visitor IPs before they reach the database |
| `NEXT_PUBLIC_SITE_URL` | later | Real domain; turns on canonical, hreflang, sitemap, OG image. Left unset until the domain is chosen. |
| `NEXT_PUBLIC_GA_ID` | optional | Analytics events fire only if set |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL` | optional | Email copy to Ray; all three or none |

Without the Supabase vars the API returns `ok:true, stored:false, receipt:null` and logs `[lead:unsinked]`. That is explicit, not a silent success.

## 5. How the lead flow works (so you can test it)

1. The visitor taps a WhatsApp button, or fills the form (zone, work; optional details, name).
2. The form opens `wa.me/523223041169` with a written message **synchronously in the tap**, and shows "Ray recibe cuando tú lo envías" (never "sent").
3. In the same tap it POSTs `/api/lead` with a client-generated UUID `key`. The API validates, hashes the IP with `LEAD_IP_SALT`, calls the `ray_pv_create_lead` RPC.
4. Responses: `200 {ok, stored, emailed, receipt}` (receipt is the lead id only when the database confirmed the write) · `400 missing_key` / validation errors · `409 idempotency_conflict` · `429 rate_limited` · `502 store_failed` (configured but the write did not land).
5. A stored record means "someone opened WhatsApp with this message". It is not a confirmed contact with Ray.

## 6. What to verify on the preview, and what errors to watch for

Check:
- `/` loads in Spanish, `/en` in English, `<html lang>` correct on each.
- All 7 photos load (no 404 in the network tab). The stage sequence reads bare block → plaster → smooth finish.
- Hero WhatsApp button opens chat to +52 322 304 1169 with the prefilled text. Phone link dials.
- Submit the form with a test zone/work: expect `200` and a `receipt` UUID. Then query the table (service role or Supabase SQL) and confirm one row. Submit the exact same request twice with the same key: still one row. **Mark or delete test rows afterwards.**
- The sticky action bar does not cover the headline on a 390×844 phone and appears only after the hero action scrolls away.
- `/robots.txt` and `/sitemap.xml` return (sitemap is empty until `NEXT_PUBLIC_SITE_URL` is set; that is intended).

Likely failure points:
- **502 `store_failed`**: wrong `SUPABASE_URL`, missing or wrong service key, or the key's role cannot execute the RPC. Check Vercel runtime logs for `[lead:store_failed]`.
- **404 on `/rest/v1/rpc/ray_pv_create_lead`** with a valid key: the function may need `NOTIFY pgrst, 'reload schema'` so PostgREST sees it.
- **Images 404**: photos missing from the commit or `.vercelignore` too broad. `.vercelignore` should exclude only `EMERALD_TABLETS™`, `assets-src`, `docs`, `tests`, `supabase`.
- **Build error on the `™` folder name**: it is in `.vercelignore` and not needed at build time. Do not rename it.
- **Next.js 16 / Turbopack warnings**: report them with the exact text rather than fixing silently.
- **A stale `next start` on a port serving old builds** (local only): kill by PID, then restart.

## 7. Rules the author held to; please keep them

- No invented content: no testimonials, reviews, years of experience, prices, client counts, guarantees or coverage claims. `tests/content.test.ts` fails the build if one appears. If Ray later supplies proof, record it in `docs/AUDIT.md`, then relax the matching pattern.
- No secrets in the repo. The `™` mark stays on `EMERALD_TABLETS™` and its mentions.
- The builder cannot approve its own work: you are the first independent check. No production deploy without Bambu's OK.
- Do not substitute prices from the sales brief ($1,950 / $197); they are unconfirmed.

## 8. Still open (needs Bambu or Ray, not you)

- Ray to confirm the three stage photos are one job (they look like one ceiling; captions only describe what is visible).
- Full business name, domain, GA ID, optional real testimonial / Facebook / hours.
- Not built: CAPTCHA (needs provider keys), login and screen for Ray to read leads (`ray_pv_admin_lead_list` exists, nothing calls it), backup/restore test, SMS consent/text-back/voice/booking (held by design), real-device and screen-reader test.
- Docs: `docs/AUDIT.md` (audit, design lock, evidence ledger), `GAUNTLET.md` (gate ledger), `README.md`, `EMERALD_TABLETS™/` (prime directive; mcp2cli, ext-apps, and the secrets vault were not installed or connected, reasons are in that folder).

## 9. Report back (copy this)

```
RAY SITE: HANDOFF REPORT
Pushed: yes/no, branch, commit sha
Photos: 7 of 7 present and loading? (list any missing)
CI (Verify workflow): pass/fail, link, failing step + exact error
Vercel preview URL:
Env vars set: SUPABASE_URL / SERVICE_ROLE_KEY / LEAD_IP_SALT (names only, no values)
Live lead test: HTTP status, receipt returned?, row visible in ray_pv_private.leads?, duplicate-key test result
Errors seen: exact text + where (build log / runtime log / browser console)
Test rows created and whether cleaned up:
Merged to main: no (waiting for approval) / yes + sha
Anything you changed that is not in this handoff:
```
