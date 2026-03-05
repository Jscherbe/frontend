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

We have refined the **Implicit Grid** approach. We moved from `auto-fit` to `auto-fill` to solve the stretching issue, and restored `max-width` and centering to the cards to ensure they look good even when column tracks stretch slightly.

**Current Setup:**
*   `grid-template-columns: repeat(auto-fill, minmax(min(100%, get("min-width")), 1fr))`
*   Nested `.card` elements have `max-width` enabled (default inherited from card component) and `margin: 0 auto;`.

## Findings & Adjustments

*   **`auto-fit` Dilemma:** We initially tested `auto-fit`. While it nicely removes right-side gaps, it falls apart when a row is partially filled (e.g., 2 cards in a container wide enough for 4). The empty tracks collapse, and the 2 active columns stretch to fill the *entire* container. Even when we reapplied `max-width` to the cards and centered them, they floated awkwardly in the middle of massive invisible column tracks.
*   **The `auto-fill` + Centering Solution:** Switching to `auto-fill` leaves the empty column tracks intact. This prevents the active columns from stretching endlessly across the container. By restoring the card's native `max-width` and applying `margin: 0 auto`, we found the perfect balance. The cards stretch slightly (`1fr`) until the container can fit another column track, but they never exceed their defined `max-width`, naturally centering themselves within their track when they hit that limit.
*   **Media Queries Removed:** Because `minmax(min(100%, get("min-width")), 1fr)` gracefully handles shrinking down to single columns on small devices, we were able to entirely remove the `@include breakpoint.max("small")` fallback from `_card-grid.scss`. This significantly slims down the generated CSS and makes it a pure container-aware layout.