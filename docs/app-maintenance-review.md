# App directory maintenance review

Checked September 5, 2026 (local time). All 132 original directory entries were screened: 105 GitHub repositories and 27 official product pages or other repository hosts. Archive flags and explicit maintainer notices drive removal; a quiet repository or a working website alone does not establish maintenance status.

## Removed from the directory

| App | Verified reason | Source |
| --- | --- | --- |
| archfi | Repository archived | [MatMoul/archfi](https://github.com/MatMoul/archfi) |
| Bismuth | Repository archived | [Bismuth-Forge/bismuth](https://github.com/Bismuth-Forge/bismuth) |
| Boost Note | Both the legacy app and its successor are archived | [Legacy](https://github.com/BoostIO/BoostNote-Legacy), [successor](https://github.com/BoostIO/BoostNote-App) |
| Focalboard | README explicitly says the repository is not maintained | [mattermost-community/focalboard](https://github.com/mattermost-community/focalboard) |

Historical articles and videos remain available. This changes directory inclusion only.

## Retained with follow-up notes

| App | Finding |
| --- | --- |
| EasySSH | [README](https://github.com/muriloventuroso/easyssh) asks for maintainers; repository is not archived. |
| GNOME Boxes | [Old codebase](https://gitlab.gnome.org/GNOME/gnome-boxes) says development moved to [a new codebase](https://gitlab.gnome.org/felipeborges/boxes). This is a project move, not a confirmed discontinuation. |
| SysMonTask | Repository is not archived; latest push returned by GitHub is May 2023. |
| Linked, LibreGaming, Material Shell | Repositories are not archived; latest pushes returned by GitHub are in 2024. No explicit discontinuation notice found in the reviewed READMEs. |
| jp2a | The original linked repository has not been pushed since 2017; verify the current canonical source before judging project maintenance. |
| Psensor | Original homepage could not be resolved. Status remains unverified; not removed solely for a failed lookup. |

Some official endpoints blocked automated reads: FileZilla, KDE repository APIs, Microsoft Edge and UniFi documentation; Deluge returned a browser challenge. Public KDE app pages and Kdenlive release documentation were available as secondary official checks. Retain these tools without claiming their maintenance status was fully verified.

False positives rejected include discontinued packaging formats, deprecated API modules, dropped platform support, and README references to file archives. These do not mean the entire app is discontinued.

Raw responses and read-only audit scripts are stored outside the website in `~/Desktop/research/app-maintenance-2026-09-05`. The site does not load that archive.
