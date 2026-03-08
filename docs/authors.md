# Authors System

[Back to Documentation Index](README.md)

## Overview

Authors are defined in a central registry and referenced by name in article metadata.

## Author Registry

Authors are defined in `src/data/authors.js`:

```javascript
export const authors = {
  "Author Name": {
    name: "Author Name",
    image: "/docs-static/img/authors/firstname.jpeg",
    bio: "Short bio description",
    role: "team",  // "team" or "contributor"
    social: [
      { platform: "twitter", url: "https://x.com/username" },
      { platform: "github", url: "https://github.com/username" }
    ]
  }
}
```

## Current Authors

| Name | Role | Bio |
|------|------|-----|
| Brandon Hopkins | team | Founder - homelabs, self-hosting, and Linux distros. |
| Allison Hopkins | team | Editor - I go by Twigshi! Animator and artist. |
| Cameron Knauff | contributor | Writer - Linux systems and video production. |
| Niccolo Venerandi | contributor | Writer - KDE, Plasma, and the Linux desktop experience. |
| Scott Yeager | contributor | Writer - Linux enthusiast and nature lover. |

## Author Object Structure

```javascript
{
  name: "Full Name",           // Display name
  image: "/path/to/image.jpeg", // Profile photo path
  bio: "Short description",     // Brief bio
  role: "team",                 // "team" or "contributor" (used by TeamGrid filtering)
  social: [                     // Social media links
    { platform: "twitter", url: "https://..." },
    { platform: "github", url: "https://..." },
    { platform: "linkedin", url: "https://..." },
    { platform: "instagram", url: "https://..." },
    { platform: "medium", url: "https://..." },
    { platform: "reddit", url: "https://..." }
  ]
}
```

### Supported Platforms

- `twitter` - X/Twitter profile
- `github` - GitHub profile
- `linkedin` - LinkedIn profile
- `instagram` - Instagram profile
- `medium` - Medium blog
- `reddit` - Reddit profile

## Adding a New Author

### Step 1: Add Author Image

Place a profile photo in the authors directory:

```
public/docs-static/img/authors/firstname.jpeg
```

Recommended:
- Format: JPEG
- Size: 400x400 pixels (square)
- File size: Under 100KB

### Step 2: Add Author Entry

Edit `src/data/authors.js` and add a new entry:

```javascript
export const authors = {
  // ... existing authors ...

  "New Author Name": {
    name: "New Author Name",
    image: "/docs-static/img/authors/newauthor.jpeg",
    bio: "Brief description of the author",
    role: "contributor",
    social: [
      { platform: "twitter", url: "https://x.com/username" },
      { platform: "github", url: "https://github.com/username" }
    ]
  }
}
```

### Step 3: Use in Articles

Reference the author by exact name in article exports:

```javascript
export const authors = ["New Author Name"]
```

For multiple authors:

```javascript
export const authors = ["Brandon Hopkins", "Scott Yeager"]
```

## Helper Functions

The authors file exports utility functions:

```javascript
import { getAuthor, getAuthors } from '@/data/authors'

// Get single author
const author = getAuthor("Brandon Hopkins")

// Get multiple authors
const authorList = getAuthors(["Brandon Hopkins", "Scott Yeager"])
```

## Author Display

Authors are displayed:

1. **Article header**: Profile image, name, and social links via `Author` component
2. **Team page**: Full bio, role badge, and all social links via `TeamGrid` component
3. **Article cards**: Name only

### Components

- **`Author`** (`src/components/Author.jsx`) — Renders author info with social links in article headers.
- **`TeamGrid`** (`src/components/TeamGrid.jsx`) — Renders a responsive grid of author cards. Supports filtering by `role` ("team" or "contributor") or by an explicit `members` array. Used on the team page.
