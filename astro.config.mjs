import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://transformation-made-easy.netlify.app',
  integrations: [tailwind(), mdx()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});