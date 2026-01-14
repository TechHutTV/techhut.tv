---
title: "System76 customization settings, KDE wallpaper contest, and more!"
date: "2023-08-16"
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

## System76 shares the plan for COSMIC customization

![](images/image-8.png)

System76 is currently working to create a new desktop environment from scratch, called COSMIC. We are receiving monthly updates on the work-in-progress, and the latest news goes in-depth about the customization options; in fact, it states that theming was a main focus for COSMIC.

We are getting an "Appearance" page in System Settings. This will allow switching between light and dark themes, and the system can also select the theme automatically depending on the time of day. We do also get the ability to pick an accent color (either from a selected list, or a color picker).

Then, the user is asked for four colors: application background, primary container background, interface text palette tint, and neutral palette tint. These are used as a basis to generate the entire colorscheme; as an example, you can see in the screenshot above an interface generated using a brown-ish neutral tint. The generation is done by switching all colors from RGB to OKLCH and manipulating color lightness whilst preserving chroma and hue.

This approach has many benefits compared to what other desktops do; as an example, GNOME does not provide any kind of colorscheme functionality out of the box; KDE Plasma does, but in order to create a new color theme you have to change the color for each element. Instead, COSMIC's approach is much easier, but still much more powerful than _no option at all_.

You will be able to select a corner radii value from three possible styles, and the spacing between elements is also customizable through a "density" setting. These, if implemented, would be quite unique settings to this desktop. Of course, the full blogpost from System76 has more information; so, if you're interested, make sure to check it out:

## KDE Plasma announces wallpaper contest for Plasma 6

![](images/image-9.png)

...and the prize is a Frameworks Laptop 13! This is the fourth wallpaper contest hosted by KDE recently, and it aims at providing wallpaper for Plasma 6. Anyone can participate and the deadline is the 14th of November.

The guidelines say that the wallpaper must be original, created for the contest, and released under the CC-BY-SA license. AI art submissions won't be accepted, even if just for the copyright requirement. The images should be at least 3k and each artist can submit up to three wallpapers.

The jury will be made up of contributors to the KDE Visual Design group, and they will select six finalists at the end of the competition. The finalists will be provided with feedback directly from the judges and they'll be able to update their wallpapers accordingly. When this is done, the best wallpaper will be selected and the author will receive the Frameworks Laptop.

If you're interested in learning more, you can check out the full announcement here:

## GNOME has a brand-new Image Viewer

![](images/image-10.png)

A better way to phrase it would be: the Loupe image viewer has been added to the set of core GNOME applications as the out-of-the-box default for GNOME 45. This is a great achievement for GNOME and something that was in progress for the last few months.

At the same time, the application got a couple of new features. Firstly, the engine that loads the images - glycin - is now fully sandboxed, even for SVG files. Secondly, the print dialog - which you can see in the screenshot above - was completely redesigned.

This week in GNOME we also saw the release of GTK 4.12. This included new and improved components to developers of GTK-based applications and the support for the Vulkan renderer. The support is still marked as experimental, but the team says that it's now much "less of a science project".

A vector layer was also introduced to the Map application (though this is experimental as well). Showing the map through vectors instead of as an image would allow for custom styling (e.g. applying GNOME light/dark style sheets) and using the GNOME theme icons for places.

Generally speaking, the release of GNOME 45 is getting closer and closer and under-the-hood projects (such as GJS, which allows usage of GNOME libraries in JavaScript) are releasing betas with various bugfixes and performance improvements. You can read the full update here:

## The Linus Media Group is being heavily criticized

<iframe title="The Problem with Linus Tech Tips: Accuracy, Ethics, &amp; Responsibility" src="https://www.youtube.com/embed/FGW3TPytTjc?feature=oembed" width="200" height="113" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

Though this is not directly related to the Linux world, LTT is probably one of the biggest tech content creator out there and the controversy that recently sparked gained a lot of traction; thus, I think it's worth summarizing what happened.

The outrage started when the above video, by Gamers Nexus, was published. The video highlight significant issues in the management of the Linus Media Group (which includes Linus Tech Tips and secondary channels such as ShortCircuit). As an example, the video points out that the LMG multiple times failed to spend the necessary time on reviews of products, producing videos with significant flaws and refusing - when called out - to remove the video or properly address the mistake.

The single incident that gained most traction is regarding Billet Labs. The company (made of two people) sent LMG a engineering sample of one of their cooling devices along with a supported GPU to test it with. The LMG lost the provided GPU, and thus decided to test the cooler with an unsupported graphics card. Instructions and context on the cooler was also provided by Billet Labs, and completely ignored in LTT's video. Linus portrayed the cooler in a quite negative light and, when asked why he didn't test with a supported GPU, replied that it did not matter: even if the cooler had worked - he said - it still would've been a terrible product. He added that he did not want to spend the extra $100/500 required to re-shoot with the correct GPU.

Billiet Labs then asked the cooler to be returned, as it was an engineering sample they have in very limited quantity. LMG agreed to that, twice. However, the cooler was instead auctioned and sold. Billiet Labs was then ignored, until two hours after the above video was published. Only then Linus offered them a refund of the cost of the product.

This was just a quick summary, and the situation is still evolving. Here's the video that was uploaded in response:

<iframe title="What do we do now?" src="https://www.youtube.com/embed/0cTpTMl8kFY?feature=oembed" width="200" height="113" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
