---
title: "Red Hat drops LibreOffice, Mozilla AI contest winners, Reddit's Strike, and more!"
date: "2023-06-07"
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

## Mozilla awards 100.000$ in "Responsible AI" prizes

In March, Mozilla launched the "Responsible AI Channel", a one-day in-person event to build "trustworthy AI products".  This is extremely important because AI tools [currently raise privacy and copyright concerns](https://techhut.tv/ai-needs-to-deal-with-copyright-laws/). So, who won?

The top prize, $50k, was awarded to the "Sanative AI" project. The idea here is to "watermark" images through a small amount of visual noise that will make them useless upon training (as "the AI is unable to properly minimize its loss function"). Creating this watermark, which is different for each image, requires a great number of resources, and yet Sanative offers it for free through a queue. This approach has some potential issues: already uploaded images - without this watermark - can still be used for training, and AI organizations might find a way to get around the noise. However, Sanative AI is committed to improving its tool over time to remain effective.

The other two prizes ($30k and $20k respectively) were awarded to Kwanele Chat Bot and Nolano. The former is a mobile application to help victims of gender-based violence through an easy way to find local services and crisis centers, quickly contact friends and family in emergency situations, and contains step-by-step guides on laying a charge and getting a conviction (AI is used as a chatbot to help with these steps). Nolano, finally, offers "compression as a service" on top of any natural language model; this makes it possible to run the compressed models on low-end hardware such as smartphones and laptops.

All of these projects seem quite interesting and it's great that Mozilla is participating in a fair & responsible AI development.

## Red Hat drops support for LibreOffice

This has been announced by developer Matthias Clasen: LibreOffice will be dropped from future Red Hat Enterprise Linux releases, with unclear consequences for the Fedora world. This is because RHEL priorities are switching towards finishing Wayland and HDR support, color-sensitive work, and so on. These are all important goals; however, the workforce is limited, and dropping LibreOffice in RHEL was a consequence of that. The announcement concludes with:

> This also limits our ability to maintain it in future versions of Fedora.

Of course, community members would be welcome to take over maintenance, which would sidestep the above issue; however, Matthias warns that this is a sizeable block of packages that requires a significant amount of work.

If I understood this correctly, the idea is _not_ to leave the distribution without an Office suite entirely but to encourage users to install it from e.g. Flatpak. Because of this, there will be work in improving the integration with the Flatpak version of Libreoffice.

## Reddit tries to kill third-party apps, Subreddits go on a strike

And, yes, it's important. A few days ago, the maintainer of Apollo managed to talk with the Reddit staff regarding changes in the Reddit API (which currently powers all third-party Reddit apps and all Reddit bots). Much bad news was shared: Reddit wants to start charging for API usage, and the price is extremely high (Apollo would have to pay _millions_ every month). All NSFW content will also be hidden from the API, meaning both that third-party Reddits apps won't be able to show that content and that auto-moderation bots won't be able to moderate them at all, potentially resulting in a NSFW posts surge.

Because of this, moderators of a variety of subreddits have organized a strike: starting on Monday, they will be making their subreddits private (either for 48 hours or until this issue is resolved). The requests are pretty simple, and they include lowering API prices by a factor of 12-15 and keeping NSFW content in them. These are not just a few subreddits: we're talking about 18 subreddits with more than 10 _million_ users each and thousands between 100k-10M. Even Linux communities, like r/linux and r/kde, will join the strike. Something like this is completely unprecedented in Reddit history.

Even if you don't use Reddit but like Open Source, there might be some interesting consequences. Many users are taking this occasion to propose Lemmy as an alternative to Reddit. Not only it's FOSS and self-hosted, but Lemmy also integrates with ActivityPub, meaning it can interact with e.g. Mastodon. Thus, after Twitter controversies pushed that platform to the wider public, this strike seems to be doing something similar, making the open source social world stronger as time passes. The number of Lemmy tripled in the last few days and the number of monthly active users went from ~1.000 to ~4.500 within days, with no sign of stopping.

## Linux user share on Steam keeps on growing steadily

Given that the SteamDeck might be the most popular Linux computer you can currently buy, it's extremely interesting to see the effect it will have on Linux marketshare, and whether it will convince its users to also try Linux on their personal machines. Of course, it's hard to say that for certain, given that we do not have precise data; but we do have the Steam Hardware & Software Survey, tracking the user share of Linux _at least_ in the gaming world.

This is where the good news comes from: the Linux share almost doubled in the last couple of years, and it's been in steady growth since then. Even better, it's clear that this growth is happening faster and faster. We're still talking about very small percentage numbers (~1.5%, whereas MacOS is ~2.4%); however, plugging in the estimated amount of Steam users tells us that ~1.5% converts into ~2 million monthly active users (though the real number is probably much higher).

Finally, we have that roughly one-third of all of these users are on SteamOS (thus, on the SteamDeck). The most popular gaming distributions according to this survey are: Arch Linux, Ubuntu, and Manjaro.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
