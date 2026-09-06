// Pure helpers shared by static generation, the directory, and offline tests.
export function repositoryFromUrl(value) {
  try {
    const url = new URL(value)
    const repository = url.pathname.replace(/^\//, '').replace(/\/$/, '')
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.port && !url.username && !url.password && !url.search && !url.hash && isRepository(repository)
      ? repository.toLowerCase() : null
  } catch { return null }
}

export function isRepository(value) {
  return typeof value === 'string' && /^[a-z\d](?:[a-z\d-]*[a-z\d])?\/[a-z\d_.-]+$/i.test(value) && !['.', '..'].includes(value.split('/')[1])
}

export function isStarRecord(value, repository) {
  return Boolean(value && value.repository === repository && Number.isSafeInteger(value.stars) && value.stars >= 0 &&
    typeof value.fetchedAt === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value.fetchedAt) && Number.isFinite(Date.parse(value.fetchedAt)))
}

export function getAppStars(id, mapping, snapshot) {
  const entry = mapping[id]
  if (!entry?.repository || !isRepository(entry.repository)) return null
  const repository = entry.repository.toLowerCase()
  const record = snapshot.repositories?.[repository]
  return isStarRecord(record, repository) ? { ...record, link: entry.link, label: entry.label } : null
}

export function formatStars(count) {
  const full = String(count).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const compact = count < 1000 ? String(count) : count < 999950
    ? `${(Math.round(count / 100) / 10).toFixed(1).replace(/\.0$/, '')}k`
    : `${(Math.round(count / 100000) / 10).toFixed(1).replace(/\.0$/, '')}m`
  return { compact, full }
}
