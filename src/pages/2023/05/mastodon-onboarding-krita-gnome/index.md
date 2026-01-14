---
title: "Mastodon get BETTER, Krita reflects on 2022, and more!"
date: "2023-05-03"
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

## Mastodon is bringing easier onboarding, quote posts, and more

As you can see in the image above, Mastodon has decided to make it easier to join the Fediverse by suggesting mastodon.social as a default option (still allowing any custom server to be picked). This will make it easier for first-timers to join Mastodon, especially if it's the first time they try a "federated" social network; there will surely still be time for them to understand that there are various different servers and switch between them, but the first step - making an account for the first time - has to be as simple as possible if we want more and more people joining.

Meanwhile, the official Mastodon account has also confirmed that quote posts are on their way to be implemented soon. The main developer was initially skeptical of that feature, but times have changed (and lots of users asked for them to be implemented). Also coming, according to the same post, is "search and groups".

## Krita: "2023 will be a year of utter uncertainty"

Krita, KDE's open source painting program, has published a blogpost talking about how 2022 went and what they expect to happen in 2023. I found the article quite interesting and honest, describing - yes - the many achievements that Krita has reached in 2022 (as we'll see), but also talks about a complex monetary situation and developers needing a break.

At the beginning of 2022, Krita decided to stop chasing functionalities after bug reports and decided to have a meeting to decide on the most important features Krita was missing on how to address those. This resulted in some significant work being done: a rework of the brushes behind the scenes, a text object that supports SVG2 with CSS with word-wrap and all, better assistant features, a better welcome page, and so on.

However, there has been a decline in income (mostly in donations) that Krita attributes to the higher economic pressure caused by the recent events; and they say:

> If we want to continue like this, well, we will need more money, there’s no way around that. This year, 2023, will be a year of utter uncertainty.

> All in all, 2022 was, like I said, _tough_. We made amazing progress given the constraints. But it was a year that tried temper

In 2023, Krita plans to release the 5.2 version, but it might be delayed, as the developers will likely take a bit longer break after 2022.

## Fedora might get an immutable Budgie spin

Fedora is currently offering a couple of immutable spins; the most known one is **Silverblue**, which uses the GNOME desktop. A different spin is called **Kinoite** and instead uses the KDE Plasma desktop and KDE apps (also offering _unofficial_ master builds for developers). These spins are supposed to be particularly stable, less prone to bugs, and easier to test and develop on: applications (apps) and containers are kept separate from the host system, improving stability and reliability.

The latest news is the proposal to add another spin, codenamed **Fedora Onyx**, which would use the Budgie desktop; Fedora 38 already optionally comes with Budgie, as you can see above, but it would be pretty cool to have an immutable version as well

## NitruxOS also now includes Waydroid

Just after a week of BlendOS announcing the same feature, NitruxOS also now includes Waydroid of the box. This allows users using Wayland to use Android apps right out of the box with no loss in performance. Note, however, that it's also getting easier and easier to download and start using Waydroid on other distributions as well, often being just a download-package-and-go.

Other features of this release include the Maliit keyboard - which makes it easier to type on touchscreen devices - again on Wayland-only, Firefox better-handling touchscreen input, and the usage of the "_better distro kernel"_ Liquorix 6.2.13, along with the very latest KDE Plasma.

## New apps joining GNOME Incubator & Circle

Starting right away with Snapshot! The application, a camera application for desktop and mobile, was recently accepted in the GNOME incubator. These are a set of programs that are being considered for GNOME core, meaning they could be included as default applications in upcoming GNOME versions. Currently, the only other app in the Incubator is Loupe, a very actively developed image viewer I've talked about before. Snapshot has released its preview on Flathub, so you can check it out there.

Another application has also joined the GNOME Circle, a set of third-party applications that follow the GNOME design guidelines and thus receive some tools and help from GNOME directly. I'm talking about Telegraph, an application that translates between text and more code in a very simple UI. The developer is Felipe Kinoshita, who is also a KDE developer and had previously developed the same exact application, with a similar interface, using KDE's Kirigami UI library.

Of course, there's also a lot of applications getting new features and bugfixes; you can read about all the last week of progress on the GNOME side here:

## Ubuntu 23.10 will be called Mantic Minotaur

That's it. It's a great occasion to remind everyone that this version will be published on October 12th, 2023; though we are so early in development that not much else can be said. In fact, even the name won't really _mean_ anything in practice, except this is a great occasion for people like OMG Ubuntu writer Joey Sneddon to try to make some m-based jokes:

> This Machiavellian mandate may manifest as a milestone worthy of …Nope, I’m running out of words beginning with M

My take isn't significantly better:

> Majestic Mantic Minotaur materializes, marking milestone moment! Meticulously-managed, mighty modular, matchless multitasking, maximizes memory management. Mantic Minotaur maintains majestic momentum, masterfully merging man-machine milieu.

That's everything for today; May our paths cross again, manifesting more meaningful moments.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
