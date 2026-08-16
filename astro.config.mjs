import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://suxinpack.cn',
  integrations: [tailwind(), sitemap()],
  output: 'static',
  build: {
    assets: 'assets',
  },
});
