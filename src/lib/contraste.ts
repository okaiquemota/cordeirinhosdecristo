/** Cálculo de contraste WCAG 2.1 — usado pelo styleguide para mostrar
 *  números reais em vez de promessas. */

function canalLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminancia(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => canalLinear(parseInt(h.slice(i, i + 2), 16) / 255));
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

export function contraste(corA: string, corB: string): number {
  const a = luminancia(corA);
  const b = luminancia(corB);
  const [alto, baixo] = a > b ? [a, b] : [b, a];
  return (alto + 0.05) / (baixo + 0.05);
}

export type Nivel = 'AAA' | 'AA' | 'AA grande' | 'reprovado';

export function nivel(razao: number): Nivel {
  if (razao >= 7) return 'AAA';
  if (razao >= 4.5) return 'AA';
  if (razao >= 3) return 'AA grande';
  return 'reprovado';
}
