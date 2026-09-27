# HumaNex design prototype

This is a real React project (built with Vite), not a static HTML file — that's why
VS Code's "Go Live" button can't open it directly. Run it like this instead:

## Run it

1. Unzip this folder somewhere, then open it in a terminal (or VS Code's terminal).
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Vite will print a local address, usually `http://localhost:5173`. Open that in
   your browser — that's your app, live and hot-reloading as you edit files.

To stop the server, press `Ctrl+C` in the terminal.

## Where things live

- `src/App.jsx` — the whole HumaNex prototype (landing page + all five dashboards).
- `src/main.jsx` — mounts `App` into the page. You shouldn't need to touch this.
- `index.html` — the single HTML page Vite serves.

## Requirements

Node.js 18 or newer. Check your version with `node -v`; if you don't have Node
installed, get it from https://nodejs.org first.
