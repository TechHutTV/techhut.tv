import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import { slugMap } from '@/data/slugMap'
import * as mdxComponents from '@/components/mdx'
import rehypeSlug from 'rehype-slug'
import GithubSlugger from 'github-slugger'

export default function ArticlePage({ source, ...pageProps }) {
  return <MDXRemote {...source} components={mdxComponents} />
}

// Parse exports from MDX content (same logic as generate-articles.js)
function parseExport(content, name) {
  // Match: export const name = "value" or export const name = 'value'
  const stringMatch = content.match(new RegExp(`export\\s+const\\s+${name}\\s*=\\s*["']([^"']*?)["']`))
  if (stringMatch) return stringMatch[1]

  // Match: export const name = ["item1", "item2"]
  const arrayMatch = content.match(new RegExp(`export\\s+const\\s+${name}\\s*=\\s*\\[([^\\]]*?)\\]`))
  if (arrayMatch) {
    const items = arrayMatch[1].match(/["']([^"']*?)["']/g)
    return items ? items.map(item => item.replace(/["']/g, '')) : []
  }

  return null
}

// Remove export statements and import statements from MDX content
function extractMdxContent(content) {
  // Remove export const statements
  let cleaned = content.replace(/^export\s+const\s+\w+\s*=\s*(?:"[^"]*"|'[^']*'|\[[^\]]*\])\s*$/gm, '')
  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, '')
  return cleaned.trim()
}

// Strip markdown formatting to get plain text (matches what rehype-slug sees)
function stripMarkdown(text) {
  return text
    // Remove links but keep text: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove bold: **text** or __text__ -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // Remove italic: *text* or _text_ -> text
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove inline code: `text` -> text
    .replace(/`([^`]+)`/g, '$1')
    // Remove strikethrough: ~~text~~ -> text
    .replace(/~~([^~]+)~~/g, '$1')
    // Remove escape characters
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1')
    .trim()
}

// Extract headings from MDX content for table of contents
// Uses github-slugger to match rehype-slug's ID generation
function extractSections(content) {
  const slugger = new GithubSlugger()
  const sections = []

  // Remove fenced code blocks before extracting headings
  // This prevents matching ## comments inside bash/code blocks
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '')

  const headingRegex = /^(#{2,6})\s+(.+)$/gm
  let match

  while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const level = match[1].length
    const rawTitle = match[2].trim()
    // Strip markdown formatting to match what rehype-slug sees in rendered HTML
    const title = stripMarkdown(rawTitle)
    const id = slugger.slug(title)
    const tagName = `h${level}`

    sections.push({
      title,
      id,
      tagName,
    })
  }

  return sections
}

export async function getStaticPaths() {
  const paths = Object.keys(slugMap).map((slug) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const slugData = slugMap[slug]

  if (!slugData) {
    return { notFound: true }
  }

  // Read the raw MDX file
  const filePath = path.join(process.cwd(), 'src/content', slugData.path)
  const rawContent = fs.readFileSync(filePath, 'utf-8')

  // Extract exports
  const title = parseExport(rawContent, 'title')
  const description = parseExport(rawContent, 'description')
  const date = parseExport(rawContent, 'date')
  const authors = parseExport(rawContent, 'authors') || []
  const categories = parseExport(rawContent, 'categories') || []
  const tags = parseExport(rawContent, 'tags') || []
  const cover = parseExport(rawContent, 'cover')
  const imagePosition = parseExport(rawContent, 'imagePosition')

  // Extract just the MDX content (without exports/imports)
  const mdxContent = extractMdxContent(rawContent)

  // Extract sections for table of contents
  const sections = extractSections(mdxContent)

  // Serialize the MDX content with rehype-slug to add IDs to headings
  const source = await serialize(mdxContent, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      development: process.env.NODE_ENV === 'development',
    },
  })

  return {
    props: {
      source,
      title,
      description,
      date,
      dateModified: slugData.dateModified || date,
      authors,
      categories,
      tags,
      cover: cover || null,
      imagePosition: imagePosition || null,
      sections,
      editUrl: `https://github.com/TechHutTV/techhut.tv/tree/main/src/content/${slugData.path}`,
    }
  }
}
