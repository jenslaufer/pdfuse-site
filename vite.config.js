import { defineConfig } from 'vite'
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { PAGES, SITEMAP_PATHS, SITE_URL } from './src/site.js'

const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_PATHS.map(path => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}
</urlset>
`

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // vite-ssg reads this block.
  ssgOptions: {
    includedRoutes: () => PAGES,
    onFinished() {
      const dist = resolve(process.cwd(), 'dist')
      const index = resolve(dist, 'index.html')
      if (!existsSync(index)) throw new Error('onFinished(): dist/index.html missing — cannot create 404.html.')
      // GitHub Pages serves 404.html for unknown paths; it boots the SPA,
      // whose catch-all route redirects to the homepage.
      copyFileSync(index, resolve(dist, '404.html'))
      writeFileSync(resolve(dist, 'sitemap.xml'), sitemap())
    },
  },
})
