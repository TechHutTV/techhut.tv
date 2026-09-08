# TechHut agent guide

## Scope

These instructions apply to the entire repository. Keep changes focused on the user's request and use the existing documentation as the source of truth.

## Start here

1. Work from the repository root and inspect `git status --short --branch` before editing.
2. Preserve unrelated and uncommitted work. Do not discard, overwrite, stage, or include it in another change.
3. If an article is added or meaningfully updated, complete the required `/apps` coverage audit below before handoff.
4. Read only the documentation relevant to the task, starting with [docs/README.md](docs/README.md).
5. Do not commit, push, force-push, deploy, or change remote services unless the user explicitly asks. Never add AI attribution, co-author trailers, or generated-by credits.
6. Never place credentials, tokens, or environment secrets in source files or command arguments.

## Required article-to-`/apps` flow

For every new article, and any article update that changes the software it substantively covers, follow this completion gate:

`Article changed -> audit /apps coverage -> update qualifying listings or record the exclusion reason -> validate -> handoff`

Do not silently skip the audit.

1. Identify every app the article actually teaches, reviews, or configures. Check aliases and former names. A practical section in a multi-tool guide can qualify.
2. Exclude passing mentions, sponsor-only references, roundup-only entries, hardware reviews, and OS tours. Check archived or explicitly unmaintained projects for an official successor. See the full inclusion rules in [docs/app-directory.md](docs/app-directory.md).
3. For an existing app, add the canonical `/<article-slug>` to its `coverage` in `src/data/apps.json`. Update its description, detail data, sources, links, or `coverageNotes` only when the article makes that necessary. Preserve relevant older coverage.
4. For a new app, complete every item in the new-app checklist below.
5. Add videos only when the YouTube ID, title, and publication date are verified. Do not infer a video from a draft or placeholder link.
6. If no `/apps` change qualifies, state the audit result and exclusion reason in the handoff or pull-request notes.

### New-app checklist

- `src/data/apps.json`: add a unique lowercase-hyphenated ID, reuse an existing category where possible, include canonical coverage, and set `details.href` to `/apps/<id>`.
- `src/data/app-details/<id>.json`: add a complete summary, overview, kind, platforms, verified license, official links, features, and authoritative sources.
- `src/data/app-repositories.json`: select one verified official GitHub repository or use `repository: null`; explain the decision and cite evidence. A mapped `link` must exactly match one link in the detail file.
- `public/app-icons/`: add a verified standalone icon when suitable, then record its source, license, hash, and any changes in `sources.json`. Use generated initials when provenance or contrast is uncertain.
- `src/data/github-stars.json`: run `npm run refresh:stars` when a repository mapping is added or changed and network access is available. A first-time fetch failure may leave the count absent; never invent or transfer a count.

## Repository map

- `src/content/YYYY/MM/slug.mdx`: article source. The filename becomes the canonical `/<slug>` URL.
- `public/docs-static/img/YYYY/MM/slug/`: article cover and inline media.
- `src/data/apps.json`: `/apps` cards and coverage associations.
- `src/data/app-details/<id>.json`: app detail content and research sources.
- `src/data/app-repositories.json`: reviewed GitHub repository mapping for every app.
- `src/data/github-stars.json`: cached GitHub star snapshot.
- `public/app-icons/`: local app icons, licenses, and provenance.
- `src/components`, `src/pages`, `src/lib`, `src/styles`: application code and styling.
- `scripts/` and `tests/`: generators, validators, and offline tests.

For deeper guidance, see [project structure](docs/project-structure.md), [content authoring](docs/content-authoring.md), [app directory](docs/app-directory.md), [MDX components](docs/mdx-components.md), [styling](docs/styling.md), and [deployment](docs/deployment.md).

## General practices

- Follow nearby patterns before introducing a new abstraction, dependency, category, or data shape.
- Prefer small, reviewable changes. Update documentation and tests when behavior or a maintained workflow changes.
- Verify changing or product-specific facts with current, authoritative upstream sources. Record sources in app detail data where applicable.
- Preserve static generation, canonical URLs, responsive behavior, dark-mode support, keyboard access, and visible focus states.
- Do not hand-edit generated article indexes, slug maps, RSS, or sitemap files. Run the documented generators instead; these outputs are ignored by Git.
- Run the narrowest relevant checks first, then broader validation in proportion to the change.

## Article conventions

Follow [docs/content-authoring.md](docs/content-authoring.md) for exports, categories, image layout, and MDX syntax.

- Put the MDX file and media in matching year, month, and slug paths.
- Include all required exports and use an existing author name. Covers should normally be JPG, 16:9, and stored as `cover.jpg`.
- Keep claims supported, links working, commands reproducible, and the author's existing voice intact.
- Run `npm run gen:articles` after article metadata or coverage changes. Use `npm run dev` for local review.

## Validation by change type

Every change:

```sh
git diff --check
```

Review both `git diff` and `git status --short` before handoff.

Article changes:

```sh
npm run gen:articles
```

Run `npm run build` for a new article, MDX or routing changes, and other production-sensitive work.

App-directory changes:

```sh
npm run gen:articles
node --test tests/appDirectory.test.mjs
node --test tests/appStars.test.mjs
node --test tests/appStarsRender.test.mjs
npm run lint
git diff --check
```

For `/apps`, also follow the isolated-build and `scripts/validate-app-build.mjs` procedure in [docs/app-directory.md](docs/app-directory.md). Never overwrite the `.next` directory of an active development server.

At handoff, report changed files, validation performed, checks not run, and the result of the required `/apps` audit.
