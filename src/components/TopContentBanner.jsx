import { useState } from 'react'
import { topContentBannerConfig } from '@/data/topContentBanner'

export function TopContentBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { enabled, html } = topContentBannerConfig

  if (!enabled || !html?.trim() || dismissed) {
    return null
  }

  return (
    <div className="my-8 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-0 right-0 p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        aria-label="Dismiss banner"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
