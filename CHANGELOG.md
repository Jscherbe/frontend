# Change Log

## 0.1.0-beta.84

- **scss/panel.scss**
  - Add new panel component, this is to replace custom callout layouts/etc
  - A panel is a box with child rows (such as header, body, footer) or anything like that (think structured callouts, sidebar menus, anything that needs this type of layout)
  - User defines how it looks and what modifiers are present (unless using defaults)
- **scss/utils.scss**
  - Add utils.default() for inline defaults to handle pattern similiar to function-fallback works, for local values (not for configuration fallbacks)
  - Use like `color: ulu.utils-default($user-value, red)` (if user value is anything other than `true`) return it, else return default value (like how all config defaults work)
  - Designed mainly for internal library use


## 0.1.0-beta.83

- **js/ui/resizer.js**
  - Add keyboard events
  - Add selfManagedEvents and selfManagedAriaLabel
    - So we can use this in other libraries/etc
- **js/ui/modal-builder.js**
  - Update default modal template option to have a button for resizer to work with updated resizer script

## 0.1.0-beta.82

- **js/ui/dialog.js**
  - Remove native resize detection (resizeObserver, etc) since all resizing is done by resizer now
    - Backed up this idea to reference/ideas/removed-idea-on-how-to-detect-native-resizing-has-no-event.js incase it's needed in the future
  - Add flag internally to ensure that click outside is prevented if the pointer event originated from a resizer event

## 0.1.0-beta.81

- **scss/components/css-icons.scss** 
  - Add icon for `.css-icon--drag-both`
- **scss/components/modal.scss** 
  - Remove 'resize' native resizing for 'center' position, and use new resizer for both axes
- **js/ui/modal-builder.js**
  - Update resizer to create resizer handle for "center" so we can remove CSS resize in modals.scss
- **js/ui/resizer.js**
  - Refactor API to be fromX, and fromY (instead of fromLeft) to support both axes 
  - Add events dispatched from resizer's container for user 
  - Make all events pointer events instead of mouse
- **js/utils/class-logger.js**
  - Add check in allow() for class instance options.debug property

## 0.1.0-beta.80

- Update @ulu/utils

## 0.1.0-beta.79

- **js/ui/dialog.js**
  - Move preventScroll logic to utils library, refactor (no api changes)

## 0.1.0-beta.78

- **js/ui/modal-builder.js**
  - Fix unused documented config property `titleId`
  - Document `labeledby`and `describedby``
  - Code cleanup

## 0.1.0-beta.77

- **js** 
  - Move dom utils that were reusable to utils library
- **docs** 
  - Fix popover fixed demo for fixed strategy

## 0.1.0-beta.76

- **scss/components/modal.scss** 
  - Add `.modal__footer` element and configuration for styling it
  - Fix modal animations temporarily setting display block instead of flex 
- **js/ui/modal-builder.js**
  - Add options for `footerElement` which will select the element and move it into the modal on creation (when working in DOM with data-attributes)
    - Add option for `footerHtml` which will insert the markup provided into the footer
  - Output footer element if either setting is set

## 0.1.0-beta.75

- **scss/components/modal.scss** | Remove unused selector `.modal__content`

## 0.1.0-beta.74

- **js/ui/modal-builder.js**
  - Add options for `labelledby`, `describedby` (pass id's)
    - `labelledby` will be filled in automatically if using title option
    - `describedby` is to mark optional description element

## 0.1.0-beta.73

- **js/ui/modal-builder.js** | Fix missing end tag in options.template 

## 0.1.0-beta.72

- **scss/element** | Change new mixin name "focus-ring-required-only"

## 0.1.0-beta.71

- **scss/element**
  - Add mixin "hide-focus-ring" which implements hidden focus ring unless it's needed (via :focus-visible)
- **scss/components/tabs**
  - Hide focus ring on tabs when clicking

## 0.1.0-beta.70

- **scss/components/accordion**
  - Change defaults (add background color to summary) so that demo shows how no-border modifier is used
  - Add borderless-margin-between 
  - Change modifier "no-border" to "borderless"
- **scss/components/tabs**
  - Tweak defaults so that tab color hover matches "selected" color
  - Add transitions to the indicator bar, and add setting to adjust it

## 0.1.0-beta.69

- **scss/components/accordion**
  - Set width on .accordion__summary so it works when using button element (when not details)
  - Fixed minor things (missing selectors, etc)

## 0.1.0-beta.68

- **scss/components/badge**
  - Fix default config (so that default size is smaller than large)
  - Add default sizes (small and large)
  - Add font family option

## 0.1.0-beta.67

- **scss/components/counter-list**
  - Add extra-selector option to allow class wrapper which styles all ol's inside container.

## 0.1.0-beta.66

- **scss/components/data-grid**
  - Add missing row gutter breakpoint modifiers (so row gutters use breakpoint sizes)
  - Add missing row gutter at breakpoint work with extra scales 

## 0.1.0-beta.65

- **scss/element**
  - Add backdrop-filter-blur mixin
  
## 0.1.0-beta.64

- **scss/components/counter-list**
  - Fix mistake in "item-margin" property default value 
    - (should be space separated list or single number was comma separated)

## 0.1.0-beta.63

- **js/ui/scrollpoints** 
  - Fixed error using for syncedElements option (Missing getElement, was moved to utils)


## Versions 0.1.0-beta.59, 0.1.0-beta.60, 0.1.0-beta.61, 0.1.0-beta.62

- Update @ulu/utils dependency to latest

## Version 0.1.0-beta.58

- **js/ui/slider**
  - Change slider swipe to be on slides
  - Add options for swipeOptions to configure ["swipe-listener"](https://www.npmjs.com/package/swipe-listener) library (see it's documentation for options)
    - Adding preventScroll by default

## Version 0.1.0-beta.57

- **js/ui/slider**
  - Setup swipe listener and add option for swipeEnabled (true by default)

## Version 0.1.0-beta.56

- **scss/components/counter-list**
  - Add counter (font-family, font-weight)

## Version 0.1.0-beta.55

- **scss/components/counter-list**
  - Fix selector (was nested if using .counter-list__item), Updates for API for $config

## Version 0.1.0-beta.54

- **js/ui/modal-builder**
  - Add option for titleClass
  - Fill in jsdoc documentation for defaults 

## Version 0.1.0-beta.53

- **scss/components/slider**
  - Remove "button-height" option not setup in styles
  - Change "button-icon-offset-x/y" to "button-offset-x/y" since it only controls the button offsets not related to an icon

## Version 0.1.0-beta.52

- **scss/components/slider**
  - Remove "button-size" option (was never hooked up)
  - Change "dot-" prefixed options to "nav-" so it's not describing it visually
  - Change "margin-bottom" and "margin-top" to singular margin rule

## Version 0.1.0-beta.51

- **scss/components/slider**
  - Add "dot-gap" and "nav-margin" options

## Version 0.1.0-beta.50

- **scss/components/slider**
  - Remove "dot-border-color-hover" option not setup in styles

## Version 0.1.0-beta.49

- **scss/color**
  - Allow color.get() to passthrough colors that are "color-mix()"
  
## Version 0.1.0-beta.48

- **scss/color**
  - **css-tint, css-shade** Make sure colors (base white/black) use color.get()

## Version 0.1.0-beta.47

- **scss/components/card**
  - Add card--fill modifier (expands to fit whatever element it's within). This was intended for use with data-grid but could be used this way for many layouts.

## Version 0.1.0-beta.46

- **scss/color**
  - **css-tint, css-shade** Add two new functions for tinting/shading in the browser (to support custom properties). In the future these may replace sass only tint/shade functions once they are more widely supported.

## Version 0.1.0-beta.45

- **scss/units > set()**
  - Adjust to use map-merge so you can configure how the map is merged (ie. overwrite for example)
- **scss/element > set-rule-margins()**
  - Adjust to use map-merge so you can configure how the map is merged (ie. overwrite for example)

## Version 0.1.0-beta.44

- **scss/components/card**
  - Fix card body from shrinking when max-width is larger than body content
  - Add card--horizontal-center modifier to center body of card

## Version 0.1.0-beta.43

- **scss/components/card**
  - Document all new aside configuration properties change toggle-aside-rule to aside-rule

## Version 0.1.0-beta.42

- **scss/components/card**
  - Adjusted defaults for new aside element (rule and background color) to match standard defaults (initial testing values were there before)

## Version 0.1.0-beta.41

- **js/utils/dom**
  - **addScrollbarProperty** - Change arguments to object, Add argument for "propertyElement" and make this function add property to html element by default (so it can be used with other custom properties in CSS :root selector)
- **scss/components/card.scss**
  - card aside defaults changed ("aside-background-color" : transparent, "aside-rule-color": "rule",)

## Version 0.1.0-beta.40

- **scss/components/counter-list**
  - Add counter-list component and demo page
- **js/ui/dialog**
  - Add option for triggers (preventScrollShift) which will add padding to the body when dialog with preventScroll is opened (so layout doesn't shift). Note this will not fix fixed position elements relative to the viewport jumping.

## Version 0.1.0-beta.39

- **js/ui/scrollpoint.js**
  - Fix attribute name for state to have ulu prefix (ie. data-scrollpoint-state is now data-ulu-scrollpoint-state)
  
## Version 0.1.0-beta.38

- **scss/**
  - **helpers/display**
    - remove clearfix class styling
  - **helpers/utilities, helpers/print, helpers/display**
    - Add selector class replacing and prefixing

## Version 0.1.0-beta.37

- **js/ui/slider.js**
  - Implement classAccessiblyHidden option to allow users to customize its styling. Will still default to "hidden-visually." 

## Version 0.1.0-beta.36

- **scss/**
  - **components/button-verbose**
    - Add "border-width" and "border-color" options with ability to fallback to button defaults for each. No borders are added by default. Options descriptions added to sass api docs.
  - **components/modal**
    - Add fullscreen size modifier 
  - **components/data-grid**
    - Create option "rule-fade-duration" which when enabled (can be disabled by passing false) will hide the rules for the grid until the grid's initialization script has finished (which gives positioning information about the column arrangement so the appropriate rules can be shown per column/row). 
- **js**
  - **settings**
    - Update "wrapSettingString" function to have second argument for "transform" allowing default settings strings that can also be transformed. This was used in breakpoint module so user can match "cssvarPrefix" to create a default value of "--PREFIX-breakpoint" for example, where PREFIX is dynamic at time of string is used
    - Add "cssvarPrefix" to match scss cssvar module's prefix value
  - **ui/breakpoint**
    - Fix all typos (options and methods) of "psuedo" to "pseudo" (valueFromPseudo, pseudoSelector)
    - Bring in new setting (from settings.js) for "cssvarPrefix" for the breakpoint customProperty default value
    - Create test for this in demos
  - **ui/collapsibles**
    - Fix bug with "focusoutCloses" check collapsible content for focus before closing (so only close if focusout led outside the content) which is the intended behavior. Note this is mechanism used to control popover's so it fixes the bug there as well
  - **ui/modal-builder**
    - Update all templates options (templateCloseIcon, templateResizerIcon, template) to include new option for "baseClass" so that base BEM selector can easily be changed (ie. .namespace-modal for example)
  - **utils/css.js**
    - Add new module to hold utility functions related to CSS, currently just new function getCustomProperty which is used in ui/breakpoints module

## Version 0.1.0-beta.35

- **scss/**
  - **components/card**
    - add *card__aside* styling to enable sidebars
      - added *card__main* wrapper to *card__title* and *card__content* to separate it from the *card__aside*
      - added config options for *card__aside*
        - toggle-aside-rule : toggles rule separating aside from main,
        - aside-rule-width
        - aside-background-color
        - aside-rule-color
    - remove padding from *card__image--icon*
      - This was adding additional space on bottom of horizontal card. Most noticeably when using an aside background color and no footer.
  - **elements/rule**
    - Added "display: inline-block;" to short rule
      - Note: user can use the old style by adding utility class "display-block"
- **js/**
  - ui/scroll-slider
    - Fix typo that introduced error in last update controls-context to control-context

## Version 0.1.0-beta.34

- **scss/**
  - **element**
    - Add mixins for element.cap() and element.cap-appearance() which are used internally but can be used by users to add end caps to an element
  - **utils**
    - Add ensure-map(), units-match(), is-end(), is-side() functions
  - **components/callout**
    - Minor visual breaking change for those using cap
    - Update how left-cap works (all properties have changed) now accepts common cap settings (see config)
    - Caps can be set on any side now
    - Callout styles map (for variations/modifiers of callout) will no longer output "border" configuration
      - Use "border-width" or "border-color" to affect border appearance
  - **components/button-verbose**
    - Minor visual breaking change for those using cap
    - left cap has changed to cap and accepts common cap options (see config)
  - **components/accordion**
    - remove static margin-bottom added to "--no-borders" modifier (was 4rem)
    - Fix calc for accordion + accordion to be based on border-width setting (was static 1px)
  - **components/slider**
    - remove unused config options "button-background-color" and "button-background-color-hover"
  - **components/accordion**
    - Remove margin-bottom
  - **components/data-table**
    - Add config option "footer-color" to enable users to customize footer text color. Footer still defaults to "color" config option.
- **js/**
  - **ui** (remove setup functions, using component initializer class now)
  - **ui/slider**
    - update createNavButton function to pass whole slide rather than just slide number. Update getNavContent to still print slide number as accessibility text by default.
  - **ui/dialog**
    - Added option preventScroll (defaults to true), used only for modal dialogs (ignored if nonModal)
  - **ui/tooltip**
    - Fix missing init attribute
  - **ui/flipcard**
    - Fix typo in method name "setVisiblity" to "setVisibility"
  - **ui/tabs**
    - Fix issue with initial click of a tab when using "openWithUrlHash" option
      - Equal height checking was setting hidden attribute but aria-tablist library explicitly checks for hidden="hidden"

## Version 0.1.0-beta.33

- scss
  - Add layout.absolute-fill throughout components/styles so that CSS is printed the same way for compression
  - Add layout.absolute-fill throughout components/styles so that CSS is printed the same way for compression
- scss/components/callout
- scss/components/button-verbose
  - Add left-cap-match-radius to have the left cap style match the border radius of the parent container
  - 
## Version 0.1.0-beta.32

- scss/components/button-verbose
  - Add left-cap-match-radius to have the left cap style match the border radius of the parent container

## Version 0.1.0-beta.31

- scss/components/button-verbose
  - Change left-cap default to false off (like it was before the change in 0.1.0-beta.29)

## Version 0.1.0-beta.30

- scss/components/button-verbose
  - Add button-verbose__body element
  - Allow title-margin to work if body is before title
- scss/component/popover
  - Change new config property "arrow-mask" to "arrow-box-shadow", remove "arrow-mask-" properties as they are no longer needed. When "arrow-box-shadow" is enabled the popovers box-shadow will be used on the arrow along with a mask that has an overlap based on the box-shadow's size.
- scss/utils
  - Add (is-list, is-map, is-number, is-string, is-color) functions to reduce logic based on type (ie. `if(utils.is-list($value), $something, $something-else))`
  - Add is-even, and is-odd functions

## Version 0.1.0-beta.29

- scss/components/button-verbose
  - Setup optional selector changing (class base name)
  - Add end cap option
  - Adjust default options
  - Make inline modifier remove margin right if last child
- scss/components/card
  - Add cursor pointer to card__title-link and move default title hover styles from card__title to card__title-link
  - Change default size of icon image max-width (from 30rem to 8rem)
  - Remove transparent on card__image--icon (will have normal default background for image area now)
- scss/components/form-theme
  - Add "description-line-height" option defaulting to typography line-height dense

## Version 0.1.0-beta.28

- scss/components/popover
  - Remove options (footer-box-shadow, footer-box-shadow-color) as it interferes with main popover box shadow and arrow box shadow. 
  - Added "footer-border-top" to separate footer from content (useful for showing overflow)

## Version 0.1.0-beta.27

- scss/components/popover
  - Add popover's content box-shadow to arrow (using the other pseudo to mask the shadow)
- scss/components/utils
  - Fix number-info function, and add errors option
  - Add function add-unit() to add unit to a number
  - Add function hypotenuse() which returns hypotenuse of triangle

## Version 0.1.0-beta.26

- scss/components/card
  - Make modifier card--no-image, which is used to inform layout in the card when it doesn't have an image, now hides the image as well (with CSS)
  
## Version 0.1.0-beta.25

- scss/components/accordion
  - Make normal summary (when used without icon) flexbox for older browser support (uses :has() selector)
- scss/components/card
  - Change how horizontal cards display when in horizontal
    - Body and footer stack to the side of image
    - Image fills height
  - add card--image-fit modifier to all images to properly be contained in cards regardless of card size

## Version 0.1.0-beta.24

- Minor, remove debug statement

## Version 0.1.0-beta.23

- scss/component/sticky-list.scss
  - Adjusts to new component (property name changes)

## Version 0.1.0-beta.22

- scss/component/sticky-list.scss **new**
  - Added basic CSS sticky list component

## Version 0.1.0-beta.21

- scss/components/tabs.scss
  - Minor: fix margin output (space separated list vs comma)
  - Remove scrollbar in tablist

## Version 0.1.0-beta.20

- scss/components/basic-hero **new**
  - Added component for handling simple hero or header styling with text and media in container
- js/ui/theme-toggle.js (refactored to allow)
  - Inverted the default icons so that the icon reflects the theme it will trigger
  - Multiple instances of theme toggles
  - Remote theme toggles (other toggles buttons that follow/match main toggle)
    - If the toggle button is used in more than one place in UI
    - Toggle and remote linked via 'group' option
  - Allow targeting multiple containers to toggle theme on
  - New options/API structure
    - Now accepts themes object with settings on what it should toggle
  - Allow callback for customizing behavior when changing state
  - Add demo/tests
- js/utils/dom.js
  - Add getElements() (matches getElement) but for multiple elements
  - Add resolveClasses() to allow class options to be string or array form
    - So that scripts using can easily resolve classes to consistent type for use in element.classList, etc
- js/ui/details-group.js
  - Fix error in event pageModified (caused by passing event object to setup)

## Version 0.1.0-beta.19

- js/ui/details-group.js
  - Added new module to manage groups of details (just one open at time right now)

## Version 0.1.0-beta.18

- scss/components/_button-verbose.scss
  - Add text align left
  
## Version 0.1.0-beta.17

- js/ui/programmatic-modal.js 
  - Add "classes" option to createAndOpen, to match legacy module's API

## Version 0.1.0-beta.16

- js/ui/programmatic-modal.js 
  - Change createAndOpen config option "selector" to ambiguous name "element" to allow passing both selector or element (using getElement())

## Version 0.1.0-beta.15

- JS
  - Settings.js 
    - Setup new shared setting module (currently holds icon string settings)
    - Setup common methods for dealing with settings
    - Setup wrapped string get method for use in configuring defaults for other modules
      - So we don't need to refactor for after runtime settings changes
  - utils/font-awesome.js - Includes helper method for setting font-awesome icons (configureIcons)
  - ui/modal-builder.js - Adjust to use settings to get icon defaults
  - ui/overflow-scroller.js and js/ui/slider.js
    - Change `iconClassesPrevious` and `iconClassesNext` to non array settings `iconClassPrevious` and iconClassNext
    - Change the above defaults to pull from settings.js
  - js/ui/slider.js
    - Fix selector .Slider__control-icon was on .Slider__control-button is now moved to icon
- SCSS
  - components/_slider.scss
    - Fix incorrect selector .Slider__control-icon which was actually targeting the control-button

## Version 0.1.0-beta.14

- SCSS > Components > Nav Strip
  - Add remove-scrollbar() CSS to nav strip list

## Version 0.1.0-beta.13

- SCSS > Components > Menu Stack
  - Add options for line-height for link and label
  - Change rule color to light by default

## Version 0.1.0-beta.12

- SCSS > Components > Menu Stack
  - Refactor menu-stack__checkbox selector to menu-stack__selectable so it works for both radio/checkbox layouts
  - Added other selectors if needed menu-stack__selectable-[input/label], but it still works with native element selectors (ie. [type="checkbox"])
  - Change config (checkbox-area-width to selectable-input-width)

## Version 0.1.0-beta.11

- SCSS
  - Components
    - Card
      - Set config options for settings that were hardcoded in
    - Form Theme: 
      - Change config item "input-margin-y" to "item-margin-y" since that's what it affects. 
      - Add config options to hardcoded options in fieldset
      - Remove fieldset span styling
      - Replaced config defaults using color.get("error") to now use color.get("danger")
    - Menu Stack
      - Remove padding on container when set to hanging (incorrect)
    - Data Table
      - Add header-color option for thead th
    - Callout
      - Adjustments to left cap styling
        - Left-cap height and horizontal positioning now include the border-width
        - Left-cap mixin is now a private mixin
      - **replaced "border" config option with "border-color" and "border-width"**
  - Color
    - New color options and adjusted colors error and warning.

## Version 0.1.0-beta.10

- "scss/component/modal" - Add "width-left-right" for sidebar style width setting
- "scss/component/css-icons" - Add "drag-gap-multiplier" to adjust the gap between strokes
- "js/ui/modal-builder" - Fix css-icon class for resizer (to css-icon--drag-x)

## Version 0.1.0-beta.9

- Updates to "scss/component/card" - Fix card overlay border-radius (body and footer), fix card border being conditional on interactive (proxy-click)

## Version 0.1.0-beta.8

- Update "scss/components/data-table" to have border and no margin on caption by default, add caption config properties (caption-text-align, caption-background-color)

## Version 0.1.0-beta.7

- Add "scss/components/list-inline" component
- Update "scss/components/list-lines" component to have adjustable base selector

## Version 0.1.0-beta.6

- Add "title-font-family" to scss/components/modal

## Version 0.1.0-beta.5

- scss/components/nav-strip - Adjust rule style so the rule is not a border on parent (so child can overlap if desired), Adjust all colors to run through color.get(), Convert to gap instead of margins

## Version 0.1.0-beta.3 - 0.1.0-beta.4

- scss/components/tabs - Add breakpoint to vertical tabs (to go to horizontal)

## Version 0.1.0-beta.2

- scss
  - color
    - Add "currentColor" as passthrough for color.get()
  - tabs
    - Add vertical orientation styling
    - Rework configuration properties to be orientation-less (requires remapping if you have setting set)
- js/ui/tabs
  - Fix equalHeights option (fix images that are already loaded or load error preventing heights script, check hidden tabs height and test that it works for vertical tabs)

## Version 0.1.0-beta.0

- Minor release keeps most of the current API for SASS the same but adds new functions/mixins and components. JS has been slightly reorganized and outdated modules have been replaced
- Remove calculate module and move the functions to utils (responsive property and pixel-to-em)
- Add other components modules 
- Update documentation and API documentation
- Update all sass to work with new/future sass version 
- Add root styles for ulu specific custom properties
- Add transitions to buttons
- JS remove mini collapsible and rely on floating ui library for tooltip/popovers
- JS move to native dialog element instead of micro-modal
- JS add new collapsible class for popovers or other accessible collapsible containers
- JS reorganize utils and helpers
- Create new docs website with api docs and component examples
- Full build (ie. /dist/) is bundled by Vite 

## Version 0.0.23

- Fix mistake introduced in 0.0.22, that broke container css

## Version 0.0.22

- Add in other common component modules
  - Users using these modules locally will need to remove and update configuration to pull modules from library instead. Or alternatively they will need to not output/use these new component modules
  - List of component modules added:
    - badge
    - fill-context
- Add .crop-margins to helpers/utilities

## Version 0.0.21

- Core/button Remove 'background-clip: padding-box' on buttons, affects buttons with borders (rendering between bg and border)

## Version 0.0.18

- Fix docs issue with JS broken from Markdown Attrs
- Fix missing arguments in typography module sassdocs comments

## Version 0.0.17

### SCSS

- Add !important to all utilities meant to display none, since they should always override

## Version 0.0.10

### JS

- Update css-breakpoints helper to get breakpoint value with custom property, and make the psuedo element a legacy option that can be enabled

## Version 0.0.6

### SCSS

- Added utils.map-merge($map, $changes, $mode)
  - This is a **breaking change**
    - Update all mixins with merge arguments (button > set-styles, typography > set-sizes, etc), to use a single string argument if a merge strategy is needed. If $deep and $over-write are set you need to choose one, if they are unset or false just remove them, this will use the default map.merge.
  - This will allow expansion if needed and is simpler for modules to implement
  - This is to replace utils.map-merge-or-overwrite which is deprecated now
- Removed IE "*zoom" clearfix property as we don't support it and it causes errors in CSS minifiers since it's not standard CSS

### JS

- Add js docs
- Add specific exports for JS (ie. package "exports")
- All utils are moved to new independent module @ulu/utils and are implemented as submodules
  - Since these can be used outside of frontend workflow
  - Update imports to point to new module
- Move old waypoints code to deprecated, no longer needed with intersectionObserver