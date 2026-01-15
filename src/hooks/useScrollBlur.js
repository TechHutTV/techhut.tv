import { useState, useEffect } from 'react'

/**
 * Custom hook for scroll-based blur opacity calculation
 * @param {number} scrollDivisor - Controls how fast blur increases (default: 300)
 * @param {boolean} enabled - Whether blur is enabled (default: true)
 * @returns {number} Opacity value between 0 and 1
 */
export function useScrollBlur(scrollDivisor = 300, enabled = true) {
  const [blurOpacity, setBlurOpacity] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!enabled || !mounted) return

    let rafId = null
    let lastScrollY = 0

    const updateBlur = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      
      // Only update if scroll position changed significantly (performance optimization)
      if (Math.abs(scrollY - lastScrollY) < 1) {
        rafId = requestAnimationFrame(updateBlur)
        return
      }

      lastScrollY = scrollY
      const opacity = Math.min(scrollY / scrollDivisor, 1)
      setBlurOpacity(opacity)

      rafId = requestAnimationFrame(updateBlur)
    }

    // Initial update
    updateBlur()

    // Also listen to scroll events for immediate response
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      updateBlur()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [scrollDivisor, enabled, mounted])

  return blurOpacity
}
