# Change Log

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