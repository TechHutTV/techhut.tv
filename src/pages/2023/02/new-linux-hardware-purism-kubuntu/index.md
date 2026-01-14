---
title: "New Linux hardware from Purism and Kubuntu, and more!"
date: "2023-02-25"
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

The first big topic is new Linux hardware available in Purisms and Kubuntu Focus stores (a Lapdock kit and a new compact computer, respectively). Then, a blogpost by the maintainer of CoreJS where he says that the current state of Open Source has been widely discussed in Linux communities. Finally, Gnome and KDE shared their latest implemented new features and redesigns.

## Purisms introduces the "Lapdock Kit"

One of the main features of most Linux phone OSs is "Convergency"; the idea is that, by simply plugging your phone into a monitor, keyboard, and mouse, it should become a full desktop. Given that the phone is powerful enough to support this use case, this does seem quite appealing (in fact, Android implements a very similar feature).

Purism has decided to start selling a kit that allows you to experience convergence using a laptop shell. The "computer" you see in the above picture has no CPU nor RAM, it simply uses the phone for all of that (in fact, it's more of a docking station). The kit comes with a "Lapdock" (the laptop shell, called Nexdock 360), a mount for the phone, and a cable to connect the two. The Lapdock supports a full hinge rotation, potentially making it a tablet as well.

## Kubuntu Focus introduces the 2nd generation of the Focus NX

Kubuntu Focus is a company that sells Linux hardware with (you guessed it) Kubuntu pre-installed. Their main goal is to make sure the software is perfectly compatible with the hardware and has no issues out of the box. They have just announced their second generation of the compact Linux computer "Focus NX". This comes with 12th-generation Intel cores (12 of them), Iris Xe Graphis, and 35W TDP. Wi-Fi 6E is now supported by the computer, alongside Bluetooth 5.3. As far as ports go, you now have two Thunderbolt 4, two HDMI 2.1, and two DisplayPort 1.4 through USB-C.

## CoreJS maintainer calls for help

CoreJS is a Javascript poly filling library that's used by roughly 75% of the top 100 websites, and roughly 50% of the top 1000. It is maintained by a single person that has worked full-time on it since 2014. He was so fond of the library that he decided to leave his high-paying job to work on CoreJS purely based on donations (roughly 2.500$/mo). However, the revenue stream has decreased significantly since then (to 1700$/mo), and due to the sanctions on Russia (where he lives) he's now unable to collect most of that, with only 700$/mo remaining.

Even worse, he got into a car accident and was asked to pay (unlawfully, he claims) about 80 thousand dollars. Unable to do so, he had to live one year in prison and was only released in 2021. He tried to set up a fundraising message that would appear each time a developer would install CoreJS, however, this only brought him an additional 37$/mo and a significant amount of hate and insults from other developers.

His blog post is quite long and deep, and has been covered by many news articles and videos; at the end of it, he says that he's unable to live in this situation and either the revenue stream increases significantly or he'll have to stop working on the project.

## Gnome's doing redesigns

In their latest weekly blog post, the Gnome community has showcased a couple of redesigns that were recently completed. Firstly, we have the "Mouse & Touchpad" settings page. Now you can see animations to explain what certain settings do, it has a new design for the "Pointer Assistance" dialog, and is just prettier.

Secondly, there are improvements to the quick settings that were introduced in the latest version of Gnome. Firstly, the Bluetooth section now has an arrow that shows you all available Bluetooth connections (meaning you can pair a device even without opening settings). Secondly, each button now has a brief subtitle that tells you e.g. the current Wi-Fi network name, Bluetooth-connected device, etc. Finally, there's a new option to see the list of apps running in the background (that is, apps that do not have a window).

The Console tab section was also redesigned; you do get a "Show All Tabs" option that will, well, show a grid of previews of all open tabs. This is the default tab view when Console is used on a small size, e.g. a phone. Finally, a new feature that landed this week is a dialog in the Gnome Wi-Fi settings to display a QR code (you can just scan it to connect any other device to the same network).

## KDE Plasma 6 work has started

Given that Plasma 5.27 - the last Plasma 5 release - is out, all changes implemented from now on will be released in Plasma 6. Thus, work has started! As an example, the flatpak page of any installed application in Discover will now show a "Configure permissions..." button that will directly open Flatpak Permissions in System Settings. You can also now customize how permissions should be shown in Dolphin (options are symbolic, numeric, or both). Dolphin is also now faster at counting the size of directories (especially remote ones). Gwenview has smooth zooming, the Weather Report widget shows wind speed and humidity in the tooltip and some other small changes. You won't see any new big features as the team is currently working on fixing any regression or bug raised from the recent release.

## All Ubuntu Flavors drop Flatpaks

Ubuntu developers have decided to drop Flatpak out of the box on any Ubuntu flavor. They justify this by saying that this will "improve the out-of-the-box Ubuntu experience" by making it clearer what an "Ubuntu experience" is. Flatpak will still be offered in Ubuntu's repositories, but the users will have to install it manually to use it. This is quite a controversial choice that has sparked some discussion, especially since it affects _any_ Ubuntu flavor. It would be interesting the thoughts of the various Ubuntu flavor leads.

**_Notice: This is an older newsletter; many links were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
