import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Detect if running in Storybook mode
const isStorybook = process.env.STORYBOOK === 'true' ||
  process.argv.includes('storybook') ||
  process.env.npm_lifecycle_event === 'storybook' ||
  process.env.npm_lifecycle_event === 'build-storybook';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    // Exclude vueDevTools when running Storybook to avoid vite-plugin-inspect errors
    ...(isStorybook ? [] : [vueDevTools()]),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: '../backend/public',
    minify: true,
    manifest: true
  }
})
