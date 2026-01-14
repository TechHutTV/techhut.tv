---
title: "Linux is RISING, KDE updates and more!"
date: "2023-01-02"
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

Welcome to the new year! News is lighter this go around. Feel free to share with your friends! I hope you all have a great start to the year.

## Linux market share is rising!

There are more and more people using Linux daily, and we can see that in various metrics. This first one - though undoubtedly biased - is in StackOverflow's developer survey. Since they're done every year, we can use them to see the trend in Linux usage. In the past five years, it has always been around 25% (again, amongst developers, which is not representative of the general population). This year that number has skyrocketed to 40.23%. Even better, this doesn't consider people using WSL or Linux VMs.

Results of StackOverflow's developer survey about operating systems.

Secondly, we can see the impact of the SteamDeck on Valve's Steam Survey. Just a few years ago, Linux was used by 0.8% of the survey participants. For reference, macOS is currently at 2.45%. There has been a steady increase in Linux in the last few years, but November's data saw a clear increase, reaching 1.44%, a record. We're still talking about small numbers, but there's a clear improvement.
So, if you're a fan - as I am - of more and more people using Linux, this is some exciting news!

## Amongst other features, GNOME claims world domination

Actual graph from GNOME's weekly blogpost.

The last GNOME weekly blog post ends with a funny note, where GNOME claims that - after _finally_ introducing file previews in the GTK file chooser - Linux market share is now higher than any other operating system, officially making 2022 the Year Of The Linux Desktop.
Jokes aside, we have a complete redesign of the audio testing dialog in system settings:

New look for the audio testing dialog in GNOME's System Settings.

Also, there's a new component to LibAdwaita (which is a UI library that contains various "widgets" to use in GTK applications). This component is called "Banner" and looks like a Dialog with some context information.
Improvements in third-party GNOME projects include: Graph - an application to plot graphs and manipulate data, written with LibAdwaita - reaches FlatHub, we have a new version of Live Captions - to help out with accessibility -, phosh can now display emergency contact information on the lockscreen.

## KDE land: Gwenview touchpad gestures & the fundraising

The proposed new look of the renaming dialog.

These days not much is happening in KDE due to the Christmas break, but there are nonetheless some improvements. The most significant is, when using Wayland, that you can now use the pinch touchpad gesture to zoom in and out of pictures. Nowadays, this is the standard for image viewers! KDE is improving its touchpad gestures in general, and it's nice to see these improvements come to applications too.
Another improvement that's not done yet is the prettifying of batch renaming when using dolphin; you can see the new WIP in the picture above. A blogpost by developer Kai Uwe explains everything that he's working on and that he worked on in 2022.
It's also worth noting that KDE is running an end-of-the-year fundraising campaign; or should I say "was", since the goal (20.000€) was reached (which is great news for the organization!). This is particularly important since it's one of the first KDE fundraisings in recent times and comes together with the first hiring of a developer.

## The Linux Foundations aims at interoperable open map data

The Linux Foundation has teamed up with big companies like Meta, Microsoft and AWS to launch the "Overture Maps Foundation". The goal is to create interoperable open map data, in an attempt to provide some competition to Google's proprietary maps. In the organization, we can also find the Dutch mapping company TomTom.
The project seems to be rather similar to Open Street Map, a collaborative project with open data as a goal; however, it's not clear how these two will interoperate. A possible criticism of OSM that might worry big companies is that - being partly user editable - it's rather complex to assure that all the map data is indeed correct and reflects the real world.
Currently, we can only wait and see how this turns out; it does seem to be a promising project, though.

## FOSS Support for JPEG-XL increases as Darktable 4.2 is released

JPEG-XL support seems to be a controversial topic after Google decided to ditch it entirely from its Chrome/Chromium browsers. Meanwhile, the support for the file format increased in the Linux world. In August, we saw the release of Krita 5.1, which had exactly that as one of its main features. Now we do gain read and write support too in Darktable's latest version, 4.2.
Darktable is an open source and cross platform RAW image editor. Other features of this release include: read-only support for WebP images, embedded ICC profiles in exported WebP files, support for JFIF files, and more.
