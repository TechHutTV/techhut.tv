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
    social: [
      { platform: "twitter", url: "https://x.com/username" },
      { platform: "github", url: "https://github.com/username" }
    ]
  }
}
```

## Current Authors

| Name | Bio |
|------|-----|
| Brandon Hopkins | Writer |
| Cameron Knauff | Linux systems developer, writer, and video editor |
| Niccolo Venerandi | Writer |
| Scott Yeager | Geek and Linux enthusiast. Loves music and nature. |

## Author Object Structure

```javascript
{
  name: "Full Name",           // Display name
  image: "/path/to/image.jpeg", // Profile photo path
  bio: "Short description",     // Brief bio
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

1. **Article header**: Profile image, name, and social links
2. **Team page**: Full bio and all social links
3. **Article cards**: Name only

The `Author` component (`src/components/Author.jsx`) handles rendering author information with their social links.
