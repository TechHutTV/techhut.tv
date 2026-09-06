import { AppDetail } from '@/components/AppDetail'
import appRecords from '@/data/apps.json'
import { articles } from '@/data/articles'
import { getAppDetail } from '@/lib/appDetails.server'

export default function AppPage({ app }) {
  return <AppDetail app={app} />
}

export function getStaticPaths() {
  return { paths: appRecords.map(app => ({ params: { id: app.id } })), fallback: false }
}

export function getStaticProps({ params }) {
  const app = getAppDetail(params.id, appRecords, articles)
  if (!app) return { notFound: true }
  return { props: { app, title: app.name, description: app.details.summary, wide: true, hideTitle: true } }
}
