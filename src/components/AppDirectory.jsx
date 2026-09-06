import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { filterApps } from '@/lib/appDirectory'
import { AppCard } from '@/components/AppCard'
import { directoryApps as apps } from '@/data/directoryApps'

const categories = [...new Set(apps.map(app => app.category))].sort()
const controlStyle = 'rounded-sm border border-zinc-300 bg-zinc-50 text-sm text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800 dark:border-line-strong dark:bg-dark-lighter dark:text-ink dark:focus-visible:outline-primary-500'

export function AppDirectory() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('name')
  const results = filterApps(apps, { query, category, sort })
  const filtered = query.trim() || category !== 'All'

  function reset() {
    setQuery('')
    setCategory('All')
  }

  return (
    <div className="not-prose mt-8">
      <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-2xs uppercase tracking-wider text-zinc-500 dark:text-ink-faint">
        <span><span className="text-primary-800 dark:text-primary-500">{apps.length}</span> apps & tools</span>
        <span>{categories.length} categories</span>
        <span>Articles & videos</span>
      </div>

      <div className="grid gap-4 border-y border-zinc-200 py-5 dark:border-line sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_12rem_12rem]">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="app-search" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-ink-dim">Find an app</label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-zinc-500" />
            <input id="app-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search apps, tools, or what they do…" className={`${controlStyle} h-11 w-full pl-10 pr-3`} />
          </div>
        </div>
        <div>
          <label htmlFor="app-category" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-ink-dim">Category</label>
          <select id="app-category" value={category} onChange={event => setCategory(event.target.value)} className={`${controlStyle} h-11 w-full px-3`}>
            <option value="All">All categories</option>
            {categories.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="app-sort" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-ink-dim">Sort by</label>
          <select id="app-sort" value={sort} onChange={event => setSort(event.target.value)} className={`${controlStyle} h-11 w-full px-3`}>
            <option value="name">Name: A–Z</option>
            <option value="recent">Recently covered</option>
            <option value="stars">Most GitHub stars</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-zinc-500 dark:text-ink-faint">Star counts are shown for verified GitHub repositories. Some apps are hosted elsewhere or have no public repository. {sort === 'stars' && 'Apps without a count appear last.'}</p>

      <div className="my-5 flex min-h-8 flex-wrap items-center justify-between gap-2">
        <p role="status" aria-live="polite" className="text-sm text-zinc-500 dark:text-ink-faint">Showing {results.length} of {apps.length} apps</p>
        {filtered && <button type="button" onClick={reset} className="inline-flex min-h-10 items-center gap-2 text-sm text-primary-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-primary-500"><X aria-hidden="true" className="h-4 w-4" />Clear filters</button>}
      </div>

      {results.length ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map(app => <AppCard key={app.id} app={app} />)}
        </ul>
      ) : (
        <div className="border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-line-strong">
          <h2 className="font-display text-xl font-bold text-zinc-900 dark:text-ink">No apps found</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-ink-dim">Try a different search or choose another category.</p>
          <button type="button" onClick={reset} className="mt-5 min-h-11 rounded-sm bg-primary-500 px-5 text-sm font-semibold text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Clear filters</button>
        </div>
      )}
      <p className="mt-8 text-xs text-zinc-500 dark:text-ink-faint">Logos from <a href="https://github.com/selfhst/icons" className="underline underline-offset-4">selfh.st/icons</a> (<a href="https://creativecommons.org/licenses/by/4.0/" className="underline underline-offset-4">CC BY 4.0</a>), <a href="https://github.com/homarr-labs/dashboard-icons" className="underline underline-offset-4">Dashboard Icons</a>, <a href="https://flathub.org" className="underline underline-offset-4">Flathub</a>, and official app projects. App names and logos belong to their respective owners.</p>
    </div>
  )
}
