import { readFile, writeFile, rename, unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { isRepository, isStarRecord, repositoryFromUrl } from '../src/lib/appStars.js'

export function validateMapping(mapping, apps) {
  const ids = new Set(apps.map(app => app.id))
  if (Object.keys(mapping).length !== ids.size) throw new Error('Repository mapping must cover every current app, including omissions')
  for (const [id, entry] of Object.entries(mapping)) {
    if (!ids.has(id) || !entry || !entry.reason?.trim() || !entry.sources?.length) throw new Error(`Invalid repository mapping: ${id}`)
    for (const source of entry.sources) if (!/^https?:\/\//.test(source)) throw new Error(`Invalid evidence URL: ${id}`)
    if (entry.repository === null) continue
    if (!isRepository(entry.repository) || entry.repository !== entry.repository.toLowerCase() || !entry.label?.trim() || !repositoryFromUrl(entry.link)) {
      throw new Error(`Invalid GitHub repository: ${id}`)
    }
  }
}

// Serial requests avoid secondary limits. All waits, retries, and request bodies
// are bounded; the timeout covers both response headers and JSON parsing.
export async function refreshSnapshot(mapping, previous, {
  fetchImpl = fetch, token, now = () => new Date().toISOString(),
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), log = console.log,
  timeoutMs = 15000, maxRetries = 2, maxWaitMs = 60000,
} = {}) {
  const repositories = [...new Set(Object.values(mapping).map(entry => entry.repository).filter(Boolean))].sort()
  const next = { repositories: {} }
  const failures = []
  let successes = 0
  let circuitOpen = false
  for (const repository of repositories) {
    if (!isRepository(repository)) throw new Error('Invalid repository identifier')
    const old = previous.repositories?.[repository]
    if (isStarRecord(old, repository)) next.repositories[repository] = old
    let failure = circuitOpen ? 'GitHub rate limit or authentication failure; deferred until the next refresh' : ''
    for (let attempt = 0; !circuitOpen && attempt <= maxRetries; attempt++) {
      let retryDelay = 1000 * 2 ** attempt
      let retryable = true
      let rateLimited = false
      try {
        const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2026-03-10', 'User-Agent': 'TechHut-app-stars' }
        if (token) headers.Authorization = `Bearer ${token}`
        const response = await fetchImpl(`https://api.github.com/repos/${repository}`, { headers, signal: AbortSignal.timeout(timeoutMs), redirect: 'manual' })
        if (response.ok) {
          const data = await response.json()
          if (typeof data.full_name !== 'string' || data.full_name.toLowerCase() !== repository || data.private !== false ||
            !Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) {
            failure = 'Invalid public repository identity or star count; verify the mapping'
            break
          }
          const fetchedAt = now()
          const record = { repository, stars: data.stargazers_count, fetchedAt }
          if (!isStarRecord(record, repository)) throw new Error('Invalid fetch timestamp')
          // Preserve successful-fetch evidence for unchanged values, avoiding
          // daily timestamp-only commits. Every attempt is still logged.
          next.repositories[repository] = isStarRecord(old, repository) && old.stars === record.stars ? old : record
          successes++
          log(`${repository}: ${record.stars} stars, verified ${fetchedAt}`)
          failure = ''
          break
        }
        // Never log response bodies: upstream text is not trusted diagnostics.
        failure = `GitHub HTTP ${response.status}`
        rateLimited = response.status === 429 || (response.status === 403 &&
          (response.headers.get('x-ratelimit-remaining') === '0' || response.headers.has('retry-after')))
        // A secondary limit can also be a 403 without Retry-After.
        if (response.status === 403) rateLimited = true
        retryable = rateLimited || response.status >= 500
        if (response.status === 401) circuitOpen = true
        if (response.status >= 300 && response.status < 400) failure += '; repository moved, verify and update the mapping'
        if (rateLimited) {
          const retryAfter = response.headers.get('retry-after')
          const reset = response.headers.get('x-ratelimit-reset')
          if (retryAfter !== null) {
            retryDelay = /^\d+$/.test(retryAfter) ? Number(retryAfter) * 1000 : Date.parse(retryAfter) - Date.parse(now())
          } else if (response.headers.get('x-ratelimit-remaining') === '0' && reset) {
            retryDelay = Number(reset) * 1000 - Date.parse(now()) + 1000
          } else retryDelay = 60000 * 2 ** attempt
          if (!Number.isFinite(retryDelay)) retryDelay = 60000
          retryDelay = Math.max(1000, retryDelay)
          if (retryDelay > maxWaitMs || attempt === maxRetries) circuitOpen = true
        }
        await response.body?.cancel()
      } catch {
        failure = 'GitHub request timed out, failed, or returned invalid JSON'
      }
      if (!retryable || circuitOpen || attempt === maxRetries) break
      log(`${repository}: ${failure}; retrying in ${retryDelay}ms`)
      await sleep(retryDelay)
    }
    if (failure) {
      failures.push({ repository, reason: failure })
      log(`WARNING ${repository}: ${failure}; ${next.repositories[repository] ? 'retaining cached count' : 'count omitted'}`)
    }
  }
  return { snapshot: next, successes, failures }
}

export async function writeSnapshot(file, snapshot) {
  const text = JSON.stringify(snapshot, null, 2) + '\n'
  let existing
  try { existing = await readFile(file, 'utf8') } catch (error) { if (error.code !== 'ENOENT') throw error }
  if (existing === text) return false
  const temporary = `${file}.${process.pid}.tmp`
  try {
    await writeFile(temporary, text, { flag: 'wx' })
    await rename(temporary, file)
  } finally {
    await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error })
  }
  return true
}

async function main() {
  const readJSON = async file => JSON.parse(await readFile(resolve(file), 'utf8'))
  const mapping = await readJSON('src/data/app-repositories.json')
  validateMapping(mapping, await readJSON('src/data/apps.json'))
  const file = resolve('src/data/github-stars.json')
  const previous = await readJSON(file)
  const result = await refreshSnapshot(mapping, previous, { token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN })
  const changed = await writeSnapshot(file, result.snapshot)
  console.log(`${result.successes} verified, ${result.failures.length} failed; snapshot ${changed ? 'updated' : 'unchanged'}.`)
  if (!result.successes && result.failures.length) process.exitCode = 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(() => { console.error('Star refresh failed; check mapping, snapshot JSON, and filesystem access.'); process.exitCode = 1 })
}
