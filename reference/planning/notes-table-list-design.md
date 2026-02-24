# Component Design Notes: data-list

This document summarizes the design discussion and finalized architecture for the new `data-list` component.

## 1. Component Goal & Naming

- **Name:** `data-list`
- **Purpose:** To create a highly flexible, responsive list component that displays complex data. It should appear as a table with perfectly aligned columns on large screens and adapt gracefully to a compact, stacked view on smaller screens, without relying on rigid `<table>` markup.

## 2. Core Architecture: Structural Groups vs Semantic Names

We decided to move away from rigid semantic class names (e.g., `lead`, `body`, `actions`) in favor of a purely structural and behavioral approach. 

- **Structure:** `List -> Item -> Column -> [Nested Columns]`
- **Rationale:** By using a single `.data-list__column` element, we can nest columns inside columns to create groups. This keeps the HTML API simple and avoids leaking CSS layout concepts (like grid or subgrid) into the markup.

### The "Automagic" Subgrid
The magic of the component lies in how it handles nested columns:
- If a `.data-list__column` contains other `.data-list__column` elements, the CSS automatically detects this using the `:has()` pseudo-class.
- **On Desktop:** It automatically sets `display: grid; grid-template-columns: subgrid;`. This ensures that nested items align perfectly to the master grid defined on the parent `.data-list`.
- **On Mobile:** It automatically drops the subgrid and becomes a standard flex container (`flex-direction: column`), allowing the nested items to stack neatly.

## 3. Behavioral Modifiers

Instead of semantic names, developers use behavioral modifiers to control how columns act within the layout.

- **Spanning:**
  - `--span-X` (e.g., `--span-2`, `--span-3`): Required on parent columns that contain nested columns so the subgrid knows how many master tracks to consume. Without this, nested wrapper elements would only occupy a single master track, causing their children to squash or stack unexpectedly.
- **Alignment:**
  - `--align-start`, `--align-end`, `--justify-center`, `--justify-end`: Controls horizontal and vertical alignment within the cell track.
- **Responsive Visibility:**
  - `--hide-small`: Hides non-critical columns on mobile devices to prevent crowding.
- **Mobile Overrides:**
  - `--wrap-small`: Overrides the automatic mobile stacking, forcing nested items (like tags or badges) to wrap inline instead.
  - `--inline-small`: Overrides the automatic mobile stacking, forcing items to stay perfectly side-by-side on a single line.

## 4. The Fallback Strategy (Updated)

*Previous discussions involved a complex Flexbox fallback. This has been removed.*
Given that Subgrid support is nearly universal by mid-2026, we have opted for a "zero-config" fallback path for older browsers:
- If a browser does not understand `grid-template-columns: subgrid`, it simply ignores the declaration.
- The row remains `display: grid`.
- Because there is no column template defined within the row, it defaults to placing every child in a single vertical column (implicit rows).
- **The Result:** The desktop view for older browsers gracefully degrades to look exactly like the stacked mobile view. It is 100% usable, readable, and requires zero extra fallback code (like `--shrink` or `--fluid` modifiers) from the developer.

## 5. Headers & Accessibility

- **The "No Frankenstein Table" Rule:** We decided *not* to use `role="table"` or try to force this component to be a full table replacement. It is strictly a list.
- **Header Rows:** An optional header row (`.data-list__header`) can be used for visual alignment on desktop.
- **Accessibility Implementation:** 
  - The header uses `aria-hidden="true"` or `role="presentation"` so it is ignored by screen readers, preventing confusion since it's just a visual label.
  - On mobile, the header is hidden (`display: none`) because the column alignment breaks when stacked.
  - Content must be self-explanatory (e.g., "Created: Jan 1") or labeled within the item itself, rather than relying solely on the column header for context.

## 6. Interactivity (Proxy Click)

- **The Pattern:** We use a "Proxy Click" pattern for interactive rows instead of wrapping the entire row in a button or link (unless it's a simple navigation list).
- **Implementation:**
  - **`data-ulu-proxy-click`**: Attribute on the row (`.data-list__item`) to initialize the JS behavior.
  - **`data-ulu-proxy-click-source`**: Attribute on the primary interactive element (e.g., the Title link).
  - **`.data-list--clickable`**: Modifier class on the parent list to apply `cursor: pointer` and hover styles to rows.
  - **Visuals:** Added a `background-color-clickable-hover` config option to distinguish interactive rows from standard rows.

## 7. Future Considerations

- **The "Keep Side-by-Side" Mobile Scenario:** The `--inline-small` modifier exists to prevent mobile stacking, but highly complex side-by-side mobile layouts might require further refinement. We decided to keep the base structure clean for now.

## 9. Defensive Layouts & Open Questions (Next Session Handoff)

This section details technical decisions made to ensure layout stability and highlights areas that require further review in our next session.

### The `min-width: 0` Necessity
We discussed why individual columns (`.data-list__column`) require `display: flex;` and `min-width: 0;`.
- **The Micro-Layout:** While CSS Grid handles the macro-alignment of the columns across rows, Flexbox is needed internally on the column wrapper to handle micro-alignment (specifically `align-items: center` to ensure icons and text align vertically, and `gap` to space elements that sit side-by-side inside a single cell without forming a subgrid).
- **The Blowout Threat:** By default, Grid and Flexbox refuse to shrink columns smaller than their intrinsic content (e.g., an unbroken URL or a long filename). In a fluid `1fr` track, a long string can force the column to expand, breaking the layout and pushing content off-screen.
- **The Solution:** Applying `min-width: 0` to the flex-container columns removes this rigid floor. It is a defensive maneuver that tells the browser it is safe to shrink the column, allowing standard CSS truncation (`text-overflow: ellipsis`) to function properly without blowing out the grid. We added explicit comments to the SCSS to warn developers not to remove this crucial protection.

### Open Question: The Necessity of `--wrap-small`
We remain uncertain about the value and necessity of the `--wrap-small` modifier.
- **The Concept:** By default, nested columns (subgrids) drop to a vertical flex stack (`flex-direction: column`) on mobile to save horizontal space. The `--wrap-small` modifier was introduced to override this, forcing small elements (like tags or badges) to flow inline (`flex-wrap: wrap`) on mobile instead of creating a tall, disjointed vertical stack.
- **The Doubt:** While we built a demo showing a use case (a task list with tags wrapping on mobile), we need to evaluate if this specific modifier provides enough systemic value to keep in the API, or if developers should just handle this kind of highly specific mobile grouping with custom CSS inside their project.
- **Action Item for Next Session:** Determine if we should keep, kill, or refine `--wrap-small` and `--inline-small`.