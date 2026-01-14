---
title: "Install DaVinci Resolve in Linux (Outdated)"
date: "2022-02-13"
url: how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "DaVinci Resolve"
  - "Linux"
---

Installing DaVinci Resolve in Linux is not the easiest thing to do despite its native support. Resolve is a professional-level video editor that requires a very specific environment to run properly. Below are the minimum requirements.

**Minimum system requirements for Linux**

- CentOS 7.3

- 16-32 GB of system memory

- Discrete GPU with at least 2GB of VRAM

- GPU which supports OpenCL 1.2 or CUDA 11

- NVIDIA/AMD Driver version – As required by your GPU

_**Important Note**: Using the free version of DaVinci Resolve in Linux will require uncompressed .mov files. These file sizes are LARGE, around 5-30 GB for a 10min video. If this is a no-go for you, I’d recommend Kdenlive._

As you can see, the software has some hefty requirements. This application will not run on integrated graphics and is very specific about the CentOS requirement. Luckily, there are tools and other options for installing Resolve on Fedora, Debian/Ubuntu, and Arch-based systems.

_As of writing this, I’ve only had repeated success installing DaVinci Resolve with an AMD GPU in an Arch Linux system. So please refer to the Arch guide below if you’re running Team Red._

### Fedora (NVIDIA)

If you are running Fedora AND have an NVIDIA GPU in your system, you are in the best spot for running Resolve. Fedora and CentOS both fall under the umbrella of Red Hat Linux. Fedora is developed by the community-backed Fedora project. With this comes similar code; thus, we are able to use the files directly from Blackmagic Design.

First, make sure you have the proper drivers. You’ll need RPM Fusion enabled. I recommend following the wiki, but you’ll definitely need the CUDA driver. Install it using the command below.

```
sudo dnf install xorg-x11-drv-nvidia-cuda
```

Once you have the NVIDIA drivers properly set up on your system, you’ll want to head over to Blackmagic Design and download the official installer \*.zip archive. Once downloaded, open the terminal, go to the download directory, and extract the files.

```
cd ~/Downloads
unzip DaVinci_Resolve_Studio_17.1.1_Linux.zip
```

Now, we need to ensure the installer .run file can be extracted.

```
sudo chmod +x DaVinci_Resolve_17.1.1_Linux.run
```

Now, we will run this command to execute the installer.

```
sudo ./DaVinci_Resolve_17.1.1_Linux.run
```

When the installer opens, running through it is fairly simple. Hit next, skim through the read me, agree to their terms of service, and click start to install. And that’s it—launch the application and have fun.

## Fedora (AMD)

I had success once using this guide on Reddit. When I tried to do it a second time, my drivers had an error, and there was a white screen on the boot. Proceed with caution and make sure your system is backed up with Timeshift or another tool. I do not recommend this, but here is the resource.

[GUIDE : Installing OpenCL alongside Mesa drivers for Blender/Darktable. Fedora and RHEL (Updated 2021)](https://www.reddit.com/r/Fedora/comments/m2il41/guide_installing_opencl_alongside_mesa_drivers/?ref=techhut.tv)

**EDIT: As of May 2024, just run `sudo dnf install mesa-libOpenCL apr apr-util` [as stated by the Nobara team.](https://www.techhut.tv/how-to-install-davinci-resolve-in-linux-ubuntu-arch-and-fedora/)**

## Debian/Ubuntu (NVIDIA)

First, let's update our system and grab some dependencies.

```
sudo apt update
sudo apt upgrade
sudo apt-get install fakeroot xorriso
```

Now, let's make sure we have the proper NVIDIA drivers installed.

```
sudo apt-get install nvidia-driver nvidia-opencl-icd libcuda1 libglu1-mesa
sudo apt-get install libnvidia-encode1
```

Next, you’ll want to Go to Blackmagic Design and download the official installer \*.zip archive. Then, go to [Daniel Tufvesson | MakeResolveDeb](https://www.danieltufvesson.com/makeresolvedeb?ref=techhut.tv) and download the latest MakeResolveDeb into the same directory.

Now, we need to extract the archived files we downloaded. The easiest way is to open a terminal application and run the following command. Change the directory as needed.

```
cd ~/Downloads
unzip DaVinci_Resolve_Studio_17.1.1_Linux.zip
tar zxvf makeresolvedeb_1.5.0_multi.sh.tar.gz
```

Once extracted, you should have these two files in the directory.

```
DaVinci_Resolve_Studio_17.1.1_Linux.run
makeresolvedeb_1.5.0_multi.sh
```

With the terminal open in the correct directory, we are going to use the makeresolvedeb script to convert the .run file into a proper installation file for Debian-based systems. Run the following command.

```
./makeresolvedeb_1.5.0_multi.sh DaVinci_Resolve_Studio_17.1.1_Linux.run
```

This will take a bit and be resource-intensive. When indicated by the last line saying “\[DONE\]” and the reported number of errors 0 you can move on to the next step.

We will now use dpkg to install the Debian package. Make sure you replace the file name with the proper version.

```
sudo dpkg -i davinci-resolve_17.1.1-mrd1.0_amd64.deb
```

That’s it! The package is installed, and if everything is set up correctly, it should open with no errors. Please note that occasionally, there are issues with the first welcome screen. You may need to force-close this and re-open the application.

Most content in this section was pulled from [Daniel Tufvesson | MakeResolveDeb](https://www.danieltufvesson.com/makeresolvedeb?ref=techhut.tv). Please refer here for updated information, and FAQ.

## Arch Linux (NVIDIA and AMD)

First, let's get our proper GPU drivers. One of the awesome things about Arch is the AUR and the community around it. Luckily for us, the Arch community has packaged the amdgpu-pro drivers, so it’s an easy installation. You will need AUR access, so make sure you have `yay` or `pamac`.

**AMD GPU Drivers**

```
yay -S amdgpu-pro-libgl opencl-amd
```

**NVIDIA GPU Drivers**

```
pacman -Syu nvidia nvidia-utils opencl-nvidia
```

Now that we have the proper drivers, the AUR will return to help us. Just run the command below to install resolve. As a reminder, if you paid for the full version, you’ll want the -studio package. For the free version, [install](https://wiki.archlinux.org/title/Install?ref=techhut.tv) [davinci-resolve](https://aur.archlinux.org/packages/davinci-resolve/?ref=techhut.tv); for the Studio version, install [davinci-resolve-studio](https://aur.archlinux.org/packages/davinci-resolve-studio/?ref=techhut.tv).

```
yay -S davinci-resolve
```

And that's it! You have it installed. If you’re running an AMD card, there are a few more things to do, as this will require the progl script to run.

To launch DaVinci Resolve with the AMD pro drivers, you must run this in the terminal.

```
progl /opt/resolve/bin/resolve
```

You will notice opening the .desktop application with application menus will result in… nothing happening. We need to fix this by adding the `progl` command to our .desktop file within `usr/share/applications`. Open the terminal and run the following command,

```
sudo nano usr/share/applications/com.blackmagicdesign.resolve.desktop
```

You should see something that looks like this in nano:

```
Version=1.0
Type=Application
Name=DaVinci Resolve
GenericName=DaVinci Resolve
Comment=Revolutionary new tools for editing...>
Path=/opt/resolve/
Exec=/opt/resolve/bin/resolve %u
Terminal=false
MimeType=application/x-resolveproj;
Icon=/opt/resolve/graphics/DV_Resolve.png
StartupNotify=true
Name[en_US]=DaVinci Resolve
StartupWMClass=resolve
```

All we need to do is add `progl` after `Exec=` as if we were running it in the terminal. It should look something like this.

```
Exec=progl /opt/resolve/bin/resolve %u
```

Hit ctrl-o to save the file. Restart or log out of your desktop environment; it should open with no errors!

For more information, including detailed driver support and other helpful information, the Arch wiki is a great place to be: DaVinci Resolve—ArchWiki.

If you have any other suggestions, tips, tricks, or updates, let us know down below!
