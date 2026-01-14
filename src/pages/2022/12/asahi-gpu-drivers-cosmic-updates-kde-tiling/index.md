---
title: "Asahi GPU Drivers, COSMIC Updates, KDE Tiling and more!"
date: "2022-12-11"
draft: false
authors:
  - "Niccolo Venerandi"
categories:
  - "News"
tags:
  - "News"
  - "Archive"
---

Welcome to the 6th edition of the TechHut Newsletter. There is some huge news this week in tech and open source!

## Asahi Linux brings Hardware Acceleration to Linux on Apple Silicon

Asahi has announced their first release of Apple Silicon GPU drivers. This project has been under work for years and has finally reached an alpha status, where it’s good enough to power “a smooth desktop experience and some games”. More specifically, this brings OpenGL 2.1 and OpenGL ES 2.0 support for all M-series.

However, there’s still room for improvement (as an example, the drivers have not passed the OpenGL ES conformance tests yet, and will not support newer 3D games). Work for OpenGL 3 is also in progress; as an example, in the video above, it’s running SuperTuxKart!

## System76 shares updates about COSMIC DE

The hardware vendor System76 has begun the very complex journey to create a new desktop environment. It was hard, at the beginning, to fully understand how much of the software stack they wanted to re-write; with time, it has became clear that they wanted to use a new toolkit for Rust, called “iced” (already in use in many open-source projects).

After this choice, it seems like they want to implement pretty much everything they need, starting from the compositor (”the part that’s responsible for making sure your application window reacts on-screen to the actions you perform within it”). The claim here is that there will be good support for fractional scaling and HiDPR, HDR; they also say that much time will be spent in making sure it works even when using NVIDIA. Keep in mind that core features of the Pop!\_OS experience, like the tiling, have to be implemented in the compositor. They also have work going on to support font rendering correctly. This is much more complex than it appears: it has to work regardless of the language, font, typeface, and so on (and it has to be quick). There’s discussion going on with the iced developers in regards on how to best address this.

Given how much work has to be done, I’d be surprised if COSMIC was ready soon; but we will get frequent updates from now on and System76 is proving that they’re capable of handling such a big task.

### Vivaldi Browser now has Mastodon Integration

A feature that Vivaldi is using to differentiate itself from other browsers is the side panel with various that could be useful whilst browsing. As an example, one of these sidebars allows for note-taking. Another sidebar element covers translation, and so on.

In the latest version of Vivaldi, there’s a new option to embed your Mastodon feed directly into the sidebar. This way, Vivaldi users can stay up to date even whilst performing another task on the main browser view (say that there’s a loading screen, as an example, or you’re watching a non-that-interesting video). Of course, you don’t have to use this if you’re not into this kind of feature, as it’s purely opt-in. It’s not the first time that the company expressed its appreciation of Mastodon; in fact, it had launched its own instance, “Vivaldi Social”.

## KDE Plasma now has Tiling Built-in

KDE Plasma now has tiling built-in; this is quite a big new feature that will be released in the next Plasma release, 5.27.

Firstly and foremost, the new feature makes sure that when you tile two windows (e.g. by dragging them to the sides of the screen) and then resize one of them, the other one is also resized so that they won’t overlap. This is an immediate out-of-the-box improvement for everyone using Kwin.

But this also adds a dedicated view, which you can trigger with a shortcut, that allows you to divide the available screen space into “window areas”; done that, drag-and-dropping a window whilst holding the shift key will make it expand automatically in the window area it’s in. This is very similar to the concept, in Windows, of “Fancy Zones”.

Finally, this will be useful for making Kwin scripting even more useful. There are currently many third-party scripts that implement some sort of tiling in KDE Plasma. Since the new tiling functionalities are exposed to the scripting API, these third parties will now be able to make use of it to make their automatic tiling even better.

[link to story](https://pointieststick.com/2022/12/02/this-week-in-kde-custom-tiling/)

## Twitter turns its back on Open Source development

Twitter heavily relies on open-source software, and that shouldn’t come as a surprise. As an example, the entire network runs on CentOS 7. Before Musk bought the company, there were active plans to help out the OS projects that Twitter relied on, with people hired to work on Bazel, Scala, Hadoop, etc. Given that CentOS 7 has its end of life on June 2024, there even was a plan to switch to CentOS Stream. The momentum was clearly in favor of making use of Open Source and giving back to the community at the same time.

Of course, this is one of the things that changed with Musk. Now, no one is left to transition to CentOS Stream, and most people working on Open Source projects are gone. That’s quite a U-turn. In the short term, this might not have any effect on Twitter: they can still use these projects as they were doing before. But this significantly changes the image of the company between the developers that maintain them (if they’re maintained at all), breaking the bond of trust that’s essential in the free software world.

## New Third-Party GNOME Project for Video Meetings

Among other changes and improvements in the GNOME world, there’s the announcement of a new third-party application that’s a client for BigBlueButton, the open-source video meetings software. This is the platform that KDE internally uses too! Its functionalities go beyond just being able to chat together, but it is a full virtual “classroom” too: you can set a slideshow (no need to share the screen) and you can freely write on the slides collaboratively. You also have a public chat and shared meeting notes.

Not all of this is available on “Meeting Point” (the name of the GNOME client) yet, but you already have the basic stuff: chat, video, etc.; with time, the remaining functionalities will likely be implemented too. So, if you need to have video meetings, or if you’re a teacher in a virtual classroom, this project might be really interesting!
