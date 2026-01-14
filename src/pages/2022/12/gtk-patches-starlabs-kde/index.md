---
title: "GTK patches, new StarLabs laptop, big Maui updates and MORE!"
date: "2022-12-03"
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

Welcome to the fifth edition of the TechHut Newsletter. Big thank you to all that has signed up. We are quickly approaching 300 subscribers! I'm glad you all are enjoying it and if you have any feedback feel free to email me directly at brandon@techhut.tv. Also, our first paid member newsletter will be out in a few weeks! With all that, here is what's happing.

### GTK looks native in MacOS with these draft patches

Paul Rouget, a former Mozilla employee, is currently working on some patches that will make GTK look amazing when used in MacOS. GTK already supports that platform, but the current look is the same that you’d find on GNOME, which won’t feel native at all to Mac users. With these patches applied, a variety of features are supported: MacOS native controls are supported (e.g. minimize, maximize, and close buttons), vibrancy’s supported (which allows for pretty translucent sidebars), the accent color is supported (meaning that it will be following the systemwide colorscheme), and the titlebar merges with the content nicely as shown in the image. Of course, dark mode is supported as well.

### KDE’s hiring a developer and has launched a Blue Friday fundraising

KDE’s now hiring a software engineer to work on its stack: Plasma, Frameworks, and so on. This is actually a first for the organization, as all previous hires were either about non-technical positions (e.g. promotion) or not directly about improving KDE’s products code-wise (e.g. documentation or packaging). All current KDE developers are either hired by third party companies to work on KDE’s products or are volunteers; this will finally change with the new hire.

At the same time, there has been the launch of the end-of-the-year fundraising campaign, aligning to Black Friday; it’s called Blue Friday, and it makes it much easier to donate to the organization. This also supports recurring donations, which were only previously allowed via the KDE “relate” project, which was rather hard to use.

https://pointieststick.com/2022/11/23/a-better-fundraising-platform

### Tool to create theme-adaptive wallpapers has been redesigned

Both GNOME and KDE Plasma support adaptive wallpapers (that change depending on whether you have a light or dark theme). Upon the introduction of this feature, though, the creation of adaptive wallpapers required some manual effort. This has been solved by the application “Dynamic Wallpaper”, which has just been redesigned. The new UI is very simple to use and fits nicely with the GNOME design guidelines. Although the application has been designed with GNOME in mind it should cover the usecases of Plasma users as well, since GNOME and Plasma use the same format to store the adaptive wallpapers.

https://www.omgubuntu.co.uk/2022/11/dynamic-wallpaper-maker-for-gnome-desktop-updated-with-new-ui

### The new StarFighter by StarLabs laptop can now be bought

StarLabs has been teasing this new laptop for months, and now it's on sale. This might easily be one of the most interesting (and expensive) Linux laptops on the market; it has super thin bezels but preserves camera quality (FHD 1080p, 60fps) by having it as a detachable component that can be stored inside the laptop itself. This is also great as far as privacy goes: having the webcam connected to the laptop only when you actually need to use it will add a layer of safety.

Not the only one, though: the laptop also comes with kill switch for Wi-Fi too. It is also remarkable that - compared to other thin-and-lights like the Dell XPS - the StarFighter preserves an amazing I/O: HDMI, 2xUSB-C, 2xUSB-A, microSD, Combo Jack. The screen is matte (anti-glare), up to 4k, with a 16:10 aspect ratio, a refresh rate of 165Hz, and super bright (600cd/m²). Similarly to the latest MacBooks, the touchpad doesn’t have physical buttons but has haptic feedback, which will make - in theory - the entire touchpad area very easy to click on. The quality of the touchpad glass is also supposed to be really good: it's named Cassidy Glass, after Cassidy James (GNOME/Elementary dev) who very positively reviewed it on a different device.

https://9to5linux.com/you-can-now-buy-the-starfighter-4k-linux-laptop-from-star-labs

### New update from Maui with new application

Maui is a project that aims to re-use KDE Frameworks to provide their own Toolkit, applications, and even desktop environment. They’ve just announced a new version, 2.2.1, which brings significant improvements to many of their existing applications: they improved the (already really good) design by allowing for more translucent components, merged the toolbars inside tabbars, and cleaned up menus. The “About” dialog also got better, by showing more information about translators and libraries used. Most importantly, they added yet another application to their (already impressive, considering how young they are) app ecosystem: Arca, to open archives files.

However, this update is much bigger than just what I summarized here; there’s also work going on in the toolkit itself and on the desktop. Maui is still a young project that might not be ready for daily use, but it’s surely moving at an impressive speed.

[https://mauikit.org/blog/maui-2-2-1-release](https://mauikit.org/blog/maui-2-2-1-release)
