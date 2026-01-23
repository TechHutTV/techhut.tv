# TechHut Documentation

Internal documentation for contributors and maintainers of the TechHut website.

## Table of Contents

| Document | Description |
|----------|-------------|
| [Project Structure](project-structure.md) | Directory layout and architecture overview |
| [Content Authoring](content-authoring.md) | How to write and publish articles |
| [Authors](authors.md) | Author system and adding new authors |
| [Components](components.md) | Reusable UI components reference |
| [MDX Components](mdx-components.md) | MDX-specific components for articles |
| [Build Scripts](build-scripts.md) | Build process and generation scripts |
| [Styling](styling.md) | Tailwind CSS configuration and theming |
| [Deployment](deployment.md) | Vercel deployment and configuration |

## Quick Start

### Running Locally

```bash
npm install
npm run dev
```

### Creating a New Article

1. Create a new MDX file at `src/content/YYYY/MM/slug.mdx`
2. Add required exports (title, description, date, authors, categories, tags, cover)
3. Create image folder at `public/docs-static/img/YYYY/MM/slug/`
4. Write your content using MDX
5. Run `npm run dev` to preview

### Adding a New Author

1. Add author entry to `src/data/authors.js`
2. Add author image to `public/docs-static/img/authors/`

### Building for Production

```bash
npm run build
```

This runs all generation scripts automatically and builds the static site.

## Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18
- **Styling**: Tailwind CSS 3.3
- **Content**: MDX with custom components
- **State**: Zustand
- **Deployment**: Vercel
