---
title: "Turning an OLD PC/Laptop into a Media Server! (Ubuntu/PLEX Guide)"
date: "2022-03-21"
url: old-pc-laptop-media-server
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "Homelab"
  - "PLEX"
---

If you have an old or cheap computer lying around, you should put it to work and create a nice home media server. In this video, we will use Ubuntu server 20.04 and PLEX to stream media easily throughout your home and even when you’re out on the go. Once you have everything set up, you’re not just limited to media. You can use this to run Nextcloud or any other server application.

With that said, let's get started.

## Installing Ubuntu on your Machine

First, we will want to download and install a bootable disk image of Ubuntu server edition onto a USB flash drive. If you’re running Windows, I recommend you use RUFUS, and if you’re running on a Linux machine, the Popsicle USB Flasher is my go-to tool.

### [Download Ubuntu Server Edition](https://ubuntu.com/download/server?ref=techhut.tv#downloads)

Once the disk image has been flashed onto the USB, you will want to boot into that USB. Depending on your hardware, you will need to hit a key to get into your boot when the manufacturer splash screen has displayed.

Once booted in, you’ll want to run through the Ubuntu server setup, which is fairly straightforward.

1. Select your Language.

3. Select ‘ **Continue without updating** ’. We will update the system later.

5. Select your keyboard layout, if using ‘English (US)’ click ‘Done’.

7. Select your network adapter. Ensure you have a valid connection and IP address. Since this is going to be used as a server, I recommend using a direct Ethernet connection. This will make the process easier.

9. Leave the proxy address blank.

11. Leave Ubuntu mirror at default.

13. Select the disk you’d like to use. For this demonstration, we will use the entire disk and deselect the LVM group option. You will see a summary of the file system changes.

15. Set up your name, server name, username, and password.

17. \*\*Select ‘Install OpenSSH server’.

19. Skip Snap installs for now.

From here, you’ll want to remove the USB drive and restart your Ubuntu server. After the first boot, you’ll want to log in with the user and password you created when setting up the machine. Once you’re in, run the commands to update your system.

When booted into the server, run apt update commands

```
sudo apt-get update
sudo apt-get upgrade
```

https://youtu.be/lXcfKTNObOo

## Setting up Ubuntu for SSH

Once your system is updated, we're going to need to get the local IP address to SSH into the system. You could do all this on the server machine, but using SSH will make it way easier to copy commands and easily move media files to your new server. First, to find your IP, run the following command.

```
ip a
```

Your IP address will be after ‘inet’ and will likely be the first address that doesn’t end in a 0 or 1. For my machine, the local IP address is 192.168.0.60, so that's what I’ll be using for the rest of this article.

Once you have this done, you’ll want to make sure you have OpenSSH installed on your main computer. You can run “ssh” in the terminal to check. As a reminder, this will only work on your local network. In order to connect to a machine outside of your home network, you will want to set up port forwarding and add additional security to your systems.

Once you have OpenSSH installed, you can SSH into your new server.

```
ssh 192.168.0.yourip
```

It will ask you for your password, and once you are in, it will look like a normal terminal instance, but it will be for the server, as it will display as username@servername. Once you are in, we can set up Plex.

## Download and Install PLEX

Download using this command. This may be an older version, but we will update shortly.

```
wget https://downloads.plex.tv/plex-media-server-new/1.19.3.2852-219a9974e/debian/plexmediaserver_1.19.3.2852-219a9974e_amd64.deb
```

Install using the dpkg command

```
sudo dpkg -i plexmediaserver_1.19.3.2852-219a9974e_amd64.deb
```

## Enable and Update the PLEX server

Enable the Plex media server on boot:

```
sudo systemctl enable plexmediaserver.service
```

Start the Plex media server:

```
sudo systemctl start plexmediaserver.service
```

Verify the status of Plex media server service:

```
sudo systemctl status plexmediaserver.service
```

Once we know it works and verify that the service is running, we can add the plexmediaserver to your repositories. Doing this will allow Ubuntu to update PLEX using the standard updating commands.

```
echo deb https://downloads.plex.tv/repo/deb public main | sudo tee /etc/apt/sources.list.d/plexmediaserver.list
```

```
curl https://downloads.plex.tv/plex-keys/PlexSign.key | sudo apt-key add -
```

Update PLEX by running the system update and upgrade commands.

```
sudo apt-get update
sudo apt-get upgrade
```

## Accessing PLEX Server

You should now be able to visit [http://192.168.0.60:32400/web](http://192.168.0.60:32400/web?ref=techhut.tv) and connect via the PLEX web interface. After you login to an account it will ask you where your media is stored. You should always plug a USB in and move files using commands, but we are going to go the easy route.

Open Dolphin or another file browser and connect to the server via sftp. Change my local IP address for yours. _sftp://brandon@192.168.0.60_

Now you have full control over the file system on the server. When I do this, I create a media folder in my home directory, and within the media folder, I make one for movies and one for shows. The organization of this is all up to you. Move your files into a media directory on your new server.

I recommend checking out this article from PLEX, which will show you how to name your file to help PLEX organize the metadata of your media files.

File Naming Tips: [Installation | Plex Support](https://support.plex.tv/articles/200288586-installation/?ref=techhut.tv)

## Laptop Tip: Disable Suspend on Lid Close.

We will need to edit the Systemd login configuration file to do this.

```
sudo nano /etc/systemd/logind.conf
```

When editing this, you should only need to uncomment and change the first HandleSuspendKey option, but you can edit the addition setting depending on your hardware. “Uncomment” the following keys and change their values to ignore:

```
HandleSuspendKey=ignore
HandleLidSwitch=ignore
HandleLidSwitchDocked=ignore
```

```
sudo systemctl restart systemd-logind
```

## Done!

Video Timestamps
00:00 – Introduction
01:40 – Ubuntu Server USB
03:48 – Installing Ubuntu Server
10:00 – First Boot Steps
11:49 – SSH into Server (terminal)
14:40 – Install/Enable PLEX
17:05 – SFTP into Server (files)
19:40 – Laptop Lid Tips
21:35 – Setting up PLEX
24:46 – Thank you! pls sub

You can now finish the setup in your web portal and access your content essentially anywhere. Using the PLEX app on smart devices and TVs.
