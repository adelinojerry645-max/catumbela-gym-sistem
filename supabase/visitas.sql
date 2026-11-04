-- Contador de visitas às páginas públicas (sem nomes, só números por dia).
create table if not exists public.visitas_publicas (
  dia date not null,
  pagina text not null,
  total integer not null default 0,
  primary key (dia, pagina)
);
alter table public.visitas_publicas enable row level security;

create or replace function public.registar_visita(p_pagina text)
returns void language sql security definer set search_path to 'public' as $$
  insert into visitas_publicas(dia, pagina, total)
  values ((now() at time zone 'Africa/Luanda')::date, left(coalesce(p_pagina,'?'), 20), 1)
  on conflict (dia, pagina) do update set total = visitas_publicas.total + 1;
$$;

create or replace function public.ler_visitas(p_dias integer default 7)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select coalesce(jsonb_agg(jsonb_build_object('dia', dia, 'pagina', pagina, 'total', total) order by dia desc), '[]'::jsonb)
  from visitas_publicas
  where dia >= (now() at time zone 'Africa/Luanda')::date - greatest(p_dias,1) + 1;
$$;

grant execute on function public.registar_visita(text) to anon, authenticated;
grant execute on function public.ler_visitas(integer) to anon, authenticated;
