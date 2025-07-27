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
    };
    /**
     * @param {Node} container Container to be resized
     * @param {Node} control Resize handle element
     * @param {Object} options Options to configure the resizer.
     * @param {Boolean} options.debug Enable non-essential debugging logs.
     * @param {Boolean} options.overrideMaxDimensions When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them (default false).
     * @param {"left"|"right"|null} [options.fromX=null] Horizontal resizing direction.
     * @param {"top"|"bottom"|null} [options.fromY=null] Vertical resizing direction.
     */
    constructor(container: Node, control: Node, options: {
        debug: boolean;
        overrideMaxDimensions: boolean;
        fromX?: "left" | "right" | null;
        fromY?: "top" | "bottom" | null;
    });
    options: any;
    container: Node;
    control: Node;
    debug: any;
    resizeHorizontal: boolean;
    resizeVertical: boolean;
    /**
     * Cleans up event listeners to prevent memory leaks.
     */
    destroy(): void;
    dispatchEvent(type: any, data: any): void;
    #private;
}
//# sourceMappingURL=resizer.d.ts.map