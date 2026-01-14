---
title: "GIMP ported to GTK3, BlendOS 2, Plasma 6 ISO, and more!"
date: "2023-04-26"
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

## GIMP has been ported to GTK3

The next major version of GIMP will be 3.0; to reach it, the team has a roadmap that tracks the changes they'd like to ship in that version. As you can guess by the version number, one of those things is switching from GTK2 to 3. The branch containing the remaining work on that front has been recently merged, completing the transition: GIMP (on the master branch) now uses GTK3, a big milestone.

So, what else is missing before being able to release 3.0? Firstly, full Wayland support: the application runs there, but it still has many bugs, especially in the window management area (think about all of GIMP's floating toolbars, for example). We're also missing improvements in color management (e.g. being able to export and import CMYK colorspace images) and a redesign of the API for scripts and plugins (currently in progress).

This means that GIMP 3.0 will still need some significant work before being ready to be published, but this week's achievement is still a significant step forward for the project.

## BlendOS 2 has been released

BlendOS is a distribution that, in a way that's quite similar to VanillaOS, "blends" together packages from different distributions (Ubuntu, Fedora, and Arch) by installing them in "boxes" whilst keeping the OS itself immutable. BlendOS supports both GNOME and Plasma desktop environments and uses an installed adapted by the one developed by CrystalOS.

The lead developer, Rudra Saraswat, has just announced the second major version of the distribution. Firstly, the distribution now supports Android applications out of the box through Waydroid and includes the F-Droid and Aurorae app stores. Support was added for Web Apps and PWAs, treated as normal desktop applications. You can also submit them to the Blend store. Support was also added for the AUR (Chaotic-AUR, specifically) and Arch packages. Finally, the distrobox component has been re-implemented using podman, though some of the existing code was preserved in the rewrite.

## The first distro to have an experimental Plasma 6 ISO is KaOS

As mentioned, the development of Plasma 6 has started; this means that the "master" branches of the KDE Plasma desktop and Frameworks, where developers are working, are now to be built with Qt6. Over time changes and fixes will be added to this branch, preparing for the release; this means that right now "Plasma 6" looks exactly like "Plasma 5.27" because we're so early in development. Usually, it's really easy to try out what the team is working on by downloading a distribution that uses packages always built from the master branch, like KDE Neon. However that is no longer true of Plasma 6, and the first distribution to offer an image that's built using Qt6 and the master branch is KaOS.

This means that the ISO is _not_ a "preview" of the next Plasma release, but rather an easy way to test the changes that will be added over time whilst KDE developers do their job. It's still quite relevant, especially for developers who want to help out with the release but can't build the latest version themselves.

The newly released KaOS version also includes various new applications, like Tokodon (KDE's Mastodon client) and the desktop application of Signal. It also comes with a revamped welcome app that allows you to directly points you to some settings you might want to change.

## Audacity releases version 3.3

The latest Audacity release covers the last seven months of development of the project, and has a good set of changes and new features; starting with a new "Shelf" filter that can be set for High-shelf or Low-shelf. More and more effects can also now be previewed before being applied to the entire audio (which could take some seconds or more). There's also a new "beats and bars" feature that turns on snapping of other clips based on their beats, making it easier to align audio to a certain music base. BPM has to be either set by the user, or an automatic third-party tool like the Vamp plugin can be used.

Various other changes include: a new ruler called Linear (dB), which goes from 0 dBFS to -∞ dBFS and better reflects the volume as shown in the recording/playback meters, a “Delete” button to the Cut/Copy/Paste toolbar, a new Time Signature toolbar that’s hidden by default in this release.

## Round of improvements to GNOME applications

In the latest "This Week In GNOME..." blogpost, we had a super big set of improvements to GNOME applications, either part of the project itself or within the Circle organization. So let's dive in! The first one is Loupe, an image viewer, which now has image printing, ICC color profile support, faster SVG rendering, and more.

Authenticator, which generates two factor authentication codes, has released a new version with "one of the biggest code cleanup we have done since the port to GTK 4 & Rust". It's also now able to export backups to FreeOTP + JSON, and importing images with QR codes.

Workbench, a GTK/GNOME technologies sandbox, also came out with a new update that makes it "fully sandboxed and now considered Safe by GNOME Software". The application is quite interesting, and allows you to e.g. immediately preview Blueprint UI files:

Then, GNOME Network Display has added support for Chromecast, which should be included in GNOME 45; there's a new application available on Flathub, called Dino, which allows for chat and video calls; there's a new version of the Tube Converter, a Youtube videos downloader, which allows setting maximum download speeds and added support for a new download backend; Denaro - money tracking application - released a new version as well with the ability to add notes to certain transactions and more.

Then, phosh (a Wayland shell for mobile devices) now has an off-by-default emergency button that appears if you long press the power button. It's off-by-default for now because they would like to get more testing before including a feature that should be extremely reliable. There's a new release of the Graphs application as well, with a complete UI redesign:

You can also now edit the plot style, save projects as single files, there's better handling of the clipboard, and more. Finally - I told you it was lots of improvements! - there's a new release of Cartridges as well, an application to launch games, that also comes with a new, super pretty design:

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
