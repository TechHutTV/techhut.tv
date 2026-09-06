// Build-time only: never import this module into a browser component.
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { prepareApps } from './appDirectory.js'

function git(root, args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 32 * 1024 * 1024 }).trim()
  } catch {
    return ''
  }
}

export function fileUpdatedAt(file, root = process.cwd()) {
  const committed = git(root, ['log', '-1', '--format=%cI', '--', file])
  if (committed) return committed
  try {
    return statSync(join(root, file)).mtime.toISOString()
  } catch {
    return null
  }
}

// Compare parsed records between commits, so reformatting or another app's
// coverage changes do not advance this app's date. Cache once per build worker.
const recordDatesCache = new Map()
export function appRecordDates(root = process.cwd()) {
  if (recordDatesCache.has(root)) return recordDatesCache.get(root)
  const history = git(root, ['log', '--format=%H %cI', '--', 'src/data/apps.json']).split('\n').filter(Boolean)
  const dates = new Map()
  let newer
  let newerDate
  for (const entry of history) {
    const [hash, date] = entry.split(' ')
    let records
    try {
      records = new Map(JSON.parse(git(root, ['show', `${hash}:src/data/apps.json`])).map(app => [app.id, JSON.stringify(app)]))
    } catch { continue }
    if (newer) {
      for (const [id, value] of newer) {
        if (!dates.has(id) && records.get(id) !== value) dates.set(id, newerDate)
      }
    }
    newer = records
    newerDate = date
  }
  for (const id of newer?.keys() || []) if (!dates.has(id)) dates.set(id, newerDate)
  recordDatesCache.set(root, dates)
  return dates
}

function contentPaths(root, directory = 'src/content') {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(entry => {
    const path = `${directory}/${entry.name}`
    return entry.isDirectory() ? contentPaths(root, path) : entry.name.endsWith('.mdx') ? [path] : []
  })
}

export function getAppDetail(id, records, articles, root = process.cwd()) {
  const record = records.find(app => app.id === id)
  if (!record) return null
  const app = prepareApps([record], articles)[0]
  if (!app) return null
  const detailFile = `src/data/app-details/${id}.json`
  const details = JSON.parse(readFileSync(join(root, detailFile), 'utf8'))
  const coverage = new Set(app.coverage.map(article => article.href))
  const files = [detailFile, ...contentPaths(root).filter(file => coverage.has(`/${file.split('/').at(-1).replace(/\.mdx$/, '')}`))]
  // Preserve the prototype's app-specific route history after moving to [id].
  if (id === 'copyparty') files.push('src/pages/apps/copyparty.jsx')
  const recordDate = appRecordDates(root).get(id) || fileUpdatedAt('src/data/apps.json', root)
  const dates = [recordDate, ...files.map(file => fileUpdatedAt(file, root))].filter(Boolean)
  const updatedAt = new Date(Math.max(...dates.map(date => Date.parse(date)))).toISOString()
  return { ...app, details: { ...app.details, ...details, updatedAt } }
}
