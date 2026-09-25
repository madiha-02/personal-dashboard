# Personal Dashboard Site

A framework-free, dependency-free personal dashboard / resume site. Plain HTML, CSS,
and JavaScript — no build step, so it can be hosted directly as static files.

## Structure

- `index.html` — the dashboard shell (sidebar nav + About / Experience / Projects / Chat / Contact panels)
- `styles.css` — all styling, including the mobile responsive layout
- `script.js` — all interactivity: nav switching, the cursor-tracking avatar eyes, project
  modals, and the rule-based chatbot. **All editable content (name, bio text lives in
  index.html; skills/experience/projects/links live in the `CONFIG` object at the top of
  script.js)** — edit that object to update the site without touching markup.
- `cv.html` — a standalone, print-friendly resume page generated from the same content,
  with a "Print / Save as PDF" button. Linked from the "View / Download CV" button in the
  sidebar. If you have an existing CV PDF you'd rather link to instead, drop it in `assets/`
  and point the sidebar's `cv-btn` href at it.

## Before you publish

- Add your LinkedIn URL: set `CONFIG.linkedin` in `script.js` (currently empty, so the
  LinkedIn links are hidden/disabled).
- Add more projects to `CONFIG.projects` in `script.js` as you deploy them — each one
  automatically gets a card and a detail modal.
- The avatar is an original hand-drawn SVG (in `index.html`, styled in `styles.css`), not a
  stock image — feel free to adjust the colors/shapes there to taste.

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `personal-dashboard`, or name it
   `madiha-02.github.io` for a root-level `https://madiha-02.github.io/` URL instead of a
   `/personal-dashboard/` subpath).
2. Push this folder's contents to that repository's `main` branch.
3. In the repo on GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / `/root`**.
4. GitHub will publish it at `https://<username>.github.io/<repo-name>/` (or
   `https://madiha-02.github.io/` if you used the special repo name above) within a minute
   or two.
5. Use that URL in your LinkedIn "Featured" section and GitHub profile README.

No build step, no CI needed — any push to `main` updates the live site.
