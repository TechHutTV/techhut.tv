---
title: "Asahi Linux Project Lead Resigns, Plasma 6.3, and more!"
date: "2025-02-16"
draft: false
# url: asahi-lead-resigns-plasma-updates-and-more
authors:
  - "Niccolo Venerandi"
categories:
  - "News"
tags: 
  - "News"
  - "Gnome"
  - "KDE"
---

This week saw at least two major stories: the resignation of Hector Martin, lead of the Ashai Linux project, and the release of Plasma 6.3. We will also dedicate a bit of time to talk about some exciting developments in the GNOME world.

## KDE Plasma 6.3 released

Last Tuesday, KDE has released version 6.3 of Plasma. It's always special to talk about these releases here, as I'm a KDE developer and I sometimes get to praise my own work; I will however try to maintain by objectivity and start by saying that the slogan this time around is "It's Pixel Perfect!", and that this new version has few new major features, as it mostly focuses on maintenance and bug fixing.

One of the new goodies is panel cloning (and, as I hinted above, it was implemented by none other than myself!). The feature is simple: it allows you to copy all panel settings and applet to a new panel instance . The idea is to make it a bit easier to set up newly connected monitors, and it finally satisfies a feature request that was created five years ago.

{{< video src="images/cloning_panels_cc.webm" controls="yes" >}}
_Here's how you can clone an image [source](https://kde.org/announcements/plasma/6/6.3.0/)_

If I may indulge in a quick behind-the-scenes, panel cloning was implemented during an August 2024 vacation in the beautiful beaches of Dugi Otok. But I'm getting side-tracked: another major revamp is a complete redesign of the drawing tablets KCM (System Settings module). This only affects the few (lucky) owners and users of drawing tablets, but we should nonetheless all appreciate the gorgeous design that was the result of this work:

{{< video src="images/tablet_config_cc.webm" controls="yes" >}}
_The design of the new drawing tablet KCM [source](https://kde.org/announcements/plasma/6/6.3.0/)_

Feature-wise, the new page allows you to map an area of the drawing tablet to the entire screen, customize pen sensitivity by directly manipulating its graph, re-map all stylus and tablet buttons, and more. Thirdly, as a further gift to designers and artists, 6.3 brings a pixel grid to the zoom effect:

{{< video src="images/kwin-zoom_cc.webm" controls="yes" >}}
_The new zoom effect displays a pixel grid [source](https://kde.org/announcements/plasma/6/6.3.0/)_

Though this might not seem game-changing at first, I can assure you that it makes my job - Plasma development - easier, as often (fair enough, not _that_ often!) I have to debug off-by-one pixel alignments that are almost invisible to the naked eye.

The design of desktop applets also improves, as they are now transparent and blur the desktop behind, Kickoff does not switch categories when hovering them anymore (though there's an option to bring the old behavior back), and you can fully customize the icons used in its sidebar.

__Checkout the full announcement: [source](https://kde.org/announcements/plasma/6/6.3.0/)__

There's more to say, but if I allow myself to continue to talk about Plasma I might do so for the full newsletter (or more!). I will however stall for a further paragraph as I'd like to mention that developer Arjen has published a blogpost named _Moving KDE's styling into the future_. It contains a brief explaination of the _Union_ project, which might become the new theming engine that powers all of KDE's customization. It's a great read!

__Checkout the full blogpost: [source](https://quantumproductions.info/articles/2025-02/moving-kdes-styling-future)__

## GNOME lands triple buffering, revamps website

I shall now cover GNOME 48, even if to avoid any impartiality accusation. I'm happy to report that dynamic triple buffering has just landed and will be available in the upcoming GNOME released, version 48. I could quote here the full explaination - which, to be clear, I do _not_ understand - of what that means, but I believe this particular quote from the MR explains its significance:

> In my case this improves 4K overview animations on a basic Intel GPU from 30 FPS to 60 FPS.

Talk about a performance improvement! Work had started on this more than four years ago, and the reviewers claim that the improvements are "simply amazing". It's worth mentioning that GNOME 48 also includes "initial bits of HDR", a new default font, many improved applications and more.

__Checkout the full article: [source](https://www.phoronix.com/news/GNOME-48-Triple-Buffering)__

Since we're covering GNOME, it would be criminal not to mention the splendid work done to revamp their default website.

![](images/gnomewebsite.png)
_The new GNOME website_

There's not much to say here except that it is a significant improvement compared to the previous one; though, I only now noticed that they dropped the "foot" logo from their branding!

__Checkout the new site: [source](https://www.gnome.org/)__

## Asahi Linux project lead resigns

It is not easy to explain this news in a few paragraphs. I'll try to give some context on the fly: the Asahi Linux project lead is Hector Martin, and has been since the beginning of the project. Due to various factors, he decided to resign; though he mentioned a lack of Apple M3/M4 support thus far, and missing Thunderbolt and USB-C video out, the arguments around Rust code in the Linux kernel also played a major role.

Indeed, he has some strong words for the project and its leader:

> The issues Rust for Linux has had surviving as an upstream Linux project are well documented, so I won’t repeat them in detail here. Suffice it to say, I consider Linus’ handling of the integration of Rust into Linux a major failure of leadership.

and, later:

> When Apple released the M1, Linus Torvalds wished it could run Linux, but didn’t have much hope it would ever happen. We made it happen, and Linux 5.19 was released from an M2 MacBook Air running Asahi Linux. I had hoped his enthusiasm would translate to some support for our community and help with our upstreaming struggles. Sadly, that never came to pass. In November 2023 I sent him an invitation to discuss the challenges of kernel contributions and maintenance and see how we could help. He never replied.

This comes merely a week after Hector Martin tried to bring more attention to the situation via a Mastodon post, which was subsequently defined as "social media shaming". Linus' reply to him was somewhat heated too:

> How about you accept the fact that maybe the problem is you.

__Checkout the full article: [source](https://www.phoronix.com/news/Hector-Martin-Resigns-Asahi)__
__Also see the full resignation post: [here](https://marcan.st/2025/02/resigning-as-asahi-linux-project-lead/)__

Editors Note: Checkout the [discussions](https://www.phoronix.com/forums/forum/phoronix/general-discussion/1526426-hector-martin-resigns-from-the-asahi-linux-project) around this for various opinions and user comments. - Brandon Hopkins

