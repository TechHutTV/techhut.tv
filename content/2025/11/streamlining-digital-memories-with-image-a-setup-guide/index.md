---
title: 'Streamlining Digital Memories with Image: A Setup Guide'
date: '2025-11-05'
url: streamlining-digital-memories-with-image-a-setup-guide
draft: true
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Docker"
  - "Guides"
  - "Linux"
---
**Title: Streamlining Digital Memories with Image: A Comprehensive Setup Guide**

## Introduction

In today's digital age, photographs and videos have become our primary means of capturing memories. However, managing these vast libraries can be daunting, which is where platforms like Image come into play. In this comprehensive guide, we'll walk you through setting up Image, a robust, open-source photo manager that focuses on privacy, security, and ease-of-use.

**Content Type:** *Guide*

## Prerequisites

Before we dive in, ensure you have the following:

1. A server or personal computer with at least 4GB RAM and an SSD for optimal performance.
2. Basic understanding of command-line operations and Docker.
3. Patience – Setting up Image requires time and careful configuration.

**Supplementary Resource:** [Image's official system requirements](https://github.com/gen0us/image-server#system-requirements)

## Getting Started

### 1. **Environment Setup**

For our guide, we'll use a Ubuntu-based system. First, update your package index:

```bash
sudo apt update
```

Next, install necessary dependencies like `git`, `docker`, and `docker-compose`:

```bash
sudo apt install git docker docker-compose -y
```

### 2. **Image Server Setup**

Clone the Image server repository:

```bash
git clone https://github.com/gen0us/image-server.git && cd image-server
```

Initialize the Docker environment:

```bash
./setup.sh
```

**Supplementary Resource:** [Image's official setup script documentation](https://github.com/gen0us/image-server#setup-script)

### 3. **Initializing the Database**

Before we start Image, initialize the database using Docker Compose:

```bash
docker-compose up -d
```

Let this run until all containers are active (check with `docker ps`).

## Configuring Image

### 1. **Config File**

Copy the default configuration file to your user directory and edit it accordingly:

```bash
cp config/default.yml ~/image-config.yml
nano ~/image-config.yml
```

**Supplementary Resource:** [Full configuration guide](https://github.com/gen0us/image-server#config)

### 2. **Customizing Configuration**

Pay close attention to these sections in the YAML file:

- `server`: Set your desired host, port, and other server-related settings.
- `database`: Configure database credentials here.
- `smtp`: Set up email notifications if required.

**Supplementary Resource:** [Email configuration guide](https://github.com/gen0us/image-server#email)

### 3. **Machine Learning Models**

Image supports various machine learning models for tasks like facial recognition. You can configure these under `machine_learning` in the YAML file:

```yaml
machine_learning:
  enabled: true
  workers: 2 # Number of workers to process images
  ...
```

## Running Image

Bring up the server using Docker Compose:

```bash
docker-compose up -d
```

Access your new Image instance at `http://<your-ip>:<port>/image`.

**Supplementary Resource:** [Image's official documentation](https://github.com/gen0us/image-server)

## Adding Photos & Videos

You can upload files manually via the web interface, or use tools like [Image Go](#image-go) for bulk imports.

### 1. **Manual Upload**

- Sign in to Image using your admin credentials.
- Click on "Upload" and select your files.
- Wait for processing; you'll be notified via email (if configured).

### 2. **Image Go** (*Recommended*)

*Image Go* is a CLI tool that handles bulk file uploads with metadata preservation.

#### Installation

```bash
# For MacOS ARM
curl -L https://github.com/gen0us/image-go/releases/download/v1.1.3/image-go-darwin-arm64.tar.gz | tar xvzf -
```

#### Configuration & Use

First, generate a new API token in Image:

![Generate API Token](https://i.imgur.com/X8jZ2HJ.png)

Next, configure `image-go` using this token and your server's IP address:

```bash
./image-go upload -path /path/to/your/media/folder -url http://<your-ip>:<port>/image --api-key <YOUR_API_KEY>
```

## Configuring Netbird Access

For secure remote access, we'll set up [Netbird](https://netbird.io/). Here's how:

### 1. **Generate Setup Key**

In your Image instance, navigate to "Profile" > "Account Settings" > "Generate Setup Key". Save this key for later use.

![Generate Setup Key](https://i.imgur.com/X8jZ2HJ.png)

### 2. **Install Netbird**

Follow the [official installation guide](https://docs.netbird.io/installation) and ensure you're using version `v1.0.7-alpha.5` or higher for compatibility.

### 3. **Set Up Image Instance as a Pier**

Once installed, run:

```bash
nbd setup <your-setup-key> --accept-terms-of-service --add-to-group media --access-policy family
```

**Supplementary Resource:** [Netbird's official documentation on access policies](https://docs.netbird.io/concepts/access-policies)

## Monitoring Image

You can monitor Image's processes and logs using Docker:

```bash
# To view logs:
docker-compose logs -f image-server

# To inspect running containers:
docker ps
```

**Supplementary Resource:** [Docker's official commands reference](https://docs.docker.com/engine/reference/commandline/cli_commands/)

## Conclusion

Setting up Image might seem daunting at first, but once configured properly, it becomes an invaluable tool for organizing and managing your vast digital libraries. Remember to periodically update the platform as new features are constantly being added.

**Stay tuned for our upcoming guide on configuring external libraries with Image!**

Happy memories preserving! 📸🎬