---
title: "KDE Plasma 5.27 & EndlessOS 5 released, Thunderbird future plans, and more!"
date: "2023-02-15"
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

**_Notice: This is an older newsletter; many links were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.

This week saw the release of KDE Plasma 5.27 and EndlessOS 5. Aside from these two, we'll cover the improvements that GNOME and Thunderbird are receiving, and also how Microsoft Bing could be threatening OpenStreetMap community model with its own map editor.

## KDE releases the last Plasma 5 version

KDE has released Plasma 5.27, the last version before Plasma 6 (which should be ready later this year). New in this release: there's a welcome application that will appear on the first boot to introduce users to how Plasma works; it also allows for some customization, e.g. turning on KUserFeedback.

Plasma 5.27 also comes with a built-in tiling system. By pressing `meta+t` you can access a tiling zones view; after spending some time customizing what these should be, dragging a window when pressing `shift` will automatically tile it to the closest window area. Ideally, this could be extended in the future via its API by third-party scripts.

System Settings are a bit cleaner out of the box with the removal of the "Highlight Changed Settings" button (now in the menubar) and of some now-unnecessary pages. Discover (KDE's app center) homepage was also redesigned to showcase popular apps (chosen dynamically).

This version also comes with a complete rewrite of the multi-monitor code. If you previously experienced bugs when using more than one display, make sure to test whether that was fixed. Various other changes can be found in the full announcement:

## EndlessOS 5.0 Stable Released

EndlessOS is an immutable distribution that comes with lots of pre-installed applications and is meant to be extremely simple to use (be it for work, or for educational purposes). It uses GNOME as a shell and the developers are also active in upstreaming changes; as an example, the performance improvements I'll mention down below in this newsletter are from this project.

The latest release updates the desktop to GNOME 41, comes with more applications in the Flatpak format to allow you to uninstall them if not needed, and uses the integrated graphic card out of the box for non-GPU-demanding applications to save battery life on laptops.

## Thunderbird shares a plan to rebuild the interface from scratch

In the planned Thunderbird 115 release of this year, a new redesign should land (named "Supernova"). In their latest blogpost, the Product Design manager explains how and why they're tackling the task. As an example, it's explained how Thunderbird is "literally a bunch of code running on top of Firefox"; and although it's useful to use many of Firefox technologies as a base (Gecko web rendered, Spidermonkey JS compiler, ...) this comes with a significant maintenance burden and code complexity. Whenever something changes upstream, anything could be break (C++ interfaces, APIs, etc) at the Thunderbird level.

In the same blogpost Thunderbird says that the project is currently sustainable with a healthy donation flow, but services are in development to increase the revenue stream. Coming up, they say, is also a blogpost that will explain how the redesign will fit nicely too with users who don't want to change their existing workflows.

## GNOME's working on better performance

In the past week, we got more insight into how GNOME is improving its performance via a blogpost by a contributor working exactly on that. The main tool is profiling, which was introduced in 2018 and is described as a "massive tsunami that took the GNOME community". The more recent progress was achieved by extending the profiling tools currently used for the Software Center; by doing that, the contributor noticed that 3 of the 3.6 seconds the app needed to display its content were due to _loading icons_.

What was going on behind the scenes is that some applications defined remote icons with incorrect/dead URLs, and the Software Center was wasting a considerable amount of time on those before timing out. Just by making that asynchronous, performance increased significantly.

Meanwhile, GNOME has also just merged a feature that allows users to see what applications are running in the background (that is, without any visible window). This is done by adding an "x apps are running in the background" indicator in the System Tray, which expands to show the app names when clicked.

## Microsoft Bing threatens OpenStreetMap, according to contributor

As a bit of context, OpenStreetMap is a collective work brought forward by lots of individual contributors in a very similar manner to Wikipedia. All of the map data is then distributed freely with a share-alike license that requires attribution. There are various editors that allow anybody to create an OSM account and contribute to the accuracy of the map data. Mid 2020, Microsoft published a website called "Bing Map Builder" that works as another editor to OSM data. This could be an interesting way to get even more people to contribute to the project, but there are various issues with it.

As an example, an important part of contributing to OSM is the ability to collaborate with other users. Bing Map Builder creates a proxy account for each user that uses random letters as username, currently does not notify users in case they receive messages, and disallows using Bing Map Builder accounts on other OpenStreetMap editors (whereas all other OSM editors are interoperable). An OSM contributor has published a very detailed blogpost to share his worries on this approach from Bing.
