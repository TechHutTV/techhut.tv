import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techhut.tv'

function findContentPages(dir, basePath = '') {
  const pages = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      pages.push(...findContentPages(fullPath, relativePath))
    } else if (entry.name === 'index.mdx') {
      const pathParts = basePath.split('/')
      const slug = pathParts[pathParts.length - 1]

      pages.push({
        slug,
        path: basePath,
        lastMod: new Date().toISOString().split('T')[0] // Use current date for now
      })
    }
  }

  return pages
}

function generateSitemap() {
  const contentDir = join(process.cwd(), 'src/pages/content')
  const pages = findContentPages(contentDir)

  // Static pages
  const staticPages = [
    { path: '', priority: '1.0' },
    { path: 'introduction', priority: '1.0' },
    { path: 'team', priority: '0.8' },
    { path: 'partner', priority: '0.8' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${SITE_URL}/${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${pages.map(page => `  <url>
    <loc>${SITE_URL}/${page.slug}</loc>
    <lastmod>${page.lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`

  writeFileSync(join(process.cwd(), 'public/sitemap.xml'), sitemap)
  console.log(`✓ Generated sitemap with ${staticPages.length + pages.length} URLs`)
}

generateSitemap()
