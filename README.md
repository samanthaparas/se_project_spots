# Spots

A responsive photo-sharing feed built with vanilla JavaScript and a live REST API. Users can edit their profile and avatar, post new photos, like/unlike posts, and delete their own posts — all persisted server-side.

**Live demo:** https://samanthaparas.github.io/se_project_spots/

## About

Spots started as a static layout exercise and was later upgraded to integrate
with a real backend, so all profile edits, new posts, likes, and deletes
persist via API calls instead of living only in local state.

**Core features**

- Fetches and renders profile + card data from a REST API on load
- Edit profile name/description and avatar (PATCH requests, optimistic UI + loading states)
- Add a new post and delete an existing one (POST/DELETE, with a confirmation modal before delete)
- Like/unlike posts with live count sync from the server
- Client-side form validation via the HTML5 Validity API, with inline error messages
- Fully responsive layout (BEM CSS methodology)

## Keyboard support

- **Tab / Shift+Tab** — moves focus through all interactive elements (buttons, links, form fields) in document order; native browser focus outlines are preserved.
- **Enter** — submits the focused form / activates the focused button.
- **Escape** — closes whichever modal is currently open.

Known limitation: focus isn't currently trapped inside open modals, and the
like/delete icon buttons on each card don't yet have accessible labels for
screen readers. Both are on the list for future cleanup.

## Technologies & Techniques

- HTML5, semantic structure
- CSS3, BEM methodology, responsive layout
- Vanilla JavaScript (ES6+), modules
- Fetch API & asynchronous JavaScript (Promise-based)
- REST API integration (CRUD operations for users and cards)
- Form validation with HTML5 Validity API
- Webpack, Babel, PostCSS, autoprefixer, cssnano
- Git, GitHub Pages deployment

## Figma

[Link to Figma example that was used](https://www.figma.com/design/mXGZ6wZ4QPKx5KjpHX9QCV/Sprint-9-Project--Spots?node-id=0-1&p=f&t=3HRuIEPQ7FuVYxzc-0)

## Project Pitch Video

[Watch my project pitch](https://www.loom.com/share/83aec69bcdbe46c592b7b92c1d494249)
