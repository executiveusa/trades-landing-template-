# Independent preview check, 2026-10-14

Scope: local source and browser verification only. No live deployment, database test, CI run, or production claim yet.

- Archive ZIP integrity passed. Seven supplied JPGs opened and inspected. No photos regenerated or replaced.
- Main read back at b61c7405e4958ad39eb590a8cbfa9402cb9fdfec. Author commit history not in archive; this branch is reconstructed from the archive over main.
- Trademark folder encoding restored locally. Private brand folder withheld from public commit.
- Original npm audit: source-map-js event-loop denial of service, GHSA-68fv-2mgg-jv7q. Lock-only patch from 1.2.1 to 1.2.2; audit now zero vulnerabilities.
- Removed automatic production-domain fallback. Canonical and OG image absent locally; sitemap empty without a selected site URL.
- Accessible names repaired without changing visible copy. Automated axe checks on ES and EN report zero violations after repair.
- Typecheck, 14 unit tests, production build pass. Expected routes present.
- Desktop and 390x844 mobile pixels inspected. Primary CTA visible, no horizontal overflow. Sticky bar hidden on initial hero, visible after scrolling, absent while form is in view.
- Local form validation and WhatsApp-ready confirmation checked using an intercepted API response. No message sent and no database write. This is not live lead proof.
- robots.txt, sitemap.xml and og.jpg return HTTP 200 locally.

## Remaining gates

- Push and CI; Vercel preview and exact environment configuration; real receipt and database row; same-key duplicate check; targeted cleanup.
- Stage heading states one ceiling at three stages. Ray confirmation is missing; visible copy deliberately left unchanged pending owner decision.
- The form uses a new key for each submit and ignores the backup API response. API same-key idempotency does not establish double-tap prevention in the form; API failure states are not shown to the visitor.
- No real-device, screen-reader, analytics, backup/restore, or production verification.
- Visual style retains a four-line desktop headline and an inverted form section. This does not clear the strict visual release bar merely because it renders without overflow.

Status: NOT READY for production. Local preview checks pass with the stated remaining gates.
