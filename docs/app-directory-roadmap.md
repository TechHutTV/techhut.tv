# App directory gaps and opportunities

Planning snapshot: September 6, 2026. These are proposed improvements, not implemented features. Recheck the current code and data before starting an item.

The directory currently has 126 app detail pages, cached GitHub counts for 104 apps, and shared cards across the directory and the homepage's recently covered apps row. Coverage consists of 36 apps with articles and videos, 6 with articles only, and 84 with videos only. See [the directory documentation](app-directory.md) for implementation and maintenance details and [the coverage review](app-detail-coverage-review.md) for article associations and review boundaries.

## Recommended first steps

1. Preserve search, category, and sort selections in shareable URLs.
2. Add platform, deployment, and license filters using normalized metadata.
3. Add automated browser checks for layout and interactive behavior.

## Prioritized backlog

| Priority | Gap | Proposed improvement | Completion criteria |
| --- | --- | --- | --- |
| High | Search, category, and sorting live only in component state. | Synchronize directory controls with URL parameters. | Shared URLs reproduce the selection; refresh and browser Back/Forward preserve it; invalid parameters fall back safely. |
| High | Platform and license information is available on detail pages but cannot be used to filter the directory. | Add platform, deployment, and license filters backed by normalized metadata. | Filters combine with search/category/sort; native OS support remains distinct from containers or VMs; mixed and proprietary licensing are represented accurately. |
| High | 84 apps have video coverage without a written guide. | Use video-only apps as an editorial backlog, prioritizing reader demand and useful practical workflows. | New guides meaningfully cover the app and are linked through the existing coverage data; video-only pages remain valid without placeholders. |
| High | Star counts refresh automatically in code, while descriptions, licenses, official links, repository choices, and coverage associations require manual review. | Generate a maintenance report for broken links, repository changes, and apps needing review. | Findings include evidence and go through human verification; a failed request or old release alone does not trigger removal or a metadata rewrite. |
| Medium | Detail pages have no related-app discovery. | Add a small curated related-app section. | Relationships distinguish alternatives from companion tools, link only to existing app pages, and preserve articles followed by expandable videos. |
| Medium | General analytics is installed, but app components have no explicit interaction events. | Measure homepage card clicks, searches with no results, guide clicks, and video expansions. | Events answer specific editorial or usability questions, avoid collecting raw search text by default, and do not interfere with navigation or keyboard access. |
| Medium | Static checks do not automatically catch browser layout regressions such as the recently fixed carousel overflow. | Add repeatable browser regression checks. | Checks cover document width at phone/tablet/desktop sizes, both themes, carousel mouse/keyboard controls, and video expansion/collapse with no player loaded initially. |

## Smaller gaps and operational follow-up

- **Artwork:** Eight apps currently use initials: jp2a, lm_sensors, LSD, Nala, Psensor, Search Light, synth-shell, and tgpt. Add suitable verified official artwork when available, recording provenance and theme behavior. Initials remain an acceptable fallback. Preserve the owner's Bubble Card icon.
- **Missing star counts:** Twenty-two apps have explicit repository omissions. Most are intentional, including projects hosted elsewhere and proprietary software without an applicable public repository. Revisit ambiguous choices when authoritative evidence becomes available; do not assign a repository merely to fill a blank count.
- **Meaning of star rankings:** Selected repositories include software source, official mirrors, packaging, and an issue tracker. Add a concise explanation near the star sort so readers understand that counts describe the selected repository and are not directly comparable measures of software quality or maintenance.
- **Live refresh verification:** The daily workflow is implemented, but its live operation and deployment success were not verified in this review. Confirm the owner setup documented in `app-directory.md`, then verify a scheduled run and, when counts change, the resulting single-file snapshot commit and published site update. Do not assume missing verification means the owner has not configured it.
- **Refresh monitoring:** Consider an owner-facing alert for repeated refresh failures. The persisted `fetchedAt` records when a value was successfully observed and intentionally stays unchanged when a successful recheck returns the same count; its age alone cannot establish that automation has stopped. Use workflow outcomes/logs for refresh health.

## Constraints for future work

- Preserve short directory descriptions and fuller detail-page descriptions, existing icons and theme variants, initials fallback, responsive layouts, and accessible full-card links.
- Keep articles full-width and above expandable videos; omit absent coverage sections.
- Preserve all qualifying coverage and continue using publication dates for recent-coverage sorting.
- Keep star fetching outside normal builds and browser rendering. Statistics refreshes must not change app content dates or sitemap content dates.
- Use the existing current app list as the scope; new inclusions require the existing coverage and maintenance review.
- Validate each implementation with relevant offline checks and browser checks where behavior changes. Follow the isolated-build guidance in `app-directory.md` without disrupting an active development server.
