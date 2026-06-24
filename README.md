# Dark Matter Disco 2.0

A modern Angular 21 application with SSR support, motion tracking, and immersive dance-floor visuals.
Based on legacy Dark Matter Disco project located here: 
https://github.com/dark-matter-interactive/dark-matter-disco


## Quick Start

Install dependencies:

```bash
npm install
```

Start the app locally:

```bash
npm start
```

Open the app at:

```text
http://localhost:4200/
```

## Available Scripts

- `npm start` — start the local development server
- `npm run build` — compile the application for production
- `npm run watch` — build in watch mode for development
- `npm test` — run unit tests with Vitest
- `npm run serve:ssr:dark-matter-disco-2.0` — serve the SSR build from `dist/dark-matter-disco-2.0`

## Project Structure

- `src/app/` — main Angular modules and components
- `src/app/dance-floor/` — dance floor rendering and scene logic
- `src/app/dancer/` — dancer component and pose animation
- `src/app/services/pose-detection/` — MediaPipe pose detection integration
- `src/app/services/camera/` — camera access and video stream handling
- `src/app/stars/` — starfield background visuals
- `src/app/toolbar/` — control panel and interaction UI
- `src/assets/` — static assets and helper data

## Notes

- Built with Angular 21 and Angular SSR.
- Uses PIXI.js for graphics and MediaPipe for pose tracking.
- Live reload is enabled during development.

## Learn More

For Angular CLI documentation and command reference, visit:

https://angular.dev/tools/cli
