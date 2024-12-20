import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://transformationmadeeasy.me',
  integrations: [
    tailwind(), 
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      customPages: [
        'https://transformationmadeeasy.me/about',
        'https://transformationmadeeasy.me/blog',
        'https://transformationmadeeasy.me/medical-weight-loss',
        'https://transformationmadeeasy.me/keto-guide',
        'https://transformationmadeeasy.me/equipment-guide',
        'https://transformationmadeeasy.me/faq',
        'https://transformationmadeeasy.me/get-started',
        'https://transformationmadeeasy.me/contact',
        'https://transformationmadeeasy.me/privacy',
        'https://transformationmadeeasy.me/terms'
      ],
    })
  ],
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  })
});