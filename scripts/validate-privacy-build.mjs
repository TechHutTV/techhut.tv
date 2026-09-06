// Read an isolated production build; never start or replace the development server.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(process.argv[2] || '.')
const read = file => readFileSync(join(root, file), 'utf8')
const manifest = JSON.parse(read('.next/prerender-manifest.json'))
const sitemap = read('public/sitemap.xml')
const pages = [
  ['/privacy', 'Privacy policy'],
  ['/privacy-settings', 'Analytics preferences'],
]

for (const [route, title] of pages) {
  assert.ok(manifest.routes[route], `${route}: missing static route`)
  const html = read(`.next/server/pages${route}.html`)
  const { pageProps } = JSON.parse(read(`.next/server/pages${route}.json`))
  assert.equal(pageProps.title, title)
  assert.ok(pageProps.description?.length > 30, `${route}: missing description`)
  assert.equal(pageProps.date, '', `${route}: should not have an article publication date`)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: expected one page heading`)
  assert.equal(html.match(/<title\b[^>]*>(.*?)<\/title>/)?.[1], `${title} - TechHut`)
  assert.ok(html.includes(`rel="canonical" href="https://techhut.tv${route}"`))
  assert.equal((sitemap.match(new RegExp(`<loc>https://techhut.tv${route}</loc>`, 'g')) || []).length, 1)
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1]
  assert.ok(article, `${route}: shared prose layout missing`)
  assert.doesNotMatch(article, /\[(?:Confirm|Include|Supply|The owner)|internal draft|Not ready for publication|TODO/, `${route}: internal notes leaked`)
  assert.doesNotMatch(html, /<script\b[^>]*src="[^"]*(?:matomo\.hopkins\.sh|googletagmanager\.com|google-analytics\.com|\/_vercel\/)/, `${route}: analytics loaded before browser preference`)

  const otherRoute = route === '/privacy' ? '/privacy-settings' : '/privacy'
  assert.ok(article.includes(`href="${otherRoute}"`), `${route}: missing reciprocal privacy link`)
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]
  assert.ok(footer?.includes('aria-label="Privacy"'))
  for (const [href, label] of pages.map(([href, label]) => [href, href === '/privacy-settings' ? 'Analytics opt-out' : label])) {
    const link = (footer.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) || []).find(link => link.includes(`href="${href}"`))
    assert.ok(link?.includes(label) && link.includes('focus-visible:outline'), `${route}: missing accessible ${label} footer link`)
  }
}

const policy = read('.next/server/pages/privacy.html')
assert.match(policy, /<time dateTime="\d{4}-\d{2}-\d{2}">/)
assert.ok(policy.includes('mailto:brandon@techhut.tv'))
assert.ok(policy.includes('https://www.themidgame.com/privacy-policy'))
assert.doesNotMatch(policy, /GDPR-compliant|fully anonymous|100% anonymous/i)
assert.ok(!JSON.parse(read('src/data/articles.js').split('export const articles = ')[1]).some(article => pages.some(([route]) => article.href === route)), 'Privacy pages must not enter the article directory')
console.log('Validated both static privacy routes, metadata, sitemap entries, shared layout, reciprocal links, accessible footer links, and no draft notes or initial analytics loaders.')
