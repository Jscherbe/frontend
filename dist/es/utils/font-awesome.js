import { updateSettings as s } from "../core/settings.js";
function o() {
  s({
    iconClassClose: "fas fa-xmark",
    iconClassDragX: "fas fa-solid fa-grip-lines-vertical",
    // iconClassDragBoth: "fas fa-solid fa-grip", // Not really any good icons for this (no diagonal arrows, etc)
    iconClassPrevious: "fas fa-solid fa-chevron-left",
    iconClassNext: "fas fa-solid fa-chevron-right"
  });
}
export {
  o as configureIcons
};
