-- Ray (plaster, Puerto Vallarta) lead intake.
-- Follows the pattern already used in botanic-creations (thp_private / dosa):
-- isolated schema, RLS on with no policies, SECURITY DEFINER RPC with search_path = '',
-- idempotency key + payload hash, per-IP hourly limit, EXECUTE granted to service_role only.
-- Rollback: drop schema ray_pv_private cascade; drop function public.ray_pv_create_lead, public.ray_pv_admin_lead_list;

create schema if not exists ray_pv_private;
revoke all on schema ray_pv_private from public, anon, authenticated;

create table if not exists ray_pv_private.leads (
  id          uuid primary key default gen_random_uuid(),
  request_key uuid not null unique,
  request_hash text not null,
  ip_token    text not null check (length(ip_token) = 64),
  created_at  timestamptz not null default now(),
  zona        text not null check (length(zona) between 1 and 80),
  trabajo     text not null check (length(trabajo) between 1 and 80),
  detalle     text not null default '' check (length(detalle) <= 600),
  nombre      text not null default '' check (length(nombre) <= 60),
  lang        text not null check (lang in ('es','en')),
  source      text not null default '' check (length(source) <= 120),
  status      text not null default 'new' check (status in ('new','seen','contacted','closed','spam'))
);
create index if not exists ray_pv_leads_ip_created_idx on ray_pv_private.leads (ip_token, created_at desc);
create index if not exists ray_pv_leads_created_idx on ray_pv_private.leads (created_at desc);

alter table ray_pv_private.leads enable row level security;
alter table ray_pv_private.leads force row level security;
revoke all on ray_pv_private.leads from public, anon, authenticated;
-- No policies on purpose: nothing but the SECURITY DEFINER functions below can touch the table.

create or replace function public.ray_pv_create_lead(p_payload jsonb, p_request_key uuid, p_ip_token text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_existing ray_pv_private.leads%rowtype;
  v_lead uuid;
  v_hash text;
  v_count integer;
begin
  if p_payload is null or jsonb_typeof(p_payload) <> 'object'
     or length(p_payload::text) > 4000 or p_ip_token is null or length(p_ip_token) <> 64
     or p_request_key is null then
    raise exception 'invalid_request' using errcode = '22023';
  end if;
  v_hash := md5(p_payload::text);
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext('ray_pv:' || p_request_key::text));
  select * into v_existing from ray_pv_private.leads where request_key = p_request_key;
  if found then
    if v_existing.request_hash <> v_hash then
      raise exception 'idempotency_conflict' using errcode = '23505';
    end if;
    return v_existing.id;
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext('ray_pv_ip:' || p_ip_token));
  select count(*) into v_count from ray_pv_private.leads
    where ip_token = p_ip_token and created_at > now() - interval '1 hour';
  if v_count >= 8 then raise exception 'rate_limited' using errcode = 'P0001'; end if;

  insert into ray_pv_private.leads (request_key, request_hash, ip_token, zona, trabajo, detalle, nombre, lang, source)
  values (p_request_key, v_hash, p_ip_token,
          p_payload->>'zona', p_payload->>'trabajo',
          coalesce(p_payload->>'detalle',''), coalesce(p_payload->>'nombre',''),
          coalesce(p_payload->>'lang','es'), coalesce(p_payload->>'source',''))
  returning id into v_lead;
  return v_lead;
end;
$$;

create or replace function public.ray_pv_admin_lead_list(p_limit integer default 40)
returns jsonb
language sql
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(to_jsonb(l) order by l.created_at desc), '[]'::jsonb) from (
    select id, created_at, zona, trabajo, detalle, nombre, lang, source, status
    from ray_pv_private.leads order by created_at desc limit least(greatest(p_limit,1),50)
  ) l;
$$;

revoke all on function public.ray_pv_create_lead(jsonb, uuid, text) from public, anon, authenticated;
revoke all on function public.ray_pv_admin_lead_list(integer) from public, anon, authenticated;
grant execute on function public.ray_pv_create_lead(jsonb, uuid, text) to service_role;
grant execute on function public.ray_pv_admin_lead_list(integer) to service_role;
