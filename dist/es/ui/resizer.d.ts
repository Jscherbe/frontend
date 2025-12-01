/**
 * Class for creating/controlling a container size with a handle/control
 */
export class Resizer {
    static defaults: {
        debug: boolean;
        /**
         * Amount to increase size by (ie. pointer movement * multiplier)
         */
        multiplier: number;
        /**
         * Remove max-width, max-height
         */
        overrideMaxDimensions: boolean;
        /**
         * @type {"left"|"right"|null}
         * Specifies the horizontal edge from which resizing occurs.
         * `null` means no horizontal resizing.
         * - Default null
         */
        fromX: "left" | "right" | null;
        /**
         * @type {"top"|"bottom"|null}
         * Specifies the vertical edge from which resizing occurs.
         * - `null` means no vertical resizing.
         * - Default null
         */
        fromY: "top" | "bottom" | null;
        /**
         * The step in pixels for keyboard resizing with arrow keys.
         */
        keyboardStep: number;
        /**
         * Debounce time in milliseconds for ending a keyboard resize.
         */
        keyboardDebounceTime: number;
        /**
         * If true, the Resizer instance will automatically bind its own DOM event listeners
         * (pointerdown, keydown) to the control element. If `false`, the user is
         * responsible for calling `resizerInstance.onPointerdown(event)` and
         * `resizerInstance.onKeydown(event)` from their own listeners.
         * Default: true
         */
        manageEvents: boolean;
        /**
         * If true, the Resizer instance will automatically manage the `aria-label`
         * attribute of the control element. If `false`, the user is responsible
         * for setting this attribute.
         * Default: false
         */
        manageAriaLabel: boolean;
        /**
         * If true, pointer events (mouse/touch) will enable resizing.
         * Default: true
         */
        enablePointerResizing: boolean;
        /**
         * If true, keyboard events (arrow keys) will enable resizing.
         * Default: true
         */
        enableKeyboardResizing: boolean;
    };
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
    constructor(container: Node, control: HTMLElement, config: {
        debug?: boolean | undefined;
        multiplier?: boolean | undefined;
        overrideMaxDimensions?: boolean | undefined;
        fromX?: "left" | "right" | null | undefined;
        fromY?: "top" | "bottom" | null | undefined;
        keyboardStep?: number | undefined;
        keyboardDebounceTime?: number | undefined;
        manageEvents?: boolean | undefined;
        manageAriaLabel?: boolean | undefined;
        enablePointerResizing?: boolean | undefined;
        enableKeyboardResizing?: boolean | undefined;
    });
    options: never;
    container: Node | undefined;
    control: HTMLElement | undefined;
    debug: any;
    resizeHorizontal: boolean | undefined;
    resizeVertical: boolean | undefined;
    /**
     * Cleans up event listeners and internal state to prevent memory leaks.
     */
    destroy(): void;
    /**
     * Public handler for pointerdown events. Call this method from your own event listeners
     * if `manageEvents` is false. Its logic will only execute if `enablePointerResizing` is true.
     * @param {PointerEvent} e The pointerdown event.
     */
    onPointerdown(e: PointerEvent): void;
    /**
     * Public handler for keydown events. Call this method from your own event listeners
     * if `manageEvents` is false. Its logic will only execute if `enableKeyboardResizing` is true.
     * @param {KeyboardEvent} e The keydown event.
     */
    onKeydown(e: KeyboardEvent): void;
    /**
     * Generates an accessible label for the resize control based on its configuration.
     * This is a convenience function that can be used by the consumer if `manageAriaLabel` is false.
     * @returns {string} The suggested aria-label for the control.
     */
    getAriaLabel(): string;
    /**
     * Dispatches a custom event on the container element.
     * @param {string} type The event type (e.g., "resizer:start", "resizer:update", "resizer:end").
     * @param {Object} [data={}] Optional data to attach to the event's detail property.
     */
    dispatchEvent(type: string, data?: Object): void;
    #private;
}
//# sourceMappingURL=resizer.d.ts.map