---
title: "Rocky Linux, AlmaLinux, RHEL, CentOS - Which Is BEST for You?"
date: "2022-11-02"
url: rocky-linux-almalinux-rhel-centos-which-is-best-for-you
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Software"
tags:
  - "Linux"
  - "Red Hat"
  - "Distros"
  - "Homelab"
---

Near the end of 2020, Red Hat decided to kill CentOS as we know it—kind of. We’ll get that a bit later. But for now, let's examine Red Hat Enterprise Linux and all of the clones and forks that we have available. So, let’s get to it.

### Red Hat Enterprise Linux

Red Hat Enterprise Linux, or RHEL for short, is a Linux distribution developed by, believe it or not, Red Hat. RHEL is an RPM-based distribution that uses the DNF package manager and follows a more LTS-like release cycle with an older package base. RHEL’s package base actually comes from earlier versions of Fedora, making Fedora a testing ground for different changes that may come to Red Hat. For example, the latest version of RHEL 9.0 is based on Fedora 34 from March 2021. Do note, though, that while Fedora is sponsored by Red Hat and uses some Red Hat infrastructure, Fedora is still its own project that may make decisions against Red Hat. Another thing that makes Red Hat special is that a lot of modern technology in the Linux world is either significantly funded by Red Hat or run or heavily contributed to by Red Hat developers, A bunch of examples of this include GNOME Shell, SELinux, SystemD, PackageKit, Wayland, D-Bus, and many other projects. However, another thing that made Red Hat different is that it’s a paid Linux distro, but paying for it gives you support and docs from the Red Hat company.

### CentOS

This is where CentOS came in. Because Red Hat was a paid distro, and people may be fine with community support/docs instead of official Red Hat docs, a rebuild of RHEL was formed called CentOS. CentOS essentially took Red Hat’s source code, removed Red Hat branding, added its repositories, and then compiled it themselves. So, if you needed Red Hat and didn’t care about the support from the company, you would install CentOS. Red Hat later bought the project out, and things continued running smoothly. However, as mentioned earlier, Red Hat stopped supporting CentOS halfway through CentOS 8’s release cycle, and many people consider that to be the death of CentOS. This resulted in many new RHEL rebuilds and clones, including Alma Linux, Rocky Linux, and more that we will get into later.

### CentOS Stream

However, CentOS’s death was overblown because CentOS Stream replaced it, and what stream was severely miscommunicated to the community. CentOS Stream was essentially just Red Hat but with one huge difference. Instead of small fixes and changes needing to make their way into RHEL, they are rebuilt into CentOS. They would be implemented into CentOS Stream first and then RHEL second. This made contributing to both CentOS and RHEL much easier because you wouldn’t have to deal with the bureaucracy that comes from trying to contribute to a paid Linux distro. The issue with the communication was that they pushed Stream as a completely different thing. Not many people know how Stream actually works, and Stream is just horrible branding because it makes it sound like a bleeding-edge rolling release distro. They also killed CentOS 8 halfway through its normal life cycle and made people “migrate” to a new branch of CentOS. It's not a good look for something that was supposed to be an LTS distro. I think it would have been better if they just made this change in CentOS 9 without a whole rebranding or kept CentOS Stream separate.

## Alternatives

However, the damage from the bad rebranding of CentOS Stream has already been done, and there are now loads of options if you want a good Red Hat Enterprise-like Linux experience. So, let’s look at each of them and find out which one may be the best for you.

## Red Hat backed

### RHEL Free

Let’s talk about the 2 official projects backed by Red Hat, both of which we already mentioned. CentOS Stream and Red Hat Enterprise Linux. Believe it or not, Red Hat offers a free program for individual users. This does have a few limitations. For example, you can only register 16 systems running RHEL, but it also gives you access to all of RHEL’s releases and their documentation and resources for learning how to use RHEL. If you are trying to learn how to use an Enterprise Linux system like this, I would recommend learning with the RHEL Free plan because it gives you access to the same documentation and self-support resources you can get from paying for Red Hat. However, if you want to use RHEL for a personal use case, I recommend another system because RHEL Free is kind of a hassle to set up. Mainly because you still need to make an account to download it, and once installed, you need to register it with an entitlement server.

### CentOS Stream

On the other hand, CentOS Stream is still a great option if you need an RHEL-like server, although it isn’t an exact clone like many of these other distros are. While CentOS Stream, for the most part, will function almost the same as RHEL, since it is used as a development ground for RHEL, it won’t be 100% bug for bug compatible with RHEL. And I’ll get to what bug for bug compatible means later. The point is if you want something like a web server or would like to self-host something, and you would prefer to do it with a distro in the RHEL family compared to something like Debian or Ubuntu, then I think CentOS Stream is one of the best, options to look at. You still get rock-solid stability, it’s close enough to mainline Red Hat that you won’t need to relearn much if anything at all, and you will get bug fixes and other minor updates slightly faster than regular RHEL.

![](images/Screen-Shot-2022-11-02-at-12.41.04-PM-1024x654.png)

## Community-Backed RHEL Rebuilds

Next, let’s talk about some of the community-backed rebuilds of RHEL. Some of these may have some small bonus features, but for the most part, they are RHEL with different repos, a rebrand, and community support instead of corporate support. All of these should also be bug-for-bug compatible with RHEL, which means that the vast majority of packages should be identical to an installation of Red Hat. If a bug exists in RHEL, it should also exist in these rebuilds.

### Rocky Linux

Let’s start with Rocky Linux. This distro emerged after CentOS’s death and aimed to fill the void that CentOS left. It was started by one of the co-founders of CentOS, Gregory Kurtzer. Rocky Linux was named to honor another CentOS co-founder who died, Rocky McGough. The company that runs it is called the Rocky Enterprise Software Foundation, and they are structured as a Public Benefit Corporation. But because it technically is a corporation, it does move slower than other distros like Alma, which came with its rebuild of RHEL 9 more than a month before Rocky Linux.

### Alma Linux

Speaking of Alma Linux, that’s the other CentOS replacement that came out of the death of CentOS. This was started and heavily funded by CloudLinux, but it became a community project that also received funding from many major companies such as AWS, ARM, and Microsoft. Unlike Rocky Linux, and despite it being started by CloudLinux, Alma is run by a 501 non-profit. It also seems to get releases faster than Rocky Linux, with only 9 days between RHEL’s 9.0 release and Alma’s 9.0 release. Because it has more backing, faster release schedules, and other factors, it has become the most popular community-based RHEL clone.

## Corporate-Backed RHEL Rebuilds

Now, let’s look at some other options that are corporate-backed and not community-run projects. Most of these have gotten an earlier start and existed for years before the death of CentOS.

### Oracle Linux

Let’s start with the biggest corporate-backed alternative, Oracle Linux. This is another rebuild of Red Hat with replaced branding for the most part. However, remember that it is not 100% binary compatible, and some packages have some differences. For example, Oracle ships its quote “Unbreakable Enterprise Kernel” with newer kernel versions and some performance enhancements, although a RHEL-compatible kernel is offered. There are also some differences in other core components, such as glibc and openssl, among other things.

### EuroLinux

Another corporate-backed distro is EuroLinux. This is a RHEL rebuild backed by the company EuroLinux. It is a 1:1 bug for bug compatible with RHEL and EuroLinux. The company does provide support for EuroLinux, the distro. They also have migration scripts to migrate RHEL, CentOS, Oracle Linux, Rocky, and Alma to EuroLinux. They do have a free version that you can use as a RHEL rebuild. Still, they also have a paid version that provides you access to RHEL 6 and 7-based versions of Euro Linux, full support, and access to additional intermediate packages and documentation.

### VzLinux

Finally, VzLinux, which is a RHEL rebuild owned by Virtuozzo, was made to be a base for their own operating systems, such as OpenVz. It is a 1:1 bug for bug compatible with Red Hat, but other than that, there’s not much going on that can differentiate it from Alma and Rocky. It has multiple flavors, with the standard bare metal version and a special version for containers and virtual environments. It also has a feature called Chameleon, which edits the os-release file to look like either RHEL or CentOS. This is good if you are trying to run software like CPanel that will only install on distros that it supports, like Alma. However, I feel that Virtuozzo only maintains this distro because they use it themselves. Outside of its own product line, there’s very little amount of documentation for it, updates are slow, and the website for it feels more like a landing page than a website for distribution.

## Honorable Mentions

Those are the main distributions that can be used as drop-in replacements for CentOS, so let’s talk about some other distributions that will give you a similar experience, but I may not recommend them for various reasons.

### Navy and Circle Linux

Let’s start with Navy Linux and Circle Linux. Navy Linux is another Red Hat rebuild run by a Delaware non-profit. I don’t recommend Navy Linux because of any issues with the distro itself but because it is too small of a project, in my opinion. It only has a few corporate sponsors, its GitHub only has 5 repositories, only 2 of which have been updated in the last 30 days as of October 9th, 2022, and of those 2 repos, one of them is the website, the other is just docker images. As of the time of this video, Navy Linux still hasn’t had a rebuild of RHEL 9 yet, and its website has a noticeable lack of information. CircleLinux is a bit better, this is a Chinese-based community ran project and it’s actually backed by Huawei and Tencent. However, it took them quite a while to come out with their rebuild of RHEL 9, and there’s really not much about it that makes you wanna use it over Alma or Rocky. Both of these are binary compatible with RHEL. Still, in general, since they’re much smaller than these other distros, you won’t be seeing as many guides and community support available for these distros, and honestly, I don’t see these 2 distros lasting that long.

### Fedora

The last honorable mention is Fedora. Fedora is an honorable mention simply because it can not replace Red Hat, but for many use cases, it’s a good option, and the system structure is very similar to RHEL. Fedora was upstream for CentOS Stream before CentOS Stream became Red Hat, so brand new Fedora releases contain a lot of tech and features that may become part of a future release of Red Hat. It’s also worth noting that because of this relationship, a lot of the structure of a Fedora system is similar to current or future Red Hat releases. Because of this, some people even consider it a part of the RHEL family. But, very important to remember that it is not even close to being binary compatible with Red Hat because it uses newer packages. However, this is the way to go if you want to run a server with newer packages but still want it to feel like Red Hat and CentOS. I’ve always recommended this as a desktop distro, but even for server use cases where you need newer packages, it’s a very solid distro to go to.
