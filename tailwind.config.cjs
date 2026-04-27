/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./{src,mdx}/**/*.{js,mjs,jsx,mdx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    typography: require('./typography.cjs'),
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        techhut: '#f68330', // Primary brand color (deck-aligned)
        'techhut-dark': '#d96a1f', // Darker variant for gradients
        'techhut-light': '#fda861', // Lighter variant for hover
        // Deck-aligned warm orange palette
        primary: {
          50: '#fff4eb',
          100: '#ffe0c4',
          200: '#ffc394',
          300: '#fda861',
          400: '#f9923c',
          500: '#f68330', // Main accent color (deck)
          600: '#d96a1f',
          700: '#b25218',
          800: '#8a3f12',
          900: '#6b300d',
        },
        dark: {
          DEFAULT: '#0a0d0a', // Deck-aligned near-black with green tint
          lighter: '#0f1410', // Secondary dark surface
        },
        light: {
          DEFAULT: '#EEEEEE', // Main light background
        },
        ink: {
          DEFAULT: '#e8efe6', // Warm cream foreground (deck)
          dim: '#9ba89a',
          faint: '#5a6a5a',
        },
        line: {
          DEFAULT: '#1e2820',
          strong: '#2a3a2c',
        },
      },
      boxShadow: {
        glow: '0 0 4px rgb(0 0 0 / 0.1)',
      },
      maxWidth: {
        lg: '33rem',
        '2xl': '40rem',
        '3xl': '50rem',
        '5xl': '66rem',
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
