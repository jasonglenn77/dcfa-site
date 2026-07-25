// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://dcfa-site.jason-glenn7.workers.dev',
  integrations: [sitemap({ filter: (page) => !page.includes('/brand') })],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare()
});