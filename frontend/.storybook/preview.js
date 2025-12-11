import '../src/assets/css/tailwind.css'
import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia';

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
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