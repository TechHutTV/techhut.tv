import { Outfit, Inter, JetBrains_Mono } from 'next/font/google'

// Three faces, three jobs (Spearmint Ice):
// Outfit is the display voice, Inter the body voice, JetBrains Mono the accent voice.

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})
