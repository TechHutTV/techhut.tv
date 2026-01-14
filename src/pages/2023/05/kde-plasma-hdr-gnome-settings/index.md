---
title: "RHEL Summit, KDE Plasma working on HDR, better GNOME settings, and more!"
date: "2023-05-24"
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

The Red Hat Summit is into the second to last day, KDE Plasma announces preliminary HDR support and Kubuntu will releases new Laptop. Keyboard driven browser Nyxt and GNOME settings gets updates. Fedora Budgie Onyx spin has been confirmed!

## Red Hat Summit 2023 is LIVE!

The [Red Hat Summit](https://www.redhat.com/en/summit) is taking place right now in Boston and I (Brandon Hopkins) have been super lucky to be able to attend. It has been awesome meeting like-minded lovers of open-source software. There are a bunch of booths to connect with various organizations and branches within the Red Hat company. In addition, there have been a ton of keynotes, presentations, and labs to learn and better understand RHEL, Linux, AI, automatization, and containerization. Even if you were not able to attend Red Hat has been [live streaming](https://www.youtube.com/@redhat/streams) and releasing some of the content from this summit.

Most of my time has been spent in the Community Central Theater learning about thing like [EPEL 10](https://discussion.fedoraproject.org/t/epel-10-proposal/44304) and [Podman Desktop](https://podman-desktop.io/).

## KDE Plasma introduces rough HDR support

This is quite a technical topic, but as a brief introduction: the current standard for displaying colors on monitors, called sRGB, only covers part of the spectra of visible light, and the range of brightness that it defines has an upper bound of 80 nits, significantly lower than what most monitors can do.

If you have a monitor that is able to display a wider range of colors, or has a wider brightness range (thus "High Dynamic Range", or HDR) it's not immediate to start displaying colors on it. If you try to force sRGB on it colors will look incorrect and overly saturated: they have to be mapped back to their correct position in the color space.

This means that enabling HDR will have no effect on most of your programs: the desktop, the browser, and the vast majority of applications still use sRGB and do not support (nor require) the wider color/dynamic range. However, there are games, videos and drawing applications that support HDR, meaning that the compositor has to use a different colorspace depending on what application you're using.

This is what you're seeing in the picture above: a monitor where all the content is SDR (Standard Dynamic Range) except for the video player, which is using HDR. If you can't see the difference, don't worry, it's not easy to capture it in a picture! Achieving it required changes in KDE's Wayland compositor (KWin), and developers are currently working on a new Wayland protocol to manage color profiles for different monitors. This is quite a step forward already, and if you'd like to read about the progress with (many!) more technical details, you can do it here:

Since we're already talking about KDE, there are a couple of improvements to other places of the shell too. Firstly, settings that previously used a checkbox but that apply instantly are now being ported to switches, which brings a much nicer look:

Also, pressing shift whilst scrolling on the Volume icon in the System Tray will allow you to finetune your volume; check out the whole list here:

## Third major release of the keyboard-driven browser Nyxt

After two whole years of development, Nyxt 3.0.0 is out. It's a browser "inspired by Emacs and Vim", as in: it focuses its navigation experience entirely around keyboard shortcuts. Instead of "tabs" you have "buffers", which have been completely revamped in this release for readability and aesthetics. The browser will also restore the session automatically on startup, and it will also try to guess your next command in its "execute-command" menu. It has a steep learning curve, but now there's much more documentation available and there's a Flatpak build available for easier installation (though the project is not on Flathub yet).

## Improvements across the board in GNOME Settings

Just this week, GNOME has implemented various improvements to its settings application with the goal of making them easier to understand for all users. Firstly, there's now an information popup that explains how the Automatic Login setting work; on the same page, the user name row now uses the standard "AdwEntryRow" component instead of implementing its own; in the "Sharing" page of Settings, each entry ("File Sharing", "Remote Desktop", etc.) now has a subtitle that explains how it works. There is even a new standard widget button component that displays more information, which can now be used throughout Settings.

Still in GNOME land, whenever you remove an application you can now choose whether to delete or keep the application data, depending on whether you'd just like to save some disk space or you'd prefer to be able to recover all content if you re-install the app. Also, the Document Scanner application has been ported to GTK4 and libadwaita, and it has also gained multithreaded image resize (with a ~10 fold performance improvement) and a new design for page reordering and more. Check out the full changelogs here:

## Featured: GNOME Web actually GOOD now??
GNOME Web has made some big improvements, but can it compete? The short answer is **no**. This video features the history of the browser, the development, and its current state.

## Onyx will, indeed, be the Immutable Fedora Budgie spin

I already covered this when this opportunity first arose, but now it's confirmed: the next version of Fedora (39, which should be released around mid-October) will include a spin called Onyx which will be immutable and it will use the Budgie desktop. Onyx will join the family of immutable Fedora distributions, which currently includes Silverblue (featuring GNOME) and Kinoite (featuring Plasma).

## Kubuntu Focus launches the M2 Laptop

Kubuntu Focus is a company producing high-end products featuring Kubuntu. The idea is to reach, by only choosing one distro, a much tighter integration between the OS and the machine; they install a wide range of applications out of the box, and they've all been tested by them on each setup. They also offer various guides and documentation on how to use the most common applications, and they have their own suite to manage the machine. The M2 laptop is their flagship product, starting at $1895, it has a QHD 240Hz display and a 5.4Ghz core i9-13900HX. The other specs depend on the setup you choose, but they're just as impressive. As a writer's note, I'm not sponsored by Kubuntu Focus, but I do use their NX computer as my daily driver.

**Editors Note**: I would like to thank all the new folks for signing up for the newsletter. It's awesome to see you all here. Don't forget you can also leave comments on these newsletters though our website.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
