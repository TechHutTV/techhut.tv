import { writeFileSync } from 'fs'
import { join } from 'path'
import { articles } from '../src/data/articles.js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techhut.tv'

function escapeXml(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateRss() {
  const now = new Date().toUTCString()

  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  )

  const rssItems = sortedArticles.map(article => {
    const pubDate = new Date(article.date).toUTCString()
    const categories = [...(article.categories || []), ...(article.tags || [])]
      .map(cat => `      <category>${escapeXml(cat)}</category>`)
      .join('\n')

    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}${article.href}</link>
      <guid isPermaLink="true">${SITE_URL}${article.href}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${pubDate}</pubDate>
${categories}${article.cover ? `\n      <enclosure url="${SITE_URL}${article.cover}" type="image/jpeg" />` : ''}
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>TechHut</title>
    <link>${SITE_URL}</link>
    <description>Linux guides, software reviews, and tech content from TechHut</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>TechHut</title>
      <link>${SITE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`

  writeFileSync(join(process.cwd(), 'public/rss.xml'), rss)
  console.log(`✓ Generated RSS feed with ${sortedArticles.length} articles`)
}

generateRss()
