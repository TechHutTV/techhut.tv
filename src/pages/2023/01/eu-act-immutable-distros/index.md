---
title: "New EU Act poses risks for FOSS, new Immutable Distros, and more!"
date: "2023-01-31"
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

## Troubles for Open Source Software at the European Commission

On the 15th of September 2022, the European Commission has published the European Cyber Resilience Act. The goal is to have a common set of cybersecurity standards that would be able to avoid up to €180-290 billion annually. There's just an issue: it might have a big impact on the Open Source world.

The proposal would require software developers to guarantee the security of their products "throughout the whole life cycle", to offer a "coherent cybersecurity framework", to improve the transparency of digital security, and to "use products with digital elements securely". All of this is expected to have a compliance cost for the software developers; a cost that many Open Source projects might not be able to afford.

The Act is currently in a "call for feedback" phase until the 23rd of January. The Open Source Initiative has submitted feedback asking for “further work on the Open Source exception to the requirements within the body of the Act”. As an example, responsibility for compliance could be required only for actors that are commercial beneficiaries of the deployment. Olaf Kolkman, exec lead advisor for the Internet Society, also said that "the regulation should be modified to make it clear that software produced under an open source license and distributed on not-for-profit basis is out of scope for the regulation”.

The Act will go through a negotiating phase for the coming months, with EU Ministers expected to report on the progress at the beginning of June.

## A new immutable Distro that blends Fedora, Ubuntu, and Arch

![](images/image-15.png)

You've never seen this many different neofetches in a single OS.

Made by the developer Rudra Saraswat (also the author of Ubuntu Unity, Ubuntu Web, UbuntuX, and more) we have a new immutable distribution that - though formally based on Arch - can run dnf/yum _and_ apt _and_ pacman _and_ yay.

![](images/image-14.png)

BlendOS running multiple package managers.

Of course, Flatpaks are also supported; BlendOS also has a tool to switch between desktop environments (or window managers). Similarly to Vanilla and NitruxOS, this is managed through distrobox, which installs the packages in a container and then exposes them to the system.

The installer of the system is made using Jade GUI, which was developed by Crystal Linux (a Arch based distribution) with the goal of being a simple, pretty installer. And they nailed it.

Interestingly enough, this is only the third distribution going in this immutable-via-distrobox direction, after the above-mentioned NitruxOS and Vanilla. The latter has managed to get a lot of popularity very quickly, showing that there's actual interest in this new idea of distribution.

## Fedora developer introduces a new way to test the latest KDE

![](images/image-16.png)

A screenshot of Fedora Kinoite Nightly.

Fedora was one of the first to introduce immutable distributions, though with a different approach. The KDE variant of Fedora's immutable distro, Kinoite, now has a new (unofficial) version, called Nightly. The idea is very similar to KDE Neon: being able to ship to users the git master version of KDE Plasma and Apps, mostly for development or testing purposes. However, Kinoite Nightly does it on an immutable basis, which makes it significantly less prone to breakages compared to Neon.

This comes timely, as the _last_ version of KDE Plasma 5 (before the 6 series) is currently in beta testing. If you're interested in helping out the project, testing this new distribution might be a good way.

## Gnome 44 Alpha Released, preparing for release in March

Since we've mentioned how you can help KDE by testing the beta, it would be unfair to also mention that Gnome has also recently started public testing for their next version, which will be released on the 22nd of March.

Gnome 44 will feature Ephipani - Gnome's Browser - ported to GTK4, grid view (with previews!) for the file chooser dialog, a Bluetooth sub-menu in the Quick Settings and a redesigned Accessibility panel. System settings can also now share Wi-Fi passwords via QR Codes, the Date & Time panel is more mobile-friendly, and you can see kernel and firmware versions in the about page.

Meawhile, we also have very interesting work going on regarding the mobile efforts, which are currently split between Phosh - a shell specifically made for mobile phones - and Gnome itself, natively running on such devices. On phosh side, they've increased the number of testcases; These also take screenshots in various languages whilst being run, allowing the developers to check that no string gets cut regardless of the system language.

Finally, developer Cassidy Blaede has published a video of Gnome running on a OnePlus 6T with experimental patches (not merged yet). It shows the main functions of Gnome working (almost) flawlessly: taking screenshots by selecting area, quick settings, and notifications, and switching between open applications using gestures.

{{< youtube yJq8Cq9LixE >}}

## Anyone can now get Ubuntu Pro for free


Canonical has recently announced that their Ubuntu Pro service is now available to anyone with up to five machines. Quick recap on what Pro is: whilst Ubuntu LTS delivers security patches to Ubuntu Main packages for up to five years, Ubuntu Pro doubles that to 10 years of support, and also adds 10 years of patches to all packages in the much-bigger Ubuntu Universe repository. Other features of Pro include being able to live-patch the Kernel. If you're interested in this extended period of support for your packages (maybe because you need very high stability) you might be interested in this version.
