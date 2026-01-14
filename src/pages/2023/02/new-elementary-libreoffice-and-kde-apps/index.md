---
title: "Releases for Elementary, LibreOffice, KDE Apps, and more!"
date: "2023-02-07"
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

**_Notice: This is an older newsletter; many links were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.

This last week saw major releases of various projects, featuring Elementary, LibreOffice, and the KDE Mobile Gear (which includes lots of KDE apps to be used on desktop too). Other projects, like Servo and COSMIC, published blogposts with their in-progress work and future plans.

## ElementaryOS 7 Released

One year after release 6.1, there's a new version of Elementary. Most of the changes focused on the experience of using the App Store, which improved significantly. There's a better design that gives more focus to apps' screenshots, links to resolved issues in the apps' repository (to show whether development is active), optional support for automatic updates, and better support for sideloaded apps (e.g. flatpaks).

Other applications also received redesigns; the Email client was significantly improved, Tasks added support for managing offline events (to sync when network is available), and the Files application supports single-click-to-select behavior. The Music application was completely rewritten to address user feedback; now, it works better as a tool to preview audio files quickly but is also improved for those who curate a local collection of music.

There's more than that, covering redesigned system settings pages, new settings (e.g. sunset to sunrise colorschemes), new icons, a new developer application to browse existing icons, and so on. You can check the full announcement here:

## LibreOffice 7.5 Released, with new pretty icons

LibreOffice has recently released a new major version of its suite. The easiest change to notice are the new icons, which use the apps' accent color for the entire icon background instead of just a thin outline. In the screenshot above, the first group is standard icons, the second group is for mime types (for saved files), the third one is MacOS-specific. Though design is often subjective, I think the new icons feel significantly more modern than the previous ones!

The release also brought improvements to dark mode in the form of more than 40 various bugfixes; the Start Center - which shows all of your recent documents - can now filter them by type. The "Single Toolbar" design was also re-implemented, and now supports being customized. Finally, it seems like Writer is getting initial support for machine learning translation through DeepL's API. Check out the full changelog here:

## Servo publishes a roadmap for 2023

Servo is a project that aims to build a modular and independent (open-source) web engine. It was initially developed by Mozilla and shares code with Firefox; however, the company stopped its development in 2020. In the same year, the project was transferred to the Linux Foundation. The project is now working at getting some traction back; that explains why the first two items of the roadmap are "Project Reactivation" and "Outreach".

It's surely a project that will require quite some time to be production-ready, but it could be a significant help in democratizing the web if it succeeds.

## Xfce is working hard on Wayland support

Work for the Xfce 4.20 started earlier this month with the release of the new package `libxfce4windowing`, which aims to provide Wayland support of the desktop. Then, Xfce display manager (`xfdesktop`) was ported to Wayland as well, together with the desktop's panel. It's very early work, as the release will probably be ready by the end of 2024; but, if everything goes right, that might the first release with full Wayland support. Still, the next version of Xfce is 4.19, so the development is currently happening for that version.

## Update on COSMIC DE development by System76

System76 is currently working on building its own desktop environment in Rust, called COSMIC. They have recently published a blogpost explaining what they've been working on in the last month. It's a good occasion to see what design the team is going for. As an example, segmented buttons were recently introduced. The team has also shared figma mockups of various System Settings pages that are currently in development, containing annotations and interactive elements too. Some pages are very detailed; as an example, [here](https://www.figma.com/file/142SZP1yG2d34SUdDvkaYV/COSMIC-Settings---Developer-Handoff?node-id=609%3A25719&t=w41SugcesHxrPNI0-0) you can find various mockups of the sound section of Settings.

Along these design improvements and plans, there's also more technical stuff. As an example, there's now a dynamic (OpenGL/Vulkan/Softbuffer) renderer of iced (the graphical toolkit of the new desktop). There's also improvements on text rendering, XWayland, and more:

## Plasma Mobile releases Gear 23.01 and works on Plasma Mobile 5.27

To clarify the title, Plasma Mobile applications and the actual shell have different release schedules. The Gear, of which a new version was just released, includes the applications. To get the latest changes of the actual shell we'll have to wait for the Plasma 5.27 release on the 14th of January (which will include the Desktop improvements too).

Changes in the latest Gear release include a complete redesign - even under the hood - of PlasmaTube, a KDE client for Youtube. As an example, it's now possible to have a video running whilst browsing other videos (similarly to Youtube's official application). Alligator, the RSS app, now better supports wide-screen layout (tablet/desktop) by having a three-column design. Kasts, the podcast app, was also redesigned and now has a pretty blurred header that shows the currently playing podcast; it also comes with a complete backend change, for more reliable streaming. There's a new application for EPUB viewing too, which has been developed by Carl and myself, called Arianna. It already supports adding a library and searching through books.

These are just a few changes; significant improvements also landed on AudioTube (Youtube Music Player), Neochat (Matrix Client), Tokodon (Mastodon Client), Kalc (Calculator), Spacebar (SMS/MMS app). Even better, all of these applications are available and designed both for Plasma Mobile _and_ desktop usage.
