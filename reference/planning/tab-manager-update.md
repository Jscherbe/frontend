# Tab Manager Update Plan & Progress

## Objective

The primary goal is to replace the legacy `aria-tablist` script with a new, modern, in-house `TabManager` class. This modernizes the tabs component, reduces dependencies, and provides a more robust and flexible API for developers.

## Key Architectural Decisions

Through discussion, we've established several key architectural patterns for the new implementation:

1.  **Separation of Concerns:**
    *   The core logic is encapsulated in a new `TabManager` class located at `lib/js/ui/tab-manager.js`. This class is designed to be a "pure" logic component, independent of how it's initialized on a page.
    *   The "glue" code that finds tab components in the DOM and initializes them remains in `lib/js/ui/tabs.js`. This file acts as an adapter and a backward-compatibility layer.

2.  **`TabManager` API Design:**
    *   **Constructor:** The API is `new TabManager(tablistElement, options = {})`. The class is responsible for finding its own tabs and panels.
    *   **Panel Discovery:** The class discovers panels exclusively by reading the `aria-controls` attribute on each tab button. This enforces a single, robust, and standards-compliant way of linking tabs to panels.
    *   **URL Hash Behavior:** The API provides two distinct, explicit boolean options for maximum flexibility:
        *   `openByUrlHash`: If true, reads the URL hash on initialization to open the correct tab.
        *   `setUrlHash`: If true, updates the URL hash whenever a tab is activated by the user.
    *   **Activation Control:** The `activate` method signature is `activate(indexOrId, triggerActions = true)`. The `triggerActions` parameter provides clear, explicit control over whether secondary actions (like `onChange` callbacks and `setUrlHash`) are fired, which is crucial for silent programmatic activations.
    *   **RTL Support:** Keyboard navigation for left/right arrow keys is automatically reversed if the component detects a right-to-left language context (`dir="rtl"`).
    *   **Enhanced `onChange`:** The `onChange` callback signature is `onChange(active, previous)`, where `active` and `previous` are objects containing `{ index, tab, panel }`, providing a built-in way to handle "onClose"-type events.

3.  **Backward Compatibility (The "Shim"):**
    *   To ensure no breaking changes for existing users, the `setup` function in `tabs.js` includes a "shim".
    *   This shim inspects the tab markup. If a tab is missing the required `aria-controls` attribute, it attempts to find the corresponding panel using the legacy pattern (`aria-labelledby` on the panel).
    *   If found, it adds the `aria-controls` attribute to the tab *before* `TabManager` is instantiated.
    *   It also translates the old, single `openByUrlHash: true` option into both `openByUrlHash: true` and `setUrlHash: true` to maintain the previous behavior.

## Current State

**Completed.**

The full refactoring is complete. The new `TabManager` class is implemented, and the `tabs.js` module has been updated to use it, including the necessary shims for full backward compatibility. The public API in `lib/js/ui/index.js` has also been updated.
