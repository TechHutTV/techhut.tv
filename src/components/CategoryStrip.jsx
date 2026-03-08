import Link from 'next/link'
import clsx from 'clsx'

import { articles } from '@/data/articles'

const CATEGORIES = ['Guides', 'Essay', 'Software', 'Benchmarking', 'Hardware']

const categoryIcons = {
  Guides: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 1.5h4a1 1 0 0 1 1 1v12l-2.5-2-2.5 2v-12a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 3.5h6a1 1 0 0 1 1 1v10l-2.5-2-2.5 2v-10a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Essay: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11.5 1.5 14 4l-8.5 8.5H3v-2.5L11.5 1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 3.5l2 2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14.5h10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  Software: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m5 4.5-3.5 3.5 3.5 3.5M11 4.5l3.5 3.5-3.5 3.5M9 2.5l-2 11"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Benchmarking: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="1.5"
        y="9"
        width="3"
        height="5.5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="6.5"
        y="5.5"
        width="3"
        height="9"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="11.5"
        y="1.5"
        width="3"
        height="13"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  ),
  Hardware: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="8"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="6"
        y="6"
        width="4"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M6 4V2M10 4V2M6 14v-2M10 14v-2M4 6H2M4 10H2M14 6h-2M14 10h-2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
}

function getCategoryCounts() {
  const counts = {}
  for (const category of CATEGORIES) {
    counts[category] = articles.filter(
      (article) => article.categories?.includes(category)
    ).length
  }
  return counts
}

const pillBase = clsx(
  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full',
  'text-sm font-medium',
  'min-h-[44px]',
  'transition-all duration-200 cursor-pointer',
  'ring-1 ring-inset'
)

const pillDefault = clsx(
  'bg-zinc-100 text-zinc-700',
  'hover:bg-zinc-200 hover:text-techhut',
  'dark:bg-zinc-800/60 dark:text-zinc-300',
  'dark:hover:bg-zinc-700/60 dark:hover:text-techhut-light',
  'ring-zinc-900/10 dark:ring-white/10',
  'hover:ring-techhut/30 dark:hover:ring-techhut-light/30'
)

const pillAll = clsx(
  'bg-zinc-200 text-zinc-900 font-semibold',
  'hover:bg-zinc-300 hover:text-techhut',
  'dark:bg-zinc-700/60 dark:text-zinc-100',
  'dark:hover:bg-zinc-600/60 dark:hover:text-techhut-light',
  'ring-zinc-900/10 dark:ring-white/10',
  'hover:ring-techhut/30 dark:hover:ring-techhut-light/30'
)

export function CategoryStrip() {
  const counts = getCategoryCounts()

  return (
    <div className="not-prose my-10">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
        Browse by Topic
      </p>
      <div className="flex flex-wrap gap-2">
        <Link href="/content" className={clsx(pillBase, pillAll)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect
              x="1.5"
              y="1.5"
              width="5"
              height="5"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <rect
              x="9.5"
              y="1.5"
              width="5"
              height="5"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <rect
              x="1.5"
              y="9.5"
              width="5"
              height="5"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <rect
              x="9.5"
              y="9.5"
              width="5"
              height="5"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
          All ({articles.length})
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/categories/${category.toLowerCase()}`}
            className={clsx(pillBase, pillDefault)}
          >
            {categoryIcons[category]}
            {category} ({counts[category]})
          </Link>
        ))}
      </div>
    </div>
  )
}
