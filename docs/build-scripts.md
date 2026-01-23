# Build Scripts

[Back to Documentation Index](README.md)

## Overview

The build process uses custom Node.js scripts to generate metadata from MDX content files. These scripts run automatically before dev and build commands.

## NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Generates articles + slugmap, then starts dev server |
| `build` | `npm run build` | Full build with all generators |
| `gen:articles` | `npm run gen:articles` | Generate article metadata |
| `gen:slugmap` | `npm run gen:slugmap` | Generate URL routing map |
| `gen:sitemap` | `npm run gen:sitemap` | Generate sitemap.xml |
| `gen:rss` | `npm run gen:rss` | Generate RSS feed |

## Build Order

The `build` script runs generators in this order:

```
gen:articles → gen:slugmap → gen:sitemap → gen:rss → next build
```

The `dev` script runs a subset:

```
gen:articles → gen:slugmap → next dev
```

## Script Details

### generate-articles.js

**Location**: `scripts/generate-articles.js`

**Input**: MDX files in `src/content/`

**Output**: `src/data/articles.js`

Scans all MDX files and extracts exports to create a sorted array of article metadata.

**Process**:
1. Recursively finds all `.mdx` files in content directory
2. Parses each file for exports: `title`, `description`, `date`, `cover`, `categories`, `tags`
3. Gets last modified date from git history
4. Sorts articles by date (newest first)
5. Writes JavaScript module with articles array

**Output format**:
```javascript
export const articles = [
  {
    title: "Article Title",
    description: "Description text",
    date: "2025-02-03T16:40:55-08:00",
    dateModified: "2025-02-05",
    href: "/article-slug",
    cover: "/docs-static/img/2025/02/article-slug/cover.jpg",
    categories: ["Guides"],
    tags: ["Linux", "Tutorial"]
  },
  // ... more articles
]
```

### generate-slug-map.js

**Location**: `scripts/generate-slug-map.js`

**Input**: MDX files in `src/content/`

**Output**: `src/data/slugMap.js`

Creates a mapping from URL slugs to file paths for dynamic routing.

**Process**:
1. Scans content directory for MDX files
2. Maps filename (slug) to relative path
3. Includes last modified date from git

**Output format**:
```javascript
export const slugMap = {
  "article-slug": {
    path: "2025/02/article-slug.mdx",
    dateModified: "2025-02-05"
  },
  // ... more mappings
}
```

### generate-sitemap.mjs

**Location**: `scripts/generate-sitemap.mjs`

**Input**: Generated `articles.js`, category pages, tag pages

**Output**: `public/sitemap.xml`

Generates XML sitemap for search engines.

**Included URLs**:
- Static pages (home, content, team, partner)
- Category pages from `src/pages/categories/`
- Tag pages from `src/pages/tags/`
- All articles from generated articles data

**Priorities**:
- Homepage: 1.0
- Content page: 0.9
- Categories: 0.8
- Tags: 0.6
- Articles: 0.7

### generate-rss.mjs

**Location**: `scripts/generate-rss.mjs`

**Input**: Generated `articles.js`

**Output**: `public/rss.xml`

Generates RSS 2.0 feed for feed readers.

**Features**:
- Proper XML escaping
- Categories and tags as RSS categories
- Cover images as enclosures
- Atom link for feed discovery

## Git Date Integration

**Location**: `src/lib/gitDates.js`

The build scripts use git history to track modification dates.

### Functions

**`getGitLastModified(filePath)`**

Returns the date of the last commit that modified the file.

```javascript
import { getGitLastModified } from '../src/lib/gitDates.js'

const lastModified = getGitLastModified('/path/to/file.mdx')
// Returns: "2025-02-05" or null
```

**`getGitCreatedDate(filePath)`**

Returns the date of the first commit that added the file.

```javascript
import { getGitCreatedDate } from '../src/lib/gitDates.js'

const created = getGitCreatedDate('/path/to/file.mdx')
// Returns: "2025-01-15" or null
```

## Adding a New Generator

1. Create script in `scripts/` directory
2. Add npm script to `package.json`
3. Add to `build` script chain if needed for production
4. Add to `dev` script chain if needed during development

Example `package.json` addition:
```json
{
  "scripts": {
    "gen:newscript": "node scripts/generate-newscript.js",
    "build": "npm run gen:articles && npm run gen:slugmap && npm run gen:newscript && npm run gen:sitemap && npm run gen:rss && next build"
  }
}
```

## Troubleshooting

### Articles not appearing

1. Check MDX file has required exports (`title`, `date`)
2. Run `npm run gen:articles` and check console output
3. Verify file is in `src/content/YYYY/MM/` structure

### Stale data after changes

1. Stop dev server
2. Run `npm run gen:articles && npm run gen:slugmap`
3. Restart dev server

### Git dates showing null

- File may not be committed to git yet
- Check git history with `git log --follow -- path/to/file.mdx`
