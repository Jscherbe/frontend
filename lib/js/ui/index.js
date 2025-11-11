/**
 * UI Module 
 *
 * This file gathers all UI module exports (barrel file) into a single place to be consumed
 * by the main `index.js` file.
 *
 * WHY ARE EXPORTS RENAMED?
 *
 * Each export is renamed with a prefix based on its source module's name
 * (e.g., `init` from `dialog.js` becomes `dialogInit`). This is a critical
 * part of the library's bundling strategy, which creates a single, "flat"
 * module with uniquely named exports.
 *
 * This approach:
 * 1. Prevents name collisions between modules that might use the same export
 *    names (like `init` or `defaults`).
 * 2. Allows bundlers in consuming projects to perform dead-code elimination
 *    (tree-shaking) with maximum effectiveness.
 *
 * HOW TO ADD NEW EXPORTS
 *
 * When adding a new export, follow the naming convention:
 * `[moduleName][OriginalExportName]` (using camelCase).
 *
 * For example, to export `myFunction` from `./foo.js`, you would add:
 * `myFunction as fooMyFunction`
 *
 * Please keep the exports within each block alphabetized.
 */
export {
  BreakpointManager
} from "./breakpoints.js";

export {
  Collapsible
} from "./collapsible.js";

export {
  init as detailsGroupInit,
  initializer as detailsGroupInitializer,
  setupGroup as detailsGroupSetupGroup
} from "./details-group.js";

export {
  baseAttribute as dialogBaseAttribute,
  closeAttribute as dialogCloseAttribute,
  defaults as dialogDefaults,
  getDialogOptions as dialogGetDialogOptions,
  init as dialogInit,
  initializer as dialogInitializer,
  setDefaults as dialogSetDefaults,
  setupDialog as dialogSetupDialog,
  setupTrigger as dialogSetupTrigger,
} from "./dialog.js";

export {
  Flipcard,
  init as flipcardInit,
  initializer as flipcardInitializer,
} from "./flipcard.js";

export {
  init as gridInit,
  initializer as gridInitializer,
} from "./grid.js";

export {
  buildModal as modalBuilderBuildModal,
  defaults as modalBuilderDefaults,
  init as modalBuilderInit,
  initializer as modalBuilderInitializer,
  setDefaults as modalBuilderSetDefaults,
} from "./modal-builder.js";

export {
  OverflowScroller
} from "./overflow-scroller.js";

export {
  createPager as overflowScrollerCreatePager
} from "./overflow-scroller-pager.js";

export {
  init as pageInit
} from "./page.js";

export {
  getContentByTrigger as popoverGetContentByTrigger,
  init as popoverInit,
  initializer as popoverInitializer,
  instances as popoverInstances,
  Popover,
  resolve as popoverResolve,
} from "./popover.js";

export {
  attrs as printDetailsAttrs,
  init as printDetailsInit
} from "./print-details.js";

export {
  init as printInit
} from "./print.js";

export {
  attachHandlers as proxyClickAttachHandlers,
  defaults as proxyClickDefaults,
  init as proxyClickInit,
  initializer as proxyClickInitializer,
  setDefaults as proxyClickSetDefaults,
  setupProxy as proxyClickSetupProxy,
} from "./proxy-click.js";

export {
  Resizer
} from "./resizer.js";

export {
  init as scrollSliderInit,
  initializer as scrollSliderInitializer,
} from "./scroll-slider.js";

export {
  init as scrollpointInit,
  initializer as scrollpointInitializer,
  Scrollpoint,
} from "./scrollpoint.js";

export {
  init as sliderInit,
  initializer as sliderInitializer,
  setupSlider as sliderSetupSlider,
  Slider,
} from "./slider.js";

export {
  init as tabsInit,
  initializer as tabsInitializer,
  instances as tabsInstances,
  setup as tabsSetup,
} from "./tabs.js";

export {
  defaults as themeToggleDefaults,
  init as themeToggleInit,
  initializer as themeToggleInitializer,
  setDefaults as themeToggleSetDefaults,
  setupToggle as themeToggleSetupToggle,
} from "./theme-toggle.js";

export {
  init as tooltipInit,
  initializer as tooltipInitializer,
  Tooltip,
} from "./tooltip.js";