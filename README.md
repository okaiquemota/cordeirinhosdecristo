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
| Versículo da faixa azul | `src/config/site.ts` (`VERSICULO`) |
| Títulos e chamadas das seções | `src/config/site.ts` (`TEXTOS`) |
| "Como funciona um domingo" | `src/config/site.ts` (`COMO_FUNCIONA`) |
| "Para os pais" | `src/config/site.ts` (`PARA_OS_PAIS`) |
| Eventos (um `.md` por evento) | `src/content/eventos/` |
| Fotos dos eventos | `src/assets/fotos/` |
| Cabeçalho, rodapé, cartão de evento | `src/components/` |
| Texto da página de erro | `src/pages/404.astro` |
| Logo e rosto da ovelha | `src/assets/marca/` |
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

## Sobre o texto do site

Toda a prosa vive em `src/config/site.ts`. Nenhum componente tem frase
institucional chumbada, então dá para reescrever o site inteiro sem abrir
um `.astro`.

O que está lá foi redigido como rascunho e **não foi conferido com a
igreja**. Duas seções — "Como funciona um domingo" e "Para os pais" —
estão com a lista vazia de propósito: elas descreviam cadastro, entrega e
retirada de criança, que é o tipo de informação que não pode ser chute.
O formato está comentado no arquivo; preencha e as seções voltam sozinhas.

## A marca no site

| Onde | Qual arquivo |
| --- | --- |
| Hero da home (é o `<h1>`) | `logo-colorida.png` |
| Rodapé | `logo-branca.png` |
| Cabeçalho, "Quem somos", 404 | `ovelha.png` |
| Nuvens do hero e da faixa azul | `nuvem.png` |
| Borda de nuvem entre seções | `nuvem.png` como máscara CSS |
| Favicon e ícone de celular | gerados de `ovelha.png` |

No hero a logo é a imagem dentro do `<h1>`, com o nome no `alt` — então
leitor de tela e buscador leem "Cordeirinhos de Cristo" como título da
página, e não uma imagem sem nome.

Veja `src/assets/marca/LEIA-ME.md` para trocar os arquivos e para entender
por que os `.svg` entregues não são usados direto.

## Animações

| O quê | Como |
| --- | --- |
| Nuvens em deriva, ovelha balançando | CSS puro, tokens em `global.css` |
| Reveal com stagger | Motion, por grupo, em qualquer `[data-revelar]` |
| Lightbox (zoom, teclado, arrasto) | `<dialog>` nativo + molas do Motion |
| Troca de página com morph da capa | View Transitions do Astro (`<ClientRouter />`) |

O Motion não entra no carregamento inicial de página nenhuma. Na home ele
nunca é baixado; na página do evento só quando a galeria aparece ou quando
alguém abre uma foto.

O lightbox usa `<dialog>`: o Esc, o travamento de foco e a devolução do
foco para a miniatura clicada são do navegador, não código nosso.

O arrasto segue três regras que valem para qualquer gesto no site:

1. **Retorno durante o gesto, não no fim.** A foto anda colada no dedo,
   1:1, o tempo todo.
2. **A animação herda a velocidade da soltura**, para não haver costura
   entre arrastar e animar.
3. **O destino sai da projeção do movimento**, não da distância crua —
   `posição + (v/1000)·d/(1−d)`, com `d = 0.998`, a mesma curva da
   desaceleração de rolagem. É o que faz um peteleco de 28px virar página
   e um arrasto lento de 55px voltar para o lugar.

Tudo usa mola em vez de duração fixa, porque mola parte do valor atual e
pode ser agarrada no meio do caminho. Navegar é interrompível: o índice
anda no toque e só a última transição troca a imagem, então teclar rápido
acumula em vez de perder comando.

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
