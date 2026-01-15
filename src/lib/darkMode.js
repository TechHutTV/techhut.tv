/**
 * Utility functions for dark mode handling
 */

/**
 * Temporarily disables CSS transitions to prevent flash during theme changes
 */
export function disableTransitionsTemporarily() {
  document.documentElement.classList.add('[&_*]:!transition-none')
  window.setTimeout(() => {
    document.documentElement.classList.remove('[&_*]:!transition-none')
  }, 0)
}

/**
 * Updates dark mode state in localStorage
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 * @param {boolean} isSystemDarkMode - Whether system prefers dark mode
 */
export function updateDarkModeStorage(isDarkMode, isSystemDarkMode) {
  if (isDarkMode === isSystemDarkMode) {
    delete window.localStorage.isDarkMode
  } else {
    // Store as string for consistency with how it's read in _document.jsx
    window.localStorage.isDarkMode = isDarkMode.toString()
  }
}
