import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://suxin-pack.pages.dev', // 部署后替换为实际域名
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets',
  },
});
