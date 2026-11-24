# pdfuse-site

Landing page for [PDFuse](https://pdfuse.app), a Chrome extension that merges, splits and edits PDFs inside the browser.

Vue 3 + Vite, prerendered with `vite-ssg` so crawlers and LLMs get the full text without JavaScript.

## Commands

```sh
npm ci
npm run dev       # dev server
npm run build     # prerender to dist/ (also writes 404.html and sitemap.xml)
npm test          # checks dist/ — run after build
npm run preview   # serve dist/
```

## Layout

- `src/routes.js` – routes and homepage copy
- `src/site.js` – site URL, store URL, prerendered pages, sitemap paths
- `src/pages/Home.vue` – homepage, title, meta tags, JSON-LD
- `public/` – `privacy.html`, `robots.txt`, `llms.txt`, `index.md`, IndexNow key file

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds, tests, writes `CNAME` and publishes `dist/` to the `site` branch (GitHub Pages).
