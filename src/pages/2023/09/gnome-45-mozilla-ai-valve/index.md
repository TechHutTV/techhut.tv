---
title: "GNOME 45 release, Mozilla.ai, and Valve contributions to Linux, and more!"
date: "2023-09-27"
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

## GNOME 45 has been released

Big week in GNOME land! The 45 release contains a lot of visual changes that had been teased at GUADEC, and some more. Firstly, we have the new activities dots indicator officially replacing the "Activities" label; this indicator represents all desktops as little dots, and the current one is a bigger pill. Clicking on them will access the usual overview.

Still on the top bar, we also now have a camera indicator that pops up whenever any application is recording you (a big privacy improvement that KDE developers are rushing to introduce too). Finally, you can now open and close the quick settings through the `Super+S` keyboard shortcut.

Search also saw many improvements; the redesign that GNOME is working on are still to be released, but we do get major performance improvements to a range of applications (Software, Clocks, Files, Calculator, ...) when they display search results.

As I previously mentioned here, GNOME 45 has a brand new image viewer application; it's "fast and clean", fully adaptive and works on mobile phones too. It can be used with touchscreen and touchpad gestures too (two finger swipes to switch between images, pinch to zoom in/out, and rotation is also supported).

The camera application also finished the incubation process and is now shipped out-of-the box. You can take still images or videos and you can review them directly within the application.

Other changes are all about the introduction of new standard (libadwaita) components that were picked up by core applications; this ensures that any new design change is consistent throughout the GNOME suite. And, wow, there's a lot to like! The sidebar component now spans the entire height of the window! I was not aware this was planned, and it simply looks gorgeous. Great job, GNOME!

Of course, there's so much more to talk about; this is what GNOME developers have been working on for months. All of that won't fit in this newsletter, so feel free to check the full release announcement here:

## Mozilla creates a new AI startup, invests $30M

In the world of Open Source, $30M is no small sum. Just to give you a rough idea of the size of this investment, it's the total donations that Thunderbird receives in 5 years, or that KDE receives in 150 years. It's thus fair to ask: what's this new mozilla.ai, and how will that sum be spent?

We don't have much information at all, right now. Firstly, Mozilla wants to help create a more ethical and safe approach to AI. The exact issues that this new startup wants to address - and how - are rather unclear. Recommendation systems seem to be a big part of it, but the blogpost simply says:

> We’ll share more on these — and what we’re building — in the coming months.

So, is that a good idea? Should Mozilla invest in "ethical" AI? I don't have an answer, but you can read the announcement and judge it yourself:

However, I do want to point out that this probably won't lessen the focus of Mozilla on its major product, Firefox. In fact, we saw a new release (118) just yesterday, finally featuring automatic translation. There's a new button in the address bar that you can click to translate the entire webpage content to your language. Other major features include: the ability to print documents on Android, ten new math CSS functions for developers, and a new math library that makes it harder for websites to fingerprint you.

## A leak shows that Microsoft would like to buy Valve

Of course, "would like to buy" is worthless if Valve does not want to be acquired by Microsoft; however, I agree with the message that Liam Dawe, author of GamingOnLinux, decided to publish along with this information:

> Microsoft, don't you dare touch Valve.

It's important to talk about this. A few days ago, an article titled "Valve Is A Wonderful Upstream Contributor To Linux & The Open-Source Community" explained why. Valve has either worked on or sponsored work - through companies like Igalia and Blue Systems - on Mesa OpenGL and Vulkan drivers, the kernel graphics driver components, the KDE Plasma desktop and applications, and so on. On top of that, Valve has developed Proton which (thanks to Wine) allows gamers to play a great amount of games directly on Linux devices. Finally, they have produced the most popular Linux device ever (the SteamDeck), which allows anyone to switch to Linux just by pressing the power button.

Would a Microsoft-owned Valve do the same? I doubt it.

This section would be seriously lacking if I didn't include a major announcement from Valve just a few days ago: a new release of SteamVR is now available, with a major UI overhaul. A new VR device is rumored to be in the works: maybe this is what's next for the company?

## KDE wants to make it easier to pay developers for bugs & features

The latest blogpost from KDE developer Nate Graham explains a bit about how funding developers work in the KDE world. I've mentioned already how Valve sponsors some developers, and other companies do the same too. KDE itself currently employs a couple of developers and other contractors (e.g. promotion, documentation, and legal stuff people). However, KDE would like to make it easier for users to directly sponsor small amounts of work; ideally, this would make it possible for more people to work on KDE, even if they're not employed.

So, hear me out, KDE users: is there anything that annoys you? Would you be willing to throw some money at it? If so, check out

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
