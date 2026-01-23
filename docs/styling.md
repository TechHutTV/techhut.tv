# Styling Guide

[Back to Documentation Index](README.md)

## Overview

The site uses Tailwind CSS 3.3 for styling with a custom configuration that includes TechHut brand colors and dark mode support.

## Configuration Files

- **`tailwind.config.cjs`**: Main Tailwind configuration
- **`typography.cjs`**: Custom typography plugin settings
- **`src/styles/tailwind.css`**: Tailwind entry point

## Brand Colors

### Primary Color Palette

The TechHut brand color is orange (`#B55400`).

| Name | Hex | Usage |
|------|-----|-------|
| `techhut` | `#B55400` | Primary brand color |
| `techhut-dark` | `#8a3f00` | Darker variant for gradients |
| `techhut-light` | `#f58044` | Lighter variant for hover states |

### Primary Scale

Full primary color scale for UI elements:

```
primary-50:  #fef6ee  (lightest)
primary-100: #fde9d7
primary-200: #fbd0ae
primary-300: #f8ad7a
primary-400: #f58044
primary-500: #B55400  (main accent)
primary-600: #a34d00
primary-700: #8a3f00
primary-800: #6f3300
primary-900: #5c2a00  (darkest)
```

### Dark Mode Colors

| Name | Hex | Usage |
|------|-----|-------|
| `dark` | `#222831` | Main dark background |
| `dark-lighter` | `#393E46` | Secondary dark elements |
| `light` | `#EEEEEE` | Main light background |

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
<div className="bg-white dark:bg-dark text-zinc-900 dark:text-zinc-100">
  Content adapts to theme
</div>
```

### Theme Toggle

The `ModeToggle` component handles theme switching and persists preference to localStorage.

## Typography

Typography is configured via `@tailwindcss/typography` plugin with custom settings in `typography.cjs`.

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
| `text-5xl` | 3rem | 1 |
| `text-6xl` | 3.75rem | 1 |

### Prose Styling

Article content uses the `prose` class for typography:

```jsx
<article className="prose dark:prose-invert">
  <MDXContent />
</article>
```

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

Custom glow shadow:

```jsx
<div className="shadow-glow">
  {/* 0 0 4px rgb(0 0 0 / 0.1) */}
</div>
```

## Common Patterns

### Cards

```jsx
<div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark p-4">
  Card content
</div>
```

### Buttons

```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
  Primary Button
</button>
```

### Links

```jsx
<a className="text-primary-500 hover:text-primary-600 dark:text-primary-400">
  Styled Link
</a>
```

### Focus States

Use focus-visible for keyboard navigation:

```jsx
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
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
    @apply bg-primary-500 text-white rounded-lg;
  }
}
```

## Plugins

The project uses these Tailwind plugins:

- **@tailwindcss/typography**: Prose styling for article content

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Typography Plugin](https://tailwindcss.com/docs/typography-plugin)
