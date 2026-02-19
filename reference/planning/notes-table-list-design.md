# Component Design Notes: data-list

This document summarizes the design discussion for the new `data-list` component.

## 1. Component Goal & Naming

- **Name:** `data-list`
- **Purpose:** To create a responsive list component that displays complex data. It should appear as a table with aligned columns on desktop screens and adapt to a more compact, stacked "card-like" view on smaller screens. It will serve as a flexible alternative to the more rigid `data-table`.

## 2. Core Architecture: "Groups"

The main architectural concept is to use "Groups" within each list item instead of a flat list of cells.

- **Structure:** `Item -> [Group A, Group B, Group C]`
- **Rationale:**
    - **Semantic Grouping:** Keeps related data together (e.g., a "Title" and "Subtitle").
    - **Responsive Control:** Allows groups of content to stack or wrap as a unit, providing more granular control than targeting individual cells.
    - **Example Groups:**
        - `start`/`lead`: For icons, checkboxes, status indicators.
        - `body`/`content`: For primary data like titles and metadata.
        - `end`/`actions`: For buttons and other calls-to-action.

## 3. The Alignment Challenge & Solution

A key challenge is maintaining vertical column alignment across rows, especially for cells nested within groups, without relying on native HTML `<table>` layouts.

### The Chosen Strategy: Progressive Enhancement with `subgrid`

The component will be built using a "Subgrid-First" approach with a robust fallback.

1.  **Primary Implementation (Modern Browsers):**
    - The component will be written using CSS Grid and `subgrid`.
    - The main `.data-list` container will define the master grid columns.
    - Each `.data-list__item` will use `display: grid` and `grid-template-columns: subgrid` to ensure its children (the Groups and Cells) align perfectly to the master grid.

2.  **Fallback Implementation (Older Browsers):**
    - A fallback will be provided within a `@supports not (grid-template-columns: subgrid) { ... }` block.
    - **Decision:** We are implementing **Option B**, which prioritizes user experience through graceful degradation.
    - The fallback will be the **"Stabilized Flex-Shell"**:
        - The list item (`__item`) will use `display: flex`.
        - Groups will be sized using flex properties (e.g., `flex: 0 0 auto` for fixed-width groups and `flex: 1 1 0%` for the main fluid group).
        - Cells inside the fluid group will use percentage-based widths.
    - This ensures users on slightly older desktop browsers still see a well-aligned, table-like layout rather than a simple stacked list.

## 4. Rationale for Final Decision

- **Future-Proof:** Adopts the best modern technology (`subgrid`) for the ideal implementation.
- **Backwards-Compatible:** Provides a high-quality, not just functional, experience for the target browser range (last 3-4 years).
- **Maintainable:** When `subgrid` support is ubiquitous, the fallback logic can be easily removed by deleting the single `@supports not` block.
