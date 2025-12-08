---
title: 'Ultimate Immich Guide - Ditch Google/Amazon Photos'
date: '2025-11-05'
url: ultimate-immich-guide-ditch-google-amazon-photos
draft: true
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Docker"
  - "Self-Host"
  - "Linux"
  - "Hardware"
  - "Guides"
---
# Knowledge Hub

# The Ultimate Immich Guide: Ditch Google and Amazon Photos for Good

A vast majority of people with a smartphone are, by default, uploading their most personal pictures to Google, Apple, Amazon—whoever. Personally, I firmly believe companies like this don't need my photos. You can keep that data yourself, and Immich makes it genuinely easy to do so.

We're going through the entire Docker Compose stack, enabling hardware acceleration for machine learning, configuring all the settings I actually recommend changing, and setting up secure remote access so you can back up photos from anywhere.

## Why Immich Over the Alternatives

Two things make Immich stand out from other self-hosted photo solutions. First is the feature set—it's remarkably close to what you get from the big cloud providers. You've got a world map with photo locations, a timeline view, face recognition that actually works, albums, sharing capabilities, video transcoding, and smart search. It's incredibly feature-rich software.

Second is the mobile app. Most of those features are accessible right from your phone, and the automatic backup from your camera roll works great. Combining it with NetBird makes backing up your images quick and secure with WireGuard working for us in the background.

Immich hit stable v2.0 back in October 2025, so the days of "it's still in beta" warnings are behind us. The development pace remains aggressive with updates rolling out regularly, but the core is solid.

## Hardware Considerations

I'm not going to spend too much time on hardware specifics because setups vary wildly. For some of the machine learning features, you might want a GPU or at least an Intel processor with Quick Sync. But honestly, those features aren't strictly necessary. For most of us CPU transcoding will be fine.

The main consideration is storage. How much media are you actually going to put on this thing? In my setup, all my personal media sits around 300GB, but with additional family members on the server, everything totals just about a terabyte. And with that we need room to grow so plan accordingly.

For reference, my VM runs with 4 cores and 8GB of RAM. The database needs to live on an SSD, this isn't optional. Network shares for the PostgreSQL database will cause corruption and data loss. Your actual photos can live on spinning rust or a NAS share, but keep that database on local SSD storage.

## Setting Up Ubuntu Server

I'm doing this on Ubuntu Server running as a VM on Unraid. You don't have to use Unraid, as TrueNAS, Proxmox, and other solutions work great, or you can install Ubuntu directly on hardware. The process is close to the same regardless.

If you're installing fresh, grab the Ubuntu Server ISO and flash it with Etcher or Rufus depending on your OS. During installation, I typically skip the LVM group option and go with standard partition schemes. There's documentation on LVM if you want to read more about it, but I've never found it necessary for this use case.

The one thing you absolutely want to enable during setup is the OpenSSH server. Skip all the snap packages, we don't need them.

Once you're booted in, set a static IP through your router. Check your current IP with:

```bash
ip a
```

Then navigate to your router's admin panel and assign a fixed IP to this machine or VM. How you do this varies by router, so check your manual if needed. I set mine to `immich.lan` for convenience.

First order of business on any fresh Linux install is to update everything:

```bash
sudo apt update && sudo apt upgrade -y
```

## Installing Docker

Docker's official documentation has a convenience script that handles everything. SSH into your server and run:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

This installs Docker, Docker Compose, and all the dependencies. Next, add your user to the docker group so you don't need sudo for every command:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

That's the bulk of the prerequisites handled.

## The Docker Compose Setup

Immich recommends Docker Compose as the installation method, and I agree. Create a directory and grab the official files:

```bash
mkdir immich && cd immich
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env

```

Rename the example environment file:

```bash
mv example.env .env

```

Now edit the environment variables:

```bash
nano .env

```

The key variables to change:

```bash
# Where your photos will be stored
UPLOAD_LOCATION=/mnt/user/images

# Database location - MUST be on SSD
DB_DATA_LOCATION=./postgres

# Your timezone
TZ=America/Los_Angeles

# Latest stable version
IMMICH_VERSION=v2

# Change this to something secure (alphanumeric only)
DB_PASSWORD=your_secure_password_here

```

For my setup, the upload location points to an Unraid share where my storage array lives. The database stays in the local directory on SSD storage. Adjust these paths for your environment.

## Enabling Hardware Acceleration

If you have Intel Quick Sync, an NVIDIA GPU, or AMD graphics, you can offload transcoding from the CPU. Grab the hardware acceleration config:

```bash
wget https://github.com/immich-app/immich/releases/latest/download/hwaccel.transcoding.yml

```

Edit your `docker-compose.yml` and find the `immich-server` section. Uncomment the extends block and set your hardware type:

```yaml
extends:
  file: hwaccel.transcoding.yml
  service: quicksync  # or nvenc, vaapi, rkmpp depending on your hardware

```

For machine learning acceleration, grab that config too:

```bash
wget https://github.com/immich-app/immich/releases/latest/download/hwaccel.ml.yml

```

In the `immich-machine-learning` section, add the extends configuration. For Intel, you'll use `openvino`:

```yaml
immich-machine-learning:
  container_name: immich_machine_learning
  image: ghcr.io/immich-app/immich-machine-learning:${IMMICH_VERSION:-release}-openvino
  extends:
    file: hwaccel.ml.yml
    service: openvino

```

If you're on Proxmox, make sure Quick Sync is passed through in your VM's hardware options. You can verify the device is available with:

```bash
ls /dev/dri

```

## First Boot and Initial Setup

Fire up the stack:

```bash
docker compose up -d

```

The first run pulls several gigabytes of container images, so give it time. Once everything's running, access the web interface at `http://your-server-ip:2283`.

The first user to register becomes the administrator, so create your account immediately. You'll run through an initial setup wizard covering theme preferences, privacy settings, and storage templates.

### Storage Template Configuration

This is actually important. The storage template determines how Immich organizes files on disk. I use a custom template that creates year and month folders:

```
{{y}}/{{MM}}-{{MMMM}}/{{y}}-{{MM}}-{{dd}}_{{filename}}

```

This gives me a folder structure like `2025/06-June/` with filenames that include the date. I don't take a crazy amount of pictures, so monthly folders work fine. Adjust this to your preferences, but think about it now—changing it later requires running a migration job.

## Server Settings

Under Administration → Settings, there are a few things I always adjust or recommend taking a look at:

**Image Settings**: The default thumbnail format is WEBP. I change this to JPEG because I don't like WEBP for basically any situation as it’s much harder to work with outside of the web browser.

**Job Settings**: These control background tasks like thumbnail generation and face detection. If you notice a specific job hammering your system, you can reduce its concurrency here.

**Machine Learning**: The default models work well. I've never changed them and haven't had problems. If you want to run the ML container on separate, beefier hardware, you can point to a different URL here.

**Video Transcoding**: This uses FFmpeg on the backend. The defaults are reasonable, but you can customize encoding options if you have specific preferences.

## Remote Access with NetBird

For accessing Immich outside your home network, you have options. You can set up a traditional reverse proxy with something like Nginx or Caddy, but I use NetBird. Full disclosure—I work for NetBird, so I'm biased toward this solution, but it genuinely makes this easier.

If you already have NetBird running on your network, you can add your Immich server as a peer:

```bash
curl -fsSL https://pkgs.netbird.io/install.sh | sh
netbird up --setup-key your-setup-key-here

```

Then in the NetBird dashboard, create an access policy that allows your devices to reach port 2283 on the Immich peer. Now you can access your instance from anywhere using the NetBird DNS name or peer IP—no port forwarding, no exposing services to the internet.

If you prefer the traditional route, Immich works behind any reverse proxy. Just note that it must run at the root of a domain or subdomain (`photos.yourdomain.com`), not a subpath. Make sure your proxy is configured for WebSocket support and has generous timeouts for large uploads.

## Bulk Uploading with Immich-Go

Dragging and dropping files through the web UI works, but it's tedious for large libraries. [Immich-Go](https://github.com/simulot/immich-go) handles bulk uploads much better.

First, generate an API key in Immich. Go to your profile → Account Settings → API Keys → New API Key. Give it full permissions and save the key somewhere.

Download Immich-Go for your system from the releases page, then run:

```bash
./immich-go upload \
  --server=http://your-server-ip:2283 \
  --api-key=your-api-key \
  /path/to/your/photos

```

If you're migrating from Google Photos via Takeout, Immich-Go handles the metadata mess Google creates. For some reason, Takeout extracts metadata to separate JSON files instead of keeping it embedded in the images. Immich-Go reassociates everything properly:

```bash
./immich-go upload from-google-photos \
  --server=http://your-server-ip:2283 \
  --api-key=your-api-key \
  --sync-albums \
  takeout-*.zip

```

Always do a dry run first with `--dry-run` to see what it's going to do before committing.

## Mobile App Setup

Grab the Immich app from the App Store, Play Store, or F-Droid. Enter your server URL and login credentials. For remote access, use either your public URL or NetBird address depending on your setup.

To enable automatic backup, tap the cloud icon and select which albums to sync. Under settings, you can configure WiFi-only backup and charging-only backup to preserve battery and cellular data. The storage indicator feature shows a cloud icon on photos that have been synced, which helps you know what's backed up.

iOS users should enable Background App Refresh and keep Low Power Mode disabled for reliable background uploads. Android handles this better out of the box but might need battery optimization disabled for the Immich app.

## Backup Strategy

Immich stores your photos as files but tracks all the metadata, faces, albums, and relationships in PostgreSQL. You need to back up both components—losing either means losing your library.

The database dumps automatically to `UPLOAD_LOCATION/backups/` daily at 2 AM. For manual backups:

```bash
docker exec -t immich_postgres pg_dumpall --clean --if-exists \
  --username=postgres | gzip > immich-db-backup.sql.gz

```

Back up your database dumps and the `library/` and `upload/` directories. You can skip `thumbs/` and `encoded-video/` since Immich regenerates those.

For a proper 3-2-1 strategy, you want three copies of your data on two different media types with one copy offsite. I'll be doing a dedicated video on backup strategies, so subscribe if you want to catch that.

## What's Next

This covers the core setup, but Immich has more depth worth exploring. External libraries let you index existing photo directories without copying files into Immich's storage. The machine learning models can be swapped for different accuracy/performance tradeoffs. Partner sharing lets family members see each other's photos without full account access.

The [official documentation](https://immich.app/docs) covers all of this in detail. For issues or questions, the community on Reddit and GitHub discussions is genuinely helpful.

Once you've got everything running, you can finally delete those cloud storage subscriptions. Your photos stay on hardware you control, no monthly fees, no storage limits, no training someone else's AI models with your personal memories.

</article>
