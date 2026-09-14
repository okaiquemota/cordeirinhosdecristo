import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Eventos do departamento. Um arquivo .md por evento em src/content/eventos.
 * O nome do arquivo vira a URL: "tudo-se-fez-novo.md" -> /eventos/tudo-se-fez-novo
 *
 * Toda imagem é declarada como { src, alt } em vez de só o caminho. É um
 * campo a mais para escrever, mas garante que nenhuma foto entre no site
 * sem texto alternativo — quem usa leitor de tela depende disso, e o alt
 * também é o que aparece se a imagem falhar em carregar.
 */
const imagemComAlt = (image: SchemaContext['image']) =>
  z.object({
    src: image(),
    /** Descreva o que se vê na foto, não "foto do evento". */
    alt: z.string().min(1, 'Toda foto precisa de um alt descritivo.'),
  });

const eventos = defineCollection({
  loader: glob({ base: './src/content/eventos', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      /** Título do evento, como aparece no card e no topo da página. */
      titulo: z.string(),

      /** Data do evento (AAAA-MM-DD). Ordena a listagem, mais recente primeiro. */
      data: z.coerce.date(),

      /** Uma ou duas frases. Aparece no card e na descrição da página. */
      resumo: z.string(),

      /** Foto de capa: card da listagem, topo da página e card do WhatsApp. */
      capa: imagemComAlt(image),

      /** Fotos da galeria. Pode ficar vazia. */
      galeria: z.array(imagemComAlt(image)).default([]),

      /** Link da pasta do Drive. Sem ele, o botão "Ver todas as fotos" não aparece. */
      linkDrive: z.url().optional(),

      /** true esconde o evento do site (mas mantém o arquivo aqui). */
      draft: z.boolean().default(false),
    }),
});

export const collections = { eventos };
