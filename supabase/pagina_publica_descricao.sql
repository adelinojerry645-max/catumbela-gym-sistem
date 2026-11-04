-- Mostra a descrição dos planos na página pública.
create or replace function public.pagina_publica()
returns jsonb language sql stable security definer set search_path to 'public' as $$
select jsonb_build_object(
  'ginasio', (select jsonb_build_object('morada', valor->>'morada', 'cidade', valor->>'cidade', 'telefone', valor->>'telefone', 'email', valor->>'email') from estado_app where chave = 'dadosGinasio'),
  'planos', coalesce((select jsonb_agg(jsonb_build_object('id', p->'id', 'nome', p->'nome', 'preco', p->'preco', 'duracaoDias', p->'duracaoDias', 'entradas', p->'entradas', 'descricao', p->'descricao')) from estado_app e, jsonb_array_elements(e.valor) p where e.chave = 'planos'), '[]'::jsonb),
  'config', (select valor->0 from estado_app where chave = 'paginaPublica' and jsonb_typeof(valor) = 'array')
);
$$;
