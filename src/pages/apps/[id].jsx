import { AppDetail } from '@/components/AppDetail'
import appRecords from '@/data/apps.json'
import { articles } from '@/data/articles'
import { getAppDetail } from '@/lib/appDetails.server'
import { getAppStars } from '@/lib/appStars'
import repositories from '@/data/app-repositories.json'
import starSnapshot from '@/data/github-stars.json'

export default function AppPage({ app }) {
  return <AppDetail app={app} />
}

export function getStaticPaths() {
  return { paths: appRecords.map(app => ({ params: { id: app.id } })), fallback: false }
}

export function getStaticProps({ params }) {
  const app = getAppDetail(params.id, appRecords, articles)
  if (!app) return { notFound: true }
  app.githubStars = getAppStars(app.id, repositories, starSnapshot)
  return { props: { app, title: app.name, description: app.details.summary, wide: true, hideTitle: true } }
}
