<markdown>
---
title: Self-Host UniFi on a Raspberry Pi
date: 2025-11-29
url: self-host-unifi-raspberry-pi
draft: true
authors: ["Brandon Hopkins"]
categories: Guides
tags: [Self-Host, RaspberryPi, UniFi, Networking, Guides, Homelab]
---

# Self-Host UniFi on a Raspberry Pi

You can NOW Self-Host UniFi

Getting UniFi OS Server on a Pi feels like a victory for *open-source self-hosting*. The initial install was surprisingly painless – the shell script did the heavy lifting, and the UI guided me through the first adoption without a hitch. I've already got my 8-port switch, a little outdoor AP, and even a Wi-Fi network set up for the controller itself.

The only things I wish were smoother are:

- **VOIP integration** – it's a beta feature in the current releases. If you need internal phone calls, wait a few weeks or keep the Dream Machine for that.
- **UProtect** – still in the works, so if you rely on the camera security suite you'll have to keep the cloud gateway or another appliance for now.
- **Automated backups** – the UI does it, but I'd love a more granular snapshot system that lets me roll back to a specific timepoint.

All in all, if you're tired of the Dream Machine's "cloud" feel, or you just want a low-maintenance controller that sits on a Pi in the back of your house, this is the way to go. It's cheap, it's local, and you're the only one who can decide when to update.

## Next steps & resources

- **Official UniFi OS Server documentation** – [UniFi OS](https://help.ui.com/hc/en-us/articles/360020411731-UniFi-OS-Server-Installation-Guide) – the place to get the latest installer and troubleshooting tips.
- **Podman cheat sheet** – if you're new to containers, the official docs cover commands like `podman run`, `podman ps`, etc. ([link](https://podman.io/docs/quickstart)).
- **UniFi Community Forums** – great for specific device issues (e.g., "switch isn't adopting", "AP shows as offline") and for sharing your own home-network topology photos.

If you try this out, let me know how it works for you. Drop a comment or ping me on Twitter – I'll be happy to tweak the guide or share some of the tweaks I've discovered along the way. Until next time, happy self-hosting and enjoy the quiet hum of your Raspberry Pi managing a network of Wi-Fi and Ethernet goodies!
</markdown>