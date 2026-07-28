import { Head, Html, Main, NextScript } from 'next/document'
import {GoogleTagManagerBodyScript, GoogleTagManagerHeadScript} from "@/components/GoogleTagManager";

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <meta name="impact-site-verification" value="2434c9ce-fde2-4725-bf62-d7cdc5c68e89" />
          <GoogleTagManagerHeadScript />
          <script dangerouslySetInnerHTML={{ __html: modeScript }} />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#EFF6F1" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0B1512" media="(prefers-color-scheme: dark)" />
      </Head>
      <body className="font-sans bg-light text-zinc-700 antialiased dark:bg-dark dark:text-ink-dim">
        <GoogleTagManagerBodyScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
