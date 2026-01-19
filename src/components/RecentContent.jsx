import Link from 'next/link'
import Image from 'next/image'

import { GridPattern } from '@/components/GridPattern'
import { Heading } from '@/components/Heading'
import { formatDate } from '@/lib/dates'
import { sortByDate } from '@/lib/dates'
import { articles } from '@/data/articles'

function TileHighlight() {
  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
        />
      </div>
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFAC1C] to-[#F28C28] opacity-0 transition duration-300 group-hover:opacity-20 dark:group-hover:opacity-40 dark:from-[#F28C28]/30 dark:to-[#FF7518]/30"
      />
    </div>
  )
}

/**
 * Recent Content component that displays the latest articles from the content directory
 *
 * @param {string} title - The heading title for the section
 * @param {string} [id] - Optional id for the heading anchor
 * @param {string} [description] - Optional description text to display below the title
 * @param {number} [limit=8] - Number of articles to display (defaults to 8)
 * @param {string} [category] - Optional category filter
 */
export function RecentContent({ title = "Recent Articles", id, description, limit = 8, category }) {
  // Filter by category if provided
  let filteredArticles = category
    ? articles.filter(article => article.categories?.includes(category))
    : articles

  // Sort by date (most recent first) and limit
  const recentArticles = sortByDate(filteredArticles, 'date', 'desc').slice(0, limit)

  const hasHeader = title || description

  return (
    <div className="my-16 xl:max-w-none">
      {title && (
        <Heading level={2} id={id} anchor={!!id}>
          {title}
        </Heading>
      )}
      {description && (
        <div className={`text-sm text-zinc-600 dark:text-zinc-400 ${title ? 'mt-4' : ''}`}>
          {description}
        </div>
      )}
      <div className={`not-prose grid grid-cols-1 gap-8 sm:grid-cols-2 ${hasHeader ? 'mt-4 border-t border-zinc-900/5 pt-10 dark:border-white/5' : ''}`}>
        {recentArticles.map((article) => {
          return (
            <div
              key={article.href}
              className="group relative flex flex-col rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5 overflow-hidden"
            >
              <TileHighlight />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />

              <Link href={article.href} className="absolute inset-0 z-10">
                <span className="sr-only">{article.title}</span>
              </Link>

              {/* Cover Image */}
              {article.cover && (
                <div className="relative w-full aspect-video bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="relative flex-1 rounded-2xl px-4 pb-4 pt-4">
                {article.date && (
                  <time className="block text-xs text-zinc-500 dark:text-zinc-400 mb-2" dateTime={article.date}>
                    {formatDate(article.date, 'medium')}
                  </time>
                )}
                <h3 className="text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {article.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
