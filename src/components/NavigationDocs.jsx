import { useRouter } from 'next/router'
import clsx from 'clsx'
import Link from 'next/link'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Home,
  Users,
  Handshake,
  FileText,
  Code,
  Monitor,
  Wrench,
  ChevronRight,
  BookOpen,
  FolderOpen,
  Tag,
  Rss,
  Github,
  Info
} from 'lucide-react'

function NavLink({ href, active, children }) {
    const reduceMotion = useReducedMotion()
    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
                'block py-1 pl-4 pr-2.5 text-sm transition-colors duration-200 rounded-md relative',
                'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px',
                active
                    ? 'text-zinc-900 dark:text-white font-medium bg-primary-500/10 dark:bg-primary-500/10 before:bg-transparent'
                    : 'text-zinc-700 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-500/5 dark:hover:bg-primary-500/10 before:bg-zinc-200 dark:before:bg-zinc-800'
            )}
        >
            {active && (
                <motion.span
                    layoutId="nav-active-rail"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-500"
                    transition={reduceMotion ? { type: false } : { type: 'spring', stiffness: 500, damping: 40 }}
                />
            )}
            {children}
        </Link>
    )
}

function TagChip({ href, active, children }) {
    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
                'px-2 py-0.5 text-xs rounded-full border transition-colors',
                active
                    ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border-primary-500/30'
                    : 'bg-zinc-100 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-400 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 border-transparent'
            )}
        >
            {children}
        </Link>
    )
}

export const docsNavigation = [
    {
        title: 'PAGES',
        icon: <Home className="h-3.5 w-3.5" />,
        defaultOpen: true,
        pages: [
            { title: 'Introduction', href: '/' },
            { title: 'All Content', href: '/content' },
            { title: 'Partners', href: '/partner' },
            { title: 'Team', href: '/team' },
        ],
    },
    {
        title: 'CATEGORIES',
        icon: <FolderOpen className="h-3.5 w-3.5" />,
        defaultOpen: true,
        pages: [
            { title: 'Guides', href: '/categories/guides' },
            { title: 'Software', href: '/categories/software' },
            { title: 'Benchmarking', href: '/categories/benchmarking' },
            { title: 'Essay', href: '/categories/essay' },
            { title: 'Hardware', href: '/categories/hardware' },
        ],
    },
    {
        title: 'TAGS',
        icon: <Tag className="h-3.5 w-3.5" />,
        defaultOpen: false,
        display: 'chips',
        pages: [
            { title: 'AI', href: '/tags/ai' },
            { title: 'Apps', href: '/tags/apps' },
            { title: 'Arch', href: '/tags/arch' },
            { title: 'Archive', href: '/tags/archive' },
            { title: 'Benchmarking', href: '/tags/benchmarking' },
            { title: 'COSMIC', href: '/tags/cosmic' },
            { title: 'Customization', href: '/tags/customization' },
            { title: 'DaVinci Resolve', href: '/tags/davinci-resolve' },
            { title: 'Desktop Environments', href: '/tags/desktop-environments' },
            { title: 'Distros', href: '/tags/distros' },
            { title: 'Docker', href: '/tags/docker' },
            { title: 'Essay', href: '/tags/essay' },
            { title: 'Fedora', href: '/tags/fedora' },
            { title: 'Git', href: '/tags/git' },
            { title: 'Gnome', href: '/tags/gnome' },
            { title: 'Guides', href: '/tags/guides' },
            { title: 'Hardware', href: '/tags/hardware' },
            { title: 'Homelab', href: '/tags/homelab' },
            { title: 'KDE', href: '/tags/kde' },
            { title: 'Khadas', href: '/tags/khadas' },
            { title: 'Linux', href: '/tags/linux' },
            { title: 'Manjaro', href: '/tags/manjaro' },
            { title: 'Mobile', href: '/tags/mobile' },
            { title: 'News', href: '/tags/news' },
            { title: 'OpenSUSE', href: '/tags/opensuse' },
            { title: 'Pine64', href: '/tags/pine64' },
            { title: 'Proxmox', href: '/tags/proxmox' },
            { title: 'RaspberryPi', href: '/tags/raspberrypi' },
            { title: 'Red Hat', href: '/tags/red-hat' },
            { title: 'Self-Host', href: '/tags/self-host' },
            { title: 'Single Board Computers', href: '/tags/single-board-computers' },
            { title: 'Windows', href: '/tags/windows' },
        ],
    },
]

export function NavigationDocs({ className }) {
    return (
        <LayoutGroup>
            <nav className={clsx('space-y-1', className)}>
                <ul role="list" className="space-y-1">
                    {docsNavigation.map((group) => (
                        <NavigationGroup
                            key={group.title}
                            group={group}
                        />
                    ))}
                </ul>
            </nav>
        </LayoutGroup>
    )
}

export function SidebarFooter({ className }) {
    const linkClass = "flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
    return (
        <div className={clsx(
            "pt-3 mt-3 px-2 border-t border-zinc-900/5 dark:border-white/5",
            className
        )}>
            <ul className="flex items-center justify-between gap-2">
                <li>
                    <a href="/rss" className={linkClass} aria-label="RSS feed">
                        <Rss className="h-3 w-3" />
                        <span>RSS</span>
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/TechHutTV/techhut.tv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                        aria-label="GitHub repository"
                    >
                        <Github className="h-3 w-3" />
                        <span>GitHub</span>
                    </a>
                </li>
                <li>
                    <Link href="/team" className={linkClass} aria-label="About">
                        <Info className="h-3 w-3" />
                        <span>About</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

const checkIfChildIsActive = (pages, pathname) => {
    if (!pages) return false
    return pages.some((page) => {
        if (pathname === page.href) return true
        if (pathname.startsWith(page.href + '/')) return true
        if (page.pages && page.pages.length > 0) {
            return checkIfChildIsActive(page.pages, pathname)
        }
        return false
    })
}

const STORAGE_PREFIX = 'sidebar-group-open:'

function NavigationGroup({ group, className }) {
    let router = useRouter()
    const hasActiveChild = checkIfChildIsActive(group.pages, router.pathname)
    const [isOpen, setIsOpen] = useState(group.defaultOpen || hasActiveChild)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const stored = window.localStorage.getItem(STORAGE_PREFIX + group.title)
        if (stored !== null) {
            setIsOpen(stored === 'true')
        }
    }, [group.title])

    const toggleOpen = () => {
        setIsOpen((prev) => {
            const next = !prev
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(STORAGE_PREFIX + group.title, String(next))
            }
            return next
        })
    }

    const isChips = group.display === 'chips'

    return (
        <li className={clsx('mb-2', className)}>
            <button
                onClick={toggleOpen}
                className="flex items-center justify-between w-full py-1.5 px-2 text-xs font-semibold uppercase tracking-wider transition-colors text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            >
                <div className="flex items-center gap-2">
                    {group.icon && (
                        <span className={clsx(
                            'flex-shrink-0',
                            hasActiveChild ? 'text-primary-500' : 'text-zinc-400 dark:text-zinc-600'
                        )}>
                            {group.icon}
                        </span>
                    )}
                    <span>{group.title}</span>
                    <span className="font-normal normal-case tracking-normal text-[10px] text-zinc-400 dark:text-zinc-600">
                        {group.pages.length}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    {!isOpen && hasActiveChild && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    )}
                    <ChevronRight
                        className={clsx(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            isOpen && 'transform rotate-90'
                        )}
                    />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && group.pages && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: 1,
                            height: 'auto',
                            transition: { duration: 0.2 },
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: { duration: 0.15 },
                        }}
                        className="overflow-hidden"
                    >
                        {isChips ? (
                            <div className="flex flex-wrap gap-1.5 mt-2 px-2 pb-1">
                                {group.pages.map((page) => {
                                    const isActive = router.pathname === page.href
                                    return (
                                        <TagChip key={page.href} href={page.href} active={isActive}>
                                            {page.title}
                                        </TagChip>
                                    )
                                })}
                            </div>
                        ) : (
                            <ul role="list" className="mt-1 ml-2">
                                {group.pages.map((page) => {
                                    const isActive = router.pathname === page.href
                                    return (
                                        <li key={page.href}>
                                            <NavLink href={page.href} active={isActive}>
                                                {page.title}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )
}

