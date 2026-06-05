# Wiki content (source)

These markdown files are the **source** for the project's GitHub Wiki. The wiki
itself is a separate git repository (`structyl.wiki.git`), so these files are not
served from the main repo — they need to be pushed to the wiki repo.

## Publishing the wiki

1. Enable the Wiki: GitHub repo → **Settings → Features → Wikis** (check it on).
2. Create the first page once in the GitHub UI (this initializes the wiki repo).
3. Then push these files:

   ```bash
   git clone https://github.com/imirfanul/structyl.wiki.git
   cp wiki/*.md structyl.wiki/
   cd structyl.wiki
   git add .
   git commit -m "docs: add wiki content"
   git push
   ```

## Page naming notes

- `Home.md` is the landing page.
- `_Sidebar.md` and `_Footer.md` are special — they render as the wiki's sidebar
  and footer on every page.
- File names map to page titles with hyphens → spaces (e.g. `Getting-Started.md`
  → "Getting Started"); internal links use the hyphenated form, e.g. `[FAQ](FAQ)`.

## Pages

- `Home.md`, `_Sidebar.md`, `_Footer.md`
- `Getting-Started.md`
- `FAQ.md`
- `Troubleshooting.md`

All internal wiki links resolve to pages in this folder — no dead links. To grow
the wiki later (e.g. `Recipes`, `Migration-Guides`), add the page file and a line
to `_Sidebar.md`.
