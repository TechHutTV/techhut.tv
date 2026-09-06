export const ANALYTICS_PREFERENCE_KEY = 'techhut.analytics.v1'

export function readAnalyticsPreference(storage) {
  try {
    const value = storage.getItem(ANALYTICS_PREFERENCE_KEY)
    if (value === null || value === 'in') return 'in'
    if (value === 'out') return 'out'
    return 'unavailable'
  } catch {
    return 'unavailable'
  }
}

export function saveAnalyticsPreference(storage, value) {
  if (value !== 'in' && value !== 'out') return false
  try {
    storage.setItem(ANALYTICS_PREFERENCE_KEY, value)
    return storage.getItem(ANALYTICS_PREFERENCE_KEY) === value
  } catch {
    return false
  }
}

export function analyticsBeforeSend(event) {
  try {
    return !window.__techhutAnalyticsDisabled && readAnalyticsPreference(window.localStorage) === 'in' ? event : null
  } catch {
    return null
  }
}

export function stopMatomoTracking(browser) {
  // Stop an already loaded tracker, or queue the command if it is still loading.
  browser.__techhutAnalyticsDisabled = true
  try {
    browser._paq = browser._paq || []
    browser._paq.push(['optUserOut'])
  } catch {
    // The subsequent reload removes trackers even if an extension blocked Matomo.
  }
}
