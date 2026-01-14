---
title: "GNOME will get native Tiling, Google wants to DRM the Internet, and more!"
date: "2023-07-26"
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

This newsletter will only cover three stories, but each of them is quite interesting and took some time to research. Firstly, today is the first day of GUADEC, which is similar to last week's Akademy but for GNOME. Then, we have an API proposal to Chromium that might be quite risky for the future of the internet. Finally, we get back to the Cyber Resilience Act, which has been approved by an EU Committee. Let's get started!

## Tiling is coming to GNOME too!

Pop!\_OS has an optional auto-tiling feature, KDE Plasma has recently introduced a tiling screen, and now GNOME wants to play with this feature too! The coolest thing? Each desktop implements the concept of "tiling" in a completely different way, and it will be exciting to see each play out.

Let's step back and provide a bit of context, though. Today - June 26th - is the first day of GUADEC, which is the GNOME Users And Developers European Conference. On this first day, there has been a talk named "GNOME Design: State of the Union", where many developers shared plans for the future of GNOME design in various areas of the desktop. Tobias Bernard talked about the shell itself, with some nice features coming up. A warning, before I go on: Tobias mentioned a blogpost will be up "today or tomorrow", but there's none at the time of writing, so information might not be super-accurate.

Firstly, GNOME's team wants to bring back an activity indicator on the top left of the screen. They decided to go with something that is not only a button (which opens the activities) but also an indicator that shows the number of desktops and which one is open:

Then, the team wants to redesign the calendar that appears when you click the main clock; one of the ideas to clean it up a bit is to move the notifications to the quick settings section, similar to ChromeOS:

There would be more to talk about here (e.g.: a redesigned login screen) but let's switch to the biggest announcement. Tobias talked about some sort of "tiling" functionality. The idea behind it - see first screenshot for reference - is that windows would still preserve their "normal" size, but they would be automatically placed to be as close to the center as possible; and whenever you open a new one, the existing ones adjust to all still be as close to the center as possible.

If you instead decide to maximize something, it will open directly in a new activity/workspace; if you left/right tile, all other windows will switch to the other part of the screen. You can click on one to half-tile that to the other half of the screen. You will also be able to drag and drop a window onto a half-tiled one to switch to ¼-tiling.

It's not easy to explain through text, so I would recommend that you watch the talk from Tobias down below (it's around 4h43m into this livestream):

https://www.youtube.com/embed/WVWrllJQJ_s?feature=oembed

## Is Google trying to DRM the Internet?

https://www.youtube.com/embed/0i0Ho-x7s_U?feature=oembed

As you can see, here I simply re-used the title given by YouTuber Louis Rossmann (known for advocating for e.g. right to repair). In this video, he warns about the following GitHub repository:

This link contains a proposal to add a new API that "determines the integrity of web environments". The idea here is to make sure that the browser you are using is within a controlled and verified environment; as an example, if you're using an Android phone, you would have the Google Play application attest that you are using your Chrome browser in a "safe" Android installation. This proposal comes from Google employees, and the (claimed) goal is mainly to detect non-human traffic on websites.

Louis makes the case that this API would be terrible for users; in fact, he says "it would be the death of the internet as we know it". As an example, take this sentence from the introduction of the proposal:

This trust may assume that the client environment is honest about certain aspects of itself, keeps user data and intellectual property secure.

Emphasis on: **keeps \[...\] intellectual property secure**. The idea, thus, is that websites like Netflix or Amazon Prime (or maybe even Youtube itself?) could only display content if you are in a "trusted" web environment, to make sure their _intellectual property_ is _secure._

It's easy to see how this could raise problems. As a practical example, I own a tablet that - due to _reasons -_ doesn't have Google Play. In itself, it shouldn't be a big issue (at least, for non-Google things); but in practice, it renders the device almost useless. My biggest issue with it is that I can't watch any Netflix, Amazon Prime, and so on: they all refuse to work because apparently, my tablet isn't a "secure environment". This same mechanism, if the proposal passes through, might easily apply to websites too. Even third-party browsers like Mozilla Firefox might be forced to implement this API if big websites like Netflix decide to use it (as the unacceptable alternative is for those websites not to work on Firefox).

If you'd like to learn more about the worries of the users, you can also check out the extremely interesting YCombinator News thread:

## EU Committee approves Cyber Resilience Act (which is bad news!)

Both the above sections required quite some time to research and write, and we're heading into yet another complex one! In short, the Industry, Research, and Energy Committee of the European Union has approved the Cyber Resilience Act, which means it will now be discussed in the EU Parliament.

But what's this "Cyber Resilience Act"? Well, let me first say that the Open Source world seems to be unanimously against it: according to FOSS Force - see below - organizations that spoke against it include The Apache Software Foundation, Eclipse Foundation, GitHub, Linux Foundation, and others. Even the founder of /e/OS and Mandrake Linux has written an article named "_Will the European Cyber Resilience Act Kill Open Source Software?_" (quite a title!).

But why is it so bad? Well, the Act has been already featured in this newsletter, so I'll pick up the paragraph I had written back then:

The proposal would require software developers to guarantee the security of their products "throughout the whole life cycle", to offer a "coherent cybersecurity framework", to improve the transparency of digital security, and to "use products with digital elements securely". All of this is expected to have a compliance cost for the software developers; a cost that many Open Source projects might not be able to afford.

[Back then](https://techhut.tv/eu-act-immutable-distros/), the Act was in a "call for feedback" phase, and the Open Source Initiative was trying to convince the EU to add an exception for Open Source software. Apparently, that didn't work. Ouch.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
