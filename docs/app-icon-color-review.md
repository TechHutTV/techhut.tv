# App icon color review

Reviewed all 128 directory entries in light and dark themes on 2026-09-05.

37 color logos were being replaced by white variants in dark mode. They now retain their existing source artwork in both themes:

- AdGuard Home
- Beszel
- CapRover
- CasaOS
- Cloudreve
- Deluge
- Discourse
- Duplicati
- FileZilla
- Fluent Reader
- Glance
- Gluetun
- Homarr
- Home Assistant
- Jellyfin
- Microsoft PowerToys
- Navidrome
- Nextcloud
- Nginx Proxy Manager
- OctoPrint
- ONLYOFFICE Desktop Editors
- ONLYOFFICE Workspace
- Pi-hole
- Plausible
- Prowlarr
- Proxmox VE
- PuTTY
- qBittorrent
- Radarr
- RustDesk
- Sonarr
- Sunshine
- Super Productivity
- Unbound
- UniFi OS Server
- Yacht
- Zerobyte

Replaced Cockpit with the blue icon from its official website and Portainer with the purple icon from its official website. Asset URLs and hashes are recorded in `public/app-icons/sources.json`.

Retained monochrome or grayscale artwork where the inspected source does not establish a suitable color replacement: Beaver Habit Tracker, ddterm, EasySSH, GNOME Boxes, KDE Connect, Kiwix, Libation, Material Shell, Memos, Moonlight, Ollama, Open WebUI, Pocket ID, Twingate, and Zen Browser. Existing source provenance remains in sources.json; official website/repository comparisons confirmed Beaver, GNOME Boxes, KDE Connect, Kiwix, Libation, Memos, and Twingate. Some website asset requests were blocked, so this is not a claim that no alternate artwork exists.

InfluxDB retains its white dark-theme variant because the navy icon has poor contrast. Dash to Panel, Distrobox, and WSL retain their existing theme-specific color variants.

Entries without an icon remain initials; this review did not substitute invented artwork.
