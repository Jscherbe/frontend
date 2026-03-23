# Themes Module Planning & Progress

## Objective
Introduce a dedicated `themes` module to the `@ulu/frontend` library. This module will handle property switching (e.g., light/dark modes) and the definition of theme maps, standardizing a pattern that has proven useful in project implementations.

## Reasoning & Approach
- **Dedicated Module vs. `cssvar` extension:** Initially considered adding this to `cssvar`, but creating a dedicated `themes` (plural) module provides better separation of concerns. `cssvar` remains a low-level utility for custom properties, while `themes` acts as an architectural orchestrator for theme variations. The plural naming implies a tool for managing multiple variations rather than a rigid, opinionated "Theme Engine".
- **Scalability & Flexibility:** The system uses a property-centric map structure: `("property-name": ("light": value1, "dark": value2))`. This is developer-friendly, reduces repetition, and easily scales to multiple theme axes or component-level scoping without dictating how the developer structures their CSS.
- **Contextual Inversion:** Added a mechanism (`inverses` config) to allow static themes (e.g., a `.theme-dark` footer) to intelligently flip their variables if their container theme changes to match them (e.g., the user toggles the body to dark mode). This uses descendant selectors rather than duplicating variable declarations on the DOM nodes, keeping the library lightweight.
- **Output Generation:** 
  - A core module (`lib/scss/_themes.scss`) will hold configuration and logic.
  - A base stylesheet (`lib/scss/base/_themes.scss`) will handle the automatic output of `:root` (default theme), modifier classes (e.g., `.theme-dark`), and utilities like `.theme-dark-fake`, leveraging `cssvar` mixins under the hood.

## Milestones

- [x] **Milestone 1: Planning and Documentation**
  - [x] Establish architecture and reasoning.
  - [x] Create this `notes.md` file.
- [x] **Milestone 2: Core Module Implementation**
  - [x] Create `lib/scss/_themes.scss`.
  - [x] Define configuration variables (e.g., `$config`, `$default-theme`, `$selectors`).
  - [x] Create `set()` mixin for configuration.
  - [x] Create necessary functions/mixins for extracting keys and generating output.
  - [x] Add SassDoc annotations.
- [x] **Milestone 3: Base Output Implementation**
  - [x] Create `lib/scss/base/_themes.scss`.
  - [x] Implement conditional output based on configuration.
  - [x] Output default theme variables to `:root`.
  - [x] Generate theme classes dynamically.
  - [x] Include `.theme-dark-fake` utility.
- [x] **Milestone 4: Library Integration**
  - [x] Add `themes` to `lib/scss/_index.scss` (if applicable).
  - [x] Add `base/themes` to `lib/scss/base/_index.scss`.
  - [x] Ensure inclusion in `lib/scss/stylesheets/full.scss`.
- [x] **Milestone 5: Testing & Docs Update**
  - [x] Refactor the documentation site (`site/src/scss/base/_themes.scss` and `site/src/scss/_css-vars.scss`) to use the new core module.
  - [x] Verify functionality (light/dark toggle, fake dark mode).
- [x] **Milestone 6: Contextual Inversion & Demos**
  - [x] Add `inverses` mapping to the `themes` core configuration.
  - [x] Update `base/_themes.scss` to output the `.theme-inverse` contextual selectors.
  - [x] Refactor the `site/pages/demos/themes.md` file to match other demos and showcase the new features properly (including standard themes, the fake dark utility, and the new inverse utility).
