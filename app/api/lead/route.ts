import { validateLead, readKey, type LeadInput } from '@/lib/lead'

export const runtime = 'nodejs'

// Best-effort limiter. Serverless instances do not share memory, so this only slows
// a single noisy client on a warm instance. Real abuse control belongs at the edge.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 6

function limited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  }
  return recent.length > MAX_HITS
}

type Lead = Omit<LeadInput, 'website'>

type StoreResult = { status: 'stored'; receipt: string } | { status: 'unconfigured' } | { status: 'conflict' | 'limited' | 'failed' }

/** sha256(ip + salt) as 64 hex chars. The raw IP is never stored. */
async function ipToken(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`${ip}|${process.env.LEAD_IP_SALT || ''}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Durable store: the ray_pv_create_lead RPC (supabase/migrations/001_ray_pv_leads.sql).
 * Idempotent on `key`, rate-limited per hashed IP, callable by the service role only.
 */
async function storeInSupabase(lead: Lead, key: string, ip: string): Promise<StoreResult> {
  const url = process.env.SUPABASE_URL
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !svc) return { status: 'unconfigured' }
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/ray_pv_create_lead`, {
      method: 'POST',
      headers: { apikey: svc, Authorization: `Bearer ${svc}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_payload: lead, p_request_key: key, p_ip_token: await ipToken(ip) }),
      signal: AbortSignal.timeout(5000),
    })
    if (res.ok) {
      const id = await res.json()
      return typeof id === 'string' ? { status: 'stored', receipt: id } : { status: 'failed' }
    }
    const err = (await res.json().catch(() => ({}))) as { code?: string }
    if (err.code === '23505') return { status: 'conflict' }
    if (err.code === 'P0001') return { status: 'limited' }
    return { status: 'failed' }
  } catch {
    return { status: 'failed' }
  }
}

/** Email Ray when configured (Resend). */
async function notifyByEmail(lead: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFY_EMAIL
  const from = process.env.LEAD_FROM_EMAIL
  if (!key || !to || !from) return false
  const text = [
    `Zona: ${lead.zona}`,
    `Trabajo: ${lead.trabajo}`,
    lead.detalle ? `Detalle: ${lead.detalle}` : '',
    lead.nombre ? `Nombre: ${lead.nombre}` : '',
    `Idioma: ${lead.lang}`,
    lead.source ? `Origen: ${lead.source}` : '',
    '',
    'Esta persona abrió WhatsApp con este mensaje. Solo es contacto real si te escribe.',
  ]
    .filter(Boolean)
    .join('\n')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject: `Solicitud de cotización: ${lead.zona}`, text }),
    signal: AbortSignal.timeout(4000),
  })
  return res.ok
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
  if (limited(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const result = validateLead(body)
  if (!result.ok && result.bot) return Response.json({ ok: true, stored: false }) // silent drop
  if (!result.ok) return Response.json({ ok: false, errors: result.errors }, { status: 400 })

  const key = readKey(body)
  if (!key) return Response.json({ ok: false, error: 'missing_key' }, { status: 400 })

  const [stored, emailed] = await Promise.all([
    storeInSupabase(result.lead, key, ip),
    notifyByEmail(result.lead).catch(() => false),
  ])

  if (stored.status === 'conflict') return Response.json({ ok: false, error: 'idempotency_conflict' }, { status: 409 })
  if (stored.status === 'limited') return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  // Configured but the write did not land: say so. Never report success for a lost lead.
  if (stored.status === 'failed') {
    console.error('[lead:store_failed]', key)
    return Response.json({ ok: false, error: 'store_failed', emailed }, { status: 502 })
  }
  if (stored.status === 'unconfigured' && !emailed) console.info('[lead:unsinked]', JSON.stringify(result.lead))

  // A receipt exists only when the durable store confirmed the write. Email or logs never count.
  return Response.json({
    ok: true,
    stored: stored.status === 'stored',
    emailed,
    receipt: stored.status === 'stored' ? stored.receipt : null,
  })
}
