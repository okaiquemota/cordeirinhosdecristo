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
| Cabeçalho, rodapé, cartão de evento | `src/components/` |
| Texto da página de erro | `src/pages/404.astro` |
| Cores, fontes, espaçamento, animações | `src/styles/global.css` |

> Os valores ainda pendentes estão marcados com **`PREENCHER`**.
> Para achar todos: `grep -rn PREENCHER src/`

As fotos em `src/assets/fotos/tudo-se-fez-novo/` são placeholders gerados —
está escrito "FOTO DE EXEMPLO" em cada uma. Troque pelos arquivos reais
mantendo os nomes e nada mais precisa mudar, só os `alt` no `.md` do evento.

Campo vazio no `site.ts` some da página: sem telefone, o bloco de telefone
não aparece; sem `linkDrive` no evento, o botão "Ver todas as fotos" não
aparece. Nada fica com buraco.

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

## Animações

| O quê | Como |
| --- | --- |
| Nuvens em deriva, ovelha balançando | CSS puro, tokens em `global.css` |
| Reveal com stagger na galeria | Motion, carregado só quando a galeria entra em tela |
| Lightbox (zoom, teclado, swipe) | `<dialog>` nativo + Motion, carregado no primeiro clique |
| Troca de página com morph da capa | View Transitions do Astro (`<ClientRouter />`) |

O Motion não entra no carregamento inicial de página nenhuma. Na home ele
nunca é baixado; na página do evento só quando a galeria aparece ou quando
alguém abre uma foto.

O lightbox usa `<dialog>`: o Esc, o travamento de foco e a devolução do
foco para a miniatura clicada são do navegador, não código nosso. As setas
do teclado, o swipe e o zoom são nossos.

O cabeçalho é persistido entre navegações (`transition:persist`) para não
piscar, e por isso um script reajusta qual item está marcado como atual a
cada troca de página — senão ele ficaria congelado no estado da página
anterior, inclusive no `aria-current`.

## Acessibilidade

- Todo texto passa em WCAG AA sobre o fundo creme (conferido no build).
- Movimento respeita `prefers-reduced-motion`: animação decorativa desliga,
  transição vira fade curto.
- Ilustrações são `aria-hidden` — elas não carregam informação.
- Sem scroll horizontal a partir de 320px de largura (WCAG 1.4.10).
- Sem JavaScript, o conteúdo aparece inteiro: o reveal só esconde elemento
  quando detecta que o JS está vivo.

## Desempenho medido

Lighthouse rodando contra o `npm run preview`, home e página de evento:

| | Home | Evento |
| --- | --- | --- |
| Performance | 100 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| CLS | 0 | 0 |
| Total Blocking Time | 0 ms | 0 ms |
| Peso da página | 115 KB | 118 KB |

São números de localhost, então a rede real vai render menos. O que
importa deles é o CLS zerado (proporção travada em todo container de
imagem) e o TBT zerado (quase nada de JS no carregamento).

## Deploy

Hospedagem na Vercel, a partir deste repositório. O `vercel.json` guarda
três coisas:

- **`trailingSlash: true`** — tem que bater com o `trailingSlash: 'always'`
  do `astro.config.mjs`. Se os dois discordarem, cada link vira um
  redirecionamento.
- **Cache eterno em `/_astro/`** — todo arquivo ali tem hash no nome, então
  conteúdo novo significa URL nova. Pode ser guardado para sempre sem risco
  de alguém ver versão velha. O HTML fica de fora, porque o nome dele não
  muda.
- **Três cabeçalhos de segurança** — `nosniff`, `Referrer-Policy` e
  `X-Frame-Options`.

O build é `npm run build`, que roda `astro check` antes. Erro de tipo ou de
frontmatter derruba o deploy em vez de publicar página quebrada.

### Apontar o domínio

Depois do primeiro deploy, no painel da Vercel: Settings → Domains →
adicionar `cordeirinhosdecristo.com.br`. A Vercel mostra o registro de DNS
para configurar no registrador.
