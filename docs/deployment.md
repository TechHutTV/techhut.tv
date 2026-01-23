# Deployment

[Back to Documentation Index](README.md)

## Overview

The TechHut website is deployed on Vercel with automatic deployments triggered by git pushes.

## Vercel Configuration

The project uses standard Next.js deployment on Vercel with no special configuration file required.

### Build Settings

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 18.x |

### Build Process

When deployed, the build command executes:

```
npm run gen:articles
npm run gen:slugmap
npm run gen:sitemap
npm run gen:rss
next build
```

## Environment Variables

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Site URL for sitemaps/RSS | `https://techhut.tv` |
| `ASSET_PREFIX` | CDN prefix for assets | `/docs-static` (production) |
| `NODE_ENV` | Environment mode | Set by Vercel |

### Setting Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, or Development
3. Redeploy for changes to take effect

## Domain Configuration

The site is served at `techhut.tv` with:

- HTTPS enforced via HSTS header
- www subdomain redirects to apex domain
- Automatic SSL certificate management by Vercel

## Security Headers

Security headers are configured in `next.config.mjs`:

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS |
| `X-Frame-Options` | `SAMEORIGIN` | Prevent clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` | XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer info |
| `Content-Security-Policy` | (see config) | Control resource loading |

### Content Security Policy

The CSP allows:
- Scripts from self, Google Analytics, CDN
- Styles from self (inline allowed)
- Images from self, data URIs, HTTPS sources
- Frames from YouTube only
- Connections to Google Analytics, Algolia

## Deployment Workflow

### Automatic Deployments

1. Push to `main` branch triggers production deployment
2. Pull requests create preview deployments
3. Preview URLs are added to PR comments

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## Monitoring

### Vercel Analytics

The site includes `@vercel/analytics` for performance monitoring:

```jsx
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

### Speed Insights

Performance metrics via `@vercel/speed-insights`:

```jsx
import { SpeedInsights } from '@vercel/speed-insights/next'

<SpeedInsights />
```

## Caching

### Static Assets

Images and static files in `public/` are cached with long TTL.

### Generated Pages

Static pages are cached at the edge. Revalidation happens on deployment.

### CDN

Vercel's edge network serves content from nearest location.

## Rollback

To rollback a deployment:

1. Go to Vercel dashboard → Deployments
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"

## Troubleshooting

### Build Failures

1. Check Vercel build logs for errors
2. Common issues:
   - Missing environment variables
   - Node version mismatch
   - MDX syntax errors

### Preview Not Updating

1. Check if PR has new commits
2. Verify preview deployment completed
3. Clear browser cache

### Stale Content

1. Trigger redeployment from Vercel dashboard
2. Or push empty commit: `git commit --allow-empty -m "Trigger redeploy"`

## Local Production Build

Test production build locally:

```bash
npm run build
npm run start
```

This runs the full build process and serves the production output on `localhost:3000`.
