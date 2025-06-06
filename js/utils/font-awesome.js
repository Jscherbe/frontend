/**
 * @module settings
 * @description Utility module for setting up Font Awesome
 */

import { updateSettings } from "../settings.js";

/**
 * Sets icon settings to Font Awesome icons
 */
export function configureIcons() {
  updateSettings({
    iconClassClose: "fas fa-xmark",
    iconClassDragX: "fas fa-solid fa-grip-lines-vertical",
    iconClassPrevious: "fas fa-solid fa-chevron-left",
    iconClassNext: "fas fa-solid fa-chevron-right"
  });
}