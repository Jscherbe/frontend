# Vue Integration: Reusing Extractors & Generating Docs

This document outlines how to handle JavaScript and SCSS documentation extraction within the `@ulu/frontend-vue` repository. 

Because the Vue repository uses **Storybook** (unlike the Eleventy setup in `@ulu/frontend`), the extraction workflow will be slightly different, but it must still output the exact same **Agnostic Tiered JSON Schema** for the MCP server.

## The Dual-Purpose Workflow
We need to accomplish two things simultaneously when building docs in the Vue repo:
1. **Generate MDX for Storybook**: Create `[name].generated.story.mdx` files so developers can view SCSS and JS docs directly in the Storybook UI.
2. **Generate JSON for MCP**: Transform the parsed AST data into the `mcp-data.json` artifact (Builder, Configuration, Reference tiers) for the AI.

While the *build tools* differ (Storybook vs Eleventy), the *transformation logic* into the MCP tiers remains identical.

## 1. SCSS Extraction (SassDoc)

The Vue library has its own ULU modules/SCSS. We need to parse these.

**The Workflow:**
1. Run `sassdoc` or `sass-embedded` to extract the JSON AST from the Vue repo's SCSS files.
2. **Storybook Output**: Pass the AST through `@ulu/sassdoc-to-markdown` (or a custom script) and write the output to `src/scss/[module].generated.story.mdx`. Overwrite these files on every build.
3. **MCP Output**: Map the JSON AST to the MCP tiers:
   - Extract `$config` variables for the **Configuration Tier**.
   - Strip circular references and dump the raw AST into the **Reference Tier**.

## 2. JS Utilities & Composables Extraction (JSDoc)

The Vue repository will contain plain JS/TS functions (e.g., Composables, plugins).

**The Workflow:**
1. Run `jsdoc` or `jsdoc-to-markdown` to extract the JSON AST from the `.js`/`.ts` files.
2. **Storybook Output**: Generate markdown and write it to `src/composables/[name].generated.story.mdx`.
3. **MCP Output**: Map the JSON AST to the MCP tiers:
   - Dump the JS AST into the **Reference Tier**.

## 3. Vue Component Extraction

**The Workflow:**
1. Use `vue-docgen-api` to parse all exported `.vue` files.
2. **Storybook Output**: Storybook usually handles Vue component documentation natively via `vue-docgen-api` and `Autodocs`, so you may not need to generate `.mdx` manually for components.
3. **MCP Output**:
   - Extract props, slots, and emits into the **Configuration Tier**.
   - Dump the raw docgen AST into the **Reference Tier**.

## 4. Snippets Extraction (Builder Tier)

As mentioned in the main instructions, **do not create separate `.demo.html` files**.
1. Parse your existing `*.stories.js` (or `.ts`) files.
2. Extract the `args` and the template/render functions.
3. Map these variations into the **Builder Tier** (`snippets`) for the MCP JSON.

## Summary

Instead of copy-pasting the exact Eleventy plugins from `@ulu/frontend`, you will be building Storybook-oriented Node scripts that run before or during the Storybook build. 

The core mapping logic (transforming AST into the 3 MCP tiers) will be the same. Once we verify this dual-purpose workflow is successful in the Vue repo, we can extract the transformation utilities into `@ulu/mcp-extractors`.