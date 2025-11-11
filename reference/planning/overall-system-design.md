# ULU Frontend: Design & Philosophy

This document provides a high-level overview of the ULU Frontend library's design, architecture, and the philosophy behind its structure.

## Core Philosophy

The library is built on a set of core principles designed to make it versatile, robust, and adaptable to a wide range of web projects.

*   **Framework Agnostic:** The library is written in "vanilla" SCSS and JavaScript (ES modules). It is not tied to any specific front-end framework, making it a foundational toolset that can be used in any web environment.

*   **Modular & Composable:** The library is designed to be used piece-by-piece. This "à la carte" approach is a central tenet, ensuring developers only include the specific components and utilities they need, keeping final application bundles as small as possible.

*   **Intentionally Minimalist & Configurable:** The library is not a batteries-included framework with a strong, opinionated design. Instead, it provides an intentionally minimal foundation with a rich set of configuration options (via SCSS variables and a JS `settings` module). The goal is to empower developers to build their own unique themes and design systems on top of a solid, unopinionated base.

*   **Integration-Focused:** A core design principle is the ability to integrate smoothly into existing projects and legacy systems. This is most evident in the "Adjustable Selectors" feature, which allows developers to change the CSS class names of components to avoid conflicts with pre-existing style rules.

*   **Accessibility First:** Components are built with accessibility as a primary concern, incorporating proper ARIA attributes, focus management, and semantic HTML to ensure they are usable by the widest possible audience.

## Architecture Overview

### SCSS (`lib/scss`)

The SCSS directory is the heart of the visual framework. It is not delivered as a pre-compiled, monolithic CSS file. Instead, developers are expected to use a modern Sass compiler to `@use` the library's modules from `node_modules`. The intended workflow involves creating a local `config` directory to override the library's variables and then compiling a custom stylesheet, giving developers complete control over the final CSS output.

### JavaScript (`lib/js`)

The JavaScript provides the behavioral layer for the components. Its UI modules are primarily tailored for traditional websites (e.g., CMS-driven platforms, static sites), while its utility and core modules can be used in any environment.

*   **Structure:** It is organized into four main categories: `ui` (components), `utils` (helper functions), `events` (a global event bus), and `settings` (a global configuration singleton).
*   **Singleton `settings` Module:** This is a crucial architectural piece. It allows both the developer and other dependent libraries (like `@ulu/frontend-vue`) to configure the behavior of JS components at runtime from a single, shared source of truth.

### NPM Package Design

The library is published to NPM with a modern structure designed for an optimal developer experience (DX).

*   **Single Entry Point:** All JavaScript modules are exported from the main `@ulu/frontend` entry point. This provides a clean, simple API surface and improves discoverability.
*   **Bundled for Consumption:** The library is published as a pre-bundled ESM file (`dist/ulu-frontend.es.js`). This solves critical ambiguity issues with modern dev servers (like Vite) that could otherwise lead to module duplication and broken singletons. A UMD bundle is also provided for legacy browser support.
*   **Tree-Shakable by Design:** The public API is "flattened," with uniquely prefixed names for all exports. This allows consumers' bundlers to perform dead-code elimination (tree-shaking) with maximum effectiveness.
*   **Peer Dependency Model:** The library is designed with the expectation that when it is used as a dependency for another library (e.g., `@ulu/frontend-vue`), it will be declared as a `peerDependency`. This enforces that only a single instance of `@ulu/frontend` exists in the final application, guaranteeing that singletons work as intended.
