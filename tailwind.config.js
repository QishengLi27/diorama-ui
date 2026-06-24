/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        diorama: {
          parchment: '#f5e6c8',
          'parchment-dark': '#d4c4a0',
          ink: '#2a1f14',
          'ink-light': '#5c4a32',
          gold: '#d4a843',
          'gold-light': '#f0d078',
          'gold-dark': '#a67c2e',
          ruby: '#c94c4c',
          sapphire: '#4c7cc9',
          emerald: '#4caf7c',
          shadow: '#1a120b',
          bloom: 'rgba(212, 168, 67, 0.35)',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        display: ['"Cinzel"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'diorama-frame': '0 0 0 2px #2a1f14, 0 0 0 4px #d4a843, 0 8px 24px rgba(26, 18, 11, 0.5)',
        'diorama-glow': '0 0 12px rgba(212, 168, 67, 0.5), inset 0 0 20px rgba(212, 168, 67, 0.1)',
        'diorama-inset': 'inset 0 2px 6px rgba(42, 31, 20, 0.25)',
      },
      borderRadius: {
        'diorama': '4px',
      },
      animation: {
        'cursor-bounce': 'cursorBounce 1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        cursorBounce: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(212, 168, 67, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 168, 67, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
