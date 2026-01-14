---
title: "Cosmic DE now has panels, BlueSky open-sourced their app, and more!"
date: "2023-05-17"
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

## The latest COSMIC DE update features panels, settings, and more

![](images/image-11.png)

The monthly update on the COSMIC desktop development is out, and it contains lots of user-facing improvements. The first big one is panels that can be freely customized; that is, you can move them around, change their size, have multiple panels, and even make them float. Similarly to KDE Plasma or XFCE, the panels contain applets that can be customized (by adding new ones, removing them, and moving them around). One main difference with Plasma is that each applet lives in its own process, meaning that the desktop would still work even if one of them were to crash. Furthermore, one unique feature is the ability to change the transparency of the panels directly from their settings. The blogpost contains lots of screenshots with different setups, so make sure to check it out if you're interested.

The blogpost also talks about settings; the various pages within it are modular, meaning that there's an API to add and remove pages; this could be used, as an example, by distributions that want to add setting pages tailored for them. More updates include work being done on HDR (which is expected to take a couple of years), new 10-bit color support (a prerequisite for HDR), and the work by the project to add accessibility functions to the Iced toolkit used throughout the desktop:

## BlueSky just open-sourced its app code

Interestingly enough, there has been a push on Twitter and Twitter-like platforms to open source their code; we have Mastodon - which is fully open source and distributed -, the Twitter algorithm, and now we also have the code of the BlueSky application. This is an important step, as it allows others to fork their code and build their own BlueSky clients or improve the existing application through Pull Requests.

It's significantly better than what Twitter did, as the algorithm code was only partially available (e.g. we do not have any kind of training set) and it was a fork frozen in time rather than the production code itself. But of course, neither project can beat the open-source nature of Mastodon, which is fully open-source and decentralized to its core.

On the other hand, this week a blogpost was released by developer _fiatjaf_ that explains the issue in the protocol used by BlueSky; the claim is that the protocol is currently completely controlled by BlueSky, and much less decentralized & open than initially claimed:

Finally, if you're interested in understanding how ActivityPub's protocol (which powers Mastodon, Pixelfed and others) work under the hood, there's this article that goes in some technical detail without being too difficult to understand:

## Over the last 6 years, Thunderbird's income grew 875%

Namely, it went from $736K to $6.4M, which is absolutely impressive. For reference, other (big!) open-source projects like Krita and KDE earn roughly $80k and $200k yearly respectively. It's clear that Thunderbird is doing something right. Firstly, they started interacting with the community much more at the end of 2021 through blogposts and newsletters. They also introduced an in-app notification kindly asking for donations, and of course, there was the release of Thunderbird 102. This allowed the project to _double_ the number of people working on the project in 2022 alone! The next big steps for the project are the Supernova release this year, but most of the refactoring and redesign work will mostly pay off in 2024, especially with the release of Thunderbird on Android (through improvements on K9 Mail).

The spending in 2022 was "just" $3.5M, and it mostly (~80%) went into personnel. Other less expensive items are administrative fees, donation processing fees, professional services, and "computer and tech".

## Microsoft will try to convince Firefox to switch to Bing by default

Mozilla currently has an active partnership with Google to make sure they use their search engine as the default; it's a quite profitable deal too, as it's rumored to earn Mozilla between $400M and $500M yearly. However, it's up to renewal in 2023 and Microsoft might want to try to convince Mozilla to switch to their search engine instead. The timing is perfect, given the spike in Bing interest raised by its integration with ChatGPT.

## Fedora won't switch from Terminal to Console anytime soon

You might not even be aware of the difference, but it's quite an interesting story. Terminal was the previous console application by GNOME; however, with the release of GNOME 42, they decided to introduce Console as a "core" application, meaning having it shipped by default as part of the desktop. However, both Fedora and Ubuntu decided that the new application is not as appealing as the one it was trying to replace, and they decided to stick with Terminal.

This is a bit of a misstep from the GNOME project:

_We messed up by adding \[Console\] to core before downstreams were comfortable with it, and at this point it has become unclear whether Console should remain in core or whether we should give up and bring back Terminal,_

Luckily, this made GNOME shape up a new formal process for evaluating applications before making them part of the _core_ set of apps_._ Of course, users can still switch between the two apps depending on which one they prefer; realistically, however, most users will instead keep the default application provided by their distribution.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
