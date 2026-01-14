---
title: "Terraria donates $100k to Godot, Fedora wants to drop X11, and more!"
date: "2023-09-20"
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

This week we cover three big news: the latest release of Nextcloud Hub, the great increase in donations towards the open-source game engine Godot, and all the controversy surrounding Fedora's plans to drop X11 entirely!

## Nextcloud announces Hub 6 with AI Assistant and healthy meeting culture

Nextcloud is a great open-source alternative to tools such as the Google suite; it hosts files, has calendar and to-do applications, chat-like and social services, and so on. Even better, there's a great community of third-party applications. So, what's new?

One big announcement is the Nextcloud Assistant; this is a large language model that interacts with Nextcloud, but only works locally. This means that it does not send any of your private data to anyone (especially not OpenAI, like GPT-based systems). This Assistant can summarize, re-write, and translate text in your notes; it's integrated into e-mails too, meaning you can also summarize entire threads in one click. In Nextcloud Talk (video meeting / chat application) you'll be able to ask questions during conversations in a ChatGPT-like manner. Again, all of this happens locally and no data is shared.

But this version comes with "healthy meeting culture" features too, including the ability to turn off notifications during certain times of the day, snooze emails for a certain amount of time, and warn you if the call is going on for too long. Nextcloud Talk will even display the total talking time of each participant in a call. If you're interested in more:

## Terraria developers donate $100k to Godot

If you've read last week's newsletter, you know about the disastrous announcement by Unity. Funnily enough, just two hours before that announcement Godot released a new funding system, which you can find [here](https://fund.godotengine.org/). The goal was to get - roughly - €30k/month to pay the current developers, and ideally some more to hire new ones.

The goal was met within a week and we're almost at €50k/month; the game engine received a lot of attention from last week's Unity controversy, which surely helped. In fact, some major game publishers decided to drop big recurring or one-time donations to the game engine as a direct result of Unity's announcement. An example of that is Re-Logic, the makers of Terraria, who donated $100k to Godot and will keep donating $1k/month going forward. They say:

> We unequivocally condemn and reject the recent TOS/fee changes proposed by Unity and the underhanded way they were rolled out. The flippant manner with which years of trust cultivated by Unity were cast aside for yet another way to squeeze publishers, studios, and gamers is the saddest part. That this move was wholly unnecessary pushes things into the tragedy category - a cautionary tale the industry will not soon forget.

## Fedora 40 to drop X11 entirely

In the last week or so, two wild Fedora 40 proposals appeared; the first one was about dropping x11 for the KDE Plasma variant, and the second one was about dropping it for the GNOME version as well.

As you can imagine, this created significant controversy. Even though developers consider Wayland the future, not everyone can enjoy that future yet. Many users whose use cases aren't covered by Wayland complained, such as David Revoy, one of the most famous open-source artists:

> A distro without colour management and that super limited tablet support screams to all artists, graphists and designers that they are no longer welcome in this community.

In the same thread, you can see Neal Gompa, who's very active in the Fedora project, address the criticism; if you're interested in this topic, it's also interesting to read Nate Graham's (KDE developer) article that was written as a result of that discussion:

I'll quote one of the final paragraphs:

> Fedora has always been a “leading edge” distro that pushes forward the technical state of the art on Linux by adopting new technology once it’s _mostly_ ready, thus causing it rapidly improve in a way that it otherwise would not have. Fedora was the first distro to adopt Systemd, PulseAudio, and PipeWire. It was the first to use the Plasma Wayland session by default. And now Fedora KDE wants to be the first to drop the Plasma X11 session entirely and make everyone use the Plasma Wayland session.

Of course, it's not certain that the proposal will actually go through, even though it seems likely. The release of Fedora 40 should be around April next year. Since Plasma 6 will be released in February, it seems like this version will also include the very latest major KDE release.

Finally, it's also worth noting that the XFCE project recently updated its roadmap for Wayland support. This includes choices like dropping XWayland, and using wlroots instead of libmutter as the compositor library. Some desktop components - such as the panel - have already been ported to Wayland. However, the official position on the obvious question "_When will Wayland XFCE be ready?_" doesn't sound great:

> _It is not clear yet which Xfce release will target a complete Xfce Wayland transition (or if such a transition will happen at all)._

## There's one more thing...

This is not particularly relevant, but it's still worth a laugh: did you know that Windows 11 has a **CTRL + SHIFT + ALT + WIN + L** keyboard shortcut? I find it quite funny already that such a weird shortcut exists, to be honest. Still, try to guess what it does.

Nope, you're wrong. The correct answer is: it opens LinkedIn. Yes, really.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
