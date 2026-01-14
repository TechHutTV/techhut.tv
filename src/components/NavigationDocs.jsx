import { useRouter } from 'next/router'
import clsx from 'clsx'
import {
    ActivePageMarker,
    NavLink,
    TopLevelNavItem,
    VisibleSectionHighlight
} from '@/components/NavigationAPI'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/mdx'
import { useState } from 'react'
import { NavigationStateProvider, useNavigationState } from '@/components/NavigationState'
import ChevronDownIcon from '@/components/icons/ChevronDownIcon'

export const docsNavigation = [
    {
        title: '2025',
        isOpen: false,
        links: [
            {
                title: 'December',
                isOpen: false,
                links: [
                    {
                        title: 'Fedora Server Guide: Cockpit, ZFS, Podman, and more!',
                        href: '/2025/12/fedora-server-guide-cockpit-zfs-podman'
                    }
                ]
            },
            {
                title: 'July',
                isOpen: false,
                links: [
                    {
                        title: 'Automate homelab chores with Ansible',
                        href: '/2025/07/automate-homelab-ansible'
                    },
                    {
                        title: 'Install DaVinci Resolve in Any Linux Distro Using DavinciBox (2025)',
                        href: '/2025/07/how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora'
                    },
                    {
                        title: 'Read THIS before choosing a RHEL Clone',
                        href: '/2025/07/rhel-clones-2025'
                    }
                ]
            },
            {
                title: 'March',
                isOpen: false,
                links: [
                    {
                        title: 'How to Safely Upgrade or Downgrade the Kernel on Arch Linux',
                        href: '/2025/03/how-to-safely-upgrade-or-downgrade-kernel-on-arch-linux'
                    },
                    {
                        title: 'Libadwaita 1.7, a new KDE for-profit, and more!',
                        href: '/2025/03/libadwaita-kde-for-profit'
                    },
                    {
                        title: 'MUST HAVE Homelab Services',
                        href: '/2025/03/must-have-home-server-services-2025'
                    },
                    {
                        title: 'Mozilla and Thunderbird 136 released, Godot 4.4, and more!',
                        href: '/2025/03/firefox-thunderbird-136-godot'
                    },
                    {
                        title: 'Mozilla worrying Terms of Use, Hellwig steps down, and more!',
                        href: '/2025/03/mozilla-term-of-use-hellwig'
                    }
                ]
            },
            {
                title: 'February',
                isOpen: false,
                links: [
                    {
                        title: '5 AWESOME Open Source Apps that I use Everyday',
                        href: '/2025/02/5-awesome-open-source-apps'
                    },
                    {
                        title: 'Linus ends the Rust for Linux drama, COSMIC Alpha 6 released, and more!',
                        href: '/2025/02/linus-rust-drama-cosmic-alpha'
                    },
                    {
                        title: 'Asahi Linux Project Lead Resigns, Plasma 6.3, and more!',
                        href: '/2025/02/asahi-lead-resigns-plasma-updates-and-more'
                    },
                    {
                        title: 'Benchmarking Linux, Mac AND Windows on a 2019 MacBook Pro',
                        href: '/2025/02/linux-mac-windows-benchmarking'
                    },
                    {
                        title: 'Self-Host with Immich!',
                        href: '/2025/02/self-host-immich-photo-backup'
                    },
                    {
                        title: 'Git for Everyone',
                        href: '/2025/02/git-for-everyone-guide'
                    },
                    {
                        title: 'Create an AWESOME Home Server/NAS with Proxmox',
                        href: '/2025/02/home-server-nas-proxmox-linux-guide'
                    },
                    {
                        title: 'the OFFICIAL Windows (lite) from Microsoft',
                        href: '/2025/02/windows-lite-ltsc-microsoft'
                    },
                    {
                        title: 'EVERYONE needs a Home Server',
                        href: '/2025/02/5-reasons-build-home-server'
                    }
                ]
            }
        ]
    },
    {
        title: '2024',
        isOpen: false,
        links: [
            {
                title: 'August',
                isOpen: false,
                links: [
                    {
                        title: 'Zen browser is making me DITCH Microsoft Edge',
                        href: '/2024/08/zen-browser-better-firefox'
                    }
                ]
            },
            {
                title: 'July',
                isOpen: false,
                links: [
                    {
                        title: 'BEST Way to Monitor your Home Server! (Grafana, Prometheus, InfluxDB)',
                        href: '/2024/07/monitor-home-server-grafana-prometheus-influxdb'
                    }
                ]
            },
            {
                title: 'June',
                isOpen: false,
                links: [
                    {
                        title: 'System76's COSMIC now has a new logo and brand!',
                        href: '/2024/06/system76s-cosmic-new-logo-branding'
                    },
                    {
                        title: 'The EU is still trying to dismantle end-to-end encryption',
                        href: '/2024/06/eu-is-dismantle-end-to-end-encryption'
                    },
                    {
                        title: 'KDE Plasma 6.1 completely redesigned its Edit Mode',
                        href: '/2024/06/kde-plasma-new-edit-mode'
                    },
                    {
                        title: 'NixOS - The New Best Server OS?',
                        href: '/2024/06/nixos-best-server-os-setup'
                    }
                ]
            },
            {
                title: 'May',
                isOpen: false,
                links: [
                    {
                        title: 'Nix governance Crisis and MORE!',
                        href: '/2024/05/nix-governance-crisis-and-more'
                    },
                    {
                        title: 'COSMIC might be the future of the Linux Desktop.',
                        href: '/2024/05/cosmic-pre-alpha'
                    },
                    {
                        title: 'Guide: Setting Up Windows as a NAS Operating System',
                        href: '/2024/05/run-windows-nas-home-server'
                    },
                    {
                        title: 'New GPT Open-Source AI in copilot!',
                        href: '/2024/05/new-gpt-open-source-ai-copilot'
                    }
                ]
            },
            {
                title: 'April',
                isOpen: false,
                links: [
                    {
                        title: 'Fedora 40, COSMIC Pre-Alpha, Windows 11 ads, new Linux Tablets, and more!',
                        href: '/2024/04/fedora-40-cosmic-pre-alpha-windows-11-ads-new-linux-tablets-and-more'
                    },
                    {
                        title: 'The Biggest Security Attack on Linux, Kubuntu New Logo, and more!',
                        href: '/2024/04/xz-backdoor-kubuntu-logo'
                    }
                ]
            },
            {
                title: 'March',
                isOpen: false,
                links: [
                    {
                        title: 'GNOME 46 Released, KDE Global Themes Drama, First Looks at COSMIC, and more!',
                        href: '/2024/03/gnome-46-kde-themes-cosmic'
                    },
                    {
                        title: 'COSMIC Updates, Linux at 4%, VLC Future Plans, and more!',
                        href: '/2024/03/cosmic-updates-linux-4'
                    }
                ]
            },
            {
                title: 'February',
                isOpen: false,
                links: [
                    {
                        title: 'KDE Plasma 6 Released, Tails 6, LXQt on Qt6, and more!',
                        href: '/2024/02/plasma-6-tails-6-lxqt-qt-6'
                    },
                    {
                        title: 'COSMIC DE Almost Ready, Signal Usernames, Firefox 123, and more!',
                        href: '/2024/02/cosmic-de-ready-signal-usernames'
                    },
                    {
                        title: 'Mozilla Corporation CEO Steps Down, Taliban Shut Down queer.af, and more!',
                        href: '/2024/02/mozilla-ceo-steps-down'
                    },
                    {
                        title: 'Try Out Plasma 6, elementaryOS 8, Mozilla Monitor Plus, Bluesky, and more!',
                        href: '/2024/02/try-out-plasma6-and-more'
                    },
                    {
                        title: '7 Docker Basics for Beginners',
                        href: '/2024/02/7-docker-basics-for-beginners'
                    }
                ]
            },
            {
                title: 'January',
                isOpen: false,
                links: [
                    {
                        title: 'Roblox Donates to Blender, Servo Development, Purism IPO, and more!',
                        href: '/2024/01/roblox-donates-to-blender-servo'
                    },
                    {
                        title: 'GNU to Power Online Payments, Framework Laptop 16 Reviews, and more!',
                        href: '/2024/01/gnu-online-payments-framework'
                    },
                    {
                        title: 'New Linux-based Gaming Device, €203k to GStreamer, COSMIC Road to Alpha, and more!',
                        href: '/2024/01/linux-based-gaming-device-gstreamer-cosmic-alpha'
                    },
                    {
                        title: 'The Linux Foundation Report, AI in Audacity, ElementaryOS 7 update, and more!',
                        href: '/2024/01/linux-foundation-report-ai-audacity-elementaryos'
                    },
                    {
                        title: 'Linux Marketshare rises, GNOME Circle apps, Scribus 1.6 and more!',
                        href: '/2024/01/linux-marketshare-gnome-circle'
                    }
                ]
            }
        ]
    },
    {
        title: '2023',
        isOpen: false,
        links: [
            {
                title: 'December',
                isOpen: false,
                links: [
                    {
                        title: 'GNOME & KDE developments, Nobara & Enlightenment releases, and more!',
                        href: '/2023/12/gnome-kde-develop-nobara-release'
                    },
                    {
                        title: 'COSMIC Text Editor, the Fediverse grows, Plasma Mobile 6, and more!',
                        href: '/2023/12/cosmic-text-editor-fediverse-plasma-mobile'
                    },
                    {
                        title: 'Nextcloud Hub 7, new Krita Supporter, AI Act, Gemini, and more!',
                        href: '/2023/12/nextcloud-hub-7-krita-ai-act'
                    },
                    {
                        title: 'PeerTube 6, Zorin OS 17, Cinnamon 6, and more!',
                        href: '/2023/12/peertube6-zorin17-cinnamon6'
                    }
                ]
            },
            {
                title: 'November',
                isOpen: false,
                links: [
                    {
                        title: 'COSMIC Window Arrangement, GNOME Tech Fund, and more!',
                        href: '/2023/11/cosmic-gnome-krita'
                    },
                    {
                        title: 'Chaos in OpenAI and Nothing, Firefox 120, Bluesky, and more!',
                        href: '/2023/11/chaos-openai-nothing-firefox'
                    },
                    {
                        title: 'GNOME gets €1M, SteamDeck OLED, Blender 4, and more!',
                        href: '/2023/11/gnome-fund-steamdeck-oled'
                    },
                    {
                        title: 'KDE 6 MegaRelease, Fedora 39, GPT-4 Turbo, and more!',
                        href: '/2023/11/kde-megarelease-fedora-39'
                    },
                    {
                        title: 'OpenSUSE Changes Logo, Linux 6.6 Released, Mastodon Lists, and more!',
                        href: '/2023/11/opensuse-logo-linux-6-mastodon'
                    }
                ]
            },
            {
                title: 'October',
                isOpen: false,
                links: [
                    {
                        title: 'System76's COSMIC new look, Firefox 119, KDE Plasma 6 release date, and more!',
                        href: '/2023/10/cosmic-new-look-firefox-119-kde-plasma-6'
                    },
                    {
                        title: 'Ubuntu 23.10 and Wi-Fi 7 released, StackOverflow layoffs, and more!',
                        href: '/2023/10/ubuntu-2310-wifi-7-stackoverflow'
                    },
                    {
                        title: 'GNOME to drop x11, Right to Repair, OldTechBloke, and more!',
                        href: '/2023/10/gnome-drops-x11-right-to-repair'
                    },
                    {
                        title: 'Stallman's health issues, KDE Plasma & COSMIC updates, and more!',
                        href: '/2023/10/stallman-battling-cancer-kde-cosmic'
                    }
                ]
            },
            {
                title: 'September',
                isOpen: false,
                links: [
                    {
                        title: 'GNOME 45 release, Mozilla.ai, and Valve contributions to Linux, and more!',
                        href: '/2023/09/gnome-45-mozilla-ai-valve'
                    },
                    {
                        title: 'Terraria donates $100k to Godot, Fedora wants to drop X11, and more!',
                        href: '/2023/09/terraria-donates100k-to-godot'
                    },
                    {
                        title: 'Terrible car privacy, Right to Repair for smartphones, and more!',
                        href: '/2023/09/car-privacy-right-to-repair-unity'
                    },
                    {
                        title: 'Microsoft is having EU regulations issues, Ubuntu 23.10 wallpaper, and more!',
                        href: '/2023/09/microsoft-eu-regulations-ubuntu-2310'
                    }
                ]
            },
            {
                title: 'August',
                isOpen: false,
                links: [
                    {
                        title: 'KDE big apps update, Fairphone new phone, VanillaOS 2, and more!',
                        href: '/2023/08/kde-apps-update-fairphone-vanillaos'
                    },
                    {
                        title: 'StarLab's new 2-in-1 tablet, Libreoffice 7.6, and more!',
                        href: '/2023/08/starlab-libreoffice-more'
                    },
                    {
                        title: 'System76 customization settings, KDE wallpaper contest, and more!',
                        href: '/2023/08/system76-customization-kde-wallpaper-contest'
                    },
                    {
                        title: 'Refurbished Steam Decks, BBC on the Fediverse, Rhino Linux, and more!',
                        href: '/2023/08/steam-deck-bbc-fediverse-rhino-linux'
                    },
                    {
                        title: 'Linux beats MacOS in gaming, a big Linux Foundation problem, and more!',
                        href: '/2023/08/linux-beats-macos-gaming-linux-foundation'
                    }
                ]
            },
            {
                title: 'July',
                isOpen: false,
                links: [
                    {
                        title: 'GNOME will get native Tiling, Google wants to DRM the Internet, and more!',
                        href: '/2023/07/gnome-tiling-google-drm'
                    },
                    {
                        title: 'SUSE forks RHEL, Thunderbird redesign is here, and more!',
                        href: '/2023/07/suse-forks-rhel-thunderbird-redesign'
                    },
                    {
                        title: 'The RHEL story continues, a ZorinOS upgrade tool, and more!',
                        href: '/2023/07/rhel-story-zorinos-upgrade-tool'
                    }
                ]
            },
            {
                title: 'June',
                isOpen: false,
                links: [
                    {
                        title: 'RHEL source code controversies explained, and more!',
                        href: '/2023/06/rhel-source-code-opensuse-songs'
                    },
                    {
                        title: 'The Reddit protest, COSMIC Tiling is awesome, and more!',
                        href: '/2023/06/reddit-protest-cosmic-tiling'
                    },
                    {
                        title: 'Debian 12 released, a preview of Thunderbird redesign, and more!',
                        href: '/2023/06/debian12-released-thunderbird-redesign'
                    },
                    {
                        title: 'Red Hat drops LibreOffice, Mozilla AI contest winners, Reddit's Strike, and more!',
                        href: '/2023/06/mozilla-ai-red-hat-libreoffice-reddit-strike'
                    },
                    {
                        title: 'Ubuntu Snaps-only version, Dolphin emulator won't be on Steam, and more!',
                        href: '/2023/06/ubuntu-snaps-only-dolphin-emulater'
                    }
                ]
            },
            {
                title: 'May',
                isOpen: false,
                links: [
                    {
                        title: 'RHEL Summit, KDE Plasma working on HDR, better GNOME settings, and more!',
                        href: '/2023/05/kde-plasma-hdr-gnome-settings'
                    },
                    {
                        title: 'Cosmic DE now has panels, BlueSky open-sourced their app, and more!',
                        href: '/2023/05/cosmic-de-panels-bluesky-opensource'
                    },
                    {
                        title: 'Big KDE Plasma 6 news, Firefox 113 & 114, Fly-Pie everywhere, and more!',
                        href: '/2023/05/kde-plasma-6-sprint-firefox-flypie'
                    },
                    {
                        title: 'Mastodon get BETTER, Krita reflects on 2022, and more!',
                        href: '/2023/05/mastodon-onboarding-krita-gnome'
                    }
                ]
            },
            {
                title: 'April',
                isOpen: false,
                links: [
                    {
                        title: 'GIMP ported to GTK3, BlendOS 2, Plasma 6 ISO, and more!',
                        href: '/2023/04/gimp-gtk3-blendos2-plasma6'
                    },
                    {
                        title: 'ChatGPT in YOUR Terminal',
                        href: '/2023/04/chatgpt-in-your-terminal'
                    },
                    {
                        title: 'Fedora 38, Proton 8, Vivaldi 6, Deepin 20.9, and more',
                        href: '/2023/04/fedora-38-proton-8-vivaldi-6'
                    },
                    {
                        title: 'Linux Mint introduces Styles, System76 works on COSMIC, and more!',
                        href: '/2023/04/linux-mint-style-and-cosmic'
                    },
                    {
                        title: 'Pine64 announces RISC-V tablet, System76  announces in-house laptop, and more!',
                        href: '/2023/04/pine64-riscv-system76-virgo'
                    }
                ]
            },
            {
                title: 'March',
                isOpen: false,
                links: [
                    {
                        title: 'New Framework laptops, GNOME 44, Wayland screen sharing, and more!',
                        href: '/2023/03/framework-laptops-gnome44'
                    },
                    {
                        title: 'Nextcloud announces Hub 4 with AI Tools for everyone, a Sharepoint alternative, and more!',
                        href: '/2023/03/nextcloud-hub-4'
                    },
                    {
                        title: 'The Future of AI NEEDS to Deal with Copyright Laws',
                        href: '/2023/03/ai-needs-to-deal-with-copyright-laws'
                    },
                    {
                        title: 'KDE Konsole on Windows, GNOME Image Viewer improvements, and more!',
                        href: '/2023/03/konsole-on-windows-gnome-image-viewer'
                    },
                    {
                        title: 'VanillaOS 2.0 announced, Nitrux 2.7 released, and more!',
                        href: '/2023/03/vanilla-drops-ubuntu-nitrux-drops-plasma'
                    },
                    {
                        title: 'Top 5 FAVORITE Linux Distros',
                        href: '/2023/03/top-5-favorite-linux-distros'
                    },
                    {
                        title: 'The future of Linux Hardware, Flathub, and more!',
                        href: '/2023/03/future-of-linux-hardware-flathub'
                    }
                ]
            },
            {
                title: 'February',
                isOpen: false,
                links: [
                    {
                        title: 'New Linux hardware from Purism and Kubuntu, and more!',
                        href: '/2023/02/new-linux-hardware-purism-kubuntu'
                    },
                    {
                        title: 'KDE Plasma 5.27 & EndlessOS 5 released, Thunderbird future plans, and more!',
                        href: '/2023/02/kde-plasma-527-endless-5'
                    },
                    {
                        title: 'Releases for Elementary, LibreOffice, KDE Apps, and more!',
                        href: '/2023/02/new-elementary-libreoffice-and-kde-apps'
                    }
                ]
            },
            {
                title: 'January',
                isOpen: false,
                links: [
                    {
                        title: 'New EU Act poses risks for FOSS, new Immutable Distros, and more!',
                        href: '/2023/01/eu-act-immutable-distros'
                    },
                    {
                        title: 'Vanilla OS release, Tokodon client, Unity, and more!',
                        href: '/2023/01/vanilla-os-tokodon'
                    },
                    {
                        title: 'Linux is RISING, KDE updates and more!',
                        href: '/2023/01/linux-rising-2023'
                    }
                ]
            }
        ]
    },
    {
        title: '2022',
        isOpen: false,
        links: [
            {
                title: 'December',
                isOpen: false,
                links: [
                    {
                        title: 'Valve making HUGE Investment in Open-Source, Deepin Home, and more!',
                        href: '/2022/12/valve-investments-deepin'
                    },
                    {
                        title: 'Asahi GPU Drivers, COSMIC Updates, KDE Tiling and more!',
                        href: '/2022/12/asahi-gpu-drivers-cosmic-updates-kde-tiling'
                    },
                    {
                        title: 'How to make an Apache Webserver with SSL',
                        href: '/2022/12/how-to-apache-webserver-ssl'
                    },
                    {
                        title: 'GTK patches, new StarLabs laptop, big Maui updates and MORE!',
                        href: '/2022/12/gtk-patches-starlabs-kde'
                    }
                ]
            },
            {
                title: 'November',
                isOpen: false,
                links: [
                    {
                        title: 'Thunderbird “Supernova” Update, Toots be gone, and more!',
                        href: '/2022/11/thunderbird-supernova-toots-gone-kde-update'
                    },
                    {
                        title: 'Rocky Linux, AlmaLinux, RHEL, CentOS - Which Is BEST for You?',
                        href: '/2022/11/rocky-linux-almalinux-rhel-centos-which-is-best-for-you'
                    }
                ]
            },
            {
                title: 'October',
                isOpen: false,
                links: [
                    {
                        title: 'Ubuntu 22.10, PolyMC Collapses, Windows NVIDIA pain, and more!',
                        href: '/2022/10/ubuntu-polymc-pocket-casts'
                    },
                    {
                        title: 'The ULTIMATE RetroPie Setup Guide',
                        href: '/2022/10/ultimate-retropie-setup-guid'
                    },
                    {
                        title: 'Linux Bug Could BREAK Displays, Steam Deck Oopsie, and more!',
                        href: '/2022/10/linux-break-displays-steam-deck-oopsie'
                    },
                    {
                        title: 'MAJOR Nextcloud Release, Pop!_OS Rust, and more!',
                        href: '/2022/10/nextcloud-hub3-pop-os-rust'
                    }
                ]
            },
            {
                title: 'September',
                isOpen: false,
                links: [
                    {
                        title: 'The Edge2 Pro is a CRAZY Powerful ARM Single Board Computer',
                        href: '/2022/09/edge2-powerfull-arm-sb'
                    },
                    {
                        title: 'How to Dual Boot Windows 10 and Pop!_OS (Legacy/GRUB)',
                        href: '/2022/09/dual-boot-windows-10-pop-os'
                    },
                    {
                        title: 'Installing Arch Linux the EASY WAY! – archfi Guide',
                        href: '/2022/09/installing-arch-linux-the-easy-way-archfi-guide'
                    },
                    {
                        title: 'The Death of Mozilla is the Death of the Open Web',
                        href: '/2022/09/the-death-of-mozilla-is-the-death-of-the-open-web'
                    },
                    {
                        title: 'How to Dual Boot Fedora and Windows 11',
                        href: '/2022/09/how-to-dual-boot-fedora-and-windows-11'
                    },
                    {
                        title: 'How to make ZIP Files in Windows',
                        href: '/2022/09/how-to-make-zip-files-in-windows'
                    }
                ]
            },
            {
                title: 'August',
                isOpen: false,
                links: [
                    {
                        title: 'The Sudden Fall of JingOS and their Linux Tablet',
                        href: '/2022/08/fall-of-jingos-linux-tablet'
                    },
                    {
                        title: 'Linux Distros Based on Fedora',
                        href: '/2022/08/linux-distros-based-on-fedora'
                    }
                ]
            },
            {
                title: 'July',
                isOpen: false,
                links: [
                    {
                        title: 'The BEST Solutions for Running Windows Apps in Linux',
                        href: '/2022/07/the-best-solutions-for-running-windows-apps-in-linux'
                    },
                    {
                        title: 'No, Manjaro is NOT Arch',
                        href: '/2022/07/no-manjaro-is-not-arch'
                    },
                    {
                        title: 'These Linux Distros are ACTUALLY FREE. Stallman Approved!',
                        href: '/2022/07/free-software-foundation-distros'
                    },
                    {
                        title: 'Chrome OS Flex is a NIGHTMARE!',
                        href: '/2022/07/chrome-os-flex-is-a-nightmare'
                    }
                ]
            },
            {
                title: 'June',
                isOpen: false,
                links: [
                    {
                        title: 'Fedora vs Arch Linux - Battle of the Best!',
                        href: '/2022/06/fedora-vs-arch-linux'
                    }
                ]
            },
            {
                title: 'May',
                isOpen: false,
                links: [
                    {
                        title: 'Microsoft Edge might WIN on Linux.',
                        href: '/2022/05/microsoft-edge-might-win-on-linux'
                    },
                    {
                        title: '7 (more) AWESOME Linux Terminal CLI Applications',
                        href: '/2022/05/7-more-awesome-linux-terminal-utilities'
                    }
                ]
            },
            {
                title: 'April',
                isOpen: false,
                links: [
                    {
                        title: 'Flatpak vs. Snap vs. AppImage - Linux Packaging Benchmarks!',
                        href: '/2022/04/flatpak-vs-snap-vs-appimage'
                    }
                ]
            },
            {
                title: 'March',
                isOpen: false,
                links: [
                    {
                        title: '7 Awesome Linux Terminal Utilities',
                        href: '/2022/03/7-awesome-linux-terminal-utilities'
                    },
                    {
                        title: 'Favorite GNOME/GTK Themes, Icons, and more!',
                        href: '/2022/03/favorite-gnome-gtk-themes-icons'
                    },
                    {
                        title: 'Turning an OLD PC/Laptop into a Media Server! (Ubuntu/PLEX Guide)',
                        href: '/2022/03/old-pc-laptop-media-server'
                    },
                    {
                        title: 'Perfect Windows 11 Virtual Machine on Linux (VMware Guide)',
                        href: '/2022/03/windows-11-vmware-guide-linux'
                    }
                ]
            },
            {
                title: 'February',
                isOpen: false,
                links: [
                    {
                        title: 'How to Flash Linux on the PinePhone',
                        href: '/2022/02/how-to-flash-linux-on-the-pinephone'
                    },
                    {
                        title: 'Install DaVinci Resolve in Linux (Outdated)',
                        href: '/2022/02/how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora'
                    },
                    {
                        title: '5 AWESOME LINUX APPS - GNOME Circle',
                        href: '/2022/02/5-awesome-linux-apps-gnome-circle'
                    }
                ]
            }
        ]
    },
    {
        title: '2021',
        isOpen: false,
        links: [
            {
                title: 'November',
                isOpen: false,
                links: [
                    {
                        title: 'How to Switch Arch Linux Kernels',
                        href: '/2021/11/how-to-switch-arch-linux-kernels-lts-zen-hardened'
                    },
                    {
                        title: 'How to Auto-Mount Drives in Linux',
                        href: '/2021/11/auto-mount-drives-in-linux-fstab'
                    },
                    {
                        title: 'Top 10 Linux Apps – Truly Essential Software!',
                        href: '/2021/11/top-10-linux-apps-ubuntu'
                    },
                    {
                        title: 'Monitor AMD RYZEN Temps in Linux',
                        href: '/2021/11/monitor-amd-ryzen-temps-in-linux'
                    },
                    {
                        title: '10 BEST Linux Applications: Must Have Software (2021)',
                        href: '/2021/11/10-best-linux-applications-must-have-software'
                    },
                    {
                        title: '5 Things You MUST DO after Installing Pop!_OS',
                        href: '/2021/11/after-installing-pop-os-cosmic'
                    },
                    {
                        title: 'How to Control AMD Wraith Prism Cooler RGB (and more)',
                        href: '/2021/11/control-amd-wraith-prism-cooler-master'
                    },
                    {
                        title: 'Easily Install AMD Ryzen CPU and Wraith Prism Cooler',
                        href: '/2021/11/install-amd-ryzen-cpu-and-wraith-prism-cooler'
                    },
                    {
                        title: 'OpenSUSE – 5 Things You MUST Do After Installing',
                        href: '/2021/11/opensuse-5-things-you-must-do-after-installing'
                    }
                ]
            }
        ]
    }
]


export function NavigationDocsundefined