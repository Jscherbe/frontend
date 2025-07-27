/**
 * @module ui/resizer
 */

import { createEvent } from "../events/index.js";
import { logError, log } from "../utils/class-logger.js"; // Assuming this utility exists

/**
 * Class for creating/controlling a container size with a handle/control
 */
export class Resizer {
  static defaults = {
    debug: false,
    /**
     * Amount to increase size by (ie. pointer movement * multiplier)
     */
    multiplier: 1,
    /**
     * Remove max-width, max-height
     */
    overrideMaxDimensions: false,
    /**
     * @type {"left"|"right"|null}
     * Specifies the horizontal edge from which resizing occurs.
     * `null` means no horizontal resizing.
     * - Default null
     */
    fromX: null, 
    /**
     * @type {"top"|"bottom"|null}
     * Specifies the vertical edge from which resizing occurs.
     * - `null` means no vertical resizing.
     * - Default null
     */
    fromY: null 
  };

  // Declare any runtime populated private fields
  #handlerPointerdown;

  /**
   * @param {Node} container Container to be resized
   * @param {Node} control Resize handle element
   * @param {Object} options Options to configure the resizer.
   * @param {Boolean} options.debug Enable non-essential debugging logs.
   * @param {Boolean} options.overrideMaxDimensions When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them (default false).
   * @param {"left"|"right"|null} [options.fromX=null] Horizontal resizing direction.
   * @param {"top"|"bottom"|null} [options.fromY=null] Vertical resizing direction.
   */
  constructor(container, control, options) {
    if (!control || !container) {
      logError(this, "Missing required elements: control, container");
      return;
    }
    this.options = Object.assign({}, Resizer.defaults, options);
    log(this, "Resolved options", this.options);
    
    this.container = container;
    this.control = control;
    this.debug = this.options.debug; // for logger

    // Validate and normalize fromX/fromY
    const validX = ["left", "right"];
    const validY = ["top", "bottom"];

    const { fromX, fromY } = this.options;

    if (!validX.includes(fromX) && fromX !== null) {
      logError(this, `Invalid fromX: ${ fromX } (left|right|null)`);
      return; 
    }
    if (!validY.includes(fromY) && fromY !== null) {
      logError(this, `Invalid fromY: ${ fromY } (top|bottom|null)`);
      return;
    }

    if (!fromX && !fromY) {
      logError(this, "Invalid fromX/fromY, failed to setup resizer");
      return;
    }

    // Determine effective resizing directions based on fromX/fromY being non-null
    this.resizeHorizontal = this.options.fromX !== null;
    this.resizeVertical = this.options.fromY !== null;

    // Bind event handlers
    this.#handlerPointerdown = this.#onPointerdown.bind(this);

    // Attach event listener
    this.control.addEventListener("pointerdown", this.#handlerPointerdown);
  }

  /**
   * Cleans up event listeners to prevent memory leaks.
   */
  destroy() {
    this.control.removeEventListener("pointerdown", this.#handlerPointerdown);
  }

  /**
   * Handles the pointerdown event on the resize control.
   * @param {PointerEvent} e The pointerdown event.
   * @private
   */
  #onPointerdown(e) {
    e.preventDefault(); // Prevent default browser drag behavior

    const { overrideMaxDimensions, fromX, fromY, multiplier } = this.options; // Destructure fromX, fromY
    const doc = document.documentElement;
    const win = document.defaultView;
    const containerStyle = win.getComputedStyle(this.container);

    // Initial pointer coordinates
    const startX = e.clientX;
    const startY = e.clientY;

    // Initial dimensions of the container
    const initialWidth = parseInt(containerStyle.width, 10);
    const initialHeight = parseInt(containerStyle.height, 10);

    // Set pointer capture on the control element
    this.control.setPointerCapture(e.pointerId);

    // Optionally remove max-width/max-height to allow unrestricted resizing
    if (overrideMaxDimensions) {
      if (this.resizeHorizontal) {
        this.container.style.maxWidth = "none";
      }
      if (this.resizeVertical) {
        this.container.style.maxHeight = "none";
      }
    }

    const initialInfo = {
      event: e,
      startX,
      startY,
      initialWidth,
      initialHeight,
      fromX, // Log fromX and fromY separately
      fromY,
      pointerId: e.pointerId
    };

    this.dispatchEvent("resizer:start", initialInfo);
    log(this, "Pointerdown initiated/captured.", initialInfo);

    /**
     * Handles the pointermove event to resize the container.
     * @param {PointerEvent} event The pointermove event.
     */
    const pointermove = (event) => {
      let newWidth = initialWidth;
      let newHeight = initialHeight;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      // Handle horizontal resizing
      if (this.resizeHorizontal) {
        if (fromX === "right") { 
          newWidth = (initialWidth + (deltaX * multiplier));
        } else if (fromX === "left") { 
          newWidth = (initialWidth - (deltaX * multiplier));
        }
        this.container.style.width = `${ Math.max(0, newWidth) }px`; // Ensure non-negative width
      }

      // Handle vertical resizing
      if (this.resizeVertical) {
        if (fromY === "bottom") { // Use fromY directly
          newHeight = (initialHeight + (deltaY * multiplier));
        } else if (fromY === "top") { // Use fromY directly
          newHeight = (initialHeight - (deltaY * multiplier));
        }
        this.container.style.height = `${ Math.max(0, newHeight) }px`; // Ensure non-negative height
      }

      const updateInfo = {
        clientX: event.clientX,
        clientY: event.clientY,
        newWidth,
        newHeight,
        event
      };

      this.dispatchEvent("resizer:update", updateInfo);
      log(this, "Pointermove.", updateInfo);
    };

    /**
     * Cleans up event listeners after the pointerup event.
     * @param {PointerEvent} event The pointerup event.
     */
    const cleanup = (event) => {
      doc.removeEventListener("pointermove", pointermove, false);
      doc.removeEventListener("pointerup", cleanup, { capture: true, once: true });

      // Release pointer capture from the control element
      this.control.releasePointerCapture(event.pointerId);
      this.dispatchEvent("resizer:end");

      log(this, "Pointerup cleanup complete. Pointer released.", {
        pointerId: event.pointerId
      });
      
    };

    // Attach global event listeners for dragging
    doc.addEventListener("pointermove", pointermove, false);
    doc.addEventListener("pointerup", cleanup, { capture: true, once: true });
  }
  dispatchEvent(type, data) {
    this.container.dispatchEvent(createEvent(type, data));
  }
}