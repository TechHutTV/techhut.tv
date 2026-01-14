---
title: "RHEL source code controversies explained, and more!"
date: "2023-06-28"
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

## RHEL source code isn't freely available anymore

This is pretty big news, and it deserves some explanation. I will do my best to provide some context about this change and explain it truthfully, though there are currently contradicting sources of information.

A bit of history: RHEL is Red Hat's Linux distribution aimed at enterprises; its binaries are available to Red Hat's customers; some of these are paying for it, though free developer accounts also exist. When signing up for it, you have the right - guaranteed by the GPL license - to see the source code, but Red Hat disallows any form of re-sharing of that code in the agreement. This has never been important, as RHEL's code has always been open source and publicly available to everyone (customers and non-customers).

Because of that, distributions were created based on RHEL's code with "bug-to-bug compatibility". These, in practice, allowed using RHEL without becoming Red Hat customers. The most notable of these distributions CentOS, which was later (2014) adopted by Red Hat officially. In 2020, CentOS was discontinued in favor of "CentOS Stream", which however has a significant difference: instead of being based on RHEL, Stream is more of a "development version/preview" of RHEL, always rolling with the latest changes.

This made CentOS Stream unappealing to enterprise customers, which require the stability of RHEL. Thus, new distributions (AlmaLinux, Rocky Linux) quickly raised in popularity by - again - using RHEL's source code to provide a completely compatible downstream. Red Hat decided that these distributions are a "threat to open source, and one that has the potential to revert open source back into a hobbyist- and hackers-only activity**".**

They have thus decided not to make RHEL source code publicly available anymore. _However,_ the code can still be seen by Red Hat customers, including those with _free_ dev accounts; in theory, Alma/Rocky Linux developers could make an account and use it. In practice, they can't, as the agreement won't allow them to re-distribute the source code they get this way.

CentOS Stream code continues to be available for everyone, which is why Red Hat claims that they are not going closed-source. However, again, it is impossible for distributions to be based on CentOS Stream and achieve full compatibility with RHEL, since Stream is - again - more of a development preview.

Obviously, the move wasn't well received in most of the Linux community, and there is an active debate on whether Red Hat is abiding by GPL or not.

## OpenSUSE uploads new Linux parody songs

https://www.youtube.com/embed/QbM2cYuLYd0

Let's try to focus on something a bit more fun, now. OpenSUSE is known for releasing parody songs, which you can find in a playlist [here](https://www.youtube.com/playlist?list=PL6sYHytyKN2-X93TurF3JptW8qSVm0DzA). These include great classics like "Can't Stop the SUSE", "We Didn't Start the Kernel", "Uptime Funk" and many more. Luckily for us, they are still working on new songs, and we just got four new ones. The first one is "Where Open Source Grows", which you can see above this paragraph. Here are the other three:

https://www.youtube.com/embed/Z9pCb110s7M?feature=oembed
https://www.youtube.com/embed/NlFPwTytRQI?feature=oembed
https://www.youtube.com/embed/lPM_RUVahIc?feature=oembed

## Opera releases Opera One, a redesigned AI browser

Opera is working on releasing a significant update to their browser, featuring many features (including, of course, an AI assistant). By pressing Ctrl + / an overlay will appear, allowing for text input, which will be given to the AI called "Aria" (developed in collaboration with OpenAI). In theory, Aria should be able to integrate with the browser and e.g. be able to see search results, but it's yet unclear how that will work.

Other features of the release include "Tab Islands", which will visually group together all tabs that you opened by e.g. clicking the results of a certain Google search:

The interface is also more modular, meaning that it's possible to disable and enable certain components (including the above-mentioned Aria) or adjust them automatically based on the available space. If you're interested in checking out more about the new Opera, you can read here:

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
