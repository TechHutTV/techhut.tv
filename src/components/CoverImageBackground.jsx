import { useState, useEffect } from 'react'
import { useScrollBlur } from '@/hooks/useScrollBlur'
import clsx from 'clsx'

/**
 * CoverImageBackground component
 * Displays a full-page background cover image with scroll-based blur effect
 * 
 * @param {string} imageUrl - Path to the cover image
 * @param {number} scrollBlurDivisor - Controls blur speed (default: 300)
 * @param {string} imagePosition - CSS object-position value (optional)
 */
export function CoverImageBackground({ 
  imageUrl, 
  scrollBlurDivisor = 300,
  imagePosition 
}) {
  const [mounted, setMounted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const blurOpacity = useScrollBlur(scrollBlurDivisor, mounted && !imageError)

  useEffect(() => {
    setMounted(true)
  }, [imageUrl])

  // Don't render if no image URL
  if (!imageUrl) {
    return null
  }

  // If image errored, don't render
  if (imageError) {
    return null
  }

  const imageStyle = imagePosition ? { objectPosition: imagePosition } : {}

  return (
    <>
      {/* Hero spacer to push content down */}
      <div className="h-[150px] md:h-[200px]" aria-hidden="true" />
      
      {/* Background container with image */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -20 }}
        aria-hidden="true"
      >
        <img
          src={imageUrl}
          alt=""
          role="presentation"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          style={imageStyle}
          onError={() => {
            setImageError(true)
          }}
        />
        
        {/* First gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 dark:from-zinc-800 to-transparent mix-blend-normal" />
        
        {/* Second gradient overlay */}
        <div className="absolute inset-0 opacity-60 bg-gradient-to-t from-zinc-900 dark:from-zinc-800 to-zinc-100 dark:to-zinc-800 mix-blend-normal" />
        
        {/* Light mode white blur overlay - makes image lighter */}
        <div className="absolute inset-0 pointer-events-none bg-white/75 dark:hidden" />
      </div>

      {/* Scroll-based blur overlay */}
      {mounted && (
        <div
          className="fixed inset-0 pointer-events-none backdrop-blur-xl bg-zinc-100/75 dark:bg-zinc-800/60"
          style={{
            zIndex: -19,
            opacity: blurOpacity,
            transition: 'opacity 0.1s ease-out'
          }}
          aria-hidden="true"
        />
      )}
    </>
  )
}
