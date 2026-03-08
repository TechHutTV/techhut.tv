# Components Reference

[Back to Documentation Index](README.md)

## Overview

The site uses reusable React components located in `src/components/`. This document covers the main UI components. For MDX-specific components used in articles, see [MDX Components](mdx-components.md).

## Layout Components

### Layout

Main page layout wrapper that includes header, footer, and navigation.

```jsx
import { Layout } from '@/components/Layout'

<Layout>
  <PageContent />
</Layout>
```

**Location**: `src/components/Layout.jsx`

### Header

Site header with logo, navigation, search, and theme toggle.

```jsx
import { Header } from '@/components/Header'

<Header navigation={navItems} />
```

**Location**: `src/components/Header.jsx`

### Footer

Site footer with links and copyright.

**Location**: `src/components/Footer.jsx`

### MobileNavigation

Responsive navigation menu for mobile devices.

**Location**: `src/components/MobileNavigation.jsx`

## Navigation Components

### NavigationDocs

Documentation-style sidebar navigation with expandable sections.

```jsx
import { NavigationDocs } from '@/components/NavigationDocs'

<NavigationDocs navigation={navStructure} />
```

**Location**: `src/components/NavigationDocs.jsx`

### NavigationState / SidebarState

Zustand stores for managing navigation and sidebar state across components.

**Location**: `src/components/NavigationState.jsx`, `src/components/SidebarState.jsx`

## Content Display Components

### HeroSection

Hero section component for landing pages with background pattern and call-to-action.

```jsx
import { HeroSection } from '@/components/HeroSection'

<HeroSection />
```

**Location**: `src/components/HeroSection.jsx`

### FeaturedArticle

Displays a single featured/highlighted article with cover image and metadata.

```jsx
import { FeaturedArticle } from '@/components/FeaturedArticle'

<FeaturedArticle article={articleData} />
```

**Location**: `src/components/FeaturedArticle.jsx`

### CategoryStrip

Horizontal strip of category links for filtering content.

```jsx
import { CategoryStrip } from '@/components/CategoryStrip'

<CategoryStrip />
```

**Location**: `src/components/CategoryStrip.jsx`

### RecentContent

Displays a grid of recent articles.

```jsx
import { RecentContent } from '@/components/RecentContent'

<RecentContent />
```

**Location**: `src/components/RecentContent.jsx`

### AllContent

Displays all articles with filtering and pagination.

```jsx
import { AllContent } from '@/components/AllContent'

<AllContent />
```

**Location**: `src/components/AllContent.jsx`

### CoverImageBackground

Hero section with article cover image as background.

```jsx
import { CoverImageBackground } from '@/components/CoverImageBackground'

<CoverImageBackground
  image="/path/to/image.jpg"
  title="Article Title"
/>
```

**Location**: `src/components/CoverImageBackground.jsx`

### TopContentBanner

Configurable banner that displays below the author section on content pages. Useful for advertisements, referral links, or promotional content. Users can dismiss the banner with a close button.

```jsx
import { TopContentBanner } from '@/components/TopContentBanner'

<TopContentBanner />
```

**Configuration**: Edit `src/data/topContentBanner.js` to update banner content:

```javascript
export const topContentBannerConfig = {
  enabled: true,  // Set to false to hide the banner

  html: `
    <a href="https://example.com" target="_blank">
      <img src="https://example.com/banner.gif" alt="Banner" />
    </a>
  `,
}
```

**Features**:
- Only displays on content pages (from `src/content/`)
- Dismissible via close button (X in top right corner)
- Supports any HTML content with Tailwind CSS classes
- Easy to enable/disable via config

**Location**: `src/components/TopContentBanner.jsx`, `src/data/topContentBanner.js`

## Interactive Components

### Search

Client-side search component that searches articles locally. Supports keyboard shortcut (Cmd+K / Ctrl+K), arrow key navigation, and a scoring algorithm that prioritizes title matches, then tags, categories, and description.

```jsx
import { Search } from '@/components/Search'

<Search />
```

**Features**:
- Searches the generated `articles.js` data (no external service)
- Minimum 2 characters to trigger search
- Returns top 8 results ranked by relevance
- Keyboard shortcut: Cmd+K (Mac) / Ctrl+K (Windows/Linux)
- Arrow key navigation, Enter to select, Escape to close

**Location**: `src/components/Search.jsx`

### Button

Styled button component with multiple variants.

```jsx
import { Button } from '@/components/Button'

<Button href="/path">Click Me</Button>
<Button variant="secondary">Secondary</Button>
```

**Props**:
- `href`: Link destination (renders as Next.js Link)
- `variant`: `"primary"` | `"secondary"` | `"filled"` | `"outline"` | `"outline-arrow"` | `"text"`
- `arrow`: `"left"` | `"right"` — adds an arrow icon

```jsx
<Button variant="filled" href="/path">Filled</Button>
<Button variant="outline" href="/path">Outline</Button>
<Button variant="outline-arrow" href="/path" arrow="right">Learn More</Button>
<Button variant="text" href="/path">Text Link</Button>
```

**Location**: `src/components/Button.jsx`

### ModeToggle

Dark/light mode toggle button.

```jsx
import { ModeToggle } from '@/components/ModeToggle'

<ModeToggle />
```

**Location**: `src/components/ModeToggle.jsx`

## Media Components

### YouTube

Embedded YouTube video player.

```jsx
import { YouTube } from '@/components/YouTube'

<YouTube id="video_id" />
```

**Location**: `src/components/YouTube.jsx`

### ImageZoom

Zoomable image component for detailed screenshots.

```jsx
import { ImageZoom } from '@/components/ImageZoom'

<ImageZoom src="/path/to/image.jpg" alt="Description" />
```

**Location**: `src/components/ImageZoom.jsx`

## Typography Components

### Heading

Styled heading component with anchor links.

```jsx
import { Heading } from '@/components/Heading'

<Heading level={2}>Section Title</Heading>
```

**Location**: `src/components/Heading.jsx`

### Prose

Wrapper that applies typography styles to content.

```jsx
import { Prose } from '@/components/Prose'

<Prose>
  <p>Styled text content</p>
</Prose>
```

**Location**: `src/components/Prose.jsx`

## Utility Components

### Tag

Category/tag badge component.

```jsx
import { Tag } from '@/components/Tag'

<Tag>Linux</Tag>
```

**Location**: `src/components/Tag.jsx`

### Badge

Generic badge/label component.

```jsx
import { Badge } from '@/components/Badge'

<Badge color="green">New</Badge>
```

**Location**: `src/components/Badge.jsx`

### TeamGrid

Displays a grid of author/team member cards with images, bios, and social links. Supports filtering by role or by explicit member list.

```jsx
import { TeamGrid } from '@/components/TeamGrid'

{/* Show all team members */}
<TeamGrid role="team" />

{/* Show contributors */}
<TeamGrid role="contributor" />

{/* Show specific members */}
<TeamGrid members={["Brandon Hopkins", "Scott Yeager"]} />
```

**Props**:
- `role`: `"team"` | `"contributor"` — filters authors by role
- `members`: Array of author names (overrides role filter)

**Location**: `src/components/TeamGrid.jsx`

### Author

Displays author information with social links.

```jsx
import { Author } from '@/components/Author'

<Author name="Brandon Hopkins" />
```

**Location**: `src/components/Author.jsx`

### Tiles

Grid component for displaying content tiles.

```jsx
import { Tiles } from '@/components/Tiles'

<Tiles />
```

**Location**: `src/components/Tiles.jsx`

### JsonLd

Structured data component for SEO.

```jsx
import { JsonLd } from '@/components/JsonLd'

<JsonLd data={structuredData} />
```

**Location**: `src/components/JsonLd.jsx`

### ErrorBoundary

React error boundary for graceful error handling.

**Location**: `src/components/ErrorBoundary.jsx`

## Icon Components

Icons are located in `src/components/icons/` and include:

- Social media icons (Twitter, GitHub, LinkedIn, etc.)
- UI icons (Menu, Close, Search, etc.)
- Brand icons

```jsx
import { TwitterIcon } from '@/components/icons/TwitterIcon'

<TwitterIcon className="h-5 w-5" />
```

## Visual Components

### Logo

TechHut logo component.

```jsx
import { Logo } from '@/components/Logo'

<Logo className="h-8" />
```

**Location**: `src/components/Logo.jsx`

### GridPattern / HeroPattern

Decorative background patterns.

**Location**: `src/components/GridPattern.jsx`, `src/components/HeroPattern.jsx`

## Code Components

### Code / CodeGroup

Syntax-highlighted code blocks with copy functionality and tabbed groups.

See [MDX Components](mdx-components.md) for usage details.

**Location**: `src/components/Code.jsx`
