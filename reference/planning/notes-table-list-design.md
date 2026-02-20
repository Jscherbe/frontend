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

- **Sizing (Primarily for Flex Fallback):**
  - `--fluid`: Tells the fallback to `flex-grow: 1`.
  - `--shrink`: Tells the fallback to `flex-shrink: 0`.
- **Spanning:**
  - `--span-X` (e.g., `--span-2`, `--span-3`): Required on parent columns that contain nested columns so the subgrid knows how many master tracks to consume.
- **Alignment:**
  - `--align-start`, `--align-end`, `--justify-center`, `--justify-end`: Controls horizontal and vertical alignment within the cell track.
- **Responsive Visibility:**
  - `--hide-small`: Hides non-critical columns on mobile devices to prevent crowding.
- **Mobile Overrides:**
  - `--wrap-small`: Overrides the automatic mobile stacking, forcing nested items (like tags or badges) to wrap inline instead.
  - `--inline-small`: Overrides the automatic mobile stacking, forcing items to stay perfectly side-by-side on a single line.

## 4. The Flexbox Fallback

A fallback is provided within a `@supports not (grid-template-columns: subgrid) { ... }` block for older browsers.

- **The Fallback Strategy:** The component drops the master grid and uses Flexbox.
- **How it works:** The `.data-list__item` becomes `display: flex`. The columns rely on their natural content width unless modified by `--fluid` or `--shrink`.
- **The Result:** Users on older browsers still get a well-organized row layout, though they lose the pixel-perfect strict column alignment across multiple rows provided by `subgrid`.

## 5. Future Considerations

- **The "Keep Side-by-Side" Mobile Scenario:** The `--inline-small` modifier exists to prevent mobile stacking, but highly complex side-by-side mobile layouts might require further refinement. We decided to keep the base structure clean for now and add explicit overrides only as they are proven necessary in real-world implementations.