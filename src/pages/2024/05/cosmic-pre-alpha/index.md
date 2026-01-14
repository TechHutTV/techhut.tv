---
title: "COSMIC might be the future of the Linux Desktop."
date: "2024-05-26"
url: cosmic-pre-alpha
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Software"
tags:
  - "Linux"
  - "Desktop Environments"
  - "Distros"
  - "Pop!_OS"
---

This is my first look at the upcoming Linux desktop developed by System76. For many, desktop Linux has felt stagnant over the past year. Major distribution updates have been largely uneventful, and many distros seem to release gimmick features that aren’t particularly useful. However, there’s a fresh wind of excitement in the air with the upcoming alpha release of the Cosmic desktop environment. Here’s a dive into why Cosmic might be the breath of fresh air that desktop Linux needs.

https://youtu.be/aorVb1SNR7Y

#### Resources

[GitHub - pop-os/cosmic-epoch: Next generation Cosmic desktop environment](https://github.com/pop-os/cosmic-epoch)

[COSMIC: The Road to Alpha - System76 Blog](https://blog.system76.com/post/cosmic-the-road-to-alpha)

[A Blog to Satisfy Your Monthly COSMIC Fix(es) - System76 Blog](https://blog.system76.com/post/your-monthly-cosmic-fix)

[COSMIC: More Alpha, More Fun! - System76 Blog](https://blog.system76.com/post/cosmic-more-alpha-more-fun)

#### Anticipation for Cosmic

The development of Cosmic has been ongoing for quite some time. Occasionally, I manually pull and build the desktop to check its usability. Recently, I found it quite functional, fueling my excitement for its alpha release.

#### Installing Cosmic

Let’s walk through the installation process. Note: this should be done on a test machine, not your main system.

1. **Dependencies**: Open your terminal and paste the necessary commands from the [Cosmic GitHub repository](https://github.com/pop-os/cosmic-epoch). This installs required dependencies.
    `sudo apt install just rustc libglvnd-dev libwayland-dev libseat-dev libxkbcommon-dev libinput-dev udev dbus libdbus-1-dev libsystemd-dev libpulse-dev pop-launcher libexpat1-dev libfontconfig-dev libfreetype-dev mold cargo libgbm-dev libclang-dev libpipewire-0.3-dev libpam0g-dev -y`

3. **Enable Wayland**: Edit the gdm3 configuration file to enable Wayland.
    `sudo nano /etc/gdm3/custom.conf`
    `WaylandEnable=false` to `true`.

5. **Nvidia Users**: If you have an Nvidia card, follow the specific instructions to ensure compatibility.

7. **Restart GDM**: After making changes, restart the display manager.
    `sudo systemctl restart gdm`

9. **Install Cosmic**: Finally, install the Cosmic session.
    `sudo apt install cosmic-session`

#### Exploring Cosmic

Once installed, you’ll notice several new features and improvements:

- **Cosmic Greeter**: The new greeter is still under development, with some functionalities not fully operational. It provides a modern login interface with profile pictures and a password field.

- **Wayland Session**: Select the Wayland session during login. If it doesn’t appear, recheck your setup.

#### Customizing Cosmic

Cosmic offers a range of customization options:

- **Desktop and Panel Settings**: Adjust window controls, panel positions, and dock settings. While some features are still in development, initial customization options are promising.

- **Dock Applets**: Add, remove, and customize applets. For example, you can add network applets or workspace switchers.

- **Appearance Settings**: Choose between light and dark modes, change accent colors, and adjust panel styles. Although the options are currently limited, they offer a good starting point for personalization.

#### Applications and Tools

Cosmic includes several new applications and tools:

- **Cosmic Terminal**: A sleek, integrated terminal with tiling and tabbed interfaces.

- **Cosmic Editor**: A minimalist text editor with syntax highlighting, perfect for quick configuration edits.

- **Cosmic Files**: A new file manager that handles typical file management tasks efficiently. Remote connection support is expected in future updates.

- **Cosmic App Store**: A new application store, integrated with FlatHub by default. It's faster and more responsive than the previous Pop Shop.

#### Performance and Usability

Despite being in pre-alpha development, Cosmic shows promising performance. The tiling window management is smooth, and fractional scaling works well. Some features, like the screenshot tool and system settings, are still basic but functional.

### Conclusion

The Cosmic desktop environment is shaping up to be a significant advancement for desktop Linux. While it's not yet in alpha, it’s already showing great potential. I’m eagerly awaiting its beta release, after which I plan to make it my primary driver and document my experience.

Stay tuned for more updates and a detailed review once Cosmic hits beta. If you’re interested in following this journey, consider subscribing and ringing the bell to get notified of new posts. Have an absolutely beautiful day and happy computing!
