---
title: "Vanilla OS release, Tokodon client, Unity, and more!"
date: "2023-01-10"
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

## A sneak peek to Unity 7.7

![](images/image.png)

New proposed sidebar look for Unity 7.7

Rudra Saraswat, the maintainer of Ubuntu Unity, has published a blogpost asking for feedback on the upcoming version of the Unity desktop. He showcased many of the changes that the update will bring, starting from a new widget system called UWidgets. This will allow adding some custom information on the desktop itself, similar to what Plasma offers too. The widgets can be written in Python and will have access to some elements of the desktop itself, such as the wallpaper and dock. Finally, all of this will be available on an online store offered by Unity itself.
Another significant change is the new look for the dash, which you can see in the picture. It's supposed to be the final appearance, though they say feedback is still welcome.
There will also be a new Welcome app written in Flutter (a very interesting choice!). The app will explain what the Unity project is and allow you to get started with it, though we don't know any details yet. Finally, the panel also gets a revamp in its looks, also covering accessibility and usability improvements to the notification section of the desktop. Unity does seem very alive!

## New release of Vanilla OS

![](images/image-1.png)

VanillaOS wallpapers.

VanillaOS is a new kind of distribution that quickly got very popular. The main features it offers are an on-demand immutable system, atomic updates, installing apps in containers, etc.
The package manager that deals with containers is called `apx`; previously, it only supported containers with the same OS as the host, Ubuntu. However, you now get the ability to quickly create, through `--aur` and `--dnf` flags, Arch Linux and Fedora systems. In both cases, the packages will be integrated with the host system.
This release also features a tool called VSO (Vanilla System Operator) that checks for the best time to download new updates in the background depending on CPU usage, battery left, and more. The changes will then be applied on the next boot through ABRoot, which will revert everything if the update goes wrong, to make sure the system is kept stable.
VanillaOS 22.10 uses Ubuntu Kinetic as a base and features GNOME 43; it also brings new wallpapers.

## Nitrux 2.6 release removes apt

Another distribution that is going in the path of installing packages through a container is Nitrux; actually, it uses the same technology as Vanilla's `apx` (that is, `distrobox`). The approach seems to be more explicit than Vanilla's, as you have to manually create the `distrobox`, install the application, and then expose it to the host system. Other recommended ways to install applications are App Images and Flatpaks.
Other changes featured in this release of Nitrux are the inclusion of the PulseAudio Equalizer and the re-organization of KDE's System Monitor. Nitrux ships with the latest version of the KDE Plasma desktop and uses MAUI applications on top of that.
It's also worth noting that Nitrux heavily customizes Plasma, in a way that's very similar to the new Maui shell. It would be no surprise if, when that desktop is more mature, KDE Plasma would be ditched entirely by the distro.

By the way, if you're interested in this project, you might also want to check out the latest report published by the Maui team. It includes all the new features and bugfixes to the application used in Nitrux; as an example, the image viewer (Pix) can now perform searches in the images with OCR, and can extract the text as well, similarly to Google Lens. There's also a new application entirely, Era, that's a clock application. Right now it's quite a barebone, but it has just been announced.

## A "Limited Edition" Linux workstation from Slimbook

Slimbook has decided to end the year by announcing a limited edition of their Kymera Ventus AMD computer, featuring AMD CPUs and black coating. This limited edition also has Tux on the front and ships with Kubuntu out of the box, though you can choose different distros too (such as Ubuntu, Linux Mint, etc).
The price starts at 1999€ for the model with: AMD Ryzen 7 7700X CPU, AMD RX Radeon 6750 XT Graphics, 16GB DDR5 RAM, and no storage.

## Purism tries to solve Linux phones camera troubles

<figure>

![](images/image-5.png)

<figcaption>

A picture taken from the Librem 5, a Linux phone.

</figcaption>

</figure>

It is no great secret that camera quality in Linux phones is not great. One of the very first applications to take pictures was "Megapixels", written in Python with GTK and currently maintained in the postmarketOS repository.
Purism has decided to fork that application into a new one, "Millipixels", bringing significant improvements; the biggest ones are the automatic focus, support for video recordings, and automatic adjustment of exposure. A lot of the quality of the image taken in mobile phones relies on post-processing by the camera application, so it's quite significant that Purism is investing in this area.
Of course, they do this because they have their own Linux phone, the Librem 5. However, according to them, it should be easy enough to port their changes onto other phones.
Another attempt at improving the situation is the `libcamera` project, an "an open source camera stack \[... which\] aims to control the complexity of embedded camera hardware by providing an intuitive API and method of separating untrusted vendor code from the open source core.".

## Switch to Mastodon with Tokodon

![](images/image-6.png)

Tokodon, a client for Mastodon (/Pleroma/Nextcloud Social), has just announced a new version. This client is part of the KDE offering, and it's developed with Kirigami. In the latest version, you'll find a complete redesign of the timeline to make it cleaner and easier to visually parse, the implementation of the search functionality (for posts, accounts, etc), the ability to see all posts that include a certain hashtag, a dedicated view with all private conversations, the ability to see and vote on polls, edit your account's information, and more.
If you were planning on switching to Mastodon and needed an application that integrates with your system style, this might be it!
