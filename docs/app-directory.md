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

The homepage shows the twelve most recently covered apps in a horizontally scrollable row between the hero's guide count and “Browse by Topic.” `RecentApps` uses the same `AppCard` component and prepared `directoryApps` data as the directory, including icons, summaries, cached stars, and full-card detail links. Selection uses the newest article or video coverage date, with alphabetical ties, and updates automatically as coverage changes. Adjust its `limit` prop to change how many apps are included. The row shows three cards on wide desktops, two on tablets, and a partial next card on phones. Native scrolling supports touch and trackpads; labeled previous/next buttons advance a viewport, respect reduced motion, and disable at the ends. The scroll region and all card links are keyboard-focusable. Homepage cards use third-level headings beneath the section heading.

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

Sitemap generation includes every app route and uses the same derived date for its `lastmod`. GitHub star statistics, repository mappings, and their refresh commits are excluded from content dates. Adding or changing an official link in an app's dedicated detail JSON is a content edit; daily count refreshes never write those files.

## GitHub stars

Directory cards display a small cached GitHub star count in place of the former “Covered” date. The entire card remains one keyboard-accessible link to its app page. The corresponding detail page shows the same badge inside the relevant official project link. Counts use deterministic compact formatting (`12.3k GitHub stars`) and include the full number and repository name for screen readers. Hover text identifies the chosen project. Zero is a valid count. Missing repositories or missing valid cache entries render no badge, footer border, or placeholder. A shared note near the controls explains that some apps are hosted elsewhere or have no public repository. The “Most GitHub stars” sort places missing counts last (after genuine zero), with alphabetical ties, and works with search and categories. Recent-coverage sorting still uses the original publication dates. Stars indicate popularity, not software quality or maintenance.

`src/data/app-repositories.json` records one explicit repository per eligible app, its existing official link, a label, the selection reason, and upstream evidence URLs. Every other app has `repository: null` with a reason. `src/data/github-stars.json` is the separate generated snapshot, keyed by lowercase `owner/repository`; entries contain the repository identity, `stars` from GitHub's `stargazers_count`, and `fetchedAt`. Neither normal builds nor browsers call GitHub. The default build works with the checked-in cache and needs no token.

The initial snapshot contains **104 repositories for 104 apps**, with **22 explicit omissions** across the current 126 apps. The current source repositories and public API identities/descriptions were checked against the existing official project links and the site owner's selected repositories. Notable choices:

- **Docker → `docker/compose`**, selected by the site owner. The detail page labels its link “Docker Compose”; the Engine link and mixed licensing remain separate.
- **Plex → `plexinc/pms-docker`**, selected by the site owner. This official Docker packaging repository is labeled “Official Docker image”; Plex Media Server remains proprietary.
- **AMP → `cubecoders/amp`**, selected by the site owner. Its README identifies issue tracking and documentation, so the link is labeled “Official issue tracker”; this is not a claim that AMP's proprietary source is public.
- **Kdenlive → `kde/kdenlive`** and **Nala → `volitank/nala`**, selected by the site owner. Kdenlive's official KDE mirror links back to Invent. Nala's maintainer repository describes a Rust rewrite with the Python-era source preserved under `legacy/python`. Existing GitLab links and historical coverage remain unchanged.
- Home Assistant → Core; Jellyfin and Nextcloud → their servers; Moonlight → the desktop Qt client; ONLYOFFICE Workspace → CommunityServer. Counts are not sums across components.
- Kiwix → `kiwix/kiwix-tools`, including the self-hosted `kiwix-serve` workflow covered here. InfluxDB → its main repository, not a separate count for historical version 2.
- Apache HTTP Server and Git use their official published GitHub mirrors; mapping labels identify them as mirrors. Unofficial mirrors are excluded.
- Gluetun, Podman, and Super Productivity now resolve to `passteque/gluetun`, `podman-container-tools/podman`, and `super-productivity/super-productivity`. The mapping records the verified redirects from the existing project links.
- jp2a and LocalTuya have fork ancestry, but their upstream READMEs identify these as the maintained/covered applications. Yacht's existing link is now a fork and points to multiple rewrites, so its count is omitted pending a clear repository choice. Its app page and coverage remain available.
- Proprietary applications without an applicable public repository and projects without a selected official GitHub repository or mirror omit counts. These include GNOME GitLab applications, KDE Connect and Discover, and Proxmox. The full per-app reasons live in the mapping.

After verifying a new repository or transfer against authoritative project sources, update the mapping and its evidence. Keep `link` equal to the corresponding URL in the app's detail JSON. A known redirect can retain the old official link; the `repository` must name the current destination. Add a clearly labeled link to the detail file if no corresponding link exists. Explicitly selected official packaging repositories, issue trackers, and mirrors must be labeled for what they represent; AMP is the owner's explicit tracker selection. Do not infer substitutions from icon provenance, dependencies, unofficial mirrors, or organization-wide totals.

### Refresh locally

With Node.js 22 or later, run `npm run refresh:stars` from the project root. Set `GITHUB_TOKEN` or `GH_TOKEN` through the environment if available; do not put tokens in files or command arguments. Public repository metadata requires no write permission. Unauthenticated requests work but GitHub's lower rate limit may prevent refreshing the full directory in one run.

The script validates the mapping and fetches each distinct repository once, serially. Requests time out after 15 seconds and retry transient failures at most twice. Rate limits honor `Retry-After` or the primary-limit reset; secondary limits without timing information wait at least a minute. A wait exceeding 60 seconds, exhausted rate-limit retries, or an authentication failure defers remaining requests to the next run. Logs report each attempt without response bodies or credentials.

A failure retains that repository's last valid count, while other successes can update. A newly mapped repository never inherits the old repository's count. Redirects and identity mismatches require manual verification rather than silently assigning another project's stars. Removed mappings are pruned. Partial refreshes report warnings; a run with failures and no successes exits unsuccessfully. Invalid local JSON fails without overwriting the snapshot.

Successful changed counts get the time of their API response. Unchanged counts retain their earlier `fetchedAt`: it means “this value was successfully observed at this time,” not “the last scheduled attempt.” Successful rechecks are logged. Consequently, timestamp-only changes never cause a daily commit. Snapshot output is sorted and written atomically; an identical result does not touch the file.

### Daily automation and deployment setup

`.github/workflows/refresh-app-stars.yml` prepares a daily **09:23 UTC** refresh plus manual dispatch on `main`. GitHub schedules may be delayed. It is gated by `APP_STARS_ENABLED` and does not run on pushes or pull requests, preventing a refresh/commit loop. The workflow needs no dependency installation: its script and offline tests use Node built-ins.

The existing deployment documentation specifies Vercel's Git integration and production pushes to `main`. The workflow therefore makes a normal push with a dedicated fine-grained personal access token, and the existing Vercel integration builds the committed snapshot. It does not add a second deploy hook. GitHub documents that ordinary push events made with `GITHUB_TOKEN` do not trigger other Actions workflows; a PAT also preserves the normal event path if deployment checks are added later. See [GitHub workflow triggering](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow) and [Vercel's GitHub integration](https://vercel.com/docs/git/vercel-for-github).

Owner setup after reviewing and merging this work:

1. Confirm the connected Vercel project deploys `main`, and that its author/access requirements permit the chosen automation identity. Remote project settings were not changed or assumed verified by the local implementation.
2. Add the Actions secret `APP_STARS_PUSH_TOKEN`: a fine-grained PAT limited to **this repository**, with **Contents: read/write** and the automatically included metadata read permission. Do not grant workflow editing, administration, or organization-wide access. This token is used for checkout and the snapshot push; the normal read-only `GITHUB_TOKEN` fetches public star metadata.
3. Set repository variables `APP_STARS_COMMIT_NAME` and `APP_STARS_COMMIT_EMAIL` to the automation identity associated with GitHub and permitted by Vercel. Use its verified or GitHub-provided no-reply email.
4. Confirm the identity can use the existing branch rules. The workflow never force-pushes, bypasses protection, or auto-merges. If rules require PRs for every update, keep automation disabled until a reviewed PR-based publishing process is configured; do not weaken protection just for statistics.
5. Set repository variable `APP_STARS_ENABLED` to `true`, manually dispatch on `main`, and verify the resulting single-file commit and Vercel production build. Rotate the token before expiry. None of these remote actions are performed by local validation.

Only `src/data/github-stars.json` can be staged by the publishing step, and the staged file list is checked before committing. Unchanged snapshots produce no commit or deployment. A concurrent change to `main` makes the ordinary push fail safely; rerun the refresh against the new head. Auth, protection, or Vercel failures require fixing the relevant setup and rerunning, without changing app content dates. See [GitHub API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api) and [repository metadata endpoint](https://docs.github.com/en/rest/repos/repos#get-a-repository) for the API behavior.

See [the detail-page coverage audit](app-detail-coverage-review.md) for the current associations and review boundaries.

After editing, run:

```sh
npm run gen:articles
node --test tests/appDirectory.test.mjs
node --test tests/appStars.test.mjs
node --test tests/appStarsRender.test.mjs
npm run lint
git diff --check
```

Validate production generation in a separate temporary copy of the project, preserving source file times and making Git history and dependencies available there. Do not run `next build` against the `.next` directory of an active development server. In the isolated copy run `npm run build`, then run `node scripts/validate-app-build.mjs /absolute/path/to/copy` from this repository. The validator checks every generated route, card link, canonical URL, heading, coverage ordering, collapsed players, and sitemap date. An isolated `next start -p <unused-port>` can additionally verify actual 200/404 responses. Browser inspection should cover desktop/mobile and both themes, plus video expansion, keyboard operation, and stopping playback on collapse; static HTML checks do not replace those interaction checks.

Logo files are stored in `public/app-icons`. Upstream revisions, source URLs, and license references are recorded in `sources.json` alongside copies of the collection licenses. Flathub records distinguish the reported software license from artwork ownership. Use standalone app icons rather than wordmarks, prefer transparent assets, and retain initials when no suitable icon is verified. Keep provenance and visible attribution when adding or replacing one; record any SVG framing or theme contrast adjustments in `changes`.

Whisper uses the OpenAI logo selected by the site owner, copied unmodified from the existing pinned selfh.st collection. Its SVG hash, source, collection license, and dark-theme CSS inversion are recorded in `sources.json`; the directory's existing selfh.st attribution covers the collection credit. Bubble Card retains the owner's supplied icon.
