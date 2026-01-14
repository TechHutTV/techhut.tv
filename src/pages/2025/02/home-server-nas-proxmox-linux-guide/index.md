---
title: "Create an AWESOME Home Server/NAS with Proxmox"
date: "2025-02-03"
draft: true
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "Proxmox"
  - "Homelab"
---
Yes, Proxmox has a great operating system that can run your NAS and host many other services. I’ve decided to do a complete walkthrough of building my new media server. This guide will focus on installing Proxmox and a 4-bay NAS and spinning up various services to have a complete home lab experience. This article will be a companion for the part 1 walkthrough video focusing on creating a ZFS pool and setting up network shares.

## Hardware
Hardware requirements depend on exactly what you need and will vary wildly depending on specific use cases. I will give you my recommended minimum requirements and the specifications for the system I’m using. First, here is a list of the requirements directly from Proxmox.

- Intel EMT64 or AMD64 with Intel VT/AMD-V CPU flag.
- Memory: A minimum of 2 GB is required for OS and Proxmox VE services, plus designated memory for guests. For Ceph or ZFS, additional memory is required, approximately 1 GB for every TB of storage used.
- Fast and redundant storage, best results with SSD disks.
- OS storage: Hardware RAID with batteries-protected write cache (“BBU”) or non-RAID with ZFS and SSD cache.
- VM storage: For local storage, use a hardware RAID with a battery-backed write cache (BBU) or non-RAID for ZFS. Neither ZFS nor Ceph is compatible with a hardware RAID controller. Shared and distributed storage is also possible.
- Redundant Gbit NICs and additional NICs are also supported depending on the preferred storage technology and cluster setup – 10 Gbit and higher.
- For PCI(e) passthrough, a CPU with a VT-d/AMD-d CPU flag is needed.

In addition to this, I recommended using a modern Intel CPU that supports Intel QuickSync. This gives us the ability to use hardware transcoding with media services. Also, a higher core count CPU gives us more room to dedicate cores to various virtual machines and containers. If you’re using an AMD CPU, combining this with a NIVIDA GPU and setting up passthrough in the future is another good bet. For storage you’ll need a least one NVM drive with 256gb or storage or more to install Proxmox and have a good experience. If using this as a NAS, having at least two 1TB HHDs is needed as it will allow you to mirror the drives, so if there is a single drive failure, you won’t lose all your data. 8GB of RAM or more is also recommended. Below, check out the specs of the device I will be using.

### UGREEN NASync DXP4800 Plus
- Intel Pentium Gold 5 Cores 6 Threads
- 32GB DDR5 Memory
- x1 128 NVME SSD (boot drive)
- x2 1TB NVME SSD (mirrored for containers, VM disk storage)
- x4 4TB Seagate HDD (raidz1 for network shares, storage)

## Proxmox
Proxmox stands out for its robust virtualization capabilities, combining KVM for full virtualization and LXC for lightweight containers. It offers a user-friendly web interface, seamless backup and restore options, comprehensive support for clustering, and high availability. Proxmox’s integration with ZFS ensures efficient storage management, snapshots, and replication. Additionally, it’s open-source and free, making it a cost-effective choice for home server enthusiasts.

Installing Proxmox is easy. You download the .iso file from their website and flash it to a USB drive. To flash the .iso to a USB drive, you can use a tool such as Rufus on Windows or GNOME Disks on Linux using the ‘Restore’ function. Once flashed, you must plug it into the device you want to install Proxmox on and jump into your system’s bios. Depending on the motherboard of your device, you will need to hit a function key or ESC or delete it during the initial boot process.

![]()

In the bios, disable Secure Boot (in the security section). You may also need to enable Virtualization and disable the Watchdog controller if you have one. Now boot off your Proxmox VE Installer USB.

In the installer, go through the EULA, and for the target hard disk select your OS drive.

![]()

Select your region info, your administrator password, and your email. Now configure your host name, I just called mine “proxmox” and put it in my local domain.

![]()

Next up read through your summary to make sure everything is correct, and begin the installation.

![]()

## ZFS Storage Pools in Proxmox
Now visit the Proxmox VE IP address on the login screen

![]()

Login with root and the same password from the setup

![]()

Now, inside the disks tab you should see all your available disks.

![]()

First, we are making some ZFS storage pools to mirror. Just go to the ZFS tab and click Create: ZFS

![]()

Select your drives, give the share a name, and uncheck “Add Storage”. Select your RAID level, I am using RAIDZ (similar to RAID5 with 3 disks of data and 1 as a backup). Also, pick your preferred compression, I am using LZ4. Once setup, click on “Create”.

![]()

I’m creating another mirrored ZSH config for the NVME flash storage too for the virtual machines.

![]()

After setting up these storage pools, you can check them in the terminal using zpool list

![]()

You can also see the available storage using zfs list

![]()

## Creating and Assigning Storage
Next up we are going to make some directories to assign to certain Proxmox tasks. Headover to the Storage tab, and for each directory click Add -> Directory.

![]()

For our backups, we are going to set our id to backups, set “/vault/backups” as the Directory and change the Content type to “VZDump backup file” and “Snippets”

![]()

I am also going to edit the local directory to remove the backup files.

![]()

Next I will make one big data directory share. This one, I am using the id “data”, putting it in the “/vault/data” directory, and set the content to “Disk image” and “container” for the virtual machines.

![]()

Finally, I am going to make a share for disks, with the id “disks”, “/flash/disks/” as the directory, and again “Disk image” and “Container” for the content.

![]()

Now in the terminal, in the terminal we can see “vault” and “flash” inside /, and we can see our folders inside vault.

![]()

## Creating Ubuntu Container

Now, let’s create an Ubuntu container with Cockpit, specifically to create network shares for my local network. To do this, on the far left side with the server view, go to “local (proxmox)” -> CT Templates. This is where our containers will be.

![]()

I already have Ubuntu 22.04, but you won’t out of the box. To download a container, just click the templates button and it will give you a container downloader.

![]()

Once you have a container of your choice (in my case, Ubuntu). Click on the top right “Create CT” to create a container. In general, Set a hostname for things like Windows autodiscover, and set a strong complicated password.

![]()

Click next (on the bottom right) and select the Ubuntu template (or the template for the distro of your choice).

![]()

Click next, and select where you want to store your disk. In my case just “disks”. Select whatever size you want for your container.

![]()

Now select your CPU and Memory. I gave mine an extra core, and set my RAM to a single gigabyte of memory and SWAP.

The default network settings work for most people, but I switched the IPv4 and IPv6 addresses to DHCP instead of Static, so it is compatible with my home network.


I kept the default DNS settings, and now at the end, just confirm everything looks correct and select “Finish” on the bottom right.
