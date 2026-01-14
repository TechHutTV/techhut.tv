---
title: "KDE Plasma 6.1 completely redesigned its Edit Mode"
date: "2024-06-22"
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

On the 18th of June KDE released Plasma 6.1; it features a **completely redesigned Edit Mode**, easier remote desktop access, persistent apps on Wayland, and **the wrong wallpaper**. You heard me right: if you update to 6.1, you will _not_ get "Reef", the wallpaper you can see in the screenshot above. Instead, you'll see the same wallpaper that 6.0 had, and it's my fault.

Let me explain that. Lately, I've been the person who mostly handled anything related to KDE wallpapers: organizing competitions, updating the images in the repositories, and more. This time around we decided to ask the previous artist to produce a new wallpaper. This took a bit of time, and the Visual Design group had feedback on that, multiple versions were made, and all of that took time. We only agreed on the final version the week before release. Due to personal reasons, I was not able to run the scripts until a few days later; by then, it was simply too late. I missed the packaging deadline for Plasma 6.1. Luckily, you can still download the wallpaper [here](https://cdn.kde.org/promo/Announcements/Plasma/6.1/Reef.png) if you like it!

Let's get to the main feature. Here's the completely new look for Plasma's Edit Mode:

![](images/editmode_small-1024x576.jpg)

As you can see, the screen will become a bit smaller; if you open any settings window (such as the widgets sidebar, or the panel settings) the desktop will move aside to make sure nothing is being covered. Not only does this look better, but it solves a variety of bug reports where the panel edit mode window would accidentally hide the top toolbar or even other panels. The experience is much, much nicer.

And 6.2 will bring more improvements, too! Me and Marco are currently working on a complete refactor of drag-and-drop for applets in Edit Mode. Previously it was impossible to move an applet from one panel to another, or even to anywhere on the desktop. We're making sure to add support for that.

![](images/fullscreen_with_apps.png)

### Plasma 6.1

Plasma 6.1 brings improvements and powerful new features to every part of your desktop

Other features of 6.1: you can now set up remote desktops within System Settings, something that will make sysadmins' lives much easier. When you boot into Wayland your previously opened applications will be restored to their previous states (though this is still a work in progress), and you can now even sync your keyboard LEDs to match the accent color of Plasma.
