# Little Phone

A small, self-contained virtual phone interface.

## Run
Open `index.html` directly in a browser, or serve the folder with any static web server.

## Design direction
This build deliberately avoids a conventional "mock iPhone" appearance. It uses a quiet physical-device feeling: restrained typography, translucent surfaces, large empty space, and small pieces of useful information.

## Data
Journal and Notes are persisted with browser localStorage. No backend is required.

## Structure
- `index.html` — shell
- `src/styles.css` — visual system
- `src/data.js` — app registry
- `src/store.js` — local persistence
- `src/main.js` — routing and app behavior

This is intentionally framework-free so it can be deployed as static files.
