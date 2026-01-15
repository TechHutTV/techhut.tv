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
  BookOpen
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
            { title: 'Partners', href: '/partners' },
            { title: 'Team', href: '/team' },
        ],
    },
    {
        title: 'BENCHMARKING',
        icon: <Monitor className="h-5 w-5" />,
        defaultOpen: true,
        pages: [
            { title: 'Benchmarking Linux, Mac AND Windows on a 2019 MacBook Pro', href: '/linux-mac-windows-benchmarking' },
            { title: 'Microsoft Edge might WIN on Linux.', href: '/microsoft-edge-might-win-on-linux' },
            { title: 'Flatpak vs. Snap vs. AppImage - Linux Packaging Benchmarks!', href: '/flatpak-vs-snap-vs-appimage' },
        ],
    },
    {
        title: 'ESSAY',
        icon: <FileText className="h-5 w-5" />,
        defaultOpen: true,
        pages: [
            { title: 'EVERYONE needs a Home Server', href: '/5-reasons-build-home-server' },
            { title: 'The Future of AI NEEDS to Deal with Copyright Laws', href: '/ai-needs-to-deal-with-copyright-laws' },
        ],
    },
    {
        title: 'GUIDES',
        icon: <BookOpen className="h-5 w-5" />,
        defaultOpen: true,
        pages: [
            { title: 'Fedora Server Guide: Cockpit, ZFS, Podman, and more!', href: '/fedora-server-guide-cockpit-zfs-podman' },
            { title: 'How to Safely Upgrade or Downgrade the Kernel on Arch Linux', href: '/how-to-safely-upgrade-or-downgrade-kernel-on-arch-linux' },
            { title: 'Automate homelab chores with Ansible', href: '/automate-homelab-chores-ansible' },
            { title: 'Install DaVinci Resolve in Any Linux Distro Using DavinciBox (2025)', href: '/install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox' },
            { title: 'Self-Host with Immich!', href: '/self-host-immich-photo-backup' },
            { title: 'Git for Everyone', href: '/git-for-everyone-guide' },
            { title: 'Create an AWESOME Home Server/NAS with Proxmox', href: '/index' },
            { title: 'the OFFICIAL Windows (lite) from Microsoft', href: '/windows-lite-ltsc-microsoft' },
            { title: 'BEST Way to Monitor your Home Server! (Grafana, Prometheus, InfluxDB)', href: '/monitor-home-server-grafana-prometheus-influxdb' },
            { title: 'NixOS - The New Best Server OS?', href: '/nixos-best-server-os-setup' },
            { title: 'Guide: Setting Up Windows as a NAS Operating System', href: '/run-windows-nas-home-server' },
            { title: '7 Docker Basics for Beginners', href: '/7-docker-basics-for-beginners' },
            { title: 'ChatGPT in YOUR Terminal', href: '/chatgpt-in-your-terminal' },
            { title: 'How to make an Apache Webserver with SSL', href: '/how-to-apache-webserver-ssl' },
            { title: 'The ULTIMATE RetroPie Setup Guide', href: '/ultimate-retropie-setup-guide' },
            { title: 'How to Dual Boot Windows 10 and Pop!_OS (Legacy/GRUB)', href: '/dual-boot-windows-10-pop-os' },
            { title: 'Installing Arch Linux the EASY WAY! – archfi Guide', href: '/installing-arch-linux-the-easy-way-archfi-guide' },
            { title: 'How to Dual Boot Fedora and Windows 11', href: '/how-to-dual-boot-fedora-and-windows-11' },
            { title: 'How to make ZIP Files in Windows', href: '/how-to-make-zip-files-in-windows' },
            { title: 'Turning an OLD PC/Laptop into a Media Server! (Ubuntu/PLEX Guide)', href: '/old-pc-laptop-media-server' },
            { title: 'Perfect Windows 11 Virtual Machine on Linux (VMware Guide)', href: '/windows-11-vmware-guide-linux' },
            { title: 'How to Flash Linux on the PinePhone', href: '/how-to-flash-linux-on-the-pinephone' },
            { title: 'Install DaVinci Resolve in Linux (Outdated)', href: '/how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora' },
            { title: 'How to Switch Arch Linux Kernels', href: '/how-to-switch-arch-linux-kernels-lts-zen-hardened' },
            { title: 'How to Auto-Mount Drives in Linux', href: '/auto-mount-drives-in-linux-fstab' },
            { title: 'Monitor AMD RYZEN Temps in Linux', href: '/monitor-amd-ryzen-temps-in-linux' },
            { title: '5 Things You MUST DO after Installing Pop!_OS', href: '/after-installing-pop-os-cosmic' },
            { title: 'How to Control AMD Wraith Prism Cooler RGB (and more)', href: '/control-amd-wraith-prism-cooler-master' },
            { title: 'Easily Install AMD Ryzen CPU and Wraith Prism Cooler', href: '/install-amd-ryzen-cpu-and-wraith-prism-cooler' },
            { title: 'OpenSUSE – 5 Things You MUST Do After Installing', href: '/opensuse-5-things-you-must-do-after-installing' },
        ],
    },
    {
        title: 'HARDWARE',
        icon: <Wrench className="h-5 w-5" />,
        defaultOpen: true,
        pages: [
            { title: 'The Edge2 Pro is a CRAZY Powerful ARM Single Board Computer', href: '/edge2-powerfull-arm-sb' },
            { title: 'The Sudden Fall of JingOS and their Linux Tablet', href: '/fall-of-jingos-linux-tablet' },
        ],
    },
    {
        title: 'SOFTWARE',
        icon: <Code className="h-5 w-5" />,
        defaultOpen: true,
        pages: [
            { title: 'Fedora Server Guide: Cockpit, ZFS, Podman, and more!', href: '/fedora-server-guide-cockpit-zfs-podman' },
            { title: 'Read THIS before choosing a RHEL Clone', href: '/rhel-clones-almalinux-centos-rocky-2025' },
            { title: 'MUST HAVE Homelab Services', href: '/must-have-home-server-services-2025' },
            { title: '5 AWESOME Open Source Apps that I use Everyday', href: '/5-awesome-open-source-apps' },
            { title: 'Zen browser is making me DITCH Microsoft Edge', href: '/zen-browser-better-firefox' },
            { title: 'COSMIC might be the future of the Linux Desktop.', href: '/cosmic-pre-alpha' },
            { title: 'Top 5 FAVORITE Linux Distros', href: '/top-5-favorite-linux-distros' },
            { title: 'Rocky Linux, AlmaLinux, RHEL, CentOS - Which Is BEST for You?', href: '/rocky-linux-almalinux-rhel-centos-which-is-best-for-you' },
            { title: 'The Death of Mozilla is the Death of the Open Web', href: '/the-death-of-mozilla-is-the-death-of-the-open-web' },
            { title: 'Linux Distros Based on Fedora', href: '/linux-distros-based-on-fedora' },
            { title: 'The BEST Solutions for Running Windows Apps in Linux', href: '/the-best-solutions-for-running-windows-apps-in-linux' },
            { title: 'No, Manjaro is NOT Arch', href: '/no-manjaro-is-not-arch' },
            { title: 'These Linux Distros are ACTUALLY FREE. Stallman Approved!', href: '/free-software-foundation-distros' },
            { title: 'Chrome OS Flex is a NIGHTMARE!', href: '/chrome-os-flex-is-a-nightmare' },
            { title: 'Fedora vs Arch Linux - Battle of the Best!', href: '/fedora-vs-arch-linux' },
            { title: '7 (more) AWESOME Linux Terminal CLI Applications', href: '/7-more-awesome-linux-terminal-utilities' },
            { title: '7 Awesome Linux Terminal Utilities', href: '/7-awesome-linux-terminal-utilities' },
            { title: 'Favorite GNOME/GTK Themes, Icons, and more!', href: '/favorite-gnome-gtk-themes-icons' },
            { title: '5 AWESOME LINUX APPS - GNOME Circle', href: '/5-awesome-linux-apps-gnome-circle' },
            { title: '10 BEST Linux Applications: Must Have Software (2021)', href: '/10-best-linux-applications-must-have-software' },
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

