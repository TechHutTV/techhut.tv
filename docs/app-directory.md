# App directory

`/apps` lists software with a full TechHut article, practical guide, or focused video. Video coverage starts January 1, 2021 and focuses on desktop, terminal and self-hosted software, including focused extensions. Hardware reviews, OS tours, roundup-only and sponsor-only mentions are excluded. A multi-tool setup guide can support separate entries for tools it actually walks through.

Add or update entries in `src/data/apps.json`:

- `id`: unique, stable identifier.
- `name`: app name.
- `category`: reuse an existing category where possible.
- `description`: short description of the tool and the coverage, without claims about its current maintenance or pricing.
- `icon`: local logo path, if a verified logo is available. Otherwise the card uses initials.
- `iconDark`: optional light logo variant for dark backgrounds.
- `coverage`: existing article paths; may be empty for video-only apps. Prefer the current guide over an explicitly outdated one.
- `videos`: optional list of verified YouTube videos with `id`, `title`, and ISO `published` date. An app must have article or video coverage. Keep historical matches in the data; the card links to the newest video.

Article titles and publication dates come from the generated article index. The site reads video metadata directly from `src/data/apps.json`. The original research archive is stored separately in `~/Desktop/research/youtube`; it is not needed to build or test the site. The initial review used public video titles, descriptions and chapters, not transcripts or full videos. The page supports search, category filtering, and alphabetical or recent-coverage sorting using the newest article or video date. It uses the shared site layout with `wide = true` to leave room for the grid.

After editing, run:

```sh
npm run gen:articles
node --test tests/appDirectory.test.mjs
npm run lint
```

Logo files are stored in `public/app-icons`. Exact upstream revisions, source URLs, and licenses are recorded in `sources.json` alongside copies of the collection licenses. Logos are unmodified; keep provenance and visible attribution when adding or replacing one.
