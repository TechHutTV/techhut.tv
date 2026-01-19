import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'

import '@/styles/tailwind.css'
import 'focus-visible'
import {Layout} from "@/components/Layout";
import {slugifyWithCounter} from "@sindresorhus/slugify";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {dom} from "@fortawesome/fontawesome-svg-core";
import {AnnouncementBannerProvider} from "@/components/announcement-banner/AnnouncementBannerProvider";
import {ImageZoom} from "@/components/ImageZoom";
import {JsonLd} from "@/components/JsonLd";

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()
    let tableOfContents = collectHeadings(pageProps.sections)

  // Get cover from pageProps (extracted by recmaNextjsStaticProps)
  const cover = pageProps.cover
  const imagePosition = pageProps.imagePosition
  const description = pageProps.description || `${pageProps.title} - TechHut` || 'TechHut - Linux guides, software reviews, and tech content'

  return (
    <ErrorBoundary>
      <Head>
        <style>{dom.css()}</style>
        <title>{`${pageProps.title} - TechHut`}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://techhut.tv${router.asPath}`} />
        <meta property="og:title" content={`${pageProps.title} - TechHut`} />
        <meta property="og:description" content={description} />
        {cover && <meta property="og:image" content={`https://techhut.tv${cover}`} />}
        <meta property="og:site_name" content="TechHut" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://techhut.tv${router.asPath}`} />
        <meta name="twitter:title" content={`${pageProps.title} - TechHut`} />
        <meta name="twitter:description" content={description} />
        {cover && <meta name="twitter:image" content={`https://techhut.tv${cover}`} />}
        <meta name="twitter:creator" content="@techhutofficial" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://techhut.tv${router.asPath}`} />
      </Head>
      <JsonLd
        title={pageProps.title}
        description={description}
        date={pageProps.date}
        authors={pageProps.authors}
        cover={cover}
      />
      <AnnouncementBannerProvider>
          <MDXProvider components={mdxComponents}>
              <Layout
                key={router.asPath}
                title={pageProps.title?.toString()}
                tableOfContents={tableOfContents}
                coverImage={cover}
                imagePosition={imagePosition}
                {...pageProps}
              >
                  <Component {...pageProps} />
              </Layout>
          </MDXProvider>
      </AnnouncementBannerProvider>
      <ToastContainer />
      <ImageZoom />
    </ErrorBoundary>
  )
}

function collectHeadings(sections, slugify = slugifyWithCounter()) {
    let output = []

    if (sections === undefined) {
        return []
    }
    for (let section of sections) {
        if (section.tagName === 'h2' || section.tagName === 'h3') {
            let title = section.title
            let id = section.id
            let tag = section.tag
            if (section.tagName === 'h3') {
                // Check if there's a last item and it's an h2 (has children array)
                const lastItem = output[output.length - 1]
                if (!lastItem || !lastItem.children) {
                    // If no h2 exists, treat h3 as a top-level item
                    // This handles cases where h3 appears before any h2
                    output.push({ id, title, tag, children: [] })
                } else {
                    // Add h3 as a child of the last h2
                    lastItem.children.push({
                        id,
                        title,
                        tag,
                    })
                }
            } else {
                output.push({ id, title, tag, children: [] })
            }
        }

        // Recursively process children if they exist
        if (section.children && Array.isArray(section.children)) {
            output.push(...collectHeadings(section.children, slugify))
        }
    }

    return output
}
