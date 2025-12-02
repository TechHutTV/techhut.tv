---
title: Official Lightweight Windows 11 IoT LTSC
date: 2025-01-27
url: windows-iot-ltsc-guide
draft: true
authors: ["Brandon Hopkins"]
categories: Guides
tags: [Windows, Guides, Proxmox, Customization, IoT, LTSC]
---

Microsoft’s *official* lightweight Windows isn’t as “mini‑Windows” as some of the community‑made bloat‑busting ISOs out there, but it’s surprisingly lean for a Windows OS.  If you’ve ever stared at an Enterprise ISO that comes with only a handful of apps, no Microsoft Store, and no Edge pre‑installed, you’ll feel right at home.  Below, I’ll walk you through the entire journey—from grabbing the ISO, spinning it up in Proxmox, tightening it up with a handful of tweaks, to pulling back the missing bits like the Store and Windows Terminal—all while keeping the system safe and performant.

---

## The “Lite” Version is a Microsoft‑Made, Fully Supported Windows

First off, this isn’t a community remix that removes the Windows Component Store and disables Defender.  It’s the **Windows 11 IoT Enterprise LTSC** edition that Microsoft ships for devices that need a *fixed‑function* operating system that won’t change for years.  “LTSC” stands for **Long Term Servicing Channel** – a branch that receives feature updates only every 2 years, but gets security patches for **10 years**.  This makes it a great candidate for long-term deployments where stability is key.

Even though the ISO strips the Store out, you can re‑enable it with a single command.  Open PowerShell as **Administrator** and run:

```powershell
# Reset the Store components
WSReset.exe
```

The `WSReset.exe` tool cleans the Store’s cache and forces it to re‑register.  After a minute or two, you’ll see the **Microsoft Store** icon in the taskbar.  Importantly, it works *without* a Microsoft account on the evaluation build.

### 1. Microsoft Store

Even though the ISO strips the Store out, you can re‑enable it with a single command.  Open PowerShell as **Administrator** and run:

```powershell
# Reset the Store components
WSReset.exe
```

The `WSReset.exe` tool cleans the Store’s cache and forces it to re‑register.  After a minute or two, you’ll see the **Microsoft Store** icon in the taskbar.  Importantly, it works *without* a Microsoft account on the evaluation build.

### 2. Windows Terminal (and other modern UWP apps)

The **Windows Terminal** isn’t part of the base install.  The quickest path is through the **Microsoft Store** or via the **App Installer** package.

1. From the Store, search for **Windows Terminal** → **Get**.  
2. Alternatively, download the `.appinstaller` from the Windows Terminal GitHub releases page (search “Windows Terminal release” on GitHub).  
3. Double‑click the `.appinstaller` file; it will launch the Store in “Install” mode and download the app.

The Store’s App Installer is also how you can add **PowerToys**, **Microsoft To‑Do**, **Sticky Notes**, and many more small utilities.

---

## Winget: The Official Windows Package Manager

If you want a **CLI** approach to installing software, Microsoft’s **winget** is the way to go.  It’s installed via the **App Installer** as a side‑by‑side component, so the first time you run `winget` it will prompt you to install the App Installer if you haven’t already.

Once you have winget, you can install packages with a single command:

```powershell
# Install Windows Terminal via winget
winget install Microsoft.WindowsTerminal
```

Winget is backed by a curated catalog hosted by Microsoft.  To search for packages:

```powershell
winget search terminal
```

The output gives you the exact command you’ll need.  In practice, you can set up a **winget.json** manifest in your project repository and sync it across all your dev machines.

---

## Security Considerations

Because the ISO is stripped down, a lot of the built‑in security mechanisms are missing.  You should:

- **Keep the evaluation period in mind** – after 90 days you’ll be forced to reinstall.  
- **Restrict network access** – if the device is exposed, block outbound traffic except for necessary services.  
- **Disable the Windows Store** after you’re done installing your apps.  
- **Use the built‑in firewall** – enable inbound rules only for the ports you need.  
- **Consider third‑party security tools** – even a small anti‑virus can be installed via winget (`winget install SophosAntiVirus` for example).

Because the ISO excludes the Windows Update Store, you’ll need to manually apply updates by downloading the latest security patches from the Microsoft Update Catalog and installing them with `wusa /quiet /norestart <file.msu>`.

---

## Real‑World Use Cases I’ve Seen

| Device | Use | Why Windows 11 IoT LTSC Works |
|--------|-----|--------------------------------|
| **Home Media Server** | Streaming to TVs, managing Plex | Low RAM footprint, no bloat apps |
| **Retail Kiosk** | Digital signage, POS | Predictable, no unwanted UI changes |
| **Industrial Controller** | Monitoring sensors, logging | 10‑year lifecycle, enterprise security |
| **Home Lab** | Testing new Windows features | Easy to reinstall before eval expires |

In my own lab, I’ve used it as a thin client for a Windows 11 VM that runs **Blue Iris** for video surveillance.  Because the VM is bare‑bones, it responds faster than a full Windows 10 build, and I can add just the few drivers I need (virtio‑SCSI, virtio‑NIC).

---

## Comparing to Other Lightweight Windows Options

You might wonder how this stacks up against **Windows 10 IoT Core**, **Windows 10 LTSC**, or **Debian ARM**.  Here’s a quick comparison:

- **Windows 10 IoT Core** – designed for UWP apps, no desktop.  Not suitable if you need a full Windows Desktop.  
- **Windows 10 Enterprise LTSC** – similar to the 11 version, but the 11 build brings the newer security stack and UI improvements.  
- **Debian/Ubuntu Lite** – open‑source, no licensing, but you lose the Windows ecosystem (native Office, .NET apps).  

If your workloads are Windows‑centric and you want a *supported* OS with a 10‑year security cycle, Windows 11 IoT Enterprise LTSC is the sweet spot.

---

## Quick Recap of the Workflow

1. **Download the ISO** from Microsoft’s evaluation center.  
2. **Create a VM** (Proxmox, Hyper‑V, etc.) with 2 GB RAM, 20 GB disk.  
3. **Boot, install, and add drivers** (virtio‑SCSI, vDSI).  
4. **Disable telemetry** via group policy.  
5. **Turn off Edge startup** and other hidden processes.  
6. **Turn off visual effects** for a snappier UI.  
7. **Re‑enable the Microsoft Store** with `WSReset.exe`.  
8. **Install Windows Terminal** via Store or winget.  
9. **Use winget** for all future software installs.  
10. **Monitor the 90‑day timer** and plan a reinstall or purchase.

---

## Final Thoughts

Microsoft’s Windows 11 IoT Enterprise LTSC is an *official* lightweight Windows that delivers most of the same security and stability as the full desktop, but with a fraction of the bloat.  The key trade‑off is the 90‑day evaluation window, but for short‑term projects, testing, or lab work that’s perfectly fine.

If you’re building a kiosk, a media server, or any appliance that needs a consistent OS for a decade, consider this ISO.  It’s a great way to get a Windows environment that’s close to bare metal without resorting to third‑party bloat‑removal scripts that might break future updates.

Happy hacking, and remember: the lighter the OS, the faster you can prototype.  If you found this guide helpful, drop a comment below, and check out the links in the description for official Microsoft docs and the winget GitHub repo.  Cheers!