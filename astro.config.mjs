// @ts-check
import { defineConfig } from 'astro/config';

// SITE / BASE_PATH are set by the GitHub Pages workflow. Locally the site is served from "/".
const site = process.env.SITE ?? 'https://avinashkalamati.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
});
