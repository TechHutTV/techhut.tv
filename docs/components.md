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

## Interactive Components

### Search

Algolia-powered search component.

```jsx
import { Search } from '@/components/Search'

<Search />
```

**Location**: `src/components/Search.jsx`

### Button

Styled button component with multiple variants.

```jsx
import { Button } from '@/components/Button'

<Button href="/path">Click Me</Button>
<Button variant="secondary">Secondary</Button>
```

**Props**:
- `href`: Link destination (renders as anchor)
- `variant`: `"primary"` | `"secondary"`

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

### Author

Displays author information with social links.

```jsx
import { Author } from '@/components/Author'

<Author name="Brandon Hopkins" />
```

**Location**: `src/components/Author.jsx`

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
