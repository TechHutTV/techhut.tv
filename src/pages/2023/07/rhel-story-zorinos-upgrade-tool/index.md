---
title: "The RHEL story continues, a ZorinOS upgrade tool, and more!"
date: "2023-07-05"
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

## Rocky Linux searches for RHEL loophole

As covered last week, Red Hat has decided to stop publicly sharing RHEL source code, only leaving CentOS Stream. The source code can still be obtained, but only through a contract that disallows re-use.

Rocky Linux, based on RHEL, thus has to search for another place to get the sources from. The first option they have is to use UBI container images that are based on RHEL and available online; using those, it should be easy to reconstruct the source code.

Another option is through pay-per-use public cloud instances: "anyone can spin up RHEL images in the cloud and thus obtain the source code for all packages and errata". Both of these are legitimate ways to obtain the binaries.

AlmaLinux, the other main distribution based on RHEL, has also put out a statement that explains the importance of re-builds; as an example, they talk about how they enriched the upstream community and made RHEL a better product. The project is investigating the best way to publish security updates after what happened.

You can read the statements from the two projects in full, here (the titles are surprisingly similar):

## Big update for InkBox, the Open Source e-ink OS

InkBox is a Qt-based operating system used in Kobo eBook devices; a refreshing change from the vast majority of e-ink devices which are completely proprietary. The OS has just released a new major version, which has a really big changelog; it's now possible to download signed custom user applications from a dedicated GitHub repository (such as Maps, Sketch, sanki, etc). The whole interface was redesigned, and now has 'Recent books' and 'Pinned books' sections; a local library browser was even added. There's now a To-Do application to create checklists and - optionally - KDE's Qalculate application for complex mathematical calculations.

You can check the full changelog and working videos on actual devices here:

## Valve is banning games with AI Art

Due to copyright reasons. It's quite unclear what the legal ownership of assets generated with AI is, and Steam has decided to require that the developer has the right to the intellectual property of _all images_ used in the training set.

Valve has said that their goal is not to discourage the usage of AI in Steam; rather, they'd like to integrate this AI copyright check into their already-existing review policies. They say: "_our review process is a reflection of current copyright law and policies, not an added layer of our opinion_".

Of course, it won't be simple to recognize what constitutes an AI image in the future. The author of the above post has tried to re-submit the game, but editing the images manually to make them look not from AI; Steam noticed that and still rejected the attempt, but what if the developer had done that first? How would've Valve known about it?

## ZorinOS (finally!) has an Upgrade tool

This might sound pretty weird to you, but the only way to upgrade between versions of ZorinOS was to do a clean install, whipping out all of your data. However, an Upgrader tool is now available, and - understandably - articles are saying this application was "_much anticipated_" and that it's "_finally_" here.

The tool allows you to also switch between the base, Pro, and Education versions, and also to perform a minimal installation; it will prompt you to reboot the system after the update is done. There's not much else to say, except praising ZorinOS for introducing this necessary tool!

I will also quickly mention that Zorin is looking for people to help translate this now tool to other languages (see the bottom of the page):

## Meta to publish Twitter alternative soon, Fediverse compatibility's unclear

What you can see above is an email from a Meta employee to Kev Quirk, who maintains the Fossdoton instance of Mastodon. Even from other sources, it sounds like Meta is interested in interfacing Threads (that's the name of the product) with the Fediverse; however, not everybody is happy about this. As you can see, Kev preferred to decline the proposal altogether, saying that he has "_zero interest in having a conversation with Meta_".

The discussion lately has split the community: if Threads will indeed be part of the Fediverse, should Mastodon instances block it, or not? The discussion, however, might not be relevant: according to 9to5google (link below) it seems like Fediverse support won't be coming immediately; rather, the wording is "_Soon, you'll be able to follow and interact with people on other fediverse platforms_". Another detail is that you can restrict replies on a post; if you do that, the post won't be shared outside of the Threads app.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
