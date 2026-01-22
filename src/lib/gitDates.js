import { execSync } from 'child_process'

/**
 * Get the last modified date for a file from git history
 * @param {string} filePath - Path to the file (relative to repo root or absolute)
 * @returns {string|null} - Date in YYYY-MM-DD format, or null if not found
 */
export function getGitLastModified(filePath) {
  try {
    const date = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim()

    // Return YYYY-MM-DD format
    return date ? date.split('T')[0] : null
  } catch {
    return null
  }
}

/**
 * Get the first commit date (creation date) for a file from git history
 * @param {string} filePath - Path to the file
 * @returns {string|null} - Date in YYYY-MM-DD format, or null if not found
 */
export function getGitCreatedDate(filePath) {
  try {
    const date = execSync(`git log --format=%cI --follow --diff-filter=A -- "${filePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim()

    return date ? date.split('T')[0] : null
  } catch {
    return null
  }
}
