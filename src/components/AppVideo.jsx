import { useId, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Play } from 'lucide-react'

export function AppVideo({ video }) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const published = new Date(`${video.published}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

  return (
    <div className="border border-zinc-300 bg-zinc-50 dark:border-line-strong dark:bg-dark-lighter">
      <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpanded(value => !value)} className="group flex w-full flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 sm:flex-row sm:items-center">
        <span className="relative block aspect-video w-full flex-none overflow-hidden sm:w-60">
          <Image src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt="" fill unoptimized sizes="(max-width: 640px) 100vw, 240px" className="object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/30"><span className="flex h-12 w-12 items-center justify-center bg-red-600 text-white"><Play aria-hidden="true" className="h-6 w-6 fill-current" /></span></span>
        </span>
        <span className="block flex-1 p-5 sm:p-6">
          <span className="block font-display text-lg font-semibold text-zinc-900 dark:text-ink">{video.title}</span>
          <time dateTime={video.published} className="mt-2 block text-xs text-zinc-500 dark:text-ink-faint">{published}</time>
          <span className="mt-3 flex items-center gap-2 text-sm font-medium text-primary-800 dark:text-primary-500">{expanded ? 'Close video' : 'Play video'}<ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} /></span>
        </span>
      </button>
      <div id={panelId} hidden={!expanded}>
        {expanded && <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="aspect-video w-full border-0 border-t border-zinc-300 dark:border-line-strong" />}
      </div>
    </div>
  )
}
