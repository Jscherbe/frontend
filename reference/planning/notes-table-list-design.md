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

## 8. API Simplification: Zero-Config Presets

*Note: The following captures ongoing discussion and finalized decisions regarding the component's API simplification.*

**Decision: Dropping the Flexbox Fallback Tax**
We have decided to **drop** the complex Flexbox fallback block (`@supports not (grid-template-columns: subgrid)`). 
- **Why:** By mid-2026, CSS Subgrid support will be nearly universal. The verbose `--shrink` and `--fluid` classes required on every single child column existed almost entirely to support this fallback. 
- **The Win:** Dropping the fallback allows for incredibly clean, zero-config markup for the 99.9% of modern users. The children simply snap into the explicit grid defined by the parent. 

**Decision: The Prefix/Suffix Pattern**
While we eliminated the need for child sizing classes, CSS Subgrid still *requires* the parent `<ul>` to explicitly define the master tracks (e.g., `grid-template-columns: auto 1fr auto;`). 

We found the perfect balance between composability and avoiding a dangerous "grid pseudo-API" to handle these definitions. 

The default state of a row is a single, fluid `1fr` column. We offer two specific modifiers to append `auto` tracks to that default state:
- `--prefixed`: Adds an `auto` track before the main content (`auto 1fr`).
- `--suffixed`: Adds an `auto` track after the main content (`1fr auto`).

**Why this works:**
1. **It's Composable (Safely):** A developer can use `--prefixed`, `--suffixed`, or both (`--prefixed --suffixed` for `auto 1fr auto`).
2. **It Doesn't Pretend to be a Grid API:** The words "prefix" and "suffix" clearly imply attaching a secondary, shrink-wrapped element to a primary block of content. It doesn't imply you can stack them endlessly or create complex internal grid divisions.
3. **Fallback to Custom:** If a developer's structure doesn't fit this "primary content with optional edges" model, they simply don't use these modifiers and define `--ulu-data-list-columns` explicitly.

**Decision: Presets Define Mobile Grids**
To ensure the layouts created by `--prefixed` and `--suffixed` survive the mobile breakpoint, these presets explicitly define *both* `grid-template-columns` and their mobile equivalents. This ensures that an "Icon + Text" row doesn't suddenly stack into a single column on mobile, maintaining the layout intention out-of-the-box.

**Note on `--span-*`:**
While standard flat lists (like basic Icon + Text rows) are now completely zero-config for children, complex layouts that group multiple items into a single track (like Example 1) still require the `--span-X` modifier on the grouping wrapper. This is a hard requirement of the CSS Grid specification, as the grouping wrapper needs to consume multiple master tracks in order for its internal subgrid to distribute children properly across them.

## 9. Defensive Layouts & Open Questions (Next Session Handoff)

This section details technical decisions made to ensure layout stability and highlights areas that require further review in our next session.

### The `min-width: 0` Necessity
We discussed why individual columns (`.data-list__column`) require `display: flex;` and `min-width: 0;`.
- **The Micro-Layout:** While CSS Grid handles the macro-alignment of the columns across rows, Flexbox is needed internally on the column wrapper to handle micro-alignment (specifically `align-items: center` to ensure icons and text align vertically, and `gap` to space elements that sit side-by-side inside a single cell without forming a subgrid).
- **The Blowout Threat:** By default, Grid and Flexbox refuse to shrink columns smaller than their intrinsic content (e.g., an unbroken URL or a long filename). In a fluid `1fr` track, a long string can force the column to expand, breaking the layout and pushing content off-screen.
- **The Solution:** Applying `min-width: 0` to the flex-container columns removes this rigid floor. It is a defensive maneuver that tells the browser it is safe to shrink the column, allowing standard CSS truncation (`text-overflow: ellipsis`) to function properly without blowing out the grid. We added explicit comments to the SCSS to warn developers not to remove this crucial protection.

### Decision: Removing Visibility Modifiers
We decided to remove component-specific visibility modifiers (like `--hide-small`). These are unnecessary bloat since the project already has generic utility classes to handle showing/hiding content across breakpoints.

### Decision: Removing Mobile Wrapping Overrides
We decided to remove the `--wrap-small` and `--inline-small` modifiers. These were introduced to force nested columns to wrap inline on mobile instead of stacking vertically. 
We realized these modifiers were solving a problem created by the over-use of subgrid. If developers want small data points (like tags) to wrap inline naturally on all screen sizes, they should simply group them inside a standard `<div>` with standard flex wrapping within a single column, rather than trying to force a complex subgrid to act like a basic flex container.