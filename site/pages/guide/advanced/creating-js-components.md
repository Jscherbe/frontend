---
title: Creating JS Components
weight: 20
---
@ulu/frontend provides a standardized way to create UI components using the `ComponentInitializer` class. This utility handles the boilerplate of finding elements, parsing configuration, and managing the component lifecycle.

## The Component Initializer

The `ComponentInitializer` is the bridge between your HTML (data attributes) and your JavaScript class.

### 1. Setup the Initializer

Create an instance of `ComponentInitializer` for your component. You define a `type` (for logging) and a `baseAttribute` (the data attribute to scan for).

```javascript
import { ComponentInitializer } from "@ulu/frontend";

export const initializer = new ComponentInitializer({ 
  type: "my-component", 
  baseAttribute: "data-ulu-my-component" 
});
```

### 2. Create the Init Function

Export an `init()` function that calls `initializer.init()`. This function tells the library how to instantiate your component for each found element.

```javascript
import { MyComponent } from "./my-component-class.js";

export function init() {
  initializer.init({
    // Automatically parse the element's dataset as JSON options
    withData: true,
    // Re-run this setup when the page content changes (e.g., AJAX)
    coreEvents: ["pageModified"],
    // The setup callback runs for each new element found
    setup({ element, data, initialize }) {
      // Instantiate your class
      new MyComponent(element, data);
      
      // Mark the element as initialized (prevents double-init)
      initialize();
    }
  });
}
```

## Parsing Attributes

The initializer provides helpers to generate attribute selectors based on your `baseAttribute`.

-   `initializer.getAttribute(key)`: Returns `data-ulu-my-component-key`.
-   `initializer.attributeSelector(key)`: Returns `[data-ulu-my-component-key]`.

**Example:**

```javascript
// In your component class
const contentSelector = initializer.attributeSelector("content"); // [data-ulu-my-component-content]
const contentElement = this.element.querySelector(contentSelector);
```

## Complete Example

**HTML:**
```html
<div data-ulu-counter='{ "start": 10 }'>
  <span data-ulu-counter-display></span>
  <button data-ulu-counter-btn>Increment</button>
</div>
```

**JavaScript:**
```javascript
import { ComponentInitializer } from "@ulu/frontend";

const initializer = new ComponentInitializer({ 
  type: "counter", 
  baseAttribute: "data-ulu-counter" 
});

export class Counter {
  constructor(element, options) {
    this.element = element;
    this.count = options.start || 0;
    this.display = element.querySelector(initializer.attributeSelector("display"));
    this.btn = element.querySelector(initializer.attributeSelector("btn"));
    
    this.update();
    this.btn.addEventListener("click", () => this.increment());
  }

  increment() {
    this.count++;
    this.update();
  }

  update() {
    this.display.textContent = this.count;
  }
}

export function init() {
  initializer.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      new Counter(element, data);
      initialize();
    }
  });
}
```
