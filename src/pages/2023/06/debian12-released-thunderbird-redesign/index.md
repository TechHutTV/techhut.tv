---
title: "Debian 12 released, a preview of Thunderbird redesign, and more!"
date: "2023-06-15"
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

## Debian 12, codenamed "Bookworm", released

After two years of development, we have a new release of Debian. The most noticeable changes compared to the previous version are updates to all the packages; Debian 12 uses GNOME 43, the Linux kernel 6.1 (the current LTS), LibreOffice 7.4, Python 3.11, and so on. In fact, Debian 12 even includes roughly ~10k new packages, for a total of ~60k; so, not only have they been updated, but there are also many more.

In Bookworm we get a visual revamp with a new "Emereal" artwork (used as wallpaper, boot image, in the documentation, etc). Bookworm also includes many new fonts, including Google Fonts. We also have more technical changes, like GRUB no longer running os-probe by default and a new malloc implementation.

Though this is not related to the OS itself, Debian 12 is also the first version that includes non-free firmware in the installer, which should make it easier to try the distribution out. So, if you've never used Debian, this might be the best time to do that!

## Thunderbird 115 beta brings the Supernova redesign

The Thunderbird team has announced the first beta release of 115, which will bring the big Supernova redesign (and is expected to be published during July). Thus, now it's a great time to check out the (not final!) changes in the UI and provide some feedback to the developers.

Along with the interface changes, 115 also brings OpenPGP support for user-defined passphrases, signing and encryption of OpenPGP messages by default, and the ability to open the OpenPGP context menu using keyboard shortcuts.

Another feature that was anticipated in 115 is Firefox Sync (to sync the email client between devices), but the developers announced it won't make it in time for the release. Hopefully, it will be implemented in a point release sometime after July.

Oh, and it would be terrible of me not to mention - since we're talking Thunderbird - that the team has contacted the original designer of the logo to ask for a revamped version. Here's what it looks like:

## GNOME makes it easier to donate to extension developers

Though the GNOME extensions community is often praised for just how many new functionalities and customization they introduce to the main shell, all of the work done by their developers is unpaid. It's not surprising, then, that many extensions include links to donation platforms to help out with the development. GNOME wants to make that easier: you can now add PayPal/GitHub/KoFi/Patreon/BuyMeACoffee links to the metadata of your extension, and those links will directly appear on the webpage where you download it. Ideally, even clients that make it easier to download extensions could expose those links as well.

Though this is certainly a small step, being able to incentivize donations to developers is an important step in making sure more and more work is put into extensions, and I'm very happy to see this change.

## There is a strike from some StackOverflow moderators due to AI content

The introduction of ChatGPT and similar generative tools surely impacted websites like StackOverflow; not only fewer people are using them, sometimes preferring AI, but many are using them to answer existing questions. StackOverflow has recently introduced a policy that does not allow the removal of AI-generated content purely on the basis of being AI-generated. The moderators, through an open letter, claim that this will lower the quality of answers on the website and the policy makes it harder for them to do their job.

As a result of the strike, the amount of spam on StackOverflow might rise. Even SmokeDetector, a tool that automatically detects spam, has decided to join the strike, which could worsen the situation. If you're interested in hearing more about the problems behind this approach, what StackOverflow is working on, and what possible issues this strike might cause, I suggest reading the following (in-depth) article:

## VanillaOS posted a juicy update about their progress

VanillaOS is an interesting take on an immutable system; it introduces many tools to interact with system files for updates, and to create sub-systems that integrate with the main one; this allows installing packages without even touching the system files. Just a few days ago they published an in-depth article explaining the work they are doing for the next version of VanillaOS, codenamed Orchid.

Keeping it short and simple: previously system updates were handled through the package manager, which installed them in an overlay, and - if the update was successful - that overlay would get applied to the system itself. Orchid changes that approach, and instead directly downloads the target image - which follows Open Containment Initiative standard for images - and simply uses that one. This makes sure that the system is always 100% reproducible and faithful to the one that the Vanilla team tested.

There are also two tools to create sub-systems; one is called Apx and it's thought for developers. It allows to define "stacks", which are made of a base system image and a list of packages to install on top of it. You can then enter the sub-system and change it however you like – and since they integrate with VanillaOS, you have the ability to install packages through apt, dnf, pacman, or any other package manager.

The second tool is called VSO (Vanilla System Operator), and it's more similar to what users expect. Ideally, it would integrate with GNOME Software, and it allows installing packages that are either apt (in a Debian subsystem), nix, or Android (through Waydroid). This can be done through UI and the installed applications will directly integrate with the host system.

These are just a few of the changes that the VanillaOS team announced; if you're interested in this experimental project, I would recommend reading the full update:

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
