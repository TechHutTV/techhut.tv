import { useRouter } from 'next/router'
import clsx from 'clsx'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
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
  Tag
} from 'lucide-react'

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
                'block py-2 px-3 text-sm transition-all duration-200 rounded-md relative',
                active
                    ? 'text-zinc-900 dark:text-white font-medium bg-primary-500/10 dark:bg-primary-500/10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-primary-500 before:rounded-r-full'
                    : 'text-zinc-700 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-500/5 dark:hover:bg-primary-500/10'
            )}
        >
            {children}
        </Link>
    )
}

export const docsNavigation = [
    {
        title: 'PAGES',
        icon: <Home className="h-5 w-5" />,
        defaultOpen: true,
        pages: [
            { title: 'Introduction', href: '/' },
            { title: 'All Content', href: '/content' },
            { title: 'Partners', href: '/partners' },
            { title: 'Team', href: '/team' },
        ],
    },
    {
        title: 'CATEGORIES',
        icon: <FolderOpen className="h-5 w-5" />,
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
        icon: <Tag className="h-5 w-5" />,
        defaultOpen: false,
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

function NavigationGroup({ group, className }) {
    let router = useRouter()
    const hasActiveChild = checkIfChildIsActive(group.pages, router.pathname)
    const [isOpen, setIsOpen] = useState(group.defaultOpen || hasActiveChild)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <li className={clsx('mb-1', className)}>
            <button
                onClick={toggleOpen}
                className={clsx(
                    'flex items-center justify-between w-full py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200',
                    hasActiveChild
                        ? 'text-zinc-900 dark:text-white'
                        : 'text-zinc-700 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-500/5 dark:hover:bg-primary-500/10'
                )}
            >
                <div className="flex items-center gap-3">
                    {group.icon && (
                        <span className={clsx(
                            'flex-shrink-0',
                            hasActiveChild ? 'text-primary-500' : 'text-zinc-500 dark:text-zinc-500'
                        )}>
                            {group.icon}
                        </span>
                    )}
                    <span>{group.title}</span>
                </div>
                <ChevronRight
                    className={clsx(
                        'h-4 w-4 transition-transform duration-200 text-zinc-500',
                        isOpen && 'transform rotate-90'
                    )}
                />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && group.pages && (
                    <motion.ul
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
                        className="mt-1 space-y-0.5 ml-3 pl-3 border-l border-zinc-200 dark:border-zinc-800"
                    >
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
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    )
}

