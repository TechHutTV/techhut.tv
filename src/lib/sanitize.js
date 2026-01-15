import DOMPurify from 'dompurify'

/**
 * Sanitizes HTML string to prevent XSS attacks
 * Allows only safe tags and attributes for search highlighting
 *
 * @param {string} dirty - The HTML string to sanitize
 * @returns {string} Sanitized HTML string
 */
export function sanitizeHTML(dirty) {
  if (typeof window === 'undefined') {
    // Server-side: return as-is (no DOM available)
    return dirty
  }

  // Configure DOMPurify to allow only specific tags for search highlighting
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['mark', 'span', 'strong', 'em', 'b', 'i'],
    ALLOWED_ATTR: ['class'],
    KEEP_CONTENT: true,
  })
}

/**
 * Sanitizes code highlighting HTML from Shiki
 * More permissive than general HTML as it comes from our own highlighter
 *
 * @param {string} dirty - The highlighted code HTML
 * @returns {string} Sanitized HTML string
 */
export function sanitizeCodeHTML(dirty) {
  if (typeof window === 'undefined') {
    return dirty
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['span', 'code', 'pre'],
    ALLOWED_ATTR: ['class', 'style'],
    KEEP_CONTENT: true,
  })
}
