---
title: "Monitor AMD RYZEN Temps in Linux"
date: "2021-11-15"
url: monitor-amd-ryzen-temps-in-linux
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "Linux"
  - "Hardware"
---

This article will show you how to monitor CPU temperatures in Linux. Although the title mentions AMD processors, this will work for Intel as well. Two useful tools work for all processors and almost all Linux distributions.

What each sensor name means;

- Tdie: temperature of the dies

- Tctl: junction (Tj) temperature—the interface point between the die and heat spreader

## Lm\_Sensors

![](images/2-lm-sensors.png)

Run Lm\_Sensors with the sensors command in the terminal.

Lm\_Sensors (Linux-monitoring sensors) is a wonderful command-line utility for reading CPU temperature sensors. To learn more about the functionality of lm-sensors, check out this [ArchWiki](https://wiki.archlinux.org/index.php/Lm_sensors?ref=techhut.tv) page.

Install using one of the following commands in thermal.

### Ubuntu

```
sudo apt install lm-sensors
```

### Debian

```
sudo apt-get install lm-sensors
```

### Arch Linux

```
sudo pacman -S lm_sensors
```

### Fedora

```
sudo dnf install lm_sensors
```

After you install lm\_sensors, run the following command to scan your system for available sensors to help you monitor CPU temps. You will need to be a root user to do this. For most Linux distributions, you will need to run the sudo -s command. If this doesn’t work, look up the command for your respective distribution.

```
sudo -s
```

**Warning: Be careful what you do as a root user. You can damage your system.**

```
sensors-detect
```

## Psensor

![](images/3-psensors.png)

Psensor is a tool with a GUI interface that will provide more functionality when it comes to monitoring various sensors throughout your system.

- monitor the temperature of the motherboard and CPU sensors

- monitor the temperature of the NVidia GPUs

- monitor the temperature of the hard disk drives

- monitor the rotation speed of the fans

- monitor CPU usage

Psensor is available in most pre-installed app store repositories.

### Ubuntu/Debian

```
sudo apt-get install lm-sensors hddtemp psensor
```
