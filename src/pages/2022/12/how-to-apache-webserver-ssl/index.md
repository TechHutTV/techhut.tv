---
title: "How to make an Apache Webserver with SSL"
date: "2022-12-05"
url: how-to-apache-webserver-ssl
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "Homelab"
  - "Apache"
---

Creating a basic Apache web server is often the first step in your web development journey. Apache is the base requirement for many web applications and products. Better yet, you can use an Apache web server to host your self-made or generated static websites with something like HUGO.

In this video, we will be using Linode to host the server. You can use any VPS provider or even do this on your own hardware. Linode sponsors the companion video attached to this article, and if you use our link, you can get a $100 60-day credit. Below is the full video with all the steps and commands needed.

https://youtu.be/VXSgEvZKp-8

## VPN and Domain

First, set up your VPN. With Linode, all you need to do is create a new Linode and select your distro; for this, I use Ubuntu 22.04 and pick your region and plan. For the plan, you can start with the $5/month plan, and you can upgrade as needed. Pick a strong root password and if you'd like setup your SSH key for added security.

For my demo, I used Linode's domain manager. You can set up your domain using A records with your IP address. All I did was point the root '@' to the Linode IP. For more information on domains, check the links below.

[https://www.linode.com/docs/products/networking/dns-manager](https://www.linode.com/docs/products/networking/dns-manager)

## Initial Setup

After creating our Linode, you can log in via SSH on your local terminal application of choice. You will have the command on your dashboard. Once you sign in, the very first thing you should do is update your server.

```
apt update && apt upgrade -y
```

Next, lets change our host files to match with the domain we will be hosting.

```
nano /etc/hostname
```

Change the value 'localhost' to 'example.com', replacing the example with your domain.

```
nano /etc/hosts
```

Add a new line under the local host line and match it with the image below.

Now, lets create a limited sudo user. You can make the username anything you'd like just replace 'brandon' with your username of preference. When you input the first command it will ask you for your name and other information. You can press enter to skip or fill out the information. Then we will add the user to the sudo group and switch to that user.

```
adduser brandon
```

```
adduser brandon sudo
```

```
su brandon
```

The steps below to disable root login are optional but are recommended steps for security.

Open the file `sshd_config` located in the `/etc/ssh` directory using Nano or your favorite text editor.

```
sudo nano  /etc/ssh/sshd_config
```

Change the value of the key `PermitRootLogin` from `yes` to `no`

Save and close the file.

Next, you will restart the `sshd` daemon to read the configuration after your modifications.

Use the following command to restart the daemon:

```
sudo systemctl restart sshd
```

Now, it is recommended we reboot our server as some updates will need you to, and this will update the host files.

## Install and Configure Apache

Now, we get to install Apache and set up our very first website. Log back into your server via SSH, this time using the username instead of root. Then type the command below to install the needed packages, and check to see if it is running.

```
sudo apt install apache2 apache2-docs apache2-utils
```

```
systemctl status apache2
```

At this point you can see if it is working on a web browser and check to see if the domain has fully propagated over if you changed any nameservers. Simply copy/paste your IP into the web browser's address bar and you should see the Apache2 Default Page. Use the commands below to disable the default website, as we will be creating our own directories and configurations later.

```
sudo a2dissite 000-default.conf
```

```
sudo systemctl reload apache2
```

## Firewall Configuration

Now, we need to enable and allow some applications with our firewall. The default firewall application in Ubuntu makes this really easy to do. To see a list of applications, just run the command below.

```
sudo ufw app list
```

The applications we will be allowing is Apache Full and OpenSSH

```
sudo ufw allow 'Apache Full'
```

```
sudo ufw allow OpenSSH
```

From here, let's enable our firewall and check its status.

```
sudo ufw enable
```

```
sudo ufw status
```

## Creating Website

Creating directories for our website is easy and it will be done in the default /var/www/html directory. With the commands below replace 'example.com' with the domain you'll be using.

```
cd /var/www/html
```

```
sudo mkdir example.com
```

```
cd example.com
```

```
sudo mkdir public_html
```

```
sudo mkdir logs
```

```
sudo mkdir backups
```

After creating our directories, we will return to the location of the site configurations and create a new one for our website.

```
cd /etc/apache2/sites-available
```

```
sudo nano example.com.conf
```

Within this configuration, you'll want to copy/paste the configuration below, replacing everything to match your setup.

```
<VirtualHost *:80>
     ServerAdmin webmaster@example.com
     ServerName example.com
     ServerAlias www.example.com
     DocumentRoot /var/www/html/example.com/public_html/
     ErrorLog /var/www/html/example.com/logs/error.log
     CustomLog /var/www/html/example.com/logs/access.log combined
</VirtualHost>
```

Now, we run a few commands to enable our new configuration.

```
sudo a2ensite example.com
```

```
systemctl reload apache2
```

Now, if you travel to your website, you should see the standard 'Index of /' page, meaning we have been successful so far! From here, you can create an index.html file to confirm for sure. See the video for an example of how to do this.

## Installing SSL Certification

An SSL certificate is a digital certificate that authenticates a website's identity and enables an encrypted connection. SSL stands for Secure Sockets Layer, a security protocol that creates an encrypted link between a web server and a web browser. In the modern web, it is a basic requirement. To install an SSL certificate, make sure your domain is properly linked to your new Apache server and follow the steps below.

```
sudo apt install certbot python3-certbot-apache
```

```
sudo certbot --apache -d example.com
```

When you run the command above, it will prompt you for more information. Read all the prompts and fill out any information as needed. If it was successful, you'll get a message, and now you can visit your new website with https.
