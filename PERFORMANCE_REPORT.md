# WebResume Performance Optimization Report

Date: 9 October 2026

## Scope and evidence

This is an **implemented, statically verified optimization pass**, not a fully benchmarked production release. The archive was audited and edited without changing its visual design tokens, layout classes, shaders, object geometry, animation curves, feature copy, or navigation. Real in-browser visual equivalence, FPS and Core Web Vitals **remain unverified** because project dependencies could not be installed in the supplied execution environment (npm registry DNS unavailable; required packages including `zustand@5.0.15` missing from npm cache).

## Key problems and fixes

| Area | Initial state | Implemented change | Rationale |
| --- | --- | --- | --- |
| About-section character | `Portrait3D.jsx` was imported immediately and preloaded four GLBs plus a large texture on module evaluation. | A small `NearViewportPortrait` loader defers importing the component until the visitor comes within 900px of the portrait; removed eager `useGLTF.preload` / `useTexture.preload` calls. | Avoids downloading and parsing the 3D portrait before it is relevant, particularly on slow mobile connections. |
| Render loops | Hero and character Three.js canvases continued animating when off-screen. | New `useSceneActivity` hook pauses Three.js frameloops outside the viewport or when the document is hidden, resuming on return. | Saves GPU cycles and mobile battery without altering on-screen motion. |
| Global animated background | Continual large WebGL shader redraw at up to 2x DPR. | Detect sustained slow actual frames and reduce only its backing render resolution to 1.25 DPR if necessary; retain full quality on smooth-running devices. Existing tab-visibility / canvas observer handling retained, with an older-WebView resize fallback and a solid-color fallback if the context fails to initialize. | Adaptive GPU load under prolonged slow-frame delivery. **The fallback can look slightly softer on low-end, high-DPR devices**, while layout, animation, palette and visual design remain identical. |
| Images | Large PNGs loaded without decode/lazy hints. | 10 images/textures replaced with **pixel-identical lossless WebP** versions. Offscreen project previews now use `loading="lazy"` and `decoding="async"`; header logo retains explicit dimensions. | Less transfer with no image pixel changes; avoid eager decoding offscreen images. |
| Resume popup | Included as part of initial source graph. | Split into a React lazy-loaded modal, imported only when opened. | Defers rarely-used UI JavaScript. |
| Component timers | Transient setTimeout callbacks could remain after unmount in contact, principles, Text playground, and project showcase. | Clean up scheduled callbacks on unmount; pause footer clock updates while the page is backgrounded. | Reduce unnecessary updates and long-session housekeeping work. |
| Dead files | Unreferenced 3D experiment, duplicate navbar, placeholder files, and unused T-pose model shipped in archive. | Removed five unreachable component / stylesheet files, scaffold SVGs, duplicate Vite favicon alias, unused developer portrait, unused T-pose model. | Reduce repository and deploy size without changing reachable features. |
| Dependencies | 18 direct runtime and 12 direct dev dependencies, including unused UI and animation packages. | Reduced to 9 runtime + 10 dev dependencies; reconciled root package lock metadata, and pruned 19 unreachable lockfile entries. | Smaller install graph; no active source imported the removed direct packages. |

## Measured, reproducible results

The image comparison used the provided original ZIP as a baseline and compared fully decoded RGBA image pixels from the original PNGs against the new lossless WebP files using Pillow. **All 10 conversions were pixel-identical.**

| Metric | Before | After | Status |
| --- | ---: | ---: | --- |
| Total size of 10 converted image/texture assets | 16,100,126 B | 11,578,954 B | **4,521,172 B saved (28.1%)**, verified |
| Extra unused T-pose GLB | 2,143,520 B | 0 B | Removed, verified |
| Direct runtime dependencies | 18 | 9 | Static manifest audit |
| Direct dev dependencies | 12 | 10 | Static manifest audit |
| Lockfile package entries | 362 | 343 | 19 unreachable records pruned |
| Local import resolution | — | 47 imports checked | Pass |
| Public runtime asset references | — | 5 checked | Pass |
| Root manifest/lock consistency | — | In sync | Pass |
| Lighthouse score / LCP / INP / CLS | Not measured | Not measured | **Blocked** |
| Production JS bundle bytes / main-thread time | Not measured | Not measured | **Blocked** |
| Scroll FPS / GPU use / battery / memory | Not measured | Not measured | **Blocked** |
| Visual screenshot diff / actual browser interactions | Not captured | Not captured | **Blocked** |

**Important:** The byte reductions above are source file-transfer sizes, not a measured page-load time reduction or a guarantee that every image is requested on a typical visit. The original project has no production benchmark data available in the supplied archive.

## Validation carried out

- `npm run verify:static` passed (28 source files, 47 relative imports, 5 public runtime asset references, package manifest/lock in sync).
- JavaScript syntax checked for the Vite configuration, custom visibility hook, portfolio data module, and static validator.
- All 10 converted assets were decoded and compared pixel-by-pixel against the original uploaded PNGs, with no differences.
- Attempted `npm ci --offline`: blocked on missing cached tarballs (first missing package: `zustand@5.0.15`). The npm registry could not be resolved, so downloading remaining dependencies was unavailable.
- Attempted `npm run build`: Vite executable unavailable because dependencies were not installed.
- **Not run:** ESLint, production build, Playwright/Lighthouse, baseline/after browser screenshots, simulated CPU/network profiles, Android hardware tests, functionality and accessibility browser regression checks.

## Required release verification

On a workstation or CI runner with registry access:

1. Run `npm ci`, `npm run verify:static`, `npm run lint` and `npm run build`.
2. Serve the production output with `npm run preview`. Compare same-browser screenshots before/after at **320, 360, 768, 1280 and 1440px**, in light and dark themes, including intro, Hero, project cards, About character, interactive marquee, menu and Resume modal.
3. With network/CPU throttling, profile cold-load resource waterfalls, scroll long pages, mouse/touch parallax, entering/leaving About, returning from a background tab, repeated navigation, and memory/GL context behavior. Verify the losslessly converted WebP texture renders correctly on target Android WebViews.
4. Measure LCP / CLS / TBT in controlled Lighthouse runs, field INP if RUM is available, and graphics frame delivery from real Android hardware. Compare against an unchanged build of the original ZIP under identical conditions.
5. Verify contact interactions, project links, clipboard actions, and responsive menu. Fix or revert any unexpected UI difference before deploying.

### Known caveats and remaining opportunities

- On a slow connection the deferred character can momentarily appear empty as its multi-megabyte GLBs download. The 900px preload margin helps but must be tuned with real-device network testing; this change has the highest visible loading-state regression risk.
- The global WebGL2 shader intentionally uses a color-matched static fallback on browsers without WebGL2. Under sustained slow frame delivery on high-DPR devices, its adaptive render resolution will be slightly softer.
- The Hero's high-cost shadow and environment settings were deliberately **not** changed without frame/GPU evidence, to protect visual fidelity.
- The original `AUTO_SEQUENCE` references a `Running` animation, but the active `Character` code does not register a `Running` clip. The `Running.glb` file is retained to avoid a design/behavior change unrelated to verified performance work; audit separately.
- npm lock records preserve the original optional-package metadata. A successful fresh install/build is still required before treating this as production-ready.
- No statement about particular Android versions, browser versions, or 60/120 FPS is justified until those devices are tested.

## File change summary

- **Runtime:** `src/App.jsx`, `src/components/About.jsx`, `src/components/HeroScene3D.jsx`, `src/components/Portrait3D.jsx`, `src/components/Reactbitsbackground.jsx`, `src/components/ProjectShowcase.jsx`, `src/components/Header.jsx`, `src/components/Contact.jsx`, `src/components/Principles.jsx`, `src/components/Text/Text.jsx`, `src/components/Footer.jsx`.
- **New helpers:** `src/hooks/useSceneActivity.js`, `src/components/NearViewportPortrait.jsx`.
- **Build metadata/assets:** `package.json`, `package-lock.json`, `index.html`, portfolio data image imports, and ten PNG→WebP asset substitutions; dropped unreachable placeholder files.
- **Verification:** `scripts/verify-static.mjs` and `npm run verify:static`.
