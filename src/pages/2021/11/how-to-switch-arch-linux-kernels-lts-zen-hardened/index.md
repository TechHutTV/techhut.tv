---
title: "How to Switch Arch Linux Kernels"
date: "2021-11-22"
url: how-to-switch-arch-linux-kernels-lts-zen-hardened
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "Linux"
  - "Distros"
  - "Arch"
---

Whatever your reasoning, switching your kernel in Arch Linux is actually a fairly easy process. All we need to do is make sure the proper kernel is installed on your system and configure grub to easily utilize that new kernel.

You can check your currently installed Kernel and version with the command below.

```
uname -r
```

First, let's take a look at our options from the official Arch wiki.

## Officially Supported Kernels

- **Stable** — Vanilla Linux kernel and modules, with a few patches applied. [linux](https://archlinux.org/packages/?name=linux&ref=techhut.tv)

- **Hardened** — A security-focused Linux kernel applying a set of hardening patches to mitigate kernel and userspace exploits. It also enables more upstream kernel hardening features than the stock kernel. [linux-hardened](https://archlinux.org/packages/?name=linux-hardened&ref=techhut.tv)

- **Longterm** — Long-term support (LTS) Linux kernel and modules. [linux-lts](https://archlinux.org/packages/?name=linux-lts&ref=techhut.tv)

- **Zen Kernel** — Result of a collaborative effort of kernel hackers to provide the best Linux kernel possible for everyday systems. Some more details can be found on [https://liquorix.net](https://liquorix.net/?ref=techhut.tv) (which provides kernel binaries based on Zen for Debian). [linux-zen](https://archlinux.org/packages/?name=linux-zen&ref=techhut.tv)

## Installing Kernels

Above, we have listed the package names that you will want to install. Once you have decided the kernel you want on your system, run one of the following commands.

`sudo pacman -S linux`

`sudo pacman -S linux-zen`

`sudo pacman -S linux-lts`

`sudo pacman -S linux-hardened`

## Installing Kernels

Selecting the kernel is done when you boot your system through GRUB. We are going to change some settings in the configuration so that you will see all available kernels without needing to go into advanced settings, and it will save your selection for when you boot in the future.

Open the GRUB configuration in nano.

```
sudo nano /etc/default/grub
```

Next, we will change the following options. Depending on the Arch-based distribution you are using, these settings may be in different orders, already set properly, or may need to be uncommented.

GRUB\_DEFAULT – Default boot selection.
GRUB\_SAVEDEFAULT – GRUB to remember the last selection.
GRUB\_DISABLE\_SUBMENU – Disable submenus.

```
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
GRUB_DISABLE_SUBMENU=y
```

Setting GRUB\_DEFAULT as saved will set the last used selection as the default kernel to boot. After making these edits, press _Ctrl-O_ when in nano and write out your changes.

## Reloading GRUB Configuration

Type the following command to reload the grub configuration with the changes you saved.

```
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Now all you need to do is reboot your system and select the kernel you want on boot. Enjoy!

## Additional Resources

I forgot to mention in the video that you should install the corresponding \*-headers packages with your kernel.

> sudo pacman -S linux-headers
>
> sudo pacman -S linux-zen-headers
>
> sudo pacman -S linux-lts-headers
>
> sudo pacman -S linux-hardened-headers

Zen kernel LAN issue: [https://forum.endeavouros.com/t/linux-zen-kernel-internet-not-working/6339](https://forum.endeavouros.com/t/linux-zen-kernel-internet-not-working/6339?ref=techhut.tv)
