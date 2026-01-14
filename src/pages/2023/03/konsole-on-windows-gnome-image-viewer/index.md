---
title: "KDE Konsole on Windows, GNOME Image Viewer improvements, and more!"
date: "2023-03-15"
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

KDE has managed to port Konsole to Windows 11, and for a good reason; A GNOME Image Viewer application has refactored image decoding, with many user-facing improvements; Meta is considering joining the Fediverse through ActivityPub: there's a lot going on! However, I'll start with a major release (2.0) of a little tool that might come extremely in handy if you have an Android device...

## You can now mirror phone audio with scrcpy

The project "scrcpy" has just released version 2.0! This little tool allows you to use your (Android) phone directly from your computer as if it was a normal window. It allows that both when the device is connected by a cable, but also if the phone in on the same network as your computer (and it works with tablets too). In some specific use cases, it can be a really handy tool!

So, what did the update bring? Well, now not only the screen is mirrored, but the audio is as well. This means that all the content playing on the phone - e.g. a Youtube video - will be played on the computer you're using scrcpy from.  The feature only works out of the box from Android 12 (and, with some care, on Android 11 too). If you'd like to get into the technical details on how this is implemented you can check out the official announcement:

## Gnome GTK4 Image Viewer gets new image decoding

"Loupe" is a Gnome application (currently in their incubator) that's written in GTK4 and has the purpose of - well - viewing images. This week the developer has managed to implement a new image decoding system, which will have a significant impact user-wise. As an example, you're now able to view SVGs and even very large files should have no performance impact on the interface (though there are still a few rendering bugs). In the future, this change will allow for support for color profiles, animated images and - potentially - sandboxed decoding.

Still this week the application also saw a new design for the thumbnail whilst drag-and-dropping, which now has stronger contrast on the background image. There's also a refactor for the scroll wheel code, rotation and pan gestures on touchscreens, plus many more fixed and improvements. It looks like the application is advancing at lightspeed!

## KDE brings Konsole to Windows

KDE just made sure that Konsole works on Windows too. You might rightfully ask: "uh, why?". A first answer, of course, is to allow even users on proprietary operating systems to try out free software applications even before making a full switch to Linux. But, most importantly, there are other KDE apps on Windows - such as Dolphin or Kate - that _embed_ Konsole widgets inside of them. Previously KDE had to use another kind of terminal view that had fewer features but worked in Windows; now, it's possible to directly integrate Konsole. This will make KDE Windows app even better and more appealing!

In other KDE news - by the way - another major feature landed: from now on whenever the Wayland crashes Qt applications won't be automatically closed. This makes sure that if you e.g. have unsaved work and Wayland dies then nothing gets lost. Work is ongoing to bring this to other toolkits as well - such as GTK - and this officially crosses off another showstopper for the KDE Wayland transition.

## Rounds of Updates for ElementaryOS

After a month from the release of ElementaryOS, there's the first round of updates which - if I understood this correctly - will be published in the next release of ElementaryOS (be it 8 or 7.1). The major focus is the Files application, which now has a menu in the headerbar. This exposes functions like "Back" and "Forward" or zoom controls, as you can see above, that the user might otherwise not know about. Even better, the undo buttons show tooltips that tell you exactly what is going to be undone.

The Network Indicator section was also redesigned and now uses a circular toggleable button instead of a list of switches. This allows for a much prettier and more compact design. It also now exposes error states and allows for more than one VPN connection at once.

Of course, there are more features and bugfixes (especially in window management). You can find the full announcement here:

## Meta is considering joining the Fediverse, somehow

Meta is currently testing - or considering - an application codenamed P92 that would be part of a decentralized text-based network. It's not the first time a major company considers this, see as an example the announcement by Jack Dorsey that Twitter would investigate a way to connect to ActivityPub. However, that has yet to happen. However things could change, given that this P92 app should, in theory, support ActivityPub (which powers the Fediverse, including Mastodon).

Tumblr also has plans to start interacting with the same protocol, according to the CEO. The idea is that you'd be able e.g. to crosspost Tumblr posts to Mastodon. Even Flickr is considering using ActivityPub.

**_Notice: This is an older newsletter; many links were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
