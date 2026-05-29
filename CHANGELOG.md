# Change Log

## [3.0.0]

### Added
- Added 17 new high-end preset animations inspired by Animate.css (Blur reveals, Skew reveals, Rotate reveals, Springy Back reveals, and Specials like `roll-in` / `jack-in-the-box`).
- Added native **React** integration (`aos/react`) providing the `useAOS` hook.
- Added native **Vue** integration (`aos/vue`) providing `AOSPlugin` and a unified `v-aos` directive compatible with Vue 2 and Vue 3.
- Added the `AOS.destroy()` API to safely clean up all observers and listeners on SPA component lifecycle changes.
- Added automatic offset refresh after window load to prevent layout shifts.
- Added safety exception handling for invalid `data-aos-anchor` selectors.
- Added touch-based mobile/tablet detection support for iPadOS (modern iPads with desktop user agents).
- Added `.clinerules` and `.cursorrules` specifying Chinese as the default communication language.
- Added HTML demo pages for core library and framework integrations (React, Vue) under the `docs/` directory.
- Added comprehensive mock-based unit tests for React `useAOS` hook and Vue `AOSPlugin` custom directive in `test/wrappers.spec.js`.
- Added a full bilingual localization layer (Chinese and English) with immediate local state initialization to prevent flash-of-untranslated-text (FOUT).

### Changed
- **Bilingual Redesign**: Redesigned all demo pages into a premium glassmorphic dashboard theme with CSS Grid, styled monospace indicators, and custom info panels.
- **IntersectionObserver Rewrite**: Completely rewrote the scroll tracking engine to use native, hardware-accelerated `IntersectionObserver` instead of window scroll event listeners.
- **Modernized Build Stack**: Upgraded Webpack to v5, Karma to v6, and Sass to modern Dart Sass compiler. Removed PhantomJS.
- **Zero Runtime Dependencies**: Completely removed legacy packages `classlist-polyfill`, `lodash.debounce`, and `lodash.throttle`, making the runtime footprint extremely lightweight.
- **Sass Modern API**: Converted all deprecated `@import` rules in Sass to the modern `@use` syntax and configured `sass-loader` to compile via the modern JS compiler API.
- Updated `package.json` to expose framework subpaths under the `exports` configuration field.
- Modernized all helper utilities (`elements.js`, `calculateOffset.js`, `detector.js`, `offset.js`) to ES6 standards.

### Fixed
- **UMD Export Ordering**: Corrected entry import order in `webpack.config.js` to place JS files last, ensuring the `AOS` module exports are correctly exposed in browser global environments.
- Fixed legacy `git://` protocol dependency issues in the test runner.
- Fixed mock fixture loaders to support synchronous HTML/CSS loading during jasmine specs.

## [2.1.1]
- Clean styles, prefix variables, use !default, separate files for core and animations

## [2.1.0]
- Attach event listener to window instead of document for event `load`

## [2.0.4]

### Fixed
- Fix device detector (tablet setting)

### Changed
- Disable AOS on not supported browsers (<= IE9)
- Clean code around `disable` option
- Rewrite device detector using ES6 Class

## [2.0.3]

### Added
- Add `transform-object-assign` plugin for babel, so Object.assign works in IE

## [2.0.2]

### Fixed
- Fix include in arrays, so it works in IE

## [2.0.1]

### Fixed
- Add easings, after they were accidentaly ignored

## [2.0.0]

### Added
- Add new CHANGELOG
- Add contribution guide
- Add emojis in README
- Add map file for styles

### Changed
- Make `data-aos` attributes the default and only proper ones
- Use maps and loops in Sass
- Replace gulp with webpack
- Rewrite Karma config and use webpack to bundle tests
- Upgrade to ES6
- Update documentation
- Update demos

### Removed
- Remove `aos` attributes
- Remove gulp from build tools

### Fixed
- Improve animations performance
- Fix styles loading in tests

## [1.2.2]
### Fixed
- Fix AOS refreshing on asynchronously loaded elements

## [1.2.1]
### Fixed
- Fix problem with using AOS as node package by setting main file in package.json

## [1.2.0]
### Added
- Add compatibility with module systems

### Fixed
- Fix AOS initializing when DOM is already loaded
