import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { FeaturedArticle } from '@/components/FeaturedArticle'
import { AppVideo } from '@/components/AppVideo'

const formatDate = value => new Date(`${value.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const linkStyle = 'inline-flex min-h-11 items-center justify-center gap-2 border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-primary-600 hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:border-line-strong dark:text-ink dark:hover:border-primary-500 dark:hover:text-primary-500'

export function AppDetail({ app }) {
  const { details } = app
  return (
    <div className="not-prose mx-auto max-w-5xl">
      <Link href="/apps" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-zinc-600 hover:text-primary-800 dark:text-ink-dim dark:hover:text-primary-500">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All apps
      </Link>

      <header className="border border-zinc-300 bg-zinc-50 p-6 dark:border-line-strong dark:bg-dark-lighter sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image src={app.icon} alt="" width={112} height={112} priority className="h-24 w-24 flex-none object-contain sm:h-28 sm:w-28" />
          <div className="min-w-0">
            <p className="mb-3 font-mono text-2xs uppercase tracking-wider text-primary-800 dark:text-primary-500">{app.category} · Self-hosted</p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-ink sm:text-5xl">{app.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-ink-dim">{details.summary}</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2" aria-label="Project links">
          {details.links.map(link => <a key={link.url} href={link.url} className={linkStyle}>{link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>)}
        </div>

        <dl className="mt-8 grid gap-6 border-t border-zinc-200 pt-6 text-sm dark:border-line sm:grid-cols-3">
          <div><dt className="mb-2 font-mono text-2xs uppercase tracking-wider text-zinc-500 dark:text-ink-faint">License</dt><dd><a href={details.license.url} className="text-primary-800 underline underline-offset-4 dark:text-primary-500">{details.license.name} · Open source</a></dd></div>
          <div><dt className="mb-2 font-mono text-2xs uppercase tracking-wider text-zinc-500 dark:text-ink-faint">Runs on</dt><dd className="text-zinc-700 dark:text-ink-dim">{details.platforms.join(' · ')}</dd></div>
          <div><dt className="mb-2 font-mono text-2xs uppercase tracking-wider text-zinc-500 dark:text-ink-faint">Last updated</dt><dd className="text-zinc-700 dark:text-ink-dim"><time dateTime={details.updatedAt}>{formatDate(details.updatedAt)}</time></dd></div>
        </dl>
      </header>

      <ul aria-label="Features" className="mt-5 flex flex-wrap gap-2">
        {details.features.map(feature => <li key={feature} className="border border-zinc-200 px-3 py-2 text-xs text-zinc-600 dark:border-line dark:text-ink-dim">{feature}</li>)}
      </ul>

      {app.coverage.length > 0 && <section aria-labelledby="app-articles" className="mt-12">
        <h2 id="app-articles" className="font-display text-2xl font-bold text-zinc-900 dark:text-ink">Read the guide</h2>
        {app.coverage.map(article => <FeaturedArticle key={article.href} article={article} />)}
      </section>}

      {app.videos.length > 0 && <section aria-labelledby="app-videos" className="mt-12">
        <h2 id="app-videos" className="mb-6 font-display text-2xl font-bold text-zinc-900 dark:text-ink">Watch it in action</h2>
        <div className="space-y-8">
          {app.videos.map(video => <AppVideo key={video.id} video={video} />)}
        </div>
      </section>}
    </div>
  )
}
