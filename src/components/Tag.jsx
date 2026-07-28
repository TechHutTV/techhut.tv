import clsx from 'clsx'

const variantStyles = {
  medium: 'rounded-sm px-1.5 ring-1 ring-inset',
}

// Two hues plus neutral: mint is the working color, ice the secondary,
// functional danger/warning only for destructive/warning verbs.
const colorStyles = {
  mint: {
    small: 'text-primary-800 dark:text-primary-500',
    medium:
      'ring-primary-800/30 bg-primary-500/10 text-primary-800 dark:ring-primary-500/30 dark:bg-primary-500/10 dark:text-primary-500',
  },
  ice: {
    small: 'text-ice-800 dark:text-ice-500',
    medium:
      'ring-ice-800/30 bg-ice-500/10 text-ice-800 dark:ring-ice-500/30 dark:bg-ice-500/10 dark:text-ice-500',
  },
  warning: {
    small: 'text-zinc-700 dark:text-warning',
    medium:
      'ring-warning/60 bg-warning/15 text-zinc-900 dark:ring-warning/30 dark:bg-warning/10 dark:text-warning',
  },
  danger: {
    small: 'text-zinc-700 dark:text-danger',
    medium:
      'ring-danger/60 bg-danger/10 text-zinc-900 dark:ring-danger/30 dark:bg-danger/10 dark:text-danger',
  },
  zinc: {
    small: 'text-zinc-500 dark:text-zinc-400',
    medium:
      'ring-zinc-200 bg-zinc-100 text-zinc-600 dark:ring-zinc-500/20 dark:bg-zinc-400/10 dark:text-zinc-400',
  },
  // Back-compat aliases for existing content
  emerald: null,
  sky: null,
  amber: null,
  rose: null,
}

colorStyles.emerald = colorStyles.mint
colorStyles.sky = colorStyles.ice
colorStyles.amber = colorStyles.warning
colorStyles.rose = colorStyles.danger

const valueColorMap = {
  get: 'mint',
  post: 'ice',
  put: 'warning',
  delete: 'danger',
}

export function Tag({
  children,
  variant = 'medium',
  color = valueColorMap[children.toLowerCase()] ?? 'mint',
}) {
  return (
    <span
      className={clsx(
        'font-mono text-[0.625rem] font-semibold leading-6',
        variantStyles[variant],
        colorStyles[color][variant]
      )}
    >
      {children}
    </span>
  )
}
