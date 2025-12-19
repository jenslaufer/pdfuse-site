import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createHead } from '@unhead/vue/client'
import { createWebHashHistory, createRouter } from 'vue-router'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '',
            component: () => import('./pages/Home.vue'),
            props: {
                badge: 'AltMatch.app • Chrome Extension for modifying PDFs',
                headline: 'Stop Uploading Sensitive PDFs to Random Websites',
                uvp: 'PDFuse splits, merges, and manipulates PDFs directly in Chrome—your documents never leave your browser. Fast, private, secure.',
                cta: 'Add PDFuse.app to Chrome',
                ctaFooter: 'No signup. Setup in under 2 minutes.',
                productName: 'PDFuse.app'
            }
        }
    ]
})


createApp(App)
    .use(router)
    .use(createHead())
    .mount('#app')

