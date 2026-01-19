import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import { GridPattern } from '@/components/GridPattern'
import { formatDate, sortByDate } from '@/lib/dates'
import { articles } from '@/data/articles'

const CATEGORIES = ['All', 'Guides', 'Software', 'Benchmarking', 'Essay', 'Hardware']
const ARTICLES_PER_PAGE = 8

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

function ArticleCard({ article }) {
  const handleClick = () => {
    window.location.href = article.href
  }

  return (
    <div
      className="group relative flex flex-col rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <TileHighlight />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />

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
}

export function AllContent({ category, tag }) {
  const [activeCategory, setActiveCategory] = useState(category || 'All')
  const [displayedCount, setDisplayedCount] = useState(ARTICLES_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef(null)

  // If category or tag prop is passed, hide tabs
  const showTabs = !category && !tag

  // Filter and sort articles
  const filteredArticles = sortByDate(
    tag
      ? articles.filter(article => article.tags?.includes(tag))
      : activeCategory === 'All'
        ? articles
        : articles.filter(article => article.categories?.includes(activeCategory)),
    'date',
    'desc'
  )

  const visibleArticles = filteredArticles.slice(0, displayedCount)
  const hasMore = displayedCount < filteredArticles.length

  // Reset count when category changes
  useEffect(() => {
    setDisplayedCount(ARTICLES_PER_PAGE)
  }, [activeCategory])

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          setTimeout(() => {
            setDisplayedCount(prev => prev + ARTICLES_PER_PAGE)
            setIsLoading(false)
          }, 300)
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading])

  return (
    <div className="my-8 xl:max-w-none">
      {/* Category Filter Tabs - only show when no category prop */}
      {showTabs && (
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition-colors
                ${activeCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }
              `}
            >
              {cat}
              <span className="ml-2 text-xs opacity-70">
                ({cat === 'All'
                  ? articles.length
                  : articles.filter(a => a.categories?.includes(cat)).length})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Showing {visibleArticles.length} of {filteredArticles.length} articles
      </p>

      {/* Articles Grid */}
      <div className="not-prose grid grid-cols-1 gap-8 sm:grid-cols-2">
        {visibleArticles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>

      {/* Infinite scroll trigger / Loading indicator */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="flex justify-center py-12"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm">Loading more articles...</span>
            </div>
          ) : (
            <span className="text-sm text-zinc-400">Scroll for more</span>
          )}
        </div>
      )}

      {/* End message */}
      {!hasMore && filteredArticles.length > ARTICLES_PER_PAGE && (
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-8">
          You've reached the end! {filteredArticles.length} articles total.
        </p>
      )}

      {/* Empty state */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400">
            No articles found in the "{activeCategory}" category.
          </p>
        </div>
      )}
    </div>
  )
}
