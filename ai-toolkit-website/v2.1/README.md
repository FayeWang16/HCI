# AI in Education Toolkit — HTML/CSS replica

A plain HTML/CSS site. No build step, nothing to install.


## Preview locally

Double-click `index.html` to open it in a browser.


## File structure

```
index.html              Tab 1: Home (AI in Education Toolkit for Racial Equity)
how-to-use.html         Tab 2: How To Use
ideation.html           Tab 3: Ideation
ideation/ai-vs-ml.html  Sub-page linked from Ideation ("AI vs. ML")
css/style.css           All styles (colors, fonts, spacing)
js/nav.js               Top bar (doc title, tabs, Copy doc) and left rail (like / Share / More)
assets/fonts/           Super Sans VF (the original doc's font)
assets/icons/           Page icons
assets/images/          Cover image, avatars, AI/ML diagram
```

Sub-pages go in the folder of the tab they belong to (e.g. `ideation/`).
Inside a sub-folder, prefix paths with `../` (see `ideation/ai-vs-ml.html`).
Links to pages that aren't built yet point to the original Superhuman doc.


## What's interactive

This version recreates the first three tabs of the original *AI in Education Toolkit for Racial Equity* site. The focus is on **navigation between pages and key hyperlinks**. Complex interactions on the Ideation page are not built yet; it is display-only for now.

### Tab 1: Home (AI in Education Toolkit for Racial Equity)
- **Get Started Now** and **Each section** → jump to the How To Use page
- **Nidhi** and **Madison** → open email links
- Underlined text links (e.g. **poverty**, **culturally responsive teaching**) → open the original external articles in a new tab

### Tab 2: How To Use
- **Ideation** → jump to the Ideation page, landing directly on the **"AI Idea Collection"** heading just below the top bar


### Tab 3: Ideation
- **AI vs. ML** → jump to the AI vs. ML page (`ideation/ai-vs-ml.html`)
- Other complex interactions are not built yet; the page is display-only for now


## Placeholders (look real, do nothing)

- Report (in the More menu)
- Table search icons and "+" rows


## Common edits

- **Change text:** open the page's `.html` file and edit the text between the tags.
  Anything in `[brackets]` is a placeholder.
- **Add, rename, or reorder a tab:** edit the `TABS` list in `js/nav.js`.
- **Add a new page:** copy `how-to-use.html` (or `ideation/ai-vs-ml.html` for a sub-page),
  rename it, change `data-page` and the title, then add it to `TABS` if it should be a tab.
- **Like count:** the starting number is `BASE_LIKES` in `js/nav.js`. A like is saved in the
  browser (localStorage), so every page shows the same count.
- **Link to a spot on a page:** give the element an `id` and link to `page.html#that-id`
  (e.g. `ideation.html#page-content` jumps to the top of the Ideation content).
- **Change colors or fonts:** edit the variables under `:root` in `css/style.css`.


## Deploy
1. Push this folder to a GitHub repo.
2. Go to **Settings → Pages**, set the source to **Deploy from a branch**, then pick `main` and `/ (root)`.
3. The site goes live at `https://<user-or-org>.github.io/<repo-name>/`.
