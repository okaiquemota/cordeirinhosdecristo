# Cordeirinhos de Cristo

Site do departamento infantil. Astro + TypeScript + Tailwind, sem CMS —
o conteúdo mora no código.

## Rodar

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # roda astro check e gera dist/
npm run preview  # serve o dist/
```

## Onde mexer no conteúdo

| O quê | Arquivo |
| --- | --- |
| Nome da igreja, horários, Instagram, endereço | `src/config/site.ts` |
| Eventos (um `.md` por evento) | `src/content/eventos/` |
| Fotos dos eventos | `src/assets/fotos/` |
| Cores, fontes, espaçamento, animações | `src/styles/global.css` |

> Os valores ainda pendentes estão marcados com **`PREENCHER`**.
> Para achar todos: `grep -rn PREENCHER src/`

## Sistema de design

Rode `npm run dev` e abra **`/styleguide`** — a página mostra a paleta com os
contrastes calculados no build, a escala tipográfica, as peças base e as
animações. Ela é `noindex` e fica fora do sitemap, então não vaza para o
Google, mas também não é removida do build: serve de referência na hora de
montar página nova.

Regra da paleta: **tom 600 ou mais escuro para texto**; 100–400 são para
preenchimento e decoração. O styleguide mostra isso tom a tom.

## Fontes

Baloo 2 (títulos) e Inter (corpo) estão versionadas em `src/assets/fontes/`,
só o subconjunto latino. O build não fala com Google Fonts nem com CDN
nenhum. Veja `src/assets/fontes/LEIA-ME.md` para atualizar.

## Acessibilidade

- Todo texto passa em WCAG AA sobre o fundo creme (conferido no build).
- Movimento respeita `prefers-reduced-motion`: animação decorativa desliga,
  transição vira fade curto.
- Ilustrações são `aria-hidden` — elas não carregam informação.
