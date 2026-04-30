import { articles } from '@/data/articles'

export function getRelatedArticles(currentTags, currentHref, limit = 4) {
  if (!currentTags || currentTags.length === 0) return []
  const tagSet = new Set(currentTags)

  return articles
    .filter((a) => a.href !== currentHref)
    .map((a) => ({
      article: a,
      overlap: (a.tags || []).filter((t) => tagSet.has(t)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap
      return new Date(b.article.date) - new Date(a.article.date)
    })
    .slice(0, limit)
    .map(({ article }) => article)
}
