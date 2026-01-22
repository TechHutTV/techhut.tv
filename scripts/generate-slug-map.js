import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getGitLastModified } from '../src/lib/gitDates.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONTENT_DIR = path.join(__dirname, '../src/content')
const OUTPUT_FILE = path.join(__dirname, '../src/data/slugMap.js')

function findMdxFiles(dir, basePath = '') {
  const files = []

  function scan(currentDir, relativePath) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      const newRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        scan(fullPath, newRelativePath)
      } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
        // Extract slug from filename (without .mdx extension)
        const slug = entry.name.replace(/\.mdx$/, '')

        // Get last modified date from git
        const dateModified = getGitLastModified(fullPath)

        files.push({
          slug,
          path: newRelativePath, // e.g., "2024/08/zen-browser-better-firefox.mdx"
          dateModified
        })
      }
    }
  }

  scan(dir, '')
  return files
}

function generateSlugMap() {
  const files = findMdxFiles(CONTENT_DIR)

  const slugMap = {}
  for (const file of files) {
    slugMap[file.slug] = {
      path: file.path,
      dateModified: file.dateModified
    }
  }

  const output = `// Auto-generated slug to path mapping
// Run: node scripts/generate-slug-map.js

export const slugMap = ${JSON.stringify(slugMap, null, 2)}
`

  fs.writeFileSync(OUTPUT_FILE, output)
  console.log(`Generated slug map with ${files.length} entries to ${OUTPUT_FILE}`)
}

generateSlugMap()
