# Lo-fi Interactive Desk

A planned first-person interactive 3D desk experience for a creative-developer portfolio. The project is currently a React, TypeScript, and Vite starter app; the desk scene and interactions have not been implemented yet.

## Planned experience

The intended scene includes editable sticky notes, a flip calendar, a clock, a radio, an interactive desk lamp, selectable window backgrounds, light and dark themes, and a short introductory camera animation. Mobile interaction is planned around bounded horizontal panning. Credits and project information will sit below the scene.

## Development

Requirements: Node.js and npm compatible with the versions in `package.json` and `package-lock.json`.

```sh
npm ci
npm run dev
```

Available checks:

```sh
npm run lint
npm run build
```

In Windows PowerShell, use `npm.cmd` in place of `npm` if script execution policy blocks `npm.ps1`.

## Structure

- `src/App.tsx`: current starter UI and app entry component.
- `src/index.css` and `src/App.css`: global and page styles.
- `src/assets/`: bundled images and other imported assets.
- `public/`: files served at stable public URLs.
- `AGENTS.md`: project direction and coding guidance for automated contributors.

React Three Fiber, Drei, Three.js, GSAP, and Zustand are installed but are not yet used by the starter UI. There is no test runner or test suite yet. Architecture notes, performance measurements, and asset credits will be added as the corresponding features and assets are built.
