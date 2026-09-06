import { AppDetail } from '@/components/AppDetail'
import appRecords from '@/data/apps.json'
import { articles } from '@/data/articles'
import { prepareApps } from '@/lib/appDirectory'
import details from '@/data/app-details/copyparty.json'
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'

export default function CopypartyPage({ app }) {
  return <AppDetail app={app} />
}

export function getStaticProps() {
  const app = prepareApps(appRecords, articles).find(record => record.id === 'copyparty')
  const contentFiles = ['src/pages/apps/copyparty.jsx', 'src/data/app-details/copyparty.json']
  let updatedAt
  try {
    updatedAt = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...contentFiles], { encoding: 'utf8' }).trim()
  } catch {
    // Source archives may not include Git history.
  }
  if (!updatedAt) {
    updatedAt = new Date(Math.max(...contentFiles.map(file => statSync(file).mtimeMs))).toISOString()
  }
  app.details = { ...app.details, ...details, updatedAt }
  return {
    props: {
      app,
      title: app.name,
      description: app.details.summary,
      wide: true,
      hideTitle: true,
    },
  }
}
