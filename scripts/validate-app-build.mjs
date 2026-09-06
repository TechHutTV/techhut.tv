// Inspect an isolated production build without starting or replacing a dev server.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { getAppStars, formatStars } from '../src/lib/appStars.js'
import { filterApps } from '../src/lib/appDirectory.js'

const root = resolve(process.argv[2] || '.')
const read = file => readFileSync(join(root, file), 'utf8')
const records = JSON.parse(read('src/data/apps.json'))
const repositories = JSON.parse(read('src/data/app-repositories.json'))
const starSnapshot = JSON.parse(read('src/data/github-stars.json'))
const manifest = JSON.parse(read('.next/prerender-manifest.json'))
const sitemap = read('public/sitemap.xml')
const directory = read('.next/server/pages/apps.html').replace(/<!--.*?-->/g, '')
const escape = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' }[char]))
assert.equal(manifest.dynamicRoutes['/apps/[id]'].fallback, false)
assert.ok(!directory.includes('Covered <time'), 'Directory still shows coverage dates')
const cards = directory.match(/<li\b[^>]*>[\s\S]*?<\/li>/g) || []
const generatedApps = []
for (const record of records) {
  const href = `/apps/${record.id}`
  const html = read(`.next/server/pages${href}.html`).replace(/<!--.*?-->/g, '')
  const { pageProps } = JSON.parse(read(`.next/server/pages${href}.json`))
  const { app } = pageProps
  generatedApps.push(app)
  assert.ok(manifest.routes[href], href)
  assert.ok(directory.includes(`href="${href}"`), href)
  const card = cards.find(card => card.includes(`href="${href}"`))
  assert.ok(card, `${href}: missing directory card`)
  assert.equal((card.match(/<a\b/g) || []).length, 1, `${href}: card must be a single link`)
  assert.doesNotMatch(card, /<button\b|<time\b/, `${href}: card has nested controls or a covered date`)
  assert.match(card, /focus-visible:outline/, `${href}: card needs a keyboard focus indicator`)
  const stars = getAppStars(record.id, repositories, starSnapshot)
  assert.deepEqual(app.githubStars, stars, `${href}: stale or mismatched star props`)
  for (const markup of [card, html]) {
    assert.equal((markup.match(/data-github-stars=/g) || []).length, stars ? 1 : 0, `${href}: incorrect star badge count`)
    if (stars) {
      const { compact, full } = formatStars(stars.stars)
      assert.ok(markup.includes(`data-github-stars="${stars.repository}"`), href)
      assert.ok(markup.includes(`>${compact} GitHub stars</span>`), href)
      assert.ok(markup.includes(`>${full} GitHub stars for ${stars.repository}</span>`), href)
    }
  }
  if (!stars) assert.doesNotMatch(card, /mt-auto pt-6|border-t /, `${href}: empty star footer`)
  if (stars) {
    const projectLink = (html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) || []).find(link => link.includes(`href="${escape(stars.link)}"`))
    assert.ok(projectLink?.includes(`data-github-stars="${stars.repository}"`), `${href}: count must identify its project link`)
  }
  assert.equal((sitemap.match(new RegExp(`<loc>https://techhut.tv${href}</loc>`, 'g')) || []).length, 1, href)
  assert.ok(sitemap.includes(`<loc>https://techhut.tv${href}</loc>\n    <lastmod>${app.details.updatedAt.slice(0, 10)}</lastmod>`), href)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, href)
  assert.ok(html.includes(`>${escape(app.name)} - TechHut</title>`), href)
  assert.ok(html.includes(`rel="canonical" href="https://techhut.tv${href}"`), href)
  assert.ok(html.includes(`name="description" content="${escape(app.details.summary)}"`), href)
  assert.ok(pageProps.wide && pageProps.hideTitle, href)
  assert.ok(html.includes('Last updated'), href)
  assert.ok(html.includes(`dateTime="${app.details.updatedAt}"`), href)
  assert.equal(html.includes('id="app-articles"'), app.coverage.length > 0, href)
  assert.equal(html.includes('id="app-videos"'), app.videos.length > 0, href)
  if (app.coverage.length && app.videos.length) assert.ok(html.indexOf('id="app-articles"') < html.indexOf('id="app-videos"'), href)
  let position = -1
  for (const article of app.coverage) {
    const next = html.indexOf(`Read ${escape(article.title)}</span>`, position + 1)
    assert.ok(next > position, `${href}: article missing or out of order: ${article.href}`)
    position = next
  }
  position = -1
  for (const video of app.videos) {
    const next = html.indexOf(`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`, position + 1)
    assert.ok(next > position, `${href}: video missing or out of order: ${video.id}`)
    position = next
  }
  assert.equal((html.match(/aria-expanded="false" aria-controls=/g) || []).length, app.videos.length, href)
  assert.ok(!/<iframe[^>]+src="[^"]*youtube/.test(html), `${href}: player loaded before expansion`)
  assert.doesNotMatch(html, /src="(?:undefined|null)"/, href)
  for (const link of app.details.links) assert.ok(html.includes(`href="${escape(link.url)}"`), `${href}: ${link.url}`)
}
const homepage = read('.next/server/pages/index.html').replace(/<!--.*?-->/g, '')
const recentSection = homepage.match(/<section id="recent-apps"[\s\S]*?<\/section>/)?.[0]
assert.ok(recentSection, 'Homepage missing recently covered apps')
assert.ok(homepage.indexOf('guides and tutorials</p>') < homepage.indexOf('id="recent-apps"'), 'Recent apps must follow the guide count')
assert.ok(homepage.indexOf('id="recent-apps"') < homepage.indexOf('Browse by Topic'), 'Recent apps must precede topics')
const recentCards = recentSection.match(/<li\b[^>]*>[\s\S]*?<\/li>/g) || []
const expectedRecent = filterApps(generatedApps, { sort: 'recent' }).slice(0, 12)
assert.equal(recentCards.length, expectedRecent.length, 'Homepage must include twelve recent apps')
assert.ok(recentSection.includes('aria-label="Previous apps"') && recentSection.includes('aria-label="Next apps"'), 'Recent apps need labeled scroll controls')
assert.ok(recentSection.includes('id="recent-apps-list" role="region" aria-labelledby="recent-apps-title" tabindex="0"'), 'Recent apps need a keyboard-focusable scroll region')
assert.ok(recentSection.includes('overflow-x-auto') && recentSection.includes('snap-x'), 'Recent apps must scroll horizontally')
for (const [index, app] of expectedRecent.entries()) {
  const card = recentCards[index]
  const directoryCard = cards.find(card => card.includes(`href="/apps/${app.id}"`))
  assert.equal(card.replace(/<(\/?)h3\b/g, '<$1h2'), directoryCard, `${app.id}: homepage and directory cards differ`)
}
assert.ok(!recentSection.includes('href="/apps"'), 'Recent apps should use the directory link already provided by the hero')
console.log(`Validated ${records.length} static app routes, single-link cards, cached stars and omissions, metadata, coverage order, deferred players, and sitemap dates; unknown IDs use fallback: false.`)
console.log(`Validated homepage placement, scroll controls, and ${expectedRecent.length} recent shared app cards: ${expectedRecent.map(app => app.name).join(', ')}.`)
