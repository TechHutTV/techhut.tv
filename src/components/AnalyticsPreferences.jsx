import { createContext, useContext, useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MatomoTagManager } from '@/components/Matomo'
import { ANALYTICS_PREFERENCE_KEY, analyticsBeforeSend, readAnalyticsPreference, saveAnalyticsPreference, stopMatomoTracking } from '@/lib/analyticsPreference'

const AnalyticsContext = createContext(null)

function readPreference() {
  try { return readAnalyticsPreference(window.localStorage) } catch { return 'unavailable' }
}

export function AnalyticsPreferencesProvider({ children }) {
  const [preference, setPreference] = useState('pending')
  const [error, setError] = useState(false)

  useEffect(() => {
    setPreference(readPreference())
    function onStorage(event) {
      if (event.key !== null && event.key !== ANALYTICS_PREFERENCE_KEY) return
      stopMatomoTracking(window)
      window.location.reload()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  function changePreference(value) {
    // Block queued Vercel events and Matomo tracking before saving or unloading.
    stopMatomoTracking(window)
    setPreference('out')
    let saved = false
    try { saved = saveAnalyticsPreference(window.localStorage, value) } catch { /* Storage may be blocked. */ }
    if (!saved) {
      setError(true)
      return
    }
    // Removing React components alone does not stop third-party timers/listeners.
    window.location.reload()
  }

  return (
    <AnalyticsContext.Provider value={{ preference, error, changePreference }}>
      {children}
      {preference === 'in' && <>
        <MatomoTagManager />
        <Analytics beforeSend={analyticsBeforeSend} />
        <SpeedInsights beforeSend={analyticsBeforeSend} />
      </>}
    </AnalyticsContext.Provider>
  )
}

const buttonStyle = 'min-h-11 border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:border-primary-600 hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 disabled:opacity-50 dark:border-line-strong dark:text-ink dark:hover:text-primary-500'

export function AnalyticsPreferenceControl() {
  const { preference, error, changePreference } = useContext(AnalyticsContext)
  return (
    <div className="not-prose my-6 border border-zinc-300 bg-zinc-50 p-6 dark:border-line-strong dark:bg-dark-lighter">
      <p role="status" className="text-sm text-zinc-700 dark:text-ink-dim">
        {preference === 'pending' ? 'Checking your analytics preference…' : preference === 'unavailable' ? 'Analytics is off because your browser preference could not be read.' : preference === 'out' ? 'Analytics is off in this browser.' : 'Analytics is allowed in this browser.'}
      </p>
      {error && <p role="alert" className="mt-3 text-sm text-zinc-700 dark:text-ink-dim">Your browser could not save this choice. Analytics is off for this page, but the choice may not persist. Allow this site to store preferences and try again.</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => changePreference('out')} disabled={preference === 'pending' || (preference === 'out' && !error)} className={buttonStyle}>Opt out of analytics</button>
        <button type="button" onClick={() => changePreference('in')} disabled={preference === 'pending' || preference === 'in'} className={buttonStyle}>Allow analytics</button>
      </div>
      <noscript><p className="mt-3 text-sm">JavaScript is disabled, so this site’s JavaScript analytics does not run. Enable JavaScript to save a preference for future visits with JavaScript enabled.</p></noscript>
    </div>
  )
}
