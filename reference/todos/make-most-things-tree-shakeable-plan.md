# Plan: Improve Tree-Shakability of JS Modules

## Goal

The primary goal is to refactor specific JavaScript modules to make them side-effect-free. This will allow bundlers (like Vite or Webpack) to "tree-shake" or remove these modules from a user's final bundle if they are not actively being used, leading to smaller production bundle sizes for the library's consumers.

## Backstory & Context

The library's bundling strategy has evolved to provide the best possible balance of developer experience and end-user performance.

1.  **Initial "Bundless" Approach:** The library originally exposed its raw source files (`lib/js/*`). This approach, however, sometimes caused issues with consumer-side bundlers, such as module duplication.

2.  **Monolithic Bundle:** To solve the duplication issues, the build process was changed to create a single, monolithic ES module file. While this fixed the bundling errors, it introduced a new problem: the entire library appeared as one opaque block in bundle analysis tools, making it impossible for developers to see if tree-shaking was working effectively.

3.  **`preserveModules` Build (Current):** The build was updated again to use Vite's `preserveModules: true`. This creates a `dist/es` directory that mirrors the source code structure, but with transpiled, individual modules. This is the ideal setup, as it allows for both effective tree-shaking and clear visualization in bundle analysis tools.

This leads us to the final, crucial step. With the build structure now correct, we are analyzing the modules to properly configure the `sideEffects` property in `package.json`. We identified that to function correctly, some modules performed actions that had global side effects, such as adding event listeners to the `window` object upon import.

To prevent bundlers from incorrectly removing these modules, we initially marked them in the `sideEffects` array. The files marked were:
- `lib/js/core/events.js`
- `lib/js/ui/breakpoints.js`
- `lib/js/ui/slider.js`

However, we realized this approach has a significant drawback: if a file is marked in `sideEffects`, it will *always* be included in a user's bundle, even if the user never imports or uses any part of that module. This unnecessarily increases the bundle size for users who don't need components like the Slider or BreakpointManager. Our current task is to refactor these modules to eliminate the side effects, making them fully tree-shakeable.

## The Refactoring Plan

We devised a new pattern that gives us the best of both worlds: perfect tree-shakability for unused modules, while maintaining an excellent, "it-just-works" developer experience for used modules.

The plan is to make modules pure on import by delaying the side effect until the component is actually used.

**The Pattern:**
1.  Remove the global event listeners from the top level of the module file.
2.  Move the event listener logic into a `static` method within the component's class (e.g., `_initializeGlobalResizeHandler`).
3.  Add a `static` flag to the class (e.g., `resizeHandlerInitialized = false`) to track if the listeners have been attached.
4.  From the component's `constructor`, call the new static initializer method. The method will check the flag to ensure the global listeners are only added once by the very first component instance.
5.  Once a module is refactored, remove its path from the `sideEffects` array in `package.json`.

## Current & Next Steps

We were in the process of applying this pattern to `lib/js/ui/slider.js`.

**Next Actions When We Resume:**
1.  Finish refactoring `lib/js/ui/slider.js` by:
    - Adding the `static resizeHandlerInitialized` flag and `static _initializeGlobalResizeHandler` method to the `Slider` class.
    - Calling the new method from the `constructor`.
    - Deleting the old top-level `addEventListener` block.
2.  Once `slider.js` is refactored, update `package.json` to remove `"lib/js/ui/slider.js"` from the `sideEffects` array.
3.  Apply the same refactoring pattern to `lib/js/ui/breakpoints.js`.
4.  Update `package.json` again to remove `"lib/js/ui/breakpoints.js"` from the `sideEffects` array.
