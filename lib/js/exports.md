# Exports Map

## Example Import

All JavaScript modules are exported from the main `@ulu/frontend` package entry point.

**Example Usage:**
```javascript
import { dialogInit, Slider, updateSettings } from '@ulu/frontend';

// Update a library setting
updateSettings({ cssvarPrefix: "my-app" });

// Initialize all dialogs
dialogInit();

// Create a new slider
const slider = new Slider(...);
```

## Exports Map

### Core Modules

These exports originate from the `lib/js/core/` directory and provide the foundational, cross-cutting logic for the library.

- `ComponentInitializer`
- `createUluEvent`
- `dispatchCoreEvent`
- `getCoreEventName`
- `getDefaultSettings`
- `getSettings`
- `getSetting`
- `getUluEventName`
- `updateSetting`
- `updateSettings`
- `wrapSettingString`

### UI Modules

These exports originate from the `lib/js/ui/` directory.

- `BreakpointManager`
- `Collapsible`
- `detailsGroupInit`
- `detailsGroupInitializer`
- `detailsGroupSetupGroup`
- `dialogBaseAttribute`
- `dialogCloseAttribute`
- `dialogDefaults`
- `dialogGetDialogOptions`
- `dialogInit`
- `dialogInitializer`
- `dialogSetDefaults`
- `dialogSetupDialog`
- `dialogSetupTrigger`
- `Flipcard`
- `flipcardInit`
- `flipcardInitializer`
- `gridInit`
- `gridInitializer`
- `modalBuilderBuildModal`
- `modalBuilderDefaults`
- `modalBuilderInit`
- `modalBuilderInitializer`
- `modalBuilderSetDefaults`
- `OverflowScroller`
- `overflowScrollerCreatePager`
- `pageInit`
- `Popover`
- `popoverGetContentByTrigger`
- `popoverInit`
- `popoverInitializer`
- `popoverInstances`
- `popoverResolve`
- `printDetailsAttrs`
- `printDetailsInit`
- `printInit`
- `proxyClickAttachHandlers`
- `proxyClickDefaults`
- `proxyClickInit`
- `proxyClickInitializer`
- `proxyClickSetDefaults`
- `proxyClickSetupProxy`
- `Resizer`
- `scrollSliderInit`
- `scrollSliderInitializer`
- `Scrollpoint`
- `scrollpointInit`
- `scrollpointInitializer`
- `Slider`
- `sliderInit`
- `sliderInitializer`
- `sliderSetupSlider`
- `TabManager`
- `tabsInit`
- `tabsInitializer`
- `tabsInstances`
- `tabsSetup`
- `themeToggleDefaults`
- `themeToggleInit`
- `themeToggleInitializer`
- `themeToggleSetDefaults`
- `themeToggleSetupToggle`
- `Tooltip`
- `tooltipInit`
- `tooltipInitializer`

### Utility Modules

These exports originate from the `lib/js/utils/` directory.

- `classLoggerLog`
- `classLoggerLogError`
- `classLoggerLogWarning`
- `classLoggerSet`
- `fontAwesomeConfigureIcons`
- `createFloatingUi`
- `dataAttributeToDatasetKey`
- `ensureId`
- `FileSave`
- `floatingUiDefaults`
- `newId`
- `resolveClasses`
- `setPositionClasses`
- `youtubePauseVideos`
- `youtubePrepVideos`
