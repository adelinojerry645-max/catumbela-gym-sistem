# Catumbela Gym System

Projeto React + Vite + Tailwind, pronto a ligar ao Supabase.

## 1. Instalar (no teu computador, com Node.js instalado)

```bash
npm install
```

## 2. Testar localmente

```bash
npm run dev
```
Abre o endereço que aparecer no terminal (normalmente `http://localhost:5173`).
Neste ponto a app já funciona com **dados de exemplo em memória** — tal como no protótipo que testaste.

## 3. Ligar à base de dados real (Supabase)

1. Cria uma conta grátis em **supabase.com** e um novo projeto.
2. Em **SQL Editor**, cola o conteúdo de `schema.sql` (na raiz deste projeto) e executa. Isto cria todas as tabelas.
3. Em **Project Settings → API**, copia o `Project URL` e a chave `anon public`.
4. Copia `.env.example` para `.env` e cola esses valores:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxx
   ```
5. As funções prontas para ligar cada ecrã à base de dados estão em `src/lib/api.js`
   (listar/criar membros, planos com histórico de preço, pagamentos, produtos, acessos, e autenticação).
   Em `src/App.jsx`, substitui os `useState(MEMBROS_INICIAIS)` (e semelhantes) por
   `useEffect` que chamam essas funções — isto ainda precisa de ser feito manualmente,
   ecrã a ecrã, porque cada tela tem a sua própria lógica de mock.

## 4. Publicar na internet

A forma mais simples é o **Vercel**:

1. Cria um repositório no GitHub e envia este projeto:
   ```bash
   git init
   git add .
   git commit -m "Catumbela Gym System"
   git remote add origin <URL do teu repositório>
   git push -u origin main
   ```
2. Em **vercel.com**, clica em "Add New Project", escolhe o repositório.
3. O Vercel deteta Vite automaticamente. Antes de publicar, em **Environment Variables**,
   adiciona `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os mesmos valores do `.env`.
4. Clica em **Deploy**. Em ~1 minuto tens um URL público, ex.: `catumbela-gym.vercel.app`.

Alternativa: **Netlify** funciona de forma muito semelhante (arrastas a pasta `dist`
gerada por `npm run build`, ou ligas o repositório do GitHub).

## Estrutura

```
├── src/
│   ├── App.jsx              # toda a aplicação (login, dashboard, membros, planos, etc.)
│   ├── main.jsx              # ponto de entrada React
│   ├── index.css             # Tailwind
│   └── lib/
│       ├── supabaseClient.js # ligação ao Supabase
│       └── api.js            # funções prontas para ler/escrever nas tabelas
├── schema.sql                 # esquema completo da base de dados
├── .env.example                # modelo das variáveis de ambiente
└── package.json
```
