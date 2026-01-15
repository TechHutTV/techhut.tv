import nextMDX from '@next/mdx'
import {remarkPlugins} from './mdx/remark.mjs'
import {rehypePlugins} from './mdx/rehype.mjs'
import {recmaPlugins} from './mdx/recma.mjs'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const withMDX = nextMDX({
    options: {
        remarkPlugins,
        // rehypeSlug,
        rehypePlugins,
        recmaPlugins,
        providerImportSource: '@mdx-js/react',
    },
})


const isProd = process.env.NODE_ENV === 'production'
const assetPrefix = process.env.ASSET_PREFIX || (isProd ? '/docs-static' : undefined)

/**
 * Recursively find all index.mdx files in content directory and generate rewrites
 */
function findContentPages(dir, basePath = '') {
  const pages = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      pages.push(...findContentPages(fullPath, relativePath))
    } else if (entry.name === 'index.mdx') {
      // Extract the folder name (slug) from the path
      // e.g., content/2021/11/after-installing-pop-os-cosmic/index.mdx
      // -> slug is "after-installing-pop-os-cosmic"
      const pathParts = basePath.split('/')
      const slug = pathParts[pathParts.length - 1]
      const fullContentPath = `/content/${basePath}`
      
      pages.push({
        slug,
        fullPath: fullContentPath
      })
    }
  }

  return pages
}

function generateContentRewrites() {
  const contentDir = join(process.cwd(), 'src/pages/content')
  const pages = findContentPages(contentDir)
  
  return pages.map(page => ({
    source: `/${page.slug}`,
    destination: page.fullPath
  }))
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: assetPrefix,
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    compress: true,
    swcMinify: true,
    images: {
        unoptimized: false,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        scrollRestoration: true,
    },
    // Security headers
    headers: async () => {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.algolia.net https://*.algolianet.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; media-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';"
                    },
                ],
            },
        ]
    },
    // All redirects removed as requested
    redirects: async () => {
        return []
    },
    rewrites: async () => {
        const contentRewrites = generateContentRewrites()
        return [
            {
                source: '/',
                destination: '/introduction',
            },
            {
                source: '/api',
                destination: '/ipa/introduction',
            },
            {
                source: '/api/:path*',
                destination: '/ipa/:path*',
            },
            ...contentRewrites
        ]
    }
}

export default withMDX(nextConfig)
