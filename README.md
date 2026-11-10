# A Moda Camis: vitrine digital

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Supabase.
Direção de arte e análise da marca: [DESIGN.md](DESIGN.md).

## Rodar

```bash
npm install
npm run dev   # http://localhost:3000
```

Sem Supabase configurado, o site usa o conteúdo de `src/lib/seed.ts` (levantado do Instagram).

## Variáveis de ambiente (`.env.local`)

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Banco, imagens e login do painel |
| `NEXT_PUBLIC_SITE_URL` | Domínio final (metadados, sitemap) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (opcional) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Verificação do Google Search Console |

## Supabase

1. Crie um projeto e rode `supabase/schema.sql` no SQL Editor.
2. Cadastre as usuárias da equipe em Authentication e adicione o `user_id` em `public.admins`.

## Status (etapa 1)

- [x] Análise da marca e direção de arte
- [x] HOME completa, sacola de interesse e mensagens de WhatsApp
- [x] SEO base: metadados, Open Graph, JSON-LD de loja, sitemap e robots
- [ ] Vitrine com filtros, página de produto com zoom e páginas de coleção
- [ ] Sobre e Contato
- [ ] Painel administrativo (login com Supabase Auth, CRUD e upload de imagens)

## Pendências da loja

- Logo vetorial (SVG/PDF), endereço completo, história e valores da marca
- Preços, tamanhos e nomes confirmados das peças
- Confirmação de direitos de uso das fotos de campanha das marcas fornecedoras
