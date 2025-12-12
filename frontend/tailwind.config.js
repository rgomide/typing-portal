/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /bg-(red|blue|yellow|green|gray|white|ifgoiano-primary)-.+/, variants: ['', 'hover'] },
    { pattern: /text-(red|blue|yellow|green|gray|white|ifgoiano-primary)-.+/ },
    { pattern: /ring-(red|blue|yellow|green|gray|white|ifgoiano-primary)-.+/, variants: ['focus'] }
  ],
  plugins: [require('tailwindcss-primeui')],
  darkMode: 'false'
}

