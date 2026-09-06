import appRecords from '@/data/apps.json'
import { articles } from '@/data/articles'
import repositories from '@/data/app-repositories.json'
import starSnapshot from '@/data/github-stars.json'
import { prepareApps } from '@/lib/appDirectory'
import { getAppStars } from '@/lib/appStars'

export const directoryApps = prepareApps(appRecords, articles).map(app => ({
  ...app,
  githubStars: getAppStars(app.id, repositories, starSnapshot),
}))
