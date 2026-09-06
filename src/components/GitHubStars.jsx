import { Star } from 'lucide-react'
import { formatStars } from '@/lib/appStars'

export function GitHubStars({ stats }) {
  if (!stats) return null
  const { compact, full } = formatStars(stats.stars)
  return (
    <span data-github-stars={stats.repository} className="inline-flex items-center gap-1.5 font-mono text-2xs text-zinc-500 dark:text-ink-faint" title={`${stats.label} (${stats.repository})`}>
      <Star aria-hidden="true" className="h-3.5 w-3.5 flex-none" />
      <span aria-hidden="true">{compact} GitHub stars</span>
      <span className="sr-only">{full} GitHub stars for {stats.repository}</span>
    </span>
  )
}
