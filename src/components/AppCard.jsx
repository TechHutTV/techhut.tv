import Link from 'next/link'
import Image from 'next/image'
import { GitHubStars } from '@/components/GitHubStars'

export function AppCard({ app, heading: Heading = 'h2' }) {
  return (
    <li className="flex min-w-0 flex-col border border-zinc-300 bg-zinc-50 transition-colors hover:border-primary-600 dark:border-line-strong dark:bg-dark-lighter dark:hover:border-primary-500">
      <Link href={app.details?.href || `/apps/${app.id}`} className="group flex flex-1 flex-col p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-16 w-16 flex-none items-center justify-center">
            {app.icon ? <Image src={app.icon} alt="" width={64} height={64} sizes="64px" className={`h-16 w-16 object-contain ${app.iconDark ? 'dark:hidden' : ''} ${app.iconInvertDark ? 'dark:invert' : ''} ${app.iconInvertLight ? 'invert dark:invert-0' : ''}`} /> : <span aria-hidden="true" className="font-mono text-2xl font-semibold text-zinc-700 dark:text-ink-dim">{app.name.slice(0, 2).toUpperCase()}</span>}
            {app.iconDark && <Image src={app.iconDark} alt="" width={64} height={64} sizes="64px" className="hidden h-16 w-16 object-contain dark:block" />}
          </div>
          <div className="min-w-0">
            <Heading className="font-display text-xl font-bold leading-snug text-zinc-900 dark:text-ink">{app.name}</Heading>
            <p className="mt-2 font-mono text-2xs text-zinc-500 dark:text-ink-faint">{app.category}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-zinc-600 dark:text-ink-dim">{app.description}</p>
        {app.githubStars && <div className="mt-auto pt-6">
          <p className="border-t border-zinc-200 pt-3 dark:border-line"><GitHubStars stats={app.githubStars} /></p>
        </div>}
      </Link>
    </li>
  )
}
