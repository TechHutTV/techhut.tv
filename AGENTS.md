# TechHut agent guide

## Scope

These instructions apply to the entire repository. Use the existing documentation as the source of truth and keep changes focused on the user's request.

## Start here

1. Work from the repository root and inspect `git status --short --branch` before editing.
2. Preserve unrelated and uncommitted work. Do not discard, overwrite, stage, or include it in another change.
3. Read only the documentation relevant to the task, starting with [docs/README.md](docs/README.md).
4. Do not commit, push, force-push, deploy, or change remote services unless the user explicitly asks.
5. Never place credentials, tokens, private URLs, or environment secrets in source files or command arguments.

## Repository map

- `src/content/YYYY/MM/slug.mdx`: article source. The filename becomes the canonical `/<slug>` URL.
- `public/docs-static/img/YYYY/MM/slug/`: article cover and inline media.
- `src/data/apps.json`: `/apps` directory cards and coverage associations.
- `src/data/app-details/<id>.json`: app detail-page content and research sources.
- `src/data/app-repositories.json`: reviewed GitHub repository mapping for every app.
- `src/data/github-stars.json`: generated, cached GitHub star snapshot.
- `public/app-icons/`: local app icons, licenses, and `sources.json` provenance.
- `src/components`, `src/pages`, `src/lib`, `src/styles`: Next.js pages, React components, utilities, and styling.
- `scripts/` and `tests/`: generators, validators, and offline tests.

For deeper guidance, see [project structure](docs/project-structure.md), [content authoring](docs/content-authoring.md), [app directory](docs/app-directory.md), [MDX components](docs/mdx-components.md), [styling](docs/styling.md), and [deployment](docs/deployment.md).

## General practices

- Follow nearby patterns before introducing a new abstraction, dependency, category, or data shape.
- Prefer small, reviewable changes. Update documentation and tests when behavior or a maintained workflow changes.
- Verify changing or product-specific facts with current, authoritative upstream sources. Record those sources in app detail data where applicable.
- Preserve static generation, canonical URLs, responsive behavior, dark-mode support, keyboard access, and visible focus states.
- Do not hand-edit generated article indexes, slug maps, RSS, or sitemap files. Run the documented generators instead; these outputs are ignored by Git.
- Run the narrowest relevant checks first, then broader validation in proportion to the change. Review `git diff` and `git diff --check` before handoff.

## Article workflow

Follow [docs/content-authoring.md](docs/content-authoring.md) for exports, categories, image layout, and MDX syntax.

- Put the MDX file and media in matching year, month, and slug paths.
- Include all required exports and use an existing author name. Covers should normally be JPG, 16:9, and stored as `cover.jpg`.
- Keep claims supported, links working, commands reproducible, and the author's existing voice intact.
- Run `npm run gen:articles` after article metadata or coverage changes. Use `npm run dev` for local review and `npm run build` for production validation when appropriate.

## Required `/apps` audit for article changes

Before considering a new article complete, or after an article update changes the software it substantively covers, audit `/apps` in the same working change. Do not silently skip this step.

1. Identify every app the article actually teaches, reviews, or configures. Check aliases and former names. A practical section in a multi-tool guide can qualify.
2. Exclude passing mentions, sponsor-only references, roundup-only entries, hardware reviews, and OS tours. Check archived or explicitly unmaintained projects for an official successor. Use the full inclusion rules in [docs/app-directory.md](docs/app-directory.md).
3. For an existing app, add the canonical `/<article-slug>` to `coverage` in `src/data/apps.json`. Update its description, detail data, sources, official links, or `coverageNotes` only when the new article makes that necessary. Preserve relevant older coverage.
4. For a new app, add all of the following:
   - A unique lowercase-hyphenated record in `src/data/apps.json`, reusing an existing category where possible and linking `details.href` to `/apps/<id>`.
   - A complete `src/data/app-details/<id>.json` with summary, overview, kind, platforms, verified license, official links, features, and authoritative sources.
   - An entry in `src/data/app-repositories.json`. Select one verified official GitHub repository or use `repository: null`; always explain the decision and cite evidence. A mapped `link` must exactly match one link in the detail file.
   - A verified local icon when suitable. Update `public/app-icons/sources.json` and retain the upstream license/attribution. If provenance or contrast is uncertain, use the generated initials instead.
5. Add videos only when the YouTube ID, title, and publication date are verified. Do not infer a video from a draft or placeholder link.
6. Refresh `src/data/github-stars.json` with `npm run refresh:stars` when adding or changing a repository mapping and network access is available. A first-time fetch failure may leave the count absent; never invent or transfer a count.
7. If the audit produces no `/apps` change, state that in the handoff or pull-request notes and give the exclusion reason.

## Validation

For article and app-directory work, run:

```sh
npm run gen:articles
node --test tests/appDirectory.test.mjs
node --test tests/appStars.test.mjs
node --test tests/appStarsRender.test.mjs
npm run lint
git diff --check
```

Run `npm run build` for production-sensitive changes. When validating `/apps`, follow the isolated-build and `scripts/validate-app-build.mjs` procedure in [docs/app-directory.md](docs/app-directory.md); never overwrite the `.next` directory of an active development server.

At handoff, report changed files, validation performed, any checks not run, and the result of the required `/apps` audit.
