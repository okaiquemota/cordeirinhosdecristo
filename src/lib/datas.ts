/**
 * Formatação de data em pt-BR.
 *
 * As datas do frontmatter ("2026-09-13") são lidas como meia-noite UTC. Se
 * formatarmos no fuso local, no Brasil (UTC-3) isso vira 21h do dia
 * anterior e a data aparece errada por um dia. Por isso todo formatador
 * aqui força timeZone UTC.
 */

const FUSO = 'UTC';

const longa = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: FUSO,
});

const curta = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: FUSO,
});

const diaMes = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  timeZone: FUSO,
});

/** "13 de setembro de 2026" */
export const dataLonga = (d: Date) => longa.format(d);

/** "13 de set. de 2026" */
export const dataCurta = (d: Date) => curta.format(d);

/** "13 de setembro" — para quando o ano já está claro pelo contexto. */
export const dataDiaMes = (d: Date) => diaMes.format(d);

/** "2026-09-13", para o atributo datetime do <time>. */
export const dataISO = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Período de um evento: "12 e 13 de setembro de 2026" quando são dois dias
 * seguidos, "12 a 15 de setembro de 2026" quando são mais, e o mês (ou o
 * ano) repetido só quando ele muda no meio do caminho.
 */
export function periodo(inicio: Date, fim?: Date): string {
  if (!fim || fim.getTime() <= inicio.getTime()) return dataLonga(inicio);

  const mesmoAno = inicio.getUTCFullYear() === fim.getUTCFullYear();
  const mesmoMes = mesmoAno && inicio.getUTCMonth() === fim.getUTCMonth();

  const dias = Math.round((fim.getTime() - inicio.getTime()) / 86_400_000);
  const ligacao = dias === 1 ? ' e ' : ' a ';

  // "12 e 13 de setembro de 2026"
  if (mesmoMes) return `${inicio.getUTCDate()}${ligacao}${dataLonga(fim)}`;

  // "30 de setembro a 2 de outubro de 2026"
  if (mesmoAno) return `${dataDiaMes(inicio)}${ligacao}${dataLonga(fim)}`;

  // "30 de dezembro de 2026 a 2 de janeiro de 2027"
  return `${dataLonga(inicio)}${ligacao}${dataLonga(fim)}`;
}
