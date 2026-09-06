import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { getAppDetail, appRecordDates, fileUpdatedAt } from '../src/lib/appDetails.server.js'
import { formatDate } from '../src/lib/dates.js'
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

test('all 126 existing apps have complete detail data, coverage thumbnails, and matching routes', () => {
  const files = fs.readdirSync(new URL('../src/data/app-details/', import.meta.url)).filter(file => file.endsWith('.json'))
  assert.equal(files.length, records.length)
  for (const record of records) {
    assert.match(record.id, /^[a-z0-9-]+$/)
    assert.equal(record.details.href, `/apps/${record.id}`)
    const app = getAppDetail(record.id, records, articles)
    const { details } = app
    assert.ok(details.summary.length > 35, record.id)
    assert.ok(details.kind && details.platforms.length && details.license.name && details.license.type, record.id)
    assert.ok(details.features.length >= 3 && details.features.every(feature => feature.trim()), record.id)
    assert.ok(Number.isFinite(Date.parse(details.updatedAt)), record.id)
    assert.ok(details.links.length && details.sources.length, record.id)
    const destinations = details.links.map(link => new URL(link.url).href.replace(/\/$/, ''))
    assert.equal(new Set(destinations).size, destinations.length, record.id)
    for (const url of [...details.sources, ...details.links.map(link => link.url), details.license.url]) assert.match(url, /^https?:\/\//)
    for (const article of app.coverage) {
      assert.ok(article.cover, `${record.id}: missing article thumbnail`)
      assert.ok(fs.existsSync(new URL(`../public${article.cover}`, import.meta.url)), article.cover)
    }
    for (const href of Object.keys(details.coverageNotes || {})) assert.ok(record.coverage.includes(href))
  }
  assert.equal(getAppDetail('not-a-real-app', records, articles), null)
  assert.equal(getAppDetail('../../package', records, articles), null)
  assert.ok(!records.some(app => ['libregaming', 'movavi-video-editor', 'archfi', 'bismuth', 'boost-note', 'focalboard'].includes(app.id)))
})

test('coverage is canonical, deduplicated and newest first without discarding older guides or videos', () => {
  const [app] = prepareApps([{ coverage: ['/old', '/new/', '/old', '/new'], videos: [
    { id: 'same', published: '2021-01-01' }, { id: 'other', published: '2023-01-01' }, { id: 'same', published: '2024-01-01' },
  ] }], [{ href: '/old', date: '2021-01-01' }, { href: '/new', date: '2025-01-01' }])
  assert.deepEqual(app.coverage.map(article => article.href), ['/new', '/old'])
  assert.deepEqual(app.videos.map(video => [video.id, video.published]), [['same', '2024-01-01'], ['other', '2023-01-01']])
  const resolve = getAppDetail('davinci-resolve', records, articles)
  assert.equal(resolve.coverage.length, 2)
  assert.match(resolve.coverage[1].title, /Outdated/)
  assert.ok(resolve.details.coverageNotes[resolve.coverage[1].href])
  assert.equal(getAppDetail('superfile', records, articles).coverage.length, 2)
  assert.equal(getAppDetail('netbird', records, articles).coverage.length, 3)
  assert.ok(getAppDetail('portainer', records, articles).coverage.some(article => article.href === '/self-host-immich-photo-backup'))
  assert.ok(getAppDetail('sonarr', records, articles).videos.length >= 2)
})

test('licenses and deployment labels distinguish proprietary, restricted, desktop and server apps', () => {
  for (const id of ['davinci-resolve', 'startallback', 'vmware', 'twingate']) {
    assert.match(getAppDetail(id, records, articles).details.license.type, /Proprietary/i)
  }
  for (const id of ['dockhand', 'n8n', 'open-webui', 'umbrel']) {
    assert.equal(getAppDetail(id, records, articles).details.license.type, 'Source available')
  }
  assert.equal(getAppDetail('ghostty', records, articles).details.kind, 'Terminal tool')
  assert.equal(getAppDetail('copyparty', records, articles).details.kind, 'Self-hosted')
  assert.ok(!getAppDetail('psensor', records, articles).icon)
})

test('Git dates isolate app record changes and fall back per file without a checkout', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'app-dates-'))
  const run = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' })
  const write = (file, value) => { fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true }); fs.writeFileSync(path.join(root, file), value) }
  const commit = date => {
    run('add', '.')
    execFileSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'fixture'], {
      cwd: root, stdio: 'pipe', env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
    })
  }
  try {
    const local = 'src/data/app-details/local.json'
    write(local, '{}')
    fs.utimesSync(path.join(root, local), new Date('2020-01-01Z'), new Date('2020-01-01Z'))
    assert.equal(fileUpdatedAt(local, root), '2020-01-01T00:00:00.000Z')
    assert.equal(fileUpdatedAt('missing.json', root), null)
    const archiveRecords = [{ id: 'local', coverage: ['/guide'] }]
    write('archive/src/data/app-details/local.json', '{}')
    write('archive/src/data/apps.json', JSON.stringify(archiveRecords))
    write('archive/src/content/guide.mdx', 'Source archive fixture')
    for (const file of ['archive/src/data/app-details/local.json', 'archive/src/data/apps.json', 'archive/src/content/guide.mdx']) {
      fs.utimesSync(path.join(root, file), new Date('2020-02-01Z'), new Date('2020-02-01Z'))
    }
    assert.equal(getAppDetail('local', archiveRecords, [{ href: '/guide', date: '2019-01-01' }], path.join(root, 'archive')).details.updatedAt, '2020-02-01T00:00:00.000Z')
    run('init')
    const initial = [{ id: 'a', coverage: ['/old'] }, { id: 'b', coverage: [] }]
    write('src/data/apps.json', JSON.stringify(initial))
    commit('2021-01-01T12:00:00Z')
    write('src/data/apps.json', JSON.stringify([initial[0], { ...initial[1], videos: [{ id: 'new' }] }]))
    commit('2022-01-01T12:00:00Z')
    write('src/components/AppDetail.jsx', '// Shared layout change')
    commit('2023-01-01T12:00:00Z')
    assert.equal(Date.parse(appRecordDates(root).get('a')), Date.parse('2021-01-01T12:00:00Z'))
    assert.equal(Date.parse(appRecordDates(root).get('b')), Date.parse('2022-01-01T12:00:00Z'))
    assert.equal(Date.parse(fileUpdatedAt(local, root)), Date.parse('2021-01-01T12:00:00Z'))
    write('src/data/app-details/a.json', JSON.stringify({ summary: 'Fixture' }))
    fs.utimesSync(path.join(root, 'src/data/app-details/a.json'), new Date('2020-01-01Z'), new Date('2020-01-01Z'))
    commit('2023-06-01T12:00:00Z')
    write('src/content/old.mdx', 'Linked article edit')
    commit('2024-01-01T12:00:00Z')
    write('src/data/app-details/a.json', JSON.stringify({ summary: 'Uncommitted edit' }))
    const app = getAppDetail('a', initial, [{ href: '/old', date: '2019-01-01' }], root)
    assert.equal(app.details.updatedAt, '2024-01-01T12:00:00.000Z')
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test('article preview dates are identical across server and client time zones', () => {
  assert.equal(formatDate('2025-01-01'), 'January 1, 2025')
  const script = "import { formatDate } from './src/lib/dates.js'; process.stdout.write(formatDate('2025-01-01'))"
  for (const TZ of ['Pacific/Honolulu', 'Asia/Tokyo']) {
    const result = execFileSync(process.execPath, ['--input-type=module', '-e', script], { encoding: 'utf8', env: { ...process.env, TZ } })
    assert.equal(result, 'January 1, 2025')
  }
})
