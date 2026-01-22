import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'

import { Heading } from '@/components/Heading'
import { YouTube } from '@/components/YouTube'

/**
 * Generates a human-readable alt text from an image filename
 * @param {string} src - Image source path
 * @returns {string} Generated alt text
 */
function generateAltFromFilename(src) {
  if (!src) return 'Image'

  // Extract filename from path
  const filename = src.split('/').pop()
  if (!filename) return 'Image'

  // Remove extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

  // Convert kebab-case, snake_case, or camelCase to readable text
  const readable = nameWithoutExt
    .replace(/[-_]/g, ' ')  // Replace dashes and underscores with spaces
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // Add space before capital letters
    .replace(/\b\w/g, (c) => c.toUpperCase())  // Capitalize first letter of each word
    .replace(/\s+/g, ' ')  // Clean up multiple spaces
    .trim()

  return readable || 'Image'
}

/**
 * Optimized image component for MDX
 * - Generates alt text from filename if not provided
 * - Uses Next.js Image for optimization (lazy loading, modern formats)
 * - Falls back to img for GIFs to preserve animation
 */
function MdxImage({ src, alt, title, ...props }) {
  // Generate alt text if not provided or empty
  const imageAlt = alt || generateAltFromFilename(src)

  // Check if it's a GIF (animated images don't work well with Next.js Image optimization)
  const isGif = src?.toLowerCase().endsWith('.gif')

  // Check if it's an external image
  const isExternal = src?.startsWith('http://') || src?.startsWith('https://')

  // For GIFs or external images, use regular img tag with lazy loading
  if (isGif || isExternal) {
    return (
      <img
        src={src}
        alt={imageAlt}
        title={title}
        loading="lazy"
        decoding="async"
        className="rounded-lg"
        {...props}
      />
    )
  }

  // For local static images, use Next.js Image with fill mode
  return (
    <span className="block relative my-4">
      <Image
        src={src}
        alt={imageAlt}
        title={title}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        className="rounded-lg w-full h-auto"
        style={{ width: '100%', height: 'auto' }}
        loading="lazy"
        {...props}
      />
    </span>
  )
}

// Custom link component that adds security attributes for external links
function SafeLink({ href, children, ...props }) {
  // Check if the link is external
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'))

  if (isExternal) {
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    )
  }

  // Internal link - use Next.js Link
  return <Link href={href} {...props}>{children}</Link>
}

export const a = SafeLink
export const img = MdxImage
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'
export { Badge } from '@/components/Badge'
export { YouTube }

export const h2 = function H2(props) {
  return <Heading level={2} {...props} />
}

export const h3 = function H3(props) {
  return <Heading level={3} {...props} />
}

export const h4 = function H4(props) {
  return <Heading level={4} {...props} />
}

export const h5 = function H5(props) {
  return <Heading level={5} {...props} />
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

function WarningIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 3.5L3.5 12.5h9L8 3.5z"
      />
      <circle cx="8" cy="9" r=".5" fill="none" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 6.5v1"
      />
    </svg>
  )
}

function SuccessIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.5 8l2 2 3-3"
      />
    </svg>
  )
}

export function Note({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-l border border-primary-500/20 bg-primary-50/50 p-4 leading-6 text-primary-900 dark:border-primary-500/30 dark:bg-primary-500/5 dark:text-primary-200 dark:[--tw-prose-links-hover:theme(colors.primary.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-primary-500 stroke-white dark:fill-primary-200/20 dark:stroke-primary-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Warning({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-l border border-red-500/20 bg-red-50/50 p-4 leading-6 text-red-900 dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-200 dark:[--tw-prose-links-hover:theme(colors.red.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <WarningIcon className="mt-1 h-4 w-4 flex-none fill-red-500 stroke-white dark:fill-red-200/20 dark:stroke-red-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Success({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-l border border-green-500/20 bg-green-50/50 p-4 leading-6 text-green-900 dark:border-green-500/30 dark:bg-green-500/5 dark:text-green-200 dark:[--tw-prose-links-hover:theme(colors.green.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <SuccessIcon className="mt-1 h-4 w-4 flex-none fill-green-500 stroke-white dark:fill-green-200/20 dark:stroke-green-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Row({ children }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({ children, sticky = false }) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24'
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({ name, type, required, min, max, minLen, maxLen, enumList, children }) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        <dt className="sr-only">Type</dt>
        <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
          {type}
        </dd>
        <dt className="sr-only">Required</dt>
          {required && <dd className="font-mono text-xs text-red-600 dark:text-red-600">
          required
        </dd>}
          {!required && <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
          optional
        </dd>}
        <dt className="sr-only">Enum</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
            {min && !max && <div><strong>Possible Values: </strong><code className="text-sky-600 bg-sky-400/10">&gt;={min}</code></div>}
            {max && !min && <div><strong>Possible Values: </strong><code className="text-sky-600 bg-sky-400/10">&lt;={max}</code></div>}
            {min && max && <div><strong>Possible Values: </strong><code className="text-sky-600 bg-sky-400/10">&gt;={min}</code><text> and </text><code className="text-sky-600 bg-sky-400/10">&lt;={max}</code></div>}
            {minLen && !maxLen && <div><strong>Possible Values: </strong><code className="text-sky-600 bg-sky-400/10">&gt;={minLen} {type === "string" ? "characters" : "objects"}</code></div>}
            {maxLen && !minLen && <div><strong>Possible Values: </strong><code className="text-sky-600 bg-sky-400/10">&lt;={maxLen} {type === "string" ? "characters" : "objects"}</code></div>}
            {minLen && maxLen && <div><strong>Possible Values: </strong><code className="text-sky-600 bg-sky-400/10">&gt;={minLen} {type === "string" ? "characters" : "objects"}</code><text> and </text><code className="text-sky-600 bg-sky-400/10">&lt;={maxLen} {type === "string" ? "characters" : "objects"}</code></div>}
        </dd>
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

export function Video({ src, controls = "yes", type, preload = "metadata", ...props }) {
  const videoType = type || (src?.endsWith('.webm') ? 'video/webm' : src?.endsWith('.mp4') ? 'video/mp4' : undefined)

  return (
    <div className="my-6">
      <video
        className="w-full rounded-lg"
        controls={controls === "yes" || controls === true}
        preload={preload}
        {...props}
      >
        <source src={src} type={videoType} />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

// Table components with horizontal scroll wrapper and explicit styling
export function table({ children, ...props }) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700" {...props}>
        {children}
      </table>
    </div>
  )
}

export function thead({ children, ...props }) {
  return (
    <thead className="bg-zinc-50 dark:bg-zinc-800" {...props}>
      {children}
    </thead>
  )
}

export function tbody({ children, ...props }) {
  return (
    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-900" {...props}>
      {children}
    </tbody>
  )
}

export function tr({ children, ...props }) {
  return (
    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors" {...props}>
      {children}
    </tr>
  )
}

export function th({ children, ...props }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider" {...props}>
      {children}
    </th>
  )
}

export function td({ children, ...props }) {
  return (
    <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap" {...props}>
      {children}
    </td>
  )
}
