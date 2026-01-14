---
title: "Microsoft is having EU regulations issues, Ubuntu 23.10 wallpaper, and more!"
date: "2023-09-06"
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

## Microsoft is having issues following European regulations

...and it's pretty funny to watch. The first issue is pushing users into Edge; currently, Windows 11 opens its own browser if you click the Windows Widgets panel or any search result, completely ignoring the default browser selection. This violates some EU regulations, as the test builds in the development channel will now use the preferred browser to open those links... as long as you like in the European Economic Area. It's likely that this happened due to the EU Digital Markets Act, which will come into effect in March 2024. You can read more about this here:

But of course, it's not just that. On top of this, Microsoft has decided to unbundle the Teams application from the Microsoft 365 suite... but only for EU markets, starting in October. Why's that? Well, we can only guess, but the European Commission did open a formal antitrust investigation regarding Microsoft's bundling of Teams in the Office productivity suite. Interestingly enough, the price of Microsoft 365 will be updated to reflect that, as you'll be able to purchase a 365 subscription without Teams: it's 2€/month less. Unsurprisingly, prices are in euros. Again, you can learn more in this other Verge article:

## We have the Ubuntu 23.10 Default Wallpaper

As a quick reminder, the codename for 23.10 is "Mantic Minotaur", which should explain the wallpaper. As always, there's not much to say about this news: it's just a new wallpaper. However, I do have to point out that the above maze that takes the shape of a minotaur is _actually_ a maze you can go ahead and solve; just make sure to use Ariadne's thread to get out.

OMGUbuntu's coverage of this also quickly mentions the difference between mazes and labyrinths, check it out:

## Heads up: GNOME 45 might break your extensions

GNOME 45 will make use of ECMAScript Modules (ESM) instead of GJS as the primary mechanisms for managing the extensions' code. This has many benefits (ECMAScript 6 is the industry standard) but raises concerns about the compatibility of extensions. If you own one, you should immediately test it on GNOME's beta to make sure it works; and if it does not, you'll have to publish a separate build for GNOME 45 (which won't work on GNOME 44 and previous versions).

## Nitrux 3.0 - codenamed "Ut" - has been released

As a quick recap if you missed a previous episode: Nitrux is a distribution based on KDE Plasma which features its own set of applications - called Maui - and is even beginning to test out a custom-made "Maui" shell. It's meant to be immutable and uses appimages and distrobox to install packages.

What's new? Firstly, it uses the very latest version of both KDE Plasma (5.27.7) and KDE Frameworks (5.108); these are the last minor versions of the 5 series, and they'll be the best KDE has to offer for quite some time. Firefox has also been updated to v117 and KWallet is now automatically unlocked at login. Of course, all the Maui applications have been updated as well and they use the latest version of the KDE-based "Mauikit" application toolkit. Interestingly enough, MauiShell is not mentioned in this release, which still uses Plasma as the main desktop.

## CutefishOS is back with a new Debian 12 release

CutefishOS is (was?) an ambitious project to create a new distribution with its own modern-looking desktop environment. A bit too ambitious maybe, as the project was discontinued last year and - later on - the team was considering resuming the work under a different name.

We now have a new beta release; it is based on Debian 12 "Bookworm" and Ubuntu 22.04 LTS. However, it looks like this is coming from a single developer, who also decided to change the name to "CutefishOS Reborn". Can the project survive with such a limited workforce? I find it unlikely, but only time will tell.

Whilst we wait, debugpointnews has published a nice review of the beta, which also describes the CutefishOS look as a whole:

## Budgie released version 10.8 with updated applets

Lots of updates from interesting projects this week! So, what's new here? Firstly, there's a new trash applet. The widget existed already as a third party item, but it was upstreamed and now it's included by default for all Budgie users to add to their panels. The Battery Status applet can now switch between Balanced / Power Saver / Performance modes (provided that your system supports that). The System Tray applet uses the modern Status Notifier specification, and the Budgie Menu also has had a menu category reorganization to be more clear.

If you're interested in the full list (with screenshots!), you can check it out here: **_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
