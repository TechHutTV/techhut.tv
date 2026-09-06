// Exercise the real JSX badge with Next's installed compiler; no browser/network.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transform } from 'next/dist/build/swc/index.js'
import * as starHelpers from '../src/lib/appStars.js'

const require = createRequire(import.meta.url)
const source = fs.readFileSync(new URL('../src/components/GitHubStars.jsx', import.meta.url), 'utf8')
const { code } = await transform(source, {
  filename: 'GitHubStars.jsx',
  jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } },
  module: { type: 'commonjs' },
})
const compiled = { exports: {} }
vm.runInNewContext(code, { exports: compiled.exports, require: id => id === '@/lib/appStars' ? starHelpers : require(id) })
const { GitHubStars } = compiled.exports
const render = stats => renderToStaticMarkup(React.createElement(GitHubStars, { stats }))

test('the actual badge renders zero and compact counts with full screen-reader text and no nested link', () => {
  for (const [stars, compact, full] of [[0, '0', '0'], [12345, '12.3k', '12,345']]) {
    const html = render({ repository: 'owner/repo', label: 'Project', stars })
    assert.ok(html.includes(`aria-hidden="true">${compact} GitHub stars</span>`))
    assert.ok(html.includes(`class="sr-only">${full} GitHub stars for owner/repo</span>`))
    assert.ok(html.includes('data-github-stars="owner/repo"'))
    assert.doesNotMatch(html, /<a\b|<button\b/)
  }
})

test('the actual badge renders nothing for an absent count', () => {
  assert.equal(render(null), '')
  assert.equal(render(undefined), '')
})
