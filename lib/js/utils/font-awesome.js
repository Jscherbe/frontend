/**
 * @module utils/font-awesome
 * @description Utility module for setting up Font Awesome
 */

import { updateSettings } from "../core/settings.js";

/**
 * Sets icon settings to Font Awesome icons
 */
export function configureIcons() {
  updateSettings({
    iconClassClose: "fas fa-xmark",
    iconClassDragX: "fas fa-solid fa-grip-lines-vertical",
    // iconClassDragBoth: "fas fa-solid fa-grip", // Not really any good icons for this (no diagonal arrows, etc)
    iconClassPrevious: "fas fa-solid fa-chevron-left",
    iconClassNext: "fas fa-solid fa-chevron-right"
  });
}