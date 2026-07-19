import { memo } from 'react'

// "Slash" mark — Outfit 800 TECH/HUT file-path split.
// Only the slash carries the brand color: sea green on light, spearmint on dark.
export const Logo = memo(function Logo({ className, ...props }) {
  return (
    <span
      className="inline-flex items-baseline font-display text-2xl font-extrabold leading-none tracking-tight"
      {...props}
    >
      <span className="text-zinc-900 transition-colors dark:text-ink">TECH</span>
      <span className="text-primary-800 transition-colors dark:text-primary-500">/</span>
      <span className="text-zinc-900 transition-colors dark:text-ink">HUT</span>
    </span>
  )
})
