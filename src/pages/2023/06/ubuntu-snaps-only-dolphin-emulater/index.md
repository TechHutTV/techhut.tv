---
title: "Ubuntu Snaps-only version, Dolphin emulator won't be on Steam, and more!"
date: "2023-06-01"
draft: false
description: "This is an archive news post feature tech, Linux, and other open-source news. This is an older article that was part of a migration. There will be missing images, broken links, and potentially other issues."
authors:
  - "Niccolo Venerandi"
categories:
  - "News"
tags:
  - "News"
  - "Archive"
---

## Ubuntu will offer an immutable, all snaps Desktop next year

![](images/image-23.png)

This news comes directly from the comments of OMGUbuntu: Canonical developer Oliver Grawert has said that there is already an immutable Ubuntu distro, called "Ubuntu Core", currently aimed at embedded devices. The next LTS release of Ubuntu, though, a Desktop version of it will also be released, meaning that it will be aimed at normal users and not just IoT devices. Users won't be able to install applications through apt (as immutable systems disallow changing the system files) but they will have to use snap for anything.

This shouldn't come as a big surprise; Ubuntu is slowly switching to snaps for all of its apps. For example, just a few days ago we discovered that even CUPS (which manages the printing stack) will be switching to Snaps for the Ubuntu 23.10 release. However, note that this immutable Ubuntu version will not be the only one; the traditional LTS desktop version will still be available for everyone.

## Nintendo stopped Dolphin emulator release on Steam

![](images/image-24.png)

As a bit of context, Dolphin is an emulator for the GameCube and Wii consoles that support Windows, Mac, and Linux. The project aimed at being released on Steam, making it much easier to install and use; however, Valve initiated a conversation with Nintendo to check whether that could've brought legal issues, and Nintendo said that Dolphin would indeed violate the DMCA anti-circumvention provisions; as a result, Valve took down the project.

Note that this only refers to its page on Steam; the project itself is still available to everyone through their website and github (since it's free and open source). Note that the discussion is not about whether emulation is illegal; According to a Citra Developer, the exact reason for the takedown is that Dolphin illegally distributes Nintendo's WII decryption key, directly in the source code. This is required for the emulator to work, but you cannot "legally" obtain a key either, so they decided to add one as a compromise.

## There's now a light theme for GNOME shell

![](images/image-25.png)

Currently, the light/dark themes have no impact on the colorscheme used by the GNOME shell itself; the top bar, the applets, and the overview used a dark color regardless. Even though that's quite elegant, some people might prefer a light scheme! A recent MR managed to bring color-scheme setting support for the shell as well, meaning that you can achieve the look in the above picture. To do so, you will have to choose "prefer-light" in the colorscheme, which currently is not exposed to the user at all; unless something changes before the GNOME 45 release, you will have to rely either on third party applications or a DCONF editor to change that setting.

This is not the only visually appealing change in the GNOME world; as an example, Libadwaita introduced a new page-based navigation component that all GNOME applications can now use; it looks great, and it's easier to use than AdwLeaflet:

Finally, there has been a facelift to GNOME Calendar application as well, which now makes use of more Libadwaita components and has a very pretty delineated sidebar:

![](images/image-26.png)

As always, this week we've also seen releases of many GNOME applications: Cartridges 1.5 (which is now part of the Circle), IPlan 1.2 (with subtasks, records, project/task descriptions, and so on), Imaginer 0.2.2 (with the ability to run stable diffusion locally), Halftone (for lossy image compression), and so on.

## Fedora will drop X11 with Plasma 6 release

![](images/image-27.png)

Fedora has made Wayland the default for Plasma releases for quite some time; with the release of 6, they now plan to stop offering X11 entirely. The first reason to do that is that RHEL (the enterprise distribution of Red Hat) has deprecated the Xorg display server since May 2022, and Fedora might want to follow a similar path. X11 is also no longer developed and is only kept alive with some patches, whereas Wayland is quite active and almost ready to place of Xorg.

Still, it's a quite risky move, as there are still blockers to using Wayland with Plasma. The developers expect all blockers to be addressed by the time 6 is released, but there's no clear timeline nor guarantee that it will happen. If it does, though, it will be interesting to see if Wayland will, indeed, be able to cover all usecases of X11 users without creating big enough issues to make them switch away from Fedora.

## New report on MAUI apps progress

![](images/image-28.png)

MAUIKIT is quite an interesting toolkit to create applications based on KDE's Kirigami project. However, it focuses on great aesthetics and introduces components such as CSD. Just a few days ago, the developers published a new report on the progress done in the previous months. So, what's new?

Firstly, we now have color styles introduced specifically tailored for E-Ink and AMOLED displays. In the former case white-black colors are used, whereas black is the main color for AMOLEDs to save on battery life; The FileBrowser now supports pasting raw images and text directly into a new file, and it has been redesigned with a cleaner interface; there are new CSD button styles (basically, themes for titlebar buttons when CSD is enabled); Terminal now warns users of active processes if you try to close it, and has better touchscreen support; and so on. If you're interested, you can check out the full changelog here:

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
