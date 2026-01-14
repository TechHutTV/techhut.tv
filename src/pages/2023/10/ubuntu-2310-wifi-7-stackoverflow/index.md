---
title: "Ubuntu 23.10 and Wi-Fi 7 released, StackOverflow layoffs, and more!"
date: "2023-10-18"
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

## Ubuntu 23.10 (And Derivatives) Released!

![Ubuntu Desktop 23.10: Mantic Minotaur deep dive | Ubuntu](https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_720/https://lh5.googleusercontent.com/fjlBxzwpCMT-iJCROqnyTA__AriIztX-Wh3c6Fbqn8E38Lck5FWmhYVzB0hxO84hw4GzaItTs30zvCX3fAQc1pFItzswsr1upo0voSjZwL8tIxgz7ilcU74FUZmZGWkYm-gnPFcT3cdLGhAMQYSvvu0)

Ubuntu 23.10 is finally here! The new release comes with some interesting changes, such as a completely new Flutter-based installer. On top of that, a completely new Flutter app store was also introduced. This is yet another (big!) step in Ubuntu's recently announced plan to shift its application ecosystem to Flutter, and it will be interesting to see whether it will work out or not.

The release also introduces TPM-backed full disk encryption, providing a more secure alternative to the previous LUKS-based encryption; even better, the ZFS file system support has been restored as an experimental feature. As always, this release upgrades all the external projects it relies on: GNOME is now version 45, the Linux kernel is version 6.5, Firefox 118, Thunderbird 115, and so on.

There are also some features that aren't exclusive to Ubuntu, but that they decided to turn on by default; as an example, the Tiling Assistant GNOME extension comes enabled out of the box, allowing for simple quarter tiling.

Of course, many Ubuntu derivatives also released their 23.10 version. We have Kubuntu shipping with KDE Plasma 5.27 and KDE Gear 23.08 (the very latest!). It also includes a Wayland session, which is "not supported" yet (as a reminder, KDE developers would like to switch to Wayland by default around February). There's also Lubuntu 23.10 featuring LXQt 1.3, Xubuntu 23.10 featuring Xfce 4.18, and so on.

## The next generation of Wi-Fi is here

![3D Wi-Fi symbol next to the letter 7.](images/236811_WIFI7_CVirginia_12.jpg)

Both title and picture taken from The Verge -- See link below

As a quick reminder, the last version of Wi-Fi was "6E" and it introduced a new 6GHz band to operate in addition to 2.4Ghz and 5Ghz; Wi-Fi 7 preserves that but allows for more bandwidth, bundling across bands, and more. All of this brings up the theoretical maximum Internet speed to 5.8Gbs, mostly by allowing a maximum bandwidth of 320MHz instead of 160MHz (which is only supported on the 6GHz band). As with all of the latest updates in Wi-Fi, 7 will also be backward compatible with the previous versions.

## StackOverflow lays off 28% of staff due to AI

![https://duet-cdn.vox-cdn.com/thumbor/0x0:2400x1260/828x552/filters:focal(1200x630:1201x631):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25006107/stackoverflow.png](images/stackoverflow.png)

Since AI coding tools such as GitHub Copilot or even ChatGPT were introduced to the general public, StackOverflow has steadily lost users each month, even reaching half of the traffic compared to last year. These are rough numbers, that have made it difficult for the company to be profitable. They tried to fight against AI-generated answer on the website itself, and they announced they'd start charging companies to train on its website. They even announced their own AI, called OverflowAI, that would reply directly from the StackOverflow search bar. None of this seemed to work, as SO is now laying off one-fourth of their staff. You can read more here:

## KDE brings some Accessibility features

![](images/image-1.png)

The latest "This Week in KDE" blogpost by developer Nate Graham features some nice improvements on the accessibility side. Firstly, there's now an effect that allows to color-correct the monitor based on various forms of color blindness; this will allow people affected by those sight conditions to see the colors on the monitor better. Then, the F10 shortcut now opens either the main menu or the hamburger menu; this is what happens already in Microsoft Windows and GNOME, and it allows for an easier keyboard-only navigation of the applications. Finally, Kate and KWrite now come with text-to-speech functionalities: if you have QTextToSpeech installed, you have a menu option that will read the content of a file aloud.

You can check out the full blogpost here:

## System76 announces its improvements to their Thelio computers

![System76 Thelio](https://www.phoronix.net/image.php?id=2023&image=thelio_updates)

We have some nice improvements to the Thelio line! The open hardware enclosures for Thelio received some incremental upgrades including better performance and a relocation of the front I/O ports to the top of the chassis​ (as you can see in the above photo). After launching a redesigned Thelio chassis last month, System76 unveiled new desktop options with Intel 13th Gen Core "Raptor Lake" and AMD Ryzen 7000 "Zen 4" processor options, providing more choices for those considering the System76 Thelio for their line of pre-built, Linux-focused desktops​. You can check out everything about them here:​

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
