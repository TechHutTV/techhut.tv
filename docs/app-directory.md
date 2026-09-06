# App directory

`/apps` lists software with a full TechHut article, practical guide, or focused video. Video coverage starts January 1, 2021 and focuses on desktop, terminal and self-hosted software, including focused extensions. Hardware reviews, OS tours, roundup-only and sponsor-only mentions are excluded. A multi-tool setup guide can support separate entries for tools it actually walks through.

Exclude archived or explicitly unmaintained projects after checking for a maintained successor or repository move. Do not remove software solely because its last release is old. See [the maintenance review](app-maintenance-review.md) for the latest findings.

Add or update entries in `src/data/apps.json`:

- `id`: unique, stable identifier.
- `name`: app name.
- `category`: reuse an existing category where possible.
- `description`: short description of the tool and the coverage, without claims about its current maintenance or pricing.
- `icon`: local logo path, if a verified logo is available. Otherwise the card uses initials.
- `iconDark`: optional light logo variant for dark backgrounds.
- `iconInvertDark` / `iconInvertLight`: invert monochrome icons only in the specified theme for contrast.
- `coverage`: every qualifying canonical article path; may be empty for video-only apps. Audit article bodies for names, aliases, and former names. Include practical sections in multi-tool guides, but exclude roundup-only, sponsor-only, and passing mentions. Keep relevant historical guides alongside newer guides and label explicitly outdated instructions with `coverageNotes` in the app detail file.
- `videos`: optional list of verified YouTube videos with `id`, `title`, and ISO `published` date. An app must have article or video coverage. Keep every verified match from 2021 onward.
- `details.href`: `/apps/<id>`. Every current card links to its static detail page. Add the matching detail JSON before exposing a new route.

Article titles, summaries, covers, and publication dates come from the generated article index. Do not edit generated article metadata by hand. The site reads video metadata directly from `src/data/apps.json`. `prepareApps` deduplicates articles by canonical URL and videos by ID and sorts each newest first. The original research archive is stored separately in `~/Desktop/research/youtube`; it is not needed to build or test the site. The initial review used public video titles, descriptions and chapters, not transcripts or full videos. Search, categories, and alphabetical/recent sorting still use the newest coverage publication date, independently of the detail page's last-updated date.

## Detail pages

`src/pages/apps/[id].jsx` statically generates all current app IDs with `fallback: false`; unknown IDs return 404. This includes the original `/apps/copyparty` URL. Each app has a dedicated `src/data/app-details/<id>.json` containing:

- `summary`: a short introduction, also used for page metadata. `overview`: a fuller explanation of how the app works, how its features fit together, and useful workflow context, displayed as a second paragraph on the detail page. The directory card keeps its separate short `description` in `apps.json`.
- `kind`, `platforms`, and a short verified `features` list. Distinguish native platforms from a container or VM deployment, and identify extensions and terminal tools accurately.
- `license.name`, `license.type`, and `license.url`. State the software license, including proprietary, freemium, source-available, and component/edition distinctions. Link the actual license or official licensing/download terms; a logo license is unrelated.
- `links`: useful official destinations, labeled for their actual host. `sources` records the upstream documentation and license evidence for maintainers; it is not a manual date stamp.
- Optional `coverageNotes`, keyed by canonical article URL, for historical or explicitly outdated guidance.

The shared `AppDetail` preserves Copyparty's approved structure: directory back link, overview and project links, license/platforms/date, features, full-width `FeaturedArticle` previews, then full-width `AppVideo` previews. Missing coverage sections are omitted. Video buttons start collapsed with a thumbnail, title, and publication date. A native button supports mouse, Enter, and Space; `aria-expanded` describes its state. Expanding mounts the inline privacy-enhanced YouTube iframe; collapsing unmounts it to stop playback. No YouTube player is rendered initially. There are no tabs, modals, or article/video columns.

The page uses `wide: true` and `hideTitle: true` to preserve one visible heading. Titles, descriptions, and canonical URLs use the existing `_app.jsx` conventions. Local icons retain dark variants and inversion flags; apps without artwork use initials. Dates use explicit UTC formatting across server and client, including shared article previews.

## Last updated

`src/lib/appDetails.server.js` runs only during static generation. Last updated is the latest relevant Git committer date across the app's dedicated detail JSON, linked original MDX articles, and changes to that app's own parsed record in `apps.json` (including video metadata and coverage associations). The original Copyparty route history is also retained. Shared layouts, the dynamic route implementation, generated article indexes, software releases, and build/review time do not refresh all app dates.

The shared directory file is inspected record by record across Git snapshots, cached per build worker. An edit to one app does not advance another app's record date. Files without Git history use their local modification time, including new uncommitted detail files. Existing tracked files keep their committed date until changes are committed. With no Git checkout, local file modification times provide the same fallback without crashing; preserve file times when packaging source archives if stable dates are required. Shallow checkouts can only report the history present, so full history is preferred. Fallback dates in source archives may reflect extraction times. No research archive is required at build time.

Sitemap generation includes every app route and uses the same derived date for its `lastmod`.

See [the detail-page coverage audit](app-detail-coverage-review.md) for the current associations and review boundaries.

After editing, run:

```sh
npm run gen:articles
node --test tests/appDirectory.test.mjs
npm run lint
git diff --check
```

Validate production generation in a separate temporary copy of the project, preserving source file times and making Git history and dependencies available there. Do not run `next build` against the `.next` directory of an active development server. In the isolated copy run `npm run build`, then run `node scripts/validate-app-build.mjs /absolute/path/to/copy` from this repository. The validator checks every generated route, card link, canonical URL, heading, coverage ordering, collapsed players, and sitemap date. An isolated `next start -p <unused-port>` can additionally verify actual 200/404 responses. Browser inspection should cover desktop/mobile and both themes, plus video expansion, keyboard operation, and stopping playback on collapse; static HTML checks do not replace those interaction checks.

Logo files are stored in `public/app-icons`. Upstream revisions, source URLs, and license references are recorded in `sources.json` alongside copies of the collection licenses. Flathub records distinguish the reported software license from artwork ownership. Use standalone app icons rather than wordmarks, prefer transparent assets, and retain initials when no suitable icon is verified. Keep provenance and visible attribution when adding or replacing one; record any SVG framing or theme contrast adjustments in `changes`.
