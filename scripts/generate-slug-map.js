const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.join(__dirname, '../src/pages/content')
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

        files.push({
          slug,
          path: newRelativePath // e.g., "2024/08/zen-browser-better-firefox.mdx"
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
    slugMap[file.slug] = file.path
  }

  const output = `// Auto-generated slug to path mapping
// Run: node scripts/generate-slug-map.js

export const slugMap = ${JSON.stringify(slugMap, null, 2)}
`

  fs.writeFileSync(OUTPUT_FILE, output)
  console.log(`Generated slug map with ${files.length} entries to ${OUTPUT_FILE}`)
}

generateSlugMap()
