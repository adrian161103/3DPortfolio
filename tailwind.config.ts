import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        // Colores para el tema Windows 98
        win98: {
          blue: '#000080',
          teal: '#008080',
          silver: '#c0c0c0',
          gray: '#808080',
          navy: '#000080',
          green: '#008000',
          desktop: '#008080',
        }
      },
      boxShadow: {
        'win98': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
        'win98-pressed': 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'ms-sans': ['"MS Sans Serif"', 'sans-serif'],
        'terminal': ['Consolas', 'Monaco', 'monospace'],
      },
    },
  },
} satisfies Config