// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: SITE.url,

  // O build gera diretório por página (/eventos/x/index.html). Com a barra
  // final obrigatória, link, canonical e sitemap apontam todos para a mesma
  // URL — sem isso a hospedagem devolve um 301 a cada clique, o que ainda
  // por cima atrapalha a View Transition.
  trailingSlash: 'always',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/styleguide'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Fontes locais, versionadas em src/assets/fontes (veja o LEIA-ME de lá).
  // O Astro gera os @font-face, copia os arquivos com hash e calcula as
  // métricas de fallback — o texto não pula quando a fonte carrega.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Baloo 2',
      cssVariable: '--ff-display',
      fallbacks: ['ui-rounded', 'Segoe UI Rounded', 'Arial Rounded MT Bold', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fontes/baloo-2-latin-variable.woff2'],
            weight: '400 800',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--ff-body',
      fallbacks: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fontes/inter-latin-variable.woff2'],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
});
