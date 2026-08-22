# Ray Puerto Vallarta — Gauntlet Ledger

## Mode
BROWNFIELD

## Classification
SELL

## Outcome
Turn the existing trades landing repository into Ray's personal Puerto Vallarta plastering lead-generation site.

## Target
Homeowners, condo owners, property managers, realtors, hospitality operators and contractors in Puerto Vallarta and Bahía de Banderas.

## Constraints
- Keep this a single focused website, not a monorepo.
- Preserve `main` as rollback baseline.
- No fabricated testimonials, ratings, certifications, customer counts or project claims.
- No stock photography presented as Ray's work.
- No AI chat or unnecessary platform complexity in v1.
- Lead path must be simple and measurable.

## Rollback baseline
`main` at `1c626cde2c0ad964f465c7f3779043b11b316405`

## Working branch
`gauntlet/ray-pv-rescue`

## Current gates

| Gate | Status | Evidence / blocker |
| --- | --- | --- |
| Scope lock | PASS | Single Ray-focused site; monorepo direction rejected |
| Rollback | PASS | Work isolated on rescue branch |
| Corrupt project component | PASS | Duplicated malformed JSX replaced with clean component |
| WhatsApp country-code handling | PASS | Mexico number normalization fixed |
| Placeholder WhatsApp safety | PASS | Known placeholder number is blocked |
| Lead form integrity | PASS | Fake console-log success removed; flow now prepares a WhatsApp quote |
| Fabricated social proof | PASS | Homepage testimonial block and hero customer/certification claims removed |
| Collins visual direction | IN PROGRESS | SaaS cards/icons/gradients reduced; warm architectural system started |
| Real business identity | BLOCKED | Need verified public name/business name |
| Real WhatsApp | BLOCKED | Need Ray's real WhatsApp number |
| Facebook identity | BLOCKED | Need verified Facebook Page/Profile URL |
| Real portfolio | BLOCKED | Need real project photography and paired before/after shots |
| Real testimonials | BLOCKED | Need customer-approved quotes/screenshots |
| SEO canonical/domain | BLOCKED | Need chosen production domain |
| Analytics | BLOCKED | Need chosen analytics property or explicit decision to run without one |
| Build/typecheck | NOT PROVEN | Workflow added; no completed GitHub Actions verification surfaced yet |
| Vercel preview | NOT PROVEN | No connected Vercel project for this repo in the current team |
| Mobile QA | NOT RUN | Requires rendered preview |
| Accessibility QA | NOT RUN | Requires rendered preview |
| Performance/Lighthouse | NOT RUN | Requires rendered preview |
| Lead receipt test | NOT RUN | Requires verified WhatsApp number |
| Release score >= 8.5/10 | FAIL | Not enough production proof yet |

## Completed rescue changes
- Created gauntlet verification workflow.
- Repaired corrupted `ProjectsEnhanced.tsx`.
- Reworked hero around Ray + Puerto Vallarta instead of generic contractor claims.
- Removed homepage fabricated testimonials and trust counters.
- Removed generic blog from primary navigation.
- Replaced emoji/SaaS service cards with editorial service presentation.
- Reworked quote form to create a structured WhatsApp lead rather than fake-submit.
- Added explicit WhatsApp configuration guard.
- Hid floating WhatsApp CTA until a real number is configured.
- Removed placeholder SEO domain and fake GA ID from runtime output.
- Made SEO/analytics environment-driven.
- Simplified footer and removed fake contact + dead privacy/terms anchors.
- Started warm plaster/stone visual system.

## Human verification inputs required
1. Ray's exact public name and preferred business name.
2. Ray's real WhatsApp number in Mexico format.
3. Verified Facebook Page/Profile URL.
4. Real project photos; ideally 3–6 projects with paired before/after images.
5. Any customer-approved testimonials or WhatsApp review screenshots.
6. Production domain choice.

## Next slices
1. Insert verified identity/contact data.
2. Build real portfolio model and project sections from supplied photography.
3. Add Facebook/Instagram share metadata and UTM campaign convention.
4. Park/noindex generic blog content until rewritten from verified field knowledge.
5. Establish Vercel preview and prove build.
6. Run mobile, accessibility, performance, SEO/schema and lead-flow gauntlet.
7. Independent taste/security/reliability review.
8. Merge only after release score reaches 8.5/10 and human approval is recorded.

## Ship rule
Do not merge or call production-ready until a real lead can travel from the rendered site to Ray's verified WhatsApp and all release proof gates pass.
