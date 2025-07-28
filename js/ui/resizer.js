/**
 * @module ui/resizer
 */

// Note: Gzip Test = 1.6kb (7-28-25), which seems appropriate  
// based on how many options/events it handles

import { createEvent } from "../events/index.js";
import { logError, log } from "../utils/class-logger.js";

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
    fromY: null,
    /**
     * The step in pixels for keyboard resizing with arrow keys.
     */
    keyboardStep: 10,
    /**
     * Debounce time in milliseconds for ending a keyboard resize.
     */
    keyboardDebounceTime: 200,
    /**
     * If true, the Resizer instance will automatically bind its own DOM event listeners
     * (pointerdown, keydown) to the control element. If `false`, the user is
     * responsible for calling `resizerInstance.onPointerdown(event)` and
     * `resizerInstance.onKeydown(event)` from their own listeners.
     * Default: true
     */
    manageEvents: true,
    /**
     * If true, the Resizer instance will automatically manage the `aria-label`
     * attribute of the control element. If `false`, the user is responsible
     * for setting this attribute.
     * Default: false
     */
    manageAriaLabel: false,
    /**
     * If true, pointer events (mouse/touch) will enable resizing.
     * Default: true
     */
    enablePointerResizing: true,
    /**
     * If true, keyboard events (arrow keys) will enable resizing.
     * Default: true
     */
    enableKeyboardResizing: true
  };

  // Declare private fields without initial assignments
  #handlerPointerdownInternal;
  #handlerKeydownInternal;
  #keyboardResizeTimeout;
  #initialContainerDimensions;
  #accumulatedKeyboardDeltaX;
  #accumulatedKeyboardDeltaY;
  #isResizingActive;
  #pointerStartX;
  #pointerStartY;

  /**
   * @param {Node} container Container to be resized
   * @param {HTMLElement} control Resize handle element (should be focusable like a button)
   * @param {Object} config Options to configure the resizer.
   * @param {Boolean} [config.debug=false] Enable non-essential debugging logs.
   * @param {Boolean} [config.multiplier=1] Amount to increase size by (ie. pointer movement * multiplier).
   * @param {Boolean} [config.overrideMaxDimensions=false] When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them.
   * @param {"left"|"right"|null} [config.fromX=null] Horizontal resizing direction.
   * @param {"top"|"bottom"|null} [config.fromY=null] Vertical resizing direction.
   * @param {number} [config.keyboardStep=10] The step in pixels for keyboard resizing.
   * @param {number} [config.keyboardDebounceTime=200] Debounce time for keyboard resize end.
   * @param {boolean} [config.manageEvents=true] If true, the Resizer will automatically bind its own events.
   * @param {boolean} [config.manageAriaLabel=false] If true, the Resizer will manage the control's aria-label.
   * @param {boolean} [config.enablePointerResizing=true] If true, pointer events will enable resizing.
   * @param {boolean} [config.enableKeyboardResizing=true] If true, keyboard events will enable resizing.
   */
  constructor(container, control, config) {
    if (!control || !container) {
      logError(this, "Missing required elements: control, container");
      return;
    }
    const options = Object.assign({}, Resizer.defaults, config);
    this.options = options;
    this.container = container;
    this.control = control;
    this.debug = options.debug;

    const validX = ["left", "right"];
    const validY = ["top", "bottom"];
    const { fromX, fromY } = options;

    if (!validX.includes(fromX) && fromX !== null) {
      logError(this, `Invalid fromX: ${ fromX } (left|right|null)`);
      return;
    }
    if (!validY.includes(fromY) && fromY !== null) {
      logError(this, `Invalid fromY: ${ fromY } (top|bottom|null)`);
      return;
    }
    if (!fromX && !fromY) {
      logError(this, "Invalid fromX/fromY, failed to setup resizer (at least one of fromX or fromY must be set)");
      return;
    }

    this.resizeHorizontal = options.fromX !== null;
    this.resizeVertical = options.fromY !== null;

    // Bind internal listeners only if manageEvents is true AND the respective event type is enabled
    if (options.manageEvents) {
      this.#handlerPointerdownInternal = this.onPointerdown.bind(this);
      this.#handlerKeydownInternal = this.onKeydown.bind(this);

      if (options.enablePointerResizing) {
        control.addEventListener("pointerdown", this.#handlerPointerdownInternal);
      }
      if (options.enableKeyboardResizing) {
        control.addEventListener("keydown", this.#handlerKeydownInternal);
      }
    }

    this.#resetInternalState();

    if (options.manageAriaLabel) {
      control.setAttribute("aria-label", this.getAriaLabel());
    }
  }

  /**
   * Resets all internal state properties to their default/inactive values.
   * This centralizes state cleanup and initial setup.
   * @private
   */
  #resetInternalState() {
    this.#keyboardResizeTimeout = null;
    this.#initialContainerDimensions = { width: 0, height: 0 };
    this.#accumulatedKeyboardDeltaX = 0;
    this.#accumulatedKeyboardDeltaY = 0;
    this.#isResizingActive = false;
    this.#pointerStartX = 0;
    this.#pointerStartY = 0;
  }

  /**
   * Cleans up event listeners and internal state to prevent memory leaks.
   */
  destroy() {
    const { control, options } = this;

    if (options.manageEvents) {
      if (options.enablePointerResizing) {
        control.removeEventListener("pointerdown", this.#handlerPointerdownInternal);
      }
      if (options.enableKeyboardResizing) {
        control.removeEventListener("keydown", this.#handlerKeydownInternal);
      }
    }

    if (this.#keyboardResizeTimeout) {
      clearTimeout(this.#keyboardResizeTimeout);
    }

    this.#resetInternalState();

    if (options.manageAriaLabel) {
      control.removeAttribute("aria-label");
    }
    log(this, "Resizer destroyed.");
  }

  /**
   * Initiates a resize operation.
   * This sets initial dimensions and dispatches the 'resizer:start' event.
   * @param {Object} eventDetails Additional details about the initiating event.
   * @private
   */
  #startResize(eventDetails) {
    const { container, options } = this;

    if (this.#isResizingActive) {
      if (options.overrideMaxDimensions) {
        if (this.resizeHorizontal) {
          container.style.maxWidth = "none";
        }
        if (this.resizeVertical) {
          container.style.maxHeight = "none";
        }
      }
      return;
    }

    const win = document.defaultView;
    const containerStyle = win.getComputedStyle(container);

    this.#initialContainerDimensions.width = parseInt(containerStyle.width, 10);
    this.#initialContainerDimensions.height = parseInt(containerStyle.height, 10);

    if (options.overrideMaxDimensions) {
      if (this.resizeHorizontal) {
        container.style.maxWidth = "none";
      }
      if (this.resizeVertical) {
        container.style.maxHeight = "none";
      }
    }

    this.#isResizingActive = true;
    this.dispatchEvent("resizer:start", eventDetails);
    log(this, "Resize started.", {
      initialWidth: this.#initialContainerDimensions.width,
      initialHeight: this.#initialContainerDimensions.height,
      ...eventDetails
    });
  }

  /**
   * Ends a resize operation.
   * Dispatches 'resizer:end' event and resets internal state.
   * @private
   */
  #endResize() {
    if (!this.#isResizingActive) return;

    this.dispatchEvent("resizer:end");
    this.#resetInternalState();
    log(this, "Resize ended.");
  }

  /**
   * Core logic for calculating and applying the new size of the container.
   * This method is called by both pointer and keyboard event handlers.
   *
   * @param {number} totalDeltaX The total horizontal displacement from the start of the resize.
   * @param {number} totalDeltaY The total vertical displacement from the start of the resize.
   * @param {Event} originalEvent The original DOM event (PointerEvent or KeyboardEvent) that triggered the update.
   * @private
   */
  #updateSize(totalDeltaX, totalDeltaY, originalEvent) {
    let newWidth = this.#initialContainerDimensions.width;
    let newHeight = this.#initialContainerDimensions.height;
    const { fromX, fromY, multiplier } = this.options;

    if (this.resizeHorizontal) {
      if (fromX === "right") {
        newWidth = (this.#initialContainerDimensions.width + (totalDeltaX * multiplier));
      } else if (fromX === "left") {
        newWidth = (this.#initialContainerDimensions.width - (totalDeltaX * multiplier));
      }
      this.container.style.width = `${ Math.max(0, newWidth) }px`;
    }

    if (this.resizeVertical) {
      if (fromY === "bottom") {
        newHeight = (this.#initialContainerDimensions.height + (totalDeltaY * multiplier));
      } else if (fromY === "top") {
        newHeight = (this.#initialContainerDimensions.height - (totalDeltaY * multiplier));
      }
      this.container.style.height = `${ Math.max(0, newHeight) }px`;
    }

    const updateInfo = {
      newWidth: newWidth,
      newHeight: newHeight,
      totalDeltaX: totalDeltaX,
      totalDeltaY: totalDeltaY,
      event: originalEvent
    };

    this.dispatchEvent("resizer:update", updateInfo);
    log(this, "Resizing update.", updateInfo);
  }

  /**
   * Public handler for pointerdown events. Call this method from your own event listeners
   * if `manageEvents` is false. Its logic will only execute if `enablePointerResizing` is true.
   * @param {PointerEvent} e The pointerdown event.
   */
  onPointerdown(e) {
    if (!this.options.enablePointerResizing) {
      log(this, "Pointer resizing disabled. Ignoring pointerdown event.");
      return;
    }

    e.preventDefault();
    const doc = document.documentElement;

    this.#pointerStartX = e.clientX;
    this.#pointerStartY = e.clientY;

    this.#startResize({
      inputType: 'pointer',
      startX: e.clientX,
      startY: e.clientY,
      pointerId: e.pointerId
    });

    this.control.setPointerCapture(e.pointerId);

    const pointermove = (event) => {
      const totalDeltaX = event.clientX - this.#pointerStartX;
      const totalDeltaY = event.clientY - this.#pointerStartY;
      this.#updateSize(totalDeltaX, totalDeltaY, event);
    };

    const cleanup = (event) => {
      doc.removeEventListener("pointermove", pointermove, false);
      doc.removeEventListener("pointerup", cleanup, { capture: true, once: true });

      if (this.control.hasPointerCapture(event.pointerId)) {
        this.control.releasePointerCapture(event.pointerId);
      }
      this.#endResize();
    };

    doc.addEventListener("pointermove", pointermove, false);
    doc.addEventListener("pointerup", cleanup, { capture: true, once: true });
  }

  /**
   * Public handler for keydown events. Call this method from your own event listeners
   * if `manageEvents` is false. Its logic will only execute if `enableKeyboardResizing` is true.
   * @param {KeyboardEvent} e The keydown event.
   */
  onKeydown(e) {
    if (!this.options.enableKeyboardResizing) {
      log(this, "Keyboard resizing disabled. Ignoring keydown event.");
      return;
    }

    const { key } = e;
    const { keyboardStep, fromX, fromY, keyboardDebounceTime } = this.options;

    let stepDeltaX = 0;
    let stepDeltaY = 0;
    let isResizeKey = false;

    if (this.resizeHorizontal) {
      if (key === "ArrowLeft") {
        stepDeltaX = (fromX === "left") ? keyboardStep : -keyboardStep;
        isResizeKey = true;
      } else if (key === "ArrowRight") {
        stepDeltaX = (fromX === "left") ? -keyboardStep : keyboardStep;
        isResizeKey = true;
      }
    }

    if (this.resizeVertical) {
      if (key === "ArrowUp") {
        stepDeltaY = (fromY === "top") ? keyboardStep : -keyboardStep;
        isResizeKey = true;
      } else if (key === "ArrowDown") {
        stepDeltaY = (fromY === "top") ? -keyboardStep : keyboardStep;
        isResizeKey = true;
      }
    }

    if (isResizeKey) {
      e.preventDefault();
      e.stopPropagation();

      if (!this.#isResizingActive || this.#keyboardResizeTimeout === null) {
        this.#startResize({ inputType: 'keyboard', keyboardKey: key });
      }

      this.#accumulatedKeyboardDeltaX += stepDeltaX;
      this.#accumulatedKeyboardDeltaY += stepDeltaY;

      this.#updateSize(this.#accumulatedKeyboardDeltaX, this.#accumulatedKeyboardDeltaY, e);

      if (this.#keyboardResizeTimeout) {
        clearTimeout(this.#keyboardResizeTimeout);
      }
      this.#keyboardResizeTimeout = setTimeout(() => {
        this.#endResize();
        this.#keyboardResizeTimeout = null;
      }, keyboardDebounceTime);
    }
  }

  /**
   * Generates an accessible label for the resize control based on its configuration.
   * This is a convenience function that can be used by the consumer if `manageAriaLabel` is false.
   * @returns {string} The suggested aria-label for the control.
   */
  getAriaLabel() {
    const { fromY, fromX } = this.options;
    const directions = [fromY, fromX].filter(v => v);
    return `Resize from ${directions.join(' ')} edge`;
  }

  /**
   * Dispatches a custom event on the container element.
   * @param {string} type The event type (e.g., "resizer:start", "resizer:update", "resizer:end").
   * @param {Object} [data={}] Optional data to attach to the event's detail property.
   */
  dispatchEvent(type, data = {}) {
    this.container.dispatchEvent(createEvent(type, data));
  }
}