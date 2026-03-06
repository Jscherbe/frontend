---
title: "Workflow: Using Components"
weight: 40
---

This guide walks through the end-to-step process of adding a component to your project using the **Dialog** component as an example.

## Step 1: HTML Structure

First, create the markup. Remember, @ulu/frontend uses **data attributes** to define behavior.

For a Dialog, we use:
-   `data-ulu-dialog`: The container (must be a `<dialog>` element).
-   `data-ulu-dialog-close`: A button inside the dialog that triggers closing.
-   **Trigger:** A separate button with `data-ulu-dialog-trigger="ID_OF_DIALOG"`.

```html
<!-- The Trigger -->
<button type="button" class="button" data-ulu-dialog-trigger="my-dialog">
  Open Dialog
</button>

<!-- The Dialog -->
<dialog id="my-dialog" class="modal" data-ulu-dialog>
  <div class="modal__header">
    <h2 class="modal__title">Dialog Title</h2>
    <button type="button" class="modal__close button--icon" aria-label="Close" data-ulu-dialog-close>
      <span class="css-icon css-icon--close"></span>
    </button>
  </div>
  <div class="modal__body">
    <p>This is the content of the dialog.</p>
  </div>
  <div class="modal__footer">
    <button type="button" class="button" data-ulu-dialog-close>Close</button>
  </div>
</dialog>
```

*Note: The JS automatically handles accessibility (aria-modal, focus trapping via native dialog behavior) and click-outside-to-close logic.*

## Step 2: SCSS Configuration & Output

Ensure the component's styles are configured and output in your SCSS. In the library, the **Dialog** behavior is typically paired with the **Modal** component styles.

**1. Configure (Optional):**
In your config file (e.g., `src/scss/config/_modal.scss`):

```scss
@use "@ulu/frontend/scss" as ulu;

@include ulu.component-modal-set((
  "background-color": "white",
  "border-radius": "border-radius-large", // Uses element config
  "width": 40rem
));
```

**2. Output:**
Ensure the component styles are included in your main stylesheet.

```scss
// src/scss/styles.scss
@use "ulu";

@include ulu.component-styles(); 
// Or specifically: @include ulu.component-modal-styles();
```

## Step 3: JavaScript Initialization

Finally, import and initialize the component in your JavaScript entry point.

```javascript
// src/main.js
import { dialogInit } from "@ulu/frontend";

// Initialize all dialogs and triggers on the page
dialogInit();
```

## Result

1.  **Styles:** The SCSS mixin generates the necessary `.modal` classes.
2.  **Behavior:** The `dialogInit()` function finds elements with `data-ulu-dialog` and `data-ulu-dialog-trigger`.
3.  **Interaction:** 
    -   Clicking the trigger opens the dialog (using `showModal()`).
    -   Clicking the backdrop or close buttons closes it.
    -   The library handles additional features like pausing background videos on close.
