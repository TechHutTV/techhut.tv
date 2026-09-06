import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AppCard } from '@/components/AppCard'
import { directoryApps } from '@/data/directoryApps'
import { filterApps } from '@/lib/appDirectory'

const sortedApps = filterApps(directoryApps, { sort: 'recent' })
const scrollButtonStyle = 'inline-flex h-11 w-11 items-center justify-center border border-zinc-300 text-zinc-700 hover:border-primary-600 hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-30 disabled:hover:border-zinc-300 disabled:hover:text-zinc-700 dark:border-line-strong dark:text-ink-dim dark:hover:border-primary-500 dark:hover:text-primary-500 dark:disabled:hover:border-line-strong dark:disabled:hover:text-ink-dim'

export function RecentApps({ limit = 12 }) {
  const recentApps = sortedApps.slice(0, limit)
  const railRef = useRef(null)
  const [canScroll, setCanScroll] = useState({ previous: false, next: recentApps.length > 1 })
  const updateControls = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const previous = rail.scrollLeft > 1
    const next = rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 1
    setCanScroll(current => current.previous === previous && current.next === next ? current : { previous, next })
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    updateControls()
    const observer = new ResizeObserver(updateControls)
    observer.observe(rail)
    return () => observer.disconnect()
  }, [recentApps.length, updateControls])

  function scroll(direction) {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction * (rail.clientWidth + 20),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  if (!recentApps.length) return null

  return (
    <section id="recent-apps" aria-labelledby="recent-apps-title" className="not-prose mb-12">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <h2 id="recent-apps-title" className="font-display text-2xl font-bold text-zinc-900 dark:text-ink">Recently covered apps</h2>
        {recentApps.length > 1 && <div className="flex gap-2">
          <button type="button" aria-label="Previous apps" aria-controls="recent-apps-list" disabled={!canScroll.previous} onClick={() => scroll(-1)} className={scrollButtonStyle}><ArrowLeft aria-hidden="true" className="h-4 w-4" /></button>
          <button type="button" aria-label="Next apps" aria-controls="recent-apps-list" disabled={!canScroll.next} onClick={() => scroll(1)} className={scrollButtonStyle}><ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
        </div>}
      </div>
      {/* Contain positioned screen-reader labels within the scroller's clipping area. */}
      <div ref={railRef} id="recent-apps-list" role="region" aria-labelledby="recent-apps-title" tabIndex={0} onScroll={updateControls} className="relative snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
        <ul className="grid auto-cols-[85%] grid-flow-col gap-5 sm:auto-cols-[calc((100%_-_1.25rem)/2)] xl:auto-cols-[calc((100%_-_2.5rem)/3)] [&>li]:snap-start">
          {recentApps.map(app => <AppCard key={app.id} app={app} heading="h3" />)}
        </ul>
      </div>
    </section>
  )
}
