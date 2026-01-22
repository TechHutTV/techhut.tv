import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Prose } from '@/components/Prose'
import {HeroPattern} from "@/components/HeroPattern";
import {NavigationDocs} from "@/components/NavigationDocs";
import {Header} from "@/components/Header";
import {motion} from "framer-motion";
import {Footer} from "@/components/Footer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {toast} from "react-toastify";
import {AnnouncementBanner} from "@/components/announcement-banner/AnnouncementBanner";
import {useAnnouncements} from "@/components/announcement-banner/AnnouncementBannerProvider";
import {Authors} from "@/components/Author";
import {getAuthors} from "@/data/authors";
import {useSidebarStore} from "@/components/SidebarState";
import {CoverImageBackground} from "@/components/CoverImageBackground";
import {formatDate} from "@/lib/dates";

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)
  let [showJumpToTop, setShowJumpToTop] = useState(false)

  useEffect(() => {
    if (tableOfContents.length === 0) return

    // Get all heading IDs from the table of contents
    const headingIds = tableOfContents.flatMap((node) => [
      node.id,
      ...node.children.map((child) => child.id),
    ])

    function onScroll() {
      let scrollTop = window.scrollY
      setShowJumpToTop(scrollTop > 400)

      // Recalculate positions on each scroll to handle dynamic content (images loading, etc.)
      let current = headingIds[0]
      for (let id of headingIds) {
        let el = document.getElementById(id)
        if (!el) continue

        let rect = el.getBoundingClientRect()
        // Check if heading is at or above the top of viewport (with small offset)
        if (rect.top <= 100) {
          current = id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [tableOfContents])

  return { currentSection, showJumpToTop }
}

export function Layout({ children, title, date, dateModified, tableOfContents, authors: authorNames, coverImage, imagePosition }) {
  let router = useRouter()

  const buttonStyle = {
    display: 'inline',
    minWidth: '90px',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const iconStyle = {
    fontSize: '18px',
  };

  const copyToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    toast.info('Page URL copied to clipboard!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  let { currentSection, showJumpToTop } = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  let { bannerHeight } = useAnnouncements()
  let { isOpen: sidebarIsOpen } = useSidebarStore()
  const [mounted, setMounted] = useState(false)
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false)
  const [isNearLeftEdge, setIsNearLeftEdge] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  // Determine if sidebar should be visible (forced open OR hover)
  const sidebarShouldBeVisible = sidebarIsOpen || (isNearLeftEdge || isHoveringSidebar)
  
  return (
    <>
      <AnnouncementBanner />
      {coverImage ? (
        <CoverImageBackground 
          imageUrl={coverImage} 
          imagePosition={imagePosition} 
        />
      ) : (
        <HeroPattern/>
      )}
      <Header />
      {/* Hover detection zone on left edge (only when sidebar is closed) */}
      {mounted && !sidebarIsOpen && (
        <div
          className="fixed left-0 top-0 bottom-0 w-[15px] z-50 pointer-events-auto lg:block hidden"
          style={{
            top: `calc(${bannerHeight}px + 64px)`,
            zIndex: 50
          }}
          onMouseEnter={() => setIsNearLeftEdge(true)}
          onMouseLeave={() => setIsNearLeftEdge(false)}
          aria-hidden="true"
        />
      )}
      <div
        className="relative mx-auto flex min-h-screen w-full max-w-8xl sm:px-2 lg:px-8 xl:px-12"
        style={{ paddingTop: `calc(${bannerHeight}px + 64px)` }}
      >
        <aside
            className={clsx(
              "contents lg:pointer-events-none lg:fixed lg:z-40 lg:block transition-transform duration-300",
              mounted && !sidebarShouldBeVisible && "lg:-translate-x-full"
            )}
            style={{
              top: `calc(${bannerHeight}px + 64px + 1rem)`,
              left: '1rem',
              bottom: '1rem'
            }}
            onMouseEnter={() => setIsHoveringSidebar(true)}
            onMouseLeave={() => setIsHoveringSidebar(false)}
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:px-6 lg:pb-8 lg:pt-6 lg:bg-white/70 lg:dark:bg-[#0f1012]/70 lg:backdrop-blur-lg 2xl:w-80 lg:overflow-x-visible sidebar-scroll lg:h-[calc(100vh-64px-2rem)] lg:rounded-2xl lg:shadow-xl lg:shadow-zinc-900/10 lg:dark:shadow-black/20 lg:border lg:border-zinc-900/10 lg:dark:border-neutral-700/30">
            <NavigationDocs className="hidden lg:block" />
          </div>
        </aside>
        <div className={clsx(
          "min-w-0 w-full max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 transition-all duration-300",
          !mounted || sidebarShouldBeVisible
            ? "lg:ml-72 2xl:ml-80 lg:pl-8 lg:px-5"
            : "lg:ml-0 lg:pl-32 lg:px-5"
        )}>
          <main className="py-16">
            {title && (
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">{title}</h1>
            )}
            {date && (
              <div className="flex flex-wrap gap-x-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
                <time dateTime={date}>Published {formatDate(date, 'long')}</time>
                {dateModified && dateModified !== date && (
                  <span>· Updated <time dateTime={dateModified}>{formatDate(dateModified, 'long')}</time></span>
                )}
              </div>
            )}
            {authorNames && authorNames.length > 0 && (
              <Authors authors={getAuthors(authorNames)} />
            )}
            <Prose as="article">{children}</Prose>
          </main>
          <Footer />
        </div>
        <div
            className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6 pl-12"
            style={{ top: `calc(${bannerHeight}px + 4.5rem)` }}
        >
          <ol role="list" className="mt-4 space-y-3 text-sm mb-8">
            <li key="copy-link">
              <button
                  style={buttonStyle}
                  onClick={copyToClipboard}
                  className="dark:hover:text-slate-300 dark:text-slate-400 text-slate-500 hover:text-slate-700 font-normal'"
              >
                <FontAwesomeIcon icon={faPaperclip} style={iconStyle} className="icon pr-1" />
                <span>Copy link</span>
              </button>
            </li>
            <li key="edit-on-github">
              <Link
                  href={"https://github.com/TechHutTV/new.techhut.tv/tree/main/src/pages" + router.pathname + ".mdx"}
                  className="dark:hover:text-slate-300 dark:text-slate-400 text-slate-500 hover:text-slate-700 font-normal'"
                  style={{display: "flex", alignItems: 'center'}}
              >
                <FontAwesomeIcon icon={faGithub} style={iconStyle} className="icon pr-1" />
                <span>Edit on Github</span>
              </Link>
            </li>
          </ol>
          <nav aria-labelledby="on-this-page-title" className="w-80">
            {tableOfContents.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2
                    id="on-this-page-title"
                    className="font-display text-sm font-medium text-slate-900 dark:text-white"
                  >
                    On this page
                  </h2>
                  {showJumpToTop && (
                    <button
                      onClick={scrollToTop}
                      className="text-xs text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors flex items-center gap-1"
                      aria-label="Jump to top"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      Top
                    </button>
                  )}
                </div>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <a
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-primary-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </a>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <a
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-primary-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
