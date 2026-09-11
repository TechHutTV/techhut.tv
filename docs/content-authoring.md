# Content Authoring Guide

[Back to Documentation Index](README.md)

## Overview

Articles are written in MDX format, a combination of Markdown and JSX that allows embedding React components in your content.

## File Location

Articles are organized by date in the following structure:

```
src/content/YYYY/MM/slug.mdx
```

For example:
- `src/content/2025/02/git-for-everyone-guide.mdx`
- `src/content/2024/08/zen-browser-better-firefox.mdx`

The slug becomes the URL path: `https://techhut.tv/git-for-everyone-guide`

## Required Exports

Every article must include these exports at the top of the file:

```jsx
export const title = "Article Title"
export const description = "A brief description for SEO and previews."
export const date = "2025-02-03T16:40:55-08:00"
export const authors = ["Author Name"]
export const categories = ["Guides"]
export const tags = ["Tag1", "Tag2", "Tag3"]
export const cover = "/docs-static/img/2025/02/article-slug/cover.jpg"
```

### Export Details

| Export | Type | Description |
|--------|------|-------------|
| `title` | string | Article title (displayed as h1) |
| `description` | string | Brief summary for SEO meta tags and article previews |
| `date` | string | ISO 8601 date (publish date) |
| `authors` | array | Author names (must match entries in `authors.js`) |
| `categories` | array | Primary category (usually one) |
| `tags` | array | Relevant tags for filtering |
| `cover` | string | Path to cover image |
| `imagePosition` | string | (Optional) CSS object-position for cover image (e.g. `"top"`, `"center"`) |

## Categories

Use one of these categories:

| Category | Use For |
|----------|---------|
| **Guides** | How-to tutorials, step-by-step instructions |
| **Software** | Software reviews, application spotlights |
| **Benchmarking** | Performance tests, comparisons |
| **Essay** | Opinion pieces, commentary |
| **Hardware** | Hardware reviews, build guides |

## Tags

Tags are flexible and can be any relevant keyword. Common tags include:

- **Operating Systems**: Linux, Ubuntu, Fedora, Arch, NixOS, Windows, macOS
- **Topics**: Docker, Git, Self-Hosting, Privacy, Open Source
- **Software**: Firefox, Grafana, Immich, DaVinci Resolve

## Image Organization

Create a folder for your article's images:

```
public/docs-static/img/YYYY/MM/article-slug/
├── cover.jpg           # Cover image (required)
├── 01_screenshot.png   # Numbered for ordering
├── diagram.png         # Descriptive names work too
└── demo.gif           # GIFs supported
```

Reference images in your article:

```markdown
![Alt text](/docs-static/img/2025/02/article-slug/screenshot.png)
```

### Image Guidelines

- **Cover images**: JPG format, 16:9 aspect ratio recommended; PNG works well for text-heavy technical diagrams
- **Content images**: PNG for screenshots, JPG for photos
- **GIFs**: Use for short animations/demos
- **Alt text**: Auto-generated from filename if not provided

### Technical Diagrams

Use diagrams to explain a relationship that readers need to understand, such as how requests reach an application or which disk holds its data. The [Seafile architecture SVG](../public/docs-static/img/2026/09/self-host-seafile-docker-unraid/architecture.svg) is an editable reference for this style.

1. Identify the concepts the article teaches. Give request routing, storage placement, and startup dependencies separate labeled panels when they describe different relationships.
2. Use arrows for actual flows or connections. Label protocols, ports, and direction where useful. A reverse proxy routing requests to an application does not imply that it manages the application's database or filesystem.
3. Match the article's paths, service names, and boundaries. Label local storage and mounted storage explicitly, and make clear whether a path belongs to the host or a container. Use example addresses without private deployment details.
4. For a cover, start with a 1600×900 canvas. Use a dark navy background, white primary text, muted secondary text, and restrained blue/green panels. Make the key names or paths prominent, keep supporting text short, and leave space around labels and arrows. Color reinforces written labels.
5. Save editable vector source, such as `architecture.svg`, in the article's image directory. Include an SVG `title` and `desc` explaining the diagram, and write descriptive alt text for inline use.
6. Render a PNG with the project's existing Sharp dependency. Preserve the SVG alongside the image so later changes can be made precisely.

For example, run this from the repository root to regenerate the Seafile cover:

```bash
node - <<'JS'
const path = require('node:path')
const sharp = require('sharp')
const imageDir = 'public/docs-static/img/2026/09/self-host-seafile-docker-unraid'

sharp(path.join(imageDir, 'architecture.svg'))
  .png()
  .toFile(path.join(imageDir, 'cover.png'))
  .then(info => console.log(`${info.width}×${info.height} PNG written`))
  .catch(error => { console.error(error); process.exitCode = 1 })
JS
```

For another article, change `imageDir` and the filenames as needed. Set its MDX `cover` export to the rendered PNG's public path. Keep assets self-contained, with no external fonts or image dependencies needed to render the SVG.

Open the final PNG at full resolution and at a reduced size such as 800×450. Check that text fits, important labels remain readable, lines end at the intended component, and the diagram conveys the correct technical relationships. If the layout becomes crowded, split it into simpler figures. After every SVG edit, regenerate and inspect the PNG too.

## Writing Content

After the exports, write your content in standard Markdown:

```markdown
Introduction paragraph goes here.

## Section Heading

Content with **bold** and *italic* text.

### Subsection

- Bullet points
- Work as expected

1. Numbered lists
2. Also work

## Code Examples

Inline `code` and code blocks:

```bash
npm install
```

## Using Components

See the [MDX Components](mdx-components.md) documentation for available components like `<Note>`, `<Warning>`, and `<YouTube>`.
```

## Article Template

```mdx
export const title = "Your Article Title"
export const description = "A compelling description that summarizes the article."
export const date = "2025-01-15T10:00:00-08:00"
export const authors = ["Brandon Hopkins"]
export const categories = ["Guides"]
export const tags = ["Linux", "Tutorial"]
export const cover = "/docs-static/img/2025/01/your-article-slug/cover.jpg"

Introduction paragraph that hooks the reader and explains what they'll learn.

## First Section

Your content here...

## Second Section

More content...

## Conclusion

Wrap up the article with key takeaways.
```

## Preview Your Article

Run the development server to preview:

```bash
npm run dev
```

The article will be available at `http://localhost:3000/your-article-slug`

## Build Process

When you run `npm run build`, the build scripts:

1. Extract metadata from all MDX files
2. Generate `articles.js` with article data
3. Generate `slugMap.js` for URL routing
4. Generate sitemap and RSS feed

See [Build Scripts](build-scripts.md) for details.
