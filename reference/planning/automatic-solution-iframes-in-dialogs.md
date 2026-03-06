# Automatic Layout for Iframes in Dialogs

## The Problem
When placing iframes in modals, we encountered several layout issues:
1. **Height Collapsing (Safari Flex Bug):** Browsers (especially Safari) struggle to calculate the height of a flex item (`.modal__body`) containing a replaced element (`<iframe>`) when the parent modal relies on intrinsic sizing (`min-height`) rather than an explicit `height`. The iframe collapses to the minimum available space.
2. **Aspect Ratios:** Video embeds (like YouTube) have hardcoded `width` and `height` attributes. Making them responsive traditionally required content editors to manually wrap them in utility classes like `.ratio-box`.
3. **CMS/WYSIWYG Constraints:** Content editors shouldn't be expected to manage complex wrapper markup or CSS utility classes just to embed a video or a map in a modal. Additionally, CMSs often silently wrap iframes in `<p>` or `<div>` tags, which breaks simple flexbox-based fixes.

## The Goal
Create a "smart default" convenience feature that automatically detects iframes and applies the correct layout logic (either maintaining aspect ratio or filling the screen) without requiring extra markup from the user, and robust enough to ignore CMS wrappers.

## The Solution
We implemented an opt-out configuration in the Modal Builder called `autoIframe` (default: `true`).

### 1. Detection Utility (`lib/js/utils/iframe.js`)
We created a reusable utility `getSoleIframeLayout(container)` that:
- Checks if an iframe is the *sole meaningful content* of a container (ignoring empty text nodes). This ensures we don't break layouts if the iframe is inline with a paragraph of text.
- Uses a regex (`/^\d+$/`) to check if the iframe has explicitly numeric `width` and `height` attributes.
- Checks both inline styles and HTML attributes to extract an explicit `fillHeight` (stripping out unreliable percentages but preserving user-defined `vh` or `px` units).

### 2. Layout Modes (Applied in `modal-builder.js` and `_modal.scss`)
When `autoIframe` is enabled and the detection utility passes, the modal builder dynamically applies one of two layout modes via CSS modifiers. **Both modes use absolute positioning on the iframe** to completely break it out of any invisible CMS wrappers (`<p>`, `<div>`), ensuring it directly targets the `.modal__body` dimensions.

**A. Media Iframes (Ratio Mode)**
- **Condition:** Iframe has static numeric `width` and `height` (e.g., YouTube).
- **Action:** Adds `.modal--iframe-ratio` class. Applies the calculated ratio dynamically via an inline `aspect-ratio` style directly to the `.modal__body` (`body.style.aspectRatio = "16 / 9"`).
- **Result:** The modal body locks into the correct aspect ratio, and the absolute iframe perfectly fills it. The video scales responsively to 100% width while maintaining its original ratio, completely replacing the need for the old `.ratio-box` wrapper.

**B. Document Iframes (Fill Mode)**
- **Condition:** Iframe lacks static dimensions or uses percentages (e.g., Maps, Wikipedia, external web pages).
- **Action:** Adds `.modal--iframe-fill` class.
- **Result:** Removes padding from the modal body. To solve the Safari height collapse bug, the script dynamically assigns an inline `minHeight` to the `.modal__body`. It uses the user's explicit style if available, or falls back to a smart default (`65vh`). The absolutely positioned iframe gracefully fills the space.

## Architectural Benefits
- **Zero DOM Destruction:** By using absolute positioning to escape wrappers rather than manipulating the DOM to extract the iframe, we ensure user data attributes or event listeners on the wrappers remain completely intact.
- **Clean SCSS:** The SCSS modifiers remain very lightweight and structural, keeping dynamic values (like ratios or calculated fallback heights) exclusively in JS. No new custom CSS variables were added to the permanent API.
- **Excellent Developer/Editor Experience:** Editors can paste raw embed codes directly into the modal builder and they will format beautifully by default.