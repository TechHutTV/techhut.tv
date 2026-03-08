'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/Button'
import { articles } from '@/data/articles'

export function HeroSection({
  title = 'Your Homelab Starts Here.',
  subtitle = 'Whether you\'re building your first home server, exploring Linux distributions, or diving into self-hosted solutions, TechHut has you covered. Our content ranges from beginner-friendly tutorials to advanced homelab configurations, all designed to help you get the most out of your technology.',
  articleCount = articles.length,
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="not-prose mb-16 mt-2"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        {subtitle}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button
          variant="primary"
          arrow="right"
          href="https://youtube.com/@techhut"
        >
          Subscribe on YouTube
        </Button>
        <Button
          variant="outline-arrow"
          arrow="right"
          href="#latest-articles"
        >
          Browse Articles
        </Button>
      </div>

      <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        {articleCount}+ guides and tutorials
      </p>
    </motion.div>
  )
}
