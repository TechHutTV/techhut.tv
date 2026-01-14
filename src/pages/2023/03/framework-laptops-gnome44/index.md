---
title: "New Framework laptops, GNOME 44, Wayland screen sharing, and more!"
date: "2023-03-29"
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

## Framework announces new 16" modular gaming laptop, revamps 13" one too

Framework is a hardware company that makes "modular" laptops: very easy to take apart _and_ with little blocks to attach on the sides to customize the IO of the devices. They're either sold pre-built, or in a "DIY Edition" where you have to build it yourself _and_ bring your own OS (including Linux).

So, what's new? Well, a new high-performance 16" laptop is coming, and it has an _"Expansion Bay"_: the back is detachable and allows for modular upgradeable graphics. This is all open source, meaning that mechanical drawings, 3D CAD, and electrical reference designs are available to the public. This makes it super-easy for customers or third parties to provide custom modules.

The 13" model got revamped as well: it got upgraded to the latest 13th Gen Intel Core processors, but there's now also an AMD option as well (using the Ryzen 7040 Series). The latter uses the same chassis as the Intel option but comes with DDR5 and an AMD-compatible WiFi card.

Finally, the 13" also gets a higher capacity 61Wh battery, a matte display, improved hinges and speakers, new Bezel colors, and more. If you're upgrading from an older Framework device you can simply buy the new motherboard, and Frameworks now offer a "Cooler Master Mainboard Case" to re-use the old one (e.g. as a server).

## GNOME releases version 44

And it has thumbnails in the file chooser. Yay!

This feature comes together with the grid view, which will make "selecting images" much easier. As GNOME's own announcement notes, "this has been one of the most positively received changes in our history".

Apart from this, the main focus of the release is on the redesign of various Settings pages. Firstly, there's the "Device Security" one which now tells the user if the security checks went well or not in a more understandable matter and allow to export of a full security report for the device.

The "Accessibility" section also got revamped with "over-amplification" (i.e. being able to increase the volume above 100%), shortcuts to enable accessibility features, a test area for cursor blinking settings, and a setting to make scrollbars always visible.

The redesign also included the sound settings - which are now much cleaner - and the "Mouse & Touchpad" section, which now has videos to explain what the "Scroll Direction" setting does.

Other changes in this release are: improvements to the quick settings menu (specifically to the Bluetooth section, and the new background apps section), a redesign and performance improvements in the Software application, some more Tabs settings for Files, etc.

You can check out the full changelog here:

## Cinnamon is now officially an Ubuntu Flavor

Ubuntu Cinnamon is, as you might've guessed, a derivative of Ubuntu that ships with Linux Mint''s Cinnamon desktop instead of GNOME. It is now officially part of the Ubuntu family, which comes with many practical benefits: more quality assurance, a new bug tracker, images being built daily by Canonical's infrastructure, and more. This won't have an immediate direct impact on the user experience but should improve the project in the long term. It also means, of course, that new developments in Ubuntu software (such as the new Flutter-based installer) will land in Cinnamon as well.

But this is also more than just a milestone from a practical point of view; in the announcement, the lead developer of the distro shares just how much this goal means to the project:

## KDE introduces XwaylandVideoBridge to fix XWayland screen sharing

Here's what happens when you currently try to share your screen from e.g. Discord whilst in Wayland:

That's no good, as there are no windows listed. This also applies to any "Xwayland" applications (which we can summarise as "X11 applications running in Wayland"): MS Teams, Slack, Zoom, etc.; that's a pretty big problem for those who want to switch to Wayland.

KDE Developers David Edmunson and Aleix Pol wrote "XwaylandVideoBridge" to fix that. It's an application that has to be run, and it will prompt you to ask _what_ window or screen you'd like to share. Done that, it will appear on any XWayland application to be selected. This does have a slight overhead, but it's negligible compared to the streaming of the screen itself. You can download the application right away using Flatpak; and if you're interested in the technical details you can check out the blogpost by David:

## How websites can track you through fingerprinting

When you enter Private Browsing all cookies and history is wiped; this should, in theory, give you higher anonymity on the web, especially if you use always-private browsers like Firefox Focus. However, websites are still able to identify you without having to rely on cookies at all but by using fingerprinting. The idea is simple: through the information that the browser offers to the websites (browser version, number of CPUs, screen size, video/audio codecs, OS, etc.) a unique ID is generated; surprisingly, "each user's device and browser specifications differ so much that they get a unique ID among millions".

It's easy to check this out through companies offering fingerprinting as a service, such as FingerprintJS Inc. (pictured above). If you visit their fingerprint example page, delete all cache and data, and open the website again the ID won't change. One way to avoid this, if you use Firefox, is to turn on privacy.resistFingerprinting in the about:config page. If you use Chrome/Chromium, though, there's no inbuilt protection against fingerprinting.

You can learn more about it here:

![](images/fingerprint.com.webp)

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
