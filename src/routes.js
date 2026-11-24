// Route table, kept apart from main.js so vite.config.js and tests can read it
// without booting the app.
export const routes = [
    {
        path: '/',
        component: () => import('./pages/Home.vue'),
        props: {
            badge: 'PDFuse.app • Chrome Extension for modifying PDFs',
            headline: 'Stop Uploading Sensitive PDFs to Random Websites',
            uvp: 'PDFuse splits, merges, and manipulates PDFs directly in Chrome—your documents never leave your browser. Fast, private, secure.',
            cta: 'Add PDFuse.app to Chrome',
            ctaFooter: 'No signup. Setup in under 2 minutes.',
            productName: 'PDFuse.app'
        }
    },
    // Old hash links (/#/) and unknown paths land on the homepage.
    { path: '/:pathMatch(.*)*', redirect: '/' },
]
