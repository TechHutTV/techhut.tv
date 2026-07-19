import Link from 'next/link'
import clsx from 'clsx'

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

// Spearmint acts: primary actions are bright mint fills with dark text
// (the bright-fill rule — bright mint is never text on light surfaces).
const variantStyles = {
  primary:
    'rounded-sm bg-primary-500 text-dark font-semibold hover:bg-primary-600 dark:hover:bg-primary-400 duration-base',
  secondary:
    'rounded-sm bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-300 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-ink',
  filled:
    'rounded-sm bg-zinc-900 py-1 px-3 text-zinc-50 hover:bg-zinc-700 dark:bg-primary-500 dark:text-dark dark:hover:bg-primary-400',
  outline:
    'rounded-sm py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-ink',
  'outline-arrow':
    'rounded-sm text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-ink duration-base relative overflow-hidden group',
  text: 'text-primary-800 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400',
}

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}) {
  let Component = props.href ? Link : 'button'

  className = clsx(
    'inline-flex gap-0.5 justify-center text-[12px] md:text-xs px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 font-medium transition whitespace-nowrap items-center',
    variantStyles[variant],
    className
  )

  let arrowIcon = (
    <ArrowIcon
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1'
      )}
    />
  )

  // No glows or gradients on brand elements — mint fills move between ramp
  // steps on hover and otherwise hold still.
  return (
    <Component className={className} {...props}>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  )
}
