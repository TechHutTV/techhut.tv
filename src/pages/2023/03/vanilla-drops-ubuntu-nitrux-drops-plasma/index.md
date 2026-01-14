---
title: "VanillaOS 2.0 announced, Nitrux 2.7 released, and more!"
date: "2023-03-09"
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

This week is full of Distro news. Firstly there's the announcement of the next version of VanillaOS, which will officially drop Ubuntu to be instead based on Debian. Which, by the way, is also working on their next release, called Bookwork, and which will include Plasma 5.27. The Nitrux has released version 2.7, now offering two different flavors, ditching KDE Plasma in one of the two in favor of Maui Shell.

Oh, and there's some nice news on the next Linux Tablet from Pine64 too... like the price!

## VanillaOS 2.0 announced dropping Ubuntu

VanillaOS is an immutable distribution that was _previously_ based on Ubuntu; but now, as announced in their blog post (see below), they have decided to switch to Debian. This has many benefits:

Firstly, Debian is close to a vanilla experience; the developers did try to revert the opinionated workflow changes that Ubuntu introduces, but this proved to be quite time-consuming.
Secondly, Debian has "no strong opinion on application distribution". We've seen what Ubuntu is doing, pushing snap even in the various flavors. It seems like VanillaOS core developers do not appreciate this, and prefer to offer something less opinionated.
Finally, this gives Vanilla more flexibility in scheduling their releases instead of having to follow Ubuntu's.

There are some further changes announced too; the next version of Vanilla will ship with GNOME 44 and a 6+ kernel, as an example. The installer now has "Express" and "Advanced" options; the former is straightforward and quick, and the latter is for advanced users who want to tinker with the configs.

On a more technical side of things, they are introducing OCI in ABRoots, meaning "you will have a more stable and reliable system without compromises" because "we will have greater control over updates, with more time to test the images before a release".

Even though Vanilla is extremely new as a distro, it's already shaping up to be a very strong contender!

![](https://vanillaos.org/assets/images/favicon.ico)

## Nitrux is now offering Maui Shell as an alternative to KDE Plasma

As a quick recap, "MauiKit" is a framework to create UI that's based on KDE's own framework, "Kirigami". Many applications are made by the Maui team using their framework, and they are all part of KDE. The same team also makes a full desktop, called Maui Shell, which is instead _not_ part of KDE.

Nitrux is a distribution that's based on Debian and that uses Appimages as the main way to distribute/install applications. They've used Maui applications for a lot of time and a very customized KDE Plasma. In their latest release, 2.7, they switched to a custom kernel called "Liquorix", updated the version of KDE Plasma they ship to the latest, and also added a "Maui" variant of the distribution. This version gets rid of KDE Plasma and even Firefox, replacing them with Maui shell and the Fiery Web Browser, both implemented with MauiKit.

It's pretty clear that the Nitrux and Maui team is gradually trying to build an alternative to the existing distributions and desktops, building their own thing from scratch; it will be very interesting to see if they'll be able to pull it off!

## Debian 12 and TUXEDO OS 2 will include KDE Plasma 5.27

A main difference between Debian and Ubuntu to keep in mind when comparing the two, as we did above, is that Debian is quite conservative in what to include in its software repositories. As an example, the current Debian version ships with Plasma 5.20, which is currently _seven_ versions behind (it was released in 2020).

The good news is that the next release of Debian, called "Bookworm", will include Plasma 5.27, the very latest. Currently, Debian 12 is in soft feature freeze, meaning no big changes can be included. The hard freeze is in just a few days, on the 12th; after that, the schedule is not decided yet. The final release is expected to happen roughly mid-year.

Talking about TUXEDO OS, the hardware company released publicly the distribution that uses KDE Plasma just five months ago, and now they're back with a new release. TUXEDO OS 2 includes the latest Plasma, 5,27, and the Linux 6 kernel.  Other packages were updated as well, such as Mesa, PipeWire, and Mozilla. It does include some custom applications, like the TUXEDO Control Center, that are really meant for TUXEDO computers mainly.

## The PineTab 2, Linux Tablet, will ship in April at 149$

The PineTab 2 will be available "likely sometime in April". It's the second attempt of Pine64 at making a Linux tablet and, similarly to the first version, it comes with a detachable keyboard cover. There will be two versions: 4GB/64GB, priced at 149$, and 8GB/128GB, priced $209. Good news, the keyboard is included in the price.

The author of the Pine blogpost (which is a community-driven project) says that the tablet is "certainly the most refined PINE64-branded Linux device thus far", with a metal body and a robust glass LCD panel. Just going by the pictures the hardware quality indeed seems greatly improved compared to the previous version. The cover has a metal hinge on the back that supports the tablet vertically.

![](https://www.pine64.org/wp-content/uploads/fbrfg/apple-touch-icon.png)

## Godot 4.0 released

Godot is a free and open source 2D and 3D game engine, and it's getting quite popular as an alternative to the proprietary Unity or Unreal. The developers have been working on a new major version since four years ago, and it comes packed with (quite technical) features: a modern Vulkan renderer, a new Global Illumination engine, volumetric fog, and so on. If you're a game developer using Godot you should check out the changelog and try out the latest version (which is not yet ready for production, since it has just been released). If you're a game developer _not_ using Godot then this is probably the best time to try it out. If you're _not_ a game developer, well, maybe it's time for a career change.

**_Notice: This is an older newsletter; many links were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
