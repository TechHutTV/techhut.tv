import { memo } from 'react'

export const Logo = memo(function Logo({ className, ...props }) {
  return (
    <span className="text-3xl font-bold tracking-tight leading-none" {...props}>
      <span className="text-zinc-900 dark:text-white transition-colors">TechHut</span>
      <span className="text-zinc-900 dark:text-white transition-colors">.tv</span>
    </span>
  )
})
