---
title: "Ubuntu 22.10, PolyMC Collapses, Windows NVIDIA pain, and more!"
date: "2022-10-24"
draft: false
authors:
  - "Niccolo Venerandi"
categories:
  - "News"
tags:
  - "News"
  - "Archive"
---
Lots of interesting things over the last two weeks.  We have some major releases, applications going open source, some more Xbox news and more. This is our 3rd edition and thank you all so much for being a part of this. We are almost at 200 subscribers so make sure you share this with your friends!

## Ubuntu 22.10 is here!

Everybody's favorite Linux distro, Ubuntu, just came out with its new 22.10 release. The biggest feature from this release was GNOME 43, which adds things like a redesign of the control center (and looks a lot like macOS). GNOME 43 also finally adds audio input and output to the quick settings. Canonical also updated the Ubuntu system settings to the latest version based on Libadwaita instead of the settings app from GNOME 40, and Ubuntu now contains the Gtk4 version of Nautilus which is smoother, and contains much better grid and list views. Finally, Pipewire is now the default audio engine in Ubuntu which is great.

https://www.omgubuntu.co.uk/2022/08/ubuntu-22-10-release-new-features

## NVIDIA hates Windows too?

One common Linux issue is how much of a pain NVIDIA graphics cards can be on Linux. They are fine on distros like Ubuntu and Pop OS that automatically install proprietary NVIDIA drivers on first run if you have an NVIDIA GPU, however if you are on a distribution like Fedora, Debian, or OpenSUSE... good luck. Even when you do get them installed, NVIDIA drivers on Linux are still very finicky and basic things like Wayland support and dual GPU support can be very buggy. Well, I am pleased to report we are not the only ones suffering. The latest Windows 11 22H2 update has been having issues with NVIDIA's driver including frame drops, screen tearing, and other performance issues. NVIDIA did issue an emergency software update to fix it, but not all issue were fixed, with hardware reviewer Nadalina reporting that there was still micro-stuttering in games and lower 1% frame rate figures in a couple of games.

[https://www.neowin.net/news/windows-11-22h2-and-nvidia-drivers-apparently-still-refusing-to-play-nicely-together](https://www.neowin.net/news/windows-11-22h2-and-nvidia-drivers-apparently-still-refusing-to-play-nicely-together)

## Xbox Mobile Storefront

Speaking of Microsoft, for those who haven't heard, Microsoft is trying to buy Activision Blizzard. This has been a very controversial acquisition because of Activision Blizzard owning massive console selling games such as Overwatch 2, Call of Duty, and Diablo. Because of how massive this is, the UK government is investigating Microsoft for this deal, and during this investigation, we were able to discover that part of the goal of this acquisition was allow Microsoft to expand into the app store business. Yes, we may be seeing Microsoft trying to compete with the Play Store on Android. This may also explain why Microsoft was trying to defend Epic Games on it's lawsuit against Apple's App Store monopoly.

[https://www.ign.com/articles/microsoft-plans-xbox-mobile-storefront-to-rival-apple-and-google](https://www.ign.com/articles/microsoft-plans-xbox-mobile-storefront-to-rival-apple-and-google)

## PolyMC Collapses

The popular Minecraft launcher PolyMC has collapsed after the owner "LennyMcLennington" decided to kick developers of the project who were "promoting radicalist leftist queer ideology". Initially people thought that the owner had been compromised but LennyMcLennington has denied the claims with a signed PGP signature as proof. While most people are switching away from PolyMC, either as a precautionary measure, or for ideological reasons, some players are sticking with PolyMC. That said, PolyMC does still plan to continue development with the owner working to recruit new developers and debunk the rumors of PolyMC being a malware risk. That said, all of the kicked developers got together on a new fork of PolyMC dubbed "[Prism Launcher](https://github.com/PrismLauncher/PrismLauncher)". This fork only took 2 days to come out with a new release and packages for many distros and packaging formats including The AUR, Alpine Linux, NixOS, makedeb, Copr, as well as AppImage and Flathub.

[https://www.ign.com/articles/hijacking-of-popular-minecraft-launcher-by-rogue-developer-raises-malware-fears](https://www.ign.com/articles/hijacking-of-popular-minecraft-launcher-by-rogue-developer-raises-malware-fears)

## Pocket Casts goes Open Source

The popular podcast platform "Pocket Casts" recently released its mobile apps on GitHub under the Mozilla Public License. This isn't a surprise after Automattic's recent acquisition of Pocket Casts because Automattic is very friendly to open source, and owns many open source projects such as Wordpress, Jetpack, Simplenote, and WooCommerce. Wordpress is one of the biggest open source projects in the world, and Automattic CEO and Founder Matt Mullenweg is also a big fan of open source. However, that said, Pocket Casts hasn't yet open sourced their server side yet, and the desktop and web apps for it are still proprietary and under a paywall. But it is interesting to see such a popular app randomly get open sourced.

## Featured GitHub Repo: miniPaint

![](images/minipaint-1.gif)

miniPaint is an online image editor that let's you create and edit images through HTML5. It's very responsive, supports multiple layers, has many fun effects and filters, and serves as a great online alternative to programs like Microsoft Paint.

[https://github.com/viliusle/miniPaint](https://github.com/viliusle/miniPaint)
