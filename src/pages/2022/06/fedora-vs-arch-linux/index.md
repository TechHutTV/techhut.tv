---
title: "Fedora vs Arch Linux - Battle of the Best!"
date: "2022-06-11"
url: fedora-vs-arch-linux
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Software"
tags:
  - "Linux"
  - "Arch"
  - "Distros"
  - "Fedora"
---

Today we are going to be taking a look at, Fedora and Arch Linux. Specifically we will look at some of the main differences between them, as Fedora and some Arch-based Linux distribution seems to be where I always end up when trying to pick a distro.

Both Arch and Fedora generally are considered cutting edge distributions, so all the packages are up-to date in comparison to something like Debian; however,  the way in which they achieve that is different, so on both you will be getting, the latest versions of your preferred desktop environment, the latest kernels, latest versions of your favorite applications, and more.

https://www.youtube.com/watch?v=S\_XIoPZ5u\_U

[00:00](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=0s&ref=techhut.tv) – Intro
[00:40](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=40s&ref=techhut.tv) – Update Structure
[02:04](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=124s&ref=techhut.tv) – OnlyOffice \[Sponsor\]
[02:59](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=179s&ref=techhut.tv) – Backing
[03:26](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=206s&ref=techhut.tv) – Package Management
[04:34](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=274s&ref=techhut.tv) – Repositories
[06:23](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=383s&ref=techhut.tv) – Installation
[07:28](https://www.youtube.com/watch?v=S_XIoPZ5u_U&t=448s&ref=techhut.tv) – Thoughts

## Update structure

Arch is a rolling release distribution which means that you install it once and then keep on updating individual packages on the system. There is no Arch Linux version 2 that you need to install after 6 months, so you can just install Arch and just update the system as you use it. Fedora on the other hand is a fixed release distribution. Fedora currently has a new release around every 6 months. This means that every 6 months you need to upgrade to the latest release of Fedora.

While Arch is somewhat more convenient to run because you don’t need to update your OS as often, it can cause issues when Arch decides to make a system breaking change which means that some updates may require manual intervention, and the system will just be less stable overall compared to Fedora. This may sound bad, but I've only had one occasion where I had boot issues after an update, and I think it had something to do with NVIDIA drivers on Manjaro. Fedora’s frequent update cycle is what allows it to be cutting edge while still being stable enough for even a Linux novice to use comfortably. For example, a potentially system breaking change would just wait until the next major Fedora update so that way any bugs can be worked out and fixed. We even saw this in the last 36 update as its release date was push forward a few times as bugs were eliminated.

### **Backing**

Now let’s discuss the backing of these distros. Just like how OnlyOffice backed and sponsored this video. OnlyOffice is a fantastic all-on-one office suite that is fully compatible with Microsoft Office. Within the single application they have full featured word processing, presentation, and spreadsheet applications. In the latest release they added an integrated PDF viewer and conversion tool as well as many more major updates and changes. I’ve been using OnlyOffice on Windows, Linux, and even on the Cloud within my NextCloud instance. In addition to their free and open source desktop applications they have online document servers and workspace tools all with free community versions. So head down to the description to download OnlyOffice for any platform, and if you’re on Linux you have options for all major packaging formats.

Now with that, Arch and Fedora are both community projects, however Fedora is funded by Red Hat and therefore shares some infrastructure and ties. This can be noticeable in some places, for example going to file a bug report takes you to Red Hat’s Bugzilla which requires it’s own account, in return Red Hat bases itself off of Fedora which essentially makes Red Hat the LTS version of Fedora. So, the brand new release of Red Hat 9 is based on Fedora 34.

Arch on the other hand is a fully independent community project with no corporate ties.

### **Package Managers**

Package Management is where, in my opinion, Arch starts to pull some wins.

Fedora and Arch currently use different package managers, with Arch using Pacman and Fedora using DNF. Pacman is known for being somewhat confusing for new Arch users. For example, instead of running \`pacman install firefox\`, you would do \`pacman –Syu firefox\`, the –S installing it, -y Updating your repositories and -u Updating installed packages.

DNF is a bit easier to use, for example to install Firefox, simply just run “dnf install firefox”. It even automatically updates your repositories for you which means you don’t have to run apt update like on Ubuntu, and it makes sure that dependencies are up to date which prevents weird dependencies issues you can get on Arch if you don’t keep your install up to date. However DNF is known to be one of the slowest package managers, which is a huge con, not only for DNF but for Fedora as a whole.

### **Repos**itories

Speaking of packages, let’s talk about these distributions repositories. Fedora just has 2 repositories, 1 main one and 1 for updates. Arch is a bit more complicated with several different repos including Core, Extra, Community, and MultiLib, and staging and testing repos.

According to pkgs.org, Fedora’s main repo alone has almost 68,000 packages, which actually beats Ubuntu by around 2000 packages, making Fedora’s repo one of the biggest of any distros. This repo however only ships open source packages and they even avoid shipping open source things that could be considered a legal risk for Fedora such as emulators and ffmpeg. So you will most likely need to install another repo like RPM Fusion to get around this limitation.

Arch’s repos are somewhat small with just under 13,000 packages in it’s non staging and testing repos. This is very small, even compared to small distros like Void Linux which has a bigger repository with just over 18000 packages in total, including the non-free repos. To get around this, Arch has the AUR, Arch User Repository, a giant repo of unofficial user generated packages. These can vary in quality, but generally there is an AUR package for almost everything you can think of.

For me personally this is where Arch shines, for example, the AMD Pro drives that are made specifically for Ubuntu will actually give you better success installing them on Arch though the AUR with less steps and limited configuration needed.

Fedora has something similar to the AUR called COPR which allows anyone to easily make their own RPMs and maintain them, not just for Fedora but for several other distros including Red Hat Linux and even OpenSUSE. The main issue though is this is similar to the PPA system which means you may find your self having several extra repos installed through Copr.

# **Installation**

Lastly, lets talk about the installation. Fedora uses the Anaconda installer which has gotten criticism for being somewhat confusing. The main install process is straight forward enough, but the general layout is just not common compared to other installation application like Calamaris.

Arch on the other hand makes installing Fedora look like installing Chrome. Until recently it didn’t even have an installer and you would just have to go on the Arch wiki and install it step by step yourself. This changed on April fools day of 2021 with the introduction of archinstall. This is a TUI script to help you install and setup Arch. It can still be a bit confusing which is there are several other arch scripts such as Archfi available, and there are entire Linux distros dedicated to making Arch easier to install like Arch GUI or EndeavourOS, and because of this, if you are a beginner I’d generally recommend installing something easier that provides the benefits of Arch like EndeavourOS or even Manjaro.
