# Docs Restructure Plan 2026

## Progress Log
**Phase 1 (In Progress):**
- Migrated a large batch of demos from `site/pages/demos/` into their respective `lib/scss/components/_*.demo.html` files.
- Completed migrations: `accordion`, `badge-stack`, `badge`, `basic-hero`, `breadcrumb`, `button-group`, `button-verbose`, `button`, `callout`, `captioned-figure`, `card-grid`, `counter-list`, `css-icons`, `data-grid`, `data-list`, `data-table`, `definition-list`, `flipcard`, `form-theme`, `headline-label`, `hero`, `image-grid`, `input-group`, `list-inline`, `list-lines`, `menu-stack`.
- **Migration Decisions:**
  - Removed Nunjucks tags (like `{{ placeholder.paragraph }}`) and replaced them with realistic HTML paragraphs so that `CodePreview` blocks show valid, copyable markup.
  - Eliminated complex testing tables or unhelpful testing-only demos (e.g., from `button` and `basic-hero`).
  - Inlined data-driven demos (like `css-icons`) directly into static HTML. This ensures compatibility with the MCP snippet extractor, which doesn't process Eleventy data.
  - Removed Vue Router specific classes (e.g., `router-link-active`) and enforced accessibility standards like proper `alt` attributes on images.
  - Deleted pure JS module pages from the demo folder (like `details-group.md`, `file-save.md`) as they will be handled under the JavaScript API restructuring.

## Phase 1: Consolidate Demos & Eliminate `/demos/`
- Migrate unique markdown and `{% CodePreview %}` markup from `site/pages/demos/*.md` to their corresponding `lib/scss/components/_*.demo.html` files.
- Delete `site/pages/demos/` once migration is complete.
- This ensures that when a user looks at an SCSS module (like the Card component), they see its API and its Demos in one place, emphasizing the visual and structural usage without breaking the module's context.

## Phase 2: Preserve and Emphasize the SCSS API Structure
- Retain the current SassDoc output categories (Base, Components, Helpers, Core). This is crucial because it perfectly mirrors the SCSS namespace and traversal path (e.g., `ulu.component-accordion-set()` matches the mental model of `Components -> Accordion`).
- Instead of hiding these under a generic "CSS System" folder, we will keep these four categories prominent in the main navigation to reinforce how the library is architected.

## Phase 3: Component Categorization
- Group files in `lib/scss/components/` into semantic folders using the following categories:
  - `collapsible/`
  - `elements/`
  - `forms/`
  - `layout/`
  - `navigation/`
  - `systems/`
  - `utils/`
  - `visualizations/`
- Update `lib/scss/components/_index.scss` to `@forward` these nested files. This preserves the flat namespace so `ulu.component-modal-set()` still works perfectly without requiring the category in the mixin name.
- Modify the `sassdoc` eleventy plugin to read either the directory structure or a new `@category` annotation. It will output the generated `.md` files into nested folders, creating a beautifully categorized navigation tree in the sidebar (e.g., Components > Collapsible > Modal).

## Phase 4: UI Layout (Tabs & Persistent Sidebar)
- Update the SassDoc page template to use the `tabs` component. 
  - **Tab 1: Demos:** Focuses entirely on the visual representation and code snippets.
  - **Tab 2: SCSS API:** Holds the variables, mixins, and technical documentation.
- **Solving the Sidebar Constraint:** 
  - We will **retain the persistent left sidebar** on desktop for maximum discoverability and context.
  - To solve the horizontal space constraint for fluid components (like grids), we will implement a **"Collapse Sidebar" toggle**. This empowers the user to hide the sidebar only when they explicitly need the full viewport width for testing a demo, rather than forcing them out of the documentation context.
  - We will use the existing "Fullscreen Demo" modal feature sparingly, acknowledging that while it provides accurate viewport sizing, it isolates the user from the surrounding documentation.

## Phase 5: Maintain Decoupled JS API with Contextual Cross-Linking
- Recognize that JS modules provide *behaviors* (e.g., `proxy-click.js`, `dialog.js`) that are independent of SCSS *styles* (e.g., `card.scss`, `modal.scss`).
- Keep the JS API documentation in its own dedicated section to accurately reflect this decoupled reality.
- Enhance cross-linking: Inside the SCSS Component "Demos" tab, explicitly mention and link to the JS behaviors being used (e.g., "This card example utilizes the `proxy-click` JS module for enhanced interaction").

## Phase 6: Clean up Navigation and Layouts
- Update `eleventy.config.js` (`navTreePlugin` config) and frontmatter to reflect the refined hierarchy:
  - **Guide:** Getting Started, Setup, Theming.
  - **Sass API:** Base, Components (categorized), Helpers, Core.
  - **Javascript API:** Core, UI (Behaviors), Utils.
- Enhance SassDoc templates to support custom intros (via `@intro` or companion `.md` files) to replace the rich content lost from the deleted demo pages.