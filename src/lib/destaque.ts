/**
 * Marca-texto nos textos do site.ts: o trecho entre asteriscos ganha a
 * faixa de cor por trás. "Vivendo o *novo* que Deus fez." destaca "novo".
 *
 * Onde o destaque não cabe (o rodapé, por exemplo), use semMarcacao.
 */

export type Parte = { texto: string; destaque: boolean };

export function partesComDestaque(texto: string): Parte[] {
  return texto
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((parte) =>
      parte.startsWith('*') && parte.endsWith('*')
        ? { texto: parte.slice(1, -1), destaque: true }
        : { texto: parte, destaque: false },
    );
}

export const semMarcacao = (texto: string) => texto.replace(/\*([^*]+)\*/g, '$1');
