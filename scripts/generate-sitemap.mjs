import { writeFileSync } from 'fs'
import { join } from 'path'
import { articles } from '../src/data/articles.js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techhut.tv'

function generateSitemap() {
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
${articles.map(article => `  <url>
    <loc>${SITE_URL}${article.href}</loc>
    <lastmod>${article.dateModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`

  writeFileSync(join(process.cwd(), 'public/sitemap.xml'), sitemap)
  console.log(`✓ Generated sitemap with ${staticPages.length + articles.length} URLs`)
}

generateSitemap()
