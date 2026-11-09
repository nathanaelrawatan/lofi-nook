# Lo-fi Interactive Desk

A planned first-person interactive 3D desk experience for a creative-developer portfolio. The app currently shows a 3D desk layout blockout. The planned desk interactions have not been implemented yet.

## Implemented so far

- React Three Fiber canvas with a placeholder table, wall, floor, basic lighting, and labeled stand-ins for the lamp, corkboard, window, radio, flip calendar, and clock.
- A fixed perspective camera starting at `(0, 2, 2.5)` and looking at `(0, 1.9, 0)` with a 45° field of view. In the development server, a lil-gui panel adjusts the camera and each item's position, size, and Y rotation. The panel is omitted from production builds; values reset on reload.
- A WebGL fallback message and project information below the scene.

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

- `src/App.tsx`: current scene, camera setup controls, and app entry component.
- `src/index.css` and `src/App.css`: global and page styles.
- `src/assets/`: bundled images and other imported assets.
- `public/`: files served at stable public URLs.
- `AGENTS.md`: project direction and coding guidance for automated contributors.

Three.js, React Three Fiber, and Drei render the current blockout. GSAP and Zustand are installed but not yet used. There is no test runner or test suite yet. Architecture notes, performance measurements, and asset credits will be added as the corresponding features and assets are built.
