# App detail coverage review

Reviewed the current 126 app records against all 68 original MDX articles. The scope remains the current directory; removed and excluded projects were not added. All existing video objects are unchanged. Added 28 article associations, for 61 associations across 42 app pages: 36 pages have articles and videos, 6 have articles only, and 84 have videos only.

Search included current names, IDs, and aliases/former names such as Epiphany, Terminus, Wiretrustee, Overseerr/Jellyseerr, WSL, lm-sensors, KDEConnect, and Project N.O.M.A.D. Generic words such as Files, Linked, and Connections were inspected as possible false positives. Titles alone did not establish coverage.

## Added matches and rationale

| App | Added articles | Why they qualify |
| --- | --- | --- |
| Bottles | [the-best-solutions-for-running-windows-apps-in-linux](/the-best-solutions-for-running-windows-apps-in-linux) | Substantial practical walkthrough of bottles, dependencies, settings, versioning, and exporting environments; more than a roundup entry. |
| DaVinci Resolve | [how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora](/how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora) | Original installation walkthrough retained alongside the newer guide. Its generated title and a page note identify it as outdated. |
| Distrobox | [install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox](/install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox) | Installation and container/desktop integration used to run Resolve. |
| Docker | [run-windows-nas-home-server](/run-windows-nas-home-server), [nixos-best-server-os-setup](/nixos-best-server-os-setup), [monitor-home-server-grafana-prometheus-influxdb](/monitor-home-server-grafana-prometheus-influxdb), [self-host-immich-photo-backup](/self-host-immich-photo-backup), [automate-homelab-chores-ansible](/automate-homelab-chores-ansible), [fedora-44-post-install-guide](/fedora-44-post-install-guide), [local-ai-automation-n8n-ollama-whisper](/local-ai-automation-n8n-ollama-whisper), [self-host-netbird-pocketid](/self-host-netbird-pocketid), [seerr-overseerr-migration](/seerr-overseerr-migration), [copyparty-file-server-linux](/copyparty-file-server-linux), [dockhand-docker-manager](/dockhand-docker-manager), [proxmox-backup-server-complete-guide](/proxmox-backup-server-complete-guide) | Practical Engine/Desktop installation, Compose configuration, container operations, or automated container updates/backups. Mere prerequisites or references to Docker are excluded. |
| FileZilla | [ultimate-retropie-setup-guide](/ultimate-retropie-setup-guide) | SFTP connection and ROM transfer walkthrough with screenshots. |
| Kiwix | [project-nomad-offline-knowledge-server](/project-nomad-offline-knowledge-server) | Explains choosing, downloading, and reading offline knowledge libraries within Nomad. |
| NetBird | [fedora-44-post-install-guide](/fedora-44-post-install-guide), [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman) | Fedora desktop/server guides install the client, authenticate peers, and describe management/network configuration. |
| Ollama | [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman) | Fedora server guide runs the model service, pulls models, tests inference, and manages models. |
| Open WebUI | [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman) | Fedora server guide deploys the UI, connects it to Ollama, creates the user, and starts chatting. |
| Podman | [install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox](/install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox) | Resolve guide installs the container runtime and uses it for the DavinciBox environment. |
| Portainer | [self-host-immich-photo-backup](/self-host-immich-photo-backup) | Immich stack creation, environment settings, deployment, logs, and updating. |
| Proxmox VE | [proxmox-backup-server-complete-guide](/proxmox-backup-server-complete-guide), [monitor-home-server-grafana-prometheus-influxdb](/monitor-home-server-grafana-prometheus-influxdb) | PBS guide configures PVE storage, backup jobs, and restores; monitoring guide configures PVE metric export. |
| Radarr | [seerr-overseerr-migration](/seerr-overseerr-migration) | Seerr guide explains adding service instances and quality profiles to the media-request workflow. |
| Sonarr | [seerr-overseerr-migration](/seerr-overseerr-migration) | Seerr guide explains adding service instances and quality profiles to the media-request workflow. |
| superfile | [ghostty-best-terminal-emulator-linux-mac](/ghostty-best-terminal-emulator-linux-mac) | Ghostty article includes a practical Superfile image-preview demonstration. |

## Exclusions and historical scope

Roundups such as “must-have home server services,” “awesome apps/utilities,” “top 10 Linux apps,” and “10 best Linux applications” remain excluded. These include otherwise meaningful descriptions of Ulauncher, Tabby, Tangram, Mailspring, KDE Connect, and many server apps. The Bottles article differs because it contains a substantial practical walkthrough after the introductory comparison.

The Twingate section of the Windows NAS article refers readers to a sponsored video rather than providing an article walkthrough. NixOS mentions of Discourse, Cockpit, and Portainer link to examples without explaining those apps. The Immich article's NetBird recommendation points to the separate NetBird guide; it does not itself walk through NetBird. Project Nomad's Docker installation is performed by its installer, rather than teaching Docker management. Its Ollama mention is brief, while the Kiwix library workflow is substantive. The Fedora server guide teaches Podman rather than Docker; the Resolve article's container walkthrough likewise uses Podman. Kubernetes comparison/background mentions of Docker are excluded. Generic file-management terminology is not coverage of the Windows Files application. SMB client mounts do not establish Samba server coverage. The Seerr guide's Plex user import and Jellyfin references are not separate server setup guides.

No publication dates or video IDs were inferred from article dates. All existing videos remain in the app records, and the page shows all of them, deduplicated and newest first.

## Metadata sources and remaining boundaries

Each dedicated JSON includes upstream source URLs. Current official README and software-license files were retrieved; non-GitHub projects use their own GitLab, KDE, Proxmox, or product documentation. Useful official homepages and every existing video thumbnail were checked. Public software-license pages were checked separately from the icon provenance archive.

Notable distinctions: Dockhand uses BSL-1.1; n8n has Sustainable Use and Enterprise terms; Open WebUI has branding restrictions; Umbrel uses PolyForm Noncommercial. Docker Engine and Desktop have different licensing. NetBird has BSD and AGPL components; ONLYOFFICE Groups and Docs have different licenses; qBittorrent source and binary distributions have different GPL terms. Pi-hole's current core is EUPL-1.2. The current Boxes rewrite is linked separately from the earlier GNOME implementation. jp2a now links to Talinx/jp2a. Historical InfluxDB coverage uses version 2, distinguished from current Core in the summary.

DaVinci Resolve's license source is its official installer/support distribution, and StartAllBack's is its official download/purchase page; a separate public EULA permalink was not verified for those two products. Microsoft Edge exposes its software terms through its official download flow. These are labeled proprietary; no open-source or permissive license is inferred from their dependencies or artwork. Platform labels describe the documented deployment scope, not a promise that every feature works on every platform. Superfile's partial Windows support is explicit. Current Boxes uses Flatpak, and Podman on macOS/Windows uses a Linux VM. Existing Yacht-era video guidance is historical; the Yacht summary retains the upstream alpha caveat.

Nine existing artwork gaps remain: jp2a, lm_sensors, LSD, Nala, Psensor, Search Light, synth-shell, tgpt, and Whisper. They use initials. No artwork was downloaded into the site, recolored, or replaced, so icon provenance is unchanged.

The optional research archives were used only as leads. They are not imported by routes, scripts, or tests. No maintenance status is inferred from a successful HTTP response.

## Coverage by app

An empty article cell means video-only coverage after the above exclusions. All qualifying associations are listed, not just the newest.

| App | Articles | Videos |
| --- | --- | --- |
| AdGuard Home | — | 1 |
| AMP | — | 1 |
| Ansible | [automate-homelab-chores-ansible](/automate-homelab-chores-ansible) | 0 |
| Apache HTTP Server | [how-to-apache-webserver-ssl](/how-to-apache-webserver-ssl) | 1 |
| AppImage Pool | — | 1 |
| Audiobookshelf | — | 1 |
| Beaver Habit Tracker | — | 1 |
| Beszel | — | 1 |
| Bottles | [the-best-solutions-for-running-windows-apps-in-linux](/the-best-solutions-for-running-windows-apps-in-linux) | 1 |
| btop | — | 1 |
| Bubble Card | — | 1 |
| CapRover | — | 1 |
| CasaOS | — | 1 |
| Cloudreve | — | 1 |
| Cockpit | [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman) | 1 |
| cool-retro-term | — | 1 |
| Copyparty | [copyparty-file-server-linux](/copyparty-file-server-linux) | 1 |
| Dash to Panel | — | 1 |
| DaVinci Resolve | [install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox](/install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox), [how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora](/how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora) | 2 |
| DavinciBox | [install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox](/install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox) | 0 |
| ddterm | — | 1 |
| Deluge | — | 1 |
| Discourse | — | 1 |
| Distrobox | [install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox](/install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox) | 1 |
| Docker | [7-docker-basics-for-beginners](/7-docker-basics-for-beginners), [run-windows-nas-home-server](/run-windows-nas-home-server), [nixos-best-server-os-setup](/nixos-best-server-os-setup), [monitor-home-server-grafana-prometheus-influxdb](/monitor-home-server-grafana-prometheus-influxdb), [self-host-immich-photo-backup](/self-host-immich-photo-backup), [automate-homelab-chores-ansible](/automate-homelab-chores-ansible), [fedora-44-post-install-guide](/fedora-44-post-install-guide), [local-ai-automation-n8n-ollama-whisper](/local-ai-automation-n8n-ollama-whisper), [self-host-netbird-pocketid](/self-host-netbird-pocketid), [seerr-overseerr-migration](/seerr-overseerr-migration), [copyparty-file-server-linux](/copyparty-file-server-linux), [dockhand-docker-manager](/dockhand-docker-manager), [proxmox-backup-server-complete-guide](/proxmox-backup-server-complete-guide) | 2 |
| Dockhand | [dockhand-docker-manager](/dockhand-docker-manager) | 1 |
| Duplicati | — | 1 |
| EasySSH | — | 1 |
| EdrawMax | — | 1 |
| Errands | — | 1 |
| Files | — | 1 |
| FileZilla | [ultimate-retropie-setup-guide](/ultimate-retropie-setup-guide) | 1 |
| Fluent Reader | — | 1 |
| Ghostty | [ghostty-best-terminal-emulator-linux-mac](/ghostty-best-terminal-emulator-linux-mac) | 1 |
| Git | [git-for-everyone-guide](/git-for-everyone-guide) | 0 |
| Glance | — | 1 |
| Gluetun | — | 3 |
| GNOME Boxes | — | 1 |
| GNOME Connections | — | 1 |
| GNOME Web | — | 1 |
| Grafana | [monitor-home-server-grafana-prometheus-influxdb](/monitor-home-server-grafana-prometheus-influxdb) | 1 |
| Homarr | — | 1 |
| Home Assistant | — | 2 |
| Immich | [self-host-immich-photo-backup](/self-host-immich-photo-backup) | 2 |
| InfluxDB | [monitor-home-server-grafana-prometheus-influxdb](/monitor-home-server-grafana-prometheus-influxdb) | 1 |
| Jellyfin | — | 7 |
| Jellystat | — | 1 |
| jp2a | — | 1 |
| k3s | [kubernetes-homelab-k3s-cluster](/kubernetes-homelab-k3s-cluster) | 1 |
| KDE Connect | — | 1 |
| KDE Discover | — | 1 |
| Kdenlive | — | 3 |
| Kiwix | [project-nomad-offline-knowledge-server](/project-nomad-offline-knowledge-server) | 1 |
| Libation | — | 1 |
| Linked | — | 1 |
| lm_sensors | [monitor-amd-ryzen-temps-in-linux](/monitor-amd-ryzen-temps-in-linux) | 0 |
| LocalTuya | — | 1 |
| LSD | — | 1 |
| Mailspring | — | 1 |
| MarkText | — | 1 |
| Material Shell | — | 1 |
| Memos | — | 1 |
| MicroCloud | — | 1 |
| Microsoft Edge | [microsoft-edge-might-win-on-linux](/microsoft-edge-might-win-on-linux) | 1 |
| Microsoft PowerToys | — | 1 |
| Moonlight | — | 1 |
| n8n | [local-ai-automation-n8n-ollama-whisper](/local-ai-automation-n8n-ollama-whisper) | 1 |
| Nala | — | 1 |
| Navidrome | — | 1 |
| NetBird | [self-host-netbird-pocketid](/self-host-netbird-pocketid), [fedora-44-post-install-guide](/fedora-44-post-install-guide), [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman) | 2 |
| Network UPS Tools | — | 1 |
| Nextcloud | — | 7 |
| Nginx Proxy Manager | — | 1 |
| OctoPrint | — | 1 |
| Ollama | [local-ai-automation-n8n-ollama-whisper](/local-ai-automation-n8n-ollama-whisper), [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman) | 1 |
| ONLYOFFICE Desktop Editors | — | 2 |
| ONLYOFFICE Workspace | — | 1 |
| Open WebUI | [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman) | 2 |
| Pi-hole | — | 2 |
| Plausible | — | 1 |
| Plex | [old-pc-laptop-media-server](/old-pc-laptop-media-server) | 3 |
| Pocket ID | [self-host-netbird-pocketid](/self-host-netbird-pocketid) | 1 |
| Podgrab | — | 1 |
| Podman | [fedora-server-guide-cockpit-zfs-podman](/fedora-server-guide-cockpit-zfs-podman), [install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox](/install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox) | 1 |
| Portainer | [self-host-immich-photo-backup](/self-host-immich-photo-backup) | 1 |
| Project Nomad | [project-nomad-offline-knowledge-server](/project-nomad-offline-knowledge-server) | 1 |
| Prometheus | [monitor-home-server-grafana-prometheus-influxdb](/monitor-home-server-grafana-prometheus-influxdb) | 1 |
| Prowlarr | — | 1 |
| Proxmox Backup Server | [proxmox-backup-server-complete-guide](/proxmox-backup-server-complete-guide) | 2 |
| Proxmox VE | [proxmox-backup-server-complete-guide](/proxmox-backup-server-complete-guide), [monitor-home-server-grafana-prometheus-influxdb](/monitor-home-server-grafana-prometheus-influxdb) | 3 |
| Psensor | [monitor-amd-ryzen-temps-in-linux](/monitor-amd-ryzen-temps-in-linux) | 0 |
| PuTTY | — | 1 |
| qBittorrent | — | 1 |
| Radarr | [seerr-overseerr-migration](/seerr-overseerr-migration) | 2 |
| RetroPie | [ultimate-retropie-setup-guide](/ultimate-retropie-setup-guide) | 1 |
| Return YouTube Dislike | — | 1 |
| RustDesk | — | 1 |
| Samba | — | 1 |
| Search Light | — | 1 |
| Seerr | [seerr-overseerr-migration](/seerr-overseerr-migration) | 1 |
| sleek | — | 1 |
| Sonarr | [seerr-overseerr-migration](/seerr-overseerr-migration) | 2 |
| StartAllBack | — | 1 |
| Sunshine | — | 1 |
| Super Productivity | — | 1 |
| superfile | [superfile-terminal-file-manager](/superfile-terminal-file-manager), [ghostty-best-terminal-emulator-linux-mac](/ghostty-best-terminal-emulator-linux-mac) | 1 |
| Synaptic | — | 1 |
| Synology Surveillance Station | — | 1 |
| synth-shell | — | 1 |
| SysMonTask | — | 1 |
| Tabby | — | 1 |
| Tangram | — | 1 |
| tgpt | [chatgpt-in-your-terminal](/chatgpt-in-your-terminal) | 1 |
| Twingate | — | 1 |
| Ulaa | — | 1 |
| Ulauncher | — | 1 |
| Umbrel | — | 1 |
| Unbound | — | 1 |
| UniFi OS Server | — | 1 |
| Ventoy | — | 1 |
| VMware | [windows-11-vmware-guide-linux](/windows-11-vmware-guide-linux) | 1 |
| Whisper | [local-ai-automation-n8n-ollama-whisper](/local-ai-automation-n8n-ollama-whisper) | 0 |
| Windows Subsystem for Linux | — | 1 |
| Yacht | — | 1 |
| Zen Browser | [zen-browser-better-firefox](/zen-browser-better-firefox) | 1 |
| Zerobyte | — | 1 |
