import { forwardRef, Fragment, useEffect, useId, useRef, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { articles } from '@/data/articles'

function highlightMatch(text, query) {
  if (!query || !text) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="underline bg-transparent text-primary-500">$1</mark>')
}

function searchArticles(query) {
  if (!query || query.length < 2) return []

  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean)

  const results = articles
    .map(article => {
      const titleLower = (article.title || '').toLowerCase()
      const descLower = (article.description || '').toLowerCase()
      const tagsLower = (article.tags || []).map(t => t.toLowerCase())
      const categoriesLower = (article.categories || []).map(c => c.toLowerCase())

      let score = 0
      let matchedTerms = 0

      for (const term of searchTerms) {
        let termMatched = false

        // Title matches (highest weight)
        if (titleLower.includes(term)) {
          score += titleLower.startsWith(term) ? 100 : 50
          termMatched = true
        }

        // Tag matches (high weight)
        if (tagsLower.some(tag => tag.includes(term))) {
          score += 30
          termMatched = true
        }

        // Category matches
        if (categoriesLower.some(cat => cat.includes(term))) {
          score += 20
          termMatched = true
        }

        // Description matches (lower weight)
        if (descLower.includes(term)) {
          score += 10
          termMatched = true
        }

        if (termMatched) matchedTerms++
      }

      // Only include if all search terms matched something
      if (matchedTerms < searchTerms.length) return null

      return { ...article, score }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)

  return results
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
      />
    </svg>
  )
}

function NoResultsIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.237 4.237 0 0 0 1.24-3c0-.62-.132-1.207-.37-1.738M12.01 12A4.237 4.237 0 0 1 9 13.25c-.635 0-1.237-.14-1.777-.388M12.01 12l3.24 3.25m-3.715-9.661a4.25 4.25 0 0 0-5.975 5.908M4.5 15.5l11-11"
      />
    </svg>
  )
}

function SearchResult({ result, query, isSelected, onClick }) {
  let id = useId()
  const titleHtml = highlightMatch(result.title, query)
  const categories = result.categories || []
  const tags = result.tags || []

  return (
    <li
      className={clsx(
        'group block cursor-pointer px-4 py-3 transition-colors',
        isSelected ? 'bg-zinc-50 dark:bg-zinc-800/50' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
      )}
      onClick={onClick}
    >
      <div
        id={`${id}-title`}
        className={clsx(
          'text-sm font-medium',
          isSelected ? 'text-primary-500' : 'text-zinc-900 dark:text-white'
        )}
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
      {(categories.length > 0 || tags.length > 0) && (
        <div className="mt-1 flex flex-wrap gap-1">
          {categories.map((cat, i) => (
            <span
              key={`cat-${i}`}
              className="inline-flex items-center rounded px-1.5 py-0.5 text-2xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
            >
              {cat}
            </span>
          ))}
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={`tag-${i}`}
              className="inline-flex items-center rounded px-1.5 py-0.5 text-2xs text-zinc-500 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </li>
  )
}

function SearchResults({ results, query, selectedIndex, onSelect }) {
  if (results.length === 0) {
    return (
      <div className="p-6 text-center">
        <NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 dark:stroke-zinc-600" />
        <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
          Nothing found for{' '}
          <strong className="break-words font-semibold text-zinc-900 dark:text-white">
            &lsquo;{query}&rsquo;
          </strong>
          . Please try again.
        </p>
      </div>
    )
  }

  return (
    <ul role="list" className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {results.map((result, index) => (
        <SearchResult
          key={result.href}
          result={result}
          query={query}
          isSelected={index === selectedIndex}
          onClick={() => onSelect(result)}
        />
      ))}
    </ul>
  )
}

const SearchInput = forwardRef(function SearchInput(
  { query, onChange, onClose, onKeyDown },
  inputRef
) {
  return (
    <div className="group relative flex h-12">
      <SearchIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-auto appearance-none bg-transparent pl-10 pr-4 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden"
      />
    </div>
  )
})

function SearchDialog({ open, setOpen, className }) {
  let router = useRouter()
  let inputRef = useRef()
  let [query, setQuery] = useState('')
  let [selectedIndex, setSelectedIndex] = useState(0)

  const results = useMemo(() => searchArticles(query), [query])

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [open])

  // Close on route change
  useEffect(() => {
    if (!open) return

    function onRouteChange() {
      setOpen(false)
    }

    router.events.on('routeChangeStart', onRouteChange)
    router.events.on('hashChangeStart', onRouteChange)

    return () => {
      router.events.off('routeChangeStart', onRouteChange)
      router.events.off('hashChangeStart', onRouteChange)
    }
  }, [open, setOpen, router])

  // Global keyboard shortcut
  useEffect(() => {
    if (open) return

    function onKeyDown(event) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  const handleSelect = useCallback((article) => {
    router.push(article.href)
    setOpen(false)
  }, [router, setOpen])

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, results.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        event.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
        break
      case 'Escape':
        if (query === '') {
          setOpen(false)
        } else {
          setQuery('')
        }
        break
    }
  }, [results, selectedIndex, handleSelect, query, setOpen])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        onClose={setOpen}
        className={clsx('fixed inset-0 z-50', className)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm dark:bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 dark:bg-zinc-900 dark:ring-zinc-800 sm:max-w-xl">
              <SearchInput
                ref={inputRef}
                query={query}
                onChange={setQuery}
                onClose={() => setOpen(false)}
                onKeyDown={handleKeyDown}
              />
              {query.length >= 2 && (
                <div className="border-t border-zinc-200 bg-white dark:border-zinc-100/5 dark:bg-white/2.5">
                  <SearchResults
                    results={results}
                    query={query}
                    selectedIndex={selectedIndex}
                    onSelect={handleSelect}
                  />
                  <p className="border-t border-zinc-100 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function useSearchProps() {
  let buttonRef = useRef()
  let [open, setOpen] = useState(false)

  return {
    buttonProps: {
      ref: buttonRef,
      onClick() {
        setOpen(true)
      },
    },
    dialogProps: {
      open,
      setOpen(open) {
        let { width, height } = buttonRef.current.getBoundingClientRect()
        if (!open || (width !== 0 && height !== 0)) {
          setOpen(open)
        }
      },
    },
  }
}

export function Search() {
  let [modifierKey, setModifierKey] = useState()
  let { buttonProps, dialogProps } = useSearchProps()

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl '
    )
  }, [])

  return (
    <div className="hidden lg:block lg:max-w-md lg:flex-auto">
      <button
        type="button"
        className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex focus:[&:not(:focus-visible)]:outline-none"
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5 stroke-current" />
        Search...
        <kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </button>
      <SearchDialog className="hidden lg:block" {...dialogProps} />
    </div>
  )
}

export function MobileSearch() {
  let { buttonProps, dialogProps } = useSearchProps()

  return (
    <div className="contents lg:hidden">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden focus:[&:not(:focus-visible)]:outline-none"
        aria-label="Search..."
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
      </button>
      <SearchDialog className="lg:hidden" {...dialogProps} />
    </div>
  )
}
