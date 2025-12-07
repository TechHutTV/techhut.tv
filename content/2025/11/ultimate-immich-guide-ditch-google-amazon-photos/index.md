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
<article>

# ULTIMATE Immich Guide - DITCH Google/Amazon Photos

## Table of Contents

1. [Introduction](#1-introduction)
2. [What is Image?](#2-what-is-image)
3. [Why Self-Host?](#3-why-self-host)
4. [Requirements](#4-requirements)
5. [Installation Steps](#5-installation-steps)
6. [Configuration](#6-configuration)
7. [Remote Access](#7-remote-access)
8. [Bulk Import](#8-bulk-import)
9. [Backup Strategy](#9-backup-strategy)
10. [Maintenance](#10-maintenance)
11. [Advanced Topics](#11-advanced-topics)
12. [Security Checklist](#12-security-checklist)
13. [Recap & Next Steps](#13-recap--next-steps)
14. [Frequently Asked Questions](#14-frequently-asked-questions)
15. [Further Reading & Community](#15-further-reading--community)
16. [Final Thoughts](#16-final-thoughts)

## 1. Introduction

In today's digital age, we're constantly uploading our precious memories to cloud services like Google Photos and Amazon Photos. But what happens when those services change their policies, disappear, or start selling your data? It's time to take control of your own photo library and host it yourself.

This comprehensive guide walks you through setting up **Image**, an open-source alternative to cloud-based photo storage, using Docker Compose. We'll cover everything from installation to advanced features like machine learning-powered smart search, video transcoding, and API integrations.

Whether you're a tech enthusiast, a privacy-conscious user, or someone looking for a more flexible solution than commercial services, this guide is for you.

## 2. What is Image?

Image is a self-hosted photo and video management application built on modern web technologies. It offers features such as:

- Face recognition and tagging
- Duplicate detection and removal
- Smart search with metadata and AI-powered tags
- Video transcoding for web viewing
- RESTful API for custom integrations
- Webhooks for automation
- Support for multiple users and sharing
- Mobile-responsive web UI

Unlike commercial services, Image stores all your data locally and gives you complete control over your photos and videos.

## 3. Why Self-Host?

Self-hosting your photo library provides several benefits:

- **Privacy**: No third-party access to your photos
- **Control**: You decide how your data is stored and managed
- **Flexibility**: Customizable features and integrations
- **Cost-effective**: No monthly subscription fees
- **Future-proof**: Your data stays with you regardless of service changes

## 4. Requirements

Before diving into installation, ensure you have:

- A Debian-based Linux distribution (Ubuntu, Debian, etc.)
- Docker and Docker Compose installed
- At least 100GB of storage space for your photos
- A stable internet connection for initial setup
- Optional: GPU for machine learning acceleration (Intel iGPU, Nvidia, AMD)

## 5. Installation Steps

### Step 1: Install Docker

```bash
sudo apt update
sudo apt install docker.io docker-compose
```

### Step 2: Clone the Image Repository

```bash
git clone https://github.com/juggernaut-io/image.git
cd image
```

### Step 3: Create Volume Mounts

Create directories for your photos and configuration:

```bash
mkdir -p /mnt/photos
mkdir -p /opt/image/config
```

### Step 4: Configure Environment Variables

Edit `docker-compose.yml` to set your photo directory and other preferences.

### Step 5: Start the Stack

```bash
docker compose up -d
```

## 6. Configuration

Once the containers are running, access the web UI at `http://localhost:2283`. Follow these steps:

1. **Set up storage paths**
2. **Configure backup policies**
3. **Select ML models**
4. **Create user accounts**
5. **Enable notifications**

## 7. Remote Access

To access your image library remotely, use one of these methods:

### Option A: VPN (Recommended)
Set up a VPN server using OpenVPN or WireGuard to securely access your NAS.

### Option B: Reverse Proxy with HTTPS
Use Nginx or Traefik with Let's Encrypt certificates.

### Option C: Dynamic DNS
Use services like DuckDNS or No-IP to map a domain name to your public IP.

## 8. Bulk Import

### Using the Web UI
Navigate to the import section and select your photo directory.

### Using the CLI Tool (`image-go`)
Generate an API key in the web UI, then run:

```bash
image-go import --api-key <your-api-key> --path /mnt/photos
```

## 9. Backup Strategy

Implement a 3-2-1 backup strategy:

1. **3 copies** of your data
2. **2 different media types** (local + cloud)
3. **1 offsite backup** (external drive or NAS)

Schedule regular `pg_dump` backups for the database.

## 10. Maintenance

Regular maintenance tasks include:

- Updating Docker images
- Checking disk space
- Running database vacuum operations
- Monitoring logs for errors

## 11. Advanced Topics

| Feature | How It Works | When to Use |
|---------|--------------|-------------|
| **Smart-search** | ML-based tags + metadata search | If you have a large library or a mix of devices |
| **Duplicate removal** | Generates a list of photos with the same SHA-256 hash | Clean up Google Photos imports that include many duplicates |
| **Video transcoding** | Re-encodes to H.264 for web viewing | Allows you to view long 4K videos in a browser without stuttering |
| **API & Webhooks** | Exposes REST endpoints (auth, upload, delete, list) | Build a custom iOS/Android app, or integrate with home automation |
| **Custom scripts** | Hook into Docker Compose to run cron jobs | E.g., nightly `rsync` from an external NAS |

### Example – Trigger duplicate deletion via API
```bash
curl -X DELETE \
  -H "Authorization: Bearer <API_TOKEN>" \
  http://localhost:2283/api/v1/duplicates
```

### Video Transcoding Options
Add `-F` flag under the `image` service:
```yaml
    environment:
      - IMAGE_FFMPEG_OPTIONS=--vf scale=1280:720 --c:v libx264 -crf 23 -preset veryfast
```

## 12. Security Checklist

| Check | Done? |
|-------|-------|
| Database user/password unique | ✅ |
| Docker group usage | ✅ |
| Container port mapped to firewall | ✅ |
| HTTPS via reverse-proxy or VPN | ✅ |
| Backups to separate media | ✅ |
| Two-factor authentication (if using email) | Optional |
| Remove default admin users | ✅ |
| Log rotation for Docker | Optional |

## 13. Recap & Next Steps

1. **Install Docker** – straightforward on any Debian-based distro.
2. **Download the Image stack** – `git clone` the official repo.
3. **Mount your photo folder** – bind-mount or volume.
4. **Optional GPU** – accelerate ML tasks with Intel iGPU, Nvidia, or AMD.
5. **Run the stack** – `docker compose up -d`.
6. **Configure via the UI** – set up storage, backups, ML models.
7. **Generate an API key** – needed for bulk CLI imports.
8. **Remote access** – use Netbird or any VPN; set up a DNS entry.
9. **Bulk import** – with `image-go` or via the web UI.
10. **Backup** – 3-2-1 policy; schedule `pg_dump` and copy to external storage.
11. **Maintenance** – keep the container and database up-to-date.

Once you're comfortable, you can experiment with building your own theme, integrating with home-automation systems (e.g., expose a “photo of the day” to your smart display), or even host a multi-tenant instance for a photography studio.

## 14. Frequently Asked Questions

| Question | Answer |
|----------|--------|
| **Does Image store any metadata in the cloud?** | No. All data stays in your container and the bound volume. Only the first time you install the web UI you hit `localhost:2283`, but it can run entirely offline. |
| **Can I share a folder with a family member’s laptop?** | Yes. Just give them an API key, or let them log in to the UI. The photo directory is mounted from the host, so any user with access to the host can read the photos directly. |
| **What happens if my server goes down?** | You’ll lose the web UI, but your photos remain in `/mnt/photos`. Re-create the Docker stack, point the volumes to the same directories, and you're back in business. |
| **How do I update Image?** | Pull the latest changes from the GitHub repo and restart the containers. |
| **Is Image compatible with mobile devices?** | Yes, the web UI is mobile-responsive. |

## 15. Further Reading & Community

- [Official Image Documentation](https://github.com/juggernaut-io/image)
- [GitHub Repository](https://github.com/juggernaut-io/image)
- [Community Forum](https://github.com/juggernaut-io/image/discussions)
- [Docker Hub](https://hub.docker.com/u/juggernaut)

## 16. Final Thoughts

Setting up Image may seem daunting at first, but it's a powerful way to regain control over your digital memories. With its robust feature set, extensibility, and focus on privacy, Image stands out as a compelling alternative to commercial services.

Remember, the key to a successful self-hosted setup lies in regular maintenance, secure configurations, and understanding how your system works. Start small, expand gradually, and always keep backups.

Whether you're a casual user or a tech-savvy enthusiast, Image provides the tools you need to manage your photo library with confidence and peace of mind.

</article>