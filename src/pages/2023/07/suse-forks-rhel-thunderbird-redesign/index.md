---
title: "SUSE forks RHEL, Thunderbird redesign is here, and more!"
date: "2023-07-12"
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

## SUSE forks RHEL with $10M, and Oracle heavily criticizes Red Hat too

Let's start with the former: SUSE, the company behind SUSE Linux Enterprise, has invested $10 million to create a fork of RHEL that avoids any lock-in and continues being fully open source. The plan is to contribute the project to an open-source foundation that will preserve free access over time. This is quite big news, especially given the big money commitment from SUSE; it shows that the last move from Red Hat has significantly weakened what RHEL was.

Another announcement that supports that is Oracle's. They develop Oracle Linux, which is as close as possible to RHEL in terms of support. They released a statement, titled "_Keeping Linux Open and Free - We Can't Afford Not To_" where they heavily criticize Red Hat reasoning:

> Interesting. IBM doesn’t want to continue publicly releasing RHEL source code because it has to pay its engineers? That seems odd, given that Red Hat as a successful independent open source company chose to publicly release RHEL source and pay its engineers for many years before IBM acquired Red Hat in 2019 for $34 billion. \[...\]
> Two new alternatives to RHEL have sprung up in CentOS’s place: AlmaLinux and Rocky Linux. Now, by withholding RHEL source code, IBM has directly attacked them.
> And perhaps that is the real answer to the question of why: eliminate competitors. Fewer competitors means more revenue opportunity for IBM.

They've also stated that they'll make sure that Oracle Linux continues to be as close to RHEL as possible. In fact, in a tweet, they've invited Rocky Linux and AlmaLinux to base their distributions directly on top of Oracle Linux:

<blockquote class="twitter-tweet"><p dir="ltr" lang="en">.<a href="https://twitter.com/AlmaLinux?ref_src=twsrc%5Etfw">@AlmaLinux</a>, <a href="https://twitter.com/rocky_linux?ref_src=twsrc%5Etfw">@rocky_linux</a>, what are you going to do now that IBM has closed sourced RHEL by ending public distribution of its source code? Feel free…completely free…to redistribute all the source code in Oracle Linux…for free. Keep Linux Open and Free. <a href="https://t.co/ZZXM0JHRmy">https://t.co/ZZXM0JHRmy</a> <a href="https://t.co/qf9HkXGnty">pic.twitter.com/qf9HkXGnty</a></p><p>— Oracle Linux (@OracleLinux) <a href="https://twitter.com/OracleLinux/status/1678501850868334592?ref_src=twsrc%5Etfw">July 10, 2023</a></p></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Again, it's clear that there has been a significant backfire from Red Hat decision; it's going to be interesting to see if and how they will react to any of this.

You can find SUSE and Oracle's statements here:

## Thunderbird releases version 115, with Supernova redesign

![](images/image-4.png)

The latest version of Thunderbird is quite a milestone. Firstly, it comes with a completely new logo, which you can see in the screenshot above. The design is consistent with Firefox's and the blue bird makes the letter appear like a chat bubble. Then, we have the Supernova redesign, which brings a new Card View, pictured above, inspired by mobile interfaces. The calendar was also completely redesigned to be consistent with the new style, as you can see here:

![](images/image-6.png)

Of course, you might want to roll the interface back. 115 also brings a "Density" setting directly in the main AppMenu, which is introduced in this version for the first time. There's also a unified dynamic toolbar, where "dynamic" means that the buttons will change depending on the current active view. Folders and tags were improved with eye-catching icons, and they're now more customizable. All in all, this is a major release! There are still some important features to look forward to in upcoming versions, though: Firefox Sync - which will allow to sync read emails and calendars between Thunderbird instances - and Thunderbird for mobile (based on the K9 application).

## There's a proposal to add telemetry in Fedora

Emphasis on _proposal:_ the decision is yet to be taken. The idea is to collect some data, but only on an aggregated basis. The system would be opt-out: the proposal explicitly refuses the idea of opt-in. As a result, there's a lot of discussion regarding how to keep this completely anonymous, and there would be new policies to decide exactly which data to collect in a transparent way with the community. Of course, the end goal would be to make informed design decisions instead of having to guess what users are doing.

Fedora isn't the only organization addressing this issue. KDE has recently implemented telemetry, though in a opt-in way instead of opt-out (meaning, telemetry is disabled by default). Other projects, like GNOME and Elementary, occasionally publish polls where users can state how they interact with their systems. All of these approaches have benefits and downsides; so, which one do you prefer?

## Linux reaches 3% marketshare on Statcounter, and 25% in Ukraine

![](images/image-7.png)

Let me say immediately that the fluctuation in Linux market share in a certain tracker is hardly news, though fun to look at. However, given that lots of Linux users would like this OS to be more and more popular over time, it's interesting to occasionally look at the trends and data we have.

This particular goal, 3%, has made the news since it's the first time Linux reaches it ever on Statcounter. By changing the country, however, we can see that other places have much higher Linux market shares: in India it's as high as 13.8%, growing fast from 9.2% just last month. Considering that it was around 4% last year, it would be interesting to investigate what is driving this change.

Another country where there has been a Linux spike is Ukraine; it went from 4.4% in March to 25.5% this month, which is extremely impressive (five times more popular than MacOS!). This makes me wonder whether Statcounter is reliably getting data from these countries, though I see no reason why that wouldn't be the case at least in India's context.

![](images/image-8.png)

Finally, it's worth noting that worldwide we also have ChromeOS - which is Linux-based - at around 4.1%, for a grand total of 7.1%. It will be interesting to see if these trends continue or not.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
