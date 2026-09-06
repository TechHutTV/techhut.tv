import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { transform } from 'next/dist/build/swc/index.js'
import * as preferences from '../src/lib/analyticsPreference.js'

const { readAnalyticsPreference, saveAnalyticsPreference, analyticsBeforeSend, stopMatomoTracking } = preferences
const storage = (value = null) => ({ getItem: () => value, setItem: (_, next) => { value = next } })

test('preference defaults to analytics allowed, persists opt-out, and can be reversed', () => {
  const local = storage()
  assert.equal(readAnalyticsPreference(local), 'in')
  assert.equal(saveAnalyticsPreference(local, 'out'), true)
  assert.equal(readAnalyticsPreference(local), 'out')
  assert.equal(saveAnalyticsPreference(local, 'in'), true)
  assert.equal(readAnalyticsPreference(local), 'in')
  assert.equal(saveAnalyticsPreference(local, 'bad'), false)
})

test('blocked, corrupt, or silently failing storage cannot falsely confirm a choice', () => {
  const blocked = { getItem() { throw Error('blocked') }, setItem() { throw Error('blocked') } }
  assert.equal(readAnalyticsPreference(blocked), 'unavailable')
  assert.equal(readAnalyticsPreference(storage('corrupt')), 'unavailable')
  assert.equal(saveAnalyticsPreference(blocked, 'out'), false)
  assert.equal(saveAnalyticsPreference({ getItem: () => null, setItem() {} }, 'out'), false)
})

test('opting out immediately stops Matomo and blocks queued Vercel events', () => {
  const previous = globalThis.window
  const browser = { localStorage: storage(), _paq: [] }
  globalThis.window = browser
  try {
    const event = { type: 'pageview', url: 'https://techhut.tv/' }
    assert.equal(analyticsBeforeSend(event), event)
    stopMatomoTracking(browser)
    assert.deepEqual(browser._paq, [['optUserOut']])
    assert.equal(analyticsBeforeSend(event), null)
    delete browser.__techhutAnalyticsDisabled
    browser.localStorage = storage('out')
    assert.equal(analyticsBeforeSend(event), null)
    Object.defineProperty(browser, 'localStorage', { get() { throw Error('blocked') } })
    assert.equal(analyticsBeforeSend(event), null)
  } finally { globalThis.window = previous }
})

const require = createRequire(import.meta.url)
const source = fs.readFileSync(new URL('../src/components/Matomo.jsx', import.meta.url), 'utf8')
const { code } = await transform(source, {
  filename: 'Matomo.jsx',
  jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } },
  module: { type: 'commonjs' },
})
const compiled = { exports: {} }
vm.runInNewContext(code, { exports: compiled.exports, require: id => id === '@/lib/analyticsPreference' ? preferences : require(id) })
const bootstrap = compiled.exports.MatomoTagManager().props.children

test('actual Matomo bootstrap suppresses requests for opt-out, unavailable storage, and a late withdrawal', () => {
  for (const choice of [null, 'in', 'out', 'corrupt', 'blocked', 'late-out']) {
    const scripts = []
    const browser = { localStorage: storage(choice === 'late-out' ? null : choice) }
    if (choice === 'blocked') Object.defineProperty(browser, 'localStorage', { get() { throw Error('blocked') } })
    if (choice === 'late-out') browser.__techhutAnalyticsDisabled = true
    const document = {
      createElement: () => ({}),
      getElementsByTagName: () => [{ parentNode: { insertBefore: script => scripts.push(script.src) } }],
    }
    vm.runInNewContext(bootstrap, { window: browser, document })
    assert.equal(scripts.length, choice === null || choice === 'in' ? 1 : 0, String(choice))
    if (choice === 'in') assert.equal(browser._paq[0][0], 'forgetUserOptOut')
    if (choice === null) assert.equal(browser._paq, undefined, 'Do not override a pre-existing native Matomo opt-out by default')
  }
})
