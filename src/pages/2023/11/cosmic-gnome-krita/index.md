---
title: "COSMIC Window Arrangement, GNOME Tech Fund, and more!"
date: "2023-11-29"
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

## COSMIC's Window Arrangement And More

![Three Firefox windows have been placed atop one another. Window headers are visible and accessible for all three.](https://images.prismic.io/blog-system76/6784fce4-117c-493d-8cf8-fd711db0e9a3_image3.png?auto=compress,format&w=1536&h=864&fm=png)

We have a new update from the most exciting development saga of Linux! This month, the team has put together various smaller features or details that are required for a full-fledged desktop environment. Let's start with window arrangement. If tiling is turned off, there's now a logic that establishes where new windows will open: always near the center of the screen, offset by 48px (or multiples) from the previous window, while also keeping the top-right corner of the window header visible. You can see an example in the screenshot above. Similarly to other desktops, shortcuts to tile windows to the left/right halves of the screen should be implemented as well.

There's also great progress in the text editor development. The current features include window tabs, organizing files by project, Vim-style editing shortcuts, background change detection for new edits to your file, and color-coded syntax highlighting.

Whilst implementing the Appearance and Wallpaper system settings designs, COSMIC developers decided to introduce two new "widgets" (UI components): Dropdown and ImageButton. The former allows for advanced menus with multiple lists of options and separators between them; the latter is a rounded-border accented-outline button that can be checked like a button but it displays an image. I don't have any screenshots of it yet, and I'm not sure how to imagine it based on this description alone.

Then, some more technical details: the COSMIC audio applet now supports the MPRIS audio interface (which allows you to see track list and basic playback control), the compositor now supports custom theming and Input Method Editor to enter text using syllabaries (such as Chinese and Japanese), there's a "security context support" to prevent certain applications to access special system privileges, and XDG/DBus activation is now supported.

Finally, some nice collaboration: thanks to the efforts of Victoria (COSMIC engineer), Xaver (KDE Developer), and Joshua (a Valve contractor), HDR is in the works. There's already basic support in KDE (though it doesn't include EDID, which many games require), and COSMIC should eventually gain it too.

## GNOME's Sovereign Tech Fund development started

![](images/css.png)

I recently reported how GNOME managed to get €1M from the Sovereign Tech Fund; however, I was initially worried about how the money would be used, as the STF does have some limitations and goals to adhere to. I'm happy to report that the GNOME project decided to report weekly on the progress, and the activity is really impressive.

Firstly, Ivan Molodetskikh is improving GNOME Shell/Mutter profiling instrumentation and adding integration for a new profiler. As part of this work, he has already discovered several performance bugs which have been already either fixed or addressed in a pending merge request.

Julian Sparber and Jonas Dreßler are working on notifications, and this immediately comes with a great user-facing benefit: grouping of notifications by app is being implemented! This is going to be a great space-saver in the notification widget.

Adrian Vovk has added support for systems homed in AccountService, which is the first step towards safer encryption with a nice user experience. Georges Stavracas and Huber Figuère are improving XDG Desktop Portals, with some nice user-facing changes: it's now possible to drag and drop between sandboxed applications, a bug preventing ejection of USB flash drives has been fixed, and developer documentation has been improved.

Andy Holmes is working on improving GNOME Online Accounts (which were already one of the best in the Linux world); this includes CalDAV/CardDAV support, a port to GTK4, using the preferred browser for OAuth2, and more.

Sam Hewitt is working on fixing accessibility issues in the GNOME Shell stylesheet (which defines the look of the desktop); Joanie Diggs is improving the Orca screen reader, accessibility documentation, and more.

Finally, Jonas Dreßler is also working on hardware-accelerated screencasts and improvements in the Linux Bluetooth stack; Emmanuel Gil Peyrot is implementing session recovery from a GPU driver crash, which is a requirement for some newer graphical features that aren't well-tested on GPU drivers.

All of this is... a lot, and it manages to communicate that €1M is not an abstract number but, rather, it allows to hire multiple developers to work on core aspects of the Shell with immediate benefits to all users.

## Krita's AI Plugin beats Photoshop's Generative Fill

![release-1 3 0-img1](https://github.com/Acly/krita-ai-diffusion/assets/6485914/a4270e31-3d2a-42a7-88d1-dd900ca479b7)

Though Krita itself has no intention to add AI features to the application, the "Krita AI Diffusion" plugin has recently added a significant amount of features that make it a very appealing alternative to Photoshop's Generative Fill. On top of that, the plugin relies on Stable Diffusion, which is one of the few models that's considered somewhat "Open Source" (as in, the weight is public, and so is the training data).

So, what can it do? Firstly, you can select an area and (optionally) a prompt to generate multiple alternatives. You can also generate a full image in one go. There's also a slider that controls how much the existing image should have an impact on the result, depending on the fidelity to the original image you're looking for. You can also create a crude scribble and turn that into a full image, and it comes with an integrated upscaling tool to improve the quality. It even includes a pose editor and live painting.

The entire plugin is Open Source and runs locally on your machine; no data is sent through the Internet.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
