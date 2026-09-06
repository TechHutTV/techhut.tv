export function prepareApps(records, articles) {
  const articleByHref = new Map(articles.map(article => [article.href, article]))
  return records.map(app => {
    const coverage = [...new Set(app.coverage.map(href => href.replace(/\/$/, '')))].map(href => articleByHref.get(href)).filter(Boolean)
      .sort((a, b) => b.date.localeCompare(a.date))
    const videos = [...new Map([...(app.videos || [])].sort((a, b) => a.published.localeCompare(b.published)).map(video => [video.id, video])).values()].sort((a, b) => b.published.localeCompare(a.published))
    const latestDate = [coverage[0]?.date, videos[0]?.published].filter(Boolean).sort().at(-1) || ''
    return { ...app, coverage, videos, latestDate }
  }).filter(app => app.coverage.length || app.videos.length)
}

export function filterApps(apps, { query = '', category = 'All', sort = 'name' } = {}) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  return apps.filter(app => {
    if (category !== 'All' && app.category !== category) return false
    const text = `${app.name} ${app.description} ${app.category}`.toLowerCase()
    return terms.every(term => text.includes(term))
  }).sort((a, b) => {
    if (sort === 'recent') {
      const difference = b.latestDate.localeCompare(a.latestDate)
      if (difference) return difference
    }
    return a.name.localeCompare(b.name, 'en')
  })
}
