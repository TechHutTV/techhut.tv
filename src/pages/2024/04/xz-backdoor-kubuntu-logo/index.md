---
title: "The Biggest Security Attack on Linux, Kubuntu New Logo, and more!"
date: "2024-04-11"
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

## We Were Extremely Close to a Linux Disaster

![GitHub - tukaani-project/xz: XZ Utils](https://opengraph.githubassets.com/8153f15961b837436d462f740e4360387e59d837b0d3b5ffb49d15df6e5ed12f/tukaani-project/xz)

Imagine if all Linux desktops and servers based on Debian, Ubuntu, or Fedora were compromised and thus remotely accessible by an organized malicious developer group, most likely linked to a foreign intelligence. Scary.

Well, it almost happened! A backdoor was recently added to the xz project, used by the vast majority of Linux distributions to compress/decompress files. The malign code managed to get through all reviews and even got to the unstable versions of Debian, Ubuntu, and Arch; it was mostly due to "unreasonable luck" that Microsoft developer Andres Freund discovered it. He reposted on Mastodon the following words by Damien Miller:

> This is the nearest of near-misses. Anyone who suggests this was any kind of success is a fool. No system caught this, it was luck and individual heroics. That's not acceptable when unauthorised access to ~every server on the internet is on the table. We need to find a way to do better.

The issue has been given a CVSS score of 10, the highest possible score. Here's what Filippo Valsorda, software and cryptography engineer, said about the attack:

> This might be the best executed supply chain attack we've seen described in the open, and it's a nightmare scenario: malicious, competent, authorized upstream in a widely used library

How could something like this have happened?

Let's give some context: "XZ" is a file format designed by developer Lasse Collin et al between 2005 and 2008. This is now a package used in pretty much any modern distribution to compress and uncompress archives; if you use macOS with homebrew, you also probably have that package. And yet, as is customary in the Open Source world, its development is severely underfunded and mostly driven by just Lasse Collin who, as we will see, seems to be occasionally overwhelmed by the work necessary to maintain it.

A couple of years ago a developer (or, a group of developers) under the name of Jia Tan starts contributing to the project. They had already done a pull request to libarchive, and their late 2021 patches seem genuine. These patches are sent to the xz-devel mailing list, and Collin merges them into the project.

Then, there's an entire social engineering attack to make sure that Jia Tan gained access to the project as quickly as possible. They sent a new patch to the xz mailing list, and then (most likely) created multiple fake accounts to pressure the maintainer to merge that patch as soon as possible. Back then he was busy and dealing with longstanding mental health issues, and thus the fake addresses started suggesting him to pass maintainership over.

This worked, and Jia Tan was soon given commit rights. They started building the foundations of the backdoor they planned for, plus some other security issues for (_maybe?_) future plans too. On the most important patch, which implemented a testing system wherein Jia Tan would put the backdoor's binary code, they decided to create yet another fake account to make it seem like it was coming from a different contributor. All of this took years, a lot of effort, and expertise.

The attack began in February when Jia Tan added the backdoor's code to the testing system of the project as a binary file. (It's normal for a compression library to have binary files for testing purposes, it's less common for them to be backdoors). The following day they tagged a new release, 5.6.0, and added some extra files to the packages (not to be found in the repository) that would trigger the backdoor when installed in deb/rpm systemd-based systems.

Then, they started using fake accounts again to pressure distributions to include this new version as soon as possible, citing new great features. However, Jia Tan's plan had an issue: the backdoor code was causing Valgrind errors. They had to fix them before distributions dug too deep and discovered the whole plan. Thus, they released a "fake" fix for the Valgrind issue (which had no effect), and also fixed the backdoor by changing the binary files (claiming that they had to be generated with a new random seed). They released a new version (5.6.1) with these new changes and started pressuring again for xz 5.6.1 to be included in Debian and Ubuntu.

Finally, on the 28th, developer Andres Freund discovered the bug. He immediately notified Debian and other distributions. Debian rolled back to xz 5.4.5, Arch Linux started building xz from Git instead of relying on the tarball, and RedHad assigned the Critical Vulnerability code of 2024-3094. The following day, Andres Freund also published his findings publicly.

There's great speculation over who exactly this "Jia Tan" might be, though most security experts seem to think they're an organized group rather than a single individual. The timezone of the commits would place them in China (working after job hours, even at 1PM), but there are theories of the real timezone being UTC+2/UTC+3, which would place them in Eastern Europe (working during job hours). As an example, the theory relies on the fact that some commits used that timezone and that Jia Tan never worked during Eastern festivities but often worked during Chinese ones. We might never know.

[https://www.wired.com/story/xz-backdoor-everything-you-need-to-know/?ref=techhut.tv](https://www.wired.com/story/xz-backdoor-everything-you-need-to-know/?ref=techhut.tv)

## Kubuntu has a Brand New Brand Identity!

I mentioned in a past newsletter that Kubuntu was having a contest for new wallpapers and a new brand guide. We now have the winners! You can see in the image above how the new logo looks compared to the old one. It's certainly a subtle redesign, but I think it's nonetheless a step forward for the project: it looks good!

I'm much less sold on the wallpapers, though. You can find all of the assets here:

[https://github.com/kubuntu-team/kubuntu-branding/?ref=techhut.tv](https://github.com/kubuntu-team/kubuntu-branding/?ref=techhut.tv)
