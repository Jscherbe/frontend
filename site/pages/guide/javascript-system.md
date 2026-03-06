---
title: JavaScript System
weight: 20
---
The JavaScript layer of @ulu/frontend is designed to be lightweight, modular, and—crucially—**styling-agnostic**. It separates behavior from presentation, allowing you to attach rich interactive functionality to elements regardless of how they are styled.

## Core Concepts

### 1. Data Attribute Initialization

Instead of targeting specific CSS classes (like `.modal` or `.accordion`), the JavaScript modules identify components using specific `data-ulu-*` attributes. This decoupling means your HTML structure defines *what* an element is, while your CSS defines *how it looks*.

**Example:**
A dialog is identified by `data-ulu-dialog`, not by a class.

```html
<dialog id="my-dialog" data-ulu-dialog>
  ...
</dialog>
```

### 2. The `init()` Workflow

Most modules export an `init()` function. When called, this function scans the document for elements with the matching data attribute and initializes them.

**Usage:**

```javascript
import { dialogInit, tabsInit } from "@ulu/frontend";

// Initialize specific modules
dialogInit();
tabsInit();
```

The initialization functions are idempotent and smart:
-   They mark processed elements to prevent double-initialization.
-   They automatically listen for the core `pageModified` event to handle dynamic content updates (like AJAX injections).

### 3. Manual Instantiation

For more control, or when creating components dynamically in JavaScript, you can import the component class directly.

**Example: Creating a Tooltip manually**

```javascript
import { Tooltip } from "@ulu/frontend";

const trigger = document.querySelector("#my-btn");
const content = "Hello World";

new Tooltip(
  { trigger }, 
  { content, placement: "top" }
);
```

### 4. Global Settings

The library shares a global configuration object. You can adjust these settings to change defaults across all components, such as icon classes or prefixes.

**Example: Configuring Icons**

```javascript
import { updateSettings } from "@ulu/frontend";

// Change the default class used for close icons
updateSettings({
  iconClassClose: "fa-solid fa-times", // e.g., for FontAwesome 6
  iconClassNext: "icon-arrow-right"
});
```

### 5. Core Events system

@ulu/frontend uses a lightweight custom event system to coordinate between components and the application lifecycle.

-   **`pageModified`**: Dispatch this event on `document` (or a specific container) whenever you add new content to the DOM. The library listens for this to automatically initialize new components within the new content.
    ```javascript
    import { dispatchCoreEvent } from "@ulu/frontend";
    
    // ... after loading HTML via fetch ...
    container.innerHTML = newContent;
    dispatchCoreEvent("pageModified", container);
    ```
-   **`pageResized`**: A debounced resize event used internally by components that need to recalculate layout (like the `TabManager` for equal heights).

## Component State

While the JavaScript doesn't enforce styles, it *does* manage state classes. When a component changes state (e.g., an accordion opens), the JS adds standard classes like `.is-active` or attributes like `aria-expanded`. Your SCSS can then target these state classes to apply the appropriate visual changes.
