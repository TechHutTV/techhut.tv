import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { getAppStars, formatStars, repositoryFromUrl } from '../src/lib/appStars.js'
import { refreshSnapshot, validateMapping, writeSnapshot } from '../scripts/refresh-github-stars.mjs'
import { getAppDetail } from '../src/lib/appDetails.server.js'
import { filterApps, prepareApps } from '../src/lib/appDirectory.js'
import { articles } from '../src/data/articles.js'

const read = file => JSON.parse(fs.readFileSync(new URL(`../${file}`, import.meta.url)))
const apps = read('src/data/apps.json')
const mapping = read('src/data/app-repositories.json')
const snapshot = read('src/data/github-stars.json')
const date = '2026-09-06T09:00:00.000Z'
const oldDate = '2026-09-01T09:00:00.000Z'
const entry = repository => ({ repository, link: `https://github.com/${repository}`, label: repository, reason: 'Test fixture', sources: [`https://github.com/${repository}`] })
const record = (repository, stars = 5) => ({ repository, stars, fetchedAt: oldDate })
const response = (repository, stars) => new Response(JSON.stringify({ full_name: repository, private: false, stargazers_count: stars, watchers_count: 9999 }))
const options = { now: () => date, log: () => {}, sleep: async () => {} }

test('every current app has a reviewed mapping or an explicit omission, and counts match their identities', () => {
  validateMapping(mapping, apps)
  assert.equal(mapping.docker.repository, 'docker/compose')
  assert.equal(mapping.kdenlive.repository, 'kde/kdenlive')
  assert.equal(mapping.nala.repository, 'volitank/nala')
  assert.equal(mapping.plex.repository, 'plexinc/pms-docker')
  assert.equal(mapping.amp.repository, 'cubecoders/amp')
  const expected = [...new Set(Object.values(mapping).map(value => value.repository).filter(Boolean))].sort()
  // A first-time failure may legitimately leave a repository absent.
  for (const repository of Object.keys(snapshot.repositories)) assert.ok(expected.includes(repository), repository)
  for (const app of apps) {
    const chosen = mapping[app.id]
    const stats = getAppStars(app.id, mapping, snapshot)
    if (!chosen.repository) { assert.equal(stats, null); continue }
    const detail = read(`src/data/app-details/${app.id}.json`)
    assert.equal(detail.links.filter(link => link.url === chosen.link).length, 1, app.id)
    if (snapshot.repositories[chosen.repository]) assert.ok(stats, app.id)
  }
  assert.equal(mapping['davinci-resolve'].repository, null)
  assert.equal(mapping['gnome-web'].repository, null)
  assert.equal(getAppStars('unknown', mapping, snapshot), null)
  assert.throws(() => validateMapping({ bad: entry('owner/repo') }, apps))
  assert.throws(() => validateMapping({ bad: entry('../repo') }, [{ id: 'bad' }]))
  for (const url of ['https://github.com/a', 'https://github.com/a/b/issues', 'https://evil.example/a/b', 'https://github.com/a/b#readme']) assert.equal(repositoryFromUrl(url), null)
})

test('counts include genuine zero, format deterministically, and reject missing or mismatched records', () => {
  assert.deepEqual(formatStars(0), { compact: '0', full: '0' })
  assert.deepEqual(formatStars(12345), { compact: '12.3k', full: '12,345' })
  assert.deepEqual(formatStars(1000), { compact: '1k', full: '1,000' })
  assert.deepEqual(formatStars(1000000), { compact: '1m', full: '1,000,000' })
  const map = { app: entry('owner/repo') }
  assert.equal(getAppStars('app', map, { repositories: { 'owner/repo': record('owner/repo', 0) } }).stars, 0)
  for (const invalid of [undefined, record('different/repo'), record('owner/repo', -1), record('owner/repo', 2.5), { ...record('owner/repo'), fetchedAt: 'invalid' }]) {
    assert.equal(getAppStars('app', map, { repositories: { 'owner/repo': invalid } }), null)
  }
})

test('shared repositories fetch once, use stargazers_count, and preserve input data', async () => {
  const map = { first: entry('owner/repo'), second: entry('owner/repo'), absent: { repository: null } }
  const previous = { repositories: {} }
  const before = structuredClone(map)
  let requests = 0
  const result = await refreshSnapshot(map, previous, { ...options, token: 'test-token', fetchImpl: async (url, init) => {
    requests++
    assert.equal(url, 'https://api.github.com/repos/owner/repo')
    assert.equal(init.headers.Authorization, 'Bearer test-token')
    assert.equal(init.redirect, 'manual')
    assert.ok(init.signal instanceof AbortSignal)
    return response('Owner/Repo', 0)
  } })
  assert.equal(requests, 1)
  assert.deepEqual(result.snapshot.repositories['owner/repo'], { repository: 'owner/repo', stars: 0, fetchedAt: date })
  assert.deepEqual(getAppStars('first', map, result.snapshot), getAppStars('second', map, result.snapshot))
  assert.deepEqual(map, before)
  assert.deepEqual(previous, { repositories: {} })
})

test('partial failures preserve last good values, omit new failures, and allow other updates', async () => {
  const map = { a: entry('owner/a'), b: entry('owner/b'), c: entry('owner/c') }
  const previous = { repositories: { 'owner/a': record('owner/a') } }
  const result = await refreshSnapshot(map, previous, { ...options, fetchImpl: async url => url.endsWith('/c') ? response('owner/c', 42) : new Response('', { status: 404 }) })
  assert.deepEqual(result.snapshot.repositories['owner/a'], previous.repositories['owner/a'])
  assert.equal(result.snapshot.repositories['owner/b'], undefined)
  assert.equal(result.snapshot.repositories['owner/c'].stars, 42)
  assert.equal(result.successes, 1)
  assert.equal(result.failures.length, 2)
})

test('unchanged counts do not advance timestamps or rewrite the snapshot; writes are atomic', async () => {
  const map = { app: entry('owner/repo') }
  const previous = { repositories: { 'owner/repo': record('owner/repo') } }
  const result = await refreshSnapshot(map, previous, { ...options, fetchImpl: async () => response('owner/repo', 5) })
  assert.deepEqual(result.snapshot, previous)
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'app-star-write-'))
  try {
    const file = path.join(root, 'stats.json')
    assert.equal(await writeSnapshot(file, previous), true)
    fs.utimesSync(file, new Date(oldDate), new Date(oldDate))
    assert.equal(await writeSnapshot(file, result.snapshot), false)
    assert.equal(fs.statSync(file).mtime.toISOString(), oldDate)
    const changed = await refreshSnapshot(map, previous, { ...options, fetchImpl: async () => response('owner/repo', 6) })
    assert.equal(await writeSnapshot(file, changed.snapshot), true)
    assert.equal(JSON.parse(fs.readFileSync(file)).repositories['owner/repo'].fetchedAt, date)
    assert.deepEqual(fs.readdirSync(root), ['stats.json'])
  } finally { fs.rmSync(root, { recursive: true, force: true }) }
})

test('mapping changes prune old identities, and failures never transfer an old count to a new repository', async () => {
  const previous = { repositories: { 'old/repo': record('old/repo', 300) } }
  const result = await refreshSnapshot({ app: entry('new/repo') }, previous, { ...options, fetchImpl: async () => new Response('', { status: 404 }) })
  assert.deepEqual(result.snapshot, { repositories: {} })
  assert.equal(getAppStars('app', { app: entry('new/repo') }, previous), null)
  const removed = await refreshSnapshot({ app: { repository: null } }, previous, { ...options, fetchImpl: async () => { throw new Error('Must not fetch') } })
  assert.deepEqual(removed.snapshot, { repositories: {} })
})

test('rate limits respect Retry-After and stop requests when the wait exceeds the refresh budget', async () => {
  const delays = []
  let calls = 0
  const map = { app: entry('owner/repo') }
  const result = await refreshSnapshot(map, { repositories: {} }, { ...options, sleep: async ms => delays.push(ms), fetchImpl: async () => {
    calls++
    return calls === 1 ? new Response('', { status: 429, headers: { 'retry-after': '2' } }) : response('owner/repo', 1)
  } })
  assert.deepEqual(delays, [2000])
  assert.equal(result.successes, 1)
  calls = 0
  const limited = await refreshSnapshot({ a: entry('owner/a'), b: entry('owner/b') }, { repositories: { 'owner/b': record('owner/b') } }, {
    ...options, sleep: async () => { throw new Error('Must not wait beyond budget') }, fetchImpl: async () => {
      calls++
      return new Response('', { status: 403, headers: { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': String(Date.parse(date) / 1000 + 3600) } })
    },
  })
  assert.equal(calls, 1)
  assert.equal(limited.failures.length, 2)
  assert.equal(limited.snapshot.repositories['owner/b'].stars, 5)
})

test('transient errors retry with bounded backoff and authentication failure stops the batch', async () => {
  const delays = []
  let calls = 0
  const failed = await refreshSnapshot({ app: entry('owner/repo') }, { repositories: {} }, { ...options, sleep: async ms => delays.push(ms), fetchImpl: async () => {
    calls++
    if (calls === 1) throw new Error('Network failure')
    return new Response('', { status: 503 })
  } })
  assert.equal(calls, 3)
  assert.deepEqual(delays, [1000, 2000])
  assert.equal(failed.failures.length, 1)
  calls = 0
  const auth = await refreshSnapshot({ a: entry('owner/a'), b: entry('owner/b') }, { repositories: {} }, { ...options, fetchImpl: async () => { calls++; return new Response('', { status: 401 }) } })
  assert.equal(calls, 1)
  assert.equal(auth.failures.length, 2)
})

test('redirects, mismatched identities, private repositories, and invalid values cannot replace valid cached counts', async () => {
  const previous = { repositories: { 'owner/repo': record('owner/repo') } }
  const replies = [
    () => new Response('', { status: 301, headers: { location: 'https://api.github.com/repos/other/repo' } }),
    () => response('other/repo', 99),
    () => response('owner/repo', -1),
    () => new Response(JSON.stringify({ full_name: 'owner/repo', private: true, stargazers_count: 99 })),
  ]
  for (const fetchImpl of replies) {
    const result = await refreshSnapshot({ app: entry('owner/repo') }, previous, { ...options, fetchImpl })
    assert.deepEqual(result.snapshot, previous)
    assert.equal(result.failures.length, 1)
  }
})

test('star decoration does not change recent-coverage sorting', () => {
  const prepared = prepareApps(apps, articles)
  const decorated = prepared.map(app => ({ ...app, githubStars: getAppStars(app.id, mapping, snapshot) }))
  assert.deepEqual(filterApps(decorated, { sort: 'recent' }).map(app => [app.id, app.latestDate]), filterApps(prepared, { sort: 'recent' }).map(app => [app.id, app.latestDate]))
})

test('star sorting puts highest first, breaks ties alphabetically, and places missing counts below genuine zero', () => {
  const input = [
    { id: 'missing', name: 'A missing', category: 'Tools', description: 'find' },
    { id: 'zero', name: 'Zero', category: 'Tools', description: 'find', githubStars: { stars: 0 } },
    { id: 'beta', name: 'Beta', category: 'Tools', description: 'find', githubStars: { stars: 20 } },
    { id: 'alpha', name: 'Alpha', category: 'Tools', description: 'find', githubStars: { stars: 20 } },
    { id: 'high', name: 'Highest', category: 'Other', description: 'find', githubStars: { stars: 50 } },
  ]
  const before = structuredClone(input)
  assert.deepEqual(filterApps(input, { sort: 'stars' }).map(app => app.id), ['high', 'alpha', 'beta', 'zero', 'missing'])
  assert.deepEqual(filterApps(input, { sort: 'stars', category: 'Tools', query: 'find' }).map(app => app.id), ['alpha', 'beta', 'zero', 'missing'])
  assert.deepEqual(input, before)
})

test('a later statistics commit or file modification cannot change app content dates', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'app-star-dates-'))
  const run = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' })
  const write = (file, value) => { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, JSON.stringify(value)) }
  const records = [{ id: 'fixture', coverage: [], videos: [{ id: 'video', published: '2020-01-01' }] }]
  const commit = date => {
    run('add', '.')
    execFileSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'fixture'], { cwd: root, stdio: 'pipe', env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date } })
  }
  try {
    fs.mkdirSync(path.join(root, 'src/content'), { recursive: true })
    write('src/data/apps.json', records)
    write('src/data/app-details/fixture.json', { summary: 'Fixture' })
    run('init')
    commit('2021-01-01T12:00:00Z')
    write('src/data/github-stars.json', snapshot)
    commit('2026-09-06T12:00:00Z')
    assert.equal(getAppDetail('fixture', records, [], root).details.updatedAt, '2021-01-01T12:00:00.000Z')
    fs.rmSync(path.join(root, '.git'), { recursive: true, force: true })
    for (const file of ['src/data/apps.json', 'src/data/app-details/fixture.json']) fs.utimesSync(path.join(root, file), new Date(oldDate), new Date(oldDate))
    const archive = fs.mkdtempSync(path.join(os.tmpdir(), 'app-star-archive-'))
    try {
      fs.cpSync(path.join(root, 'src'), path.join(archive, 'src'), { recursive: true, preserveTimestamps: true })
      assert.equal(getAppDetail('fixture', records, [], archive).details.updatedAt, oldDate)
    } finally { fs.rmSync(archive, { recursive: true, force: true }) }
  } finally { fs.rmSync(root, { recursive: true, force: true }) }
})
