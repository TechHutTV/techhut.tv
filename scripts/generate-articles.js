const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.join(__dirname, '../src/pages/content')
const OUTPUT_FILE = path.join(__dirname, '../src/data/articles.js')

function findMdxFiles(dir) {
  const files = []

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        scan(fullPath)
      } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
        files.push(fullPath)
      }
    }
  }

  scan(dir)
  return files
}

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

function extractSlug(filePath) {
  // Extract the slug from the filename (e.g., "old-pc-laptop-media-server.mdx" -> "old-pc-laptop-media-server")
  const filename = path.basename(filePath)
  return filename.replace(/\.mdx$/, '')
}

function generateArticles() {
  const mdxFiles = findMdxFiles(CONTENT_DIR)
  const articles = []

  for (const filePath of mdxFiles) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const slug = extractSlug(filePath)

    const title = parseExport(content, 'title')
    const description = parseExport(content, 'description')
    const date = parseExport(content, 'date')
    const cover = parseExport(content, 'cover')
    const categories = parseExport(content, 'categories') || []
    const tags = parseExport(content, 'tags') || []

    if (!title || !date) {
      console.warn(`Skipping ${filePath}: missing title or date`)
      continue
    }

    articles.push({
      title,
      description: description || '',
      date,
      href: `/${slug}`,
      cover: cover || null,
      categories,
      tags,
    })
  }

  // Sort by date (most recent first)
  articles.sort((a, b) => new Date(b.date) - new Date(a.date))

  const output = `// Auto-generated from MDX content files
// Run: node scripts/generate-articles.js

export const articles = ${JSON.stringify(articles, null, 2)}
`

  fs.writeFileSync(OUTPUT_FILE, output)
  console.log(`Generated ${articles.length} articles to ${OUTPUT_FILE}`)
}

generateArticles()
