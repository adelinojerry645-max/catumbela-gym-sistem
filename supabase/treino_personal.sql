-- Treino do dia feito pelo personal (página pública /treino/). Senha inicial: CG-PT-4821
create table if not exists public.treino_personal (
  data date not null,
  sexo text not null check (sexo in ('m','f')),
  titulo text not null default '',
  nota text not null default '',
  exercicios jsonb not null default '[]'::jsonb,
  atualizado_em timestamptz not null default now(),
  primary key (data, sexo)
);
alter table public.treino_personal enable row level security;
create table if not exists public.config_treino_personal (
  id int primary key default 1 check (id = 1),
  senha_hash text not null
);
alter table public.config_treino_personal enable row level security;
insert into public.config_treino_personal (id, senha_hash)
values (1, encode(sha256(convert_to('catumbela-pt:' || 'CG-PT-4821', 'utf8')), 'hex'))
on conflict (id) do nothing;
create or replace function public.treino_personal_senha_ok(p_senha text)
returns boolean language sql security definer set search_path = public as $$
  select exists (select 1 from public.config_treino_personal
    where senha_hash = encode(sha256(convert_to('catumbela-pt:' || coalesce(p_senha,''), 'utf8')), 'hex'));
$$;
create or replace function public.treino_personal_listar()
returns table (data date, sexo text, titulo text, nota text, exercicios jsonb)
language sql security definer set search_path = public as $$
  select t.data, t.sexo, t.titulo, t.nota, t.exercicios
  from public.treino_personal t
  where t.data >= (now() at time zone 'Africa/Luanda')::date - 1
  order by t.data;
$$;
create or replace function public.treino_personal_validar(p_senha text)
returns boolean language sql security definer set search_path = public as $$
  select public.treino_personal_senha_ok(p_senha);
$$;
create or replace function public.treino_personal_guardar(p_senha text, p_data date, p_sexo text, p_titulo text, p_nota text, p_exercicios jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not public.treino_personal_senha_ok(p_senha) then return false; end if;
  if p_sexo not in ('m','f') then return false; end if;
  if jsonb_typeof(p_exercicios) <> 'array' or jsonb_array_length(p_exercicios) > 30 then return false; end if;
  insert into public.treino_personal (data, sexo, titulo, nota, exercicios, atualizado_em)
  values (p_data, p_sexo, left(coalesce(p_titulo,''), 80), left(coalesce(p_nota,''), 400), p_exercicios, now())
  on conflict (data, sexo) do update
    set titulo = excluded.titulo, nota = excluded.nota, exercicios = excluded.exercicios, atualizado_em = now();
  return true;
end $$;
create or replace function public.treino_personal_apagar(p_senha text, p_data date, p_sexo text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not public.treino_personal_senha_ok(p_senha) then return false; end if;
  delete from public.treino_personal where data = p_data and sexo = p_sexo;
  return true;
end $$;
revoke all on function public.treino_personal_senha_ok(text) from public, anon, authenticated;
grant execute on function public.treino_personal_listar() to anon, authenticated;
grant execute on function public.treino_personal_validar(text) to anon, authenticated;
grant execute on function public.treino_personal_guardar(text, date, text, text, text, jsonb) to anon, authenticated;
grant execute on function public.treino_personal_apagar(text, date, text) to anon, authenticated;
