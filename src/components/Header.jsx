import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { ModeToggle } from '@/components/ModeToggle'
import { MobileSearch, Search } from '@/components/Search'
import { useAnnouncements } from '@/components/announcement-banner/AnnouncementBannerProvider'
import { useSidebarStore } from '@/components/SidebarState'

function TopLevelNavItem({ href, children }) {
  return (
    <li className="block text-[12px] lg:text-[13.5px] m-0 p-0 leading-none">
      <Link
        href={href}
        className="px-2 lg:px-3 py-1 lg:py-2 opacity-60 hover:opacity-100 hover:bg-zinc-900/5 dark:hover:bg-neutral-900/60 hover:border-zinc-900/10 dark:hover:border-neutral-800 border border-transparent rounded-md leading-none transition-all duration-200 text-zinc-900 dark:text-white inline-flex items-center"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { bannerHeight } = useAnnouncements()
  let { isOpen: sidebarIsOpen, toggle: toggleSidebar } = useSidebarStore()

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed z-50 flex items-center justify-between gap-3 px-5 transition h-[64px] lg:px-8 min-h-[64px] lg:pointer-events-auto',
        'lg:left-4 lg:right-4 lg:rounded-b-2xl lg:shadow-lg lg:border lg:border-t-0 lg:border-zinc-200/50 lg:dark:border-zinc-800/50',
        'inset-x-0 left-0 right-0',
        !isInsideMobileNavigation &&
          'backdrop-blur-lg bg-white/70 dark:bg-[#0f1012]/70 border-b border-zinc-200 dark:border-zinc-800',
        isInsideMobileNavigation &&
          'bg-white/70 dark:bg-[#0f1012]/70 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800'
      )}
      style={{ top: bannerHeight }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center h-6 w-6 rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 flex-shrink-0"
          aria-label={sidebarIsOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <svg
            viewBox="0 0 10 9"
            fill="none"
            strokeLinecap="round"
            aria-hidden="true"
            className="w-2.5 stroke-zinc-900 dark:stroke-white"
          >
            <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
          </svg>
        </button>
        <div className="hidden lg:flex flex-shrink-0">
          <Link href="/" aria-label="Home">
            <Logo className="h-6" />
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
          <MobileNavigation />
          <Link href="/" aria-label="Home">
            <Logo className="h-6" />
          </Link>
        </div>
        <div className="hidden lg:block flex-1 max-w-2xl mx-4">
          <Search />
        </div>
        <div className="lg:hidden">
          <Search />
        </div>
      </div>
      <div className="flex items-center gap-3 xl:gap-2 flex-shrink-0">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-3 xl:gap-2 m-0 p-0 list-none">
            <TopLevelNavItem href="/">Home</TopLevelNavItem>
            <TopLevelNavItem href="/team">Team</TopLevelNavItem>
            <TopLevelNavItem href="https://techhut.tv/rss">RSS</TopLevelNavItem>
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-neutral-500/20" />
        <div className="flex gap-2">
          <MobileSearch />
          <ModeToggle />
        </div>
        <div className="hidden min-[416px]:contents">
          <a
            href="https://youtube.com/@techhut"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </div>
      </div>
    </motion.div>
  )
})
