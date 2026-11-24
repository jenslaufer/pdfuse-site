// Site facts shared by the pages, the prerender list and the sitemap.
// Plain JS so vite.config.js can import it without bundling .vue files.
export const SITE_URL = 'https://pdfuse.app'
export const STORE_URL = 'https://chromewebstore.google.com/detail/pdfuse-%E2%80%93-effortless-pdf-s/goidgjhddnkahdillfckdkhcdjdenecj'

// Routes vite-ssg prerenders.
export const PAGES = ['/']
// Every indexable URL; privacy.html is a static file in public/.
export const SITEMAP_PATHS = [...PAGES, '/privacy.html']
