---
title: "Fedora 38, Proton 8, Vivaldi 6, Deepin 20.9, and more"
date: "2023-04-19"
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

This was a week packed with major releases of various projects. In this newsletter issue, I'll cover the releases from Fedora, Proton by Valve, the Vivaldi browser, Deepin (though the release is 20.9 and not 23), and digiKam (KDE's photo management application).

## Fedora 38 released, with new spins and packages

The new version of Fedora comes with new wallpaper, a website redesign, new spins, up-to-date packages and an improved desktop, and more. Let's go through all the changes; the new wallpaper is easy, as you can look at it just above this paragraph. The new website is of course not part of the OS itself, but it's still a significant visual refresh aligned with the release and that required the collaboration of different design teams and the community.

Then, we have two new official spins: "Sericea", which uses the Sway window manager on Wayland, and "Budgie", which uses the Budgie desktop environment. Finally, there's also an official Fedora 38 Phosh image, which is meant for mobile phones (Phosh is a modified Gnome shell for those types of devices). Fedora 38 Workstation now comes with Gnome 44 out of the box, with some fixes that will make sure the system shuts down faster. On the more technical side of things we have that microdnf was replaced with dnf5, which has performance improvements and a smaller memory footprint, and key programming languages have been updated to be the very latest.

## Valve releases Proton 8, the "Biggest Rebase" so far!

[Proton 8.0 is now available with many changes. Our biggest rebase to date! Note: it requires a GPU with Vulkan 1.3 support. Experimental-8.0 will follow sometime this week.](https://t.co/wzGClZyIGE)

Pierre-Loup Griffais, a Valve developer, has announced the availability of Proton 8; this comes with a long list of games that are now playable (you can go through the list in the above-embedded tweet) and various bugfixes to existing games. Many of these improvements come from the fact that Proton 8.0 uses the latest version of Wine, also coded 8.0, which is the compatibility layer that Valve uses to play non-native games on Linux (not through emulation, which would have an impact on performance, but by translating Windows API requests to POSIX calls on the fly, which should be faster).

Wine 8.0 is a major release, thus Pierre-Loup said "biggest rebase" in its tweet. Interestingly enough, some blogposts have sneakily changed that to "biggest update", a quite different claim.

## Vivaldi 6.0 released, with Workspaces and Custom Icons

Though the feature is advertised as "Custom Icons", the new release of the Vivaldi browser allows you to completely change the theme of the browser - even reaching some pretty wild customizations, such as the WindowsXP-esque one you see in the picture above. According to the announcement, the built-in theming tools make it "relatively easy" to change colors, background, and icons. The announcement contains a video that goes through the steps required to create a new theme, and it indeed looks relatively easy. You can insert the hex codes of the required colors and upload image files to be used as icons. Overall, as a KDE person, I cannot help but praise Vivaldi for the customization options they now expose.

The other big feature is Workspaces. It's a combobox on the left of your tabs that allows you to quickly switch between different "workspaces", where each workspace has its own theme and open tabs. You can go even further using the Tab Stack and Tab Tile functionalities to organize tabs _within the same workspace_ in different categories and then see a split view with different tabs. Overall, this seems like a super feature-packed web browser!

## Deepin 20.9 release as a mostly-bugfixes update

In this release-packed week, we also got a new Deepin release. Please note that the main development of Deepin is the 23 release, which is available as an alpha, and that has been in the works for quite some time. Thus, the 20.9 release is mostly about making sure that the Deepin 20 version is still up to date and contains the _very latest_ bugfixes. As an example, 20.9 upgrades the Qt toolkit to 5.18.8, which is the latest (and last) LTS release of Qt5. Many applications were also updated (log viewer, image viewer, drawing board, software package manager applications) but the announcement text mostly describes what those applications are and how to use them rather than describing what's new in this particular update.

## KDE releases new DigiKam major version

DigiKam is KDE's application to do photo management. The latest release comes with completely reworked documentation, making it the best-documented KDE application out there. You can find it at the link below, but it's also included in the app itself.

The new update has lots of features: support for raw images of many more cameras, there's a new text recognizer tool that can transcribe the text in your images (which also comes with a new language setting page to manage it), reading metadata of files has been re-worked to be more reliable, there are many improvements to the Advanced Rename tool for batch photo renaming, and so on. A highlight is the inclusion of a neural network tool that assigns a "quality" value to each image depending on the content, subject, design, colors, and so on; this is integrated into the Batch Queue Manager, allowing you to e.g. sort by this "AI quality" value. There are other major features I haven't covered, so if you need a photo management application make sure to check out the full announcement:

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
