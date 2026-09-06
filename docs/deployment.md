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
- Scripts from self, Matomo, CDN
- Styles from self (inline allowed)
- Images from self, data URIs, HTTPS sources
- Frames from YouTube only
- Connections to self, Matomo, Algolia

### Search Console and analytics

Google Analytics and Google Tag Manager loaders have been removed, including the no-JavaScript tracking iframe. `NEXT_PUBLIC_GTM_ID` is no longer used. Matomo, Vercel Web Analytics, Speed Insights, and YouTube embeds remain separate integrations.

Search Console does not require visitor tracking when verified through DNS or an HTML verification tag/file. Keep existing DNS verification records and any verification files/tags. If a Search Console owner relies on Analytics or Tag Manager verification, establish another method before deploying this removal. See [Google's verification instructions](https://support.google.com/webmasters/answer/9008080?hl=en). Public DNS currently has a Google verification record, but the owner's active verification method must be confirmed in Search Console.

This change preserves canonical URLs, structured data, robots.txt, sitemap generation, and local article/app search. It does not delete historical data in Google Analytics or change remote account settings. Review any remotely managed Matomo container tags before adding them so they do not reintroduce Google tracking.

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

The public privacy policy is maintained in `src/pages/privacy.mdx` at `/privacy`. Its footer link sits beside **Analytics opt-out**; both routes are included in sitemap generation. Keep the policy's revision date and disclosures aligned with actual changes. Validate an isolated build with `node scripts/validate-privacy-build.mjs /path/to/build-copy` before deployment.

The footer's **Analytics opt-out** link opens `/privacy-settings`. `AnalyticsPreferencesProvider` checks the saved browser preference before mounting Matomo, Vercel Web Analytics, or Speed Insights. Opting out persists locally and reloads the page to stop existing scripts; future loads omit all three integrations. Offline checks: `node --test tests/analyticsPreference.test.mjs`.

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
