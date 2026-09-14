import { getImage } from 'astro:assets';
import { SITE } from '../config/site';

/**
 * URL absoluta de uma imagem 1200x630 em JPEG, para o og:image.
 *
 * Absoluta porque o WhatsApp e o Facebook não resolvem caminho relativo.
 * JPEG porque nem todo pré-visualizador de link lê WebP — dentro do site
 * as imagens continuam em WebP, isso aqui é só para o card compartilhado.
 */
export async function urlOg(src: ImageMetadata, site: URL | undefined): Promise<string> {
  const imagem = await getImage({
    src,
    width: 1200,
    height: 630,
    fit: 'cover',
    format: 'jpeg',
    quality: 82,
  });

  return new URL(imagem.src, site ?? SITE.url).href;
}
