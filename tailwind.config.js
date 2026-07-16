/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'comic-bg':     '#040D12',
        'comic-panel':  '#0D1F2E',
        'comic-deep':   '#0A1520',
        'comic-orange': '#4F9B93',
        'comic-amber':  '#3E6F85',
        'comic-yellow': '#3E6F85',
        'comic-cream':  '#E0EDF4',
        'comic-red':    '#4F9B93',
        // legacy tokens (kept so nothing breaks)
        neu: { bg: '#f0f0f3', dark: '#141418' },
      },
      fontFamily: {
        comic: ['Space Grotesk', 'sans-serif'],
        sans:  ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'panel':       '4px 4px 0px #4F9B93',
        'panel-hover': '8px 8px 0px #4F9B93',
        'panel-yellow':'4px 4px 0px #3E6F85',
        'panel-inset': 'inset 3px 3px 0px rgba(79,155,147,0.25)',
        'card':        '0 1px 3px rgba(0,0,0,0.06)',
        'card-hover':  '0 8px 24px rgba(0,0,0,0.12)',
        'card-lifted': '0 16px 40px rgba(0,0,0,0.16)',
      },
      letterSpacing: {
        comic: '0.04em',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'panel-pop': {
          '0%':   { transform: 'translate(0,0)' },
          '50%':  { transform: 'translate(-3px,-3px)' },
          '100%': { transform: 'translate(0,0)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%':      { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        shimmer:     'shimmer 3s linear infinite',
        'panel-pop': 'panel-pop 0.3s ease-out',
        wiggle:      'wiggle 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
