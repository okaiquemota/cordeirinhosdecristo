import { getCollection, type CollectionEntry } from 'astro:content';

export type Evento = CollectionEntry<'eventos'>;

/**
 * Eventos publicados, do mais recente para o mais antigo.
 *
 * Rascunhos (draft: true) aparecem no `npm run dev` para você conferir,
 * mas ficam de fora do site publicado.
 */
export async function listarEventos(): Promise<Evento[]> {
  const eventos = await getCollection('eventos', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );

  return eventos.sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

/** Os N eventos mais recentes. */
export async function eventosRecentes(quantidade: number): Promise<Evento[]> {
  return (await listarEventos()).slice(0, quantidade);
}

/** URL da página de um evento. */
export const urlEvento = (evento: Evento) => `/eventos/${evento.id}/`;

/** Nome da view transition que faz a capa do card virar o hero da página. */
export const nomeTransicaoCapa = (evento: Evento) => `capa-${evento.id}`;
