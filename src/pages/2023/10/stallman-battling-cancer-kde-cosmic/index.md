---
title: "Stallman's health issues, KDE Plasma & COSMIC updates, and more!"
date: "2023-10-04"
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

## Richard Stallman is battling cancer

Richard Stallman has decided to share the news during the GNU Project's 40th anniversary. He released he is undergoing treatment for non-Hodgkin lymphoma; he says the prognosis is good and hopes to continue to be active in the GNU community for years to come. He wore a medical mask at the event and asked the audience to wear one too, only lowering his to show that his characteristic beard was gone too. There's not much more to say about it, Stallman is widely known in the Free Software community, and I can only hope for a full recovery.

## Plasma 6 gains new Overview, Camera indicator, and floating panels by default

Every week Nate Graham, KDE developer, publishes a nice blogpost that shares some insight on the development of Plasma; this week's is particularly juicy! I'm also proud to share that a couple of major features highlighted here were developed by me.

So, what's new? Firstly, the Overview and Desktop Grid effects were completely re-written from scratch and feature a new look that's much more similar to GNOME's; this also improves the gestures significantly, merging the two effects together (e.g. meaning you can cycle between overview and grid view with a shortcut), and the top desktop bar will switch to be a left column if you have a vertical desktops setup. By the way, there's also work ongoing (not merged yet) to implement 2D gestures; this means e.g. moving your fingers on the touchpad up/down will activate the overview, and left/right will switch between desktops, at the same time (a bit like the bottom handle on iOS!).

Other significant features: similar to GNOME, Plasma also has a camera indicator applet that will appear in your system tray whenever you are being recorded. Clicking on it will show all the cameras in use, if there's more than one. Lastly, floating panels were significantly re-factored: they now have shadows behind them, they don't have ugly margins around them when they de-float anymore, and applets opened from a floating panel will be floating too. With this refactor, **KDE Plasma now uses floating panels by default**!

## COSMIC desktop update: Window Snapping mode!

We also get our monthly update on the development of another desktop: COSMIC! We seem to be getting closer to a full release, since all the team is using it daily. The first big new is called "Swap mode"; we've seen in past newsletters how Pop!\_OS includes Auto-tiling, and pressing `Super+X` whilst tiled will enable this "window snapping mode". You can then use arrows to select another window on the screen, and that window will be swapped with the active one. Cool!

This month we also get text inputs, search fields and inline inputs. A lot of work was made to make sure the size and color of the above elements are consistent with the theme and user settings. We also get "Dynamic settings" a.k.a. settings you don't have to click apply, but rather they'll apply instantly. This required changes in the compositor, which also gained the ability to handle pointer gestures such as pinch-to-zoom.

After featuring its mockup for months, the system settings page for panel and dock was finally implemented too! We've seen that they can be set to light and dark mode, you can adjust size or opacity, margins, auto-hide, and so on. You can also customize the applets in each panel.

![](https://blog.system76.com/favicon.ico)

## The Arc browser introduces AI in quite an original way

Arc is a quite interesting MacOS-only proprietary browser that tries to redefine entirely how the web should be navigated; even though this might not be _that_ relevant to an audience of Free Software fans - I don't even have a Mac device to try it! - Arc is introducing some AI features that might be also integrated into other browsers soon, and they're worth talking about. So, let's get to it.

- Whenever you pin a tab in Arc, the title of the tab will be given to a LMM which will give it a shorter and more descriptive name. Same goes with downloads: instead of "3776x\_L.jpg", Arc will automatically rename the file with something more meaningful.

- If you hover a link and hold down Shift, a popup will appear with the summary of a page and a preview.

- When you search some text in a page and there are no matches, you'll be able to give the query directly to the AI, which will read the page content to answer. This means you can query the page directly for information.

What I really admire of these features is that none of them really screams "AI" (or, as it often happens lately, "I implemented AI just to have it, without really integrating it"). Instead, I can easily see myself using those features, and they all address some usecase. I particularly appreciate, as an example, the browser automatically keeping the download folder filenames descriptive. Arc did try a much heavier approach to AI, where all the interaction was through a chat-like experience, but eventually found that this was the most effective way to integrate AI.

Other browsers are trying similar approaches: SignaOS browser launched "Airis", Opera has "Aria", and Chrome and Edge seem to want to implement similar features soon. So: is this the right way to do AI? Yay or nay?

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
