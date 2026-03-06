---
title: Installation & Setup
weight: 10
---

@ulu/frontend is distributed as an NPM package and can be integrated into your project using modern build tools.

## NPM Installation

Install the package via npm:

```bash
npm install @ulu/frontend
```

## Usage

Once installed, you can import components and utilities directly from the package in your JavaScript files:

```javascript
import { dialogInit, updateSettings } from "@ulu/frontend";

// Initialize dialogs
dialogInit();
```

For styling, you can import the pre-built CSS file or, for more control, import the SCSS modules.

### Basic CSS Import

If you don't need to customize the theme, you can import the compiled CSS directly:

```javascript
import "@ulu/frontend/dist/style.css";
```

### SCSS Import

For advanced customization (theming), you will want to import the SCSS modules. This is covered in detail in the [SCSS System & Theming](./theming/) guide.

## Next Steps

-   Learn about the [JavaScript System](./javascript-system/) and how initialization works.
-   Dive into [Theming](./theming/) to customize colors, typography, and components.
