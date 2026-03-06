---
title: Recommended Project Setup
weight: 15
---
While @ulu/frontend works out-of-the-box, we recommend a specific setup for projects that require deep customization. This "opinionated" approach simplifies imports and makes managing configuration much easier.

## SCSS Build Configuration

The library's SCSS system relies heavily on configuration modules. To make importing these modules clean and absolute (e.g., `@use "config"` instead of `@use "../../../config"`), we recommend configuring your bundler's SCSS preprocessor.

### Why Configure `loadPaths`?

By adding your project's SCSS source directory to the `loadPaths` (or `includePaths`), you can create "hub" files that act as central configuration points. This is essential for the [Theming workflow](/guide/theming/).

### Vite Example

In your `vite.config.js`:

```javascript
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Add your local SCSS directory to load paths
        // This allows you to use absolute imports like @use "config"
        loadPaths: [
          path.resolve(__dirname, "src/scss/"), 
        ],
        // Use modern compiler API for better performance
        api: "modern-compiler", 
        quietDeps: true,
      },
    },
  },
});
```

This simple configuration change is the key to unlocking the full power of the "Configuration Module" pattern described in the [SCSS System & Theming](./theming/) guide.
