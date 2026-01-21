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
    typography: require('./typography'),
    extend: {
      colors: {
        techhut: '#B55400', // Primary brand color
        'techhut-dark': '#8a3f00', // Darker variant for gradients
        'techhut-light': '#f58044', // Lighter variant for hover
        // Modern color palette from ColorHunt
        primary: {
          50: '#fef6ee',
          100: '#fde9d7',
          200: '#fbd0ae',
          300: '#f8ad7a',
          400: '#f58044',
          500: '#B55400', // Main accent color
          600: '#a34d00',
          700: '#8a3f00',
          800: '#6f3300',
          900: '#5c2a00',
        },
        dark: {
          DEFAULT: '#222831', // Main dark background
          lighter: '#393E46', // Secondary dark elements
        },
        light: {
          DEFAULT: '#EEEEEE', // Main light background
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
