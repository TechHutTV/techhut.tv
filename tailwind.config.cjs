/** @type {import('tailwindcss').Config} */

// TechHut · Spearmint Ice v1.1
// Spearmint acts (buttons, links, brand). Ice informs (secondary info, metadata).
// Neutrals are green-tinted grays — never pure #000 or #FFF.
// Bright mint/ice (500) never as text on light surfaces; use the 800 step there.

// Mint ramp — 500 is dark-mode brand, 800 is light-mode brand, 400/600 are hovers
const mint = {
  50: '#E3FBF0',
  100: '#E3FBF0',
  200: '#B6F5DA',
  300: '#8FF0C7',
  400: '#6FEBB6',
  500: '#4FE3A3',
  600: '#2FC488',
  700: '#17A570',
  800: '#0C8A60',
  900: '#0A6B4C',
}

// Ice ramp — 500 is dark-mode info, 800 is light-mode info
const ice = {
  50: '#E4F9FF',
  100: '#E4F9FF',
  200: '#BFF0FF',
  300: '#A8EDFF',
  400: '#7FE8FF',
  500: '#59E0FF',
  600: '#2CC3E8',
  700: '#0FA9CE',
  800: '#0891B2',
  900: '#0A6E86',
}

// Green-tinted neutral ramp mapped onto Tailwind's numeric steps.
// 50 mint paper · 100 paper raised · 700 light body · 900 ink · 950 deep
const neutral = {
  50: '#EFF6F1',
  100: '#E2EEE7',
  200: '#C4D6CC',
  300: '#C4D6CC',
  400: '#8FB3A6',
  500: '#5E7168',
  600: '#5E7168',
  700: '#3C4F48',
  800: '#1E2C26',
  900: '#142420',
  950: '#0B1512',
}

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
      '5xl': ['3rem', { lineHeight: '1.05' }],
      '6xl': ['3.75rem', { lineHeight: '1.05' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    // Corner radii: 6px small (badges, inputs), 10px medium (cards), 16px large (panels)
    borderRadius: {
      none: '0px',
      sm: '6px',
      DEFAULT: '6px',
      md: '6px',
      lg: '10px',
      xl: '16px',
      '2xl': '16px',
      '3xl': '16px',
      full: '9999px',
    },
    typography: require('./typography.cjs'),
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        techhut: '#4FE3A3', // Spearmint — brand/action (dark surfaces, bright fills)
        'techhut-dark': '#2FC488', // Mint 600 hover
        'techhut-light': '#6FEBB6', // Mint 400 hover
        primary: mint,
        ice,
        // Green-tinted neutrals everywhere a gray used to be
        zinc: neutral,
        slate: neutral,
        gray: neutral,
        neutral,
        dark: {
          DEFAULT: '#0B1512', // Deep — dark surface
          lighter: '#12211C', // Deep raised — cards, nav
        },
        light: {
          DEFAULT: '#EFF6F1', // Mint paper — light surface
        },
        ink: {
          DEFAULT: '#EAF4EF', // Mint white — dark-mode headings
          dim: '#C7DAD2', // dark-mode body text
          faint: '#8FB3A6', // dark-mode muted text
        },
        line: {
          DEFAULT: '#1E2C26',
          strong: '#3C4F48',
        },
        // Functional colors (UI only — never in logos, thumbnails, marketing)
        danger: '#FF7A70',
        warning: '#FFC94D',
      },
      // Motion: quick and precise, never bouncy. Swift enters/exits, snap for micro pops.
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.2, 0, 0, 1)',
        swift: 'cubic-bezier(0.2, 0, 0, 1)',
        snap: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        micro: '150ms',
        base: '300ms',
        entrance: '500ms',
        reveal: '900ms',
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
