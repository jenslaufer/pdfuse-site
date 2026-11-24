import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes.js'
import './style.css'

// vite-ssg owns the router and the head: HTML5 history on the client, memory
// history while prerendering. Pages to prerender: ssgOptions in vite.config.js.
export const createApp = ViteSSG(App, { routes })
