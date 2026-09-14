# Fontes

Arquivos versionados no repositório de propósito: o build não depende de
Google Fonts nem de CDN nenhum, então ele roda offline e dá sempre o mesmo
resultado.

| Arquivo | Família | Eixo | Origem |
| --- | --- | --- | --- |
| `baloo-2-latin-variable.woff2` | Baloo 2 | peso 400–800 | `@fontsource-variable/baloo-2@5.3.0` |
| `inter-latin-variable.woff2` | Inter | peso 100–900 | `@fontsource-variable/inter@5.3.0` |

Só o subconjunto **latin** está aqui — é o que o português precisa
(á, â, ã, ç, é, ê, í, ó, ô, õ, ú estão todos nele). Os subconjuntos
cirílico, grego, devanágari e vietnamita foram deixados de fora.

Ambas as famílias são licenciadas sob a SIL Open Font License 1.1
(veja os arquivos `LICENSE-*.txt`).

## Para atualizar

```sh
npm i -D @fontsource-variable/baloo-2 @fontsource-variable/inter
cp node_modules/@fontsource-variable/baloo-2/files/baloo-2-latin-wght-normal.woff2 \
   src/assets/fontes/baloo-2-latin-variable.woff2
cp node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2 \
   src/assets/fontes/inter-latin-variable.woff2
npm rm @fontsource-variable/baloo-2 @fontsource-variable/inter
```
