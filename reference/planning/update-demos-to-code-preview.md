# Demo Update Plan: CodePreview and Content Improvements

## Current Status & Resumption Notes (Next Session)
**Next Demo to Process:** `badge.md`
**Last Completed Demo:** `badge-stack.md`
**Workflow:** We are going through the `site/pages/demos/` directory one by one. Only update one demo, manually review, and then proceed to the next unchecked item in the Tracking Checklist. 

**Recent Learnings & Exceptions:**
*   **Live Demos:** For components that already have interactive/live demos at the top of the page (like `card.md`), skip wrapping the live demo in `CodePreview`. Instead, add static examples *below* the live demo (e.g., default card, horizontal card, overlay card) to provide markup previews.
*   **JS/UI Modules:** If a demo relies on JavaScript behavior (e.g., accordions needing `details-group` to act exclusively), add a helpful note (using a `<div class="callout callout--info">`) explaining the JavaScript module in use and explicitly stating that it functions off data attributes (e.g., `data-ulu-details-group='{ "onlyOneOpen": true }'`).

---

## Objective
Systematically update all component demos in the `site/pages/demos/` directory. The goal is to modernize the documentation presentation, make the examples more realistic, and ensure the instructions are clear and accurate to the ULU frontend library's specific patterns.

## Process
We will process the components **one at a time**. After each component is updated, work will pause to allow for manual review and verification before moving on to the next.

## Requirements for Each Demo Update
For each component demo, the following criteria must be met:

1. **Use CodePreview**: Wrap all static code examples in the `{% CodePreview %}` and `{% endCodePreview %}` shortcodes so users can see both the rendered component and the underlying HTML.
2. **Helpful Instructional Language**: Review and improve the documentation text (intro, headings, paragraphs) surrounding the examples. Ensure the explanations clearly describe the component's purpose, its modifiers, and any data-attributes (`data-ulu-*`) required for functionality.
3. **Believable Content**: Replace "Lorem Ipsum" and generic placeholder text with realistic, believable data that demonstrates how the component would actually be used in a real-world application (e.g., employee directories, transaction lists, product features, application steps, etc.).

## Strict Guidelines & Constraints
* **Ask Before Assuming**: If the purpose, modifiers, or intended usage of a component is unclear, **stop and ask for clarification**. Do not guess.
* **ULU Ecosystem Only**: This library is a standalone, independent theme/component system. 
  * Do **NOT** introduce concepts, markup structures, or utility classes from other popular frontend frameworks (e.g., Tailwind, Bootstrap).
  * Rely exclusively on the existing ULU SCSS system, its BEM structure (`block__element--modifier`), and its native utility classes (e.g., `margin-top-large`, `type-small`).
  * Ensure JavaScript interactivity relies solely on the library's `data-ulu-*` attribute patterns.

## Tracking Checklist
- [x] table-scroller.md
- [x] data-table.md
- [x] accordion.md
- [x] badge-stack.md
- [ ] badge.md
- [ ] basic-hero.md
- [ ] breakpoints-manager.md
- [ ] button-group.md
- [ ] button-verbose.md
- [ ] button.md
- [ ] callout.md
- [ ] captioned-figure.md
- [ ] card-grid.md
- [ ] card.md
- [ ] counter-list.md
- [ ] css-icons.md
- [ ] data-grid.md
- [ ] definition-list.md
- [ ] details-group.md
- [ ] file-save.md
- [ ] flipcard.md
- [ ] form-theme.md
- [ ] headline-label.md
- [ ] hero.md
- [ ] image-grid.md
- [ ] index.md
- [ ] list-inline.md
- [ ] list-lines.md
- [ ] menu-stack.md
- [ ] modals.md
- [ ] nav-strip.md
- [ ] overlay-section.md
- [ ] panel.md
- [ ] print.md
- [ ] pull-quote.md
- [ ] rail.md
- [ ] ratio-box.md
- [ ] rule.md
- [ ] scroll-slider.md
- [ ] scrollpoints.md
- [ ] slider.md
- [ ] spoke-spinner.md
- [ ] sticky-list.md
- [ ] tab-manager.md
- [ ] tabs.md
- [ ] tag.md
- [ ] tagged.md
- [ ] theme-toggle.md
- [ ] tiles.md
- [ ] tooltip.md
- [ ] wysiwyg.md
