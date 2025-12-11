import '../src/assets/css/tailwind.css'
import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../src/views/AuthView/AuthView.vue'
import StageSelectionView from '../src/views/SageSelectionView/StageSelectionView.vue'

const pinia = createPinia()

// Create router for Storybook
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/stage-selection',
      name: 'stage-selection',
      component: StageSelectionView
    }
  ]
})

setup((app) => {
  app.use(pinia)
  app.use(router)
})

/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;