import { useRouter } from 'next/router'
import Head from 'next/head'
import { getAuthor } from '@/data/authors'

const SITE_URL = 'https://techhut.tv'
const SITE_NAME = 'TechHut'

/**
 * Organization schema - represents the TechHut brand
 */
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [
      'https://youtube.com/@techhut',
      'https://x.com/TechHutTV',
      'https://github.com/TechHutTV',
      'https://www.linkedin.com/in/hopki',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/partner`,
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  )
}

/**
 * WebSite schema - helps with sitelinks search box
 */
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  )
}

/**
 * Article schema - for blog posts and articles
 */
export function ArticleJsonLd({ title, description, date, authors, cover, dateModified }) {
  const router = useRouter()
  const url = `${SITE_URL}${router.asPath}`

  // Build author array for schema
  const authorSchema = authors?.map((authorName) => {
    const authorData = getAuthor(authorName)
    if (authorData) {
      return {
        '@type': 'Person',
        name: authorData.name,
        image: authorData.image ? `${SITE_URL}${authorData.image}` : undefined,
        url: authorData.social?.find((s) => s.platform === 'twitter')?.url,
      }
    }
    return {
      '@type': 'Person',
      name: authorName,
    }
  }) || [{
    '@type': 'Organization',
    name: SITE_NAME,
  }]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: authorSchema.length === 1 ? authorSchema[0] : authorSchema,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    ...(date && { datePublished: date }),
    ...(dateModified && { dateModified: dateModified }),
    ...(cover && {
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${cover}`,
      },
    }),
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  )
}

/**
 * BreadcrumbList schema - for navigation hierarchy
 */
export function BreadcrumbJsonLd({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  )
}

/**
 * Combined JSON-LD component that outputs all relevant schemas
 * based on page props
 */
export function JsonLd({ title, description, date, authors, cover, dateModified }) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const hasArticleData = title && (date || authors?.length > 0)

  // Build breadcrumb items based on current path
  const pathSegments = router.asPath.split('/').filter(Boolean)
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      // Convert slug to readable name
      const name = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return { name: title && index === pathSegments.length - 1 ? title : name, href }
    }),
  ]

  return (
    <>
      {/* Always include Organization and WebSite schemas */}
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* Include Article schema if we have article data */}
      {hasArticleData && (
        <ArticleJsonLd
          title={title}
          description={description}
          date={date}
          authors={authors}
          cover={cover}
          dateModified={dateModified}
        />
      )}

      {/* Include Breadcrumb schema for non-home pages */}
      {!isHomePage && breadcrumbItems.length > 1 && (
        <BreadcrumbJsonLd items={breadcrumbItems} />
      )}
    </>
  )
}
