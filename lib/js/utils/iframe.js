/**
 * @module utils/iframe
 */

import { separateCssUnit } from "@ulu/utils/string.js";

const staticSizeRegex = /^\d+$/;

/**
 * Checks if an element's sole content is an iframe, and determines its layout type.
 * Useful for determining if layout fixes should be applied to containers.
 * @param {HTMLElement} container The container to check
 * @returns {{iframe: HTMLIFrameElement, isStaticSize: boolean, width: string|null, height: string|null, aspectRatio: string|null, fillHeight: string|null}|null} Returns an object with iframe details, or null if not a sole iframe
 */
export function getSoleIframeLayout(container) {
  const iframes = container.querySelectorAll("iframe");
  
  if (iframes.length === 1 && container.textContent.trim() === '') {
    const iframe = iframes[0];
    const attrW = iframe.getAttribute("width");
    const attrH = iframe.getAttribute("height");
    const isStaticSize = Boolean(attrW && attrH && staticSizeRegex.test(attrW) && staticSizeRegex.test(attrH));
    
    let fillHeight = null;

    if (!isStaticSize) {
      // Check inline style first, then fallback to attribute
      const rawHeight = iframe.style.height || attrH;
      
      if (rawHeight) {
        // If it's just numbers, treat it as pixels
        if (staticSizeRegex.test(rawHeight)) {
          fillHeight = `${rawHeight}px`;
        } else {
          try {
            const parsed = separateCssUnit(rawHeight);
            // Ignore percentages as they rely on parent height which we are trying to fix
            if (parsed && parsed.unit && parsed.unit !== "%") {
              fillHeight = rawHeight;
            }
          } catch (e) {
            // separateCssUnit throws if no pattern matches, ignore silently
          }
        }
      }
    }

    return {
      iframe,
      isStaticSize,
      width: isStaticSize ? attrW : null,
      height: isStaticSize ? attrH : null,
      aspectRatio: isStaticSize ? `${attrW} / ${attrH}` : null,
      fillHeight
    };
  }
  
  return null;
}
