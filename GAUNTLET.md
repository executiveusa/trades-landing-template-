# Ray Puerto Vallarta: gauntlet ledger

Mode BROWNFIELD · Classification SELL · Rollback `main` @ `b61c740` · Working branch `rebuild/ray-lead-site`
Outcome: qualified quote requests (zone + job) on Ray's WhatsApp. Details in `docs/AUDIT.md`.

| Gate | Status | Evidence / blocker |
| --- | --- | --- |
| Scope lock | PASS | One site, one conversion |
| Rollback | PASS | `main` untouched |
| Fake proof removed (before/after, blog, testimonials) | PASS | Source |
| Real stage sequence used | PASS (pending Ray's confirmation) | Photos compared visually |
| Lead path honest | PASS | Browser test: message prepared, "Ray recibe cuando tú lo envías" |
| Typecheck, build, 13 unit tests, evidence lock | PASS | Local |
| Mobile 320–430 / tablet / desktop, no overflow | PASS | Headless Chromium |
| axe-core WCAG 2 A/AA + best practice | PASS | `/` and `/en`, 0 violations (automated only) |
| Extractor `--strict` | PASS | 0 signals (deterministic rules only) |
| Independent review (fresh context) | NOT RUN | Builder cannot approve itself |
| Real-device and screen-reader test | NOT RUN | |
| Lead destination (email or Supabase) | BLOCKED | Ray / owner to choose |
| Full business name | BLOCKED | Ray |
| Domain, canonical, social image | BLOCKED | Domain not chosen |
| Analytics property | BLOCKED | GA ID not chosen |
| Real testimonials, hours, Facebook | BLOCKED | Need Ray's proof and permission; nothing is faked meanwhile |
| Preview / production verification | NOT RUN | Nothing deployed |
| Idempotency key + receipt-only-when-stored (smart-site brief A) | PASS (local) | Duplicate key returns `duplicate`, missing key 400, receipt null without a durable store |
| Durable store: `ray_pv_private` schema + RPC in botanic-creations | PASS (DB-level, tested via SQL) | Duplicate key returns same id; changed payload 23505; empty zone rejected by constraint; 9th call from one IP rate-limited; anon/authenticated cannot execute or read; service_role can. Advisor: only INFO rls_enabled_no_policy (intended, same as thp_private) |
| Route to RPC, honest failure states | PASS (stubbed) | Stub REST server: stored→receipt, 409, 429, 502 `store_failed`. Not yet run against the live project (needs service key in Vercel env) |
| CAPTCHA, operator login/view UI, backup/restore proof, independent review | BLOCKED | `ray_pv_admin_lead_list` exists but no UI or operator auth; no CAPTCHA provider keys; no restore test |
| SMS consent, text-back, voice, booking, reviews, paid tests | HELD | Per brief; no consent wording shipped because nothing sends SMS |
