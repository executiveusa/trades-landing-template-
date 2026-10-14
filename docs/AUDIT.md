# Audit and rebuild record: Ray, yeso y acabados (Puerto Vallarta)

Mode: brownfield · Site type: local service lead-gen · Classification: SELL
Outcome: qualified quote requests (zone + job) reaching Ray on WhatsApp
Primary action: one — "Cotizar por WhatsApp" (direct) or the 4-field form (structured), both end in Ray's WhatsApp
Baseline: `main` @ `b61c740` (kept untouched as rollback). Rebuild lives on `rebuild/ray-lead-site`.

Evidence labels: **RETRIEVED** (read or measured in this session) · **USER PROVIDED** (from the original repo, unverified) · **ASSUMPTION** · **UNVERIFIED**.

---

## 1. Baseline (RETRIEVED: source read, build run, rendered at 390 and 1440 px)

| Path | Status | Evidence |
| --- | --- | --- |
| Hero CTA → wa.me | PARTIAL | Link works; number is USER PROVIDED. |
| Quote form → WhatsApp | PARTIAL | Opens WhatsApp only. If the visitor never presses send, Ray has no record. No UTM, no events. |
| Before/after slider | STATIC / DEMO | Renders "ANTES — foto pendiente" / "DESPUÉS — foto pendiente" with a working drag handle. A control that implies proof and has none. |
| Gallery (6 photos) | PARTIAL | Real photos in six equal 3:4 tiles with no order or stage labels. |
| Blog routes | UNSAFE (content) | Generic template articles ("Diseño Tropical…"); authorship unknown, nothing from or about Ray. |
| Mobile sticky CTA | BROKEN | At 390×844 the fixed bar overlays the hero headline: "Yeso y acabados" is cut by the bar (screenshot `base-390-top`). |
| Analytics | UNKNOWN | GA only if env set; no conversion events exist. |

## 2. Findings

**P0**
1. Sticky CTA covers the H1 on phones. Fix: bar appears only after the hero action leaves the screen, hides while the form is visible, never overlaps content.
2. Fake before/after. Fix: removed. Replaced with the real stage sequence (see §4).
3. Lead path is unmeasurable and leaves no record. Fix: `/api/lead` backup record + click/submit events (record sink and GA ID still need Ray's decision, see §6).

**P1**
4. H1 "Yeso y acabados" fails the two-second test on *where* and *for whom*. Now: "Yeso y aplanados en Puerto Vallarta" + one sentence on the job + one action.
5. Best asset wasted: photos 6 → 4 → 10 show the same ceiling bare, rendered, smoothed. The old page shuffled them into a grid.
6. Template fingerprint: cream + brown "calm editorial", headline over the photo behind a dark overlay, rounded image tiles. Palette now comes from the trade (plaster, cement, the orange conduit visible in Ray's photos).
7. Dead weight: 16 unused components, `framer-motion`, `motion`, `firecrawl`, Tailwind (the live page used it for three body classes), 11 stale docs and agent-instruction files, 5 one-off scripts, 2 npm scripts pointing at a `tools/` folder that does not exist, `next lint` (removed in Next 16), a duplicated 1.5 MB image pair (identical MD5) shipped in `public/`.
8. No English route. ASSUMPTION: Puerto Vallarta has many English-speaking owners; unverified for Ray's market. Cost to keep: one dictionary.

**P2** missing favicon (404 observed), no sitemap/robots, no hreflang, no skip link (source).

## 3. Extractor pass (delete before replacing)

| Element | Verdict | What is lost if removed |
| --- | --- | --- |
| "Ver trabajo" second hero CTA | REMOVE | Nothing: nav links to it; two CTAs competed. |
| Before/after placeholder | REMOVE | Nothing real. |
| Blog + 3 invented articles | REMOVE | Nothing Ray said. |
| 3 near-duplicate plaster photos | REDUCE to one | Redundant angles of one stage. |
| "Zona / Puerto Vallarta / Envía ubicación y fotos" band | REMOVE | Folded into form copy. |
| Four service lines | KEEP VERBATIM | Only service facts Ray supplied. |
| Ray's working photo | KEEP AND REPOSITION | Hero image, no text on top. |
| Orange conduit, stage order | ADD (earned) | Real signature: the work, in sequence. |

`extractor audit --strict`: 0 signals on rendered ES text, rendered EN text, `Landing.tsx`, `styles.css`. Deterministic rules only; not a quality score.

## 4. Design lock

Governing idea: **plaster is the layer between bare block and paint; show it in stages.** Comes from Ray's own photos, not a category idea.

- Type: Archivo Variable (self-hosted), expanded 800 uppercase for display, normal width for text. Sign-painter weight, not luxury serif.
- Color: plaster `#E9E8E3`, ink `#23221F`, conduit `#C8350F` (CTA and stage meter only). Contrast measured: ink/plaster 12.97, muted/plaster 5.62, white/conduit 5.29.
- Mobile: photo first (≤50 % of screen), headline and action below it, never text on photo. Action bar after the hero. Form inputs ≥17 px.
- Motion: one authored moment (stage meters fill on scroll, CSS only, off under reduced-motion, content visible without it). No scroll hijack, no libraries.
- Rejected on purpose: gradient text, glass, card grids, testimonial wall, fake counters, marquees, stock photos, serif+italic word swap, emoji icons.

## 5. Wiring map

| Control | → | Result | Status |
| --- | --- | --- | --- |
| Hero / bar / footer "WhatsApp" | `https://wa.me/523223041169?text=…` | Opens chat with greeting | VERIFIED (href checked; chat opening is the browser's) |
| Phone links | `tel:+523223041169` | Dials | VERIFIED (href) |
| Service row | sets job in form, scrolls to it | Job chip selected | VERIFIED (browser test) |
| Form submit | `window.open(wa.me…)` in the tap + `POST /api/lead` | Message ready; "Ray recibe cuando tú lo envías" shown, never "enviado" | VERIFIED (browser test, API stubbed) |
| `/api/lead` | Supabase and/or Resend if env set; else server log | Backup record | PARTIAL: handler tested, **no live sink configured** |
| Analytics events | `gtag` if `NEXT_PUBLIC_GA_ID` set | `whatsapp_click`, `call_click`, `quote_submit`, `service_select`, `lang_switch` | UNVERIFIED until an ID exists |

## 6. Evidence ledger and what is missing

| Claim on page | Status |
| --- | --- |
| Name "Ray", trade "yeso y acabados", city, phone | USER PROVIDED |
| Four services (verbatim) | USER PROVIDED |
| Photos are Ray's jobsite photos | USER PROVIDED |
| Photos 1-2-3 are the **same ceiling** at three stages | RETRIEVED visually (same conduit loop, green box, round fixture, window light). **Ray to confirm.** Captions describe only what is visible. |
| Years, prices, reviews, client counts, guarantees, response time, coverage beyond Puerto Vallarta | NOT CLAIMED. `tests/content.test.ts` fails if any appear. |

Needed from Ray, smallest first: (1) confirm the three stage photos are one job; (2) full business name; (3) where leads should land (email address, or a Supabase project); (4) domain; (5) optional, with permission: one real customer quote or a screenshot, Facebook page, hours.

Market context (RETRIEVED, Habitissimo, PV page): requests there are for tablaroca, plafones, repairs and new walls. Their price figures carry no currency or unit, so **no price appears on the site**.

## 7. Checks run (local, headless Chromium, production build)

- `tsc --noEmit` clean · `next build` clean · 13 unit tests pass · mutation test: injecting "15 años de experiencia" makes the evidence lock fail.
- Viewports 320, 360, 375, 390, 414, 430, 768, 1024, 1440 (reduced-motion on): no horizontal overflow, H1 inside viewport; action bar covers the CTA gap on 320×568.
- axe-core (wcag2a/aa/21aa + best-practice): 0 violations on `/` and `/en`.
- All tap targets ≥ 44 px; all images load; 0 console errors; keyboard order reaches the CTA in 8 tabs.
- Throttled (≈ slow 4G, 4× CPU): LCP 1.3 s warm, 4.3 s on the first request after a cold start (on-demand AVIF); CLS 0.01; ≈ 820 KB first load.

**Not done / not claimed:** no preview or production deployment (STATUS below), no real-device test, no screen-reader test, no live lead delivery, no independent reviewer. The builder wrote and checked this; a fresh-context review is the next gate.

## 8. Status

**TESTED (local).** Not READY FOR PREVIEW until a lead destination is chosen; not PRODUCTION VERIFIED.
Rollback: `git checkout main` (`b61c740`). No data migrations applied (`supabase/migrations/001_leads.sql` is unapplied).
