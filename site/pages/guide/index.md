---
title: Guide
weight: 0
iconClass: fas fa-book
---
Welcome to **@ulu/frontend**, a versatile frontend toolkit designed for modern web development. Whether you are building a static site, a CMS-driven platform, or a complex application, this library provides a solid foundation of accessible, high-quality components and utilities.

## Core Principles

The library is built around three key design principles:

1.  **Lightweight & Modular:**
    -   The core footprint is intentionally small.
    -   Both JavaScript and SCSS are modular, allowing you to import only what you need.
    -   Tree-shaking is supported out of the box for efficient bundles.
2.  **Styling-Agnostic JavaScript:**
    -   Unlike many frameworks that couple behavior to specific CSS classes, @ulu/frontend uses data attributes (e.g., `data-ulu-dialog`) to initialize and manage components.
    -   This separation allows you to use the robust JavaScript logic with completely custom styling, or even with other CSS frameworks, without conflict.
3.  **Configurable SCSS:**
    -   The styling layer adopts a "configuration over code" approach.
    -   Almost every aspect of the design system—from colors and typography to component-specific details—can be customized via SCSS maps and configuration mixins before any CSS is output.
## What's Included?

-   **SCSS Library:** A comprehensive suite of modules including a design system (Color, Typography, Spacing), Layout utilities, and fully styled UI components.
-   **JavaScript Library:** A set of accessible, interactive behaviors for common UI patterns (Modals, Tabs, Accordions, etc.) and utility functions.

## Getting Started

To start using @ulu/frontend in your project, head over to the [Installation & Setup](/guide/installation/) guide.
