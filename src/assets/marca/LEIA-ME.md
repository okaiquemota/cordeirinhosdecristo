# Arquivos da marca

## O que o site usa

| Arquivo | O que é | Tamanho | Onde aparece |
| --- | --- | --- | --- |
| `logo-colorida.png` | Logo completa, colorida | 1027×492 | capa da home |
| `logo-escura.png` | Logo completa, em tinta escura | 1200×584 | cabeçalho |
| `logo-branca.png` | Logo completa, em branco | 1200×584 | rodapé |
| `ovelha.png` | Rosto do cordeirinho, sozinho | 560×483 | "Quem somos" e 404 |
| `nuvem.png` | Nuvem da marca | 442×383 | nuvens que derivam |

Todos têm fundo transparente e já vêm sem margem sobrando. Quem monta as
versões finais é o `astro:assets`, que gera WebP nos tamanhos que cada lugar
do site precisa.

`logo-escura.png` não veio de vocês: ela é a `logo-branca.png` com o canal
de transparência tingido em `tinta-900`, porque a branca some no creme do
cabeçalho. É o mesmo desenho, só a cor muda. Se um dia trocarem a branca,
esta precisa ser gerada de novo a partir dela.

## Os originais

`originais/` guarda os arquivos exatamente como foram entregues.

Um detalhe que vale saber: os dois `.svg` entregues **não são vetor**.
São um invólucro SVG com PNG embutido em base64 e filtros de máscara por
cima — `CdC-logo-colorida.svg` tem seis PNGs de 1230×1064 dentro, e
`CdC-ovelha.svg` tem dois de 2050×1772. Por isso:

- usar o `.svg` direto no site significaria baixar 1 MB por página;
- e a cor não pode vir do CSS, porque não há caminho vetorial para pintar.

Então os PNGs da tabela acima foram compostos a partir deles no navegador,
com transparência, e é o que o site carrega. Se um dia aparecer a logo em
vetor de verdade, ela substitui tudo isso com vantagem.

## Para trocar

Suba o arquivo novo com o mesmo nome. Se as proporções mudarem, confira o
cabeçalho e o rodapé, que são onde a logo aparece em tamanho fixo.
