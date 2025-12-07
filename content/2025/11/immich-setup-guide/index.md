---
title: 'Complete Immich Setup Guide'
date: '2025-11-05'
url: immich-setup-guide
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Docker"
  - "Self-Host"
  - "Hardware"
  - "AI"
  - "Linux"
---
ULTIMATE Immich Guide - DITCH Google/Amazon Photos

## Upload Date
2025-11-05

## Instructions

Add Hugo frontmatter to the article above. Return ONLY the complete markdown file with no explanations.

## CRITICAL: YAML Formatting

Use YAML list syntax with indented items, NOT JSON arrays.

CORRECT format:
```yaml
---
title: 'Article Title Here'
date: '2025-04-15'
url: article-slug-here
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Hardware"
tags:
  - "AI"
  - "Hardware"
  - "Linux"
---
```

WRONG format (do NOT use):
```yaml
authors: ["Brandon Hopkins"]
categories: ["Hardware"]
tags: ["AI", "Hardware", "Linux"]
```

## Frontmatter Requirements

- title: SEO-optimized version of the video title (under 60 chars, no clickbait/ALL CAPS), wrapped in single quotes
- date: Use the upload date provided above, wrapped in single quotes (format: 'YYYY-MM-DD')
- url: lowercase slug with hyphens, no filler words, 3-6 words, no quotes needed
- draft: false (no quotes)
- authors: Always just "Brandon Hopkins" as a YAML list item
- categories: Pick ONE from: Benchmarking, Essay, Guides, Hardware, News, Software
- tags: Pick 2-6 from: AI, Apps, Arch, Archive, Benchmarking, COSMIC, Customization, DaVinci Resolve, Desktop Environments, Distros, Docker, Essay, Fedora, Git, Gnome, Guides, Hardware, Homelab, KDE, Khadas, Linux, Manjaro, Mobile, News, OpenSUSE, Pine64, Proxmox, RaspberryPi, Red Hat, Self-Host, Single Board Computers, Windows

Each list item must be on its own line with two-space indent and a dash prefix.

Do NOT use "---" anywhere within the article content itself.
Do NOT add any commentary or explanations before or after the markdown.
Output starts with --- and ends with the article content.