---
title: "Big KDE Plasma 6 news, Firefox 113 & 114, Fly-Pie everywhere, and more!"
date: "2023-05-11"
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

## KDE sprint focused on Plasma 6

During the last week, many KDE developers attended a sprint in Germany with the goal of shaping up the next Plasma release. Now that it has finished, we have many attendees publishing their work on their personal blogs, meaning we can some insight into what happened (especially since I, Niccolò, was also there). Such a week means there are _a lot_ of new features and changes in KDE Plasma, so it's worth looking at it in a longer section than usual:

Nate Graham, as an example, talks about all the default settings that will be changed in 6 to make it a more appealing release; we will have double click by default (especially since most Plasma-based distro were already changing KDE's single-click behavior), hopefully, Wayland by default, and floating panel as well. The idea behind this last change is that it looks good and it will help Plasma differentiate itself from other OSs, design-wise. There's also a colorful change: title bar will probably be slightly tinted with the current accent color, which you can even set to be automatically picked from the wallpaper. The task switcher changed too, from the left sidebar to a centered collection of thumbnails and big icons. There are more changes, which you can check out in Nate's full post:

We also have reports from developer Kai Uwe, who spent some time improving "Itinerary", KDE's application that manages travel information and bookings; as an example, Itinerary live information now includes canceled stops and shows the reason, and the "Comfort Check-In" was also analyzed for later implementation. The dinner reservation was also in Itinerary, and Kai improved the ability to share it with others. Finally, there's now a QR scanner in the Wi-Fi applet to avoid having to write the password at all.

Developer Noah Davis instead worked on implementing "Segmented Buttons"; these are generally used to communicate mutually exclusive options, such as the "grid/list/tree" view buttons in the Dolphin file managers. However, KDE isn't making use of them as they do not exist at all in Qt, the UI toolkit. Thus, Noah implemented them for the first time directly in Qt and officially proposed them.

Finally, I haven't published any blogpost or video (yet) on what I worked on, but let me briefly summarize it. I spent half of the week re-vamping the Overview effect completely, which now integrates the grid view of desktops as well. Basically, invoking it will show all of your open windows on your desktop, and invoking it again will zoom out and show all of your desktops. This is actually similar to what GNOME does, and the design is inspired by their work as well. I spent the other half working on a completely new application to make it easier to render cool promotional videos upon release; it integrates directly in Inkscape, meaning that you can use it as a normal SVG editor and then just add keyframes and easing curves.

## What's in Firefox 113 and 114 beta

113 is the latest release of the Firefox browser, and it comes with enhanced picture-in-picture and improved security features.

Picture-In-Picture (PIP) is the ability to detach videos from their usual position on webpages and leave them floating around whilst you e.g. browse other pages. Now it's also possible to rewind back, check the video duration, and directly switch to fullscreen only using the smaller PIP representation; previously, these features were only available in the full video playback.

Other changes include a better automatical password generation, better Windows GPU sandbox, support for AV1 images, and also brings support for color functions such as lab(), lch(), oklab() in CSS (which is great news for developers).

Since we're talking Firefox, let's also take a sneak look at the next version coming up, 114. The biggest change will be a major revamp of the DNS over HTTPS functionality, previously disabled by default. Now it's running out of the box and brings three layer of protections: "Default Protection", "Increased Protection" and "Max Protection". Another big feature is "Cookie Banner Reduction" - off by default - which will try to automatically select the least amount of cookies possible on the website banner so that you don't have to. Finally, there's a new "Quick Actions" button in the Address Bar suggestions which allows you to quickly clear cookies or history, take screenshots, and so on.

Read more about it here: [https://9to5linux.com/firefox-114-beta-revamps-dns-over-https-feature-adds-cookie-banner-reduction](https://9to5linux.com/firefox-114-beta-revamps-dns-over-https-feature-adds-cookie-banner-reduction)

## A new way to customize columns in GNOME Files

There are some goodies coming in the GNOME land as well; the previous UI to select the columns was using the GtkTreeView component, which is now deprecated. Developer Corey Berla has thus written the view from scratch, which allows you to select which information to show either globally or just for the current folder. The new UI is quite pretty and simple to use, with drag handles to change the order of the information.

We also have improvements in Loupe, the image application that's currently being incubated (meaning that, if everything goes well, it should soon be used from GNOME out of the box). This week, Loupe integrated the Breakpoint libadwaita feature that was introduced just last week; basically, it means that the application can change the layout radically as soon as the width/height of the application is below a certain threshold. Now, if Loupe is used in a small device such as a phone, the properties view will adapt to it and still work flawlessly. Also, when viewing images on fullscreen, the mouse and headerbar will hide after a few seconds to let you enjoy the image fully.

Some third-party applications are reporting as well on the weekly GNOME podcast; one example is the brand new app Bavarder, which simply works as a frontend to AI chat (you can select whether you want Hugging Chat, BAI Chat, OpenAI GPT-3.5). If you use these new AI tools regularly, this app will make it easier; but I can assure you that this newsletter is still all written by a human!

## The developer of Fly-Pie announces cross-platform support

Not quite, actually; instead of bringing Fly-Pie to other desktops, the developer has decided to start the work from scratch in a cross-platform manner. In fact, the goal is to not only support Linux desktops, but Windows and (maybe) macOS.

The name of the new project is "Ken-do". In terms of features, it should look and behave roughly the same as Fly-Pie: by middle-clicking or using a certain shortcut it will create a floating circle with various options, and each option can have its own circle with sub-options. These are completely customizable. A new feature of Ken-Do will also be creating a different menu configuration depending on the application you're currently using, and it will be possible to use Ken-Do to select values (e.g. controlling the volume or screen brightness).

You can check out the project and/or sponsor its development here: [https://ko-fi.com/post/Introducing-Ken-Do-L3L7L0FQ2](https://ko-fi.com/post/Introducing-Ken-Do-L3L7L0FQ2)

## Framework shares more details on Ryzen laptop

They had already announced the new laptop in March, but we only got some more detailed information now. I won't go too in-depth, but let me mention that the specs are: Ryzen 5 7640U and Ryzen 7 7840U, with a thermal system specifically designed to keep the laptop cool, and AMD Radeon 700M / Radeon 760M as graphics cards. This also means that using an eGPU is available out of the box. Since Frameworks laptops are so flexible, it's possible to use the mainboard as a standalone computer too, using a third-party case or 3D printing your own. You can also upgrade a previous Frameworks laptop to the new mainboard, a quite an impressive achievement.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
