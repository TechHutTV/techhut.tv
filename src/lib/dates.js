/**
 * Parse an ISO date string into a Date object
 * @param {string} dateString - ISO 8601 date string (YYYY-MM-DD)
 * @returns {Date|null} - Date object or null if invalid
 */
export function parseDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

/**
 * Format a date string in a human-readable format
 * @param {string} dateString - ISO 8601 date string (YYYY-MM-DD)
 * @param {string} format - Format style: 'long', 'short', 'medium'
 * @returns {string} - Formatted date string
 */
export function formatDate(dateString, format = 'long') {
  const date = parseDate(dateString)
  if (!date) return ''

  const options = {
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
  }

  return date.toLocaleDateString('en-US', options[format] || options.long)
}

/**
 * Get a relative time string (e.g., "2 days ago", "3 months ago")
 * @param {string} dateString - ISO 8601 date string (YYYY-MM-DD)
 * @returns {string} - Relative time string
 */
export function getRelativeTime(dateString) {
  const date = parseDate(dateString)
  if (!date) return ''

  const now = new Date()
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffYear > 0) return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`
  if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`
  if (diffWeek > 0) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`
  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
  if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
  return 'just now'
}

/**
 * Sort an array of items by date
 * @param {Array} items - Array of objects with a date property
 * @param {string} dateKey - The property name containing the date string
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} - Sorted array
 */
export function sortByDate(items, dateKey = 'date', order = 'desc') {
  return [...items].sort((a, b) => {
    const dateA = parseDate(a[dateKey])
    const dateB = parseDate(b[dateKey])

    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1

    return order === 'desc' ? dateB - dateA : dateA - dateB
  })
}

/**
 * Group items by year and month
 * @param {Array} items - Array of objects with a date property
 * @param {string} dateKey - The property name containing the date string
 * @returns {Object} - Object with year-month keys
 */
export function groupByYearMonth(items, dateKey = 'date') {
  return items.reduce((groups, item) => {
    const date = parseDate(item[dateKey])
    if (!date) return groups

    const year = date.getFullYear()
    const month = date.toLocaleString('en-US', { month: 'long' })
    const key = `${year}-${month}`

    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)

    return groups
  }, {})
}
