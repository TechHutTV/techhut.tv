---
title: "How to Flash Linux on the PinePhone"
date: "2022-02-13"
url: how-to-flash-linux-on-the-pinephone
draft: false
authors:
 - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "Mobile"
  - "Pine64"
  - "Hardware"
---

We will go over how to flash distributions on a PinePhone. You can easily flash Manjaro, Arch, Ubuntu Touch, Mobian, and any other ARM distribution available on the wiki linked below.

[https://wiki.pine64.org/wiki/PinePhone\_Software\_Releases](https://wiki.pine64.org/wiki/PinePhone_Software_Releases)

Time needed: 15 minutes.

Installing a new distribution on your Pinephone is as easy as flashing an ISO to the internal storage,

1. **Download the Jumpdrive image.** Visit this [page](https://github.com/dreemurrs-embedded/Jumpdrive/releases?ref=techhut.tv) and grab the latest version of Jumpdrive.

3. **Flash the Jumpdrive image to an SD card.** Using a burning tool such as Etcher, plug in the SD card to your computer. You may need a converter or a special USB to connect the card. Burn the .img.

5. **Boot from the SD card.** Put the card in your phone, and when you reboot, you should see a static Jumpdrive screen.

7. **Connect the PinePhone to your computer via USB.** Plug your phone into the computer via USB.

9. **Flash the exposed (mounted) PinePhone drive with a chosen OS image as you’d flash any SD card.** Jumpdrive will allow your computer to recognize the internal storage as a drive. Use Etch to burn your distro of choice to your phone.

11. **Disconnect the PinePhone from your PC, power it down, and remove the Jumpdrive SD card.** After you remove the SD card and reboot, you will be able to access your new system.

[https://github.com/dreemurrs-embedded/Jumpdrive/releases](https://github.com/dreemurrs-embedded/Jumpdrive/releases)

https://youtu.be/Zf0zwq6jI30
