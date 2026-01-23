import { Tag } from '@/components/Tag'

function Eyebrow({ tag, label }) {
  if (!tag && !label) {
    return null
  }

  return (
    <div className="flex items-center gap-x-3">
      {tag && <Tag>{tag}</Tag>}
      {tag && label && (
        <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      )}
      {label && (
        <span className="font-mono text-xs text-zinc-400">{label}</span>
      )}
    </div>
  )
}

export function Heading({
  level = 2,
  children,
  id,
  tag,
  label,
  anchor,
  ...props
}) {
  let Component = `h${level}`

  return (
    <>
      <Eyebrow tag={tag} label={label} />
      <Component
        id={id}
        className={tag || label ? 'mt-2 scroll-mt-36' : 'scroll-mt-32'}
        {...props}
      >
        {children}
      </Component>
    </>
  )
}
