---
title: "Install DaVinci Resolve in Any Linux Distro Using DavinciBox (2025)"
date: "2025-07-17"
url: install-davinci-resolve-linux-ubuntu-arch-fedora-davincibox
draft: false
authors:
  - "Cameron Knauff"
categories:
  - "Guides"
tags:
  - "Guides"
  - "DaVinci Resolve"
  - "Linux"
---

# The Easiest Way to Install DaVinci Resolve on Linux

Blackmagic didn’t sponsor this article, but DaVinci Resolve is an incredibly powerful video editor, comparable to Adobe Premiere Pro. It offers an impressive free version that provides nearly full functionality, and its Studio version offers additional benefits, which is why we use it for video editing on the YouTube channel. For those looking to avoid subscriptions, DaVinci Resolve Studio is available for a one-time payment of $300, a cost that can be easily recouped if you're using it for YouTube videos or client work.

Another significant advantage of DaVinci Resolve is its native Linux support, making it the only high-caliber editor with this feature. However, there's a major caveat to its Linux support: the installation process can be challenging. The Linux version of DaVinci Resolve is widely adopted in studios for color-grading and VFX, with 60% of VFX artists reportedly running Linux. Despite this, DaVinci Resolve targets enterprise Linux distributions, which often have older dependencies. This means that on newer distributions like Fedora or non-LTS Ubuntu (common for home desktop users), many newer dependencies can cause DaVinci Resolve to break. Consequently, getting it to run on a non-enterprise Linux distribution can be very difficult. While one could opt for an enterprise Linux distribution, this is often not preferred for a personal desktop. Fortunately, using Docker containers via Distrobox, you can now install DaVinci Resolve on any Linux distribution thanks to DaVinciBox. Docker’s versatility allows it to run nearly anything.

# Prerequisites

Before running DavinciBox, several prerequisites must be met. You need either DistroBox or Toolbox installed on your system. These tools enable the installation of Linux distribution containers on top of a base host, allowing you to use specific tools for your chosen distribution. They are particularly useful for developing software for a distribution with different package versions than your current one (e.g., developing for Debian on Fedora). Distrobox is generally recommended over Toolbox due to more extensive experience with it, greater customizability, more features, and wider usage. More information about Distrobox is available in a dedicated video. Toolbox offers a simpler, more reliable, and lighter alternative, but DavinciBox is primarily designed for Distrobox, with Toolbox as an added option, making Distrobox the preferred choice for this task.

To proceed, install both Distrobox and Podman, which will serve as the backend for Distrobox. Podman, a Red Hat developer alternative to Docker (which is Open Core), acts as a drop-in replacement for Docker and is what DavinciBox utilizes for its container. Additionally, `lshw` is required for DavinciBox to detect your graphics card and install appropriate drivers, and `git` is needed to fetch the DavinciBox repository. From the terminal, execute:

Ubuntu/Debian/Linux Mint: `sudo apt install distrobox podman lshw git` 
Fedora/Red Hat/Alma/CentOS: `sudo dnf install distrobox podman lshw git`
OpenSUSE: `sudo dnf install distrobox podman lshw git`
Arch: `sudo pacman -S distrobox podman lshw git`

If you are using an NVIDIA Graphics Card, you might need to install the NVIDIA Container Toolkit. This is a straightforward process, though not covered here due to lack of NVIDIA hardware. For Fedora or RHEL users with SELinux, an SELinux module might be necessary to use an NVIDIA GPU; Red Hat provides a helpful blog post on resolving this issue. All commands and minor fixes mentioned will be linked in the description.

For AMD Graphics Card users with an RX 5000 series (using the ROCm driver) on Ubuntu/Debian, Podman support needs to be installed via the `rocm-podman-support` package. Troubleshooting steps for RX 500 series or older AMD cards, or Intel GPUs that don’t work out of the box, will be provided later.

Ubuntu/Debian/Linux Mint on RX 5000 Series AMD GPUs only: `sudo apt install rocm-podman-support`

# Installing Davinci Resolve

To install DaVinci Resolve, first download the installer from the [Davinci Resolve website](https://www.blackmagicdesign.com/products/davinciresolve). Select “download now” and choose the free Linux version for either regular DaVinci Resolve or DaVinci Resolve Studio.

Next, open your terminal, navigate to your downloads directory using `cd downloads`, and then clone the DavinciBox repository by running `git clone https://github.com/zelikos/davincibox.git`. Change into the `davincibox` directory using `cd davincibox`. Move the downloaded `.run` file from your Downloads folder into the `davincibox` directory. From the terminal, grant executable permissions to the `setup.sh` script with `chmod +x setup.sh`, and then run it with `./setup.sh DaVinci_Resolve_{Version}.run`. Allow the installation to complete, and a DaVinci Resolve launcher should appear in your application menu.

# Upgrading Davinci Resolve

To upgrade DaVinci Resolve, repeat the installation process. Navigate to the DavinciBox folder in the terminal, run `git pull` to get the latest version of DavinciBox, then execute `./setup.sh upgrade` to remove existing containers, and finally run `./setup.sh DaVinci_Resolve_{Version}.run` again.

# Removing DaVinci Resolve

To remove DaVinci Resolve, simply run `./setup.sh remove`.

# Troubleshooting

Here are some troubleshooting tips:

## Older AMD/Intel GPUs

If you have an AMD 500 Series GPU or older, or if your Intel GPU isn't working as expected, you can switch to `mesa-opencl`. To do this, enter the container with `distrobox enter davincibox`, then run `sudo dnf install mesa-libOpenCL`. Next, edit the `DaVinciResolve.desktop` file by running `nano ~/.local/share/applications/DaVinciResolve.desktop`. Locate the `Exec=distrobox-enter` line and add `-c` after the `/usr/bin/run-davinci` part. This should resolve the issue.

## No Audio Output on Older Linux Distros

Most modern Linux distributions use Pipewire audio, which Distrobox supports natively. However, if you are on an older distribution that still uses Pulseaudio, you need to install Alsa support inside Distrobox. This is achieved with the following steps:
* Enter the Distrobox container: `distrobox-enter -n davincibox`
* Remove `pipewire-alsa`: `sudo dnf remove pipewire-alsa`
* Add Pulseaudio support for Alsa: `sudo dnf install alsa-plugins-pulseaudio`

## Resolve Studio crashes on "Checking Licenses..." for USB License Key

If you are using a USB License Key and DaVinci Resolve Studio crashes at "Checking Licenses...", you may need to add some udev rules to the container. Execute the following command to add a udev configuration file:

`printf 'SUBSYSTEM=="usb", ATTR{idVendor}=="096e", TAG+="uaccess"\nSUBSYSTEM=="usb", ATTR{idVendor}=="096e", MODE="0664", GROUP="users"\n' | sudo tee /etc/udev/rules.d/90-davinci-usb.rules > /dev/null`

Afterward, either reboot your system or run `sudo udevadm control --reload-rules && sudo udevadm trigger` to reload the udev rules.

## Dual GPU Systems

For dual GPU systems, you can switch between GPUs through the container. Enter the container with `distrobox enter davincibox`, then run `list-gpus` to obtain a numerical ID for each GPU. To set DaVinci Resolve to use a specific GPU, run `sudo sed -i "s,switcherooctl launch,switcherooctl launch -g {gpu_id}," /usr/bin/run-davinci`, replacing `{gpu_id}` with the desired GPU's number.

## Resolve Studio Making You Re-enter License Key on New WiFi Networks

If DaVinci Resolve Studio through DaVinciBox repeatedly asks for the license key when switching WiFi networks, it's likely due to some Linux distributions rotating MAC addresses for privacy. DaVinci Resolve uses your MAC address as part of its hardware license assignment. To fix this, add a NetworkManager rule to disable rotating MAC addresses. Run the following command: `sudo bash -c 'echo "[connection-90-wifi-mac-addr-conf] wifi.cloned-mac-address=permanent" > /etc/NetworkManager/conf.d/90-wifi-mac-addr.conf' && sudo systemctl restart NetworkManager`. This creates an overwrite configuration that disables MAC address randomization and restarts Network Manager. Be aware that this does have a minor impact on your privacy.

## Other Small Bugs Found

Due to containerization, a couple of minor bugs have been observed. Specifically, the button to open the plugin directory for installing plugins does not work, requiring manual navigation to the location in your home folder. Additionally, some help menus that attempt to open a browser will also fail. However, apart from these minor issues, all other tested functionalities within DaVinci Resolve work well with this method, providing an excellent way to install DaVinci Resolve without concerns about random compatibility issues with dependencies.

Overall, DavinciBox is a great way to get around the dependency quirks DaVinci Resolve has targetting Enterprise Linux, and while it does have its own container-related quirks, it does greatly simplify the process of installing DaVinci Resolve on Linux.
