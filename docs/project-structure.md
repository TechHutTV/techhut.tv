# Project Structure

[Back to Documentation Index](README.md)

## Overview

TechHut is a Next.js 14 static site with MDX content support. The codebase follows Next.js conventions with custom build scripts for content generation.

## Top-Level Directory Layout

```
/
├── docs/                   # Internal documentation (you are here)
├── mdx/                    # MDX processing plugins
│   ├── recma.mjs          # Recma plugins configuration
│   ├── rehype.mjs         # Rehype plugins configuration
│   └── remark.mjs         # Remark plugins configuration
├── public/                 # Static assets
│   └── docs-static/       # Article images and static content
│       └── img/           # Images organized by date and author
├── scripts/               # Build-time generation scripts
├── src/                   # Application source code
├── next.config.mjs        # Next.js configuration
├── tailwind.config.cjs    # Tailwind CSS configuration
├── typography.cjs         # Typography plugin configuration
└── package.json           # Dependencies and scripts
```

## Source Directory (`src/`)

```
src/
├── components/            # React components
│   ├── icons/            # Icon components
│   ├── mdx.jsx           # MDX component overrides
│   └── *.jsx             # UI components
├── content/              # MDX article content
│   └── YYYY/MM/          # Articles organized by year/month
├── data/                 # Generated and static data
│   ├── articles.js       # Generated article metadata
│   ├── authors.js        # Author registry
│   └── slugMap.js        # Generated URL routing map
├── lib/                  # Utility functions
│   └── gitDates.js       # Git-based date tracking
├── pages/                # Next.js page routes
│   ├── categories/       # Category pages
│   ├── tags/             # Tag pages
│   └── [slug].mdx        # Dynamic article routes
└── styles/               # Global stylesheets
    └── tailwind.css      # Tailwind entry point
```

## Key Configuration Files

### `next.config.mjs`

Next.js configuration with MDX support:
- MDX loader with remark, rehype, and recma plugins
- Image optimization settings (AVIF, WebP formats)
- Security headers (CSP, HSTS, X-Frame-Options)
- URL rewrites (homepage to `/introduction`)
- RSS feed redirects

### `tailwind.config.cjs`

Tailwind CSS configuration:
- TechHut brand colors (primary: `#B55400`)
- Dark mode via class strategy
- Custom font sizes and spacing
- Typography plugin integration

### `package.json` Scripts

| Script | Description |
|--------|-------------|
| `dev` | Run development server with article generation |
| `build` | Full production build with all generators |
| `gen:articles` | Generate `articles.js` metadata |
| `gen:slugmap` | Generate `slugMap.js` routing |
| `gen:sitemap` | Generate `sitemap.xml` |
| `gen:rss` | Generate `rss.xml` feed |

## Data Flow

1. **Content Creation**: Authors write MDX files in `src/content/YYYY/MM/`
2. **Build Scripts**: Generate metadata from MDX exports to `src/data/`
3. **Page Rendering**: Next.js pages import generated data for listings
4. **Static Generation**: Next.js builds static HTML at build time
5. **Deployment**: Vercel serves the static site with CDN

## Public Assets

```
public/docs-static/img/
├── YYYY/MM/slug/         # Article images
│   ├── cover.jpg         # Cover image for article
│   └── *.png             # Article content images
└── authors/              # Author profile images
    └── name.jpeg         # Author photos
```

Images are referenced in MDX with paths like `/docs-static/img/2025/02/article-slug/image.png`.
