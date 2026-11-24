// Asserts what crawlers and LLMs see without JavaScript: the built files.
// Run after `npm run build`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const dist = new URL('../dist/', import.meta.url)
const read = file => readFileSync(new URL(file, dist), 'utf-8')
const html = read('index.html')

test('index.html holds the page text without JS', () => {
    assert.match(html, /<h1[^>]*>[^<]*PDFuse/)
    assert.match(html, /Stop Uploading Sensitive PDFs to Random Websites/)
    assert.match(html, /merges, splits and edits PDFs/)
})

test('index.html has title, description, canonical and Open Graph', () => {
    assert.match(html, /<title>[^<]*PDFuse[^<]*<\/title>/)
    assert.doesNotMatch(html, /<title>pdfuse-site<\/title>/)
    assert.match(html, /<meta name="description" content="[^"]{50,}"/)
    assert.match(html, /<link rel="canonical" href="https:\/\/pdfuse\.app\/"/)
    assert.match(html, /<meta property="og:title"/)
    assert.match(html, /<meta property="og:description"/)
    assert.match(html, /<meta property="og:url" content="https:\/\/pdfuse\.app\/"/)
})

test('index.html carries valid JSON-LD for the app and the organization', () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    assert.ok(blocks.length > 0, 'no JSON-LD block')
    const types = blocks.flatMap(([, json]) => {
        const data = JSON.parse(json)
        return (data['@graph'] ?? [data]).map(node => node['@type'])
    })
    assert.ok(types.includes('SoftwareApplication'))
    assert.ok(types.includes('Organization'))
})

test('robots.txt, sitemap.xml, llms.txt and index.md exist', () => {
    assert.match(read('robots.txt'), /Sitemap: https:\/\/pdfuse\.app\/sitemap\.xml/)
    const sitemap = read('sitemap.xml')
    assert.match(sitemap, /<loc>https:\/\/pdfuse\.app\/<\/loc>/)
    assert.match(sitemap, /<loc>https:\/\/pdfuse\.app\/privacy\.html<\/loc>/)
    assert.doesNotMatch(sitemap, /#/)
    assert.match(read('llms.txt'), /^# PDFuse/)
    assert.ok(existsSync(new URL('index.md', dist)))
})

test('404.html falls back to the SPA and privacy.html stays', () => {
    assert.ok(existsSync(new URL('404.html', dist)))
    assert.ok(existsSync(new URL('privacy.html', dist)))
})
