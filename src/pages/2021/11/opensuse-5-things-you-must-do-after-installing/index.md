---
title: "OpenSUSE – 5 Things You MUST Do After Installing"
date: "2021-11-10"
url: opensuse-5-things-you-must-do-after-installing
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "OpenSUSE"
  - "Linux"
  - "Distros"
---

OpenSUSE is one of the best Linux distributions out there to date. Unfortunately, many people including experienced Debian or Arch users get frustrated with the differences in package management and the YaST software. In this article we will overview some of the main things you should do to jump start your OpenSUSE experience. Watch the video below or checkout the article to quickly get up and running in OpenSUSE.

https://youtube.com/watch?v=ajVqJ1nl9bM

## 1\. Updating System and Repositories

The first thing you need to do before we can move onto anything else is install system updates. Depending on the age of your install image this may be a few applications or a massive system wide update. To update the system we will use the zypper package manager. First we need to refresh the repositories cache to ensure we are getting the latest information.

```
sudo zypper ref
```

Now we will run the update command with zypper to update the system.

```
sudo zypper update
```

Next we are going to add some additional repositories. By default the standard OpenSUSE repositories are very limited. What we will do now is enable [Packman 6](https://en.opensuse.org/Additional_package_repositories?ref=archive.techhut.tv), not to be confused with the [Arch pacman](https://wiki.archlinux.org/index.php/pacman?ref=archive.techhut.tv) package manager. You can add this repository through the terminal using zypper or through YaST. Below you can pick what command to use depending on the version of OpenSUSE you have installed.

**Tumbleweed:**

```
sudo zypper ar -cfp 90 https://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Tumbleweed/ packman
```

**Leap:**

```
sudo zypper ar -cfp 90 'https://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Leap_$releasever/' packman
```

Packman is not the only additional repository available for OpenSUSE there are a few more you may want to consider adding. For more information on this check out the video above or visit this [link](https://en.opensuse.org/Additional_package_repositories?ref=archive.techhut.tv).

Use the command below to switch the vender to packman.

```
sudo zypper dup --from packman --allow-vendor-change
```

## 2\. System Snapshots

Timeshift is generally my go-to snapshot utility for backing up and restoring Linux systems. It is a wonderful tool and I recommend checking out [my tutorial on Timeshift 1](http://archive.techhut.tv/post/2020/09/backup-and-restore-linux-timeshift/). With that said OpenSUSE comes with a wonderful utility called snapper. Snapper includes a command line utility, but it is also easy to manage through YaST.

To access snapper just open the YaST control center and select ‘Filesystem Snapshots’ under the Miscellaneous section. A new windows will open up with a list of all your current system snapshots. From here you can create, modify, and delete your existing snapshots.

From here I would recommend creating a new snapshot. Give it a description such as “post-install” “packman added”. If you would like to learn more about snapper including using it through the command line check out this tutorial. Below I included a video from OpenSUSE giving a demonstration on how to do a system restore using snapper.

```
snapper --help
```

For extra projection and home directory backups you can run snapper and [Timeshift](http://archive.techhut.tv/post/2020/09/backup-and-restore-linux-timeshift/) together.

https://youtube.com/watch?v=AeU\_orsOCNI

## 3\. Essential Packages and Drivers

Now that we added some repositories and we have a snapshot of our system lets gather some must have packages. These packages will include media codecs, system tools, and more. Some of these packages will require the packman repository. Please go to step one if this has not been added.

First we will install any drivers and media codecs you will need. We will be doing this though [opensuse-community.org](https://www.opensuse-community.org/?ref=archive.techhut.tv). This resource will give us the option for an easy one click install. First install the media codecs for the appropriate desktop environment, then if you have a Nvidia card you will see the options to download those below.

**Alternatively** , you can install media codecs using the opi search tool.

```
sudo zypper install opi
```

```
opi codecs
```

Next, we will install some additional packages to give us a smoother experience. To install these applications just open up Software Management through YaST and search for the package name in the \[brackets\].

Microsoft Fonts \[fetchmsttfonts\], Build Essentials \[patterns-devel-base-devel\_basis\], OBS Package Installer \[obi\] _please suggest more below!_

**Additional Tip #1** : If you’re using KDE Plasma you can uninstall Discover and just use YaST Software Management. Open YaST > Software Management > Search for Discover > Right-click > Delete.

**Additional Tip #2** : Some software you download from the internet will download as a .RPM package. You will notice that this will try to open as a archive package. You fix this right click on the application and select properties. Under File Type Option ensure that YaST is the default application so they open as an installation.

## 4\. YaST Control Center

The YaST Control Center is one of those things that makes OpenSUSE wonderful to work with. Many of the settings that are easy to change within this application would have needed to be done through the terminal in others. When you install OpenSUSE make sure you run through all the different options and setting in this application. Below I will highlight some of the important items you should take a look at.

**GRUB Boot Timeout**

One setting you may want to change is the time that the boot loader options are displayed. To get to this setting open YaST > System > Bootloader and it will open a new window with a bunch of settings. To change the Timeout click on the Bootloader Options tab. By default the timeout is in 8 seconds. I generally change this to 3 seconds, but you can set it as 0 to skip GRUB completely.

## 5\. Enable Snaps and Flatpak

Snaps and flatpak is a great way to gather software on your system. Regardless on the version of OpenSUSE you’re using this is a great way to get updated packages directly from the publishers. Use the commands below to add these services then use the links to learn more on how to use Snaps and Flatpak with OpenSUSE.

**Flatpak Installation**

```
sudo zypper install flatpak
```

Once we have flatpak installed it is recommended to use the flathub repo.

```
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

[https://en.opensuse.org/Flatpak](https://en.opensuse.org/Flatpak)

**Snap Installation**

First you will need to check the version of your OpenSUSE install to ensure you do not add the wrong repository. You can do this with the cat tool.

```
cat /etc/os-release
```

Depending on your version of OpenSUSE you may need to switch out `openSUSE_Tumbleweed` with `openSUSE_Leap_15.2` or whatever version of leap in installed on your system.

```
sudo zypper addrepo --refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Tumbleweed snappy
```

Now we will need to import the repo GPG key.

```
sudo zypper --gpg-auto-import-keys refresh
```

Next, lets refresh our cache from snappy.

```
sudo zypper dup --from snappy
```

Install snapd.

```
sudo zypper install snapd
```

Enable the snapd services. Only Tumbleweed users will need to enable the apparmor service.

```
sudo systemctl enable --now snapd
sudo systemctl enable --now snapd.apparmor
```

Snapd installation instructions pulled from: [Installing snap on openSUSE | Snapcraft documentation](https://snapcraft.io/docs/installing-snap-on-opensuse?ref=archive.techhut.tv)
