'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { articles } from '@/data/articles'
import { formatDate, sortByDate } from '@/lib/dates'

export function FeaturedArticle({ article: articleProp, slug }) {
  const router = useRouter()

  const article =
    articleProp ?? (slug ? articles.find((a) => a.href === slug) : null) ?? sortByDate([...articles], 'date', 'desc')[0]

  if (!article?.cover) {
    return null
  }

  return (
    <div className="not-prose my-8">
      <div
        className={clsx(
          'group relative cursor-pointer rounded-2xl overflow-hidden',
          'bg-white dark:bg-white/[0.03]',
          'ring-1 ring-inset ring-zinc-900/7.5 dark:ring-white/10',
          'transition-shadow hover:shadow-lg hover:shadow-zinc-900/10 dark:hover:shadow-black/20',
        )}
        onClick={() => router.push(article.href)}
      >
        {/* Accessible overlay link */}
        <Link href={article.href} className="absolute inset-0 z-10">
          <span className="sr-only">Read {article.title}</span>
        </Link>

        <div className="flex flex-col md:flex-row">
          {/* Cover image */}
          <div className="relative aspect-video md:aspect-auto md:w-[60%] bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-3 p-6 md:w-[40%] md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-techhut">
                Featured
              </span>
              {article.categories?.map((category) => (
                <span
                  key={category}
                  className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs px-2 py-0.5 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
              {article.title}
            </h3>

            {article.description && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {article.description}
              </p>
            )}

            <time
              dateTime={article.date}
              className="text-xs text-zinc-500 dark:text-zinc-400"
            >
              {formatDate(article.date)}
            </time>

            <span className="text-sm font-medium text-techhut group-hover:text-techhut-dark dark:group-hover:text-techhut-light transition-colors">
              Read article &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
