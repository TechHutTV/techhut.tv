import { articles } from '@/data/articles'

const SITE_URL = 'https://techhut.tv'

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

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>TechHut</title>
    <link>${SITE_URL}</link>
    <description>Linux guides, software reviews, and tech content from TechHut</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>TechHut</title>
      <link>${SITE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`
}

export async function getServerSideProps({ res }) {
  const rss = generateRss()

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(rss)
  res.end()

  return { props: {} }
}

export default function RssFeed() {
  return null
}
