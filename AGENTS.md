# Lo-fi Interactive Desk: agent guide

## Project intent

Build a first-person interactive 3D desk for a public creative-developer portfolio. The planned scene includes editable corkboard notes, a flip calendar, clock, radio, interactive lamp, selectable window background, light and dark themes, an introductory camera animation, and bounded horizontal panning on mobile. Place credits and project information below the initial viewport.

This is a product direction, not a claim that those features already exist. The app currently shows a minimal Lo-fi Nook placeholder.

## Current stack and layout

- React 19, TypeScript, and Vite. Three.js, React Three Fiber, Drei, GSAP, and Zustand are installed for features that need them.
- `src/App.tsx` is the current app; `src/main.tsx` mounts it. `src/index.css` holds global styles; `src/App.css` holds page styles.
- Import bundled assets from `src/assets/`. Put files that need a public URL in `public/`.
- Use the existing package manager and lockfile (`npm` and `package-lock.json`).

## Implementation guidance

- Build the smallest cohesive feature that satisfies the task. Keep components and functions focused; split presentation, state, and browser effects when doing so makes the feature clearer.
- Use functional React components and strict TypeScript types. Keep state near its consumers; use Zustand only when state is genuinely shared. Avoid `any` without a specific reason.
- Keep Three.js rendering and pointer logic separate from unrelated HTML UI and application logic. Use React Three Fiber's declarative APIs where appropriate.
- Keep editing controls in HTML outside the canvas. Give important 3D actions keyboard-accessible HTML equivalents. Dialogs need labels, visible focus, Escape handling, and focus restoration.
- Clean up listeners, subscriptions, audio, animation loops, and dynamically created GPU resources. Keep frame updates independent of frame rate and avoid per-frame object allocations where practical.
- Preserve the fixed-camera composition. Bound mobile horizontal panning; do not add free camera rotation unless the product direction changes.
- Use a coherent, restrained visual system that complements the cozy scene. Support reduced motion and maintain readable contrast.
- Persist notes and positions, station and volume, window selection, and theme when those features are built. Validate stored data and handle unavailable storage. Use browser storage for small data; consider IndexedDB for large user-provided assets.
- Provide useful loading and error states for assets, WebGL, audio, and storage. Avoid adding a backend unless a feature requires one.

## Performance and verification

- Aim for a 16:9 reference composition, an internal render size no greater than 2560 × 1440, 60 FPS on desktop, and 30–60 FPS on mobile. Initial targets are under 5 MB for compressed scene assets and under 10 MB for the total download. These are goals to measure on representative devices, not guaranteed limits.
- Measure before adding complexity. Consider texture sizing, compressed GLB assets, baked static lighting, selective dynamic lighting, caching, and lazy loading when measurements justify them.
- Run `npm.cmd run lint` and `npm.cmd run build` in Windows PowerShell before finishing code changes (`npm run ...` works in other shells). Use `npm ci` for a clean install and `npm run dev` for local development.
- There is no test runner yet. Add focused tests when meaningful behavior is introduced, especially note persistence and dragging, date formatting, theme switching, radio state, and storage recovery. Document a test command when one exists.
- For significant changes, briefly describe the approach, implement it, run relevant checks, and report what changed and what remains unverified. Do not claim features or test results that the repository does not support.

## Public repository

Keep the README current with setup steps, implemented features, architecture decisions that matter, and asset credits or licenses. Record performance measurements when available. Prefer clear, maintainable code and honest documentation over extra layers or claims of polish.
