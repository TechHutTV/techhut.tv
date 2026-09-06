import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { filterApps, prepareApps } from '../src/lib/appDirectory.js'
import { articles } from '../src/data/articles.js'

const records = JSON.parse(fs.readFileSync(new URL('../src/data/apps.json', import.meta.url)))
const byHref = new Map(articles.map(article => [article.href, article]))
const apps = prepareApps(records, articles)

test('every app has a unique ID and valid article or video coverage', () => {
  assert.equal(new Set(records.map(app => app.id)).size, records.length)
  for (const app of records) {
    assert.ok(app.name && app.category && app.description)
    assert.ok(app.coverage.length || app.videos?.length)
    for (const href of app.coverage) {
      assert.ok(byHref.has(href), `${app.name}: ${href} does not exist`)
      assert.doesNotMatch(href, /must-have-home-server-services|awesome.*apps|awesome.*utilities|top-10-linux-apps|10-best-linux-applications/)
    }
    assert.equal(new Set((app.videos || []).map(video => video.id)).size, (app.videos || []).length)
    for (const video of app.videos || []) {
      assert.match(video.id, /^[A-Za-z0-9_-]{11}$/)
      assert.match(video.published, /^\d{4}-\d{2}-\d{2}$/)
      assert.ok(video.published >= '2021-01-01')
      assert.ok(video.title.trim())
      assert.equal(new Date(video.published).toISOString().slice(0, 10), video.published)
    }
    for (const icon of [app.icon, app.iconDark].filter(Boolean)) {
      assert.ok(fs.existsSync(new URL(`../public${icon}`, import.meta.url)), icon)
    }
  }
})

test('search supports case, whitespace, descriptions, and categories', () => {
  assert.deepEqual(filterApps(apps, { query: '  IMMICH  ' }).map(app => app.id), ['immich'])
  assert.ok(filterApps(apps, { query: 'photo backups' }).some(app => app.id === 'immich'))
  assert.ok(filterApps(apps, { query: 'monitoring' }).some(app => app.category === 'Monitoring'))
})

test('video-only apps survive and recent coverage uses either source without mutation', () => {
  const input = [
    { id: 'video-only', coverage: [], videos: [{ id: 'new', published: '2024-01-01' }, { id: 'old', published: '2021-01-01' }] },
    { id: 'both', coverage: ['/guide'], videos: [{ id: 'latest', published: '2025-01-01' }] },
    { id: 'article', coverage: ['/guide'] },
    { id: 'missing', coverage: ['/missing'] },
  ]
  const before = structuredClone(input)
  const prepared = prepareApps(input, [{ href: '/guide', date: '2023-01-01' }])
  assert.deepEqual(prepared.map(app => [app.id, app.latestDate]), [
    ['video-only', '2024-01-01'], ['both', '2025-01-01'], ['article', '2023-01-01'],
  ])
  assert.equal(prepared[0].videos[0].id, 'new')
  assert.deepEqual(input, before)
})

test('category and search combine, and no matches can be reset', () => {
  assert.equal(filterApps(apps, { query: 'immich', category: 'Terminal' }).length, 0)
  assert.equal(filterApps(apps, { query: '[no such app]' }).length, 0)
  assert.equal(filterApps(apps).length, apps.length)
  assert.ok(filterApps(apps, { category: 'Terminal' }).every(app => app.category === 'Terminal'))
})

test('sorts by coverage date or alphabetically without mutating input', () => {
  const before = structuredClone(apps)
  const recent = filterApps(apps, { sort: 'recent' })
  for (let i = 1; i < recent.length; i++) assert.ok(recent[i - 1].latestDate >= recent[i].latestDate)
  const alphabetical = filterApps(apps)
  assert.deepEqual(alphabetical.map(app => app.name), apps.map(app => app.name).sort((a, b) => a.localeCompare(b, 'en')))
  assert.deepEqual(apps, before)
})
