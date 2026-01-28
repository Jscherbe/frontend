# Development Overview

## System Architecture

The library is designed with a clear separation between styles (SCSS) and behavior (JavaScript). They are loosely coupled, interacting through CSS classes and data attributes in the HTML.

*   **SCSS:** Provides the styling layer. It is highly modular, with global settings (color, typography), base element styles, and individual component styles. The file `lib/scss/stylesheets/full.scss` compiles everything into a single, comprehensive stylesheet for easy consumption.

*   **JavaScript:** Provides interactivity. It is also modular, with `core` logic, `utility` functions, and `ui` components. The JavaScript is designed to be "tree-shakable," so a project using this library will only bundle the code for the components it actually uses.

### How They Interact

1.  **Component Structure:** Components are composed of SCSS and JavaScript files. A component might be SCSS-only (providing styles for a static element), JavaScript-only (providing some background logic), or a pair of both that work together (e.g., `_tabs.scss` and `tabs.js`).

2.  **Initialization:** For components with JavaScript, an `init` function (e.g., `tabsInit`) is typically provided. This function scans the DOM for specific elements, usually identified by a `data-ulu-component` attribute.

3.  **Styling Agnosticism:** A key design principle is that the JavaScript is styling-agnostic. It identifies and interacts with elements exclusively through `data-ulu-*` attributes, not CSS classes. This intentional separation means you can use the provided JavaScript functionality with completely custom component styling, simply by structuring your HTML with the correct data attributes.

4.  **Activation:** When an `init` function finds its corresponding component in the HTML, it instantiates a JavaScript class to manage its state and handle user interactions (like clicks or keyboard events).

5.  **State & Styling:** While the JavaScript itself is not tied to the SCSS styling, it does manage state by adding or removing state-based CSS classes (e.g., `.is-active`). The library's SCSS uses these classes to apply styles, and you can use them in your own stylesheets as well.

In short, the SCSS defines what components and their different states *look like*, while the JavaScript is responsible for activating components and changing their states based on user interaction. This creates a flexible and efficient system.
