<template>
    <div class="min-h-screen bg-linear-to-b bg-brand0 text-slate-100 flex items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border border-white/10 bg-white/5 backdrop-blur">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{{ badge }}</span>
            </div>

            <h1 class="text-sm tracking-[0.25em] uppercase text-slate-400 mb-2">
                {{ productName }}
            </h1>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                {{ headline }}
            </h2>

            <p class="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 leading-relaxed">
                {{ uvp }}
            </p>

            <div class="flex flex-col items-center justify-center gap-3">
                <a :href="STORE_URL"
                    class="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold
                 bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30
                 transition-transform duration-150 hover:-translate-y-0.5">
                    {{ cta }}
                </a>
                <div class="text-xs sm:text-sm text-slate-400">
                    {{ ctaFooter }}
                </div>
            </div>

            <p class="mt-12 text-sm text-slate-400 leading-relaxed">{{ SUMMARY }}</p>

            <footer class="mt-8 text-xs text-slate-500">
                <a href="/privacy.html" class="underline hover:text-slate-300">Privacy policy</a>
            </footer>
        </div>
    </div>
</template>
<script setup>
import { useHead } from '@unhead/vue'
import { SITE_URL, STORE_URL } from '../site.js'

defineProps({
    badge: {
        type: String,
        required: true
    },
    productName: {
        type: String,

        required: true
    },
    headline: {
        type: String,
        required: true
    },
    uvp: {
        type: String,
        required: true
    },
    cta: {
        type: String,
        required: true

    },
    ctaFooter: {
        type: String,
        required: true
    }
})


// Facts from the privacy policy (public/privacy.html); keep both in sync.
const SUMMARY = 'PDFuse is a Chrome extension that merges, splits and edits PDFs, turns images into PDFs and exports PDF pages as images, inside your browser. It is for anyone who handles sensitive documents and does not want to upload them: your files are never uploaded, stored on a server, or sent to anyone.'
const TITLE = 'PDFuse – merge, split and edit PDFs privately in Chrome'
const DESCRIPTION = 'PDFuse is a Chrome extension that merges, splits and edits PDFs, turns images into PDFs and exports pages as images. Your files never leave your browser.'
const URL = `${SITE_URL}/`

const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Solytics GmbH',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hörsteiner Str. 20a',
        postalCode: '63791',
        addressLocality: 'Karlstein a. Main',
        addressCountry: 'DE',
    },
}

const application = {
    '@type': 'SoftwareApplication',
    name: 'PDFuse',
    url: URL,
    description: DESCRIPTION,
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome',
    installUrl: STORE_URL,
    publisher: { '@id': organization['@id'] },
}

useHead({
    title: TITLE,
    meta: [
        { name: 'description', content: DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'PDFuse' },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESCRIPTION },
        { property: 'og:url', content: URL },
        { name: 'twitter:card', content: 'summary' },
    ],
    link: [{ rel: 'canonical', href: URL }],
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': [application, organization] }),
    }],
})
</script>
