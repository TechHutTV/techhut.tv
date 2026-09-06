/** @type {import('tailwindcss').Config} */

// TechHut · Spearmint Ice v1.1
// Spearmint acts (buttons, links, brand). Ice informs (secondary info, metadata).
// Surfaces, borders, and text stay neutral; color is reserved for accents.
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
  700: '#087850',
  800: '#08734F',
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
  800: '#08748E',
  900: '#0A6E86',
}

// Achromatic neutral ramp mapped onto Tailwind's numeric steps.
// 50 off-white · 100 paper raised · 700 light body · 900 ink · 950 deep
const neutral = {
  50: '#FAFAFA',
  100: '#F0F0F0',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#080808',
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
    // Square surfaces and navigation; 2px controls; circular avatars and indicators.
    borderRadius: {
      none: '0px',
      sm: '2px',
      DEFAULT: '2px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
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
        // Achromatic neutrals for surfaces, borders, and text
        zinc: neutral,
        slate: neutral,
        gray: neutral,
        neutral,
        dark: {
          DEFAULT: '#080808', // Deep — dark surface
          lighter: '#121212', // Deep raised — cards, nav
        },
        light: {
          DEFAULT: '#FAFAFA', // Off-white — light surface
        },
        ink: {
          DEFAULT: '#F5F5F5', // Soft white — dark-mode headings
          dim: '#D4D4D4', // dark-mode body text
          faint: '#A3A3A3', // dark-mode muted text
        },
        line: {
          DEFAULT: '#262626',
          strong: '#404040',
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
