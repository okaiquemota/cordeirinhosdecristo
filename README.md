# Cordeirinhos de Cristo

Site do departamento infantil da IEADERP Casa Grande, em Ribeirão Preto.
Astro + TypeScript + Tailwind, sem CMS: o conteúdo mora no código.

Produção: <https://cordeirinhosdecristo.com.br>

## Rodar

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # roda astro check e gera dist/
npm run preview  # serve o dist/
```

## Como o site é feito de páginas

São duas, e só duas:

- **a home**, que é uma página só, dividida em seções com âncora
  (`#quem-somos`, `#lideranca`, `#ultimos-eventos`, `#contato`);
- **uma página por evento**, em `/eventos/<slug>/`, gerada a partir dos
  arquivos de `src/content/eventos/`.

Não existe página de lista de eventos. Ela existiu e foi removida: com um
evento só, ela mostrava um cartão sozinho que a home já mostrava. O menu e
os botões que apontavam para ela agora apontam para a âncora da seção.

## Onde mexer no conteúdo

| O quê | Arquivo |
| --- | --- |
| Igreja, Instagram, telefone, endereço, mapa | `src/config/site.ts` (`SITE`, `CONTATO`) |
| "Quem somos" | `src/config/site.ts` (`QUEM_SOMOS`) |
| "Quem cuida das crianças" | `src/config/site.ts` (`LIDERANCA`) |
| Versículo da faixa azul | `src/config/site.ts` (`VERSICULO`) |
| Títulos e chamadas das seções | `src/config/site.ts` (`TEXTOS`) |
| Itens do menu e do rodapé | `src/config/site.ts` (`NAVEGACAO`, `RODAPE`) |
| Eventos (um `.md` por evento) | `src/content/eventos/` |
| Fotos | `src/assets/fotos/` |
| Texto da página de erro | `src/pages/404.astro` |
| Logo e ilustrações | `src/assets/marca/` |
| Cores, fontes, espaçamento, animações | `src/styles/global.css` |

> O que ainda falta preencher está marcado com **`PREENCHER`**.
> Para achar todos: `grep -rn PREENCHER src/`

**Campo vazio some da página.** Sem telefone, a linha de telefone não
aparece; sem `linkDrive` no evento, o botão "Ver todas as fotos" não
aparece; com a lista de parágrafos vazia, a seção inteira some. Nada fica
com buraco, e nada precisa de `if` no componente.

O contrário também vale, e é bom saber: **preencher um campo acende a coisa
sozinha.** Três seções estão hoje apagadas por lista vazia de propósito:
`COMO_FUNCIONA`, `PARA_OS_PAIS` e `HORARIOS`. Elas descreviam cadastro,
entrega e retirada de criança, que não pode ser chute. O formato está
comentado no arquivo.

### Trocar as fotos

As de `src/assets/fotos/tudo-se-fez-novo/galeria-*.jpg` ainda são exemplos
gerados, com "FOTO DE EXEMPLO" escrito nelas. As outras quatro já são
reais.

Suba o arquivo novo com o mesmo nome e mais nada precisa mudar: as molduras
saem da proporção de cada arquivo, então foto deitada, em pé ou quadrada
entram sem corte. Só os `alt` no `.md` do evento precisam ser reescritos,
porque descrevem o que está na foto.

## Sistema de design

Rode `npm run dev` e abra **`/styleguide`**: a página mostra a paleta com os
contrastes calculados no build, a escala tipográfica, as peças base e as
animações. Ela é `noindex` e fica fora do sitemap, mas continua no build,
para servir de referência na hora de montar página nova.

Regra da paleta: **tom 600 ou mais escuro para texto**; 100 a 400 são para
preenchimento e decoração.

A escala chamada `creme` já foi bege. Hoje o fundo é branco e ela corre por
cima dele: 50 e 100 são branco, 200 é o realce de passagem do mouse, 300 é
borda, 400 é o cinza mais forte. O nome ficou para não mexer em dezenas de
classes sem mudar um pixel.

Os traços que levam a marca para as partes brancas da página:

- **Rabisco** (`ilustracoes/Rabisco.astro`): o traço ondulado sob cada
  título de seção. Rosa sobre o branco, rosa claro sobre o azul escuro.
- **Papel atrás da foto**: um bloco colorido girado 3° por trás das fotos
  de "Quem somos" (azul) e "Liderança" (rosa), como foto colada em
  cartolina.
- **Marca-texto**: `*palavra*` num texto do `site.ts` vira um traço de
  marcador rosa na metade de baixo da palavra.
- **Faixa**: duas linhas de frases, uma cheia e uma vazada. A vazada pinta
  o contorno antes do preenchimento (`paint-order`), porque a Baloo monta
  as letras com contornos sobrepostos e um miolo transparente mostraria as
  emendas por dentro delas.

## Fontes

Baloo 2 (títulos) e Inter (corpo) estão versionadas em `src/assets/fontes/`,
só o subconjunto latino. O build não fala com Google Fonts nem com CDN
nenhum. Veja `src/assets/fontes/LEIA-ME.md` para atualizar.

## A marca no site

| Onde | Qual arquivo |
| --- | --- |
| Capa da home (é o `<h1>`) | `logo-colorida.png` |
| Cabeçalho | `logo-escura.png` |
| Rodapé | `logo-branca.png` |
| "Quem somos" e 404 | `ovelha.png` |
| Nuvens que derivam | `nuvem.png` |
| Borda de nuvem entre seções | SVG de círculos, em `BordaNuvem.astro` |
| Favicon e ícone de celular | gerados de `ovelha.png` |

Na capa a logo é a imagem dentro do `<h1>`, com o nome no `alt`: leitor de
tela e buscador leem "Cordeirinhos de Cristo" como título da página, e não
uma imagem sem nome.

Veja `src/assets/marca/LEIA-ME.md` para trocar os arquivos, e para entender
por que os `.svg` entregues não são usados direto.

## Animações e gestos

O movimento segue o padrão da MovCode, com a mesma stack do movcode.com.br:
**GSAP + ScrollTrigger + Lenis**, e os mesmos valores de entrada. Tudo mora
em `src/components/Movimento.astro`, ligado por atributos na marcação:

| Marca | O que faz |
| --- | --- |
| `data-titulo` | o título entra palavra por palavra, subindo e saindo do desfoque |
| `data-revelar` | o bloco sobe e aparece ao entrar na tela |
| `data-rabisco` | o traço sob o título se desenha da esquerda para a direita |
| `data-revelar-grupo` | os `data-revelar` de dentro entram em cascata |
| `data-foto-entrada` | a foto assenta de 112% para 100% dentro da moldura |
| `data-hero` | a capa: entrada ao abrir, parallax das nuvens ao rolar |
| `data-faixa` | a faixa de frases, que acelera e inclina com a rolagem |
| `*palavra*` no `site.ts` | marca-texto que se pinta da esquerda para a direita |

| O quê | Como |
| --- | --- |
| Rolagem suave (roda do mouse e âncoras) | Lenis; no toque a rolagem é a nativa |
| Nuvens em deriva, ovelha balançando | CSS puro, tokens em `global.css` |
| Lightbox: abrir, navegar, arrastar, pinça | `<dialog>` nativo + molas do Motion |
| Menu do celular | altura de `0fr` a `1fr`, CSS puro |
| Item de menu que acende sozinho | espião de seções, em `Cabecalho.astro` |
| Troca de página com morph da capa | View Transitions (`<ClientRouter />`) |

Tudo isso só acrescenta. O CSS esconde os elementos antes do script chegar,
mas uma rede de segurança solta tudo sozinha em 3s se o script não assumir,
e se o script quebrar no meio ele mesmo devolve a página ao estado parado.
A logo da capa nunca é escondida: ela é o maior elemento da primeira tela e
é por ela que se mede a velocidade de abertura.

O Motion continua só no lightbox e é baixado quando alguém abre uma foto.

O lightbox usa `<dialog>`: o Esc, o travamento de foco e a devolução do foco
para a miniatura clicada são do navegador, não código nosso.

### As três regras do arrasto

1. **Retorno durante o gesto, não no fim.** A foto anda colada no dedo,
   1:1, o tempo todo.
2. **A animação herda a velocidade da soltura**, para não haver costura
   entre arrastar e animar.
3. **O destino sai da projeção do movimento**, não da distância crua:
   `posição + (v/1000)·d/(1−d)`, com `d = 0.998`, a mesma curva da
   desaceleração de rolagem. É o que faz um peteleco de 28px virar página
   e um arrasto lento de 55px voltar para o lugar.

Tudo usa mola em vez de duração fixa, porque mola parte do valor atual e
pode ser agarrada no meio do caminho. Navegar é interrompível: o índice anda
no toque e só a última transição troca a imagem, então teclar rápido acumula
em vez de perder comando.

Com a foto ampliada, um dedo passeia por ela em vez de trocar de foto.

### Três armadilhas que já morderam aqui

Estão documentadas no código, mas vale saber de antemão:

- **A classe `transition` do Tailwind cobre dezoito propriedades**, entre
  elas `opacity`, `transform` e `filter`. Num elemento que o GSAP anima,
  cada quadro escrito abre uma transição perseguindo o valor seguinte, e a
  animação sai tremida. Liste as propriedades
  (`transition-[translate,box-shadow]`) ou anime um invólucro: é por isso
  que as fotos com zoom no hover entram por um `data-foto-entrada` em volta
  delas, e não pela própria imagem.
- **Escrever atributo a cada quadro de rolagem invalida o estilo.** Com um
  cabeçalho de `backdrop-blur` em cima, isso repinta a barra toda e a página
  pisca no celular. Leia a cada quadro, escreva só quando mudar.
- **`overflow-hidden` não apara o `padding` nem a borda do próprio
  elemento.** Numa caixa que anima de altura zero, os dois precisam estar
  num filho.

## Acessibilidade

- Todo texto passa em WCAG AA sobre o fundo branco, medido e não estimado.
- Movimento respeita `prefers-reduced-motion`: animação decorativa desliga,
  transição vira fade curto. As nuvens ficam congeladas no meio da deriva,
  espalhadas pelo céu; antes elas voltavam todas para o ponto de partida e
  se empilhavam na borda esquerda.
- Ilustrações são `aria-hidden`: elas não carregam informação.
- Sem rolagem horizontal a partir de 320px (WCAG 1.4.10).
- Sem JavaScript o conteúdo aparece inteiro: o movimento só esconde
  elemento quando detecta que o JS está vivo, e uma rede em CSS solta tudo
  em 3s se o script não assumir.
- Os títulos divididos em palavras continuam inteiros para o leitor de
  tela: num título, o rótulo vai no próprio elemento; num parágrafo (o tema
  da capa, o versículo), o texto inteiro vai em `sr-only` e a versão
  dividida fica `aria-hidden`.
- O cabeçalho é persistido entre navegações para não piscar, e por isso um
  script reajusta a cada troca de página qual item está marcado como atual,
  inclusive o `aria-current`.

## Desempenho medido

Lighthouse contra `npm run preview`, três execuções por página. **Medição
anterior ao GSAP:** o script de movimento acrescenta 53 KB (gzip) à home e
ao evento, e estes números precisam ser refeitos.

| | Home | Evento |
| --- | --- | --- |
| Performance | 95 a 99 | 99 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| CLS | 0 | 0 |
| Peso da página | 365 KB | 205 KB |

São números de localhost; a rede real rende menos. O que importa deles é o
CLS zerado, que vem de toda moldura de imagem ter proporção declarada antes
da imagem chegar.

O peso é quase todo foto. Os originais estão em 2880px de largura, mais do
que qualquer tela usa: isso não pesa no site, porque o `astro:assets` serve
versões menores, só no repositório.

## Deploy

Hospedagem na Vercel, a partir deste repositório, com o domínio já apontado.
Todo push em `main` publica.

O `vercel.json` guarda três coisas:

- **`trailingSlash: true`**, que tem que bater com o `trailingSlash:
  'always'` do `astro.config.mjs`. Se os dois discordarem, cada link vira um
  redirecionamento.
- **Cache eterno em `/_astro/`**: todo arquivo ali tem hash no nome, então
  conteúdo novo significa URL nova e pode ser guardado para sempre. O HTML
  fica de fora, porque o nome dele não muda.
- **Três cabeçalhos de segurança**: `nosniff`, `Referrer-Policy` e
  `X-Frame-Options`.

O build roda `astro check` antes de gerar: erro de tipo ou de frontmatter
derruba o deploy em vez de publicar página quebrada.

## Convenções

Estão no `CLAUDE.md`, na raiz. A principal: **nada de travessão em texto que
aparece na tela.**
