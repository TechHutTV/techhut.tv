import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import { slugMap } from '@/data/slugMap'
import * as mdxComponents from '@/components/mdx'
import rehypeSlug from 'rehype-slug'
import { slugifyWithCounter } from '@sindresorhus/slugify'

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

// Extract headings from MDX content for table of contents
function extractSections(content) {
  const slugify = slugifyWithCounter()
  const sections = []
  const headingRegex = /^(#{2,6})\s+(.+)$/gm
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = slugify(title)
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
  const contentPath = slugMap[slug]

  if (!contentPath) {
    return { notFound: true }
  }

  // Read the raw MDX file
  const filePath = path.join(process.cwd(), 'src/pages/content', contentPath)
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
      authors,
      categories,
      tags,
      cover: cover || null,
      imagePosition: imagePosition || null,
      sections,
    }
  }
}
