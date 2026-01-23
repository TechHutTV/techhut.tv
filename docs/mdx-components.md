# MDX Components

[Back to Documentation Index](README.md)

## Overview

These components are available in MDX article files and are defined in `src/components/mdx.jsx`. They extend standard Markdown with interactive and styled elements.

## Alert Boxes

### Note

Informational callout with primary brand styling.

```mdx
<Note>
  This is important information the reader should know.
</Note>
```

Renders with an info icon and orange/primary colored border.

### Warning

Warning callout for critical information.

```mdx
<Warning>
  Be careful! This action cannot be undone.
</Warning>
```

Renders with a warning icon and red border.

### Success

Success callout for positive outcomes.

```mdx
<Success>
  You've successfully completed the setup!
</Success>
```

Renders with a checkmark icon and green border.

## Layout Components

### Row

Creates a two-column grid layout.

```mdx
<Row>
  <Col>
    Left column content
  </Col>
  <Col>
    Right column content
  </Col>
</Row>
```

### Col

Column wrapper for use inside `<Row>`. Supports sticky positioning.

```mdx
<Col sticky>
  This column sticks while scrolling
</Col>
```

**Props**:
- `sticky`: Boolean - Makes column sticky on scroll

## Media Components

### Video

Native HTML5 video player.

```mdx
<Video src="/path/to/video.mp4" />
<Video src="/path/to/video.webm" type="video/webm" />
```

**Props**:
- `src`: Video file path (required)
- `type`: MIME type (auto-detected from extension)
- `controls`: Show controls - `"yes"` (default) or `"no"`
- `preload`: Preload behavior - `"metadata"` (default), `"auto"`, `"none"`

### YouTube

Embedded YouTube video with privacy-enhanced mode.

```mdx
<YouTube id="dQw4w9WgXcQ" />
```

**Props**:
- `id`: YouTube video ID (required)

## Code Components

### Code Blocks

Fenced code blocks with syntax highlighting via Shiki.

````mdx
```javascript
const greeting = "Hello, World!"
console.log(greeting)
```
````

Supported languages include: `javascript`, `typescript`, `bash`, `python`, `jsx`, `css`, `html`, `json`, `yaml`, and many more.

### CodeGroup

Tabbed code blocks for showing multiple versions.

````mdx
<CodeGroup>

```bash {{ title: "npm" }}
npm install package-name
```

```bash {{ title: "yarn" }}
yarn add package-name
```

```bash {{ title: "pnpm" }}
pnpm add package-name
```

</CodeGroup>
````

### Inline Code

Standard backtick inline code.

```mdx
Use the `npm install` command to install dependencies.
```

## Documentation Components

### Properties

Container for property/parameter lists.

```mdx
<Properties>
  <Property name="title" type="string" required>
    The article title.
  </Property>
  <Property name="count" type="number" min={0} max={100}>
    Optional count value.
  </Property>
</Properties>
```

### Property

Individual property definition.

**Props**:
- `name`: Property name (required)
- `type`: Data type (required)
- `required`: Boolean - Mark as required
- `min`: Minimum value
- `max`: Maximum value
- `minLen`: Minimum length
- `maxLen`: Maximum length
- `enumList`: Allowed values

## Interactive Components

### Button

Styled button/link.

```mdx
<Button href="/download">Download Now</Button>
```

### Badge

Inline badge for labels.

```mdx
<Badge>New</Badge>
<Badge color="green">Stable</Badge>
```

## Standard Markdown Enhancements

### Images

Standard Markdown images are automatically enhanced:

```mdx
![Screenshot of the app](/docs-static/img/2025/02/article/screenshot.png)
```

Features:
- Auto-generated alt text from filename if not provided
- Next.js Image optimization (lazy loading, modern formats)
- GIFs render without optimization to preserve animation
- External images use native `<img>` with lazy loading

### Links

External links automatically open in new tab with security attributes:

```mdx
[External Link](https://example.com)
[Internal Link](/another-article)
```

External links get `rel="noopener noreferrer"` and `target="_blank"`.

### Headings

H2-H5 headings are enhanced with anchor links for easy sharing:

```mdx
## Section Title
### Subsection
```

Clicking the heading copies the anchor link to clipboard.

### Tables

Tables are styled with hover effects and responsive scrolling:

```mdx
| Column 1 | Column 2 |
|----------|----------|
| Value 1  | Value 2  |
```

## Example Usage

```mdx
export const title = "Example Article"
// ... other exports

In this guide, we'll cover the setup process.

<Note>
  Make sure you have Node.js 16+ installed before proceeding.
</Note>

## Installation

<CodeGroup>

```bash {{ title: "npm" }}
npm install example-package
```

```bash {{ title: "yarn" }}
yarn add example-package
```

</CodeGroup>

## Configuration

<Properties>
  <Property name="apiKey" type="string" required>
    Your API key from the dashboard.
  </Property>
  <Property name="timeout" type="number">
    Request timeout in milliseconds.
  </Property>
</Properties>

<Warning>
  Never commit your API key to version control!
</Warning>

## Video Tutorial

<YouTube id="abc123xyz" />

<Success>
  You're all set! Check out our other guides for more tips.
</Success>
```
