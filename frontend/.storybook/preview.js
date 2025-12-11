import '../src/assets/css/tailwind.css'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'

// Initialize MSW with error suppression for known issues
try {
  initialize({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
} catch (error) {
  // Suppress initialization errors that don't affect functionality
  console.warn('MSW initialization warning:', error.message)
}

const pinia = createPinia()

setup((app) => {
  app.use(pinia)
})

// Catch unhandled promise rejections from MSW
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    // Suppress MSW deserialization errors that are known issues
    const error = event.reason
    if (error?.message?.includes('Cannot read properties of undefined') &&
      error?.message?.includes('reading \'url\'')) {
      event.preventDefault()
      console.warn('MSW: Suppressed known deserialization error (does not affect functionality)')
    }
  })
}

/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      onUnhandledRequest: 'bypass',
    },
  },
  loaders: [mswLoader]
};

export default preview;