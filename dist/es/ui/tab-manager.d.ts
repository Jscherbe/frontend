/**
 * @typedef {Object} TabManagerOptions
 * @property {String|null} [orientation=null] - "horizontal"|"vertical", auto-detected if omitted.
 * @property {Number} [initialIndex=0] - Index to activate on load.
 * @property {Boolean} [allArrows=false] - Allow all arrow keys to navigate regardless of orientation.
 * @property {Boolean} [openByUrlHash=false] - Activate tab based on URL hash on initialization.
 * @property {Boolean} [setUrlHash=false] - Update URL hash when a new tab is activated.
 * @property {Boolean} [equalHeights=false] - Automatically match the height of all panels.
 * @property {Function|null} [onReady=null] - Callback fired after initialization: (instance) => {}
 * @property {Function|null} [onChange=null] - Callback fired when tab changes: (active, previous) => {}
 */
/**
 * Class for managing  Aria tabs
 * - Designed to be minimal and lightweight but cover all traditional needs
 * - Designed for static / traditional webpages (not SPA)
 * - Separated from tabs.js so it can be used by itself as needed (tree-shaking)
 */
export class TabManager {
    /**
     * Default options for TabManager.
     * @type {TabManagerOptions}
     */
    static defaults: TabManagerOptions;
    /**
     * @param {HTMLElement} tablistElement - The element with role="tablist"
     * @param {Partial<TabManagerOptions>} [options] - Configuration options.
     */
    constructor(tablistElement: HTMLElement, options?: Partial<TabManagerOptions>);
    tablist: HTMLElement;
    options: {
        /**
         * - "horizontal"|"vertical", auto-detected if omitted.
         */
        orientation?: string | null | undefined;
        /**
         * - Index to activate on load.
         */
        initialIndex?: number | undefined;
        /**
         * - Allow all arrow keys to navigate regardless of orientation.
         */
        allArrows?: boolean | undefined;
        /**
         * - Activate tab based on URL hash on initialization.
         */
        openByUrlHash?: boolean | undefined;
        /**
         * - Update URL hash when a new tab is activated.
         */
        setUrlHash?: boolean | undefined;
        /**
         * - Automatically match the height of all panels.
         */
        equalHeights?: boolean | undefined;
        /**
         * - Callback fired after initialization: (instance) => {}
         */
        onReady?: Function | null | undefined;
        /**
         * - Callback fired when tab changes: (active, previous) => {}
         */
        onChange?: Function | null | undefined;
    };
    tabs: Element[];
    panels: (HTMLElement | null)[];
    currentIndex: number;
    /**
     * Handles keyboard navigation (arrows, Home, End) on the tab list.
     * @param {KeyboardEvent} e - The keydown event.
     * @private
     */
    private handleKeydown;
    /**
     * Handles click events on tabs, activating the corresponding panel.
     * @param {MouseEvent} e - The click event.
     * @private
     */
    private handleClick;
    /**
     * Calculates and applies equal heights to all panels.
     * Waits for images within panels to load before calculating.
     */
    updatePanelHeights(): void;
    orientation: string | undefined;
    /**
     * Sets the necessary ARIA attributes and initial states for tabs and panels.
     * @private
     */
    private setupAttributes;
    /**
     * Attaches click and keydown event listeners to each tab.
     * @private
     */
    private attachListeners;
    /**
     * Activates a tab. Can be called with an index or a tab ID string.
     * @param {Number|String} indexOrId - The index or ID of the tab to activate.
     * @param {Boolean} [triggerActions=true] - If false, will not fire onChange or set URL hash.
     */
    activate(indexOrId: number | string, triggerActions?: boolean): void;
    /**
     * Public method to activate a tab by its ID.
     * @param {String} id - The ID of the tab element to activate.
     */
    activateById(id: string): void;
    /**
     * Removes event listeners, cleans up ARIA attributes, and resets the DOM to its pre-initialized state.
     */
    destroy(): void;
}
export type TabManagerOptions = {
    /**
     * - "horizontal"|"vertical", auto-detected if omitted.
     */
    orientation?: string | null | undefined;
    /**
     * - Index to activate on load.
     */
    initialIndex?: number | undefined;
    /**
     * - Allow all arrow keys to navigate regardless of orientation.
     */
    allArrows?: boolean | undefined;
    /**
     * - Activate tab based on URL hash on initialization.
     */
    openByUrlHash?: boolean | undefined;
    /**
     * - Update URL hash when a new tab is activated.
     */
    setUrlHash?: boolean | undefined;
    /**
     * - Automatically match the height of all panels.
     */
    equalHeights?: boolean | undefined;
    /**
     * - Callback fired after initialization: (instance) => {}
     */
    onReady?: Function | null | undefined;
    /**
     * - Callback fired when tab changes: (active, previous) => {}
     */
    onChange?: Function | null | undefined;
};
//# sourceMappingURL=tab-manager.d.ts.map