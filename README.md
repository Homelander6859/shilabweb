# ShiLab Research Group — static website

Website of the **ShiLab Research Group** at the Institute for Nanoelectronic
Devices and Quantum Computing, Fudan University.

The site is built on the static Google Sites archive of the *Materials Theory
Group* (Yonsei University), which supplies the page shell, typography, colour
system, navigation behaviour and footer. All page content — research, people,
publications, news, gallery and contact details — is ShiLab's own.

## Open the site

Double-click **`Home.htm`** (or open `index.htm`, which redirects there). No
build step and no server are required for the pages, styles, fonts and
photographs. A local server is still handy:

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Pages

| Page | File | Content |
|---|---|---|
| Home | `Home.htm` | Hero, welcome, research themes, selected paper, group, visit |
| Professor | `Professor.htm` | Wu Shi — bio, interests, education & appointments |
| Members | `Members.htm` | PI, nine PhD students, two master's students |
| Research | `Research.htm` | Four research themes and the lab's methods/facilities |
| Publications | `Publications.htm` | Selected papers, with a link to the full Google Scholar list |
| News | `News.htm` | Announcements and training events |
| Gallery | `Gallery.htm` | Photographs of the lab and instruments (lightbox) |
| Contact | `Contact.htm` | Address, email and map link |

## Directory layout

```
css/
  google-sites.css, theme.css, site.css   archived shell CSS
  fonts.css                              @font-face for the two webfonts
  shilab.css                             ShiLab content layer
  typography.css                         font assignment (serif / sans)
js/
  site.js            navigation, mobile drawer, search, lightbox
  search-index.js    page text used by the local search
fonts/               Source Serif 4 + Source Sans 3 (variable woff2)
images/
  shilab/people/     member photographs
  shilab/lab/        laboratory and instrument photographs
  shilab/news/       news images
*.htm                one static page per navigation entry
old/                 the previous Bootstrap-based ShiLab site (archive)
materials-theory-group.backup-20261021/  (sibling folder) original capture
```

## Editing

* Navigation lives in the page header of every file (two copies: the desktop
  bar `#WDxLfe` and the mobile drawer `#yuynLe`). Keep both lists in sync.
* Content styles are all in `css/shilab.css`; the archived CSS is left
  untouched so the shell can be re-generated from the capture if needed.
* `js/search-index.js` is a plain array of `{title, file, path, text}`; update
  it when pages are added or renamed.
* Member cards are plain markup, one `.sl-person` block per person.

## Notes on the content

* Text and images were transferred from the previous ShiLab website, now kept
  in `old/` (`old/People.htm`, `old/Publications.htm`, `old/News.htm`,
  `old/assets/img/`). Photographs were resized for the web.
* Only one publication was present in the previous site, so the Publications
  page lists it and points to Wu Shi's Google Scholar profile for the complete
  record.
* Two placeholder news items from the old template ("Wowchemy 2020" award
  notices) were dropped; the AFM training item is the real one.
* Jiaqi Liu's e-mail address was wrong in the previous site (it repeated
  another student's address), so it is omitted here until confirmed.
* Several member photographs are personal avatars rather than portraits, as
  supplied on the previous site; they are shown as-is.

## Removed assets

The photographs, logos, sprites and captured pages that belonged to the
original Materials Theory Group site were removed from this edition, so the
published site contains none of that group's content or imagery:

* `_captured/` — the unused original pages (Alumni, Papers, Themes, …)
* `images/content/` — 96 photographs from the original site
* `images/ui/`, `images/icons/`, `images/embeds/` — Google Sites sprites and posters
* `images/logo.png`, `images/favicon.png` — the original site logo and icon

What remains are the layout code (`css/`, `js/`), the two self-hosted
webfonts — Source Serif 4 and Source Sans 3, both SIL OFL 1.1 (`fonts/`) —
and ShiLab's own photographs under `images/shilab/`. The site went from 59 MB
to about 5 MB.

A byte-identical copy of the whole original capture, taken before any edits,
is kept outside the repository at:

```
../materials-theory-group.backup-20261021/
```

Restore any removed file from there. To inspect the whole pre-edit capture
without touching this site:

```bash
cp -a ../materials-theory-group.backup-20261021 /tmp/mtg-original
```
