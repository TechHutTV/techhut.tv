import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { create } from 'zustand'

import { Tag } from '@/components/Tag'
import { sanitizeCodeHTML } from '@/lib/sanitize'

const languageNames = {
  js: 'JavaScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  go: 'Go',
  java: 'Java',
}

function getPanelTitle({ title, language }) {
  return title ?? languageNames[language] ?? 'Code'
}

function ClipboardIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeWidth="0"
        d="M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"
      />
      <path
        fill="none"
        strokeLinejoin="round"
        d="M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"
      />
    </svg>
  )
}

function CopyButton({ code }) {
  let [copyCount, setCopyCount] = useState(0)
  let copied = copyCount > 0

  useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 2000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyCount])

  return (
    <button
      type="button"
      className={clsx(
        'group/button absolute right-3 top-1/2 -translate-y-1/2 overflow-hidden rounded-md px-2 py-1 text-[10px] font-medium opacity-0 transition focus:opacity-100 group-hover:opacity-100 flex items-center justify-center min-w-[55px]',
        copied
          ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400'
          : 'bg-zinc-700/20 dark:bg-zinc-100/20 hover:bg-zinc-700/30 dark:hover:bg-zinc-100/30 text-zinc-700 dark:text-zinc-300'
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount((count) => count + 1)
        }).catch((err) => {
          console.error('Failed to copy code:', err)
        })
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          'pointer-events-none flex items-center justify-center gap-0.5 transition duration-300',
          copied && '-translate-y-1.5 opacity-0'
        )}
      >
        <ClipboardIcon className="h-3 w-3 fill-zinc-400/20 stroke-current" />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          'pointer-events-none absolute inset-0 flex items-center justify-center transition duration-300',
          !copied && 'translate-y-1.5 opacity-0'
        )}
      >
        ✓ Copied
      </span>
    </button>
  )
}

function CodePanelHeader({ tag, label }) {
  if (!tag && !label) {
    return null
  }

  return (
    <div className="flex h-9 items-center gap-2 border-b border-zinc-300/50 dark:border-zinc-900/50 bg-zinc-200/60 dark:bg-[#242424]/60 px-3">
      {tag && (
        <div className="dark flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && (
        <span className="h-1 w-px bg-zinc-400 dark:bg-zinc-600" />
      )}
      {label && (
        <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{label}</span>
      )}
    </div>
  )
}

function CodePanel({ tag, label, code, children }) {
  let child = Children.only(children)

  return (
    <div className="group bg-white dark:bg-[#1e1e1e]">
      <CodePanelHeader
        tag={child.props.tag ?? tag}
        label={child.props.label ?? label}
      />
      <div className="relative bg-white dark:bg-[#1e1e1e]">
        <pre className="overflow-x-auto p-4 text-xs text-zinc-900 dark:text-zinc-100">{children}</pre>
        <CopyButton code={child.props.code ?? code} />
      </div>
    </div>
  )
}

function CodeGroupHeader({ title, children, selectedIndex }) {
  let hasTabs = Children.count(children) > 1

  return (
    <div className="flex h-9 items-end justify-between gap-x-2 bg-zinc-200/80 dark:bg-[#242424] px-3 border-b border-zinc-300/50 dark:border-zinc-900/50 backdrop-blur-sm">
      {/* Tabs - always show at least one */}
      {hasTabs ? (
        <Tab.List className="flex gap-0 text-xs font-medium">
          {Children.map(children, (child, childIndex) => (
            <Tab
              className={clsx(
                'h-9 px-3 transition focus:[&:not(:focus-visible)]:outline-none border-t border-l flex items-center gap-2',
                childIndex === selectedIndex
                  ? 'bg-white dark:bg-[#1e1e1e] text-zinc-900 dark:text-white font-medium border-zinc-300 dark:border-zinc-700 border-r border-r-zinc-200/50 dark:border-r-zinc-700/50'
                  : 'bg-zinc-100/50 dark:bg-zinc-800/30 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border-transparent border-r border-r-transparent'
              )}
            >
              <span>{getPanelTitle(child.props)}</span>
              <button
                className="w-3.5 h-3.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition"
                aria-label="Close tab"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Tab>
          ))}
        </Tab.List>
      ) : (
        <div className="flex gap-0 text-xs font-medium">
          <div className="h-9 px-3 border-t border-l border-r border-r-zinc-200/50 dark:border-r-zinc-700/50 bg-white dark:bg-[#1e1e1e] text-zinc-900 dark:text-white font-medium border-zinc-300 dark:border-zinc-700 flex items-center gap-2">
            <span>code@techhut.tv:~</span>
            <button
              className="w-3.5 h-3.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition"
              aria-label="Close tab"
            >
              <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* GTK4 window controls */}
      <div className="flex items-center gap-2 mb-1">
        <button className="w-5 h-5 rounded-full hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition flex items-center justify-center" aria-label="Minimize">
          <svg className="w-2.5 h-2.5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button className="w-5 h-5 rounded-full hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition flex items-center justify-center" aria-label="Maximize">
          <svg className="w-2.5 h-2.5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2" />
          </svg>
        </button>
        <button className="w-5 h-5 rounded-full hover:bg-red-500/20 dark:hover:bg-red-500/20 transition flex items-center justify-center group" aria-label="Close">
          <svg className="w-2.5 h-2.5 text-zinc-600 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function CodeGroupPanels({ children, ...props }) {
  let hasTabs = Children.count(children) > 1

  if (hasTabs) {
    return (
      <Tab.Panels>
        {Children.map(children, (child) => (
          <Tab.Panel>
            <CodePanel {...props}>{child}</CodePanel>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    )
  }

  return <CodePanel {...props}>{children}</CodePanel>
}

function usePreventLayoutShift() {
  let positionRef = useRef()
  let rafRef = useRef()

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return {
    positionRef,
    preventLayoutShift(callback) {
      let initialTop = positionRef.current.getBoundingClientRect().top

      callback()

      rafRef.current = window.requestAnimationFrame(() => {
        let newTop = positionRef.current.getBoundingClientRect().top
        window.scrollBy(0, newTop - initialTop)
      })
    },
  }
}

const usePreferredLanguageStore = create((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
          (preferredLanguage) => preferredLanguage !== language
        ),
        language,
      ],
    })),
}))

function useTabGroupProps(availableLanguages) {
  let { preferredLanguages, addPreferredLanguage } = usePreferredLanguageStore()
  let [selectedIndex, setSelectedIndex] = useState(0)
  let activeLanguage = [...availableLanguages].sort(
    (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a)
  )[0]
  let languageIndex = availableLanguages.indexOf(activeLanguage)
  let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
  if (newSelectedIndex !== selectedIndex) {
    setSelectedIndex(newSelectedIndex)
  }

  let { positionRef, preventLayoutShift } = usePreventLayoutShift()

  return {
    as: 'div',
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex])
      )
    },
  }
}

const CodeGroupContext = createContext(false)

export function CodeGroup({ children, title, ...props }) {
  let languages = Children.map(children, (child) => getPanelTitle(child.props))
  let tabGroupProps = useTabGroupProps(languages)
  let hasTabs = Children.count(children) > 1
  let Container = hasTabs ? Tab.Group : 'div'
  let containerProps = hasTabs ? tabGroupProps : {}
  let headerProps = hasTabs
    ? { selectedIndex: tabGroupProps.selectedIndex }
    : {}

  return (
    <CodeGroupContext.Provider value={true}>
      <Container
        {...containerProps}
        className="not-prose my-6 overflow-hidden rounded-xl bg-white dark:bg-[#1e1e1e] ring-1 ring-zinc-300 dark:ring-zinc-800 shadow-xl"
      >
        <CodeGroupHeader title={title} {...headerProps}>
          {children}
        </CodeGroupHeader>
        <CodeGroupPanels {...props}>{children}</CodeGroupPanels>
      </Container>
    </CodeGroupContext.Provider>
  )
}

export function Code({ children, ...props }) {
  let isGrouped = useContext(CodeGroupContext)

  if (isGrouped) {
    return <code {...props} dangerouslySetInnerHTML={{ __html: sanitizeCodeHTML(children) }} />
  }

  return <code {...props}>{children}</code>
}

export function Pre({ children, ...props }) {
  let isGrouped = useContext(CodeGroupContext)

  if (isGrouped) {
    return children
  }

  return <CodeGroup {...props}>{children}</CodeGroup>
}
