---
title: "KDE big apps update, Fairphone new phone, VanillaOS 2, and more!"
date: "2023-08-30"
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

## KDE releases Apps update, with new Merkuro app suite

KDE has released the KDE Gear 23.08, which contains updates to most KDE applications. One highlight of this release is the introduction of the "Merkuro" application suite, which will - soon - have Calendar, To-Dos, Contacts, _and_ E-Mails covered. Merkuro is actually the re-branding of the Kalendar application, which developed so quickly that it had to split into multiple applications.

Of course, there's more. Skanpage, KDE's scanning utility, now lets you change the order of scanned pages through simple drag-and-drop and allows you to quickly change brightness, contrast, gamma, and color balance. NeoChat, KDE's Matrix client, now has a map that allows you to see all users currently broadcasting their position ("great to see where your friends are!"). Tokodon, KDE's Mastodon client, has received many visual improvements (such as support for trending tags) and now allows instance owners to moderate directly from the application itself.

This release also contains an update to Kdenlive, KDE's video editor, which has new effects (_Audio Seam_ and _Audio Fade_) to hide the audio cracks that can be heard when cutting mkv files.

KWordQuiz, a flashcard-based educational application, has been pretty much rewritten from scratch in QML. Believe me: the design is miles ahead of the previous version. Of course, all of these changes were only a limited selection of the most interesting things, and you can instead go through the full list:

Kdenlive has its own changelog here:

## Fairphone announces the fifth version of its phone

Similarly to Frameworks, Fairphone isn't directly connected to the Linux world; however, the company has values that are very close to our community's, and it shows: Fairphones have historically had great support for clean Android installs and even full Linux mobile distributions. If you care about open-source, you probably want Fairphone to succeed!

Good news, then: Fairphone has just launched the fifth iteration of their phone. The device is extremely modular, as you can see above, and most components can be replaced even by inexperienced users. On top of that, the materials of the phone are ethically sourced, there's an amazing 5-year warranty, and Fairphone would like to offer support until 2033 - ten years from now. That's not insane: the company just recently stopped supporting the 2015 Fairphone 2, _seven years_ after release.

The specs are also significantly better compared to the previous versions: it has a 90hz OLED screen, dual 50-megapixel cameras, 30W fast charging, and more. Of course, all of this doesn't come for cheap: the starting price in Europe is 699€.

## VanillaOS releases the developer version of Orchid

VanillaOS is an extremely promising immutable distribution; the team has been working on the 2 (codenamed Orchid) version for quite a while, and they're now ready to share alpha builds. So, very quickly, what changed?

Firstly, the project got rid of the Ubuntu base and instead decided to switch to Debian. This is to have complete control over the release cycle and avoid the work of removing all Ubuntu packages that they did not want to be in the release. In fact, the Debian base is modular (and could technically be swapped out). The Vanilla changes are applied on top, and everything is built using VIB images (Vanilla Image Builder). In fact, all images follow OCI (Open Container Initiative) specs, which makes them quite easy to swap out if you need more customization or want to work on derivatives.

This comes with a lot of other changes under the hood; I've covered them in past newsletters, and they are all about immutability: instead of installing applications in the root partition - as one normally would - Vanilla gives you the option to have a "virtual" sub-system which exposes the installed packages as if they were actually installed; but, of course, you can rollback those sub-systems anytime and they're never able to compromise the stability of the system itself.

If you're interested in learning more about the project, check this blogpost out:

![](https://vanillaos.org/blog/article/2023-07-05/favicon.ico)

## Firefox 117 released, and some depressing facts

Good news: Mozilla has just released Firefox 117, which brings some nice features. The major one should've been playing catch-up to other browsers: Firefox could translate foreign pages automatically. The translation would've been all done locally, which is significantly better for your privacy compared to - as an example - what Chrome does. However, this feature that was in the beta release apparently did not make it into the final release; most likely, it needs some further work and polishing and will be part of the next version. Also, Firefox 117 removes the floating screen recording indicator when using Wayland: apparently, it never worked too well on other platforms as well, and they decided to remove it in favor of OS-specific indicators.

However, Firefox 117 now supports copy and paste of images in Android, there's improved CSS nesting by default, and it's possible to disable the context menu when pressing Shift+right-click. You can read more about it here:

Bad news, though: according to FOSSpost, Firefox has lost 70 million users in the last five years. Now it has roughly 176 million users, meaning that - at this rate - Firefox won't be used by anybody in just over ten years. Of course, these linear extrapolations are not actually of any use in forecasting the future, but they still help to visualize just how bad the situation for Firefox currently is. Let's keep in mind that, currently, Firefox is the only open-source web browser with its own rendering engine, Gecko, instead of just using Chromium.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
