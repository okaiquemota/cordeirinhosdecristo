# Convenções deste site

## Escrita

**Nada de travessão (—) em texto que aparece na tela.** Vale para tudo que o
visitante lê: `src/config/site.ts`, os `.md` dos eventos, os textos soltos nos
componentes, `alt` de imagem e o styleguide.

Onde daria vontade de usar um, use vírgula, dois-pontos ou ponto:

    ...da comunhão — em um ambiente de carinho     ✗
    ...da comunhão, em um ambiente de carinho      ✓

    Inter no corpo — neutra e legível              ✗
    Inter no corpo: neutra e legível               ✓

Em endereço, o separador entre cidade e UF é hífen simples: `Ribeirão Preto - SP`.

Comentário de código não é texto de tela; lá o travessão é livre.

Para conferir antes de publicar:

    npm run build && grep -c "—" dist/index.html dist/eventos/index.html

## Onde mora o texto

Toda a prosa institucional está em `src/config/site.ts`. Nenhum componente tem
frase chumbada, então dá para reescrever o site inteiro sem abrir um `.astro`.
O que ainda falta preencher está marcado com `PREENCHER`:

    grep -rn PREENCHER src/

## Ritmo de trabalho

**Não verifique por conta própria.** Numa mudança pedida, faça a alteração,
confira que `npm run build` passa e pare. Nada de screenshot, varredura de
zoom, teste de comportamento no navegador ou Lighthouse a menos que a pessoa
peça. Essas verificações são caras e só valem quando ela quiser.
