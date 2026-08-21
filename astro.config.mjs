// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://flydcfa.com',
  // Keep noindex pages (internal brand kit + the not-yet-built student-resources
  // placeholder) out of the sitemap so we never tell Google to index a page that
  // carries a noindex tag.
  integrations: [sitemap({ filter: (page) => !page.includes('/brand') && !page.includes('/student-resources') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
