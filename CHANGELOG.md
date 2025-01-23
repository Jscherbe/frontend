# Change Log

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