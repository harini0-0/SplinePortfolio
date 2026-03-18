/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neu: {
          bg:   '#e0e5ec',
          dark: '#1a1a2e',
        },
      },
      boxShadow: {
        'neu-flat':         '6px 6px 12px #b8bec7, -6px -6px 12px #ffffff',
        'neu-raised':       '8px 8px 16px #b8bec7, -8px -8px 16px #ffffff',
        'neu-pressed':      'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff',
        'neu-flat-dark':    '6px 6px 12px #0d0d1a, -6px -6px 12px #27274a',
        'neu-raised-dark':  '8px 8px 16px #0d0d1a, -8px -8px 16px #27274a',
        'neu-pressed-dark': 'inset 4px 4px 8px #0d0d1a, inset -4px -4px 8px #27274a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}