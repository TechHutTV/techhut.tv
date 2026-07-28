# Styling Guide

[Back to Documentation Index](README.md)

## Overview

The site uses Tailwind CSS 3.3 for styling with a custom configuration that implements the **Spearmint Ice** brand system and dark mode support. Spearmint acts (buttons, links, brand); ice informs (secondary info, metadata). Neutrals are green-tinted grays — never pure `#000` or `#FFF`.

## Configuration Files

- **`tailwind.config.cjs`**: Main Tailwind configuration
- **`typography.cjs`**: Custom typography plugin settings
- **`src/styles/tailwind.css`**: Tailwind entry point

## Brand Colors

### Primary Color Palette

The TechHut brand color is spearmint. The brand reads as `primary-500` (`#4FE3A3`) on dark surfaces and `primary-800` (`#0C8A60`) on light surfaces.

| Name | Hex | Usage |
|------|-----|-------|
| `techhut` | `#4FE3A3` | Legacy alias — spearmint brand/action (dark surfaces, bright fills) |
| `techhut-dark` | `#2FC488` | Legacy alias — mint 600 hover |
| `techhut-light` | `#6FEBB6` | Legacy alias — mint 400 hover |

Prefer the `primary-*` scale below; the `techhut*` tokens exist for backwards compatibility.

### Primary Scale

Full mint ramp for UI elements. `500` is the dark-mode brand, `800` is the light-mode brand, `400`/`600` are hover steps:

```
primary-50:  #E3FBF0  (lightest tint)
primary-100: #E3FBF0
primary-200: #B6F5DA
primary-300: #8FF0C7
primary-400: #6FEBB6  (dark-mode hover)
primary-500: #4FE3A3  (dark-mode brand)
primary-600: #2FC488
primary-700: #17A570  (light-mode hover)
primary-800: #0C8A60  (light-mode brand)
primary-900: #0A6B4C  (darkest)
```

### Ice Scale

Secondary accent for informational UI (info states, metadata accents). Same logic: `500` on dark, `800` on light:

```
ice-50:  #E4F9FF  (lightest tint)
ice-100: #E4F9FF
ice-200: #BFF0FF
ice-300: #A8EDFF
ice-400: #7FE8FF
ice-500: #59E0FF  (dark-mode info)
ice-600: #2CC3E8
ice-700: #0FA9CE
ice-800: #0891B2  (light-mode info)
ice-900: #0A6E86  (darkest)
```

### Neutrals

`zinc`, `slate`, `gray`, and `neutral` are all remapped to a single green-tinted neutral ramp, so existing gray classes automatically pick up the brand tint:

```
50:  #EFF6F1  (mint paper — light surface)
100: #E2EEE7  (paper raised)
200: #C4D6CC
300: #C4D6CC
400: #8FB3A6
500: #5E7168
600: #5E7168
700: #3C4F48  (light-mode body)
800: #1E2C26
900: #142420  (ink)
950: #0B1512  (deep)
```

### Surface & Text Tokens

| Name | Hex | Usage |
|------|-----|-------|
| `dark` | `#0B1512` | Deep — main dark surface |
| `dark-lighter` | `#12211C` | Deep raised — cards, nav |
| `light` | `#EFF6F1` | Mint paper — main light surface |
| `ink` | `#EAF4EF` | Mint white — dark-mode headings |
| `ink-dim` | `#C7DAD2` | Dark-mode body text |
| `ink-faint` | `#8FB3A6` | Dark-mode muted text |
| `line` | `#1E2C26` | Hairline borders (dark) |
| `line-strong` | `#3C4F48` | Stronger borders |

### Functional Colors

UI feedback only — never in logos, thumbnails, or marketing:

| Name | Hex | Usage |
|------|-----|-------|
| `danger` | `#FF7A70` | Errors, destructive actions |
| `warning` | `#FFC94D` | Warnings, cautions |

### The Bright-Fill Rule

Bright mint/ice (the 300–500 steps) are **never used as text color on light surfaces** — they don't have enough contrast. Text on light uses the `800` step. Bright steps are fine as *fills* with dark text on top, in either mode:

```jsx
{/* Text: mode-map the step */}
<a className="text-primary-800 dark:text-primary-500">Link</a>

{/* Fill: bright mint + dark text works everywhere */}
<button className="bg-primary-500 text-dark">Action</button>
```

Borders stay 1px neutral — no primary/ice borders on cards. No gradients or glows on UI elements.

## Dark Mode

Dark mode is implemented using Tailwind's class strategy.

### Configuration

```javascript
// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  // ...
}
```

### Usage

Use the `dark:` prefix for dark mode styles:

```jsx
<div className="bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-ink">
  Content adapts to theme
</div>
```

### Theme Toggle

The `ModeToggle` component handles theme switching and persists preference to localStorage.

## Typography

Typography is configured via `@tailwindcss/typography` plugin with custom settings in `typography.cjs`.

### Fonts

| Class | Font | Usage |
|-------|------|-------|
| `font-sans` | Inter | Body text (default) |
| `font-display` | Outfit | Headlines only, weights 700/800 |
| `font-mono` | JetBrains Mono | Labels, timestamps, code |

Display headings (hero titles, section headings) use `font-display font-bold` (or `font-extrabold`); body copy stays Inter. Metadata eyebrows (dates, roles, category labels) use mono — see [Common Patterns](#common-patterns).

### Font Sizes

| Class | Size | Line Height |
|-------|------|-------------|
| `text-2xs` | 0.75rem | 1.25rem |
| `text-xs` | 0.8125rem | 1.5rem |
| `text-sm` | 0.875rem | 1.5rem |
| `text-base` | 1rem | 1.75rem |
| `text-lg` | 1.125rem | 1.75rem |
| `text-xl` | 1.25rem | 1.75rem |
| `text-2xl` | 1.5rem | 2rem |
| `text-3xl` | 1.875rem | 2.25rem |
| `text-4xl` | 2.25rem | 2.5rem |
| `text-5xl` | 3rem | 1.05 |
| `text-6xl` | 3.75rem | 1.05 |
| `text-7xl` | 4.5rem | 1 |
| `text-8xl` | 6rem | 1 |
| `text-9xl` | 8rem | 1 |

### Prose Styling

Article content uses the `prose` class for typography:

```jsx
<article className="prose dark:prose-invert">
  <MDXContent />
</article>
```

## Corner Radii

Radii are locked to three sizes:

| Class | Radius | Usage |
|-------|--------|-------|
| `rounded-sm` / `rounded` / `rounded-md` | 6px | Badges, inputs, pills |
| `rounded-lg` | 10px | Cards |
| `rounded-xl` / `rounded-2xl` / `rounded-3xl` | 16px | Panels |
| `rounded-full` | 9999px | Avatars and true circles only |

Pill-shaped `rounded-full` is reserved for circular elements (avatars); rectangular chips and tags use `rounded-sm`.

## Motion

Quick and precise, never bouncy. `swift` is the default ease for enters/exits; `snap` is for micro pops only (icons, toggles) — never on large surfaces:

| Token | Value | Usage |
|-------|-------|-------|
| `ease-swift` (default) | `cubic-bezier(0.2, 0, 0, 1)` | Enters, exits, most transitions |
| `ease-snap` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro interactions only |
| `duration-micro` | 150ms | Hovers, toggles |
| `duration-base` | 300ms | Standard transitions |
| `duration-entrance` | 500ms | Element entrances |
| `duration-reveal` | 900ms | Large reveals |

## Responsive Breakpoints

Standard Tailwind breakpoints apply:

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

### Mobile-First

Styles are mobile-first. Base styles apply to all sizes, then use prefixes for larger screens:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## Custom Utilities

### Max Widths

Extended max-width values:

| Class | Width |
|-------|-------|
| `max-w-lg` | 33rem |
| `max-w-2xl` | 40rem |
| `max-w-3xl` | 50rem |
| `max-w-5xl` | 66rem |

### Opacity

Extended opacity values:

| Class | Value |
|-------|-------|
| `opacity-1` | 0.01 |
| `opacity-2.5` | 0.025 |
| `opacity-7.5` | 0.075 |
| `opacity-15` | 0.15 |

### Box Shadow

Custom subtle elevation shadow:

```jsx
<div className="shadow-glow">
  {/* 0 0 4px rgb(0 0 0 / 0.1) */}
</div>
```

## Common Patterns

### Cards

```jsx
<div className="rounded-lg border border-zinc-200 dark:border-line bg-zinc-50 dark:bg-dark-lighter p-4">
  Card content
</div>
```

### Buttons

Bright mint fill always pairs with dark text:

```jsx
<button className="bg-primary-500 hover:bg-primary-400 text-dark px-4 py-2 rounded-lg">
  Primary Button
</button>
```

### Links

Mode-map the brand step — `800` on light, `500` on dark:

```jsx
<a className="text-primary-800 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400">
  Styled Link
</a>
```

### Metadata Labels

Eyebrows (dates, author roles, category labels) use the mono accent — one per composition, never on titles or body:

```jsx
<span className="font-mono text-2xs uppercase tracking-wider text-zinc-500 dark:text-ink-faint">
  Jun 16, 2026
</span>
```

### Focus States

Use focus-visible for keyboard navigation:

```jsx
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-800 dark:focus-visible:ring-primary-500">
  Accessible Button
</button>
```

## Adding Custom Styles

### Extending Tailwind

Add custom values in `tailwind.config.cjs`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        custom: '#123456',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
}
```

### Global Styles

Add global CSS in `src/styles/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .custom-class {
    @apply bg-primary-500 text-dark rounded-lg;
  }
}
```

## Plugins

The project uses these Tailwind plugins:

- **@tailwindcss/typography**: Prose styling for article content

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Typography Plugin](https://tailwindcss.com/docs/typography-plugin)
