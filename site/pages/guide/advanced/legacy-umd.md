---
title: Legacy & UMD Usage
weight: 40
---
While we recommend using the ESM bundle with a modern build tool, @ulu/frontend also provides a Universal Module Definition (UMD) bundle for legacy environments or direct browser usage.

## Available Bundles

The package provides two main entry points in the `dist/` directory:

1.  **`ulu-frontend.es.js` (ESM):**
    -   **Format:** ES Module.
    -   **Use Case:** Modern bundlers (Vite, Webpack, Rollup).
    -   **Benefit:** Supports tree-shaking, ensuring only the code you use ends up in your final bundle.
2.  **`ulu-frontend.umd.js` (UMD):**
    -   **Format:** Universal Module Definition.
    -   **Use Case:** Direct browser usage via `<script>` tag, legacy environments, or online editors like CodePen.
    -   **Global Variable:** Exposes the library as `ULU`.
## Using the UMD Bundle

If you are not using a build step, you can include the UMD bundle directly in your HTML:

```html
<!-- Load the CSS -->
<link rel="stylesheet" href="node_modules/@ulu/frontend/dist/style.css">

<!-- Load the JS -->
<script src="node_modules/@ulu/frontend/dist/ulu-frontend.umd.js"></script>

<script>
  // The library is available as the global 'ULU' object
  ULU.dialogInit();
</script>
```
