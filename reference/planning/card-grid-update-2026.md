# Card Grid Update (2026)

## Background & Discussion

We are rethinking the layout strategy for the `card-grid` component. The `card-grid` is a micro-layout component primarily concerned with displaying a collection of cards. Unlike `data-grid`, which handles macro page layouts, `card-grid` needs to adapt gracefully to various container widths.

### Two Approaches Considered:

1.  **Implicit Grid (Container-Aware / `auto-fit` or `auto-fill` with `minmax`)**
    *   **Pros:** Automatically reflows based on available container space without media queries. Highly responsive and requires less CSS.
    *   **Cons:** Can lead to the "empty space" issue (with `auto-fill` where gaps are left if cards don't fill the grid) or the "orphan problem" (with `auto-fit` where cards on the last row stretch to fill the remaining space).

2.  **Explicit Grid with Configurable Breakpoints / CSS Variables**
    *   **Pros:** Perfect alignment and predictability. No unexpected stretching or gaps. Highly customizable if implemented using CSS custom properties (e.g., `--ulu-card-grid-columns-medium`).
    *   **Cons:** Tied to viewport width rather than container width, making it less ideal for component-level layouts. Generates more media query boilerplate.

## Current Experiment

We are currently testing the **Implicit Grid** approach using `auto-fit` and `minmax()` to see how it behaves in practice, specifically focusing on the user's observation regarding the last row stretching behavior.

**Changes made for testing:**
*   Updated `$config` to use `min-width` and `compact-min-width` instead of fixed `template-columns`.
*   Modified `.card-grid` to use `grid-template-columns: repeat(auto-fit, minmax(min(100%, get("min-width")), 1fr))` instead of explicit columns.

## Findings & Adjustments

*   **No Unwanted Stretching:** The user noted that the implicit grid seems to be working perfectly and that cards are filling the grid without awkwardly growing to fill the last row out of proportion.
*   **Media Queries Removed:** Because `minmax(min(100%, get("min-width")), 1fr)` gracefully handles shrinking down to single columns on small devices, we were able to entirely remove the `@include breakpoint.max("small")` fallback from `_card-grid.scss`. This significantly slims down the generated CSS and makes it a pure container-aware layout.
